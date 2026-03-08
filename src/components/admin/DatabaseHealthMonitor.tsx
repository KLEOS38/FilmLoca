import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DatabaseIntegrityManager } from '@/utils/databaseIntegrity';
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, Activity, Database } from 'lucide-react';

interface HealthStatus {
  isConnected: boolean;
  tablesAccessible: string[];
  errors: string[];
}

interface AuditResults {
  totalProperties: number;
  validProperties: number;
  propertiesWithIssues: number;
  commonIssues: Record<string, number>;
  recommendations: string[];
}

const DatabaseHealthMonitor = () => {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [auditResults, setAuditResults] = useState<AuditResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkDatabaseHealth = async () => {
    setIsLoading(true);
    try {
      const health = await DatabaseIntegrityManager.checkDatabaseHealth();
      setHealthStatus(health);
      setLastChecked(new Date());
    } catch (error) {
      console.error('Health check failed:', error);
      setHealthStatus({
        isConnected: false,
        tablesAccessible: [],
        errors: ['Health check failed: ' + error]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const runDatabaseAudit = async () => {
    setIsLoading(true);
    try {
      const audit = await DatabaseIntegrityManager.auditDatabase();
      setAuditResults(audit);
    } catch (error) {
      console.error('Audit failed:', error);
      setAuditResults({
        totalProperties: 0,
        validProperties: 0,
        propertiesWithIssues: 0,
        commonIssues: {},
        recommendations: ['Audit failed: ' + error]
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkDatabaseHealth();
    runDatabaseAudit();
  }, []);

  const getStatusIcon = (isConnected: boolean) => {
    return isConnected ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    );
  };

  const getStatusBadge = (isConnected: boolean) => {
    return isConnected ? (
      <Badge className="bg-green-100 text-green-800">Healthy</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Unhealthy</Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Database Health Status */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            <CardTitle>Database Health</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={checkDatabaseHealth}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {healthStatus ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(healthStatus.isConnected)}
                  <span className="font-medium">Connection Status</span>
                </div>
                {getStatusBadge(healthStatus.isConnected)}
              </div>

              {lastChecked && (
                <p className="text-sm text-muted-foreground">
                  Last checked: {lastChecked.toLocaleString()}
                </p>
              )}

              <div>
                <h4 className="font-medium mb-2">Accessible Tables</h4>
                <div className="flex flex-wrap gap-1">
                  {healthStatus.tablesAccessible.map((table: string) => (
                    <Badge key={table} variant="secondary" className="text-xs">
                      {table}
                    </Badge>
                  ))}
                </div>
              </div>

              {healthStatus.errors.length > 0 && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-1">
                      <p className="font-medium">Issues detected:</p>
                      {healthStatus.errors.map((error: string, index: number) => (
                        <p key={index} className="text-sm">{error}</p>
                      ))}
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
              <p className="text-muted-foreground">Checking database health...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Database Audit Results */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            <CardTitle>Data Integrity Audit</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={runDatabaseAudit}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Run Audit
          </Button>
        </CardHeader>
        <CardContent>
          {auditResults ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{auditResults.totalProperties}</div>
                  <div className="text-sm text-muted-foreground">Total Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{auditResults.validProperties}</div>
                  <div className="text-sm text-muted-foreground">Valid Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{auditResults.propertiesWithIssues}</div>
                  <div className="text-sm text-muted-foreground">Properties with Issues</div>
                </div>
              </div>

              {Object.keys(auditResults.commonIssues).length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Common Issues</h4>
                  <div className="space-y-2">
                    {Object.entries(auditResults.commonIssues).map(([issue, count]) => (
                      <div key={issue} className="flex justify-between items-center">
                        <span className="text-sm">{issue}</span>
                        <Badge variant="destructive">{count as number}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {auditResults.recommendations.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Recommendations</h4>
                  <div className="space-y-1">
                    {auditResults.recommendations.map((rec: string, index: number) => (
                      <p key={index} className="text-sm text-muted-foreground">• {rec}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
              <p className="text-muted-foreground">Running database audit...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseHealthMonitor;
