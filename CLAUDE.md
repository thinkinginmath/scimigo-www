# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SciMigo promotional website - a static Next.js site for the upcoming AI-powered STEM tutor platform. The site is configured for static export and deployment to AWS S3/CloudFront.

## Common Development Commands

```bash
# Start development server
npm run dev

# Build static site
npm run build

# Deploy to AWS (from project root)
cd deploy && ./deploy.sh

# Create CloudFront distribution (one-time setup)
cd deploy && ./create-cloudfront.sh

# Setup DNS records (one-time setup)
cd deploy && ./setup-dns.sh
```

## Architecture

This is a Next.js 14 static site with:

- **Pages Router**: Uses `pages/` directory for routing
- **Static Export**: Configured with `output: 'export'` in next.config.js
- **Blog System**: Markdown-based using gray-matter for frontmatter parsing
- **Styling**: Tailwind CSS with custom theme colors using CSS variables
- **Analytics**: Google Analytics integration via gtag.js

### Key Directories

- `pages/`: Next.js page components and routing
- `components/`: Reusable React components (Layout, Navbar, Footer)
- `posts/`: Markdown blog content files
- `deploy/`: AWS deployment scripts and configuration
- `public/images/`: Static assets including app icons
- `styles/`: Global CSS and component-specific modules

### Important Files

- `pages/_app.js`: App wrapper with GA tracking and global styles
- `pages/blog/[slug].js`: Dynamic blog post rendering
- `lib/utils.js`: Markdown processing utilities
- `deploy/config.json`: AWS deployment configuration

## Deployment

The site deploys to AWS infrastructure:
1. Static files hosted on S3
2. CloudFront CDN distribution
3. Route 53 DNS management
4. ACM SSL certificate (must be in us-east-1)

Deployment creates appropriate cache headers and CloudFront invalidations automatically.

## Blog System

To add a new blog post:
1. Create a markdown file in `posts/` directory
2. Include frontmatter with title, date, author, excerpt
3. The slug is derived from the filename

Example frontmatter:
```yaml
---
title: "Your Post Title"
date: "2024-12-25"
author: "Author Name"
excerpt: "Brief description"
---
```

## Styling Approach

The project uses Tailwind CSS with:
- Custom color scheme defined in CSS variables (globals.css)
- Dark mode support via `darkMode: 'class'`
- Component-specific styles in *.module.css files
- Responsive design with mobile-first approach

## Development Notes

- The site is optimized for static hosting (no server-side features)
- Images are unoptimized for static export compatibility
- Trailing slashes are enabled for S3/CloudFront compatibility
- All blog posts are processed at build time
- Google Analytics tracks page views automatically