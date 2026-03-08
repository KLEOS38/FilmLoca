import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video, Shield, Clock, Calendar, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';
import PropertyVerificationButton from '@/components/property/PropertyVerificationButton';
import usePropertyVerification from '@/hooks/usePropertyVerification';

// Temporary type until database is created
interface VerificationRequest {
  id: string;
  property_id: string;
  property_title: string;
  preferred_date: string;
  preferred_time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  video_call_link?: string;
  notes?: string;
  admin_notes?: string;
  created_at: string;
  completed_at?: string;
}

interface OwnerProperty {
  id: string;
  title: string;
  verification_status: 'not_verified' | 'pending' | 'verified' | 'rejected';
  verified_at?: string;
  verification_notes?: string;
}

interface PropertyVerificationManagementProps {
  properties: OwnerProperty[];
  onVerificationUpdate?: () => void;
}

export default function PropertyVerificationManagement({ 
  properties, 
  onVerificationUpdate 
}: PropertyVerificationManagementProps) {
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<string>('');
  const { scheduleVerification } = usePropertyVerification();

  useEffect(() => {
    fetchVerificationRequests();
  }, []);

  const fetchVerificationRequests = async () => {
    try {
      console.log('🔍 Fetching verification requests...');
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .rpc('get_user_verification_requests');

      console.log('📦 Verification requests data:', { data, error });
      
      if (error) {
        console.error('❌ Database error:', error);
        // Don't throw, just log and continue
        setVerificationRequests([]);
        return;
      }
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setVerificationRequests((data as any) || []);
    } catch (error) {
      console.error('❌ Error fetching verification requests:', error);
      toast.error('Failed to load verification requests');
      // Set empty array to prevent infinite loading
      setVerificationRequests([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationRequest = async (appointmentData: {
    propertyId: string;
    propertyTitle: string;
    preferredDate: string;
    preferredTime: string;
    notes?: string;
  }) => {
    try {
      console.log('🚀 PropertyVerificationManagement: Scheduling verification:', appointmentData);
      await scheduleVerification(appointmentData);
      console.log('✅ PropertyVerificationManagement: Verification scheduled successfully');
      await fetchVerificationRequests(); // Refresh the list
      if (onVerificationUpdate) {
        onVerificationUpdate();
      }
    } catch (error) {
      console.error('❌ PropertyVerificationManagement: Verification failed:', error);
      // Error is handled by the hook
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      scheduled: { variant: 'default' as const, label: 'Scheduled', color: 'bg-blue-100 text-blue-800' },
      completed: { variant: 'default' as const, label: 'Completed', color: 'bg-green-100 text-green-800' },
      cancelled: { variant: 'destructive' as const, label: 'Cancelled', color: 'bg-red-100 text-red-800' },
      rescheduled: { variant: 'secondary' as const, label: 'Rescheduled', color: 'bg-orange-100 text-orange-800' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled;
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const getVerificationStatusBadge = (status: string) => {
    const statusConfig = {
      not_verified: { variant: 'secondary' as const, label: 'Not Verified', color: 'bg-gray-100 text-gray-800' },
      pending: { variant: 'default' as const, label: 'Pending', color: 'bg-blue-100 text-blue-800' },
      verified: { variant: 'default' as const, label: 'Verified', color: 'bg-green-100 text-green-800' },
      rejected: { variant: 'destructive' as const, label: 'Rejected', color: 'bg-red-100 text-red-800' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.not_verified;
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const filteredRequests = selectedProperty
    ? verificationRequests.filter(req => req.property_id === selectedProperty)
    : verificationRequests;

  const unverifiedProperties = properties.filter(p => p.verification_status !== 'verified');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{properties.length}</div>
            <p className="text-xs text-muted-foreground">
              {properties.filter(p => p.verification_status === 'verified').length} verified
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {verificationRequests.filter(req => req.status === 'scheduled').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Scheduled appointments
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Need Verification</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unverifiedProperties.length}</div>
            <p className="text-xs text-muted-foreground">
              Properties not verified
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requests">Verification Requests</TabsTrigger>
          <TabsTrigger value="schedule">Schedule New</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Property Verification Status</CardTitle>
              <CardDescription>
                Overview of all your properties and their verification status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {properties.map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h4 className="font-medium">{property.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {property.verified_at && `Verified on ${format(new Date(property.verified_at), 'MMM d, yyyy')}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getVerificationStatusBadge(property.verification_status)}
                      {property.verification_status !== 'verified' && (
                        <PropertyVerificationButton
                          propertyId={property.id}
                          propertyTitle={property.title}
                          isVerified={false}
                          compact={true}
                          className=""
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verification Requests</CardTitle>
              <CardDescription>
                Track all your verification appointments and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedProperty && (
                <div className="mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedProperty('')}
                  >
                    Clear Filter
                  </Button>
                </div>
              )}
              
              {filteredRequests.length > 0 ? (
                <div className="space-y-4">
                  {filteredRequests.map((request) => (
                    <Card key={request.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{request.property_title}</h4>
                            <p className="text-sm text-muted-foreground">
                              Scheduled for {format(new Date(request.preferred_date), 'MMM d, yyyy')} at {request.preferred_time}
                            </p>
                          </div>
                          {getStatusBadge(request.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {request.video_call_link && (
                            <div className="flex items-center space-x-2">
                              <Video className="h-4 w-4" />
                              <Button variant="outline" size="sm" asChild>
                                <a href={request.video_call_link} target="_blank" rel="noopener noreferrer">
                                  Join Video Call
                                </a>
                              </Button>
                            </div>
                          )}
                          
                          {request.notes && (
                            <div className="p-2 bg-gray-50 rounded text-sm">
                              <strong>Your notes:</strong> {request.notes}
                            </div>
                          )}
                          
                          {request.admin_notes && (
                            <div className="p-2 bg-blue-50 rounded text-sm">
                              <strong>Admin notes:</strong> {request.admin_notes}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No verification requests</h3>
                  <p className="text-muted-foreground">
                    Schedule a verification to see your appointments here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Schedule New Verification</CardTitle>
              <CardDescription>
                Book a video call to verify your property
              </CardDescription>
            </CardHeader>
            <CardContent>
              {unverifiedProperties.length > 0 ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Property:</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {unverifiedProperties.map((property) => (
                        <Button
                          key={property.id}
                          variant={selectedProperty === property.id ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setSelectedProperty(property.id)}
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          {property.title}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {selectedProperty && (
                    <div className="mt-6">
                      <PropertyVerificationButton
                        propertyId={selectedProperty}
                        propertyTitle={properties.find(p => p.id === selectedProperty)?.title || ''}
                        isVerified={false}
                        compact={false}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">All Properties Verified!</h3>
                  <p className="text-muted-foreground">
                    All your properties have been verified. Great job!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
