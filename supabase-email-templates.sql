-- Supabase Email Templates Configuration
-- Run this in Supabase Dashboard SQL Editor or via CLI

-- Update Reset Password Email Template
UPDATE auth.migrations 
SET definition = REPLACE(definition, 'old_content', 'new_content');

-- Better approach: Configure email templates via Dashboard
-- But here's the SQL to update the email template settings

-- 1. Update Site URL (if not already set)
-- This should be done in Supabase Dashboard: Authentication → Settings

-- 2. Configure Email Templates
-- The reset password template should include:
-- - Professional branding
-- - Clear reset button
-- - Fallback link
-- - Expiration notice
-- - Security information

-- 3. Example email template content:
/*
Subject: Reset your Film Loca password

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset your Film Loca password</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; }
        .logo { font-size: 24px; font-weight: bold; color: #1a73e8; }
        .button { display: inline-block; padding: 12px 24px; background: #1a73e8; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px 0; font-size: 12px; color: #666; }
        .security { background: #f8f9fa; padding: 15px; border-radius: 4px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Film Loca</div>
        </div>
        
        <h2>Reset your password</h2>
        
        <p>Hello {{ .UserEmail }},</p>
        
        <p>We received a request to reset your password for your Film Loca account. Click the button below to reset your password:</p>
        
        <div style="text-align: center;">
            <a href="{{ .ConfirmationURL }}" class="button">Reset Password</a>
        </div>
        
        <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
        <p><a href="{{ .ConfirmationURL }}">{{ .ConfirmationURL }}</a></p>
        
        <div class="security">
            <strong>Security Notice:</strong><br>
            This link will expire in 24 hours for your security.<br>
            If you didn't request this password reset, please ignore this email.
        </div>
        
        <p>Best regards,<br>The Film Loca Team</p>
        
        <div class="footer">
            <p>© 2026 Film Loca. All rights reserved.</p>
            <p>Filming locations for the creative industry</p>
        </div>
    </div>
</body>
</html>
*/

-- 4. Update email settings to avoid spam
-- Configure these in Supabase Dashboard → Authentication → Settings:

/*
Site URL: https://filmloca.com
Redirect URLs: https://filmloca.com/**
Email Template Settings:
- Enable HTML emails
- Set proper from address: noreply@filmloca.com
- Configure reply-to: support@filmloca.com
*/

-- 5. SPF/DKIM records (for production)
-- Add these DNS records for filmloca.com domain:

/*
TXT Record for filmloca.com:
"v=spf1 include:_spf.supabase.co ~all"

TXT Record for filmloca.com (DKIM):
"v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQ..."

CNAME Record for supabase._domainkey.filmloca.com:
supabase._domainkey.supabase.co
*/

-- 6. Alternative: Use custom SMTP
-- Configure in Supabase Dashboard → Authentication → Email:

/*
SMTP Provider: SendGrid/Resend/AWS SES
Host: smtp.sendgrid.net
Port: 587
User: apikey
Password: your-sendgrid-api-key
From: noreply@filmloca.com
Reply-to: support@filmloca.com
*/
