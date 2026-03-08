import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Camera, Edit3, Save, X, Shield, Mail, Phone, MapPin, Building, Calendar, Star, Award, CheckCircle, User, CreditCard, Lock, Key, Trash2, AlertTriangle, FileText, Upload, Eye, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';
import BankAccountForm from './BankAccountForm';

interface EnhancedUserProfileProps {
  isEditing?: boolean;
  onEditToggle?: () => void;
}

interface ProfileData {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  bio: string | null;
  address: string | null;
  company_name: string | null;
  user_type: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  is_verified?: boolean;
  verification_status?: string;
  total_bookings?: number;
  total_earnings?: number;
  average_rating?: number;
  total_reviews?: number;
  document_type?: string | null;
  document_url?: string | null;
  document_verification_status?: string | null;
}

const EnhancedUserProfile = ({ isEditing = false, onEditToggle }: EnhancedUserProfileProps) => {
  const { user, profile: authProfile } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    address: '',
    company_name: '',
    user_type: 'filmmaker'
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [documentForm, setDocumentForm] = useState({
    documentType: '',
    document: null as File | null
  });
  const [documentPreview, setDocumentPreview] = useState<string | null>(null);
  const [isUploadingDocument, setIsUploadingDocument] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [pendingAvatarUrl, setPendingAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      // Use profile from AuthContext immediately if available (fast path)
      if (authProfile) {
        const profileData: ProfileData = {
          ...authProfile,
          total_bookings: 0, // Will update when stats load
          total_earnings: 0,
          average_rating: 0,
          total_reviews: 0,
          is_verified: authProfile.user_type === 'homeowner',
          verification_status: authProfile.user_type === 'homeowner' ? 'pending' : 'not_applicable',
          document_type: authProfile.document_type || null,
          document_url: authProfile.document_url || null,
          document_verification_status: authProfile.document_verification_status || null,
          avatar_url: authProfile.avatar_url || null
        };
        setProfile(profileData);
        
        // Set form data immediately
        if (!isEditing) {
          setFormData({
            name: authProfile.name || '',
            email: authProfile.email || '',
            phone: authProfile.phone || '',
            bio: authProfile.bio || '',
            address: authProfile.address || '',
            company_name: authProfile.company_name || '',
            user_type: authProfile.user_type || 'filmmaker'
          });
        }
      }
      
      // Fetch enhanced profile with stats in background (non-blocking)
      fetchEnhancedProfile();
    }
  }, [user, authProfile]);

  // Sync formData when entering edit mode - this ensures form is populated with current profile data
  useEffect(() => {
    if (isEditing && profile?.id) {
      console.log('📝 Entering edit mode - syncing formData with profile data:', {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        address: profile.address,
        company_name: profile.company_name,
        user_type: profile.user_type
      });
      
      // Sync formData with current profile data
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        address: profile.address || '',
        company_name: profile.company_name || '',
        user_type: profile.user_type || 'filmmaker'
      });
      
      // Sync document form
      setDocumentForm({
        documentType: profile.document_type || '',
        document: null
      });
      
      // Sync document preview
      if (profile.document_url) {
        setDocumentPreview(profile.document_url);
      } else {
        setDocumentPreview(null);
      }
      
      // Reset avatar states when entering edit mode (keep current avatar visible)
      // Don't reset if there's a pending upload
      if (!pendingAvatarUrl) {
        setAvatarPreview(null);
      }
      setAvatarFile(null);
    } else if (!isEditing && profile?.id) {
      // When exiting edit mode, ensure formData is synced with latest profile data
      console.log('📝 Exiting edit mode - syncing formData with profile data');
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        address: profile.address || '',
        company_name: profile.company_name || '',
        user_type: profile.user_type || 'filmmaker'
      });
    }
  }, [isEditing, profile?.id]);

  const fetchEnhancedProfile = async () => {
    try {
      // Don't set loading - load in background, show UI immediately
      // Use profile from AuthContext if available (faster)
      let profileData: any = null;
      let bookings: any[] = [];
      let reviews: any[] = [];

      // First, try to use profile from AuthContext (already loaded)
      if (authProfile) {
        profileData = authProfile;
        console.log('✅ Using profile from AuthContext (fast path)');
      }

      // Fetch additional stats in parallel (non-blocking)
      try {
        // Only fetch profile if not available from AuthContext
        if (!profileData) {
          const { data: profileResult, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user?.id)
            .single();

          if (profileError) throw profileError;
          profileData = profileResult;
        }

        // Fetch user stats in parallel (non-blocking, don't wait)
        Promise.all([
          supabase
            .from('bookings')
            .select('id, total_price, status')
            .eq('user_id', user?.id)
            .limit(100), // Limit to prevent slow queries
          supabase
            .from('reviews')
            .select('rating')
            .eq('user_id', user?.id)
            .limit(100) // Limit to prevent slow queries
        ]).then(([bookingsResult, reviewsResult]) => {
          bookings = bookingsResult.data || [];
          reviews = reviewsResult.data || [];
          
          // Update stats when they arrive
          const totalBookings = bookings.length;
          const totalEarnings = bookings
            .filter(b => b.status === 'completed')
            .reduce((sum, b) => sum + (b.total_price || 0), 0);
          const averageRating = reviews.length > 0 
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
            : 0;

          if (profileData) {
            const enhancedProfile: ProfileData = {
              ...profileData,
              total_bookings: totalBookings,
              total_earnings: totalEarnings,
              average_rating: averageRating,
              total_reviews: reviews.length,
              is_verified: profileData.user_type === 'homeowner' && totalBookings > 0,
              verification_status: profileData.user_type === 'homeowner' 
                ? (totalBookings > 0 ? 'verified' : 'pending')
                : 'not_applicable',
              document_type: profileData.document_type || null,
              document_url: profileData.document_url || null,
              document_verification_status: profileData.document_verification_status || null,
              avatar_url: profileData.avatar_url || null
            };
            setProfile(enhancedProfile);
          }
        }).catch(err => {
          console.error('Error fetching stats:', err);
          // Continue with profile data even if stats fail
        });
      } catch (dbError) {
        console.log('Database query failed, using available data:', dbError);
        
        // Use profile from AuthContext or user metadata as fallback
        if (!profileData) {
          profileData = {
            id: user?.id,
            name: user?.user_metadata?.name || 'User',
            email: user?.email,
            bio: 'Welcome to Film Loca!',
            phone: null,
            address: null,
            company_name: null,
            user_type: user?.user_metadata?.user_type || 'filmmaker',
            avatar_url: user?.user_metadata?.avatar_url,
            created_at: user?.created_at,
            updated_at: new Date().toISOString()
          };
        }
        
        // Stats will be empty initially, will update when Promise.all resolves
        bookings = [];
        reviews = [];
      }

      // Set profile immediately with available data (stats will be 0 initially, update later)
      if (profileData) {
        const enhancedProfile: ProfileData = {
          ...profileData,
          total_bookings: 0, // Will update when stats load
          total_earnings: 0,
          average_rating: 0,
          total_reviews: 0,
          is_verified: profileData.user_type === 'homeowner',
          verification_status: profileData.user_type === 'homeowner' ? 'pending' : 'not_applicable',
          document_type: profileData.document_type || null,
          document_url: profileData.document_url || null,
          document_verification_status: profileData.document_verification_status || null,
          avatar_url: profileData.avatar_url || null
        };

        console.log('📥 Setting profile immediately (stats will update):', {
          id: enhancedProfile.id,
          name: enhancedProfile.name,
          avatar_url: enhancedProfile.avatar_url,
          email: enhancedProfile.email
        });
        
        setProfile(enhancedProfile);
        
        // Update formData only when not in edit mode (to avoid overwriting user input during editing)
        // The useEffect will handle syncing formData when entering edit mode
        if (!isEditing) {
          setFormData({
            name: profileData.name || '',
            email: profileData.email || '',
            phone: profileData.phone || '',
            bio: profileData.bio || '',
            address: profileData.address || '',
            company_name: profileData.company_name || '',
            user_type: profileData.user_type || 'filmmaker'
          });
          
          setDocumentForm({
            documentType: profileData.document_type || '',
            document: null
          });
          
          if (profileData.document_url) {
            setDocumentPreview(profileData.document_url);
          } else {
            setDocumentPreview(null);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching enhanced profile:', error);
      // Don't show error toast - just log it, UI will show with available data
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user?.id) {
      toast.error('User not authenticated');
      return;
    }

    console.log('💾 Starting profile save...');
    console.log('📝 Form data:', formData);
    console.log('📸 Pending avatar URL:', pendingAvatarUrl);

    setIsSaving(true);
    try {
      // Prepare update data - only include fields that exist in the database
      // Exclude email as it's managed by auth.users table
      const updateData: any = {
        name: formData.name?.trim() || null,
        phone: formData.phone?.trim() || null,
        bio: formData.bio?.trim() || null,
        address: formData.address?.trim() || null,
        company_name: formData.company_name?.trim() || null,
        user_type: formData.user_type || 'filmmaker',
        updated_at: new Date().toISOString()
      };

      // Include avatar URL if it was uploaded during this edit session
      if (pendingAvatarUrl) {
        updateData.avatar_url = pendingAvatarUrl;
        console.log('📸 Including avatar URL in save:', pendingAvatarUrl);
      }

      // Remove any undefined or empty string values that might cause issues
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === '' || updateData[key] === undefined) {
          updateData[key] = null;
        }
      });

      console.log('💾 Final update data:', JSON.stringify(updateData, null, 2));
      console.log('👤 User ID:', user.id);

      // Verify user is authenticated
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      if (authError || !authUser) {
        console.error('❌ Auth error:', authError);
        throw new Error('User not authenticated. Please log in again.');
      }

      if (authUser.id !== user.id) {
        console.error('❌ User ID mismatch:', { authUserId: authUser.id, profileUserId: user.id });
        throw new Error('User ID mismatch. Please log in again.');
      }

      console.log('✅ Auth verified. User ID matches:', authUser.id);

      // Perform the update
      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('❌ Profile update error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        
        // Provide more specific error messages
        if (error.code === '42501') {
          throw new Error('Permission denied. Please check RLS policies.');
        } else if (error.code === '23503') {
          throw new Error('Invalid data. Please check your input.');
        } else if (error.code === '23505') {
          throw new Error('Duplicate entry. This data already exists.');
        } else {
          throw new Error(error.message || 'Failed to update profile');
        }
      }

      if (!data) {
        console.error('❌ No data returned from update');
        throw new Error('No data returned from update. The profile may not have been updated.');
      }
      
      console.log('✅ Profile updated successfully:', data);
      
      // Update auth user metadata with avatar URL if it was updated
      if (pendingAvatarUrl) {
        try {
          const { error: authError } = await supabase.auth.updateUser({
            data: { avatar_url: pendingAvatarUrl }
          });
          if (authError) {
            console.warn('⚠️ Auth metadata update failed (non-critical):', authError);
          } else {
            console.log('✅ Auth metadata updated successfully');
          }
        } catch (authError) {
          console.warn('⚠️ Auth metadata update error (non-critical):', authError);
        }
      }
      
      // Clear pending avatar URL since it's now saved
      if (pendingAvatarUrl) {
        setPendingAvatarUrl(null);
        setAvatarPreview(null);
      }
      
      // Clear avatar file state
      setAvatarFile(null);
      
      toast.success('Profile updated successfully!');
      
      // Exit edit mode first, then refresh profile data
      // This ensures formData syncs properly when profile refreshes
      if (onEditToggle) {
        onEditToggle();
      }
      
      // Small delay to ensure edit mode state has updated
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Refresh profile data from database to get the latest data
      console.log('🔄 Refreshing profile data...');
      await fetchEnhancedProfile();
      console.log('✅ Profile data refreshed');
    } catch (error: any) {
      console.error('❌ Error updating profile:', error);
      const errorMessage = error?.message || error?.error?.message || 'Failed to update profile. Please try again.';
      toast.error(errorMessage);
      // Don't exit edit mode on error so user can fix and retry
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const changePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword
      });

      if (error) throw error;
      
      toast.success('Password updated successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error: any) {
      console.error('Error changing password:', error);
      toast.error(error.message || 'Failed to change password');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    if (!confirm('This will permanently delete all your data. Are you absolutely sure?')) {
      return;
    }

    setIsSaving(true);
    try {
      // Note: In a real app, you'd want to implement proper account deletion
      // This might involve multiple steps and data cleanup
      toast.error('Account deletion is not implemented yet. Please contact support.');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (file: File) => {
    if (!user || !file) {
      toast.error('Please select an image to upload');
      return;
    }

    setIsUploadingAvatar(true);
    try {
      console.log('🖼️ Starting avatar upload for user:', user.id);
      console.log('📁 File:', file.name, 'Size:', file.size, 'Type:', file.type);

      // Note: File size validation removed - no limit (unlimited)
      // If you want to add a client-side limit, uncomment the code below:
      // const maxSize = 10 * 1024 * 1024; // 10MB (example)
      // if (file.size > maxSize) {
      //   toast.error('Image size must be less than 10MB');
      //   setIsUploadingAvatar(false);
      //   setAvatarFile(null);
      //   setAvatarPreview(null);
      //   return;
      // }

      // Upload new avatar directly - let Supabase tell us if there's an issue
      // This is more reliable than checking bucket existence first
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      console.log('📤 Uploading to path:', filePath);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          contentType: file.type || `image/${fileExt}`,
          upsert: true,
          cacheControl: '3600'
        });

      if (uploadError) {
        console.error('❌ Avatar upload error:', uploadError);
        console.error('❌ Error details:', {
          message: uploadError.message,
          statusCode: uploadError.statusCode,
          error: uploadError.error,
          name: uploadError.name
        });
        
        // Provide more specific error messages based on the actual error
        if (uploadError.message?.includes('not found') || uploadError.message?.includes('Bucket not found')) {
          throw new Error(
            'Storage bucket "avatars" not found. ' +
            'Please create it in Supabase Dashboard → Storage → New bucket. ' +
            'Name: avatars, Public: Yes, File size limit: None (unlimited).'
          );
        } else if (uploadError.message?.includes('permission') || uploadError.message?.includes('denied') || uploadError.statusCode === 403) {
          throw new Error(
            'Permission denied. ' +
            'Please check that you have created the RLS policies for the "avatars" bucket. ' +
            'See CREATE_AVATARS_BUCKET_DASHBOARD_ONLY.md for setup instructions.'
          );
        } else if (uploadError.message?.includes('duplicate') || uploadError.message?.includes('already exists')) {
          // File already exists, which is fine with upsert: true
          console.log('⚠️ File already exists, continuing...');
        } else {
          // Generic error with full message
          throw new Error(`Upload failed: ${uploadError.message || uploadError.error || 'Unknown error'}. Status: ${uploadError.statusCode || 'N/A'}`);
        }
      }

      console.log('✅ Avatar uploaded successfully:', uploadData);

      // Get the public URL for the avatar
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      console.log('🔗 Public URL:', publicUrl);

      // Store the URL in pendingAvatarUrl (will be saved when user clicks Save)
      setPendingAvatarUrl(publicUrl);
      
      // Update avatar preview immediately to show the uploaded image
      setAvatarPreview(`${publicUrl}?t=${Date.now()}`);
      
      // Update local profile state to show the new avatar immediately
      setProfile(prev => {
        if (prev) {
          return { ...prev, avatar_url: publicUrl };
        }
        return null;
      });
      
      // Clear file state since upload is complete
      setAvatarFile(null);
      
      console.log('✅ Avatar upload completed successfully');
      toast.success('Photo uploaded! Click Save to apply all changes.');
    } catch (error: any) {
      console.error('❌ Error uploading avatar:', error);
      const errorMessage = error?.message || error?.error?.message || 'Failed to upload profile image';
      toast.error(errorMessage);
      // Reset state on error
      setAvatarFile(null);
      setAvatarPreview(null);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

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
      setDocumentForm(prev => ({ ...prev, document: file }));
    }
  };

  const updateDocument = async () => {
    if (!user || !documentForm.documentType) {
      toast.error('Please select a document type');
      return;
    }
    
    // Allow updating document type without uploading a new file
    if (!documentForm.document && !profile?.document_url) {
      toast.error('Please upload a document');
      return;
    }

    setIsUploadingDocument(true);
    try {
      let publicUrl = profile?.document_url || null;

      // Only upload if a new document is provided
      if (documentForm.document) {
        // Delete old document if exists
        if (profile?.document_url) {
          try {
            // Extract file path from URL
            // URL format: https://[project].supabase.co/storage/v1/object/public/user-documents/{user_id}/{filename}
            // Or: https://[project].supabase.co/storage/v1/object/sign/user-documents/{user_id}/{filename}
            const urlParts = profile.document_url.split('/');
            const filePathIndex = urlParts.findIndex(part => part === 'user-documents');
            if (filePathIndex !== -1) {
              // Get everything after 'user-documents' (e.g., '{user_id}/{filename}')
              const filePath = urlParts.slice(filePathIndex + 1).join('/');
              console.log('🗑️ Deleting old document at path:', filePath);
              const { error: deleteError } = await supabase.storage
                .from('user-documents')
                .remove([filePath]);
              if (deleteError) {
                console.warn('⚠️ Could not delete old document (non-critical):', deleteError);
              } else {
                console.log('✅ Old document deleted successfully');
              }
            }
          } catch (error) {
            console.error('Error deleting old document:', error);
            // Continue even if deletion fails (non-critical)
          }
        }

        // Upload new document
        // Path structure: {user_id}/{filename} (bucket name is implicit)
        const fileExt = documentForm.document.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('user-documents')
          .upload(filePath, documentForm.document, {
            contentType: documentForm.document.type,
            upsert: false
          });

        if (uploadError) {
          console.error('❌ Document upload error:', uploadError);
          console.error('❌ Error details:', {
            message: uploadError.message,
            statusCode: uploadError.statusCode,
            error: uploadError.error,
            name: uploadError.name
          });
          
          // Provide more specific error messages
          if (uploadError.message?.includes('not found') || uploadError.message?.includes('Bucket not found')) {
            throw new Error(
              'Storage bucket "user-documents" not found. ' +
              'Please create it in Supabase Dashboard → Storage → New bucket. ' +
              'See ALL_USER_DOCUMENTS_POLICIES.md for setup instructions.'
            );
          } else if (uploadError.message?.includes('permission') || uploadError.message?.includes('denied') || uploadError.statusCode === 403) {
            throw new Error(
              'Permission denied. ' +
              'Please check that you have created the RLS policies for the "user-documents" bucket. ' +
              'See ALL_USER_DOCUMENTS_POLICIES.md for setup instructions.'
            );
          } else {
            throw new Error(`Failed to upload document: ${uploadError.message || uploadError.error || 'Unknown error'}. Please try again.`);
          }
        }
        
        console.log('✅ Document uploaded successfully to path:', filePath);

        // Get the public URL for the document
        const { data: { publicUrl: newPublicUrl } } = supabase.storage
          .from('user-documents')
          .getPublicUrl(filePath);
        
        publicUrl = newPublicUrl;
      }

      // Update the profile with document information
      const updateData: any = {
        document_type: documentForm.documentType,
        document_verification_status: 'pending',
        updated_at: new Date().toISOString()
      };

      // Only update URL if a new document was uploaded
      if (publicUrl) {
        updateData.document_url = publicUrl;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        throw profileError;
      }

      toast.success('Government ID updated successfully! It will be reviewed by our team.');
      setDocumentForm({ documentType: documentForm.documentType, document: null });
      setDocumentPreview(profile?.document_url || null);
      fetchEnhancedProfile(); // Refresh profile data
    } catch (error: any) {
      console.error('Error updating document:', error);
      toast.error(error.message || 'Failed to update government ID');
    } finally {
      setIsUploadingDocument(false);
    }
  };

  const getDocumentTypeLabel = (type: string | null | undefined) => {
    switch (type) {
      case 'passport': return 'Passport';
      case 'nin': return 'NIN Certificate';
      case 'drivers_license': return "Driver's License";
      default: return 'Not provided';
    }
  };

  const getVerificationStatusBadge = (status: string | null | undefined) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><X className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">Not submitted</Badge>;
    }
  };

  const getVerificationBadge = () => {
    if (!profile) return null;
    
    // Only show verification badge for homeowners (property owners)
    // Filmmakers/renters don't need verification status
    if (profile.user_type !== 'homeowner') {
      return null;
    }
    
    switch (profile.verification_status) {
      case 'verified':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Shield className="h-3 w-3 mr-1" />
            Pending Verification
          </Badge>
        );
      default:
        // For homeowners without a status, show pending
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Shield className="h-3 w-3 mr-1" />
            Pending Verification
          </Badge>
        );
    }
  };

  if (!user) return null;

  // Don't show loading spinner - render immediately with available data
  // Profile will update when data loads

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
              Profile Information
            </CardTitle>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {isEditing ? (
                <>
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onEditToggle}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onEditToggle}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
              <AvatarImage 
                src={avatarPreview || pendingAvatarUrl || profile?.avatar_url || undefined} 
                alt={profile?.name || 'Profile'} 
              />
              <AvatarFallback className="text-xl">
                {profile?.name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 mb-2 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-semibold">
                  {profile?.name || 'Complete your profile'}
                </h2>
                {getVerificationBadge()}
              </div>
              <p className="text-muted-foreground mb-2 text-center sm:text-left text-sm sm:text-base">
                {profile?.email}
              </p>
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {profile?.created_at ? format(new Date(profile.created_at), 'MMM yyyy') : 'Recently'}
                </div>
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  {profile?.user_type === 'homeowner' ? 'Property Owner' : 'Filmmaker'}
                </div>
              </div>
            </div>
            {isEditing && (
              <div className="space-y-2">
                <label htmlFor="avatar-upload" className="sr-only">
                  Upload profile photo
                </label>
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  className="hidden"
                  aria-label="Upload profile photo"
                  onChange={async (e) => {
                    console.log('📁 File input onChange triggered');
                    const file = e.target.files?.[0];
                    console.log('📄 Selected file:', file ? { name: file.name, size: file.size, type: file.type } : 'none');
                    
                    if (!file) {
                      console.log('⚠️ No file selected');
                      return;
                    }
                    
                    // Note: File size validation removed - no limit (unlimited)
                    // If you want to add a client-side limit, uncomment the code below:
                    // const maxSize = 10 * 1024 * 1024; // 10MB (example)
                    // if (file.size > maxSize) {
                    //   console.error('❌ File too large:', file.size, 'bytes');
                    //   toast.error('Image size must be less than 10MB');
                    //   e.target.value = ''; // Reset input
                    //   return;
                    // }

                    // Validate file type
                    if (!file.type.startsWith('image/')) {
                      console.error('❌ Invalid file type:', file.type);
                      toast.error('Please select an image file');
                      e.target.value = ''; // Reset input
                      return;
                    }

                    console.log('✅ File validation passed');
                    setAvatarFile(file);
                    
                    // Create preview immediately
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const preview = reader.result as string;
                      console.log('🖼️ Preview created, length:', preview.length);
                      setAvatarPreview(preview);
                    };
                    reader.onerror = (error) => {
                      console.error('❌ FileReader error:', error);
                      toast.error('Failed to read image file');
                    };
                    reader.readAsDataURL(file);

                    // Automatically upload the avatar
                    console.log('📤 Starting automatic upload...');
                    try {
                      await handleAvatarUpload(file);
                      console.log('✅ Automatic upload completed');
                    } catch (error) {
                      console.error('❌ Error in file onChange handler:', error);
                      e.target.value = ''; // Reset input on error
                    }
                  }}
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  type="button"
                  disabled={isUploadingAvatar}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🔘 Change Photo button clicked');
                    const fileInput = document.getElementById('avatar-upload') as HTMLInputElement;
                    console.log('📎 File input element:', fileInput);
                    if (fileInput) {
                      console.log('✅ Clicking file input...');
                      fileInput.click();
                      console.log('✅ File input clicked');
                    } else {
                      console.error('❌ File input not found!');
                      toast.error('File input not found. Please refresh the page.');
                    }
                  }}
                  aria-label="Change profile photo"
                >
                  {isUploadingAvatar ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Profile Details Card */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{profile?.name || 'Not provided'}</p>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{profile?.email || 'Not provided'}</p>
                </div>
                {isEditing && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Email cannot be changed. Contact support to update your email address.
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{profile?.phone || 'Not provided'}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="company">Company/Organization</Label>
                {isEditing ? (
                  <Input
                    id="company"
                    value={formData.company_name}
                    onChange={(e) => handleChange('company_name', e.target.value)}
                    placeholder="Enter your company name"
                  />
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{profile?.company_name || 'Not provided'}</p>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="user_type">Account Type</Label>
                {isEditing ? (
                  <Select value={formData.user_type} onValueChange={(value) => handleChange('user_type', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="filmmaker">Filmmaker</SelectItem>
                      <SelectItem value="homeowner">Property Owner</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm capitalize">
                      {profile?.user_type === 'homeowner' ? 'Property Owner' : 
                       profile?.user_type === 'filmmaker' ? 'Filmmaker' : 
                       profile?.user_type || 'Not specified'}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                {isEditing ? (
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Enter your address"
                  />
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{profile?.address || 'Not provided'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Government ID Section */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Label className="text-base font-semibold">Government ID</Label>
              </div>
              {profile?.document_verification_status && getVerificationStatusBadge(profile.document_verification_status)}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="document-type">Document Type</Label>
                  <Select
                    value={documentForm.documentType}
                    onValueChange={(value) => setDocumentForm(prev => ({ ...prev, documentType: value }))}
                  >
                    <SelectTrigger id="document-type" className="mt-1">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="nin">NIN Certificate</SelectItem>
                      <SelectItem value="drivers_license">Driver's License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="document">Upload Government ID</Label>
                  <div className="mt-1 space-y-2">
                    <Input
                      id="document"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleDocumentChange(file);
                        }
                      }}
                      className="cursor-pointer"
                    />
                    {documentPreview && (
                      <div className="relative mt-2">
                        {documentForm.document?.type.startsWith('image/') ? (
                          <img src={documentPreview} alt="Document preview" className="max-w-full h-auto max-h-48 rounded border" />
                        ) : (
                          <div className="flex items-center gap-2 p-3 bg-gray-100 rounded border">
                            <FileText className="h-8 w-8 text-gray-400" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{documentForm.document?.name}</p>
                              <p className="text-xs text-muted-foreground">PDF Document</p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setDocumentPreview(profile?.document_url || null);
                                setDocumentForm(prev => ({ ...prev, document: null }));
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                    {!documentPreview && profile?.document_url && (
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded border">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Current document: {getDocumentTypeLabel(profile.document_type)}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(profile.document_url || '', '_blank')}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Upload a valid government-issued document (PDF, JPEG, or PNG). Max size: 5MB
                    </p>
                  </div>
                </div>

                {(documentForm.document || (documentForm.documentType && documentForm.documentType !== profile?.document_type)) && (
                  <Button
                    onClick={updateDocument}
                    disabled={isUploadingDocument || !documentForm.documentType}
                    className="w-full"
                  >
                    {isUploadingDocument ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {documentForm.document ? 'Uploading...' : 'Updating...'}
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        {profile?.document_url ? 'Update Government ID' : 'Upload Government ID'}
                      </>
                    )}
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{getDocumentTypeLabel(profile?.document_type)}</p>
                      <p className="text-xs text-muted-foreground">
                        {profile?.document_verification_status === 'approved' && 'Verified'}
                        {profile?.document_verification_status === 'rejected' && 'Rejected - Please update'}
                        {!profile?.document_verification_status && 'Not submitted'}
                      </p>
                    </div>
                  </div>
                  {profile?.document_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(profile.document_url || '', '_blank')}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Document
                    </Button>
                  )}
                </div>
                {!profile?.document_url && (
                  <p className="text-sm text-muted-foreground">
                    No government ID uploaded. Click "Edit" to upload your document.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="mt-6">
            <Label htmlFor="bio">Bio</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                placeholder="Tell us about yourself, your experience, and what you're looking for..."
                className="mt-1"
                rows={4}
              />
            ) : (
              <div className="mt-1">
                <p className="text-sm text-muted-foreground">
                  {profile?.bio || 'No bio provided. Tell us about yourself!'}
                </p>
              </div>
            )}
          </div>

          {isEditing && (
            <div className="flex gap-2 mt-6">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={onEditToggle}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bank Account Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BankAccountForm />
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="mt-1"
            />
          </div>

          <Button 
            onClick={changePassword} 
            disabled={isSaving || !passwordForm.newPassword || !passwordForm.confirmPassword}
            className="w-full"
          >
            <Key className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
            <p className="text-sm text-red-600 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button 
              variant="destructive" 
              onClick={deleteAccount}
              disabled={isSaving}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedUserProfile;
