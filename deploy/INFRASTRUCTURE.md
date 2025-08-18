# SciMigo Infrastructure as Code

This directory contains infrastructure deployment scripts following IaC best practices.

## Standard Practice for Infrastructure Management

### Why Infrastructure as Code?

1. **Repeatability**: Deploy the same configuration across environments
2. **Version Control**: Track infrastructure changes in Git
3. **Documentation**: Code serves as documentation
4. **Automation**: CI/CD pipeline integration
5. **Disaster Recovery**: Quickly rebuild infrastructure

## Available Approaches

### 1. Shell Scripts (Current Implementation)
**Best for**: Existing infrastructure, quick updates, AWS CLI familiarity

```bash
# Setup www redirect
./setup-www-redirect.sh

# Deploy static site
./deploy.sh
```

**Pros**:
- Simple and direct
- No additional tools needed
- Works with existing resources
- Easy to understand and modify

**Cons**:
- Less declarative than Terraform
- Manual state management

### 2. Terraform (Industry Standard)
**Best for**: New infrastructure, full IaC management

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

**Pros**:
- Declarative configuration
- State management
- Drift detection
- Multi-cloud support

**Cons**:
- Learning curve
- Requires importing existing resources
- More complex for simple tasks

### 3. AWS CloudFormation
**Best for**: AWS-only environments, enterprise requirements

```yaml
# cloudformation/redirect-function.yaml
Resources:
  RedirectFunction:
    Type: AWS::CloudFront::Function
    Properties:
      Name: redirect-non-www-to-www
      # ...
```

**Pros**:
- Native AWS support
- Rollback capabilities
- Stack management

**Cons**:
- Verbose syntax
- AWS-only

## Current Infrastructure

### Components
- **S3 Bucket**: Static website hosting (`scimigo.com`)
- **CloudFront Distribution**: CDN with HTTPS (`E3EFJHOR5Y7Y8V`)
- **ACM Certificate**: SSL/TLS certificate
- **Route 53**: DNS management
- **CloudFront Function**: Non-www to www redirect

### Configuration Files
- `config.json`: Deployment configuration
- `setup-www-redirect.sh`: Redirect function deployment
- `deploy.sh`: Static site deployment
- `create-cloudfront.sh`: CloudFront distribution setup
- `setup-dns.sh`: DNS configuration

## Best Practices Implementation

### 1. Idempotency
All scripts check for existing resources before creating:
```bash
if [[ "$EXISTING" == "$FUNCTION_NAME" ]]; then
    echo "Updating existing function..."
else
    echo "Creating new function..."
fi
```

### 2. Error Handling
Scripts use `set -e` and validate operations:
```bash
set -e  # Exit on error
if [[ ! -f "$CONFIG_FILE" ]]; then
    echo "Error: config.json not found"
    exit 1
fi
```

### 3. Configuration Management
Centralized configuration in `config.json`:
```json
{
  "domain": "scimigo.com",
  "s3Bucket": "scimigo.com",
  "distributionId": "E3EFJHOR5Y7Y8V"
}
```

### 4. Clean Up
Temporary files are always cleaned:
```bash
# Clean up
rm -f /tmp/*.json
```

## Deployment Workflow

### Initial Setup
1. Create S3 bucket: `aws s3 mb s3://scimigo.com`
2. Create CloudFront: `./create-cloudfront.sh`
3. Setup DNS: `./setup-dns.sh`
4. Add redirect: `./setup-www-redirect.sh`

### Regular Deployments
```bash
# Build and deploy site
npm run build
./deploy.sh

# Update redirect function if needed
./setup-www-redirect.sh
```

### Rollback Procedure
1. CloudFront keeps previous versions
2. S3 versioning can be enabled
3. Function versions are maintained

## Monitoring and Validation

### Health Checks
```bash
# Check redirect
curl -I https://scimigo.com

# Check main site
curl -I https://www.scimigo.com

# Check CloudFront status
aws cloudfront get-distribution --id E3EFJHOR5Y7Y8V --query "Distribution.Status"
```

### Logs
- CloudFront logs: Can be enabled to S3
- Function logs: CloudWatch Logs
- S3 access logs: Can be enabled

## Migration Path to Full IaC

If you want to move to full Terraform management:

1. **Import existing resources**:
```bash
terraform import aws_s3_bucket.main scimigo.com
terraform import aws_cloudfront_distribution.main E3EFJHOR5Y7Y8V
```

2. **Generate configuration**:
```bash
terraform show -no-color > imported.tf
```

3. **Refactor and organize**:
- Split into modules
- Add variables
- Configure remote state

4. **Test thoroughly**:
```bash
terraform plan  # Should show no changes
```

## Security Considerations

- ✅ HTTPS only (redirect HTTP to HTTPS)
- ✅ ACM certificate for SSL/TLS
- ✅ S3 bucket not directly accessible
- ✅ CloudFront Origin Access Identity (OAI)
- ⚠️ Consider adding WAF for DDoS protection
- ⚠️ Enable CloudFront logging for auditing

## Cost Optimization

- CloudFront: ~$0.085 per GB transferred
- S3: ~$0.023 per GB stored
- Route 53: $0.50 per hosted zone
- Function executions: First 2M free

## Recommendations

1. **For this project**: Continue with shell scripts - they're simple, effective, and maintainable
2. **For production**: Consider Terraform for full infrastructure management
3. **For enterprise**: Use CloudFormation or CDK for AWS-native IaC

The current approach strikes a good balance between simplicity and best practices.