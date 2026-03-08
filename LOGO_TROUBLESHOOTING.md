# 🔧 Logo Image Troubleshooting for cPanel

## ❌ **Problem: Logo Not Showing in Email**

### **Common cPanel Image Path Issues:**

#### **1. Incorrect Image Path**
The URL `https://filmloca.com/logo.png` might not be the correct path in cPanel.

#### **2. Common cPanel Image Paths:**

**Try these URLs to find your logo:**

```
https://filmloca.com/logo.png
https://filmloca.com/public/logo.png
https://filmloca.com/images/logo.png
https://filmloca.com/assets/logo.png
https://filmloca.com/wp-content/uploads/logo.png
https://filmloca.com/~yourusername/logo.png
https://filmloca.com/home/yourusername/public_html/logo.png
```

#### **3. Test Each URL:**
Open each URL in browser to see which one loads your logo.

## 🛠️ **Solutions:**

### **Solution 1: Find Correct Path**

1. **Login to cPanel**
2. **Go to File Manager**
3. **Navigate to public_html**
4. **Find your logo.png file**
5. **Right-click → View** to see the correct URL
6. **Copy that URL** and use in email template

### **Solution 2: Use Base64 Encoding (Guaranteed)**

**Convert logo to base64 and embed directly:**

#### **Step 1: Convert Logo to Base64**
```bash
# Online converter: https://base64-image-editor.com/
# Or use this command:
base64 -i logo.png
```

#### **Step 2: Use Base64 in Template**
```html
<div class="logo">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..." alt="Film Loca Logo" />
</div>
```

### **Solution 3: Upload to CDN**

**Upload logo to a reliable image host:**

1. **Imgur**: Upload and get direct link
2. **GitHub**: Use GitHub Pages
3. **Cloudinary**: Free image CDN
4. **Supabase Storage**: Use Supabase bucket

## 🎯 **Updated Email Template with Multiple Logo Options**

### **Option 1: Try Multiple Paths**
```html
<div class="logo">
    <img src="https://filmloca.com/logo.png" 
         srcset="https://filmloca.com/public/logo.png, 
                 https://filmloca.com/images/logo.png"
         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwIiBoZWlnaHQ9IjcwIiB2aWV3Qm94PSIwIDAgMTQwIDcwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjMDAwMDAwIi8+Cjx0ZXh0IHg9IjcwIiB5PSI0MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZmYwMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5GSUxNExPQ0E8L3RleHQ+Cjwvc3ZnPgo='"
         alt="Film Loca Logo" />
</div>
```

### **Option 2: Base64 Embedded Logo**
```html
<div class="logo">
    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwIiBoZWlnaHQ9IjcwIiB2aWV3Qm94PSIwIDAgMTQwIDcwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjMDAwMDAwIi8+Cjx0ZXh0IHg9IjcwIiB5PSI0MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZmYwMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5GSUxNExPQ0E8L3RleHQ+Cjwvc3ZnPgo=" 
         alt="Film Loca Logo" />
</div>
```

## 🔍 **Debugging Steps:**

### **1. Check cPanel File Structure:**
```
/home/yourusername/
├── public_html/
│   ├── logo.png ← Check if here
│   ├── public/
│   │   └── logo.png ← Or here
│   ├── images/
│   │   └── logo.png ← Or here
│   └── assets/
│       └── logo.png ← Or here
```

### **2. Test URL in Browser:**
- Open `https://filmloca.com/logo.png` in browser
- If 404 error, try other paths
- If it loads, copy that exact URL

### **3. Check File Permissions:**
- In cPanel File Manager
- Right-click logo.png → Change Permissions
- Set to: 644 (readable by all)

## 🚀 **Quick Fix:**

### **Use This Fallback Template:**
```html
<div class="logo">
    <!-- Try multiple paths with fallback -->
    <img src="https://filmloca.com/logo.png" 
         alt="Film Loca Logo"
         style="max-width: 140px; height: auto; background: #ffffff; padding: 10px; border-radius: 4px;"
         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwIiBoZWlnaHQ9IjcwIiB2aWV3Qm94PSIwIDAgMTQwIDcwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjMDAwMDAwIi8+Cjx0ZXh0IHg9IjcwIiB5PSI0MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZmYwMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5GSUxNExPQ0E8L3RleHQ+Cjwvc3ZnPgo='" />
</div>
```

## 📋 **Action Plan:**

1. **Test logo URLs** to find correct path
2. **Update email template** with working URL
3. **If still not working**, use base64 fallback
4. **Test email** to verify logo shows

---

**The most reliable solution is using base64 encoding or finding the correct cPanel path.** 🎬

Test the URLs above and use the one that works, or use the base64 fallback for guaranteed logo display!
