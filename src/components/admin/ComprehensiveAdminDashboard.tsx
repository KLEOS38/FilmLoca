import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  UserPlus,
  BarChart3,
  PieChart,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Home,
  Film,
  CreditCard,
  MessageSquare,
  Star,
  AlertTriangle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import AdminAlerts from './AdminAlerts';

interface User {
  id: string;
  email: string;
  name: string;
  user_type: 'filmmaker' | 'homeowner';
  created_at: string;
  last_login?: string;
  is_verified: boolean;
  total_bookings?: number;
  total_spent?: number;
  total_earned?: number;
}

interface Property {
  id: string;
  title: string;
  owner_id: string;
  price: number;
  is_published: boolean;
  is_verified: boolean;
  created_at: string;
  bookings_count?: number;
  total_earnings?: number;
}

interface Booking {
  id: string;
  user_id: string;
  property_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
  created_at: string;
  user_name?: string;
  property_title?: string;
}

interface AnalyticsData {
  totalUsers: number;
  totalProperties: number;
  totalBookings: number;
  totalRevenue: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  activeUsers: number;
  averageBookingValue: number;
  userTypes: {
    filmmakers: number;
    homeowners: number;
  };
  bookingStatuses: {
    confirmed: number;
    pending: number;
    cancelled: number;
    completed: number;
  };
}

