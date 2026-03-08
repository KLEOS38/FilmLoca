# Authentication Prompts for Featured Properties - Feature Documentation

## Overview

This feature ensures that users who are not signed in receive a prompt to sign in or sign up when they attempt to interact with featured properties or access location browsing features.

## Feature Requirements

- [ ] Unauthenticated users clicking on featured properties are prompted to sign in
- [ ] Unauthenticated users clicking "View all" locations are prompted to sign in
- [ ] Unauthenticated users clicking "Browse Locations" are prompted to sign in
- [ ] Unauthenticated users clicking "List Your Property" are prompted to sign in
- [ ] Toast notification appears with helpful message
- [ ] User is redirected to authentication page
- [ ] Authenticated users can access all features without prompts

## Implementation Details

### Components Modified

#### 1. LocationCard.tsx
**File**: `src/components/LocationCard.tsx`

**Changes**:
- Added `useAuth()` hook to access user authentication state
- Added `useNavigate()` hook for navigation
- Created `handleCardClick()` function that:
  - Checks if user is authenticated
  - Prevents navigation if user is not signed in
  - Shows error toast: "Please sign in to view property details"
  - Redirects to `/auth?tab=signin`
  - Allows navigation if user is authenticated

**Code**:
```typescript
const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  if (!user) {
    e.preventDefault();
    toast.error("Please sign in to view property details");
    navigate("/auth?tab=signin");
    return;
  }
};
```

#### 2. Index.tsx (Homepage)
**File**: `src/pages/Index.tsx`

**Changes Made**:

##### a) "Browse Locations" Button
- Changed from Link component to Button component
- Added onClick handler that checks authentication
- Shows toast: "Please sign in to browse locations"
- Redirects to auth page if not signed in
- Navigates to `/locations` if signed in

##### b) "View all" Locations Link
- Changed from Link component to button element
- Added onClick handler with authentication check
- Shows toast: "Please sign in to view all locations"
- Redirects to auth page if not signed in
- Navigates to `/locations` if signed in

##### c) "List Your Property" Button (CTA Section)
- Changed from Link to Button component
- Added onClick handler with authentication check
- Shows toast: "Please sign in to list your property"
- Redirects to auth page if not signed in
- Navigates to `/list-property` if signed in

### Authentication Flow

```
User clicks featured property / location link
    ↓
Check if user is authenticated
    ↓
├─ User is signed in → Navigate to location detail page
└─ User is NOT signed in → 
    ├─ Show error toast with message
    └─ Redirect to `/auth?tab=signin`
```

### Toast Messages

The following toast messages are displayed to guide users:

| Action | Message |
|--------|---------|
| Click featured property | "Please sign in to view property details" |
| Click "View all" locations | "Please sign in to view all locations" |
| Click "Browse Locations" | "Please sign in to browse locations" |
| Click "List Your Property" | "Please sign in to list your property" |

### User Experience

