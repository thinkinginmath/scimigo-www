#!/bin/bash

# Setup non-www to www redirect using CloudFront Function
# Infrastructure as Code approach for consistency and repeatability

set -e

echo "🔄 Setting up non-www to www redirect for SciMigo"
echo "Using Infrastructure as Code approach"

# Configuration
DOMAIN="scimigo.com"
DISTRIBUTION_ID="E3EFJHOR5Y7Y8V"
FUNCTION_NAME="redirect-non-www-to-www-v2"

# Step 1: Create the CloudFront Function
echo "📝 Creating CloudFront Function..."

# Function code
cat > /tmp/redirect-function.js << 'EOF'
function handler(event) {
    var request = event.request;
    var host = request.headers.host.value;
    
    // Redirect non-www to www
    if (host === 'scimigo.com') {
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                location: { value: 'https://www.scimigo.com' + request.uri }
            }
        };
    }
    
    return request;
}
EOF

# Check if function exists
EXISTING=$(aws cloudfront list-functions \
    --query "FunctionList.Items[?Name=='$FUNCTION_NAME'].Name | [0]" \
    --output text 2>/dev/null || echo "")

if [[ "$EXISTING" == "$FUNCTION_NAME" ]]; then
    echo "⚠️  Function exists. Updating..."
    
    # Get current ETag
    ETAG=$(aws cloudfront describe-function \
        --name "$FUNCTION_NAME" \
        --query "ETag" \
        --output text)
    
    # Update function
    aws cloudfront update-function \
        --name "$FUNCTION_NAME" \
        --if-match "$ETAG" \
        --function-code fileb:///tmp/redirect-function.js \
        --function-config Comment="Redirect non-www to www",Runtime="cloudfront-js-2.0" \
        --output json > /tmp/function-update.json
    
    ETAG=$(jq -r '.ETag' /tmp/function-update.json)
else
    echo "Creating new function..."
    
    # Create function
    aws cloudfront create-function \
        --name "$FUNCTION_NAME" \
        --function-code fileb:///tmp/redirect-function.js \
        --function-config Comment="Redirect non-www to www",Runtime="cloudfront-js-2.0" \
        --output json > /tmp/function-create.json
    
    ETAG=$(jq -r '.ETag' /tmp/function-create.json)
fi

echo "✅ Function created/updated"

# Step 2: Publish the function
echo "📤 Publishing function..."

# Check if already published
IS_PUBLISHED=$(aws cloudfront describe-function \
    --name "$FUNCTION_NAME" \
    --stage LIVE \
    --query "FunctionSummary.FunctionMetadata.Stage" \
    --output text 2>/dev/null || echo "")

if [[ "$IS_PUBLISHED" == "LIVE" ]]; then
    echo "⚠️  Function already published"
    FUNCTION_ARN=$(aws cloudfront describe-function \
        --name "$FUNCTION_NAME" \
        --stage LIVE \
        --query "FunctionSummary.FunctionMetadata.FunctionARN" \
        --output text)
else
    # Publish function
    aws cloudfront publish-function \
        --name "$FUNCTION_NAME" \
        --if-match "$ETAG" \
        --output json > /tmp/function-publish.json
    
    FUNCTION_ARN=$(jq -r '.FunctionSummary.FunctionMetadata.FunctionARN' /tmp/function-publish.json)
fi

echo "✅ Function published: $FUNCTION_ARN"

# Step 3: Associate function with CloudFront distribution
echo "🔧 Updating CloudFront distribution..."

# Get current distribution config
aws cloudfront get-distribution-config \
    --id "$DISTRIBUTION_ID" \
    --output json > /tmp/distribution-config.json

DIST_ETAG=$(jq -r '.ETag' /tmp/distribution-config.json)

# Extract just the config
jq '.DistributionConfig' /tmp/distribution-config.json > /tmp/config-only.json

# Add function association
jq --arg arn "$FUNCTION_ARN" '
    .DefaultCacheBehavior.FunctionAssociations = {
        "Quantity": 1,
        "Items": [
            {
                "FunctionARN": $arn,
                "EventType": "viewer-request"
            }
        ]
    }
' /tmp/config-only.json > /tmp/config-updated.json

# Apply the update
echo "📤 Applying configuration..."
aws cloudfront update-distribution \
    --id "$DISTRIBUTION_ID" \
    --if-match "$DIST_ETAG" \
    --distribution-config file:///tmp/config-updated.json \
    --output json > /tmp/distribution-update.json

echo "✅ Distribution updated successfully!"

# Clean up
rm -f /tmp/redirect-function.js
rm -f /tmp/function-*.json
rm -f /tmp/distribution-config.json
rm -f /tmp/config-*.json
rm -f /tmp/distribution-update.json

echo ""
echo "🎉 Redirect setup complete!"
echo ""
echo "📝 Summary:"
echo "   - Function Name: $FUNCTION_NAME"
echo "   - Function ARN: $FUNCTION_ARN"
echo "   - Distribution: $DISTRIBUTION_ID"
echo ""
echo "⏱️  CloudFront changes take 5-10 minutes to propagate globally"
echo ""
echo "🧪 Test the redirect after propagation:"
echo "   curl -I https://scimigo.com"
echo "   Should return: 301 Moved Permanently"
echo "   Location: https://www.scimigo.com"