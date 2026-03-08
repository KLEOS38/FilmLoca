import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Bell, 
  Shield, 
  Eye, 
  Mail, 
  Smartphone, 
  Globe, 
  Lock, 
  Key, 
  Trash2,
  AlertTriangle,
  CheckCircle,
  Save,
  X,
  CreditCard
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import BankAccountForm from './BankAccountForm';

interface NotificationSettings {
  email_notifications: boolean;
  sms_notifications: boolean;
  booking_updates: boolean;
  payment_reminders: boolean;
  marketing_emails: boolean;
  security_alerts: boolean;
}

interface PrivacySettings {
  profile_visibility: 'public' | 'private' | 'friends';
  show_phone: boolean;
  show_email: boolean;
  show_address: boolean;
  allow_messages: boolean;
}

interface SecuritySettings {
  two_factor_enabled: boolean;
  login_notifications: boolean;
  device_trust: boolean;
}

const ProfileSettings = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Notification Settings
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email_notifications: true,
    sms_notifications: false,
    booking_updates: true,
    payment_reminders: true,
    marketing_emails: false,
    security_alerts: true
  });

  // Privacy Settings
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profile_visibility: 'public',
    show_phone: false,
    show_email: false,
    show_address: false,
    allow_messages: true
  });

  // Security Settings
  const [security, setSecurity] = useState<SecuritySettings>({
    two_factor_enabled: false,
    login_notifications: true,
    device_trust: false
  });

  // Password Change
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      fetchSettings();
    }
  }, [user]);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      
      // Fetch user settings from profiles table
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      // Set settings from profile data (you might want to create a separate settings table)
      if (profileData) {
        setNotifications({
          email_notifications: profileData.email_notifications ?? true,
          sms_notifications: profileData.sms_notifications ?? false,
          booking_updates: profileData.booking_updates ?? true,
          payment_reminders: profileData.payment_reminders ?? true,
          marketing_emails: profileData.marketing_emails ?? false,
          security_alerts: profileData.security_alerts ?? true
        });

        setPrivacy({
          profile_visibility: profileData.profile_visibility ?? 'public',
          show_phone: profileData.show_phone ?? false,
          show_email: profileData.show_email ?? false,
          show_address: profileData.show_address ?? false,
          allow_messages: profileData.allow_messages ?? true
        });

        setSecurity({
          two_factor_enabled: profileData.two_factor_enabled ?? false,
          login_notifications: profileData.login_notifications ?? true,
          device_trust: profileData.device_trust ?? false
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async (settingsType: 'notifications' | 'privacy' | 'security') => {
    setIsSaving(true);
    try {
      let updateData = {};
      
      switch (settingsType) {
        case 'notifications':
          updateData = notifications;
          break;
        case 'privacy':
          updateData = privacy;
          break;
        case 'security':
          updateData = security;
          break;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (error) throw error;
      
      toast.success(`${settingsType.charAt(0).toUpperCase() + settingsType.slice(1)} settings saved!`);
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const changePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword
      });

      if (error) throw error;
      
      toast.success('Password updated successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error: any) {
      console.error('Error changing password:', error);
      toast.error(error.message || 'Failed to change password');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    if (!confirm('This will permanently delete all your data. Are you absolutely sure?')) {
      return;
    }

    setIsSaving(true);
    try {
      // Note: In a real app, you'd want to implement proper account deletion
      // This might involve multiple steps and data cleanup
      toast.error('Account deletion is not implemented yet. Please contact support.');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading settings...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={notifications.email_notifications}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, email_notifications: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
              </div>
              <Switch
                id="sms-notifications"
                checked={notifications.sms_notifications}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, sms_notifications: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="booking-updates">Booking Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified about booking changes</p>
              </div>
              <Switch
                id="booking-updates"
                checked={notifications.booking_updates}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, booking_updates: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="payment-reminders">Payment Reminders</Label>
                <p className="text-sm text-muted-foreground">Reminders for payments and invoices</p>
              </div>
              <Switch
                id="payment-reminders"
                checked={notifications.payment_reminders}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, payment_reminders: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Receive promotional content and tips</p>
              </div>
              <Switch
                id="marketing-emails"
                checked={notifications.marketing_emails}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, marketing_emails: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="security-alerts">Security Alerts</Label>
                <p className="text-sm text-muted-foreground">Important security notifications</p>
              </div>
              <Switch
                id="security-alerts"
                checked={notifications.security_alerts}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, security_alerts: checked }))
                }
              />
            </div>
          </div>

          <Separator />

          <Button 
            onClick={() => saveSettings('notifications')} 
            disabled={isSaving}
            className="w-full"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Notification Settings
          </Button>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="profile-visibility">Profile Visibility</Label>
              <Select 
                value={privacy.profile_visibility} 
                onValueChange={(value: 'public' | 'private' | 'friends') => 
                  setPrivacy(prev => ({ ...prev, profile_visibility: value }))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="friends">Friends Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-phone">Show Phone Number</Label>
                <p className="text-sm text-muted-foreground">Display phone number on profile</p>
              </div>
              <Switch
                id="show-phone"
                checked={privacy.show_phone}
                onCheckedChange={(checked) => 
                  setPrivacy(prev => ({ ...prev, show_phone: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-email">Show Email Address</Label>
                <p className="text-sm text-muted-foreground">Display email on profile</p>
              </div>
              <Switch
                id="show-email"
                checked={privacy.show_email}
                onCheckedChange={(checked) => 
                  setPrivacy(prev => ({ ...prev, show_email: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-address">Show Address</Label>
                <p className="text-sm text-muted-foreground">Display address on profile</p>
              </div>
              <Switch
                id="show-address"
                checked={privacy.show_address}
                onCheckedChange={(checked) => 
                  setPrivacy(prev => ({ ...prev, show_address: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="allow-messages">Allow Messages</Label>
                <p className="text-sm text-muted-foreground">Let other users message you</p>
              </div>
              <Switch
                id="allow-messages"
                checked={privacy.allow_messages}
                onCheckedChange={(checked) => 
                  setPrivacy(prev => ({ ...prev, allow_messages: checked }))
                }
              />
            </div>
          </div>

          <Separator />

          <Button 
            onClick={() => saveSettings('privacy')} 
            disabled={isSaving}
            className="w-full"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Privacy Settings
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <div className="flex items-center gap-2">
                {security.two_factor_enabled && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Enabled
                  </Badge>
                )}
                <Switch
                  id="two-factor"
                  checked={security.two_factor_enabled}
                  onCheckedChange={(checked) => 
                    setSecurity(prev => ({ ...prev, two_factor_enabled: checked }))
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="login-notifications">Login Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified of new logins</p>
              </div>
              <Switch
                id="login-notifications"
                checked={security.login_notifications}
                onCheckedChange={(checked) => 
                  setSecurity(prev => ({ ...prev, login_notifications: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="device-trust">Trust This Device</Label>
                <p className="text-sm text-muted-foreground">Skip verification on this device</p>
              </div>
              <Switch
                id="device-trust"
                checked={security.device_trust}
                onCheckedChange={(checked) => 
                  setSecurity(prev => ({ ...prev, device_trust: checked }))
                }
              />
            </div>
          </div>

          <Separator />

          <Button 
            onClick={() => saveSettings('security')} 
            disabled={isSaving}
            className="w-full"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Security Settings
          </Button>
        </CardContent>
      </Card>

      {/* Bank Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BankAccountForm />
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="mt-1"
            />
          </div>

          <Button 
            onClick={changePassword} 
            disabled={isSaving || !passwordForm.newPassword || !passwordForm.confirmPassword}
            className="w-full"
          >
            <Key className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
            <p className="text-sm text-red-600 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button 
              variant="destructive" 
              onClick={deleteAccount}
              disabled={isSaving}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
