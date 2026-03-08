import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Upload, FileText, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define form schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
  userType: z.enum(["renter", "homeowner"], { 
    required_error: "Please select a user type",
  }),
  documentType: z.enum(["passport", "nin", "drivers_license"], {
    required_error: "Please select a document type",
  }),
  document: z.instanceof(File, { message: "Please upload a valid government-issued document" })
    .refine((file) => file.size <= 5 * 1024 * 1024, { message: "File size must be less than 5MB" })
    .refine(
      (file) => ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
      { message: "File must be a PDF or image (JPEG/PNG)" }
    ),
  acceptedTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept Terms of Service to continue",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
});

const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const newPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
type NewPasswordFormValues = z.infer<typeof newPasswordSchema>;

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, user, resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [documentPreview, setDocumentPreview] = useState<string | null>(null);
  const [uploadedDocumentUrl, setUploadedDocumentUrl] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [hasResetToken, setHasResetToken] = useState(false);
  const locationSearch = location.search;
  const locationPath = location.pathname;
  
  // Check if user is on reset-password route
  const isResetPasswordRoute = locationPath === '/reset-password';
  
  // Debug: Log current URL state
  console.log('🔍 AuthPage Debug Info:');
  console.log('- Current path:', locationPath);
  console.log('- Current search:', locationSearch);
  console.log('- Current hash:', window.location.hash);
  console.log('- Is reset password route:', isResetPasswordRoute);
  const initialTab = locationSearch.includes('tab=signup') ? 'signup' : 
    isResetPasswordRoute ? 'reset-password' : 
    locationSearch.includes('tab=signup') ? 'signup' : 'login';
  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'reset-password'>(
    initialTab as 'login' | 'signup' | 'reset-password'
  );

  useEffect(() => {
    if (user) {
      // Check if there's a redirect parameter in the URL
      const redirect = new URLSearchParams(location.search).get('redirect');
      if (redirect) {
        navigate(redirect);
      } else {
        navigate('/profile');
      }
    }
  }, [user, navigate, location.search]);

  useEffect(() => {
    const newTab = locationSearch.includes('tab=signup') ? 'signup' : 
      isResetPasswordRoute ? 'reset-password' : 'login';
    setActiveTab(newTab as 'login' | 'signup' | 'reset-password');
  }, [locationSearch, isResetPasswordRoute]);

  // Check for password reset token in URL hash or authenticated session
  useEffect(() => {
    const hash = window.location.hash;
    const search = window.location.search;
    const hasTokenInHash = hash.includes('access_token') && hash.includes('type=recovery');
    const hasTokenInSearch = search.includes('access_token') && search.includes('type=recovery');
    const hasResetParam = search.includes('reset=true') || search.includes('type=recovery');
    
    // Debug: Log token detection
    console.log('🔍 Token Detection:');
    console.log('- Has token in hash:', hasTokenInHash);
    console.log('- Has token in search:', hasTokenInSearch);
    console.log('- Has reset param:', hasResetParam);
    console.log('- Full hash:', hash);
    console.log('- Full search:', search);
    
    // Also check if user is on reset-password route and has a session (from email link)
    const checkForResetSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log('🔍 Session Check:');
      console.log('- Has session:', !!session);
      console.log('- Session error:', error);
      console.log('- Session user:', session?.user?.email);
      
      if (session && !error && isResetPasswordRoute) {
        console.log('🔑 User has active session on reset route - likely from email link');
        setHasResetToken(true);
      }
    };
    
    if (hasTokenInHash || hasTokenInSearch || hasResetParam) {
      console.log('🔑 Detected password reset token in URL');
      setHasResetToken(true);
      // Clear the hash/search from URL for security
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (isResetPasswordRoute) {
      // Check if user has session from email link
      checkForResetSession();
    }
    
    // Fallback: If on reset route and no token detected, check if user is authenticated
    if (isResetPasswordRoute && !hasResetToken) {
      const checkAuthStatus = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log('🔑 User is authenticated on reset route - showing new password form');
          setHasResetToken(true);
        }
      };
      checkAuthStatus();
    }
  }, [isResetPasswordRoute, locationSearch, location.pathname]);

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur", // Show errors when user leaves a field
    reValidateMode: "onChange", // Revalidate when user changes input
  });

  // Reset password form
  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onBlur", // Show errors when user leaves a field
    reValidateMode: "onChange", // Revalidate when user changes input
  });

  // New password form
  const newPasswordForm = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur", // Show errors when user leaves a field
    reValidateMode: "onChange", // Revalidate when user changes input
  });

  // Signup form
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: location.search.includes('listing') ? "homeowner" : undefined,
      documentType: undefined,
      document: undefined,
      acceptedTerms: false,
    },
    mode: "onBlur", // Show errors when user leaves a field
    reValidateMode: "onChange", // Revalidate when user changes input
  });

  // Handle document file change
  const handleDocumentChange = (file: File | null) => {
    if (file) {
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setDocumentPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setDocumentPreview(null);
      }
      setUploadedDocumentUrl(null);
    } else {
      setDocumentPreview(null);
      setUploadedDocumentUrl(null);
    }
    signupForm.setValue('document', file);
  };

  // Real-time password match validation
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [passwordsTouched, setPasswordsTouched] = useState(false);

  // Email validation states
  const [emailTouched, setEmailTouched] = useState(false);
  const emailCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEmailChange = (value: string) => {
    signupForm.setValue('email', value);
    setEmailTouched(true);
    
    // Clear existing timeout
    if (emailCheckTimeoutRef.current) {
      clearTimeout(emailCheckTimeoutRef.current);
    }
    
    // No email validation checking
  };

  const checkPasswordMatch = useCallback((password: string, confirmPassword: string) => {
    if (!passwordsTouched) return;
    
    if (!password || !confirmPassword) {
      setPasswordMatch(null);
      return;
    }
    
    setPasswordMatch(password === confirmPassword);
  }, [passwordsTouched]);

  const handlePasswordChange = (value: string) => {
    signupForm.setValue('password', value);
    const confirmPassword = signupForm.getValues('confirmPassword');
    setPasswordsTouched(true);
    checkPasswordMatch(value, confirmPassword);
  };

  const handleConfirmPasswordChange = (value: string) => {
    signupForm.setValue('confirmPassword', value);
    const password = signupForm.getValues('password');
    setPasswordsTouched(true);
    checkPasswordMatch(password, value);
  };

  const onLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      // Trigger form validation to show any remaining errors
      const isValid = await loginForm.trigger();
      if (!isValid) {
        setIsLoading(false);
        return;
      }

      const { error, data } = await signIn(values.email, values.password);
      
      if (error) {
        console.error('❌ Login error:', error);
        
        // Handle specific error cases
        if (error.message?.includes('Invalid login credentials') ||
            error.message?.includes('Invalid email or password') ||
            error.message?.includes('User not found') ||
            error.message?.includes('email not confirmed')) {
          toast.error('Invalid email or password. Please check your credentials or sign up for a new account.');
        } else if (error.message?.includes('Email not confirmed')) {
          toast.error('Please check your email and confirm your account before signing in.');
        } else {
          toast.error(error.message || 'Login failed. Please try again.');
        }
      } else {
        toast.success('Logged in successfully');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (values: ResetPasswordFormValues) => {
    setIsResetting(true);
    try {
      // Trigger form validation to show any remaining errors
      const isValid = await resetPasswordForm.trigger();
      if (!isValid) {
        setIsResetting(false);
        return;
      }

      console.log('📧 Sending password reset email to:', values.email);
      console.log('🔗 Supabase URL:', 'https://jwuakfowjxebtpcxcqyr.supabase.co');
      
      const { error, data } = await resetPassword(values.email);
      
      if (error) {
        console.error('❌ Reset password error:', error);
        
        // Type cast error to access message property
        const errorMessage = error as { message?: string };
        
        // Handle specific error cases
        if (errorMessage.message?.includes('User not found') ||
            errorMessage.message?.includes('email not found') ||
            errorMessage.message?.includes('Invalid email') ||
            errorMessage.message?.includes('No user found')) {
          toast.error('This email address is not registered. Please sign up for a new account or check your email address.');
        } else {
          toast.error(errorMessage.message || 'Failed to send reset email. Please try again.');
        }
      } else {
        console.log('✅ Reset password email sent successfully');
        console.log('📋 Data:', data);
        
        toast.success('Password reset email sent! Please check your inbox (including spam folder). If you don\'t receive it within 2 minutes, please contact support.');
        
        // Additional debugging info
        console.log('🔍 Troubleshooting tips:');
        console.log('1. Check spam/junk folder');
        console.log('2. Verify email address is correct');
        console.log('3. Check Supabase Dashboard: Authentication → Settings → Email Templates');
        console.log('4. Ensure Site URL is set to: https://filmloca.com');
      }
    } catch (error) {
      console.error('❌ Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again or contact support.');
    } finally {
      setIsResetting(false);
    }
  };

  const handleNewPassword = async (values: NewPasswordFormValues) => {
    setIsLoading(true);
    try {
      // Trigger form validation to show any remaining errors
      const isValid = await newPasswordForm.trigger();
      if (!isValid) {
        setIsLoading(false);
        return;
      }

      // Additional client-side validation for password match
      if (values.password !== values.confirmPassword) {
        toast.error('Passwords do not match. Please make sure both passwords are the same.');
        setIsLoading(false);
        return;
      }

      console.log('🔑 Updating password with reset token');
      
      const { error } = await supabase.auth.updateUser({
        password: values.password
      });
      
      if (error) {
        console.error('❌ Update password error:', error);
        toast.error(error.message || 'Failed to update password. Please try again.');
      } else {
        console.log('✅ Password updated successfully');
        toast.success('Password updated successfully! You can now sign in with your new password.');
        
        // Redirect to login page after successful password update
        setTimeout(() => {
          navigate('/auth?tab=login&message=password-updated');
        }, 2000);
      }
    } catch (error) {
      console.error('❌ Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again or contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSignup = async (values: SignupFormValues) => {
    setIsLoading(true);
    try {
      // Trigger form validation to show any remaining errors
      const isValid = await signupForm.trigger();
      if (!isValid) {
        setIsLoading(false);
        return;
      }

      // Additional client-side validation for password match
      if (values.password !== values.confirmPassword) {
        toast.error('Passwords do not match. Please make sure both passwords are the same.');
        setIsLoading(false);
        return;
      }

      // First, create the user account
      const { data: authData, error: signUpError } = await signUp(
        values.email,
        values.password,
        {
          user_type: values.userType,
          full_name: values.name,
        }
      );

      if (signUpError) {
        console.error('❌ Signup error:', signUpError);
        
        // Handle specific error cases - expand patterns for duplicate emails
        const errorMessage = signUpError.message || '';
        
        if (errorMessage.includes('User already registered') || 
            errorMessage.includes('already registered') ||
            errorMessage.includes('duplicate') ||
            errorMessage.includes('already been taken') ||
            errorMessage.includes('user_already_exists') ||
            errorMessage.includes('user already exists') ||
            errorMessage.includes('email already exists') ||
            errorMessage.includes('email already registered') ||
            errorMessage.includes('already in use') ||
            errorMessage.includes('duplicate key') ||
            errorMessage.includes('unique constraint') ||
            errorMessage.includes('duplicate_email')) {
          toast.error('This email is already registered. Please sign in or use a different email address.');
        } else if (errorMessage.includes('Invalid email')) {
          toast.error('Please enter a valid email address.');
        } else if (errorMessage.includes('Password')) {
          toast.error('Password is too weak. Please choose a stronger password.');
        } else {
          toast.error(errorMessage || 'Failed to create account. Please try again.');
        }
        
        setIsLoading(false);
        return;
      }

      console.log('✅ User created successfully:', authData.user?.id);

      // Check if user has a session (email verified)
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      const hasSession = !sessionError && session;

      if (!hasSession) {
        console.log('ℹ️ No session - user needs to verify email first');
        console.log('📧 Verification email should be sent to:', values.email);
        
        // Clear any existing loading states
        setIsLoading(false);
        
        // Show clear success message with next steps
        toast.success(`Account created! Please check your email (${values.email}) to verify your account before signing in.`);
        
        // Navigate to login with clear message
        const redirectTo = new URLSearchParams(location.search).get('redirect') || '/auth?tab=login&message=check-email';
        navigate(redirectTo, { replace: true });
        return; // Exit - signup succeeds but requires email verification
      }

      console.log('✅ User created and email verified successfully:', authData.user?.id);
      console.log('📧 User email:', values.email);
      console.log('👤 User session confirmed');

      // User has session - check account approval status before proceeding
      console.log('👤 User session confirmed, checking account approval...');
      
      // Check if account is approved before allowing full access
      const { data: profile, error: profileCheckError } = await supabase
        .from('profiles')
        .select('id, user_type, document_verification_status, status')
        .eq('id', authData.user.id)
        .single();

      if (profileCheckError) {
        console.error('❌ Profile check error:', profileCheckError);
        toast.error('Account created but there was an issue verifying your profile. Please contact support.');
        setIsLoading(false);
        return;
      }

      console.log('📋 Profile data:', profile);
      
      // Check if account is approved
      if (profile?.status === 'pending' || profile?.document_verification_status === 'pending') {
        console.log('⏳ Account pending approval');
        toast.success('Account created! Your account is pending approval. You will be notified once your document is verified.');
        setIsLoading(false);
        
        // Navigate to login with pending status message
        const redirectTo = new URLSearchParams(location.search).get('redirect') || '/auth?tab=login&message=account-pending';
        navigate(redirectTo, { replace: true });
        return;
      }

      if (profile?.status === 'rejected' || profile?.document_verification_status === 'rejected') {
        console.log('❌ Account rejected');
        toast.error('Your account has been rejected. Please contact support for more information.');
        setIsLoading(false);
        return;
      }

      console.log('✅ Account approved - proceeding with document upload');
      try {
        console.log('📄 Starting document upload...');
        console.log('📋 Document info:', {
          name: values.document.name,
          type: values.document.type,
          size: values.document.size,
          user_id: authData.user.id,
          has_session: true
        });

        const fileExt = values.document.name.split('.').pop();
        const fileName = `${authData.user.id}-${Date.now()}.${fileExt}`;
        // Path structure: {user_id}/{filename} (bucket name is implicit)
        const filePath = `${authData.user.id}/${fileName}`;

        console.log('📤 Uploading to path:', filePath);

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('user-documents')
          .upload(filePath, values.document, {
            contentType: values.document.type,
            upsert: false,
            cacheControl: '3600'
          });

        if (uploadError) {
          console.error('❌ Document upload error:', uploadError);
          
          // Type cast uploadError to access properties safely
          const error = uploadError as { message?: string; statusCode?: number; error?: any };
          
          console.error('Error details:', {
            message: error.message,
            statusCode: error.statusCode,
            error: error.error
          });
          
          // FIXED: Don't throw errors - just warn and allow signup to succeed
          // User can upload document later from their profile
          if (error.message?.includes('bucket') || error.message?.includes('not found')) {
            console.warn('⚠️ Storage bucket not found - user can upload later');
            toast.warning('Account created! Please upload your document from your profile after signing in.');
          } else if (error.message?.includes('policy') || error.message?.includes('permission')) {
            console.warn('⚠️ Permission denied - user can upload later after email confirmation');
            toast.warning('Account created! Please upload your document from your profile after confirming your email.');
          } else {
            console.warn('⚠️ Upload error - user can upload later');
            toast.warning('Account created! Please upload your document from your profile after signing in.');
          }
          // Don't throw - continue with signup success
        } else {
          console.log('✅ Document uploaded successfully:', uploadData);

          // Get the public URL for the document
          const { data: { publicUrl } } = supabase.storage
            .from('user-documents')
            .getPublicUrl(filePath);

          console.log('🔗 Document URL:', publicUrl);

          // Update profile with document information (might fail without session, that's OK)
          console.log('💾 Updating profile with document info...');
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              document_type: values.documentType,
              document_url: publicUrl,
              document_verification_status: 'pending',
              updated_at: new Date().toISOString()
            })
            .eq('id', authData.user.id);

          if (profileError) {
            console.error('⚠️ Profile update error (non-critical - no session yet):', profileError);
            console.log('ℹ️ Profile will be updated after email verification and login');
            // Don't throw - account is created, document is uploaded
            // Profile update can happen after email verification
            toast.success('Account created! Document uploaded successfully. Please check your email for verification. Profile will be updated after you log in.');
          } else {
            console.log('✅ Profile updated successfully');
            toast.success('Account created! Please check your email for verification. Your document is being reviewed.');
          }
        }
      } catch (uploadErr) {
        console.error('⚠️ Document upload failed:', uploadErr);
        const error = uploadErr as Error;
        // FIXED: Don't throw errors - allow signup to succeed
        // User can upload document later from their profile
        console.log('ℹ️ Upload error - signup will still succeed, user can upload document later');
        console.error('Upload error details:', error);
        // Show warning but don't block signup
        toast.warning('Account created! Document upload failed. You can upload your document from your profile after signing in.');
        // Continue - don't throw, don't return
      }

      // Signup successful - navigate to login or profile (even if document upload failed)
      toast.success('Account created successfully! Please check your email to verify your account.');
      const redirectTo = new URLSearchParams(location.search).get('redirect') || '/auth?tab=login&message=account-created';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const error = err as Error;
      console.error('Signup error:', error);
      toast.error(error.message || 'Failed to create account');
      setIsLoading(false);
    }
  };

  const removeDocument = () => {
    setDocumentPreview(null);
    setUploadedDocumentUrl(null);
    signupForm.setValue('document', null);
  };

  return (
    <>
      <Helmet>
        <title>Sign In or Sign Up - Film Loca</title>
        <meta name="description" content="Sign in to your Film Loca account or create a new account to book filming locations" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-nollywood-cream via-white to-nollywood-blue/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-nollywood-blue mb-2">
                Welcome to Film Loca
              </h1>
              <p className="text-muted-foreground">
                Your gateway to premium filming locations
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                {isResetPasswordRoute && <TabsTrigger value="reset-password">Reset Password</TabsTrigger>}
              </TabsList>
              
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Welcome Back</CardTitle>
                    <CardDescription>
                      Sign in to your account to continue booking
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="you@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="•••••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? "Logging in..." : "Login"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="link" onClick={() => navigate('/reset-password')}>
                      Forgot your password?
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="reset-password">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {hasResetToken ? "Set New Password" : "Reset Password"}
                    </CardTitle>
                    <CardDescription>
                      {hasResetToken 
                        ? "Enter your new password below"
                        : "Enter your email address to receive password reset instructions"
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {hasResetToken ? (
                      // New Password Form
                      <Form {...newPasswordForm}>
                        <form onSubmit={newPasswordForm.handleSubmit(handleNewPassword)} className="space-y-4">
                          <FormField
                            control={newPasswordForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="password" 
                                    placeholder="Enter new password" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={newPasswordForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="password" 
                                    placeholder="Confirm new password" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Updating..." : "Update Password"}
                          </Button>
                        </form>
                      </Form>
                    ) : (
                      // Request Reset Email Form
                      <Form {...resetPasswordForm}>
                        <form onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)} className="space-y-4">
                          <FormField
                            control={resetPasswordForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" className="w-full" disabled={isResetting}>
                            {isResetting ? "Sending..." : "Send Reset Email"}
                          </Button>
                        </form>
                      </Form>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="link" onClick={() => setActiveTab('login')}>
                      Back to Login
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="signup">
                <Card>
                  <CardHeader>
                    <CardTitle>Create an Account</CardTitle>
                    <CardDescription>
                      Join FilmLoca to book or list filming locations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...signupForm}>
                      <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
                        <FormField
                          control={signupForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signupForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input 
                                    type="email" 
                                    placeholder="you@example.com" 
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      handleEmailChange(e.target.value);
                                    }}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signupForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  placeholder="•••••••••" 
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handlePasswordChange(e.target.value);
                                  }}
                                  className={passwordMatch === false ? "border-red-500 focus:border-red-500" : ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signupForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  placeholder="•••••••••" 
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleConfirmPasswordChange(e.target.value);
                                  }}
                                  className={passwordMatch === false ? "border-red-500 focus:border-red-500" : ""}
                                />
                              </FormControl>
                              <FormMessage />
                              {passwordsTouched && passwordMatch === false && (
                                <p className="text-sm font-medium text-red-500 flex items-center gap-1">
                                  <span className="text-red-500">✗</span>
                                  Passwords do not match
                                </p>
                              )}
                              {passwordsTouched && passwordMatch === true && (
                                <p className="text-sm font-medium text-green-500 flex items-center gap-1">
                                  <span className="text-green-500">✓</span>
                                  Passwords match
                                </p>
                              )}
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signupForm.control}
                          name="userType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Account Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select account type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="renter">I want to rent locations</SelectItem>
                                  <SelectItem value="homeowner">I want to list locations</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signupForm.control}
                          name="documentType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Government ID Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select ID type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="passport">Passport</SelectItem>
                                  <SelectItem value="nin">National ID (NIN)</SelectItem>
                                  <SelectItem value="drivers_license">Driver's License</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signupForm.control}
                          name="document"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Upload Government ID</FormLabel>
                              <FormControl>
                                <Input
                                  type="file"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    handleDocumentChange(file);
                                  }}
                                />
                              </FormControl>
                              <FormDescription>
                                Upload a PDF or image of your government-issued ID (Passport, NIN, or Driver's License)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {documentPreview && (
                          <div className="mt-4">
                            <div className="relative inline-block">
                              <img
                                src={documentPreview}
                                alt="Document preview"
                                className="max-h-32 rounded border"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="absolute -top-2 -right-2"
                                onClick={removeDocument}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                        <FormField
                          control={signupForm.control}
                          name="acceptedTerms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-normal">
                                  I accept the{" "}
                                  <Link to="/terms" className="text-nollywood-blue hover:underline">
                                    Terms of Service
                                  </Link>{" "}
                                  and{" "}
                                  <Link to="/privacy" className="text-nollywood-blue hover:underline">
                                    Privacy Policy
                                  </Link>
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? "Creating account..." : "Sign Up"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default AuthPage;
