#!/bin/bash

# Quick deployment script for Chrome extension updates only
set -e

# Load configuration
CONFIG_FILE="$(dirname "$0")/config.json"
if [[ ! -f "$CONFIG_FILE" ]]; then
    echo "Error: config.json not found at $CONFIG_FILE"
    exit 1
fi

# Extract config values
S3_BUCKET=$(jq -r '.s3Bucket' "$CONFIG_FILE")
REGION=$(jq -r '.region' "$CONFIG_FILE")

echo "🚀 Deploying Chrome Extension Update Only"
echo "S3 Bucket: $S3_BUCKET"

# Change to project root directory
PROJECT_ROOT="$(dirname "$(dirname "$0")")"
cd "$PROJECT_ROOT"

# Upload only the Chrome extension file
echo "📤 Uploading Chrome extension to S3..."
aws s3 cp public/downloads/scimigo-extension-beta.zip \
    "s3://$S3_BUCKET/downloads/scimigo-extension-beta.zip" \
    --cache-control "public, max-age=3600" \
    --content-type "application/zip"

# Check if CloudFront distribution exists
DISTRIBUTION_ID=$(aws cloudfront list-distributions \
    --query "DistributionList.Items[?Comment=='SciMigo WWW Site'].Id" \
    --output text)

if [[ -n "$DISTRIBUTION_ID" && "$DISTRIBUTION_ID" != "None" ]]; then
    echo "🔄 Creating CloudFront invalidation for extension file..."
    aws cloudfront create-invalidation \
        --distribution-id "$DISTRIBUTION_ID" \
        --paths "/downloads/scimigo-extension-beta.zip"
    
    echo "✅ Chrome extension deployment complete!"
    echo "🌐 CloudFront Distribution: $DISTRIBUTION_ID"
else
    echo "⚠️  No CloudFront distribution found. File uploaded to S3 only."
fi

echo "🎉 Extension update finished!"