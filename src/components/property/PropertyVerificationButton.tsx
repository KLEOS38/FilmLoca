import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Video, Shield, CheckCircle, Clock, Calendar } from 'lucide-react';
import PropertyVerificationModal from './PropertyVerificationModal';
import usePropertyVerification from '@/hooks/usePropertyVerification';

interface VerificationAppointment {
  propertyId: string;
  propertyTitle: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

interface PropertyVerificationButtonProps {
  propertyId: string;
  propertyTitle: string;
  isVerified: boolean;
  compact?: boolean;
  className?: string;
}

export default function PropertyVerificationButton({
  propertyId,
  propertyTitle,
  isVerified,
  compact = false,
  className = ''
}: PropertyVerificationButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scheduleVerification, isLoading } = usePropertyVerification();

  const handleVerificationRequest = async (appointmentData: VerificationAppointment) => {
    try {
      console.log('🚀 PropertyVerificationButton: Scheduling verification:', appointmentData);
      await scheduleVerification(appointmentData);
      console.log('✅ PropertyVerificationButton: Verification scheduled successfully');
    } catch (error) {
      console.error('❌ PropertyVerificationButton: Verification failed:', error);
      throw error;
    }
  };

  if (isVerified) {
    return (
      <Card className={`border-green-200 bg-green-50 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div className="flex-1">
              <h4 className="font-semibold text-green-800">Verified Property</h4>
              <p className="text-sm text-green-600">
                This property has been verified by our team
              </p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Verified
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <>
        <Button
          onClick={() => setIsModalOpen(true)}
          disabled={isLoading}
          variant="outline"
          className={`border-blue-200 text-blue-700 hover:bg-blue-50 ${className}`}
        >
          <Shield className="h-4 w-4 mr-2" />
          Get Verified
        </Button>
        
        <PropertyVerificationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          propertyId={propertyId}
          propertyTitle={propertyTitle}
          isVerified={isVerified}
          onVerificationRequest={handleVerificationRequest}
        />
      </>
    );
  }

  return (
    <>
      <Card className={`border-blue-200 bg-blue-50 ${className}`}>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Video className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Get Your Property Verified</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Build trust with guests by scheduling a quick 15-minute video verification call
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>15 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4 text-blue-600" />
                <span>Video call</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span>Free</span>
              </div>
            </div>

            <Button
              onClick={() => setIsModalOpen(true)}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Video className="h-4 w-4 mr-2" />
                  Schedule Verification
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <PropertyVerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyId={propertyId}
        propertyTitle={propertyTitle}
        isVerified={isVerified}
        onVerificationRequest={handleVerificationRequest}
      />
    </>
  );
}
