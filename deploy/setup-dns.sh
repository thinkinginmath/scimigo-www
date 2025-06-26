#!/bin/bash

# Setup Route 53 DNS records for SciMigo WWW Site
set -e

# Load configuration
CONFIG_FILE="$(dirname "$0")/config.json"
if [[ ! -f "$CONFIG_FILE" ]]; then
    echo "Error: config.json not found at $CONFIG_FILE"
    exit 1
fi

DOMAIN=$(jq -r '.domain' "$CONFIG_FILE")

echo "🌐 Setting up DNS records for $DOMAIN"

# Get hosted zone ID
HOSTED_ZONE_ID=$(aws route53 list-hosted-zones-by-name \
    --dns-name "$DOMAIN" \
    --query "HostedZones[0].Id" \
    --output text | sed 's|/hostedzone/||')

if [[ -z "$HOSTED_ZONE_ID" || "$HOSTED_ZONE_ID" == "None" ]]; then
    echo "❌ Error: Hosted zone for $DOMAIN not found"
    echo "Please create a hosted zone in Route 53 for $DOMAIN first"
    exit 1
fi

echo "📍 Found hosted zone: $HOSTED_ZONE_ID"

# Get CloudFront distribution domain
DISTRIBUTION_DOMAIN=$(aws cloudfront list-distributions \
    --query "DistributionList.Items[?Comment=='SciMigo WWW Site'].DomainName" \
    --output text)

if [[ -z "$DISTRIBUTION_DOMAIN" || "$DISTRIBUTION_DOMAIN" == "None" ]]; then
    echo "❌ Error: CloudFront distribution not found"
    echo "Please run create-cloudfront.sh first"
    exit 1
fi

echo "🌐 CloudFront domain: $DISTRIBUTION_DOMAIN"

# Create DNS change batch
cat > /tmp/dns-changes.json << EOF
{
    "Changes": [
        {
            "Action": "UPSERT",
            "ResourceRecordSet": {
                "Name": "$DOMAIN",
                "Type": "A",
                "AliasTarget": {
                    "DNSName": "$DISTRIBUTION_DOMAIN",
                    "EvaluateTargetHealth": false,
                    "HostedZoneId": "Z2FDTNDATAQYW2"
                }
            }
        },
        {
            "Action": "UPSERT",
            "ResourceRecordSet": {
                "Name": "www.$DOMAIN",
                "Type": "A",
                "AliasTarget": {
                    "DNSName": "$DISTRIBUTION_DOMAIN",
                    "EvaluateTargetHealth": false,
                    "HostedZoneId": "Z2FDTNDATAQYW2"
                }
            }
        }
    ]
}
EOF

echo "📝 Creating DNS records..."
CHANGE_ID=$(aws route53 change-resource-record-sets \
    --hosted-zone-id "$HOSTED_ZONE_ID" \
    --change-batch file:///tmp/dns-changes.json \
    --query "ChangeInfo.Id" \
    --output text)

echo "✅ DNS records created!"
echo "🔄 Change ID: $CHANGE_ID"

echo ""
echo "⏳ DNS propagation may take up to 5 minutes"
echo "🌐 Your site will be available at:"
echo "   - https://$DOMAIN"
echo "   - https://www.$DOMAIN"

# Clean up
rm /tmp/dns-changes.json

echo "🎉 DNS setup complete!"