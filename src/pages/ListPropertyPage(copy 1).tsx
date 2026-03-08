import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import MediaUploader from "@/components/media/MediaUploader";
import { FileArrangementManager } from '@/components/media/FileArrangementManager';
import PropertyAvailabilityCalendar from '@/components/PropertyAvailabilityCalendar';
import { locationTypes, neighborhoodOptions, amenitiesList } from "@/data/propertyConstants";

// Currency mapping based on country
const getCurrencyForCountry = (country: string) => {
  switch (country) {
    case 'Nigeria':
      return { symbol: '₦', code: 'NGN', name: 'Naira' };
    case 'United States':
      return { symbol: '$', code: 'USD', name: 'US Dollar' };
    case 'United Kingdom':
      return { symbol: '£', code: 'GBP', name: 'British Pound' };
    case 'Canada':
      return { symbol: 'C$', code: 'CAD', name: 'Canadian Dollar' };
    default:
      return { symbol: '₦', code: 'NGN', name: 'Naira' }; // Default to Naira
  }
};

// Define form schema with zod
const propertySchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  type: z.string({ required_error: "Please select a property type" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 words" }),
  price: z.coerce.number().min(1, { message: "Price is required" }),
  amenities: z.array(z.string()).min(1, { message: "Please select at least one amenity" }),
  rules: z.string().optional(),
  availability: z.string().optional(),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

const ListPropertyPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedMediaUrls, setUploadedMediaUrls] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{ country: string; state: string; city: string; neighborhood: string; address: string }>({
    country: '',
    state: '',
    city: '',
    neighborhood: '',
    address: ''
  });
  const [descriptionWordCount, setDescriptionWordCount] = useState(0);
  const [propertyAvailability, setPropertyAvailability] = useState<any[]>([]);
  const [currentCurrency, setCurrentCurrency] = useState(getCurrencyForCountry(''));
  const { user } = useAuth();

  // Redirect to auth if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/auth?tab=signup&listing=true');
    }
  }, [user, navigate]);

  // Update currency when country changes
  React.useEffect(() => {
    setCurrentCurrency(getCurrencyForCountry(selectedLocation.country));
  }, [selectedLocation.country]);

  // Show loading if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Redirecting to sign up...</h2>
          <p className="text-muted-foreground">Please sign up to list your property</p>
        </div>
      </div>
    );
  }
  
  // Initialize form with react-hook-form and zod
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      type: "",
      address: "",
      description: "",
      price: undefined,
      amenities: [],
      rules: "",
      availability: "",
    },
  });
  
  React.useEffect(() => {
    if (!user) {
      navigate('/auth?listing=true');
    }
  }, [user, navigate]);

  // Initialize word count
  React.useEffect(() => {
    const description = form.getValues('description');
    setDescriptionWordCount(countWords(description));
  }, [form]);
  
  if (!user) {
    return null;
  }

  const handleMediaUpload = (urls: string[]) => {
    console.log('=== MEDIA UPLOAD CALLBACK ===');
    console.log('URLs received:', urls);
    console.log('URLs length:', urls.length);
    
    setUploadedMediaUrls(urls);
    console.log('Media upload callback completed');
  };

  const handleFilesUpdate = (files: any[]) => {
    console.log('=== FILES UPDATE CALLBACK ===');
    console.log('Files received:', files);
    console.log('Files length:', files.length);
    
    // Convert MediaFile objects to our format
    const convertedFiles = files.map((file, index) => ({
      id: file.id,
      url: file.url || file.preview,
      name: file.file?.name || `File ${index + 1}`,
      type: file.type || 'image',
      size: file.file?.size || 1024000,
      isPrimary: index === 0
    }));
    
    console.log('Converted files:', convertedFiles);
    setUploadedFiles(convertedFiles);
    setUploadedMediaUrls(convertedFiles.map(f => f.url));
    console.log('Files update callback completed');
  };

  const handleFilesArrangement = (files: any[]) => {
    // Automatically set the first file as primary
    const updatedFiles = files.map((file, index) => ({
      ...file,
      isPrimary: index === 0
    }));
    setUploadedFiles(updatedFiles);
    setUploadedMediaUrls(updatedFiles.map(f => f.url));
  };

  const handleSetPrimary = (fileId: string) => {
    const updatedFiles = uploadedFiles.map(file => ({
      ...file,
      isPrimary: file.id === fileId
    }));
    setUploadedFiles(updatedFiles);
    setUploadedMediaUrls(updatedFiles.map(f => f.url));
    toast.success('Primary image updated!');
  };

  const handleRemoveFile = (fileId: string) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== fileId);
    setUploadedFiles(updatedFiles);
    setUploadedMediaUrls(updatedFiles.map(f => f.url));
    toast.success('File removed!');
  };

  // Helper function to count words
  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // Word limits
  const DESCRIPTION_WORD_LIMIT = 10;

  const onSubmit = async (values: PropertyFormValues) => {
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Form values:', values);
    console.log('Form validation state:', form.formState);
    console.log('Form errors:', form.formState.errors);
    console.log('Uploaded files:', uploadedFiles);
    console.log('Uploaded files length:', uploadedFiles.length);
    console.log('Uploaded media URLs:', uploadedMediaUrls);
    console.log('Selected location:', selectedLocation);
    console.log('User:', user);
    console.log('User ID:', user?.id);
    console.log('User authenticated:', !!user);
    console.log('Current loading state:', isLoading);
    
    // Prevent double submission
    if (isLoading) {
      console.log('Already submitting, ignoring duplicate submission');
      return;
    }

    // Check if form is valid
    const isValid = await form.trigger();
    console.log('Form validation result:', isValid);
    if (!isValid) {
      console.log('Form validation failed, errors:', form.formState.errors);
      toast.error("Please fix the form errors before submitting");
      return;
    }
    
    if (!user) {
      console.log('ERROR: User not authenticated');
      toast.error("Please log in to list a property");
      return;
    }

    if (uploadedFiles.length === 0 && uploadedMediaUrls.length === 0) {
      console.log('ERROR: No files uploaded');
      console.log('Uploaded files array:', uploadedFiles);
      console.log('Uploaded media URLs:', uploadedMediaUrls);
      toast.error("Please upload at least one image or video of your property");
      return;
    }

    // Validate location selection
    if (!selectedLocation.country || !selectedLocation.state || !selectedLocation.city) {
      console.log('ERROR: Incomplete location selection');
      toast.error("Please select a complete location (country, state, and city)");
      return;
    }

    console.log('All validations passed, starting submission...');
    setIsLoading(true);
    
    // Add a small delay to ensure file uploads are complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log('TIMEOUT: Form submission taking too long, resetting loading state');
      setIsLoading(false);
      toast.error('Submission is taking longer than expected. Please try again.');
    }, 30000); // 30 second timeout

    try {
      console.log('Starting property insertion...');
      // Save to Supabase
      const { data: property, error } = await supabase
        .from('properties')
        .insert({
          title: values.title,
          property_type: values.type,
          address: values.address,
          description: values.description,
          price: values.price,
          price_type: 'daily',
          country: selectedLocation.country,
          state: selectedLocation.state,
          city: selectedLocation.city,
          neighborhood: selectedLocation.neighborhood,
          max_guests: 10, // Default value since we removed it from form
          owner_id: user?.id,
          is_verified: false,
          is_published: true,
          is_featured: false,
          zip_code: null
        })
        .select()
        .single();

      console.log('Property insertion result:', { property, error });

      if (error) {
        console.error('Property insertion error:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw new Error(`Database error: ${error.message}`);
      }

      // Save property amenities
      if (values.amenities && values.amenities.length > 0) {
        const amenityInserts = values.amenities.map((amenity) => ({
          property_id: property.id,
          amenity_id: amenity
        }));

        const { error: amenityError } = await supabase
          .from('property_amenities')
          .insert(amenityInserts);

        if (amenityError) {
          console.error('Error saving amenities:', amenityError);
        }
      }

      // Save property images
      if (uploadedFiles.length > 0) {
        const imageInserts = uploadedFiles.map((file) => ({
          property_id: property.id,
          url: file.url,
          is_primary: file.isPrimary || false
        }));

        const { error: imageError } = await supabase
          .from('property_images')
          .insert(imageInserts);

        if (imageError) {
          console.error('Error saving images:', imageError);
        }
      } else if (uploadedMediaUrls.length > 0) {
        // Fallback to uploadedMediaUrls if uploadedFiles is empty
        const imageInserts = uploadedMediaUrls.map((url, index) => ({
          property_id: property.id,
          url: url,
          is_primary: index === 0
        }));

        const { error: imageError } = await supabase
          .from('property_images')
          .insert(imageInserts);

        if (imageError) {
          console.error('Error saving images:', imageError);
        }
      }

      console.log('=== PROPERTY LISTED SUCCESSFULLY ===');
      clearTimeout(timeoutId);
      toast.success("Property listed successfully!");
      console.log('Navigating to profile dashboard...');
      navigate('/profile?tab=dashboard');
    } catch (error: any) {
      console.error('=== ERROR LISTING PROPERTY ===');
      console.error('Error details:', error);
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      clearTimeout(timeoutId);
      toast.error(error.message || 'Failed to list property. Please try again.');
    } finally {
      console.log('Setting loading to false...');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>List Your Property | Film Loca</title>
        <meta name="description" content="List your property on Film Loca and earn by renting it out for film productions." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl font-bold mb-2">List Your Property</h1>
            <p className="text-muted-foreground mb-8">
              Share your space with the film community and earn money by hosting productions
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Basic Information</h2>
                  
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a descriptive title for your property" {...field} />
                        </FormControl>
                        <FormDescription>
                          Choose a title that highlights what makes your property special for filming
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Location Selection */}
                  <div className="space-y-2">
                    <FormLabel>Location *</FormLabel>
                    <div className="p-4 border rounded-lg bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Country</label>
                          <select 
                            className="w-full p-2 border rounded"
                            value={selectedLocation.country}
                            onChange={(e) => setSelectedLocation({...selectedLocation, country: e.target.value})}
                            aria-label="Select Country"
                          >
                            <option value="">Select Country</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Canada">Canada</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">State/Province</label>
                          <select 
                            className="w-full p-2 border rounded"
                            value={selectedLocation.state}
                            onChange={(e) => setSelectedLocation({...selectedLocation, state: e.target.value})}
                            disabled={!selectedLocation.country}
                            aria-label="Select State"
                          >
                            <option value="">Select State</option>
                            {selectedLocation.country === 'Nigeria' && (
                              <>
                                <option value="Lagos State">Lagos State</option>
                                <option value="Abuja">Abuja</option>
                                <option value="Delta">Delta</option>
                                <option value="Oyo">Oyo</option>
                                <option value="Enugu">Enugu</option>
                              </>
                            )}
                            {selectedLocation.country === 'United States' && (
                              <>
                                <option value="California">California</option>
                                <option value="New York">New York</option>
                                <option value="Texas">Texas</option>
                              </>
                            )}
                            {selectedLocation.country === 'United Kingdom' && (
                              <>
                                <option value="England">England</option>
                                <option value="Scotland">Scotland</option>
                                <option value="Wales">Wales</option>
                              </>
                            )}
                            {selectedLocation.country === 'Canada' && (
                              <>
                                <option value="Ontario">Ontario</option>
                                <option value="British Columbia">British Columbia</option>
                                <option value="Quebec">Quebec</option>
                              </>
                            )}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">City</label>
                          <select 
                            className="w-full p-2 border rounded"
                            value={selectedLocation.city || ''}
                            onChange={(e) => setSelectedLocation({...selectedLocation, city: e.target.value})}
                            disabled={!selectedLocation.state}
                            aria-label="Select City"
                          >
                            <option value="">Select City</option>
                            {selectedLocation.state === 'Lagos State' && (
                              <>
                                <option value="Lagos Island">Lagos Island</option>
                                <option value="Victoria Island">Victoria Island</option>
                                <option value="Ikoyi">Ikoyi</option>
                                <option value="Lekki">Lekki</option>
                                <option value="Chevron">Chevron</option>
                                <option value="VGC">VGC</option>
                                <option value="Ajah">Ajah</option>
                                <option value="Ibeju-Lekki">Ibeju-Lekki</option>
                                <option value="Ikeja">Ikeja</option>
                                <option value="Yaba">Yaba</option>
                                <option value="Surulere">Surulere</option>
                                <option value="Apapa">Apapa</option>
                                <option value="Mushin">Mushin</option>
                              </>
                            )}
                            {selectedLocation.state === 'Delta' && (
                              <>
                                <option value="Asaba">Asaba</option>
                              </>
                            )}
                            {selectedLocation.state === 'Oyo' && (
                              <>
                                <option value="Ibadan">Ibadan</option>
                              </>
                            )}
                            {selectedLocation.state === 'Enugu' && (
                              <>
                                <option value="Enugu">Enugu</option>
                                <option value="Nsukka">Nsukka</option>
                                <option value="Oji River">Oji River</option>
                                <option value="Udi">Udi</option>
                                <option value="Ezeagu">Ezeagu</option>
                                <option value="Amechi">Amechi</option>
                                <option value="Amaechi Idodo">Amaechi Idodo</option>
                              </>
                            )}
                            {selectedLocation.state === 'Abuja' && (
                              <>
                                <option value="Garki">Garki</option>
                                <option value="Wuse">Wuse</option>
                                <option value="Asokoro">Asokoro</option>
                                <option value="Maitama">Maitama</option>
                                <option value="Utako">Utako</option>
                                <option value="Jabi">Jabi</option>
                                <option value="Gwarinpa">Gwarinpa</option>
                                <option value="Kubwa">Kubwa</option>
                                <option value="Nyanya">Nyanya</option>
                              </>
                            )}
                            {selectedLocation.country === 'United States' && (
                              <>
                                <option value="Los Angeles">Los Angeles</option>
                                <option value="San Francisco">San Francisco</option>
                                <option value="San Diego">San Diego</option>
                                <option value="New York City">New York City</option>
                                <option value="Buffalo">Buffalo</option>
                                <option value="Rochester">Rochester</option>
                                <option value="Houston">Houston</option>
                                <option value="Dallas">Dallas</option>
                                <option value="Austin">Austin</option>
                              </>
                            )}
                            {selectedLocation.country === 'United Kingdom' && (
                              <>
                                <option value="London">London</option>
                                <option value="Manchester">Manchester</option>
                                <option value="Birmingham">Birmingham</option>
                                <option value="Liverpool">Liverpool</option>
                                <option value="Leeds">Leeds</option>
                                <option value="Sheffield">Sheffield</option>
                                <option value="Edinburgh">Edinburgh</option>
                                <option value="Glasgow">Glasgow</option>
                                <option value="Aberdeen">Aberdeen</option>
                                <option value="Dundee">Dundee</option>
                                <option value="Stirling">Stirling</option>
                                <option value="Inverness">Inverness</option>
                                <option value="Cardiff">Cardiff</option>
                                <option value="Swansea">Swansea</option>
                                <option value="Newport">Newport</option>
                                <option value="Wrexham">Wrexham</option>
                                <option value="Barry">Barry</option>
                                <option value="Caerphilly">Caerphilly</option>
                              </>
                            )}
                            {selectedLocation.country === 'Canada' && (
                              <>
                                <option value="Toronto">Toronto</option>
                                <option value="Ottawa">Ottawa</option>
                                <option value="Hamilton">Hamilton</option>
                                <option value="London">London</option>
                                <option value="Kitchener">Kitchener</option>
                                <option value="Windsor">Windsor</option>
                                <option value="Vancouver">Vancouver</option>
                                <option value="Victoria">Victoria</option>
                                <option value="Surrey">Surrey</option>
                                <option value="Burnaby">Burnaby</option>
                                <option value="Richmond">Richmond</option>
                                <option value="Abbotsford">Abbotsford</option>
                                <option value="Montreal">Montreal</option>
                                <option value="Quebec City">Quebec City</option>
                                <option value="Laval">Laval</option>
                                <option value="Gatineau">Gatineau</option>
                                <option value="Longueuil">Longueuil</option>
                                <option value="Sherbrooke">Sherbrooke</option>
                              </>
                            )}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Neighborhood (Optional)</label>
                          <input 
                            type="text" 
                            placeholder="Enter neighborhood" 
                            className="w-full p-2 border rounded"
                            value={selectedLocation.neighborhood || ''}
                            onChange={(e) => setSelectedLocation({...selectedLocation, neighborhood: e.target.value})}
                            disabled={!selectedLocation.city}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Type *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value || ""}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select property type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {locationTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price per Day ({currentCurrency.name}) *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder={`Enter price per day (${currentCurrency.symbol})`}
                              value={field.value || ""}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detailed Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter the detailed address (street, building, etc.)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your property, its features, and why it's great for filming"
                            className="min-h-[100px]"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setDescriptionWordCount(countWords(e.target.value));
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Minimum 10 words
                        </FormDescription>
                        <span className={`text-sm ${
                          descriptionWordCount < DESCRIPTION_WORD_LIMIT 
                            ? 'text-orange-500' 
                            : 'text-green-600'
                        }`}>
                          {descriptionWordCount}/10
                        </span>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Property Media */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Property Media</h2>
                  <MediaUploader 
                    onUploadComplete={handleMediaUpload}
                    onFilesUpdate={handleFilesUpdate}
                    acceptedTypes={['image/*', 'video/*']}
                    bucket="property-media"
                    mockMode={true}
                  />
                  
                  {/* File Arrangement Manager */}
                  {uploadedFiles.length > 0 && (
                    <FileArrangementManager
                      files={uploadedFiles}
                      onFilesUpdate={handleFilesArrangement}
                      onSetPrimary={handleSetPrimary}
                      onRemoveFile={handleRemoveFile}
                    />
                  )}
                </div>

                {/* Amenities */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Amenities</h2>
                  <FormField
                    control={form.control}
                    name="amenities"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {amenitiesList.map((amenity) => (
                            <div
                              key={amenity.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(amenity.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, amenity.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== amenity.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {amenity.label}
                              </FormLabel>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Property Availability Calendar */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Property Availability</h2>
                  <PropertyAvailabilityCalendar
                    onAvailabilityChange={setPropertyAvailability}
                    initialAvailability={propertyAvailability}
                  />
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Additional Information</h2>
                  
                  <FormField
                    control={form.control}
                    name="rules"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Rules</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any specific rules or guidelines for using your property"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? 'Listing Property...' : 'List Property'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/profile?tab=dashboard')}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ListPropertyPage;