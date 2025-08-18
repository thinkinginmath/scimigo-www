#!/bin/bash

# Setup non-www to www redirect for CloudFront
set -e

echo "🔄 Setting up non-www to www redirect for SciMigo"

# Load configuration
CONFIG_FILE="$(dirname "$0")/config.json"
if [[ ! -f "$CONFIG_FILE" ]]; then
    echo "Error: config.json not found at $CONFIG_FILE"
    exit 1
fi

DOMAIN=$(jq -r '.domain' "$CONFIG_FILE")

# Step 1: Get the CloudFront distribution ID
echo "📋 Finding CloudFront distribution for $DOMAIN..."
# Use jq to handle null aliases properly
DISTRIBUTION_ID=$(aws cloudfront list-distributions --output json | \
    jq -r ".DistributionList.Items[] | select(.Aliases.Items != null) | select(.Aliases.Items[] | contains(\"$DOMAIN\") or contains(\"www.$DOMAIN\")) | .Id" | \
    head -n1)

if [[ -z "$DISTRIBUTION_ID" || "$DISTRIBUTION_ID" == "None" ]]; then
    echo "❌ Error: Could not find CloudFront distribution for $DOMAIN"
    echo "Please ensure CloudFront is set up first using ./create-cloudfront.sh"
    exit 1
fi

echo "✅ Found distribution: $DISTRIBUTION_ID"

# Step 2: Create the CloudFront Function
FUNCTION_NAME="redirect-non-www-to-www"
FUNCTION_CODE=$(cat cloudfront-redirect-function.js)

echo "📝 Creating CloudFront Function..."

# Check if function already exists
EXISTING_FUNCTION=$(aws cloudfront list-functions \
    --query "FunctionList.Items[?Name=='$FUNCTION_NAME'].Name | [0]" \
    --output text 2>/dev/null || echo "")

if [[ -n "$EXISTING_FUNCTION" && "$EXISTING_FUNCTION" != "None" ]]; then
    echo "⚠️  Function already exists. Updating..."
    
    # Get current ETag
    ETAG=$(aws cloudfront describe-function \
        --name "$FUNCTION_NAME" \
        --query "ETag" \
        --output text)
    
    # Update function code
    aws cloudfront update-function \
        --name "$FUNCTION_NAME" \
        --if-match "$ETAG" \
        --function-code "$FUNCTION_CODE" \
        --function-config Comment="Redirect non-www to www for SciMigo",Runtime="cloudfront-js-2.0" \
        --output json > /dev/null
    
    # Get new ETag after update
    ETAG=$(aws cloudfront describe-function \
        --name "$FUNCTION_NAME" \
        --query "ETag" \
        --output text)
else
    echo "Creating new function..."
    
    # Create new function
    FUNCTION_OUTPUT=$(aws cloudfront create-function \
        --name "$FUNCTION_NAME" \
        --function-code "$FUNCTION_CODE" \
        --function-config Comment="Redirect non-www to www for SciMigo",Runtime="cloudfront-js-2.0" \
        --output json)
    
    ETAG=$(echo "$FUNCTION_OUTPUT" | jq -r '.ETag')
fi

echo "✅ Function created/updated"

# Step 3: Publish the function
echo "📤 Publishing function..."
PUBLISH_OUTPUT=$(aws cloudfront publish-function \
    --name "$FUNCTION_NAME" \
    --if-match "$ETAG" \
    --output json 2>/dev/null || echo "{}")

if [[ -z "$PUBLISH_OUTPUT" || "$PUBLISH_OUTPUT" == "{}" ]]; then
    echo "⚠️  Function might already be published, continuing..."
    FUNCTION_ARN=$(aws cloudfront describe-function \
        --name "$FUNCTION_NAME" \
        --stage LIVE \
        --query "FunctionSummary.FunctionMetadata.FunctionARN" \
        --output text)
else
    FUNCTION_ARN=$(echo "$PUBLISH_OUTPUT" | jq -r '.FunctionSummary.FunctionMetadata.FunctionARN')
fi

echo "✅ Function published: $FUNCTION_ARN"

# Step 4: Get current distribution config
echo "📋 Getting current distribution configuration..."
aws cloudfront get-distribution-config \
    --id "$DISTRIBUTION_ID" \
    --output json > /tmp/distribution-config.json

# Extract ETag and config
DIST_ETAG=$(jq -r '.ETag' /tmp/distribution-config.json)
jq '.DistributionConfig' /tmp/distribution-config.json > /tmp/distribution-config-only.json

# Step 5: Update distribution config to add the function association
echo "🔧 Updating distribution configuration..."

# Add function association to the default cache behavior
jq --arg arn "$FUNCTION_ARN" '.DefaultCacheBehavior.FunctionAssociations = {
    "Quantity": 1,
    "Items": [
        {
            "FunctionARN": $arn,
            "EventType": "viewer-request"
        }
    ]
}' /tmp/distribution-config-only.json > /tmp/distribution-config-updated.json

# Update the distribution
echo "📤 Applying configuration to CloudFront distribution..."
aws cloudfront update-distribution \
    --id "$DISTRIBUTION_ID" \
    --if-match "$DIST_ETAG" \
    --distribution-config file:///tmp/distribution-config-updated.json \
    --output json > /dev/null

echo "✅ Distribution updated successfully!"

# Clean up temporary files
rm -f /tmp/distribution-config.json
rm -f /tmp/distribution-config-only.json
rm -f /tmp/distribution-config-updated.json

echo ""
echo "🎉 Redirect setup complete!"
echo ""
echo "📝 The redirect is now active. It will:"
echo "   - Redirect http://scimigo.com → https://www.scimigo.com"
echo "   - Redirect https://scimigo.com → https://www.scimigo.com"
echo "   - Keep all URL paths intact during redirect"
echo ""
echo "⏱️  Note: CloudFront changes may take 5-10 minutes to propagate globally."
echo ""
echo "🧪 Test the redirect:"
echo "   curl -I https://scimigo.com"
echo "   (Should show '301 Moved Permanently' with Location: https://www.scimigo.com)