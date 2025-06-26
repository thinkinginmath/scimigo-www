#!/bin/bash

# SciMigo WWW Site Deployment Script
set -e

# Load configuration
CONFIG_FILE="$(dirname "$0")/config.json"
if [[ ! -f "$CONFIG_FILE" ]]; then
    echo "Error: config.json not found at $CONFIG_FILE"
    exit 1
fi

# Extract config values
DOMAIN=$(jq -r '.domain' "$CONFIG_FILE")
S3_BUCKET=$(jq -r '.s3Bucket' "$CONFIG_FILE")
CERT_ARN=$(jq -r '.certificateArn' "$CONFIG_FILE")
REGION=$(jq -r '.region' "$CONFIG_FILE")

echo "🚀 Deploying SciMigo WWW Site"
echo "Domain: $DOMAIN"
echo "S3 Bucket: $S3_BUCKET"
echo "Region: $REGION"

# Change to project root directory
PROJECT_ROOT="$(dirname "$(dirname "$0")")"
cd "$PROJECT_ROOT"

# Build the Next.js application
echo "📦 Building Next.js application..."
npm run build

# Create S3 bucket if it doesn't exist
echo "🪣 Setting up S3 bucket..."
if ! aws s3 ls "s3://$S3_BUCKET" 2>/dev/null; then
    echo "Creating S3 bucket: $S3_BUCKET"
    if [[ "$REGION" == "us-east-1" ]]; then
        aws s3 mb "s3://$S3_BUCKET" --region "$REGION"
    else
        aws s3 mb "s3://$S3_BUCKET" --region "$REGION" --create-bucket-configuration LocationConstraint="$REGION"
    fi
else
    echo "S3 bucket already exists: $S3_BUCKET"
fi

# Configure S3 bucket for static website hosting
echo "⚙️ Configuring S3 bucket for static hosting..."
aws s3 website "s3://$S3_BUCKET" \
    --index-document index.html \
    --error-document 404.html

# Set S3 bucket policy for public read access
echo "🔐 Setting bucket policy..."
cat > /tmp/bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$S3_BUCKET/*"
        }
    ]
}
EOF
aws s3api put-bucket-policy --bucket "$S3_BUCKET" --policy file:///tmp/bucket-policy.json
rm /tmp/bucket-policy.json

# Sync built files to S3
echo "📤 Uploading files to S3..."
aws s3 sync out/ "s3://$S3_BUCKET" \
    --delete \
    --cache-control "public, max-age=31536000" \
    --exclude "*.html" \
    --exclude "*.json"

# Upload HTML files with shorter cache
aws s3 sync out/ "s3://$S3_BUCKET" \
    --cache-control "public, max-age=86400" \
    --include "*.html" \
    --include "*.json"

# Check if CloudFront distribution exists
echo "🌐 Setting up CloudFront distribution..."
DISTRIBUTION_ID=$(aws cloudfront list-distributions \
    --query "DistributionList.Items[?Comment=='SciMigo WWW Site'].Id" \
    --output text)

if [[ -n "$DISTRIBUTION_ID" && "$DISTRIBUTION_ID" != "None" ]]; then
    echo "Found existing CloudFront distribution: $DISTRIBUTION_ID"
    
    # Create invalidation
    echo "🔄 Creating CloudFront invalidation..."
    aws cloudfront create-invalidation \
        --distribution-id "$DISTRIBUTION_ID" \
        --paths "/*"
    
    echo "✅ Deployment complete!"
    echo "🌐 CloudFront Distribution: $DISTRIBUTION_ID"
else
    echo "⚠️  No CloudFront distribution found. Please create one manually or run create-cloudfront.sh"
    echo "S3 Website URL: http://$S3_BUCKET.s3-website-$REGION.amazonaws.com"
fi

echo "🎉 Deployment finished!"