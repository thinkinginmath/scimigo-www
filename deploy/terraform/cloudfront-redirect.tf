# CloudFront Function for non-www to www redirect
# Standard Infrastructure as Code using Terraform

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1" # CloudFront functions must be in us-east-1
}

# CloudFront Function for redirect
resource "aws_cloudfront_function" "www_redirect" {
  name    = "redirect-non-www-to-www"
  runtime = "cloudfront-js-2.0"
  comment = "Redirect non-www to www for scimigo.com"
  publish = true

  code = <<-EOT
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
  EOT
}

# Data source to get existing CloudFront distribution
data "aws_cloudfront_distribution" "main" {
  id = "E3EFJHOR5Y7Y8V"
}

# Note: To update the distribution with the function, you would need to:
# 1. Import the existing distribution into Terraform state
# 2. Manage the entire distribution configuration in Terraform
# 
# For existing distributions, the bash script approach is more practical
# unless you want to fully manage the distribution in Terraform

output "function_arn" {
  value = aws_cloudfront_function.www_redirect.arn
  description = "ARN of the redirect function to add to CloudFront distribution"
}

output "function_status" {
  value = aws_cloudfront_function.www_redirect.status
  description = "Status of the CloudFront function"
}