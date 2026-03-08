import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, ChevronDown, Check, ChevronsUpDown } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import BedroomCounter from "@/components/ui/bedroom-counter";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Combobox } from "@/components/ui/combobox";
import { ScrollArea } from "@/components/ui/scroll-area";

// Custom Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MediaUploader from "@/components/media/MediaUploader";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { locationTypes, amenitiesList } from "@/data/propertyConstants";
import {
  getCountries,
  getStatesByCountry,
  getCitiesByState,
  getCurrencyForCountry,
} from "@/data/locations";
import { DatabaseIntegrityManager } from "@/utils/databaseIntegrity";
import {
  fixOfficeSpaceField,
  extractOfficeSpaceFromRules,
  addOfficeSpaceToRules,
} from "@/utils/fixOfficeSpace";

// Form Schema
const propertySchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  type: z.string().min(1, { message: "Property type is required" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .refine(
      (val) => {
        const words = val
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0);
        return words.length >= 10;
      },
      { message: "Description must be at least 10 words" },
    ),
  price: z.coerce.number().min(1, { message: "Price is required" }),
  damage_deposit: z.coerce
    .number()
    .min(0, { message: "Damage deposit must be 0 or greater" })
    .optional(),
  has_office_space: z.boolean().default(false),
  number_of_rooms: z.coerce
    .number()
    .int()
    .min(0, { message: "Number of rooms must be 0 or greater" })
    .default(0),
  amenities: z
    .array(z.string())
    .min(1, { message: "Please select at least one amenity" }),
  rules: z.string().optional(),
  documentType: z.string().optional(),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

type UploaderFileLike = {
  id: string;
  url?: string;
  preview?: string;
  file?: { name?: string; size?: number };
  type?: string;
  isCover?: boolean;
  storagePath?: string;
};

type UploadedFile = {
  id: string;
  url: string;
  name: string;
  type: string;
  size: number;
  isPrimary: boolean;
};

const ListPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [descriptionWordCount, setDescriptionWordCount] = useState(0);
  const [currentCurrency, setCurrentCurrency] = useState({
    code: "USD",
    symbol: "$",
    name: "US Dollar",
  });
  // Amenities fetched from DB (real UUIDs required for property_amenities FK)
  const [dbAmenities, setDbAmenities] = useState<
    Array<{ id: string; name: string }>
  >([]);

  // Fetch amenities from the database on mount
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const { data, error } = await supabase
          .from("amenities")
          .select("id, name")
          .order("name", { ascending: true });

        if (error) {
          console.error("Error fetching amenities from DB:", error);
          // Fallback: map amenitiesList slugs to name-only objects so UI still renders
          setDbAmenities(
            amenitiesList.map((a) => ({ id: a.id, name: a.name })),
          );
          return;
        }

        if (data && data.length > 0) {
          setDbAmenities(data);
        } else {
          // DB amenities table empty – fall back to static list
          setDbAmenities(
            amenitiesList.map((a) => ({ id: a.id, name: a.name })),
          );
        }
      } catch (err) {
        console.error("Exception fetching amenities:", err);
        setDbAmenities(amenitiesList.map((a) => ({ id: a.id, name: a.name })));
      }
    };

    fetchAmenities();
  }, []);

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [verificationDocument, setVerificationDocument] = useState<File | null>(
    null,
  );
  const [verificationDocumentUrl, setVerificationDocumentUrl] = useState<
    string | null
  >(null);
  const [isUploadingDocument, setIsUploadingDocument] = useState(false);

  // Location state - default to empty
  const [selectedLocation, setSelectedLocation] = useState({
    country: "",
    state: "",
    city: "",
    neighborhood: "",
  });

  // Custom property type state
  const [customPropertyType, setCustomPropertyType] = useState("");

  // Get available states and cities based on selected country/state
  const availableStates = selectedLocation.country
    ? getStatesByCountry(selectedLocation.country)
    : [];
  const availableCities =
    selectedLocation.country && selectedLocation.state
      ? getCitiesByState(selectedLocation.country, selectedLocation.state)
      : [];

  // Update currency when country changes
  useEffect(() => {
    if (selectedLocation.country) {
      const currency = getCurrencyForCountry(selectedLocation.country);
      setCurrentCurrency({
        code: currency.code,
        symbol: currency.symbol,
        name: currency.name || currency.code,
      });
    } else {
      setCurrentCurrency({
        code: "USD",
        symbol: "$",
        name: "US Dollar",
      });
    }
  }, [selectedLocation.country]);

  // Form setup
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      type: "",
      address: "",
      description: "",
      price: undefined,
      damage_deposit: undefined,
      has_office_space: false,
      number_of_rooms: 0,
      amenities: [],
      rules: "",
      documentType: undefined,
    },
  });

  // Debug form values
  const formValues = form.watch();
  useEffect(() => {
    console.log("Form values updated:", {
      description: formValues.description,
      amenities: formValues.amenities,
    });
  }, [formValues.description, formValues.amenities]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/auth?tab=signup&listing=true");
    }
  }, [user, navigate]);

  // Update currency when country changes
  useEffect(() => {
    setCurrentCurrency(getCurrencyForCountry(selectedLocation.country));
  }, [selectedLocation.country]);

  // Update word count when description changes using subscription
  useEffect(() => {
    const subscription = form.watch((value) => {
      const desc = (value?.description as string) || "";
      const words = desc
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
      setDescriptionWordCount(words.length);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Handle file updates from MediaUploader
  const handleFilesUpdate = useCallback((files: UploaderFileLike[]) => {
    console.log("🖼️ handleFilesUpdate called with files:", files.length);
    console.log(
      "Files details:",
      files.map((f) => ({
        id: f.id,
        url: f.url,
        preview: f.preview,
        uploaded: (f as any).uploaded,
        name: f.file?.name,
      })),
    );

    // Map incoming uploader files to our UploadedFile shape, honoring cover selection
    // IMPORTANT: Only use files that have been uploaded (have real URLs, not just previews)
    // In non-mockMode, f.url will be the Supabase Storage URL
    // In mockMode, f.url might be empty, so we use f.preview as fallback for testing
    let anyCover = false;
    const converted: UploadedFile[] = files
      .filter((f) => {
        // Only include files that have been uploaded (real URL from Supabase Storage)
        // Or if in mockMode, include files with preview URLs
        const hasUrl = f.url && f.url.startsWith("http"); // Real uploaded URL
        const hasPreview = f.preview && f.preview.startsWith("blob:"); // Local preview
        return hasUrl || hasPreview;
      })
      .map((f, idx) => {
        const isPrimary = f.isCover === true;
        if (isPrimary) anyCover = true;

        // Prefer real uploaded URL over preview
        const fileUrl =
          f.url && f.url.startsWith("http") ? f.url : f.preview || "";

        return {
          id: f.id,
          url: fileUrl,
          name: f.file?.name || `File ${idx + 1}`,
          type: f.type || "image",
          size: f.file?.size || 0,
          isPrimary,
        };
      });

    // Fallback: if no cover chosen, mark first as primary
    if (!anyCover && converted.length > 0) {
      converted[0].isPrimary = true;
    }

    console.log("✅ Converted files:", converted.length);
    console.log(
      "Converted files URLs:",
      converted.map((f) => f.url),
    );
    console.log(
      "URLs are real Supabase URLs:",
      converted.every(
        (f) => f.url.startsWith("http") && !f.url.startsWith("blob:"),
      ),
    );

    // Always update state, even if empty, to keep in sync
    setUploadedFiles(converted);
  }, []);

  // Count words helper
  const countWords = (text: string): number => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  // Form submission
  const onSubmit = async (values: PropertyFormValues) => {
    console.log("=== NEW LISTING SUBMISSION STARTED ===");
    console.log("✅ Form validation passed - onSubmit called");
    console.log("Form values:", values);
    console.log("Selected location:", selectedLocation);
    console.log("User:", user);
    console.log("User ID:", user?.id);
    console.log("Uploaded files:", uploadedFiles);
    console.log("Uploaded files count:", uploadedFiles.length);

    if (!user) {
      console.error("❌ User not authenticated");
      toast.error("Please log in to list a property");
      return;
    }

    if (!user.id) {
      console.error("❌ User ID is missing");
      toast.error("User authentication error. Please log in again.");
      return;
    }

    // Validate location
    if (
      !selectedLocation.country ||
      !selectedLocation.state ||
      !selectedLocation.city
    ) {
      console.error("❌ Location validation failed:", selectedLocation);
      toast.error(
        "Please select a complete location (country, state, and city)",
      );
      return;
    }

    // Validate description word count
    const wordCount = countWords(values.description);
    console.log("Description word count:", wordCount);
    if (wordCount < 10) {
      console.error("❌ Description word count too low:", wordCount);
      toast.error("Description must be at least 10 words");
      return;
    }

    // Validate media uploads
    if (uploadedFiles.length === 0) {
      console.error("❌ No files uploaded");
      toast.error("Please upload at least one image or video of your property");
      return;
    }

    // Validate that uploaded files have real Supabase Storage URLs (not just previews)
    const validUploadedFiles = uploadedFiles.filter((f) => {
      const hasRealUrl =
        f.url && f.url.startsWith("http") && !f.url.startsWith("blob:");
      if (!hasRealUrl) {
        console.warn("⚠️ File does not have real uploaded URL:", f.name, f.url);
      }
      return hasRealUrl;
    });

    if (validUploadedFiles.length === 0) {
      console.error("❌ No files with real uploaded URLs");
      toast.error(
        "Please wait for images to finish uploading before submitting",
      );
      return;
    }

    console.log(
      "✅ Valid uploaded files:",
      validUploadedFiles.length,
      "out of",
      uploadedFiles.length,
    );

    // Validate amenities
    if (!values.amenities || values.amenities.length === 0) {
      console.error("❌ No amenities selected");
      toast.error("Please select at least one amenity");
      return;
    }

    // Validate custom property type if "Other" is selected
    if (values.type === "other" && !customPropertyType.trim()) {
      console.error(
        '❌ Custom property type is required when "Other" is selected',
      );
      toast.error("Please specify the property type when selecting 'Other'");
      return;
    }

    setIsLoading(true);

    // Add aggressive timeout to prevent infinite loading
    // This is a safety net - the individual operations have their own timeouts
    const timeoutId = setTimeout(() => {
      console.error("⏱️ CRITICAL: Overall operation timeout after 20 seconds");
      console.error(
        "This should not happen if individual timeouts are working correctly",
      );
      setIsLoading(false);
      toast.error(
        "Operation timed out. Please check RLS policies and run RUN_THIS_RLS_FIX.sql in Supabase.",
      );
    }, 20000); // 20 second overall timeout (should not be needed)

    try {
      console.log("🔍 Checking authentication...");
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !authUser) {
        clearTimeout(timeoutId);
        console.error("❌ Authentication error:", authError);
        setIsLoading(false);
        toast.error("Authentication failed. Please log in again.");
        return;
      }

      console.log("✅ User authenticated:", authUser.id);
      console.log("📝 Inserting property into database...");
      // Determine the final property type
      const finalPropertyType =
        values.type === "other" && customPropertyType.trim()
          ? customPropertyType.trim()
          : values.type;

      // Prepare property data (match exact database schema)
      const propertyData = {
        title: values.title,
        property_type: finalPropertyType,
        address: values.address,
        description: values.description || "",
        price: values.price,
        price_type: "day",
        country: selectedLocation.country,
        state: selectedLocation.state,
        city: selectedLocation.city,
        neighborhood: selectedLocation.neighborhood || "",
        number_of_rooms: values.number_of_rooms || 0, // Bedroom count
        damage_deposit: values.damage_deposit || null,
        owner_id: authUser.id,
        is_verified: false,
        is_published: true,
        is_featured: false,
        zip_code: null,
        has_office_space: values.has_office_space || false,
        rules: addOfficeSpaceToRules(
          values.rules || null,
          values.has_office_space || false,
        ),
      };

      console.log("🔍 DEBUG: Property data before save:", propertyData);
      console.log("🔍 DEBUG: has_office_space value:", values.has_office_space);
      console.log(
        "🔍 DEBUG: Rules after adding office space:",
        propertyData.rules,
      );

      // Validate data before insertion
      const validation =
        DatabaseIntegrityManager.validatePropertyData(propertyData);
      if (!validation.isValid) {
        clearTimeout(timeoutId);
        console.error("❌ Data validation failed:", validation.errors);
        validation.errors.forEach((error) => toast.error(error));
        setIsLoading(false);
        return;
      }

      // Show warnings if any
      if (validation.warnings.length > 0) {
        validation.warnings.forEach((warning) => console.warn("⚠️", warning));
      }

      // Sanitize data before insertion
      const sanitizedData =
        DatabaseIntegrityManager.sanitizePropertyData(propertyData);

      console.log("📋 Property data before sanitize:", propertyData);
      console.log("📋 Property data after sanitize:", sanitizedData);
      console.log(
        "📋 has_office_space in sanitized data:",
        sanitizedData.has_office_space,
      );
      console.log("📋 rules in sanitized data:", sanitizedData.rules);

      // Direct Supabase insert with proper error handling
      const { data: property, error: propertyError } = await supabase
        .from("properties")
        .insert([sanitizedData])
        .select()
        .single();

      console.log("✅ Property insert query completed");
      console.log("   Has data:", !!property);
      console.log("   Has error:", !!propertyError);
      console.log("   Property data:", property);
      console.log("   Error details:", propertyError);

      // Check for Supabase errors (these don't throw, they return in the error field)
      if (propertyError) {
        clearTimeout(timeoutId);
        setIsLoading(false);
        console.error("❌ Property insertion error:", propertyError);
        console.error("Error details:", {
          message: propertyError.message,
          details: propertyError.details,
          hint: propertyError.hint,
          code: propertyError.code,
        });

        // Provide specific error messages
        if (propertyError.code === "42501") {
          toast.error(
            "Permission denied. RLS policies are blocking the insert. Run COMPREHENSIVE_RLS_FIX.sql in Supabase SQL Editor.",
          );
          console.error("🚨 RLS POLICY ERROR:");
          console.error("   Error code:", propertyError.code);
          console.error("   Error message:", propertyError.message);
          console.error(
            "   Solution: Run COMPREHENSIVE_RLS_FIX.sql in Supabase SQL Editor",
          );
        } else if (propertyError.code === "23503") {
          toast.error("Invalid data. Please check all fields are correct.");
        } else if (propertyError.code === "23505") {
          toast.error("A property with this information already exists.");
        } else {
          toast.error(
            `Failed to create property: ${propertyError.message || "Unknown error"}`,
          );
        }
        return;
      }

      // Check if we got data back
      if (!property || !property.id) {
        clearTimeout(timeoutId);
        setIsLoading(false);
        console.error("❌ Property insertion returned no data");
        console.error("Result:", { property, propertyError });
        toast.error(
          "Failed to create property. No data returned from database. Check RLS policies.",
        );
        return;
      }

      console.log("✅ Property created successfully:", property);
      console.log("📊 Property details:", {
        id: property.id,
        title: property.title,
        is_published: property.is_published,
        is_verified: property.is_verified,
        owner_id: property.owner_id,
      });

      // Insert amenities (with timeout - non-blocking)
      if (values.amenities && values.amenities.length > 0) {
        console.log("🔍 Inserting amenities:", values.amenities);
        try {
          // Ensure we have valid UUIDs for the amenities
          const validAmenityIds = values.amenities.filter(
            (id) => typeof id === "string" && id.length > 0,
          );

          if (validAmenityIds.length === 0) {
            console.warn("⚠️ No valid amenity IDs to insert");
            return;
          }

          const amenityInserts = validAmenityIds.map((amenityId) => ({
            property_id: property.id,
            amenity_id: amenityId,
          }));

          console.log("📝 Amenity inserts prepared:", amenityInserts);

          const { error: amenityError } = await supabase
            .from("property_amenities")
            .insert(amenityInserts);

          if (amenityError) {
            console.error("❌ Amenity insertion error:", amenityError);
            console.error("Error details:", {
              code: amenityError.code,
              message: amenityError.message,
              details: amenityError.details,
            });
            if (amenityError.code === "42501") {
              console.error("🚨 RLS POLICY ERROR for property_amenities");
              console.error(
                "   Run COMPREHENSIVE_RLS_FIX.sql in Supabase SQL Editor",
              );
            }
          } else {
            console.log("✅ Amenities inserted successfully");
          }
        } catch (amenityErr: any) {
          console.error("⚠️ Amenity insertion failed:", amenityErr);
          // Don't fail the whole operation if amenities fail
        }
      } else {
        console.log("ℹ️ No amenities to insert");
      }

      // Insert uploaded media into property_images (with timeout - non-blocking)
      console.log("🖼️ Inserting property images...");
      console.log("📁 Uploaded files count:", uploadedFiles.length);
      try {
        if (uploadedFiles && uploadedFiles.length > 0) {
          // Filter to only include files with real Supabase Storage URLs
          const validMediaInserts = uploadedFiles
            .filter((f) => {
              // Only include files with real uploaded URLs (Supabase Storage URLs)
              const hasRealUrl =
                f.url && f.url.startsWith("http") && !f.url.startsWith("blob:");
              if (!hasRealUrl) {
                console.warn(
                  "⚠️ Skipping file without real URL:",
                  f.name,
                  f.url,
                );
              }
              return hasRealUrl;
            })
            .map((f) => ({
              property_id: property.id,
              url: f.url,
              is_primary: !!f.isPrimary,
            }));

          console.log(
            "📝 Valid media inserts to create:",
            validMediaInserts.length,
            "out of",
            uploadedFiles.length,
          );
          console.log("📝 Property ID for images:", property.id);
          console.log("📝 Media inserts sample:", validMediaInserts[0]);

          if (validMediaInserts.length > 0) {
            const imagesTimeout = new Promise<never>((_, reject) => {
              setTimeout(
                () => reject(new Error("Images insert timeout")),
                8000,
              );
            });

            const imagesPromise = supabase
              .from("property_images")
              .insert(validMediaInserts)
              .select();

            try {
              const imagesResult = await Promise.race([
                imagesPromise,
                imagesTimeout,
              ]);
              const imagesError = (imagesResult as any)?.error;
              const imagesData = (imagesResult as any)?.data;

              if (imagesError) {
                console.error(
                  "❌ Property images insertion error:",
                  imagesError,
                );
                console.error("Error code:", imagesError.code);
                console.error("Error message:", imagesError.message);
                if (imagesError.code === "42501") {
                  console.error("🚨 RLS POLICY ERROR for property_images");
                  console.error(
                    "   Run COMPREHENSIVE_RLS_FIX.sql in Supabase SQL Editor",
                  );
                }
                // Don't throw error - property is already created
              } else {
                console.log(
                  "✅ Property images inserted successfully:",
                  imagesData?.length || 0,
                  "images",
                );
              }
            } catch (imagesTimeoutErr: any) {
              console.warn(
                "⚠️ Property images insertion timed out (non-fatal):",
                imagesTimeoutErr,
              );
              // Don't throw error - property is already created
            }
          } else {
            console.warn("⚠️ No valid image URLs found in uploadedFiles");
            console.warn(
              "   Uploaded files:",
              uploadedFiles.map((f) => ({ name: f.name, url: f.url })),
            );
          }
        } else {
          console.warn("⚠️ No uploaded files to insert");
        }
      } catch (err: any) {
        console.warn("⚠️ Error inserting property images (non-fatal):", err);
        // Don't throw error - property is already created
      }

      // Skip verification - property was created successfully if we got here
      // Verification is non-critical and can cause delays
      console.log(
        "✅ Property created successfully, skipping verification to save time",
      );

      // Refresh location manager cache (non-blocking, with timeout)
      console.log("🔄 Refreshing location manager cache (non-blocking)...");

      // Don't wait for refresh - do it in background
      (async () => {
        try {
          const refreshTimeout = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error("Refresh timeout")), 3000);
          });

          const refreshPromise = (async () => {
            if (
              typeof window !== "undefined" &&
              (window as any).supabaseLocationManager
            ) {
              await (window as any).supabaseLocationManager.refreshLocations();
            } else {
              const { supabaseLocationManager } =
                await import("@/utils/supabaseLocationManager");
              await supabaseLocationManager.refreshLocations();
            }
          })();

          await Promise.race([refreshPromise, refreshTimeout]);
          console.log("✅ Location manager cache refreshed");
        } catch (refreshError: any) {
          console.warn(
            "⚠️ Location refresh failed or timed out (non-fatal):",
            refreshError,
          );
          // This is non-critical - property will appear on next page load
        }
      })();

      // Clear timeout and complete successfully
      clearTimeout(timeoutId);
      console.log("=== PROPERTY LISTED SUCCESSFULLY ===");
      setIsLoading(false);
      toast.success(
        "Property listed successfully! It should appear in browse properties shortly.",
      );

      // Navigate immediately (don't wait for refresh)
      navigate("/profile?tab=dashboard");
    } catch (err) {
      clearTimeout(timeoutId);
      const error = err as Error & { code?: string };
      console.error("=== LISTING ERROR ===", error);
      console.error("Error stack:", error.stack);
      setIsLoading(false);

      if (error.message?.includes("timeout")) {
        toast.error(
          "Operation timed out. Please check your connection and try again.",
        );
      } else {
        toast.error(
          error.message || "Failed to list property. Please try again.",
        );
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="text-muted-foreground">
            Please log in to list a property.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>List Your Property | FilmLoca</title>
        <meta
          name="description"
          content="List your property on FilmLoca and earn by renting it out for film productions."
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow pt-0 pb-12 bg-gradient-to-br from-pastel-blue/5 via-white to-pastel-purple/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <section aria-labelledby="list-property-heading" className="pt-0">
              <div className="mb-4 bg-pastel-blue/20 pb-[30px] pt-[40px] px-6 rounded-xl border border-pastel-blue/30 shadow-md mt-[30px]">
                <h1
                  id="list-property-heading"
                  className="text-3xl font-bold mb-2 text-black"
                >
                  <span className="animated-red-line">
                    {"List Your Property".split("").map((char, index) => (
                      <span key={index}>{char === " " ? "\u00A0" : char}</span>
                    ))}
                  </span>
                </h1>
                <p className="text-muted-foreground">
                  Share your space with the film community and earn money by
                  hosting productions
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(
                    (data) => {
                      console.log(
                        "✅ Form is valid, calling onSubmit with data:",
                        data,
                      );
                      onSubmit(data);
                    },
                    (errors) => {
                      console.error("❌ Form validation failed!");
                      console.error("Validation errors:", errors);
                      console.error(
                        "Form state errors:",
                        form.formState.errors,
                      );

                      // Show all validation errors
                      const errorMessages: string[] = [];
                      Object.keys(errors).forEach((key) => {
                        const error = errors[key as keyof typeof errors];
                        if (error?.message) {
                          errorMessages.push(error.message as string);
                        }
                      });

                      if (errorMessages.length > 0) {
                        toast.error(errorMessages[0]); // Show first error
                        console.error("All validation errors:", errorMessages);
                      } else {
                        toast.error(
                          "Please fix the form errors before submitting",
                        );
                      }
                    },
                  )}
                  className="space-y-8"
                  noValidate
                >
                  {/* Basic Information */}
                  <Card className="border-2 border-pastel-blue/40 bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-pastel-blue/20 via-pastel-purple/15 to-pastel-blue/20 border-b-2 border-pastel-blue/30 py-5">
                      <CardTitle className="text-black text-xl font-bold flex items-center gap-2">
                        <span className="text-2xl">📋</span>
                        Basic Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                      {/* Property Title */}
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">
                              Property Title *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter a descriptive title for your property"
                                className="min-h-[140px] w-full text-base bg-white hover:border-pastel-pink/80 hover:bg-pastel-pink/20 transition-all rounded-2xl border-2 border-pastel-blue/60 focus:ring-2 focus:ring-pastel-blue/50 focus:border-pastel-blue/80 p-4"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-sm text-gray-600">
                              Choose a title that highlights what makes your
                              property special for filming
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Location Selection */}
                      <div className="space-y-4 bg-gradient-to-br from-pastel-lavender/10 to-pastel-blue/10 rounded-lg border border-pastel-lavender/30 -mx-6 px-6 py-4">
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          <span className="text-lg">📍</span>Location *
                        </FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Country */}
                          <div className="space-y-2">
                            <FormLabel className="text-base font-semibold">
                              Country *
                            </FormLabel>
                            <Combobox
                              options={getCountries()}
                              value={selectedLocation.country}
                              onValueChange={(value) => {
                                setSelectedLocation({
                                  country: value,
                                  state: "",
                                  city: "",
                                  neighborhood: "",
                                });
                              }}
                              placeholder="Country"
                              className="h-12"
                            />
                          </div>

                          {/* State */}
                          <div className="space-y-2">
                            <FormLabel className="text-base font-semibold">
                              State/Region *
                            </FormLabel>
                            <Combobox
                              options={availableStates}
                              value={selectedLocation.state}
                              onValueChange={(value) => {
                                setSelectedLocation({
                                  ...selectedLocation,
                                  state: value,
                                  city: "",
                                  neighborhood: "",
                                });
                              }}
                              placeholder="State/Region"
                              className="h-12"
                              disabled={!selectedLocation.country}
                            />
                          </div>

                          {/* City */}
                          <div className="space-y-2">
                            <FormLabel className="text-base font-semibold">
                              City *
                            </FormLabel>
                            <Combobox
                              options={availableCities}
                              value={selectedLocation.city}
                              onValueChange={(value) => {
                                setSelectedLocation({
                                  ...selectedLocation,
                                  city: value,
                                });
                              }}
                              placeholder="City"
                              className="h-12"
                              disabled={!selectedLocation.state}
                              allowCustom={true}
                            />
                          </div>

                          {/* Neighborhood */}
                          <div className="space-y-2">
                            <FormLabel className="text-base font-semibold">
                              Neighborhood (Optional)
                            </FormLabel>
                            <Input
                              type="text"
                              placeholder="e.g., Hollywood Hills, Beverly Hills"
                              className="h-12 w-full text-base bg-white hover:border-pastel-pink/80 hover:bg-pastel-pink/20 transition-all rounded-full border-2 border-pastel-blue/60 focus:ring-2 focus:ring-pastel-blue/50 focus:border-pastel-blue/80 px-4"
                              value={selectedLocation.neighborhood || ""}
                              onChange={(e) => setSelectedLocation({
                                ...selectedLocation,
                                neighborhood: e.target.value
                              })}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Property Type and Price */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-pastel-yellow/10 to-pastel-peach/10 rounded-lg border border-pastel-yellow/30 -mx-6 px-6 py-4">
                        {/* Property Type */}
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-semibold flex items-center gap-2">
                                <span className="text-lg">🏘️</span>
                                Property Type *
                              </FormLabel>
                              <Combobox
                                options={locationTypes.map(
                                  (type) => type.label,
                                )}
                                value={
                                  locationTypes.find(
                                    (t) => t.value === field.value,
                                  )?.label || ""
                                }
                                onValueChange={(value) => {
                                  const selectedType = locationTypes.find(
                                    (t) => t.label === value,
                                  );
                                  if (selectedType) {
                                    field.onChange(selectedType.value);
                                    if (selectedType.value !== "other") {
                                      setCustomPropertyType("");
                                    }
                                  }
                                }}
                                placeholder="Select property type"
                                className="h-12"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Custom Property Type Input - Show when "Other" is selected */}
                        {form.watch("type") === "other" && (
                          <div className="space-y-2">
                            <FormLabel className="text-base font-semibold">
                              Specify Property Type *
                            </FormLabel>
                            <Input
                              type="text"
                              placeholder="Please specify the property type..."
                              className="h-12 w-full text-base bg-white hover:border-pastel-pink/80 hover:bg-pastel-pink/20 transition-all rounded-full border-2 border-pastel-blue/60 focus:ring-2 focus:ring-pastel-blue/50 focus:border-pastel-blue/80 px-4"
                              value={customPropertyType}
                              onChange={(e) =>
                                setCustomPropertyType(e.target.value)
                              }
                              required={form.watch("type") === "other"}
                            />
                          </div>
                        )}

                        {/* Price */}
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-semibold flex items-center gap-2">
                                <span className="text-lg">💰</span>
                                Price per Day ({currentCurrency.symbol}) *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Enter price per day"
                                  className="h-12 w-full text-base bg-white hover:border-pastel-pink/80 hover:bg-pastel-pink/20 transition-all rounded-full border-2 border-pastel-blue/60 focus:ring-2 focus:ring-pastel-blue/50 focus:border-pastel-blue/80 px-4"
                                  value={field.value || ""}
                                  onChange={(e) =>
                                    field.onChange(
                                      parseFloat(e.target.value) || "",
                                    )
                                  }
                                  required
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Damage Deposit */}
                      <FormField
                        control={form.control}
                        name="damage_deposit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold flex items-center gap-2">
                              <span className="text-lg">🛡️</span>
                              Damage Deposit ({currentCurrency.name})
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder={`Enter damage deposit amount (${currentCurrency.symbol})`}
                                className="h-12 w-full text-base bg-white hover:border-pastel-pink/80 hover:bg-pastel-pink/20 transition-all rounded-full border-2 border-pastel-blue/60 focus:ring-2 focus:ring-pastel-blue/50 focus:border-pastel-blue/80 px-4"
                                value={field.value || ""}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || undefined,
                                  )
                                }
                              />
                            </FormControl>
                            <FormDescription className="text-sm text-gray-600">
                              Refundable deposit to cover potential damages
                              (Optional)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Office Space and Bedrooms */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-pastel-green/10 to-pastel-teal/10 rounded-lg border border-pastel-green/30 -mx-6 px-6 py-4">
                        {/* Office Space */}
                        <FormField
                          control={form.control}
                          name="has_office_space"
                          render={({ field }) => (
                            <FormItem className="p-4 bg-white/80 rounded-lg border border-pastel-green/30 shadow-sm transition-all duration-200 hover:shadow-md hover:border-pastel-green/60">
                              <label className="flex flex-col cursor-pointer h-full">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-base font-semibold flex items-center gap-2">
                                    <span className="text-lg">🏢</span>
                                    Office Space
                                  </span>
                                  <div
                                    className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-200 ${field.value ? "bg-green-500" : "bg-gray-300"}`}
                                  >
                                    <div
                                      className={`bg-white w-5 h-5 rounded-full shadow-lg transform transition-transform duration-300 ${field.value ? "translate-x-7" : "translate-x-0"}`}
                                    ></div>
                                  </div>
                                </div>
                                <input
                                  type="checkbox"
                                  checked={field.value || false}
                                  onChange={(e) => {
                                    field.onChange(e.target.checked);
                                    console.log(
                                      "Office space toggled:",
                                      e.target.checked,
                                    );
                                    console.log(
                                      "Form values:",
                                      form.getValues(),
                                    );
                                  }}
                                  className="hidden"
                                />
                                <span
                                  className={`text-sm mt-1 block transition-colors duration-200 ${field.value ? "text-green-700 font-medium" : "text-gray-600"}`}
                                >
                                  {field.value
                                    ? "✓ Office space included"
                                    : "Toggle if this property has a dedicated office space"}
                                </span>
                              </label>
                            </FormItem>
                          )}
                        />

                        {/* Number of Bedrooms */}
                        <FormField
                          control={form.control}
                          name="number_of_rooms"
                          render={({ field }) => (
                            <FormItem>
                              <BedroomCounter
                                value={field.value || 0}
                                onChange={(value) => field.onChange(value)}
                                min={0}
                                max={20}
                              />
                              <FormMessage className="text-sm text-rose-600 mt-2" />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Address */}
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold flex items-center gap-2">
                              <span className="text-lg">🏠</span>
                              Detailed Address *
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter the detailed address (street, building, etc.)"
                                className="h-12 text-base bg-white placeholder:text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Description */}
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold flex items-center gap-2">
                              <span className="text-lg">📝</span>
                              Property Description *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your property, its unique features, and why it's perfect for filming (minimum 10 words)"
                                className="min-h-[140px] text-base bg-white placeholder:text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              <span
                                className={`font-semibold ${descriptionWordCount < 10 ? "text-orange-600" : "text-green-600"}`}
                              >
                                {descriptionWordCount}/10 words
                              </span>
                              {descriptionWordCount < 10 &&
                                " (minimum 10 words required)"}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Media Upload */}
                      <div className="space-y-3 bg-gradient-to-br from-pastel-purple/10 to-pastel-blue/10 rounded-lg border border-pastel-purple/30 -mx-6 px-6 py-4">
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          <span className="text-lg">📸</span>
                          Upload Media Files *
                        </FormLabel>
                        <MediaUploader
                          mockMode={false}
                          bucket={
                            import.meta.env.VITE_PROPERTY_MEDIA_BUCKET ||
                            "property-media"
                          }
                          pathPrefix={`owners/${user.id}`}
                          enableCoverSelect={true}
                          onFilesUpdate={handleFilesUpdate}
                        />
                        {uploadedFiles.length === 0 && (
                          <p className="text-sm text-red-600 font-medium mt-2">
                            Please upload at least one image or video of your
                            property
                          </p>
                        )}
                      </div>

                      {/* Amenities */}
                      <FormField
                        control={form.control}
                        name="amenities"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold flex items-center gap-2">
                              <span className="text-lg">✨</span>
                              Amenities *
                            </FormLabel>
                            <FormDescription className="ml-7 -mt-1 mb-3">
                              Select all the amenities available at your
                              property
                            </FormDescription>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {dbAmenities.map((amenity) => {
                                const isChecked =
                                  Array.isArray(field.value) &&
                                  field.value.includes(amenity.id);
                                return (
                                  <div
                                    key={amenity.id}
                                    className="flex items-center space-x-3"
                                  >
                                    <Checkbox
                                      id={`amenity-${amenity.id}`}
                                      checked={isChecked}
                                      onCheckedChange={(checked) => {
                                        const currentValue = Array.isArray(
                                          field.value,
                                        )
                                          ? field.value
                                          : [];
                                        const newValue = checked
                                          ? [...currentValue, amenity.id]
                                          : currentValue.filter(
                                              (id) => id !== amenity.id,
                                            );

                                        console.log("Amenity changed:", {
                                          amenityId: amenity.id,
                                          checked,
                                          newValue,
                                        });

                                        field.onChange(newValue);
                                      }}
                                      className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <label
                                      htmlFor={`amenity-${amenity.id}`}
                                      className={`text-sm font-medium ${isChecked ? "text-primary font-semibold" : "text-gray-700"}`}
                                    >
                                      {amenity.name}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Rules */}
                      <FormField
                        control={form.control}
                        name="rules"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold flex items-center gap-2">
                              <span className="text-lg">📜</span>
                              Property Rules (Optional)
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any specific rules or guidelines for guests using your property"
                                className="min-h-[100px] text-base bg-white placeholder:text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-4 pt-6">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className={`px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl ${isLoading ? "" : "animate-color-pulse hover:!bg-black hover:!text-white"}`}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin">⏳</span>
                          Listing Property...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <span>🚀</span>
                          List Property
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ListPropertyPage;
