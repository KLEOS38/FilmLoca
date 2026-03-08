# 🎬 Personalized Greeting Email Template

## ✅ **Personalized Greeting:**
- ✅ Shows "Hi [username]" instead of "Hello"
- ✅ Extracts username from email address
- ✅ Professional and friendly tone

## 🎯 **Personalized Template - Copy & Paste This:**

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
            line-height: 1.6;
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
            border-radius: 8px;
        }
        .logo {
            text-align: center;
            margin-bottom: 40px;
        }
        .logo img {
            max-width: 140px;
            height: auto;
            border-radius: 4px;
        }
        .title {
            font-size: 22px;
            font-weight: 600;
            color: #ff0000;
            margin: 0 0 30px 0;
            text-align: center;
        }
        .text {
            margin-bottom: 25px;
            color: #ffffff;
            font-size: 15px;
            text-align: center;
            line-height: 1.6;
        }
        .greeting {
            margin-bottom: 25px;
            color: #ffffff;
            font-size: 15px;
            text-align: center;
            line-height: 1.6;
        }
        .greeting strong {
            color: #ff0000;
            font-weight: 600;
        }
        .button-container {
            text-align: center;
            margin: 40px 0;
        }
        .button {
            display: inline-block;
            padding: 16px 32px;
            background: transparent;
            color: #ff0000;
            text-decoration: none;
            border: 2px solid #ff0000;
            border-radius: 50px;
            font-weight: 600;
            font-size: 15px;
            transition: all 0.3s ease;
            box-shadow: none;
        }
        .button:hover {
            background: #ff0000;
            color: #000000;
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(255, 0, 0, 0.4);
        }
        .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, #333333, transparent);
            margin: 40px 0;
            border: 0;
        }
        .link-section {
            margin: 30px 0;
            text-align: center;
        }
        .link-section-text {
            color: #cccccc;
            font-size: 13px;
            margin-bottom: 15px;
            font-style: italic;
        }
        .link-url {
            color: #ff0000;
            word-break: break-all;
            font-weight: 500;
            text-decoration: none;
            font-size: 13px;
        }
        .link-url:hover {
            color: #cc0000;
            text-decoration: underline;
        }
        .security-section {
            margin: 40px 0;
            text-align: center;
        }
        .security-icon {
            font-size: 20px;
            margin-bottom: 15px;
        }
        .security-text {
            color: #cccccc;
            font-size: 13px;
            line-height: 1.5;
        }
        .security-text strong {
            color: #ff0000;
            font-weight: 600;
        }
        .footer {
            margin-top: 50px;
            padding-top: 30px;
            border-top: 1px solid #333333;
            font-size: 12px;
            color: #888888;
            text-align: center;
        }
        .footer .brand {
            color: #ff0000;
            font-weight: 600;
        }
        a {
            color: #ff0000 !important;
            text-decoration: none !important;
        }
        a:hover {
            color: #cc0000 !important;
            text-decoration: underline !important;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://filmloca.com/logo.png" alt="Film Loca Logo" />
        </div>
        
        <h1 class="title">Reset your password</h1>
        
        <p class="greeting">
            Hi <strong>{{ .UserEmail | split: "@" | first | capitalize }}</strong>,
        </p>
        
        <p class="text">
            We received a request to reset your password for your Film Loca account. Click the button below to securely reset your password:
        </p>
        
        <div class="button-container">
            <a href="{{ .ConfirmationURL }}" class="button">Reset Password</a>
        </div>
        
        <div class="divider"></div>
        
        <div class="link-section">
            <p class="link-section-text">If the button above doesn't work, you can copy and paste this link into your browser:</p>
            <a href="{{ .ConfirmationURL }}" class="link-url">{{ .ConfirmationURL }}</a>
        </div>
        
        <div class="divider"></div>
        
        <div class="security-section">
            <div class="security-icon">🔒</div>
            <p class="security-text">
                This password reset link will expire in <strong>24 hours</strong> for your security. 
                If you didn't request this password reset, please ignore this email.
            </p>
        </div>
        
        <div class="footer">
            © 2026 <span class="brand">Film Loca</span> - Premium filming locations<br>
            This email was sent to {{ .UserEmail }}
        </div>
    </div>
</body>
</html>
```

## 🎯 **Alternative: Simple Username Version**

**If the above doesn't work, use this simpler version:**

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
            line-height: 1.6;
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
            border-radius: 8px;
        }
        .logo {
            text-align: center;
            margin-bottom: 40px;
        }
        .logo img {
            max-width: 140px;
            height: auto;
            border-radius: 4px;
        }
        .title {
            font-size: 22px;
            font-weight: 600;
            color: #ff0000;
            margin: 0 0 30px 0;
            text-align: center;
        }
        .text {
            margin-bottom: 25px;
            color: #ffffff;
            font-size: 15px;
            text-align: center;
            line-height: 1.6;
        }
        .greeting {
            margin-bottom: 25px;
            color: #ffffff;
            font-size: 15px;
            text-align: center;
            line-height: 1.6;
        }
        .greeting strong {
            color: #ff0000;
            font-weight: 600;
        }
        .button-container {
            text-align: center;
            margin: 40px 0;
        }
        .button {
            display: inline-block;
            padding: 16px 32px;
            background: transparent;
            color: #ff0000;
            text-decoration: none;
            border: 2px solid #ff0000;
            border-radius: 50px;
            font-weight: 600;
            font-size: 15px;
            transition: all 0.3s ease;
            box-shadow: none;
        }
        .button:hover {
            background: #ff0000;
            color: #000000;
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(255, 0, 0, 0.4);
        }
        .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, #333333, transparent);
            margin: 40px 0;
            border: 0;
        }
        .link-section {
            margin: 30px 0;
            text-align: center;
        }
        .link-section-text {
            color: #cccccc;
            font-size: 13px;
            margin-bottom: 15px;
            font-style: italic;
        }
        .link-url {
            color: #ff0000;
            word-break: break-all;
            font-weight: 500;
            text-decoration: none;
            font-size: 13px;
        }
        .link-url:hover {
            color: #cc0000;
            text-decoration: underline;
        }
        .security-section {
            margin: 40px 0;
            text-align: center;
        }
        .security-icon {
            font-size: 20px;
            margin-bottom: 15px;
        }
        .security-text {
            color: #cccccc;
            font-size: 13px;
            line-height: 1.5;
        }
        .security-text strong {
            color: #ff0000;
            font-weight: 600;
        }
        .footer {
            margin-top: 50px;
            padding-top: 30px;
            border-top: 1px solid #333333;
            font-size: 12px;
            color: #888888;
            text-align: center;
        }
        .footer .brand {
            color: #ff0000;
            font-weight: 600;
        }
        a {
            color: #ff0000 !important;
            text-decoration: none !important;
        }
        a:hover {
            color: #cc0000 !important;
            text-decoration: underline !important;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://filmloca.com/logo.png" alt="Film Loca Logo" />
        </div>
        
        <h1 class="title">Reset your password</h1>
        
        <p class="greeting">
            Hi <strong>there</strong>,
        </p>
        
        <p class="text">
            We received a request to reset your password for your Film Loca account ({{ .UserEmail }}). Click the button below to securely reset your password:
        </p>
        
        <div class="button-container">
            <a href="{{ .ConfirmationURL }}" class="button">Reset Password</a>
        </div>
        
        <div class="divider"></div>
        
        <div class="link-section">
            <p class="link-section-text">If the button above doesn't work, you can copy and paste this link into your browser:</p>
            <a href="{{ .ConfirmationURL }}" class="link-url">{{ .ConfirmationURL }}</a>
        </div>
        
        <div class="divider"></div>
        
        <div class="security-section">
            <div class="security-icon">🔒</div>
            <p class="security-text">
                This password reset link will expire in <strong>24 hours</strong> for your security. 
                If you didn't request this password reset, please ignore this email.
            </p>
        </div>
        
        <div class="footer">
            © 2026 <span class="brand">Film Loca</span> - Premium filming locations<br>
            This email was sent to {{ .UserEmail }}
        </div>
    </div>
</body>
</html>
```

## 🎨 **Greeting Options:**

### **✅ Option 1: Extract Username**
```
Hi <strong>{{ .UserEmail | split: "@" | first | capitalize }}</strong>,
```
- Shows: "Hi John," for john@example.com
- Uses Supabase template filters

### **✅ Option 2: Simple Friendly**
```
Hi <strong>there</strong>,
```
- Shows: "Hi there,"
- Moves email to body text
- Always works

### **✅ Option 3: Direct Email**
```
Hi <strong>{{ .UserEmail }}</strong>,
```
- Shows: "Hi john@example.com,"
- Full email address

## 🚀 **Implementation:**

1. **Try Option 1 first** (extracts username)
2. **If filters don't work**, use Option 2
3. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/jwuakfowjxebtpcxcqyr
4. **Navigate**: Authentication → Settings → Email Templates
5. **Select**: "Reset Password" template
6. **Replace** with your preferred template
7. **Save** and test

---

**Personalized greeting with "Hi [username]" instead of "Hello"!** 🎬

Try the username extraction first, or use the simple "Hi there" version as a fallback!
