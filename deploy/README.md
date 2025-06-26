# SciMigo WWW Site Deployment

AWS CLI deployment scripts for the SciMigo marketing website.

## Prerequisites

1. **AWS CLI** installed and configured
2. **jq** installed for JSON parsing
3. **Node.js** and npm for building the site
4. **ACM Certificate** created in us-east-1 for `*.scimigo.com`

## Setup

1. **Update config.json**:
   ```bash
   cd deploy
   # Edit config.json with your AWS account details
   ```

2. **Set executable permissions**:
   ```bash
   chmod +x *.sh
   ```

## Deployment Steps

### 1. Initial Setup (one-time)
```bash
# Create CloudFront distribution
./create-cloudfront.sh

# Wait 15-20 minutes for distribution to deploy
# Check status: aws cloudfront get-distribution --id YOUR_DISTRIBUTION_ID

# Setup DNS records
./setup-dns.sh
```

### 2. Regular Deployments
```bash
# Build and deploy to S3, invalidate CloudFront
./deploy.sh
```

## Configuration

Edit `config.json`:
- `certificateArn`: Your ACM certificate ARN (from us-east-1)
- `domain`: Your domain (scimigo.com)
- `s3Bucket`: S3 bucket name (usually same as domain)
- `region`: AWS region (us-east-1 recommended)

## What Each Script Does

### `deploy.sh`
- Builds Next.js site (`npm run build`)
- Creates/configures S3 bucket
- Uploads files to S3 with appropriate cache headers
- Creates CloudFront invalidation

### `create-cloudfront.sh` 
- Creates CloudFront distribution
- Configures SSL certificate
- Sets up custom error pages
- Enables compression

### `setup-dns.sh`
- Creates Route 53 A records
- Points apex and www to CloudFront
- Uses ALIAS records for better performance

## Troubleshooting

**Certificate errors**: Ensure certificate is in us-east-1
**DNS issues**: Check Route 53 hosted zone exists
**S3 errors**: Verify AWS permissions

## Next.js Configuration

Ensure `next.config.js` has:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```