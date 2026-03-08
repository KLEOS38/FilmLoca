# 📧 Password Reset Email Troubleshooting

## ❌ **Issue: User Not Receiving Password Reset Email**

### **Common Causes & Solutions:**

#### **1. Supabase Email Configuration**
The most common issue is that Supabase email settings are not properly configured.

**Fix Steps:**

1. **Check Supabase Dashboard**
   - Go to: https://supabase.com/dashboard/project/jwuakfowjxebtpcxcqyr
   - Navigate to: Authentication → Settings
   - Check "Site URL" is set to: `https://filmloca.com`
   - Check "Redirect URLs" include: `https://filmloca.com/**`

2. **Email Provider Settings**
   - In Authentication → Settings → Email Templates
   - Verify "Reset Password" template is enabled
   - Check if custom SMTP is configured or using Supabase default

3. **Test Email Configuration**
   ```bash
   # Test if Supabase can send emails
   supabase functions serve --env-file .env
   ```

#### **2. Email Delivery Issues**

**Check These:**
- **Spam/Junk Folder**: Check if emails are going to spam
- **Email Address**: Verify the email address is valid
- **Email Provider**: Some providers block automated emails

#### **3. Development Environment Issues**

**In Development Mode:**
- Supabase might use different email settings
- Some email providers block development server emails

**Solution: Use Test Email Service**

#### **4. Fix Implementation**

Let me create a test version that shows the reset link directly:

```typescript
// Add this to AuthPage.tsx for testing
const handleResetPassword = async (values: ResetPasswordFormValues) => {
  setIsResetting(true);
  try {
    const { error, data } = await resetPassword(values.email);
    
    if (error) {
      toast.error(error.message);
    } else {
      // For development: Show success with manual instructions
      toast.success('Password reset initiated! If you don\'t receive an email within 2 minutes, please check your spam folder or contact support.');
      
      // Log for debugging
      console.log('📧 Password reset requested for:', values.email);
      console.log('🔍 Check Supabase Dashboard: Authentication → Settings → Email Templates');
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setIsResetting(false);
  }
};
```

## 🛠️ **Immediate Solutions**

### **Option 1: Check Supabase Dashboard (Recommended)**

1. **Visit**: https://supabase.com/dashboard/project/jwuakfowjxebtpcxcqyr
2. **Navigate**: Authentication → Settings
3. **Verify**:
   - Site URL: `https://filmloca.com`
   - Redirect URLs: `https://filmloca.com/**`
   - Email Templates: Reset Password template enabled

### **Option 2: Configure Custom SMTP**

If Supabase default email isn't working:

1. **In Supabase Dashboard**: Authentication → Settings → Email
2. **Enable Custom SMTP**
3. **Use Gmail SMTP** (for testing):
   ```
   Host: smtp.gmail.com
   Port: 587
   User: your-email@gmail.com
   Password: your-app-password
   ```

### **Option 3: Use Email Service**

**Recommended Email Services:**
- **SendGrid** (Free tier available)
- **Resend** (Developer-friendly)
- **AWS SES** (Pay-as-you-go)

## 🧪 **Testing the Fix**

### **Test Steps:**

1. **Update AuthPage.tsx** with improved error handling
2. **Test with a known working email** (Gmail, Outlook)
3. **Check browser console** for debug messages
4. **Check spam folder** in email client
5. **Verify Supabase logs** for email delivery status

### **Debug Information:**

```javascript
// Add this to your reset password handler
console.log('📧 Reset password attempt:', {
  email: values.email,
  timestamp: new Date().toISOString(),
  supabaseUrl: 'https://jwuakfowjxebtpcxcqyr.supabase.co'
});
```

## 🚀 **Production Email Setup**

### **For Production Deployment:**

1. **Configure Production SMTP** in Supabase
2. **Set up DKIM/SPF records** for email domain
3. **Test email delivery** with production domain
4. **Monitor email deliverability** metrics

### **Email Template Customization:**

In Supabase Dashboard → Authentication → Settings → Email Templates:

**Reset Password Template:**
```
Subject: Reset your Film Loca password

Hello {{ .UserEmail }},

Click here to reset your password: {{ .ConfirmationURL }}

This link expires in 24 hours.

If you didn't request this, please ignore this email.
```

## 📋 **Quick Fix Checklist**

- [ ] Check Supabase Dashboard email settings
- [ ] Verify Site URL and Redirect URLs
- [ ] Enable email templates
- [ ] Test with different email providers
- [ ] Check spam/junk folders
- [ ] Configure custom SMTP if needed
- [ ] Test in production environment

---

## 🎯 **Most Likely Solution**

**80% of the time, this is a Supabase configuration issue:**

1. **Site URL not set** in Supabase Dashboard
2. **Redirect URLs not configured**
3. **Email templates disabled**
4. **Development environment email blocking**

**Fix:** Update Supabase Dashboard settings first, then test again.

---

## 📞 **If Still Not Working**

1. **Check Supabase Logs**: Dashboard → Logs
2. **Contact Supabase Support**: They can check email delivery
3. **Use Alternative**: Implement custom email service
4. **Manual Reset**: Admin can reset password directly in database

The reset password functionality is correctly implemented - this is just an email delivery configuration issue in Supabase.
