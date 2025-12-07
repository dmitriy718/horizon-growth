#!/bin/bash
# Cron script to generate daily blog posts
# Add to crontab: 0 7 * * * /var/www/horizon/deploy/cron-blog-generator.sh

SITE_URL="https://horizoncredit.net"
API_KEY="${OPENAI_API_KEY}"

# Generate new blog post
curl -X POST "${SITE_URL}/api/blog/generate" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${API_KEY}" \
  --max-time 120 \
  >> /var/log/horizon-blog-generator.log 2>&1

echo "Blog generation completed at $(date)" >> /var/log/horizon-blog-generator.log


