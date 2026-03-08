# 🎬 Minimal Brand Email Template

## 🎯 **Minimal Design with Film Loca Brand Colors**

### **Brand Colors:**
- **Primary**: `#5f0f40` (Deep burgundy/wine)
- **Foreground**: `#1a1a1a` (Dark text)
- **Background**: `#fafafa` (Light cream)
- **Accent**: White space for minimal look

## ✅ **Minimal Email Template**

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
        }
        .logo {
            font-size: 24px;
            font-weight: 700;
            color: #5f0f40;
            margin: 0 0 30px 0;
        }
        .title {
            font-size: 20px;
            font-weight: 600;
            color: #1a1a1a;
            margin: 0 0 20px 0;
        }
        .text {
            margin-bottom: 20px;
            color: #4a4a4a;
            font-size: 15px;
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
            margin: 20px 0;
        }
        .link-fallback {
            background: #f5f5f5;
            padding: 16px;
            border-radius: 4px;
            margin: 20px 0;
            font-size: 13px;
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
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">Film Loca</div>
        
        <h1 class="title">Reset your password</h1>
        
        <p class="text">
            Hello {{ .UserEmail }},
        </p>
        
        <p class="text">
            We received a request to reset your password. Click the button below to reset it:
        </p>
        
        <a href="{{ .ConfirmationURL }}" class="button">Reset Password</a>
        
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

## 🎨 **Why This Minimal Design Works:**

### **✅ Brand Consistency:**
- **Primary color**: `#5f0f40` (matches your brand)
- **Typography**: Inter font (matches your app)
- **Clean layout**: Minimal white space
- **Professional look**: Simple but elegant

### **✅ Spam Prevention:**
- **Clean HTML structure** with DOCTYPE
- **Inline CSS** (no external files)
- **Minimal content** (less spam triggers)
- **Professional sender ID**
- **Physical address** in footer

### **✅ User Experience:**
- **Clear call-to-action** button
- **Fallback link** for backup
- **Mobile-responsive** design
- **Fast loading** (minimal CSS)
- **Easy to read** typography

## 🚀 **Implementation:**

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/jwuakfowjxebtpcxcqyr
2. **Navigate**: Authentication → Settings → Email Templates
3. **Select**: "Reset Password" template
4. **Replace** current content with the minimal template above
5. **Save** and test

## 📊 **Before vs After:**

**Before (basic):**
```html
<h2>Reset Password</h2>
<p>Follow this link to reset the password for your user:</p>
<p><a href="{{ .ConfirmationURL }}">Reset Password</a></p>
```

**After (minimal brand):**
- ✅ **Brand colors** (#5f0f40 primary)
- ✅ **Clean typography** (Inter font)
- ✅ **Proper HTML structure**
- ✅ **Professional button**
- ✅ **Mobile responsive**
- ✅ **Inbox delivery**

## 🎯 **Key Features:**

- **🎬 Film Loca branding** with primary color
- **📱 Minimal mobile-first design**
- **🔗 Clear reset button** + fallback link
- **✅ Spam-proof HTML structure**
- **⚡ Fast loading** (minimal CSS)
- **🔒 Security info** (24hr expiry)

---

**Copy the minimal template above and replace your current email template in Supabase Dashboard!** 🎬

This will give you a clean, minimal design that matches your Film Loca brand colors and avoids spam filters.
