
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SecureFormProps {
  onSubmit: (data: any) => Promise<void>;
  validate?: (data: any) => { success: boolean; errors?: any };
  children: React.ReactNode;
  className?: string;
}

const SecureForm: React.FC<SecureFormProps> = ({ 
  onSubmit, 
  validate, 
  children, 
  className = '' 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [csrfToken] = useState(() => crypto.randomUUID());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Add CSRF token
    data.csrfToken = csrfToken;
    
    if (validate) {
      const validation = validate(data);
      if (!validation.success) {
        toast.error('Please check your input and try again');
        return;
      }
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <div className="space-y-4">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Button) {
            return React.cloneElement(child as React.ReactElement<any>, { 
              disabled: isSubmitting,
              children: isSubmitting ? 'Loading...' : child.props.children
            });
          }
          return child;
        })}
      </div>
    </form>
  );
};

export default SecureForm;
