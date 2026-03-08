import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

// Nigerian bank codes (common ones)
const NIGERIAN_BANKS = [
  { code: '058', name: 'GTBank' },
  { code: '011', name: 'First Bank' },
  { code: '214', name: 'First City Monument Bank' },
  { code: '070', name: 'Fidelity Bank' },
  { code: '023', name: 'Citibank Nigeria' },
  { code: '050', name: 'Ecobank Nigeria' },
  { code: '562', name: 'Ekondo Microfinance Bank' },
  { code: '501', name: 'Enterprise Bank' },
  { code: '513', name: 'Fet' },
  { code: '214', name: 'First City Monument Bank' },
  { code: '070', name: 'Fidelity Bank' },
  { code: '011', name: 'First Bank of Nigeria' },
  { code: '214', name: 'First City Monument Bank' },
  { code: '070', name: 'Fidelity Bank' },
  { code: '058', name: 'Guaranty Trust Bank' },
  { code: '030', name: 'Heritage Bank' },
  { code: '301', name: 'Jaiz Bank' },
  { code: '082', name: 'Keystone Bank' },
  { code: '221', name: 'Stanbic IBTC Bank' },
  { code: '068', name: 'Standard Chartered Bank' },
  { code: '232', name: 'Sterling Bank' },
  { code: '100', name: 'Suntrust Bank' },
  { code: '032', name: 'Union Bank of Nigeria' },
  { code: '033', name: 'United Bank For Africa' },
  { code: '215', name: 'Unity Bank' },
  { code: '035', name: 'Wema Bank' },
  { code: '057', name: 'Zenith Bank' }
];

interface BankAccountFormProps {
  onSuccess?: () => void;
}

const BankAccountForm = ({ onSuccess }: BankAccountFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    bank_account_number: '',
    bank_name: '', // Changed from bank_code to bank_name for text input
    bank_account_name: ''
  });
  const [existingDetails, setExistingDetails] = useState<any>(null);

  useEffect(() => {
    fetchBankDetails();
  }, [user]);

  const fetchBankDetails = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('bank_account_number, bank_name, bank_account_name')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching bank details:', error);
        return;
      }

      if (data) {
        setExistingDetails(data);
        setBankDetails({
          bank_account_number: data.bank_account_number || '',
          bank_name: data.bank_name || '',
          bank_account_name: data.bank_account_name || ''
        });
      }
    } catch (error) {
      console.error('Error fetching bank details:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          bank_account_number: bankDetails.bank_account_number,
          bank_name: bankDetails.bank_name,
          bank_account_name: bankDetails.bank_account_name,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      toast.success('Bank account details saved successfully!');
      setExistingDetails(bankDetails);
      onSuccess?.();
    } catch (error: any) {
      console.error('Error saving bank details:', error);
      toast.error(error.message || 'Failed to save bank account details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">Bank Account Details</h3>
        </div>

        {existingDetails && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Bank details saved</span>
            </div>
            <div className="text-sm text-green-600 mt-1">
              {existingDetails.bank_name || 'Bank'} - ****{existingDetails.bank_account_number?.slice(-4)}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bank_name">Bank Name</Label>
            <Input
              id="bank_name"
              type="text"
              placeholder="Enter your bank name (e.g., GTBank, First Bank, UBA)"
              value={bankDetails.bank_name}
              onChange={(e) => setBankDetails(prev => ({ ...prev, bank_name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bank_account_number">Account Number</Label>
            <Input
              id="bank_account_number"
              type="text"
              placeholder="Enter your account number"
              value={bankDetails.bank_account_number}
              onChange={(e) => setBankDetails(prev => ({ ...prev, bank_account_number: e.target.value }))}
              maxLength={10}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bank_account_name">Account Name</Label>
            <Input
              id="bank_account_name"
              type="text"
              placeholder="Enter account holder name"
              value={bankDetails.bank_account_name}
              onChange={(e) => setBankDetails(prev => ({ ...prev, bank_account_name: e.target.value }))}
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading || !bankDetails.bank_name || !bankDetails.bank_account_number || !bankDetails.bank_account_name}
            className="w-full"
          >
            {loading ? 'Saving...' : 'Save Bank Details'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BankAccountForm;
