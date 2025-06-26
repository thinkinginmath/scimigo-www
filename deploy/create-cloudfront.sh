#!/bin/bash

# Create CloudFront Distribution for SciMigo WWW Site
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

echo "🌐 Creating CloudFront Distribution"
echo "Domain: $DOMAIN"
echo "S3 Bucket: $S3_BUCKET"
echo "Certificate ARN: $CERT_ARN"

# Create CloudFront distribution configuration
cat > /tmp/cloudfront-config.json << EOF
{
    "CallerReference": "scimigo-www-$(date +%s)",
    "Comment": "SciMigo WWW Site",
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-$S3_BUCKET",
        "ViewerProtocolPolicy": "redirect-to-https",
        "TrustedSigners": {
            "Enabled": false,
            "Quantity": 0
        },
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {
                "Forward": "none"
            }
        },
        "MinTTL": 0,
        "DefaultTTL": 86400,
        "MaxTTL": 31536000,
        "Compress": true,
        "AllowedMethods": {
            "Quantity": 2,
            "Items": ["GET", "HEAD"],
            "CachedMethods": {
                "Quantity": 2,
                "Items": ["GET", "HEAD"]
            }
        }
    },
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-$S3_BUCKET",
                "DomainName": "$S3_BUCKET.s3-website-$REGION.amazonaws.com",
                "CustomOriginConfig": {
                    "HTTPPort": 80,
                    "HTTPSPort": 443,
                    "OriginProtocolPolicy": "http-only"
                }
            }
        ]
    },
    "Aliases": {
        "Quantity": 2,
        "Items": ["$DOMAIN", "www.$DOMAIN"]
    },
    "DefaultRootObject": "index.html",
    "CustomErrorResponses": {
        "Quantity": 1,
        "Items": [
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/404.html",
                "ResponseCode": "404",
                "ErrorCachingMinTTL": 300
            }
        ]
    },
    "Enabled": true,
    "PriceClass": "PriceClass_100",
    "ViewerCertificate": {
        "ACMCertificateArn": "$CERT_ARN",
        "SSLSupportMethod": "sni-only",
        "MinimumProtocolVersion": "TLSv1.2_2021",
        "CertificateSource": "acm"
    },
    "HttpVersion": "http2"
}
EOF

echo "📋 Creating CloudFront distribution..."
DISTRIBUTION_OUTPUT=$(aws cloudfront create-distribution --distribution-config file:///tmp/cloudfront-config.json)

DISTRIBUTION_ID=$(echo "$DISTRIBUTION_OUTPUT" | jq -r '.Distribution.Id')
DISTRIBUTION_DOMAIN=$(echo "$DISTRIBUTION_OUTPUT" | jq -r '.Distribution.DomainName')

echo "✅ CloudFront distribution created!"
echo "🆔 Distribution ID: $DISTRIBUTION_ID"
echo "🌐 CloudFront Domain: $DISTRIBUTION_DOMAIN"

echo ""
echo "📝 Next steps:"
echo "1. Wait for distribution to deploy (15-20 minutes)"
echo "2. Update your DNS records in Route 53:"
echo "   - $DOMAIN -> $DISTRIBUTION_DOMAIN (ALIAS)"
echo "   - www.$DOMAIN -> $DISTRIBUTION_DOMAIN (ALIAS)"
echo "3. Test your site at https://$DOMAIN"

# Clean up
rm /tmp/cloudfront-config.json

echo "🎉 CloudFront setup complete!"