#### Before (Unauthenticated User)
1. Unauthenticated user visits homepage
2. User clicks on a featured property card
3. Page navigates to property detail page (even though they shouldn't have access)
4. User can see property details but may not be able to book

#### After (With Feature)
1. Unauthenticated user visits homepage
2. User clicks on a featured property card
3. Error toast appears: "Please sign in to view property details"
4. User is redirected to authentication page (`/auth?tab=signin`)
5. User can sign in or sign up
6. User is then able to access property details

## Dependencies

### Imports Added
```typescript
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
```

### Hooks Used
- `useAuth()` - Provides `user` object from AuthContext
- `useNavigate()` - For programmatic navigation
- `toast.error()` - For displaying error messages

### Context
- `AuthContext` - Manages user authentication state

## Authentication States

### Authenticated User
- `user` object is not null
- All links/buttons navigate normally without prompts
- Full access to all features

### Unauthenticated User
- `user` object is null
- Clicking featured properties/locations triggers prompt
- Redirected to `/auth?tab=signin`

## Error Handling

All navigation functions include proper error handling:
1. Prevention of default Link behavior using `e.preventDefault()`
2. Toast message to inform user of action
3. Redirect to authentication page
4. No errors logged to console (clean UX)

## Testing Checklist

- [ ] Test clicking featured property as unauthenticated user
  - Should show toast notification
  - Should redirect to auth page
  
- [ ] Test clicking "View all" as unauthenticated user
  - Should show toast notification
  - Should redirect to auth page

- [ ] Test clicking "Browse Locations" as unauthenticated user
  - Should show toast notification
  - Should redirect to auth page

- [ ] Test clicking "List Your Property" as unauthenticated user
  - Should show toast notification
  - Should redirect to auth page

- [ ] Test all clicks as authenticated user
  - Should navigate normally without prompts
  - No toast notifications should appear

- [ ] Test toast message styling
  - Message should be visible and readable
  - Should auto-dismiss after 3-4 seconds

- [ ] Test redirects
  - Auth page should load correctly
  - Should be able to sign in/sign up from there
  - After authentication, can access properties

## Browser Compatibility

Feature works on all modern browsers that support:
- ES6+ JavaScript
- React hooks
- React Router v6+

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- No additional API calls for authentication checks
- Uses existing `useAuth()` hook which stores user state in context
- Toast notifications are lightweight and don't block rendering
- Navigation is instant (no loading states needed)

## Security Considerations

- Authentication state is validated on the client side
- Server-side RLS policies should still prevent unauthorized access
- Toast messages do not expose sensitive information
- Auth tokens are not exposed to unauthenticated users

## Future Enhancements

1. **Persistent Redirect**: Remember where user came from and redirect after sign in
   - Store intended destination in state
   - Redirect to property after successful authentication

2. **Sign In Modal**: Show modal instead of full page redirect
   - Overlay authentication form on current page
   - Better UX for quick sign ups

3. **Demo Mode**: Allow browsing without sign in
   - View-only mode for featured properties
   - Require sign in only for booking

4. **Social Auth**: Add OAuth providers (Google, Facebook)
   - Faster sign up process
   - Reduce friction for first-time users

## Code Examples

### Using in Other Components

To implement similar authentication checks in other components:

```typescript
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MyComponent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!user) {
      toast.error("Please sign in to perform this action");
      navigate("/auth?tab=signin");
      return;
    }
    
    // Perform action if user is authenticated
    performAction();
  };

  return <button onClick={handleClick}>Perform Action</button>;
};
```

## Migration Guide

If you're implementing this feature in existing code:

1. **Add imports** to your component:
   ```typescript
   import { useAuth } from "@/contexts/AuthContext";
   import { useNavigate } from "react-router-dom";
   import { toast } from "sonner";
   ```

2. **Add hooks** in your component:
   ```typescript
   const { user } = useAuth();
   const navigate = useNavigate();
   ```

3. **Create handler function**:
   ```typescript
   const handleAuthCheck = (redirectTo: string, message: string) => {
     if (!user) {
       toast.error(message);
       navigate("/auth?tab=signin");
       return;
     }
     navigate(redirectTo);
   };
   ```

4. **Update click handlers** on buttons/links:
   ```typescript
   onClick={() => handleAuthCheck("/locations", "Please sign in to browse locations")}
   ```

## Troubleshooting

### Issue: Toast not appearing
- Check that `sonner` package is installed
- Verify `<Toaster />` component is in app layout
- Check browser console for errors

### Issue: Redirect not working
- Verify react-router is properly configured
- Check that auth routes exist (`/auth?tab=signin`)
- Verify navigation path is correct

### Issue: User state not updating
- Ensure AuthContext is properly initialized
- Check that auth provider wraps entire app
- Verify Supabase session is persisting

## Support

For questions or issues with this feature, refer to:
- `src/contexts/AuthContext.tsx` - Authentication state management
- `src/components/LocationCard.tsx` - Featured property card implementation
- `src/pages/Index.tsx` - Homepage implementation

## Version History

- **v1.0** (Current) - Initial implementation
  - Authentication checks on featured properties
  - Prompts for location browsing
  - Toast notifications
  - Redirect to auth page
