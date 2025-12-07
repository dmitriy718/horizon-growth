#!/bin/bash

# Horizon Credit Repair - Error Log Monitor
# This script runs daily to check for errors and sends a summary
# Add to crontab: 0 8 * * * /var/www/horizon/deploy/cron-error-monitor.sh

PROJECT_ROOT="/var/www/horizon"
LOG_DIR="$PROJECT_ROOT/logs"
ERROR_LOG="$LOG_DIR/errors.log"
SUMMARY_LOG="$LOG_DIR/error-summary.log"
WEBSITE_DIR="$PROJECT_ROOT/src/website"

# Load environment variables
cd "$WEBSITE_DIR" || exit 1
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

echo "=== Horizon Error Monitor - $(date) ===" >> "$SUMMARY_LOG"

# Check if error log exists
if [ ! -f "$ERROR_LOG" ]; then
  echo "No error log found - all clear!" >> "$SUMMARY_LOG"
  exit 0
fi

# Count errors from last 24 hours
YESTERDAY=$(date -d "yesterday" +%Y-%m-%d)
TODAY=$(date +%Y-%m-%d)

# Get error counts by type
TOTAL_ERRORS=$(grep -c "$TODAY\|$YESTERDAY" "$ERROR_LOG" 2>/dev/null || echo "0")
GLOBAL_ERRORS=$(grep -c "global_error" "$ERROR_LOG" 2>/dev/null || echo "0")
CLIENT_ERRORS=$(grep -c "client_error" "$ERROR_LOG" 2>/dev/null || echo "0")
SERVER_ERRORS=$(grep -c "server_error" "$ERROR_LOG" 2>/dev/null || echo "0")

echo "Total errors (24h): $TOTAL_ERRORS" >> "$SUMMARY_LOG"
echo "  - Global: $GLOBAL_ERRORS" >> "$SUMMARY_LOG"
echo "  - Client: $CLIENT_ERRORS" >> "$SUMMARY_LOG"
echo "  - Server: $SERVER_ERRORS" >> "$SUMMARY_LOG"

# If there are critical errors, send notification
if [ "$GLOBAL_ERRORS" -gt 0 ] || [ "$SERVER_ERRORS" -gt 5 ]; then
  echo "⚠️  Critical errors detected!" >> "$SUMMARY_LOG"
  
  # Send Slack notification if webhook is configured
  if [ -n "$SLACK_ERROR_WEBHOOK" ]; then
    curl -s -X POST "$SLACK_ERROR_WEBHOOK" \
      -H "Content-Type: application/json" \
      -d "{
        \"text\": \"🚨 *Horizon Error Report*\n• Total: $TOTAL_ERRORS\n• Global: $GLOBAL_ERRORS\n• Server: $SERVER_ERRORS\n\nCheck logs at: $ERROR_LOG\"
      }"
  fi
fi

# Rotate log if it's too large (>10MB)
LOG_SIZE=$(stat -c %s "$ERROR_LOG" 2>/dev/null || echo "0")
if [ "$LOG_SIZE" -gt 10485760 ]; then
  echo "Rotating error log (size: $LOG_SIZE bytes)" >> "$SUMMARY_LOG"
  mv "$ERROR_LOG" "$ERROR_LOG.$(date +%Y%m%d)"
  gzip "$ERROR_LOG.$(date +%Y%m%d)"
fi

echo "=== Monitor complete ===" >> "$SUMMARY_LOG"
echo "" >> "$SUMMARY_LOG"

