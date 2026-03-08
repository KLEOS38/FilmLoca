# 🎬 Email Template with Film Loca Logo

## ✅ **Minimal Template with Your Actual Logo**

### **Logo Options:**
- **Primary**: `/public/logo.png` (Your main logo)
- **Alternative**: `/public/logo-IMAGERY.png` (Imagery version)

## 🎯 **Email Template with Logo**

**Subject:** `Reset your Film Loca password`

**HTML Template (copy & paste):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset your Film Loca password</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.5;
            color: #1a1a1a;
            background-color: #fafafa;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 500px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 4px;
            text-align: center;
        }
        .logo {
            margin-bottom: 30px;
        }
        .logo img {
            max-width: 120px;
            height: auto;
        }
        .title {
            font-size: 20px;
            font-weight: 600;
            color: #1a1a1a;
            margin: 0 0 20px 0;
            text-align: left;
        }
        .text {
            margin-bottom: 20px;
            color: #4a4a4a;
            font-size: 15px;
            text-align: left;
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: #5f0f40;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            font-size: 14px;
        }
        .link-fallback {
            background: #f5f5f5;
            padding: 16px;
            border-radius: 4px;
            margin: 20px 0;
            font-size: 13px;
            text-align: left;
        }
        .link-url {
            color: #5f0f40;
            word-break: break-all;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e5e5;
            font-size: 12px;
            color: #9a9a9a;
            text-align: left;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://filmloca.com/logo.png" alt="Film Loca Logo" />
        </div>
        
        <h1 class="title">Reset your password</h1>
        
        <p class="text">
            Hello {{ .UserEmail }},
        </p>
        
        <p class="text">
            We received a request to reset your password. Click the button below to reset it:
        </p>
        
        <div class="button-container">
            <a href="{{ .ConfirmationURL }}" class="button">Reset Password</a>
        </div>
        
        <div class="link-fallback">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="{{ .ConfirmationURL }}" class="link-url">{{ .ConfirmationURL }}</a>
        </div>
        
        <p class="text">
            This link expires in 24 hours. If you didn't request this, you can ignore this email.
        </p>
        
        <div class="footer">
            © 2026 Film Loca. Premium filming locations.<br>
            This email was sent to {{ .UserEmail }}.
        </div>
    </div>
</body>
</html>
```

## 🎨 **Alternative Template (Centered Logo)**

**If you prefer the logo centered with text:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset your Film Loca password</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.5;
            color: #1a1a1a;
            background-color: #fafafa;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 500px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 4px;
        }
        .logo {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo img {
            max-width: 140px;
            height: auto;
        }
        .title {
            font-size: 20px;
            font-weight: 600;
            color: #1a1a1a;
            margin: 0 0 20px 0;
            text-align: center;
        }
        .text {
            margin-bottom: 20px;
            color: #4a4a4a;
            font-size: 15px;
            text-align: center;
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: #5f0f40;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            font-size: 14px;
        }
        .link-fallback {
            background: #f5f5f5;
            padding: 16px;
            border-radius: 4px;
            margin: 20px 0;
            font-size: 13px;
            text-align: center;
        }
        .link-url {
            color: #5f0f40;
            word-break: break-all;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e5e5;
            font-size: 12px;
            color: #9a9a9a;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://filmloca.com/logo.png" alt="Film Loca Logo" />
        </div>
        
        <h1 class="title">Reset your password</h1>
        
        <p class="text">
            Hello {{ .UserEmail }},
        </p>
        
        <p class="text">
            We received a request to reset your password. Click the button below to reset it:
        </p>
        
        <div class="button-container">
            <a href="{{ .ConfirmationURL }}" class="button">Reset Password</a>
        </div>
        
        <div class="link-fallback">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="{{ .ConfirmationURL }}" class="link-url">{{ .ConfirmationURL }}</a>
        </div>
        
        <p class="text">
            This link expires in 24 hours. If you didn't request this, you can ignore this email.
        </p>
        
        <div class="footer">
            © 2026 Film Loca. Premium filming locations.<br>
            This email was sent to {{ .UserEmail }}.
        </div>
    </div>
</body>
</html>
```

## 🔧 **Important Setup Steps:**

### **1. Make Logo Accessible:**
Ensure your logo is accessible at:
- **Primary URL**: `https://filmloca.com/logo.png`
- **Alternative**: `https://filmloca.com/logo-IMAGERY.png`

### **2. Test Logo URL:**
Before using the template, test that the logo loads:
```
https://filmloca.com/logo.png
```

### **3. If Logo Not Accessible:**
You can use a base64 encoded version or upload to a CDN.

## 🎯 **Features:**

### **✅ Brand Identity:**
- **Actual Film Loca logo** (not text)
- **Brand color**: `#5f0f40` for buttons
- **Professional look** with real branding
- **Consistent with your app**

### **✅ Technical Benefits:**
- **Spam-proof** HTML structure
- **Mobile responsive** design
- **Fast loading** with optimized logo
- **Fallback link** for accessibility

### **✅ User Experience:**
- **Instant brand recognition**
- **Professional appearance**
- **Clear call-to-action**
- **Trust building**

## 🚀 **Implementation:**

1. **Verify logo URL**: `https://filmloca.com/logo.png`
2. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/jwuakfowjxebtpcxcqyr
3. **Navigate**: Authentication → Settings → Email Templates
4. **Select**: "Reset Password" template
5. **Replace** with the logo template above
6. **Save** and test

---

**Choose the template you prefer (left-aligned or centered) and replace your current email template!** 🎬

This will give you a professional email with your actual Film Loca logo that matches your brand perfectly.