const ComprehensiveAdminDashboard = () => {
  const { canExport, canEdit, canDelete, adminLevel, user } = useAdminAccess();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setIsLoading(true);

      // Fetch all users
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;

      // Fetch all properties
      const { data: propertiesData, error: propertiesError } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (propertiesError) throw propertiesError;

      // Fetch all bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          *,
          profiles:user_id(name, email),
          properties:property_id(title)
        `)
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;

      // Process data
      const processedUsers = (usersData || []).map(user => ({
        ...user,
        total_bookings: (bookingsData || []).filter(b => b.user_id === user.id).length,
        total_spent: (bookingsData || []).filter(b => b.user_id === user.id && b.status === 'confirmed').reduce((sum, b) => sum + (b.total_price || 0), 0),
        total_earned: (bookingsData || []).filter(b => b.property_id && b.status === 'confirmed').reduce((sum, b) => sum + (b.total_price || 0) * 0.85, 0) // 85% to host
      }));

      const processedProperties = (propertiesData || []).map(property => ({
        ...property,
        bookings_count: (bookingsData || []).filter(b => b.property_id === property.id).length,
        total_earnings: (bookingsData || []).filter(b => b.property_id === property.id && b.status === 'confirmed').reduce((sum, b) => sum + (b.total_price || 0) * 0.85, 0)
      }));

      const processedBookings = (bookingsData || []).map(booking => ({
        ...booking,
        user_name: booking.profiles?.name || booking.profiles?.email || 'Unknown',
        property_title: booking.properties?.title || 'Unknown Property'
      }));

      // Calculate analytics
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      const confirmedBookings = processedBookings.filter(b => b.status === 'confirmed' || b.status === 'completed');
      const totalRevenue = confirmedBookings.reduce((sum, b) => sum + (b.total_price || 0), 0);
      const averageBookingValue = confirmedBookings.length > 0 ? totalRevenue / confirmedBookings.length : 0;

      const analyticsData: AnalyticsData = {
        totalUsers: processedUsers.length,
        totalProperties: processedProperties.length,
        totalBookings: processedBookings.length,
        totalRevenue,
        newUsersToday: processedUsers.filter(u => new Date(u.created_at) >= today).length,
        newUsersThisWeek: processedUsers.filter(u => new Date(u.created_at) >= weekAgo).length,
        newUsersThisMonth: processedUsers.filter(u => new Date(u.created_at) >= monthAgo).length,
        activeUsers: processedUsers.filter(u => u.total_bookings > 0).length,
        averageBookingValue,
        userTypes: {
          filmmakers: processedUsers.filter(u => u.user_type === 'filmmaker').length,
          homeowners: processedUsers.filter(u => u.user_type === 'homeowner').length
        },
        bookingStatuses: {
          confirmed: processedBookings.filter(b => b.status === 'confirmed').length,
          pending: processedBookings.filter(b => b.status === 'pending').length,
          cancelled: processedBookings.filter(b => b.status === 'cancelled').length,
          completed: processedBookings.filter(b => b.status === 'completed').length
        }
      };

      setAnalytics(analyticsData);
      setUsers(processedUsers);
      setProperties(processedProperties);
      setBookings(processedBookings);

    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('Failed to load admin data');
      
      // Use mock data if database fails
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'john@example.com',
          name: 'John Doe',
          user_type: 'filmmaker',
          created_at: new Date().toISOString(),
          is_verified: true,
          total_bookings: 5,
          total_spent: 150000,
          total_earned: 0
        },
        {
          id: '2',
          email: 'sarah@example.com',
          name: 'Sarah Johnson',
          user_type: 'homeowner',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          is_verified: true,
          total_bookings: 0,
          total_spent: 0,
          total_earned: 85000
        }
      ];

      const mockAnalytics: AnalyticsData = {
        totalUsers: 1247,
        totalProperties: 89,
        totalBookings: 156,
        totalRevenue: 2450000,
        newUsersToday: 12,
        newUsersThisWeek: 89,
        newUsersThisMonth: 342,
        activeUsers: 234,
        averageBookingValue: 15705,
        userTypes: {
          filmmakers: 892,
          homeowners: 355
        },
        bookingStatuses: {
          confirmed: 45,
          pending: 12,
          cancelled: 8,
          completed: 91
        }
      };

      setAnalytics(mockAnalytics);
      setUsers(mockUsers);
      setProperties([]);
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = userTypeFilter === 'all' || user.user_type === userTypeFilter;
    return matchesSearch && matchesType;
  });

  const exportData = (type: string) => {
    let dataToExport = [];
    let filename = '';

    switch (type) {
      case 'users':
        dataToExport = filteredUsers;
        filename = `film-loca-users-${format(new Date(), 'yyyy-MM-dd')}.json`;
        break;
      case 'properties':
        dataToExport = properties;
        filename = `film-loca-properties-${format(new Date(), 'yyyy-MM-dd')}.json`;
        break;
      case 'bookings':
        dataToExport = bookings;
        filename = `film-loca-bookings-${format(new Date(), 'yyyy-MM-dd')}.json`;
        break;
      default:
        return;
    }

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(`${type} data exported successfully!`);
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Badge variant={adminLevel === 'super_admin' ? 'default' : 'secondary'}>
              {adminLevel === 'super_admin' ? 'Super Admin' : 'Admin'}
            </Badge>
          </div>
          <p className="text-muted-foreground">Complete overview of all platform data</p>
          {user?.email && (
            <p className="text-sm text-muted-foreground">Logged in as: {user.email}</p>
          )}
        </div>
        {canExport && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => exportData('users')}>
              <Download className="h-4 w-4 mr-2" />
              Export Users
            </Button>
            <Button variant="outline" onClick={() => exportData('bookings')}>
              <Download className="h-4 w-4 mr-2" />
              Export Bookings
            </Button>
          </div>
        )}
      </div>

      {/* Admin Alerts */}
      <AdminAlerts />

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <Home className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Properties</p>
                <p className="text-2xl font-bold">{analytics.totalProperties.toLocaleString()}</p>
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
      </div>

      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">All Users</TabsTrigger>
          <TabsTrigger value="properties">All Properties</TabsTrigger>
          <TabsTrigger value="bookings">All Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <span className="text-sm text-muted-foreground">Active Users</span>
                    <Badge variant="secondary">{analytics.activeUsers}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Booking Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Confirmed</span>
                    <Badge variant="default">{analytics.bookingStatuses.confirmed}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Completed</span>
                    <Badge variant="secondary">{analytics.bookingStatuses.completed}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pending</span>
                    <Badge variant="outline">{analytics.bookingStatuses.pending}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Cancelled</span>
                    <Badge variant="destructive">{analytics.bookingStatuses.cancelled}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="filmmaker">Filmmakers</SelectItem>
                <SelectItem value="homeowner">Property Owners</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Users ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-burgundy rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-sm text-muted-foreground">
                          Joined: {format(new Date(user.created_at), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge variant={user.user_type === 'homeowner' ? 'default' : 'secondary'}>
                          {user.user_type === 'homeowner' ? 'Property Owner' : 'Filmmaker'}
                        </Badge>
                        {user.is_verified && (
                          <Badge variant="outline" className="ml-2">Verified</Badge>
                        )}
                      </div>
                      <div className="text-right text-sm">
                        <p>Bookings: {user.total_bookings || 0}</p>
                        <p>Spent: ₦{(user.total_spent || 0).toLocaleString()}</p>
                        <p>Earned: ₦{(user.total_earned || 0).toLocaleString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {canEdit && (
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {canDelete && (
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Properties ({properties.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {properties.map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{property.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Price: ₦{property.price.toLocaleString()}/day
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Created: {format(new Date(property.created_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right text-sm">
                        <p>Bookings: {property.bookings_count || 0}</p>
                        <p>Earnings: ₦{(property.total_earnings || 0).toLocaleString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge variant={property.is_published ? 'default' : 'secondary'}>
                          {property.is_published ? 'Published' : 'Draft'}
                        </Badge>
                        {property.is_verified && (
                          <Badge variant="outline">Verified</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Bookings ({bookings.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{booking.property_title}</h3>
                      <p className="text-sm text-muted-foreground">Guest: {booking.user_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(booking.start_date), 'MMM d')} - {format(new Date(booking.end_date), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">₦{booking.total_price.toLocaleString()}</p>
                        <Badge variant={
                          booking.status === 'confirmed' ? 'default' :
                          booking.status === 'completed' ? 'secondary' :
                          booking.status === 'cancelled' ? 'destructive' : 'outline'
                        }>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        {format(new Date(booking.created_at), 'MMM d, yyyy')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComprehensiveAdminDashboard;
