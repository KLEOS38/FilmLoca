import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface WhatsAppChatProps {
  phoneNumber?: string;
  defaultMessage?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showOnPages?: string[];
  hideOnPages?: string[];
}

const WhatsAppChat: React.FC<WhatsAppChatProps> = ({
  phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '+2341234567890',
  defaultMessage = 'Hello! I need help with FilmLoca.',
  position = 'bottom-right',
  showOnPages = [],
  hideOnPages = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState(defaultMessage);
  const location = useLocation();
  const currentPath = location.pathname;

  // Check if widget should be visible
  const shouldShow = () => {
    // If hideOnPages is specified and current path matches, hide
    if (hideOnPages.length > 0 && hideOnPages.some(page => currentPath.includes(page))) {
      return false;
    }

    // If showOnPages is specified, only show on those pages
    if (showOnPages.length > 0 && !showOnPages.some(page => currentPath.includes(page))) {
      return false;
    }

    return true;
  };

  // Format phone number (remove all non-numeric characters)
  const formatPhoneNumber = (phone: string): string => {
    return phone.replace(/\D/g, '');
  };

  // Open WhatsApp with message
  const openWhatsApp = () => {
    const formattedPhone = formatPhoneNumber(phoneNumber);
    const message = encodeURIComponent(customMessage || defaultMessage);
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setCustomMessage(defaultMessage);
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      openWhatsApp();
    }
  };

  if (!shouldShow()) {
    return null;
  }

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  return (
    <div className={cn('fixed z-50', positionClasses[position])}>
      {/* Chat Widget */}
      {isOpen && (
        <div className="w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="bg-black text-white p-4 flex items-center justify-between border-b border-red-500">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 border-2 border-red-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">WhatsApp Support</h3>
                <p className="text-xs opacity-90">We typically reply in minutes</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-red-500/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Body */}
          <div className="p-4 bg-gray-50">
            <div className="mb-4">
              <p className="text-sm text-gray-700 mb-2">
                Start a conversation with us on WhatsApp. We're here to help!
              </p>
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full"
              />
              <Button
                onClick={openWhatsApp}
                className="w-full bg-black hover:bg-gray-800 text-white border border-red-500"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300',
          'bg-black hover:bg-gray-800 text-white border border-red-500',
          'flex items-center justify-center',
          isOpen && 'rotate-180'
        )}
        aria-label="Open WhatsApp chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
};

export default WhatsAppChat;

