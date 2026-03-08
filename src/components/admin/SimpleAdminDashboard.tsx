import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  DollarSign, 
  TrendingUp,
  Calendar,
  Home,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Shield,
  BarChart3,
  UserPlus,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { supabaseLocationManager } from '@/utils/supabaseLocationManager';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  email: string;
  name: string;
  user_type: 'filmmaker' | 'homeowner';
  created_at: string;
  total_bookings?: number;
  total_spent?: number;
  total_earned?: number;
}

interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  location: string;
  owner_email: string;
  is_verified: boolean;
  is_featured: boolean;
  ranking: number;
  created_at: string;
  bookings_count?: number;
  total_earnings?: number;
}

interface Booking {
  id: string;
  property_title: string;
  user_email: string;
  check_in: string;
  check_out: string;
  total_amount: number;
  total_price?: number; // Added for consistency
  status: 'confirmed' | 'pending' | 'cancelled';
  created_at: string;
}

const SimpleAdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Load data from localStorage and mock data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      console.log('🔍 Loading admin data from Supabase...');
      
      // Fetch users from Supabase
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('id, email, name, user_type, created_at')
        .order('created_at', { ascending: false });

      if (usersError) {
        console.error('Error fetching users:', usersError);
        throw usersError;
      }

      // Fetch bookings count and total spent for each user
      const usersWithStats: User[] = await Promise.all(
        (usersData || []).map(async (user: any) => {
          // Get bookings for filmmakers
          const { data: userBookings } = await supabase
            .from('bookings')
            .select('id, total_price, status')
            .eq('user_id', user.id);

          const totalBookings = userBookings?.length || 0;
          const totalSpent = userBookings?.reduce((sum, b) => sum + (b.total_price || 0), 0) || 0;

          // Get earnings for homeowners (properties they own)
          const { data: ownerBookings } = await supabase
            .from('bookings')
            .select('total_price, status')
            .eq('status', 'completed')
            .in('property_id', 
              (await supabase.from('properties').select('id').eq('owner_id', user.id)).data?.map(p => p.id) || []
            );

          const totalEarned = ownerBookings?.reduce((sum, b) => sum + (b.total_price || 0) * 0.85, 0) || 0;

          return {
            id: user.id,
            email: user.email || '',
            name: user.name || 'Unknown',
            user_type: user.user_type || 'filmmaker',
            created_at: user.created_at,
            total_bookings: totalBookings,
            total_spent: totalSpent,
            total_earned: totalEarned
          };
        })
      );

      // Fetch bookings from Supabase
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          id,
          start_date,
          end_date,
          total_price,
          status,
          created_at,
          properties:property_id(title),
          profiles:user_id(email, name)
        `)
        .order('created_at', { ascending: false })
        .limit(100);

      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError);
        throw bookingsError;
      }

      const transformedBookings: Booking[] = (bookingsData || []).map((booking: any) => ({
        id: booking.id,
        property_title: booking.properties?.title || 'Unknown Property',
        user_email: booking.profiles?.email || 'Unknown',
        check_in: booking.start_date,
        check_out: booking.end_date,
        total_amount: booking.total_price || 0,
        total_price: booking.total_price || 0,
        status: booking.status || 'pending',
        created_at: booking.created_at
      }));

      // Fetch properties from Supabase
      const { data: propertiesData, error: propertiesError } = await supabase
        .from('properties')
        .select(`
          id,
          title,
          property_type,
          price,
          neighborhood,
          is_verified,
          is_featured,
          ranking,
          created_at,
          owner_id,
          profiles:owner_id(email)
        `)
        .order('created_at', { ascending: false });

      if (propertiesError) {
        console.error('Error fetching properties:', propertiesError);
        throw propertiesError;
      }

      // Get booking counts and earnings for each property
      const propertiesWithStats: Property[] = await Promise.all(
        (propertiesData || []).map(async (prop: any) => {
          const { data: propBookings } = await supabase
            .from('bookings')
            .select('id, total_price, status')
            .eq('property_id', prop.id);

          const bookingsCount = propBookings?.length || 0;
          const totalEarnings = propBookings
            ?.filter(b => b.status === 'completed')
            .reduce((sum, b) => sum + (b.total_price || 0) * 0.85, 0) || 0;

          return {
            id: prop.id,
            title: prop.title,
            type: prop.property_type || 'Space',
            price: prop.price || 0,
            location: prop.neighborhood || '',
            owner_email: prop.profiles?.email || 'Unknown',
            is_verified: prop.is_verified || false,
            is_featured: prop.is_featured || false,
            ranking: prop.ranking || 0,
            created_at: prop.created_at,
            bookings_count: bookingsCount,
            total_earnings: totalEarnings
          };
        })
      );
      
      console.log('📊 Total properties loaded:', propertiesWithStats.length);
      console.log('📊 Total users loaded:', usersWithStats.length);
      console.log('📊 Total bookings loaded:', transformedBookings.length);

      setUsers(usersWithStats);
      setProperties(propertiesWithStats);
      setBookings(transformedBookings);
      setLoading(false);
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load admin data');
      setLoading(false);
    }
  };

  const togglePropertyVerification = async (propertyId: string) => {
    console.log('🔄 Toggling verification for property ID:', propertyId);
    
    // Find the current property
    const currentProperty = properties.find(p => p.id === propertyId);
    if (!currentProperty) {
      console.error('Property not found:', propertyId);
      toast.error('Property not found');
      return;
    }
    
    console.log('Current property:', currentProperty);
    console.log('Current verification status:', currentProperty.is_verified);
    
    const newVerificationStatus = !currentProperty.is_verified;
    console.log('New verification status:', newVerificationStatus);
    
    // Update using Supabase location manager
    const success = await supabaseLocationManager.updateLocationVerification(propertyId, newVerificationStatus);
    
    if (success) {
      // Update the properties state immediately
      setProperties(prev => 
        prev.map(prop => 
          prop.id === propertyId 
            ? { ...prop, is_verified: newVerificationStatus }
            : prop
        )
      );
      
      toast.success(`Property ${newVerificationStatus ? 'verified' : 'unverified'} successfully!`);
    } else {
      toast.error('Failed to update property verification');
    }
  };

  const togglePropertyFeatured = async (propertyId: string) => {
    const currentProperty = properties.find(p => p.id === propertyId);
    if (!currentProperty) return;

    const newFeaturedStatus = !currentProperty.is_featured;
    
    try {
      const { error } = await supabase
        .from('properties')
        .update({ is_featured: newFeaturedStatus })
        .eq('id', propertyId);

      if (error) throw error;

      setProperties(prev => 
        prev.map(prop => 
          prop.id === propertyId 
            ? { ...prop, is_featured: newFeaturedStatus }
            : prop
        )
      );
      toast.success(`Property ${newFeaturedStatus ? 'featured' : 'unfeatured'} successfully!`);
    } catch (error) {
      console.error('Error updating property featured status:', error);
      toast.error('Failed to update property featured status');
    }
  };

  const updatePropertyRanking = async (propertyId: string, newRanking: number) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ ranking: newRanking })
        .eq('id', propertyId);

      if (error) throw error;

      setProperties(prev => 
        prev.map(prop => 
          prop.id === propertyId 
            ? { ...prop, ranking: newRanking }
            : prop
        )
      );
      toast.success(`Property ranking updated to ${newRanking}!`);
    } catch (error) {
      console.error('Error updating property ranking:', error);
      toast.error('Failed to update property ranking');
    }
  };

  const movePropertyUp = async (propertyId: string) => {
    const currentProperty = properties.find(p => p.id === propertyId);
    if (!currentProperty) return;

    const newRanking = currentProperty.ranking + 1;
    await updatePropertyRanking(propertyId, newRanking);
  };

  const movePropertyDown = async (propertyId: string) => {
    const currentProperty = properties.find(p => p.id === propertyId);
    if (!currentProperty) return;

    const newRanking = Math.max(0, currentProperty.ranking - 1);
    await updatePropertyRanking(propertyId, newRanking);
  };

  const filteredProperties = properties
    .filter(property =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by featured first, then by ranking (highest first), then by creation date
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      if (a.ranking !== b.ranking) return b.ranking - a.ranking;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUsers = users.length;
  const totalProperties = properties.length;
  const verifiedProperties = properties.filter(p => p.is_verified).length;
  const totalRevenue = properties.reduce((sum, p) => sum + (p.total_earnings || 0), 0);
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        <span className="ml-2">Loading admin dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, properties, bookings, and platform analytics</p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium">Admin Access</span>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {users.filter(u => u.user_type === 'filmmaker').length} filmmakers, {users.filter(u => u.user_type === 'homeowner').length} homeowners
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              {verifiedProperties} verified, {totalProperties - verifiedProperties} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              {confirmedBookings} confirmed, {pendingBookings} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Platform earnings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <UserPlus className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">New user registration</span>
                    </div>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Home className="h-4 w-4 text-green-500" />
                      <span className="text-sm">New property listed</span>
                    </div>
                    <span className="text-xs text-muted-foreground">4 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Property verified</span>
                    </div>
                    <span className="text-xs text-muted-foreground">6 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">New booking confirmed</span>
                    </div>
                    <span className="text-xs text-muted-foreground">8 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Verification Rate</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${totalProperties > 0 ? (verifiedProperties / totalProperties) * 100 : 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {totalProperties > 0 ? Math.round((verifiedProperties / totalProperties) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Booking Success Rate</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${totalBookings > 0 ? (confirmedBookings / totalBookings) * 100 : 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {totalBookings > 0 ? Math.round((confirmedBookings / totalBookings) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Pending Verifications</span>
                    <Badge variant="secondary">{totalProperties - verifiedProperties}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Pending Bookings</span>
                    <Badge variant="secondary">{pendingBookings}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Property Management</CardTitle>
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Showing {filteredProperties.length} of {properties.length} properties
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{property.title}</h3>
                        <Badge variant={property.is_verified ? "default" : "secondary"}>
                          {property.is_verified ? "Verified" : "Unverified"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {property.type} • {property.location} • ₦{property.price.toLocaleString()}/day
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Owner: {property.owner_email} • {property.bookings_count || 0} bookings
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => movePropertyUp(property.id)}
                          className="h-6 w-6 p-0"
                        >
                          ↑
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => movePropertyDown(property.id)}
                          className="h-6 w-6 p-0"
                        >
                          ↓
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Featured:</span>
                        <Switch
                          checked={property.is_featured}
                          onCheckedChange={() => togglePropertyFeatured(property.id)}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Ranking:</span>
                        <Input
                          type="number"
                          value={property.ranking}
                          onChange={(e) => updatePropertyRanking(property.id, parseInt(e.target.value) || 0)}
                          className="w-16 h-8 text-center"
                          min="0"
                          max="100"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Verified:</span>
                        <Switch
                          checked={property.is_verified}
                          onCheckedChange={() => togglePropertyVerification(property.id)}
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
                {filteredProperties.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No properties found matching your search.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All App Activities</CardTitle>
              <p className="text-sm text-muted-foreground">
                Real-time feed of all platform activities including new users, bookings, properties, and reviews
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* New Users */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">New Users</h4>
                  {users.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs">{user.user_type}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* New Properties */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">New Properties</h4>
                  {properties.slice(0, 5).map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                          🏠
                        </div>
                        <div>
                          <p className="font-medium text-sm">{property.title}</p>
                          <p className="text-xs text-muted-foreground">{property.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={property.is_verified ? "default" : "secondary"} className="text-xs">
                          {property.is_verified ? "Verified" : "Pending"}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(property.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* New Bookings */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Recent Bookings</h4>
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm">
                          📅
                        </div>
                        <div>
                          <p className="font-medium text-sm">{booking.property_title}</p>
                          <p className="text-xs text-muted-foreground">Guest: {booking.user_email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs">{booking.status}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          ₦{(booking.total_price || booking.total_amount)?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>User Management</CardTitle>
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="outline">{user.user_type}</Badge>
                        <span className="text-xs text-muted-foreground">
                          Joined: {new Date(user.created_at).toLocaleDateString()}
                        </span>
                        {user.total_bookings && (
                          <span className="text-xs text-muted-foreground">
                            {user.total_bookings} bookings
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
                {filteredUsers.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No users found matching your search.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-semibold">{booking.property_title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {booking.user_email} • {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Booked: {new Date(booking.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={
                          booking.status === 'confirmed' ? 'default' : 
                          booking.status === 'pending' ? 'secondary' : 
                          'destructive'
                        }
                      >
                        {booking.status}
                      </Badge>
                      <div className="text-right">
                        <p className="font-semibold">₦{booking.total_amount.toLocaleString()}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
                {bookings.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No bookings found.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimpleAdminDashboard;