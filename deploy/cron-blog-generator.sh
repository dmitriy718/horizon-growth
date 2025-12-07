#!/bin/bash
# ==============================================================
# Horizon Credit Repair - Daily Blog Post Generator
# Runs at 7 AM EST via cron to generate and auto-publish a new
# SEO-optimized blog post about credit repair topics
#
# Crontab entry: 0 7 * * * /var/www/horizon/deploy/cron-blog-generator.sh
# ==============================================================

LOG_FILE="/var/log/horizon-blog-generator.log"
SITE_URL="https://horizoncredit.net"
ENV_FILE="/var/www/horizon/src/website/.env.local"

# Create log file if it doesn't exist
touch "$LOG_FILE"

echo "========================================" >> "$LOG_FILE"
echo "Starting blog generation at $(date)" >> "$LOG_FILE"

# Load environment variables
if [ -f "$ENV_FILE" ]; then
    # Export variables from .env.local, handling special characters
    while IFS='=' read -r key value; do
        # Skip comments and empty lines
        [[ "$key" =~ ^#.*$ ]] && continue
        [[ -z "$key" ]] && continue
        # Remove surrounding quotes from value
        value="${value%\"}"
        value="${value#\"}"
        value="${value%\'}"
        value="${value#\'}"
        export "$key=$value"
    done < "$ENV_FILE"
    echo "Loaded environment from $ENV_FILE" >> "$LOG_FILE"
else
    echo "ERROR: Environment file not found at $ENV_FILE" >> "$LOG_FILE"
    exit 1
fi

# Check if API key is set
if [ -z "$OPENAI_API_KEY" ]; then
    echo "ERROR: OPENAI_API_KEY not found in environment" >> "$LOG_FILE"
    exit 1
fi

API_KEY="${BLOG_GENERATION_API_KEY:-$OPENAI_API_KEY}"

# Make the API request to generate and publish the blog post
echo "Calling blog generation API..." >> "$LOG_FILE"

response=$(curl -s -w "\n%{http_code}" -X POST "${SITE_URL}/api/blog/generate" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${API_KEY}" \
  --max-time 180)

# Extract HTTP status code (last line)
http_code=$(echo "$response" | tail -n1)
# Extract response body (everything except last line)
body=$(echo "$response" | sed '$d')

echo "HTTP Status: $http_code" >> "$LOG_FILE"
echo "Response: $body" >> "$LOG_FILE"

if [ "$http_code" = "200" ]; then
    # Extract post title from JSON response
    title=$(echo "$body" | grep -o '"title":"[^"]*"' | head -1 | sed 's/"title":"//;s/"$//')
    echo "SUCCESS: Published new blog post - $title" >> "$LOG_FILE"
else
    echo "ERROR: Blog generation failed with status $http_code" >> "$LOG_FILE"
fi

echo "Completed at $(date)" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"
