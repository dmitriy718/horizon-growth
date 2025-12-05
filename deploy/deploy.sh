#!/bin/bash

# Horizon Credit Repair - Deployment Script
# Usage: ./deploy/deploy.sh

set -e

# Configuration
SERVER_IP="65.38.99.52"
SERVER_USER="root"
REMOTE_DIR="/var/www/horizon"
LOCAL_DIR="$(dirname "$0")/.."

echo "🚀 Horizon Credit Repair - Deployment Script"
echo "============================================="
echo ""

# Check if we can reach the server
echo "📡 Checking server connectivity..."
if ! ping -c 1 $SERVER_IP &> /dev/null; then
    echo "❌ Cannot reach server at $SERVER_IP"
    exit 1
fi
echo "✅ Server is reachable"
echo ""

# Build locally first
echo "🔨 Building application locally..."
cd "$LOCAL_DIR"
pnpm install
pnpm --filter @horizon/website build
echo "✅ Build complete"
echo ""

# Sync files to server
echo "📦 Syncing files to server..."
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude '.env*' \
    --exclude '*.log' \
    --exclude '.next/cache' \
    "$LOCAL_DIR/" "$SERVER_USER@$SERVER_IP:$REMOTE_DIR/"
echo "✅ Files synced"
echo ""

# Remote setup and restart
echo "🔄 Installing dependencies and restarting on server..."
ssh "$SERVER_USER@$SERVER_IP" << 'ENDSSH'
cd /var/www/horizon

# Install dependencies
pnpm install --frozen-lockfile

# Build on server (in case of platform-specific dependencies)
pnpm --filter @horizon/website build

# Restart with PM2
if pm2 list | grep -q "horizon-web"; then
    pm2 restart horizon-web
else
    pm2 start pnpm --name "horizon-web" -- --filter @horizon/website start
    pm2 save
fi

echo "✅ Application restarted"
ENDSSH

echo ""
echo "🎉 Deployment complete!"
echo "   Site: https://horizongrowth.com"
echo ""

