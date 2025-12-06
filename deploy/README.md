# Horizon Credit Repair - Deployment Guide

## Server Requirements

- **OS**: Ubuntu 22.04+ or similar Linux distribution
- **Node.js**: v18.x or higher
- **Memory**: Minimum 2GB RAM
- **Storage**: 20GB+ SSD

## Pre-Deployment Checklist

- [ ] Domain (horizoncredit.net) pointing to server IP (65.38.99.52)
- [ ] SSL certificate configured (Let's Encrypt recommended)
- [ ] Environment variables configured
- [ ] Stripe webhook endpoint created in Stripe Dashboard
- [ ] SendGrid account configured (when available)
- [ ] OpenAI API key ready

## Quick Deploy

```bash
# On your local machine
./deploy/deploy.sh
```

## Manual Deployment Steps

### 1. Server Setup (First Time Only)

```bash
# SSH into server
ssh root@65.38.99.52

# Update system
apt update && apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Install PM2 for process management
npm install -g pm2

# Install nginx
apt install -y nginx

# Install certbot for SSL
apt install -y certbot python3-certbot-nginx
```

### 2. Configure Nginx

Create `/etc/nginx/sites-available/horizoncredit.net`:

```nginx
server {
    listen 80;
    server_name horizoncredit.net www.horizoncredit.net;
    
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
    }
}
```

Enable the site:
```bash
ln -s /etc/nginx/sites-available/horizoncredit.net /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

### 3. Setup SSL

```bash
certbot --nginx -d horizoncredit.net -d www.horizoncredit.net
```

### 4. Deploy Application

```bash
# Create app directory
mkdir -p /var/www/horizon
cd /var/www/horizon

# Clone/copy application files
# (use rsync or git)

# Install dependencies
pnpm install

# Build
pnpm --filter @horizon/website build

# Start with PM2
pm2 start pnpm --name "horizon-web" -- --filter @horizon/website start
pm2 save
pm2 startup
```

## Environment Variables

Create `/var/www/horizon/src/website/.env.local` on the server:

```bash
NEXT_PUBLIC_SITE_URL=https://horizoncredit.net
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PREMIER_PRICE_ID=price_xxx
STRIPE_PREMIER_PLUS_PRICE_ID=price_xxx
OPENAI_API_KEY=sk-proj-xxx
SENDGRID_API_KEY=SG.xxx
```

## Monitoring

```bash
# View logs
pm2 logs horizon-web

# Monitor
pm2 monit

# Check status
pm2 status
```

## Updates

```bash
# Pull latest changes
cd /var/www/horizon
git pull

# Install new dependencies
pnpm install

# Rebuild
pnpm --filter @horizon/website build

# Restart
pm2 restart horizon-web
```

