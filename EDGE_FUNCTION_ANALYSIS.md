# Edge Function Analysis - Non-2xx Status Code Issues

## 🔍 Potential Issues Found

### 1. **Environment Variable Missing**
- Line 244: `SUPABASE_SERVICE_ROLE_KEY` may not be set
- If missing, falls back to anon key which may not have insert permissions

### 2. **Paystack API Error Handling**
- Lines 354-368: If Paystack API returns non-200 status, returns 500
- Should handle specific Paystack error codes properly

### 3. **Database Connection Issues**
- Line 242: Using service role client but key might not be configured
- Could cause booking insertion to fail

### 4. **Date Validation Too Strict**
- Lines 112-126: Date validation might be too restrictive
- Could reject valid bookings

### 5. **Missing Error Handling**
- Several async operations without proper error boundaries
- Network requests to Paystack could timeout

## 🛠️ Recommended Fixes

### Fix 1: Environment Variables
```typescript
// Add better fallback and error handling
const supabaseServiceRole = createClient(
  supabaseUrl,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || supabaseAnonKey,
);
```

### Fix 2: Better Paystack Error Handling
```typescript
if (!paystackResponse.ok) {
  const errorData = await paystackResponse.json();
  const statusCode = paystackResponse.status;
  
  // Return appropriate status code based on error
  return new Response(
    JSON.stringify({
      error: "Paystack payment initialization failed",
      code: "PAYSTACK_ERROR",
      status_code: statusCode,
      details: errorData.message,
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: statusCode >= 400 && statusCode < 500 ? statusCode : 500,
    },
  );
}
```

### Fix 3: Improve Date Validation
```typescript
// More lenient date validation
const start = new Date(startDate);
const end = new Date(endDate);
const now = new Date();

// Check if dates are valid and in the future
if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end || start < now) {
  // Return specific error codes
}
```

### Fix 4: Add Request Timeout
```typescript
// Add timeout to Paystack request
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds

const paystackResponse = await fetch(
  "https://api.paystack.co/transaction/initialize",
  {
    method: "POST",
    headers: { ... },
    body: JSON.stringify({ ... }),
    signal: controller.signal,
  },
);
```

## 🚨 Most Likely Issues

1. **SUPABASE_SERVICE_ROLE_KEY not configured** in Supabase Edge Function settings
2. **Paystack API timeouts** or rate limiting
3. **Invalid request data** failing validation
4. **Network connectivity issues** between Edge Function and Paystack

## 🔧 Immediate Actions Needed

1. Check Supabase Edge Function environment variables
2. Add better error logging to identify exact failure point
3. Implement retry logic for network requests
4. Add specific error codes for different failure scenarios
