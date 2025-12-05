#!/bin/bash

# Horizon Credit Repair - Server Setup Script
# Run this ONCE on a fresh Ubuntu server
# Usage: ssh root@65.38.99.52 'bash -s' < deploy/setup-server.sh

set -e

echo "🖥️  Horizon Credit Repair - Server Setup"
echo "========================================"
echo ""

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Node.js 20.x
echo "📦 Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install pnpm
echo "📦 Installing pnpm..."
npm install -g pnpm

# Install PM2
echo "📦 Installing PM2..."
npm install -g pm2

# Install nginx
echo "📦 Installing nginx..."
apt install -y nginx

# Install certbot
echo "📦 Installing certbot..."
apt install -y certbot python3-certbot-nginx

# Create app directory
echo "📁 Creating application directory..."
mkdir -p /var/www/horizon
chown -R $USER:$USER /var/www/horizon

# Create nginx config
echo "⚙️  Configuring nginx..."
cat > /etc/nginx/sites-available/horizoncreditrepair.com << 'EOF'
server {
    listen 80;
    server_name horizoncreditrepair.com www.horizoncreditrepair.com;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Stripe webhook - longer timeout
    location /api/webhooks/stripe {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300;
    }
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/horizoncreditrepair.com /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and reload nginx
nginx -t && systemctl reload nginx

# Configure firewall
echo "🔒 Configuring firewall..."
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw --force enable

# Setup PM2 startup
echo "⚙️  Configuring PM2 startup..."
pm2 startup systemd -u root --hp /root
pm2 save

echo ""
echo "✅ Server setup complete!"
echo ""
echo "Next steps:"
echo "1. Point your domain (horizoncreditrepair.com) to this server's IP"
echo "2. Run: certbot --nginx -d horizoncreditrepair.com -d www.horizoncreditrepair.com"
echo "3. Deploy your application with: ./deploy/deploy.sh"
echo ""

