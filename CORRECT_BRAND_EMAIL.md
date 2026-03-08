# 🎬 Correct Brand Email Template

## 🎨 **Film Loca Brand Colors:**
- **Red/Primary**: `#5f0f40` (your brand red)
- **Black**: `#1a1a1a` (text/foreground)
- **Pastel Colors**: Soft pastels for backgrounds
- **White**: Clean space

## ✅ **Email Template with Correct Brand Colors**

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
            background-color: #faf5f7; /* Soft pastel pink background */
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 500px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
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
            padding: 14px 28px;
            background: #5f0f40;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 2px 4px rgba(95, 15, 64, 0.2);
            transition: all 0.2s ease;
        }
        .button:hover {
            background: #4a0d32;
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(95, 15, 64, 0.3);
        }
        .link-fallback {
            background: #f0f8ff; /* Pastel blue background */
            padding: 18px;
            border-radius: 6px;
            margin: 25px 0;
            font-size: 13px;
            text-align: center;
            border-left: 4px solid #5f0f40;
        }
        .link-url {
            color: #5f0f40;
            word-break: break-all;
            font-weight: 500;
        }
        .security-notice {
            background: #fef7f0; /* Pastel peach background */
            padding: 18px;
            border-radius: 6px;
            margin: 25px 0;
            font-size: 13px;
            text-align: center;
            border: 1px solid #f5e6d1;
        }
        .security-notice strong {
            color: #5f0f40;
            display: block;
            margin-bottom: 8px;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e8e8e8;
            font-size: 12px;
            color: #9a9a9a;
            text-align: center;
        }
        .footer .brand {
            color: #5f0f40;
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
            We received a request to reset your password for your Film Loca account. Click the button below to securely reset your password:
        </p>
        
        <div class="button-container">
            <a href="{{ .ConfirmationURL }}" class="button">Reset Password</a>
        </div>
        
        <div class="link-fallback">
            If the button doesn't work, copy and paste this link into your browser:<br>
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

## 🎨 **Alternative Minimal Version**

**Even more minimal with pastel accents:**
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
            max-width: 480px;
            margin: 0 auto;
            background: white;
            padding: 35px;
            border-radius: 4px;
        }
        .logo {
            text-align: center;
            margin-bottom: 25px;
        }
        .logo img {
            max-width: 100px;
            height: auto;
        }
        .title {
            font-size: 18px;
            font-weight: 600;
            color: #1a1a1a;
            margin: 0 0 15px 0;
            text-align: center;
        }
        .text {
            margin-bottom: 15px;
            color: #4a4a4a;
            font-size: 14px;
            text-align: center;
        }
        .button-container {
            text-align: center;
            margin: 25px 0;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: #5f0f40;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            font-size: 13px;
        }
        .link-fallback {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
            font-size: 12px;
            text-align: center;
        }
        .link-url {
            color: #5f0f40;
            word-break: break-all;
        }
        .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #f0f0f0;
            font-size: 11px;
            color: #9a9a9a;
            text-align: center;
        }
        .footer .brand {
            color: #5f0f40;
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
            Click the button below to reset your password:
        </p>
        
        <div class="button-container">
            <a href="{{ .ConfirmationURL }}" class="button">Reset Password</a>
        </div>
        
        <div class="link-fallback">
            If the button doesn't work:<br>
            <a href="{{ .ConfirmationURL }}" class="link-url">{{ .ConfirmationURL }}</a>
        </div>
        
        <p class="text">
            This link expires in 24 hours.
        </p>
        
        <div class="footer">
            © 2026 <span class="brand">Film Loca</span><br>
            Sent to {{ .UserEmail }}
        </div>
    </div>
</body>
</html>
```

## 🎯 **Brand Color Breakdown:**

### **✅ Primary Colors Used:**
- **Red**: `#5f0f40` (buttons, links, accents)
- **Black**: `#1a1a1a` (text, headings)
- **Pastel Pink**: `#faf5f7` (background)
- **Pastel Blue**: `#f0f8ff` (link fallback)
- **Pastel Peach**: `#fef7f0` (security notice)
- **White**: `#ffffff` (container)

### **✅ Why This Works:**
- **Brand consistency** with your actual colors
- **Professional appearance** with red/black/pastel scheme
- **Spam-friendly** HTML structure
- **Mobile responsive** design
- **Clean minimal** aesthetic

## 🚀 **Implementation:**

1. **Test logo URL**: `https://filmloca.com/logo.png`
2. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/jwuakfowjxebtpcxcqyr
3. **Navigate**: Authentication → Settings → Email Templates
4. **Select**: "Reset Password" template
5. **Replace** with the correct brand template above
6. **Save** and test

---

**Choose the version you prefer (full-featured or minimal) and replace your current email template!** 🎬

This template now uses your actual brand colors: red (#5f0f40), black (#1a1a1a), and beautiful pastel accents!
