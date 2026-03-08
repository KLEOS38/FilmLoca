# Film Loca App - cPanel Deployment Guide

## 📋 Overview
This guide will help you deploy your Film Loca React application to cPanel hosting.

## 🚀 Quick Steps

### 1. Upload Files to cPanel
1. Log in to your cPanel account
2. Open **File Manager**
3. Navigate to your public_html directory (or your desired subdirectory)
4. Upload the entire `dist` folder contents

### 2. Configure Environment Variables
In cPanel, you need to set up environment variables for your Supabase connection:

#### Option A: Using cPanel Environment Variables
1. Go to **cPanel → Software → MultiPHP INI Editor**
2. Add these lines to your PHP configuration:
   ```ini
   auto_prepend_file="/home/yourusername/public_html/.env.php"
   ```
3. Create a `.env.php` file with your variables:
   ```php
   <?php
   $_ENV['VITE_SUPABASE_URL'] = 'your_supabase_project_url';
   $_ENV['VITE_SUPABASE_ANON_KEY'] = 'your_supabase_anon_key';
   $_ENV['VITE_APP_NAME'] = 'Film Loca';
   $_ENV['VITE_APP_URL'] = 'https://yourdomain.com';
   ```

#### Option B: Modify index.html directly
1. Edit `dist/index.html`
2. Replace the placeholder script with your actual values:
   ```html
   <script>
     window.VITE_SUPABASE_URL = 'your_supabase_project_url';
     window.VITE_SUPABASE_ANON_KEY = = 'your_supabase_anon_key';
   </script>
   ```

### 3. Configure .htaccess
The `.htaccess` file is already included in the dist folder and should work for most cPanel setups. It handles:
- SPA routing (React Router)
- Proper MIME types
- Compression
- Caching

### 4. Test Your Deployment
1. Visit your domain: `https://yourdomain.com`
2. Check that all pages load correctly
3. Test the messaging system
4. Verify all functionality works

## 📁 Files Structure After Upload
```
public_html/
├── index.html
├── .htaccess
├── manifest.json
├── robots.txt
├── sw.js
├── assets/
│   ├── index-*.js
│   ├── index-*.css
│   ├── react-vendor-*.js
│   ├── supabase-vendor-*.js
│   └── ui-vendor-*.js
├── images/
│   ├── logo.png
│   ├── filmloca-*.jpg
│   └── ... (other images)
└── favicon.ico
```

## 🔧 Important Configuration Details

### Supabase Setup
Make sure your Supabase project is configured for your domain:
1. Go to Supabase Dashboard → Settings → API
2. Add your domain to the allowed origins
3. Ensure your anon key has the right permissions

### SSL Certificate
- Enable SSL in cPanel for HTTPS
- Update the VITE_APP_URL to use HTTPS

### Performance Optimization
The build is already optimized with:
- Code splitting
- Lazy loading
- Image optimization
- Gzip compression (via .htaccess)

## 🐛 Troubleshooting

### 404 Errors on Page Refresh
- Ensure `.htaccess` is properly uploaded
- Check that mod_rewrite is enabled in cPanel

### Supabase Connection Issues
- Verify your Supabase URL and keys
- Check CORS settings in Supabase
- Ensure HTTPS is properly configured

### Images Not Loading
- Verify image paths in the assets folder
- Check file permissions (should be 644)

### Messaging System Not Working
- Ensure messages table exists in Supabase
- Check RLS policies are properly configured
- Verify real-time subscriptions are enabled

## 📱 Mobile & PWA
The app includes PWA functionality:
- Service Worker (`sw.js`)
- Manifest file (`manifest.json`)
- Responsive design

## 🔄 Updates
To update your app:
1. Run `npm run build` locally
2. Upload the new dist folder contents
3. Clear browser cache if needed

## 📞 Support
If you encounter issues:
1. Check cPanel error logs
2. Verify file permissions
3. Test with a simple HTML file first
4. Contact your hosting provider if needed

---

## ✅ Pre-Deployment Checklist
- [ ] Supabase project configured with your domain
- [ ] Environment variables set correctly
- [ ] SSL certificate installed
- [ ] All files uploaded to correct directory
- [ ] .htaccess file in place
- [ ] Test all major functionality
- [ ] Check mobile responsiveness
- [ ] Verify messaging system works

Good luck with your deployment! 🚀
