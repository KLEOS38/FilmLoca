# 🚀 Film Loca App - Deployment Checklist

## ✅ Pre-Deployment Checklist

### Build Verification
- [x] Production build created successfully
- [x] All assets optimized and minified
- [x] .htaccess file included for SPA routing
- [x] Service worker and manifest files included
- [x] All images and static assets included

### Environment Setup
- [ ] Supabase project URL configured
- [ ] Supabase anon key configured
- [ ] Domain URL updated in environment
- [ ] SSL certificate installed on domain
- [ ] CORS settings configured in Supabase

### File Upload
- [ ] All dist folder contents uploaded to cPanel
- [ ] Files placed in correct directory (public_html or subdirectory)
- [ ] File permissions set correctly (644 for files, 755 for directories)
- [ ] .htaccess file uploaded and working

### Functionality Testing
- [ ] Homepage loads correctly
- [ ] Navigation between pages works
- [ ] Property listings display
- [ ] User authentication works
- [ ] Profile section functions
- [ ] Messaging system works
- [ ] Mobile responsiveness verified
- [ ] PWA features work (if applicable)

## 📁 Required Files for Upload

Copy these files/folders from the `dist` directory to your cPanel:

```
dist/
├── index.html              # Main HTML file
├── .htaccess               # Apache configuration
├── manifest.json           # PWA manifest
├── robots.txt              # SEO robots file
├── sw.js                   # Service worker
├── favicon.ico             # Favicon
├── assets/                 # JS and CSS bundles
│   ├── index-*.js
│   ├── index-*.css
│   ├── react-vendor-*.js
│   ├── supabase-vendor-*.js
│   └── ui-vendor-*.js
├── [all image files]       # Property images, logos, etc.
└── env-config.js           # Environment configuration template
```

## 🔧 Critical Configuration Steps

### 1. Supabase Configuration
```bash
# In Supabase Dashboard → Settings → API
# Add your domain to: "Additional Redirect URLs"
https://yourdomain.com/*
https://www.yourdomain.com/*
```

### 2. Environment Variables
Edit `env-config.js` in your dist folder:
```javascript
window.VITE_SUPABASE_URL = 'https://your-project-id.supabase.co';
window.VITE_SUPABASE_ANON_KEY = 'your-anon-key-here';
window.VITE_APP_URL = 'https://yourdomain.com';
```

### 3. Update index.html
Add this before the closing </head> tag:
```html
<script src="env-config.js"></script>
```

## 🧪 Post-Deployment Tests

### Basic Functionality
- [ ] Page loads without errors
- [ ] All navigation links work
- [ ] Property images display
- [ ] Search and filters work

### User Features
- [ ] Login/Signup works
- [ ] Profile editing works
- [ ] Messaging system functions
- [ ] Booking system works

### Technical Checks
- [ ] No 404 errors on page refresh
- [ ] Console is clean (no errors)
- [ ] Network requests are successful
- [ ] Mobile version works correctly

## 📱 Mobile & PWA Testing
- [ ] Responsive design works on mobile
- [ ] Touch interactions work
- [ ] PWA installs correctly
- [ ] Service worker registers

## 🐛 Common Issues & Solutions

### 404 Errors
- **Problem**: Page refresh shows 404
- **Solution**: Ensure .htaccess is uploaded and mod_rewrite is enabled

### Supabase Connection
- **Problem**: API calls fail
- **Solution**: Check environment variables and CORS settings

### Images Not Loading
- **Problem**: Broken images
- **Solution**: Verify file paths and permissions

### White Screen
- **Problem**: App doesn't load
- **Solution**: Check browser console for JavaScript errors

## 📊 Performance Optimization
The build includes:
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Image optimization
- ✅ Gzip compression
- ✅ Browser caching

## 🔄 Update Process
1. Make changes locally
2. Run `npm run build`
3. Upload new dist contents
4. Clear browser cache
5. Test functionality

---

## 🎯 Ready for Deployment!

Once you've completed this checklist, your Film Loca app should be fully functional on cPanel hosting with:
- Modern React frontend
- Unified messaging system
- Property listing and booking
- User authentication
- Mobile-responsive design
- PWA capabilities

Good luck! 🚀
