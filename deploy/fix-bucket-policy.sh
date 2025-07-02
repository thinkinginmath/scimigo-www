#!/bin/bash

# Fix S3 bucket block public access settings
set -e

CONFIG_FILE="$(dirname "$0")/config.json"
S3_BUCKET=$(jq -r '.s3Bucket' "$CONFIG_FILE")

echo "🔧 Fixing S3 bucket public access settings for: $S3_BUCKET"

# Remove block public access settings
aws s3api put-public-access-block \
    --bucket "$S3_BUCKET" \
    --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

echo "✅ Block public access settings updated"
echo "🔄 Now run: ./deploy.sh"