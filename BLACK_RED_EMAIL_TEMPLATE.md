# 🎬 Black Background + Red Text Email Template

## 🎨 **Updated Brand Colors:**
- **Black Background**: `#000000` (main background)
- **Red Text/Buttons**: `#ff0000` (primary red)
- **White Text**: `#ffffff` (for readability on black)
- **Red Accents**: `#ff0000` (links, buttons)
- **Black**: `#000000` (text, borders)

## ✅ **Black Background + Red Text Template**

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
            color: #ffffff;
            background-color: #000000;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 500px;
            margin: 0 auto;
            background: #000000;
            padding: 40px;
            border: 1px solid #333333;
            border-radius: 8px;
        }
        .logo {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo img {
            max-width: 140px;
            height: auto;
            background: #ffffff;
            padding: 10px;
            border-radius: 4px;
        }
        .title {
            font-size: 20px;
            font-weight: 600;
            color: #ff0000;
            margin: 0 0 20px 0;
            text-align: center;
        }
        .text {
            margin-bottom: 20px;
            color: #ffffff;
            font-size: 15px;
            text-align: center;
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .button {
            display: inline-block;
            padding: 14px 28px;
            background: #000000;
            color: #ff0000;
            text-decoration: none;
            border: 2px solid #ff0000;
            border-radius: 6px;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.2s ease;
        }
        .button:hover {
            background: #ff0000;
            color: #000000;
            transform: translateY(-1px);
        }
        .link-fallback {
            background: #1a1a1a;
            padding: 18px;
            border-radius: 6px;
            margin: 25px 0;
            font-size: 13px;
            text-align: center;
            border: 1px solid #ff0000;
        }
        .link-url {
            color: #ff0000;
            word-break: break-all;
            font-weight: 500;
        }
        .security-notice {
            background: #1a1a1a;
            padding: 18px;
            border-radius: 6px;
            margin: 25px 0;
            font-size: 13px;
            text-align: center;
            border: 1px solid #ff0000;
        }
        .security-notice strong {
            color: #ff0000;
            display: block;
            margin-bottom: 8px;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #333333;
            font-size: 12px;
            color: #cccccc;
            text-align: center;
        }
        .footer .brand {
            color: #ff0000;
            font-weight: 600;
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
            We received a request to reset your password for your Film Loca account. Click the red button below to securely reset your password:
        </p>
        
        <div class="button-container">
            <a href="{{ .ConfirmationURL }}" class="button">Reset Password</a>
        </div>
        
        <div class="link-fallback">
            If the red button doesn't work, copy and paste this link into your browser:<br>
            <a href="{{ .ConfirmationURL }}" class="link-url">{{ .ConfirmationURL }}</a>
        </div>
        
        <div class="security-notice">
            <strong>🔒 Security Notice</strong>
            This password reset link will expire in <strong>24 hours</strong> for your security. 
            If you didn't request this password reset, please ignore this email.
        </div>
        
        <div class="footer">
            © 2026 <span class="brand">Film Loca</span> - Premium filming locations<br>
            This email was sent to {{ .UserEmail }}
        </div>
    </div>
</body>
</html>
```

## 🔧 **Logo Image Setup - Ensure It Works:**

### **1. Test Logo URL First:**
Before using template, verify your logo loads:
```
https://filmloca.com/logo.png
```

### **2. Alternative Logo URLs:**
If above doesn't work, try:
```
https://filmloca.com/public/logo.png
https://filmloca.com/dist/logo.png
```

### **3. Base64 Fallback Option:**
If logo URL doesn't work, use base64 encoded logo:

```html
<div class="logo">
    <img src="data:image/png;base64,YOUR_BASE64_LOGO_HERE" alt="Film Loca Logo" />
</div>
```

## 🎯 **Black & Red Color Scheme:**

### **✅ Color Breakdown:**
- **Black Background**: `#000000` (main email background)
- **Red Text**: `#ff0000` (headings, buttons, links)
- **White Text**: `#ffffff` (body text for readability)
- **Dark Gray**: `#1a1a1a` (section backgrounds)
- **Light Gray**: `#cccccc` (footer text)

### **✅ Design Features:**
- **High contrast** (black background + red accents)
- **Professional look** with bold red buttons
- **Logo with white background** for visibility
- **Red border** on interactive elements
- **Hover effects** (red button inverts on hover)

## 🚀 **Implementation Steps:**

### **1. Verify Logo:**
- Test: `https://filmloca.com/logo.png`
- If fails, upload logo to public folder
- Or use base64 encoding

### **2. Update Supabase:**
1. **Go to**: https://supabase.com/dashboard/project/jwuakfowjxebtpcxcqyr
2. **Navigate**: Authentication → Settings → Email Templates
3. **Select**: "Reset Password" template
4. **Replace** with black/red template above
5. **Save** and test

### **3. Test Email:**
- Send test password reset
- Check logo loads properly
- Verify black background displays
- Confirm red text/buttons work

## 📧 **Email Preview:**

### **What Users Will See:**
- **Black background** email
- **Red "Reset Password" button** with black text
- **White text** for easy reading
- **Film Loca logo** with white background
- **Red links** and accents throughout
- **Professional high-contrast** design

---

**This template gives you a bold black background with red accents, ensuring your logo displays properly and all burgundy is replaced with black and red!** 🎬

Test your logo URL first, then implement this template for a striking black & red email design!
