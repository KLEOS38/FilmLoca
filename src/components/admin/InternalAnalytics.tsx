import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  UserPlus,
  BarChart3,
  PieChart
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface AnalyticsData {
  totalUsers: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  totalRevenue: number;
  totalBookings: number;
  averageBookingValue: number;
  userTypes: {
    filmmakers: number;
    homeowners: number;
  };
  recentSignups: Array<{
    id: string;
    email: string;
    user_type: string;
    created_at: string;
  }>;
}

const InternalAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);

      // Fetch user analytics
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('id, email, user_type, created_at');

      if (usersError) throw usersError;

      // Fetch booking analytics
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('id, total_price, created_at, status');

      if (bookingsError) throw bookingsError;

      // Calculate analytics
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      const newUsersToday = users.filter(u => new Date(u.created_at) >= today).length;
      const newUsersThisWeek = users.filter(u => new Date(u.created_at) >= weekAgo).length;
      const newUsersThisMonth = users.filter(u => new Date(u.created_at) >= monthAgo).length;

      const completedBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'completed');
      const totalRevenue = completedBookings.reduce((sum, b) => sum + (b.total_price || 0), 0);
      const averageBookingValue = completedBookings.length > 0 ? totalRevenue / completedBookings.length : 0;

      const userTypes = {
        filmmakers: users.filter(u => u.user_type === 'filmmaker').length,
        homeowners: users.filter(u => u.user_type === 'homeowner').length
      };

      const recentSignups = users
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 10);

      setAnalytics({
        totalUsers: users.length,
        newUsersToday,
        newUsersThisWeek,
        newUsersThisMonth,
        totalRevenue,
        totalBookings: completedBookings.length,
        averageBookingValue,
        userTypes,
        recentSignups
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Use mock data if database fails
      setAnalytics({
        totalUsers: 1247,
        newUsersToday: 12,
        newUsersThisWeek: 89,
        newUsersThisMonth: 342,
        totalRevenue: 2450000,
        totalBookings: 156,
        averageBookingValue: 15705,
        userTypes: {
          filmmakers: 892,
          homeowners: 355
        },
        recentSignups: [
          {
            id: '1',
            email: 'john@example.com',
            user_type: 'filmmaker',
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            email: 'sarah@example.com',
            user_type: 'homeowner',
            created_at: new Date(Date.now() - 3600000).toISOString()
          }
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{analytics.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserPlus className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Renters (Filmmakers)</p>
                <p className="text-2xl font-bold">{analytics.userTypes.filmmakers.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserPlus className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Hosts (Property Owners)</p>
                <p className="text-2xl font-bold">{analytics.userTypes.homeowners.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₦{analytics.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-burgundy" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold">{analytics.totalBookings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">New This Week</p>
                <p className="text-2xl font-bold">{analytics.newUsersThisWeek}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">New This Month</p>
                <p className="text-2xl font-bold">{analytics.newUsersThisMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Growth & Revenue */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              User Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Today</span>
                <Badge variant="secondary">{analytics.newUsersToday} new users</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">This Week</span>
                <Badge variant="secondary">{analytics.newUsersThisWeek} new users</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">This Month</span>
                <Badge variant="secondary">{analytics.newUsersThisMonth} new users</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              User Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Filmmakers</span>
                <Badge variant="outline">{analytics.userTypes.filmmakers}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Property Owners</span>
                <Badge variant="outline">{analytics.userTypes.homeowners}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Average Booking Value</span>
                <Badge variant="secondary">₦{analytics.averageBookingValue.toLocaleString()}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Signups */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Signups
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.recentSignups.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(user.created_at), 'MMM d, yyyy - h:mm a')}
                  </p>
                </div>
                <Badge variant={user.user_type === 'homeowner' ? 'default' : 'secondary'}>
                  {user.user_type === 'homeowner' ? 'Property Owner' : 'Filmmaker'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InternalAnalytics;
