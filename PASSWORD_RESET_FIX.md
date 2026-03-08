# 🔧 Password Reset Flow Fix

## ❌ **Current Problem:**
- AuthPage only shows "request reset" form (enter email)
- No "new password" form for after clicking email link
- Supabase redirects with token but page doesn't handle it
- Users end up on homepage instead of setting new password

## ✅ **Complete Fix Required:**

### **1. Update Supabase Redirect URL:**
1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/jwuakfowjxebtpcxcqyr
2. **Navigate**: Authentication → Settings → URL Configuration
3. **Update Site URL**: `https://filmloca.com`
4. **Update Redirect URLs**: Add `https://filmloca.com/reset-password`
5. **Save** changes

### **2. Update AuthPage to Handle Reset Token:**

The AuthPage needs to detect when user arrives with a reset token and show the "New Password" form instead of the "Request Reset" form.

### **3. Add New Password Schema & Form:**

Need to add:
- `newPasswordSchema` for validation
- `handleNewPassword` function
- Token detection logic
- New password form UI

## 🎯 **Implementation Steps:**

### **Step 1: Fix Supabase URL Configuration**
- Update redirect URLs to point to `/reset-password`
- Ensure proper site URL configuration

### **Step 2: Update AuthPage Component**
- Detect URL hash/fragment for reset tokens
- Show "New Password" form when token present
- Handle password update with token

### **Step 3: Test Complete Flow**
1. User requests password reset
2. Receives email with link
3. Clicks link → goes to `/reset-password#token=...`
4. Shows "New Password" form
5. User sets new password
6. Redirects to login with success message

## 🔍 **Current AuthPage Issues:**

### **Missing Features:**
- ❌ No token detection from URL hash
- ❌ No "New Password" form
- ❌ No `handleNewPassword` function
- ❌ No `newPasswordSchema` validation
- ❌ No proper flow handling

### **What Needs to Be Added:**
```typescript
// Detect reset token from URL
useEffect(() => {
  const hash = window.location.hash;
  if (hash.includes('access_token') && hash.includes('type=recovery')) {
    // Show new password form
    setShowNewPasswordForm(true);
  }
}, []);

// New password schema
const newPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
});

// Handle new password submission
const handleNewPassword = async (values) => {
  // Extract token from URL
  // Update password with Supabase
  // Redirect to login
};
```

## 🚀 **Next Actions:**

1. **Update Supabase URL configuration** (immediate)
2. **Update AuthPage component** to handle reset tokens
3. **Add new password form** with validation
4. **Test complete flow** end-to-end

---

**This fix will ensure users can actually reset their password after clicking the email link!** 🎬

The current implementation only handles the "request reset" part but not the actual password reset.
