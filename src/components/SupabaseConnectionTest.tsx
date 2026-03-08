import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Loader2, Database, Users, Home, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ConnectionStatus {
  isConnected: boolean;
  tables: string[];
  error?: string;
  responseTime?: number;
}

const SupabaseConnectionTest = () => {
  const [status, setStatus] = useState<ConnectionStatus>({
    isConnected: false,
    tables: []
  });
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    const startTime = Date.now();
    
    try {
      // Test basic connection by fetching from profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, email')
        .limit(1);

      const responseTime = Date.now() - startTime;

      if (error) {
        throw error;
      }

      // Test multiple tables to verify full access
      const tableTests = await Promise.allSettled([
        supabase.from('profiles').select('count', { count: 'exact', head: true }),
        supabase.from('properties').select('count', { count: 'exact', head: true }),
        supabase.from('bookings').select('count', { count: 'exact', head: true }),
        supabase.from('notifications').select('count', { count: 'exact', head: true }),
        supabase.from('reviews').select('count', { count: 'exact', head: true }),
        supabase.from('favorites').select('count', { count: 'exact', head: true })
      ]);

      const accessibleTables = tableTests
        .map((result, index) => {
          const tableNames = ['profiles', 'properties', 'bookings', 'notifications', 'reviews', 'favorites'];
          return result.status === 'fulfilled' ? tableNames[index] : null;
        })
        .filter(Boolean) as string[];

      setStatus({
        isConnected: true,
        tables: accessibleTables,
        responseTime
      });

    } catch (error: any) {
      setStatus({
        isConnected: false,
        tables: [],
        error: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  const getTableIcon = (table: string) => {
    switch (table) {
      case 'profiles': return <Users className="h-4 w-4" />;
      case 'properties': return <Home className="h-4 w-4" />;
      case 'bookings': return <Calendar className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Supabase Connection Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
            ) : status.isConnected ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <span className="font-medium">
              {isLoading ? 'Testing Connection...' : 
               status.isConnected ? 'Connected Successfully' : 'Connection Failed'}
            </span>
          </div>
          
          {status.responseTime && (
            <Badge variant="outline">
              {status.responseTime}ms
            </Badge>
          )}
        </div>

        {/* Error Message */}
        {status.error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              <strong>Error:</strong> {status.error}
            </p>
          </div>
        )}

        {/* Accessible Tables */}
        {status.isConnected && (
          <div>
            <h4 className="font-medium mb-2">Accessible Tables ({status.tables.length})</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {status.tables.map((table) => (
                <div key={table} className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                  {getTableIcon(table)}
                  <span className="text-sm font-medium capitalize">{table}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Test Button */}
        <Button 
          onClick={testConnection} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Testing...
            </>
          ) : (
            'Test Connection Again'
          )}
        </Button>

        {/* Connection Details */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>Project ID:</strong> jwuakfowjxebtpcxcqyr</p>
          <p><strong>URL:</strong> https://jwuakfowjxebtpcxcqyr.supabase.co</p>
          <p><strong>Status:</strong> {status.isConnected ? 'Active' : 'Inactive'}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseConnectionTest;
