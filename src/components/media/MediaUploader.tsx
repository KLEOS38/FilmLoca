
import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { X, Upload, Image, Video, FileText } from "lucide-react";
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video' | 'document';
  uploadProgress: number;
  uploaded: boolean;
  url?: string;
  storagePath?: string;
  isCover?: boolean;
}

interface MediaUploaderProps {
  onUploadComplete?: (urls: string[]) => void;
  onFilesUpdate?: (files: MediaFile[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
  bucket?: string;
  mockMode?: boolean; // Add mock mode for testing
  pathPrefix?: string; // Optional folder prefix, e.g., owners/{userId} or properties/{id}
  enableCoverSelect?: boolean; // Allow marking a file as cover
}

const DEFAULT_MEDIA_BUCKET = import.meta.env.VITE_PROPERTY_MEDIA_BUCKET || 'property-media';

const MediaUploader = ({ 
  onUploadComplete, 
  onFilesUpdate,
  maxFiles = 999, // Remove file limit restrictions
  acceptedTypes = ['image/*', 'video/*'],
  bucket = DEFAULT_MEDIA_BUCKET,
  mockMode = true, // Enable mock mode by default for testing
  pathPrefix = '',
  enableCoverSelect = true
}: MediaUploaderProps) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const getFileType = (file: File): 'image' | 'video' | 'document' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    return 'document';
  };

  const createPreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const url = URL.createObjectURL(file);
        resolve(url);
      } else {
        resolve('');
      }
    });
  };

  const uploadFiles = useCallback(async (filesToUpload?: MediaFile[]) => {
    // Always use the provided filesToUpload, or get current files from state
    let currentFiles = filesToUpload;
    if (!currentFiles) {
      // If no files provided, we need to get them from state
      // Use a ref or get them synchronously - but we can't do that easily
      // So we'll require filesToUpload to be provided
      console.warn('uploadFiles called without filesToUpload - this should not happen');
      return;
    }
    
    console.log('uploadFiles called with files:', currentFiles.length);
    if (currentFiles.length === 0) {
      console.log('No files to upload');
      return;
    }

    // Filter to only upload files that haven't been uploaded yet
    const filesNeedingUpload = currentFiles.filter(f => !f.uploaded || !f.url);
    if (filesNeedingUpload.length === 0) {
      console.log('All files already uploaded');
      // Still notify parent of current state
      if (onFilesUpdate) {
        onFilesUpdate(currentFiles);
      }
      return;
    }
    
    console.log('Files needing upload:', filesNeedingUpload.length, 'out of', currentFiles.length);
    setIsUploading(true);
    const uploadedUrls: string[] = [];
    // Make a mutable copy we can keep in sync with final URLs
    const updatedFiles: MediaFile[] = currentFiles.map(f => ({ ...f }));

    try {
      console.log('Starting upload process...');
      // Quick bucket access precheck (skip in mock mode)
      if (!mockMode) {
        console.log('🔍 Precheck: Testing bucket access for:', bucket);
        try {
          const precheck = await supabase.storage.from(bucket).list('', { limit: 1 });
          const err = (precheck as { error?: { message?: string; statusCode?: number } })?.error;
          if (err) {
            console.error('❌ Storage bucket access failed:', err);
            console.error('Error details:', {
              message: err.message,
              statusCode: (err as { statusCode?: number }).statusCode,
              error: err,
              bucket
            });
            setIsUploading(false);
            
            // Provide specific error messages with solutions
            if ((err as { statusCode?: number }).statusCode === 404 || err.message?.includes('not found')) {
              toast.error(
                `Storage bucket "${bucket}" not found. Please run FIX_STORAGE_BUCKET_ACCESS.sql in Supabase SQL Editor.`,
                { duration: 10000 }
              );
            } else if (err.message?.includes('permission denied') || err.message?.includes('row-level security')) {
              toast.error(
                `Storage permission denied. Please run FIX_STORAGE_BUCKET_ACCESS.sql in Supabase SQL Editor.`,
                { duration: 10000 }
              );
            } else {
              toast.error(
                `Cannot access storage bucket "${bucket}". Error: ${err.message || 'Unknown error'}. Please run FIX_STORAGE_BUCKET_ACCESS.sql in Supabase SQL Editor.`,
                { duration: 10000 }
              );
            }
            
            // Still notify parent of current state
            if (onFilesUpdate) {
              onFilesUpdate(currentFiles);
            }
            return;
          } else {
            console.log('✅ Precheck passed: Bucket is accessible');
          }
        } catch (precheckError) {
          console.error('❌ Storage bucket precheck exception:', precheckError);
          setIsUploading(false);
          toast.error(
            `Failed to access storage bucket "${bucket}". Please run FIX_STORAGE_BUCKET_ACCESS.sql in Supabase SQL Editor.`,
            { duration: 10000 }
          );
          if (onFilesUpdate) {
            onFilesUpdate(currentFiles);
          }
          return;
        }
      } else {
        console.log('🧪 Mock mode: Skipping bucket precheck');
      }
      
      for (const mediaFile of filesNeedingUpload) {
        console.log('🔄 Processing file:', mediaFile.id, mediaFile.file?.name, 'uploaded:', mediaFile.uploaded, 'mockMode:', mockMode);
        if (mediaFile.uploaded && mediaFile.url) {
          console.log('✅ File already uploaded, using existing URL:', mediaFile.url);
          uploadedUrls.push(mediaFile.url!);
          continue;
        }

        if (!mediaFile.file) {
          console.warn('⚠️ File object missing for:', mediaFile.id);
          continue;
        }

        // Update progress
        setFiles(prev => prev.map(f => 
          f.id === mediaFile.id ? { ...f, uploadProgress: 50 } : f
        ));

        let fileUrl: string;
        let storagePath: string | undefined;

        if (mockMode) {
          console.log('🧪 Mock mode: Using preview URL instead of uploading');
          // Mock mode: use the preview URL as the uploaded URL
          fileUrl = mediaFile.preview;
          
          // Simulate upload delay
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          // Real mode: validate and upload to Supabase
          console.log('⬆️ Real mode: Starting upload to Supabase...');
          const originalFile = mediaFile.file;
          const type = getFileType(originalFile);

          // Basic validation
          const maxImageMB = 10; // 10MB
          const maxVideoMB = 200; // 200MB
          const isValidType = ['image/', 'video/'].some((p) => originalFile.type.startsWith(p));
          if (!isValidType) {
            console.error('❌ Unsupported file type:', originalFile.type);
            toast.error(`Unsupported file type: ${originalFile.type}`);
            continue;
          }
          if (type === 'image' && originalFile.size > maxImageMB * 1024 * 1024) {
            console.log('📦 Compressing large image...');
            toast.info(`Compressing large image (${(originalFile.size/1024/1024).toFixed(1)}MB)...`);
          }
          if (type === 'video' && originalFile.size > maxVideoMB * 1024 * 1024) {
            console.error('❌ Video too large:', originalFile.size);
            toast.error(`Video exceeds ${maxVideoMB}MB limit: ${(originalFile.size/1024/1024).toFixed(1)}MB`);
            continue;
          }

          // Compress image if needed
          const uploadFile = (type === 'image')
            ? await compressImageSafely(originalFile)
            : originalFile;

          const fileExt = uploadFile.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
          const folder = pathPrefix ? `${pathPrefix.replace(/\/$/, '')}/` : '';
          const filePath = `${folder}${fileName}`;
          storagePath = filePath;

          console.log('⬆️ Uploading to:', {
            bucket,
            filePath,
            fileName,
            pathPrefix,
            fileSize: uploadFile.size,
            fileType: uploadFile.type
          });

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, uploadFile, { 
            contentType: uploadFile.type,
            upsert: false // Don't overwrite existing files
          });

        if (uploadError) {
          console.error('❌ Storage upload error:', uploadError);
          console.error('Error details:', {
            message: uploadError.message,
            statusCode: uploadError.statusCode,
            error: uploadError.error
          });
          
          // Provide specific error messages
          if (uploadError.message?.includes('permission denied') || uploadError.message?.includes('new row violates row-level security')) {
            const currentUser = await supabase.auth.getUser();
            const userId = currentUser.data.user?.id;
            console.error('🚨 STORAGE RLS POLICY ERROR');
            console.error('   File path attempted:', filePath);
            console.error('   Expected path pattern: owners/' + userId + '/filename');
            console.error('   Bucket:', bucket);
            console.error('   User ID from auth:', userId);
            console.error('   Path prefix used:', pathPrefix);
            console.error('   Full error:', uploadError);
            console.error('   Error message:', uploadError.message);
            console.error('   Error status:', uploadError.statusCode);
            
            // Show detailed error in toast
            toast.error(
              `Storage permission denied. Path: ${filePath}, User: ${userId?.substring(0, 8)}... Check console for details.`,
              { duration: 15000 }
            );
          } else if (uploadError.message?.includes('Bucket not found')) {
            toast.error(`Storage bucket "${bucket}" not found. Run COMPREHENSIVE_RLS_FIX.sql to create it.`);
            console.error('🚨 STORAGE BUCKET NOT FOUND');
            console.error('   Solution: Run COMPREHENSIVE_RLS_FIX.sql in Supabase SQL Editor');
          } else {
            toast.error(`Failed to upload ${mediaFile.file?.name}: ${uploadError.message || 'Unknown error'}`);
          }
          throw uploadError;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        fileUrl = publicUrl;
        console.log('✅ File uploaded successfully:', mediaFile.file?.name, 'URL:', fileUrl);
        }

        uploadedUrls.push(fileUrl);

        // Update file in our local updatedFiles array
        const idx = updatedFiles.findIndex(f => f.id === mediaFile.id);
        if (idx !== -1) {
          updatedFiles[idx] = { 
            ...updatedFiles[idx], 
            uploadProgress: 100, 
            uploaded: true, 
            url: fileUrl, 
            storagePath 
          };
        }
        
        // Update file in state immediately
        setFiles(prev => {
          const updated = prev.map(f => 
            f.id === mediaFile.id ? { 
              ...f, 
              uploadProgress: 100, 
              uploaded: true, 
              url: fileUrl,
              storagePath
            } : f
          );
          console.log('✅ Updated file in state:', mediaFile.id, 'URL:', fileUrl);
          return updated;
        });
      }

      // After all uploads complete, update state and notify parent
      setFiles(prevFiles => {
        // Create a map of all files (from prevFiles and currentFiles) with uploaded data merged
        const allFilesMap = new Map<string, MediaFile>();
        
        // First, add all files from currentFiles (the source of truth)
        currentFiles.forEach(f => {
          allFilesMap.set(f.id, { ...f });
        });
        
        // Then, update with uploaded data from updatedFiles
        updatedFiles.forEach(uploaded => {
          if (allFilesMap.has(uploaded.id)) {
            allFilesMap.set(uploaded.id, uploaded);
          } else {
            allFilesMap.set(uploaded.id, uploaded);
          }
        });
        
        // Also include any files from prevFiles that might not be in currentFiles
        prevFiles.forEach(f => {
          if (!allFilesMap.has(f.id)) {
            allFilesMap.set(f.id, f);
          } else {
            // Update with uploaded data if available
            const uploaded = updatedFiles.find(uf => uf.id === f.id);
            if (uploaded) {
              allFilesMap.set(f.id, uploaded);
            }
          }
        });
        
        const allFinalFiles = Array.from(allFilesMap.values());
        
        // Call the callback with all uploaded URLs (only newly uploaded ones)
        const newlyUploadedUrls = uploadedUrls.filter(url => {
          // Check if this URL is from a newly uploaded file
          return filesNeedingUpload.some(f => f.url === url || !f.uploaded);
        });
        
        console.log('✅ Upload completed. New URLs:', newlyUploadedUrls.length, 'Total files:', allFinalFiles.length);
        
        // Notify parent with ALL files (existing + newly uploaded)
        if (onFilesUpdate) {
          console.log('📤 Calling onFilesUpdate with all files:', allFinalFiles.length);
          onFilesUpdate(allFinalFiles);
        }
        
        if (onUploadComplete && newlyUploadedUrls.length > 0) {
          console.log('📤 Calling onUploadComplete with new URLs:', newlyUploadedUrls.length);
          onUploadComplete(newlyUploadedUrls);
        }

        if (newlyUploadedUrls.length > 0) {
          toast.success(`${newlyUploadedUrls.length} file${newlyUploadedUrls.length > 1 ? 's' : ''} uploaded successfully!`);
        }
        
        return allFinalFiles;
      });
    } catch (error) {
      console.error('❌ Upload error:', error);
      const errorMessage = (error as { message?: string })?.message || 'Unknown error';
      console.error('❌ Upload error details:', {
        message: errorMessage,
        error: error,
        filesAttempted: filesNeedingUpload.length,
        mockMode
      });
      
      // Show detailed error message
      toast.error(`Upload failed: ${errorMessage}. Check console for details.`, { duration: 10000 });
      
      // Reset upload progress for failed files
      setFiles(prevFiles => {
        const updated = prevFiles.map(f => {
          if (filesNeedingUpload.some(uf => uf.id === f.id)) {
            return { ...f, uploadProgress: 0, uploaded: false };
          }
          return f;
        });
        
        // Still notify parent of current state even on error
        if (onFilesUpdate) {
          onFilesUpdate(updated);
        }
        return updated;
      });
    } finally {
      console.log('✅ Upload process finished. isUploading set to false.');
      setIsUploading(false);
    }
  }, [mockMode, bucket, onUploadComplete, onFilesUpdate, pathPrefix]);

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    
    if (selectedFiles.length === 0) return;
    
    // Clear the input so the same file can be selected again
    event.target.value = '';
    
    console.log('Files selected:', selectedFiles.length);
    console.log('Current files count:', files.length);
    
    // No file count restrictions - users can add as many files as they want
    const newFiles: MediaFile[] = [];
    
    for (const file of selectedFiles) {
      // Validate type and size quickly before preview
      const type = getFileType(file);
      const allowed = ['image', 'video', 'document'];
      if (!allowed.includes(type)) {
        toast.error(`Unsupported file: ${file.name}`);
        continue;
      }

      const maxMB = type === 'image' ? 20 : type === 'video' ? 500 : 50;
      if (file.size > maxMB * 1024 * 1024) {
        toast.error(`${file.name} exceeds ${maxMB}MB limit`);
        continue;
      }

      console.log('Processing file:', file.name, file.type, file.size);

      const preview = await createPreview(file);
      const mediaFile: MediaFile = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // More unique ID
        file,
        preview,
        type: getFileType(file),
        uploadProgress: 0,
        uploaded: false,
        isCover: false,
      };
      
      newFiles.push(mediaFile);
    }

    if (newFiles.length === 0) {
      console.log('No valid files to add');
      return;
    }

    console.log('New files created:', newFiles.length);
    
    // ADD to existing files instead of replacing them
    setFiles(prevFiles => {
      const allFiles = [...prevFiles, ...newFiles];
      console.log('Total files after update:', allFiles.length);
      console.log('Previous files:', prevFiles.length, 'New files:', newFiles.length);
      
      // Immediately notify parent of new files (even before upload)
      if (onFilesUpdate) {
        onFilesUpdate(allFiles);
      }
      
      // Auto-upload the new files
      // Use requestAnimationFrame to ensure state is updated before upload
      requestAnimationFrame(() => {
        setTimeout(() => {
          console.log('Starting auto-upload for new files...');
          uploadFiles(allFiles);
        }, 100);
      });
      
      return allFiles;
    });
  }, [uploadFiles, onFilesUpdate]);

  const removeFile = async (id: string) => {
    let fileToRemove: MediaFile | undefined;
    let updatedFiles: MediaFile[] = [];
    
    setFiles(prev => {
      fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      updatedFiles = prev.filter(f => f.id !== id);
      return updatedFiles;
    });

    // Immediately notify parent of file removal
    if (onFilesUpdate) {
      console.log('📤 Notifying parent of file removal. Remaining files:', updatedFiles.length);
      onFilesUpdate(updatedFiles);
    }

    // If uploaded and we know storage path, delete the object from storage
    try {
      if (!mockMode && fileToRemove?.uploaded && fileToRemove.storagePath) {
        const { error } = await supabase.storage.from(bucket).remove([fileToRemove.storagePath]);
        if (error) {
          console.error('Failed to delete from storage:', error);
          toast.error('Failed to delete file from storage');
        } else {
          console.log('✅ File deleted from storage:', fileToRemove.storagePath);
        }
      }
    } catch (e) {
      console.error('Error deleting file from storage:', e);
    }
  };

  const setAsCover = (id: string) => {
    setFiles(prev => {
      const updated = prev.map(f => ({ ...f, isCover: f.id === id }));
      // Immediately notify parent of cover change
      if (onFilesUpdate) {
        onFilesUpdate(updated);
      }
      return updated;
    });
  };


  const getFileIcon = (type: 'image' | 'video' | 'document') => {
    switch (type) {
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="media-upload" className="sr-only">Upload Media Files</Label>
            <input
              id="media-upload"
              type="file"
              multiple
              accept={acceptedTypes.join(',')}
              onChange={handleFileSelect}
              className="hidden"
              title="Upload Media Files"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('media-upload')?.click()}
              className="w-full h-12 border-2 border-gray-200 hover:border-red-500 focus:border-red-500 transition-colors cursor-pointer flex items-center justify-center text-center font-semibold"
            >
              Upload Media Files
            </Button>
            {isUploading && (
              <p className="text-xs text-blue-600 mt-1">
                ⬆️ Uploading files automatically...
              </p>
            )}
          </div>

          {files.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Selected Files</h4>
              <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
                {files.map((mediaFile) => (
                  <div key={mediaFile.id} className="flex items-center space-x-3 p-2 border rounded-lg">
                    <div className="flex-shrink-0">
                      {mediaFile.type === 'image' && (mediaFile.url || mediaFile.preview) ? (
                        <img 
                          src={mediaFile.url || mediaFile.preview} 
                          alt={mediaFile.file?.name || 'Image'}
                          className="w-12 h-12 object-cover rounded"
                          onError={(e) => {
                            // Fallback to preview if URL fails
                            if (mediaFile.preview && (e.target as HTMLImageElement).src !== mediaFile.preview) {
                              (e.target as HTMLImageElement).src = mediaFile.preview;
                            }
                          }}
                        />
                      ) : mediaFile.type === 'video' && (mediaFile.url || mediaFile.preview) ? (
                        <video 
                          src={mediaFile.url || mediaFile.preview}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                          {getFileIcon(mediaFile.type)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{mediaFile.file?.name || 'Unknown file'}</p>
                      {mediaFile.file && (
                      <p className="text-xs text-muted-foreground">
                        {(mediaFile.file.size / 1024 / 1024).toFixed(1)} MB
                      </p>
                      )}
                      
                      {mediaFile.uploadProgress > 0 && !mediaFile.uploaded && (
                        <Progress value={mediaFile.uploadProgress} className="mt-1 h-1" />
                      )}
                      
                      {mediaFile.uploaded && mediaFile.url && (
                        <p className="text-xs text-green-600 mt-1">✅ Uploaded</p>
                      )}
                      
                      {!mediaFile.uploaded && mediaFile.preview && (
                        <p className="text-xs text-blue-600 mt-1">⏳ Uploading...</p>
                      )}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(mediaFile.id)}
                      disabled={isUploading}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    {enableCoverSelect && (
                      <Button
                        variant={mediaFile.isCover ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setAsCover(mediaFile.id)}
                        disabled={isUploading}
                      >
                        {mediaFile.isCover ? 'Cover' : 'Set as cover'}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaUploader;

// Helpers
async function compressImageSafely(file: File): Promise<File> {
  try {
    if (!file.type.startsWith('image/')) return file;
    // Only compress if > 1MB
    const shouldCompress = file.size > 1 * 1024 * 1024;
    if (!shouldCompress) return file;

    const imageBitmap = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    const maxW = 1920;
    const scale = Math.min(1, maxW / imageBitmap.width);
    canvas.width = Math.floor(imageBitmap.width * scale);
    canvas.height = Math.floor(imageBitmap.height * scale);
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);
    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82));
    if (!blob) return file;
    return new File([blob], ensureExtension(file.name, 'jpg'), { type: 'image/jpeg' });
  } catch {
    return file; // fallback to original on any error
  }
}

function ensureExtension(name: string, ext: string): string {
  const idx = name.lastIndexOf('.');
  if (idx === -1) return `${name}.${ext}`;
  return `${name.slice(0, idx)}.${ext}`;
}
