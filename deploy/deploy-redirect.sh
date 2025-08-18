#!/bin/bash

echo "🔄 Setting up redirect using S3 redirect rules instead..."

# This is a simpler approach using S3 bucket redirect rules
BUCKET="scimigo.com"

# Create redirect rules configuration
cat > /tmp/redirect-rules.json << 'EOF'
{
    "RedirectAllRequestsTo": {
        "HostName": "www.scimigo.com",
        "Protocol": "https"
    }
}
EOF

echo "📝 Creating separate S3 bucket for non-www domain redirect..."

# Check if bucket exists
if aws s3 ls "s3://redirect-${BUCKET}" 2>/dev/null; then
    echo "Bucket already exists"
else
    aws s3 mb "s3://redirect-${BUCKET}" --region us-east-1
fi

# Configure bucket for website redirect
aws s3api put-bucket-website \
    --bucket "redirect-${BUCKET}" \
    --website-configuration file:///tmp/redirect-rules.json

echo "✅ S3 redirect bucket configured"

# Make bucket publicly accessible
cat > /tmp/bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::redirect-${BUCKET}/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy \
    --bucket "redirect-${BUCKET}" \
    --policy file:///tmp/bucket-policy.json

echo "✅ Bucket policy applied"

# Get the CloudFront distribution
DIST_ID="E3EFJHOR5Y7Y8V"

echo ""
echo "📝 Next Steps:"
echo "1. You'll need to update your CloudFront distribution origins"
echo "2. Add a new origin for redirect-${BUCKET}.s3-website-us-east-1.amazonaws.com"
echo "3. Create a behavior for the non-www domain that uses this origin"
echo ""
echo "Alternatively, update your DNS directly:"
echo "  - Point scimigo.com (non-www) directly to the www CloudFront distribution"
echo "  - This is the simplest approach"

# Clean up
rm -f /tmp/redirect-rules.json /tmp/bucket-policy.json