import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Bell, 
  UserPlus, 
  Calendar,
  DollarSign,
  X,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface Alert {
  id: string;
  type: 'signup' | 'booking' | 'payment' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  data?: any;
}

interface AdminAlertsProps {
  onNewAlert?: (alert: Alert) => void;
}

const AdminAlerts: React.FC<AdminAlertsProps> = ({ onNewAlert }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchAlerts();
    setupRealtimeSubscriptions();
  }, []);

  const fetchAlerts = async () => {
    try {
      // Fetch recent alerts from localStorage (for demo) or database
      const storedAlerts = localStorage.getItem('admin-alerts');
      if (storedAlerts) {
        const parsedAlerts = JSON.parse(storedAlerts);
        setAlerts(parsedAlerts);
        setUnreadCount(parsedAlerts.filter((alert: Alert) => !alert.read).length);
      } else {
        // Initialize with some demo alerts
        const demoAlerts: Alert[] = [
          {
            id: '1',
            type: 'signup',
            title: 'New User Signup',
            message: 'john.doe@example.com just signed up as a filmmaker',
            timestamp: new Date().toISOString(),
            read: false,
            data: { email: 'john.doe@example.com', userType: 'filmmaker' }
          },
          {
            id: '2',
            type: 'booking',
            title: 'New Booking',
            message: 'Sarah Johnson booked "Luxury Film Studio" for 3 days',
            timestamp: new Date(Date.now() - 300000).toISOString(),
            read: false,
            data: { property: 'Luxury Film Studio', duration: 3, guest: 'Sarah Johnson' }
          }
        ];
        setAlerts(demoAlerts);
        setUnreadCount(2);
        localStorage.setItem('admin-alerts', JSON.stringify(demoAlerts));
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    // Subscribe to new user signups
    const userSubscription = supabase
      .channel('admin-user-signups')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'profiles' },
        (payload) => {
          const newAlert: Alert = {
            id: `signup-${Date.now()}`,
            type: 'signup',
            title: 'New User Signup',
            message: `${payload.new.email} just signed up as a ${payload.new.user_type}`,
            timestamp: new Date().toISOString(),
            read: false,
            data: { email: payload.new.email, userType: payload.new.user_type }
          };
          addAlert(newAlert);
        }
      )
      .subscribe();

    // Subscribe to new bookings
    const bookingSubscription = supabase
      .channel('admin-new-bookings')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'bookings' },
        (payload) => {
          const newAlert: Alert = {
            id: `booking-${Date.now()}`,
            type: 'booking',
            title: 'New Booking',
            message: `New booking created for ${payload.new.total_price ? '₦' + payload.new.total_price.toLocaleString() : 'amount not specified'}`,
            timestamp: new Date().toISOString(),
            read: false,
            data: { bookingId: payload.new.id, amount: payload.new.total_price }
          };
          addAlert(newAlert);
        }
      )
      .subscribe();

    // Cleanup subscriptions
    return () => {
      userSubscription.unsubscribe();
      bookingSubscription.unsubscribe();
    };
  };

  const addAlert = (alert: Alert) => {
    setAlerts(prev => [alert, ...prev]);
    setUnreadCount(prev => prev + 1);
    localStorage.setItem('admin-alerts', JSON.stringify([alert, ...alerts]));
    
    // Show toast notification
    toast.success(alert.title, {
      description: alert.message,
      duration: 5000,
    });

    // Call callback if provided
    if (onNewAlert) {
      onNewAlert(alert);
    }
  };

  const markAsRead = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
    localStorage.setItem('admin-alerts', JSON.stringify(
      alerts.map(alert => 
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    ));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, read: true })));
    setUnreadCount(0);
    localStorage.setItem('admin-alerts', JSON.stringify(
      alerts.map(alert => ({ ...alert, read: true }))
    ));
  };

  const clearAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    localStorage.setItem('admin-alerts', JSON.stringify(
      alerts.filter(alert => alert.id !== alertId)
    ));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'signup':
        return <UserPlus className="h-4 w-4 text-green-600" />;
      case 'booking':
        return <Calendar className="h-4 w-4 text-blue-600" />;
      case 'payment':
        return <DollarSign className="h-4 w-4 text-purple-600" />;
      case 'system':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'signup':
        return 'border-green-200 bg-green-50';
      case 'booking':
        return 'border-blue-200 bg-blue-50';
      case 'payment':
        return 'border-purple-200 bg-purple-50';
      case 'system':
        return 'border-orange-200 bg-orange-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Admin Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Admin Alerts
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark All Read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-muted-foreground">No alerts at the moment</p>
            <p className="text-sm text-muted-foreground">You'll be notified of new signups and bookings</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {alerts.map((alert) => (
              <Alert key={alert.id} className={`${getAlertColor(alert.type)} ${!alert.read ? 'border-l-4' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <AlertDescription className="font-medium">
                        {alert.title}
                      </AlertDescription>
                      <AlertDescription className="text-sm mt-1">
                        {alert.message}
                      </AlertDescription>
                      <AlertDescription className="text-xs text-muted-foreground mt-1">
                        {format(new Date(alert.timestamp), 'MMM d, yyyy - h:mm a')}
                      </AlertDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {!alert.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(alert.id)}
                        className="h-6 w-6 p-0"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => clearAlert(alert.id)}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminAlerts;
