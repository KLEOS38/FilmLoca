import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  Send, 
  User, 
  Calendar,
  Clock,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  property_id: string;
  content: string;
  created_at: string;
  sender_name?: string;
  is_from_guest?: boolean;
}

interface Booking {
  id: string;
  property_id: string;
  property_title: string;
  start_date: string;
  end_date: string;
  status: string;
  guest_id?: string;
  host_id?: string;
  guest_name?: string;
  host_name?: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface MessagingSystemProps {
  bookingId?: string;
  propertyId?: string;
}

const MessagingSystem = ({ bookingId, propertyId }: MessagingSystemProps) => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<string>('');
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [showFaqs, setShowFaqs] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingChannelRef = useRef<RealtimeChannel | null>(null);
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const typingTimeoutRef = useRef<number | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setIsLoading(true);
      // Fetch bookings for guest (user_id = current user)
      const { data: guestBookings, error: guestError } = await supabase
        .from('bookings')
        .select(`
          id,
          user_id,
          property_id,
          start_date,
          end_date,
          status,
          properties:property_id(title, owner_id),
          profiles:user_id(name)
        `)
        .eq('user_id', user?.id)
        .in('status', ['confirmed', 'completed']);

      // Fetch bookings for host (properties.owner_id = current user)
      const { data: hostBookings, error: hostError } = await supabase
        .from('bookings')
        .select(`
          id,
          user_id,
          property_id,
          start_date,
          end_date,
          status,
          properties:property_id!inner(title, owner_id),
          profiles:user_id(name)
        `)
        .eq('properties.owner_id', user?.id)
        .in('status', ['confirmed', 'completed']);

      if (guestError && hostError) {
        console.error('Error fetching bookings:', guestError || hostError);
        setBookings([]);
        toast.error('Failed to load bookings');
        return;
      }

      const combined = [
        ...((guestBookings as Array<{ id: string; user_id: string; property_id: string; start_date: string; end_date: string; status: string; properties?: { title?: string; owner_id?: string }; profiles?: { name?: string } }>) || []),
        ...((hostBookings as Array<{ id: string; user_id: string; property_id: string; start_date: string; end_date: string; status: string; properties?: { title?: string; owner_id?: string }; profiles?: { name?: string } }>) || [])
      ];
      const uniqueById = new Map<string, { id: string; user_id: string; property_id: string; start_date: string; end_date: string; status: string; properties?: { title?: string; owner_id?: string }; profiles?: { name?: string } }>();
      for (const b of combined) uniqueById.set(b.id, b);

      const formattedBookings: Booking[] = Array.from(uniqueById.values()).map((booking) => ({
        id: booking.id,
        property_id: booking.property_id,
        property_title: booking.properties?.title || 'Unknown Property',
        start_date: booking.start_date,
        end_date: booking.end_date,
        status: booking.status,
        guest_id: booking.user_id,
        host_id: booking.properties?.owner_id,
        guest_name: booking.profiles?.name || 'Unknown Guest',
        host_name: 'Property Owner'
      }));

      setBookings(formattedBookings);
      if (formattedBookings.length > 0) setSelectedBooking(formattedBookings[0].id);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  const fetchFAQs = useCallback(async () => {
    try {
      // FAQ data can be fetched from a database table if needed in the future
      setFaqs([]);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      setFaqs([]);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchBookings();
      fetchFAQs();
    }
  }, [user, fetchBookings, fetchFAQs]);

  // Auto-select booking from query params or props if present
  useEffect(() => {
    if (!bookings.length) return;
    const qBookingId = searchParams.get('bookingId') || bookingId || undefined;
    const qPropertyId = searchParams.get('propertyId') || propertyId || undefined;
    if (qBookingId && bookings.some(b => b.id === qBookingId)) {
      setSelectedBooking(qBookingId);
      return;
    }
    if (qPropertyId) {
      const match = bookings.find(b => b.property_id === qPropertyId);
      if (match) setSelectedBooking(match.id);
    }
  }, [bookings, searchParams, bookingId, propertyId]);

  

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Realtime: subscribe to new messages and typing indicators per selected booking
  useEffect(() => {
    if (!selectedBooking || !user) return;

    const bookingInfo = bookings.find(b => b.id === selectedBooking);
    if (!bookingInfo) return;

    const otherUserId = user.id === bookingInfo.guest_id ? bookingInfo.host_id : bookingInfo.guest_id;

    const channel = supabase
      .channel(`messages:${bookingInfo.property_id}:${user.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `property_id=eq.${bookingInfo.property_id}`
      }, (payload) => {
        const row = payload.new as { id: string; sender_id: string; recipient_id: string; property_id: string; content: string; created_at: string };
        // Only add if message is between current user and the other participant
        const isRelevant = (row.sender_id === user.id && row.recipient_id === otherUserId) || (row.sender_id === otherUserId && row.recipient_id === user.id);
        if (isRelevant) {
          setMessages(prev => [...prev, {
            id: row.id,
            sender_id: row.sender_id,
            recipient_id: row.recipient_id,
            property_id: row.property_id,
            content: row.content,
            created_at: row.created_at,
            sender_name: undefined,
            is_from_guest: row.sender_id === user.id
          }]);
        }
      })
      .subscribe();

    // Typing indicator channel
    const typingChannel = supabase
      .channel(`typing:${bookingInfo.property_id}`)
      .on('broadcast', { event: 'typing' }, (payload: { payload?: { user_id?: string; isTyping?: boolean } }) => {
        const typingUser = payload?.payload?.user_id;
        const isTyping = !!payload?.payload?.isTyping;
        if (typingUser && typingUser !== user.id) {
          setIsOtherTyping(isTyping);
        }
      })
      .subscribe();

    typingChannelRef.current = typingChannel;

    return () => {
      setIsOtherTyping(false);
      supabase.removeChannel(channel);
      supabase.removeChannel(typingChannel);
      typingChannelRef.current = null;
    };
  }, [selectedBooking, bookings, user]);


  const fetchMessages = useCallback(async () => {
    if (!selectedBooking) return;

    try {
      const bookingInfo = bookings.find(b => b.id === selectedBooking);
      if (!bookingInfo) return;

      const otherUserId = user?.id === bookingInfo.guest_id ? bookingInfo.host_id : bookingInfo.guest_id;

      // Try to fetch messages from database (threaded by property and participants)
      const { data, error } = await supabase
        .from('messages')
        .select('id,sender_id,recipient_id,property_id,content,created_at')
        .eq('property_id', bookingInfo.property_id)
        .or(`and(sender_id.eq.${user?.id},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${user?.id})`)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        toast.error('Failed to load messages');
        setMessages([]);
        return;
      }

      const formattedMessages: Message[] = ((data as Array<{ id: string; sender_id: string; recipient_id: string; property_id: string; content: string; created_at: string }>) || []).map((message) => ({
        id: message.id,
        sender_id: message.sender_id,
        recipient_id: message.recipient_id,
        property_id: message.property_id,
        content: message.content,
        created_at: message.created_at,
        sender_name: undefined,
        is_from_guest: message.sender_id === user?.id
      }));

      setMessages(formattedMessages);

      // Mark messages addressed to current user as read
      try {
        await supabase
          .from('messages')
          .update({ is_read: true })
          .eq('recipient_id', user?.id as string)
          .eq('property_id', bookingInfo.property_id)
          .eq('is_read', false);
      } catch (e) {
        console.log('Failed to update read receipts', e);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    }
  }, [selectedBooking, bookings, user?.id]);

  useEffect(() => {
    if (selectedBooking) {
      fetchMessages();
    }
  }, [selectedBooking, fetchMessages]);

  

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedBooking) return;

    try {
      setIsLoading(true);

      const bookingInfo = bookings.find(b => b.id === selectedBooking);
      if (!bookingInfo) return;
      const recipientId = user?.id === bookingInfo.guest_id ? bookingInfo.host_id : bookingInfo.guest_id;

      // Try to send message to database
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: user?.id,
          recipient_id: recipientId,
          property_id: bookingInfo.property_id,
          content: newMessage.trim()
        });

      if (error) {
        console.error('Error sending message:', error);
        toast.error(`Failed to send message: ${error.message}`);
        return;
      }

      setNewMessage('');
      fetchMessages(); // Refresh messages
      toast.success('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const insertFAQ = (faq: FAQ) => {
    setNewMessage(faq.answer);
  };

  const selectedBookingData = bookings.find(b => b.id === selectedBooking);

  if (bookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Messaging
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              You need to have a confirmed booking to start messaging.
            </p>
            <Button asChild>
              <a href="/locations">Browse Properties</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Booking Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Select Booking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                onClick={() => setSelectedBooking(booking.id)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedBooking === booking.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-[#e5e5e5]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{booking.property_title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(booking.start_date), 'MMM d')} - {format(new Date(booking.end_date), 'MMM d, yyyy')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {booking.guest_name} ↔ {booking.host_name}
                    </p>
                  </div>
                  <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                    {booking.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      {selectedBooking && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat - {selectedBookingData?.property_title}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFaqs(!showFaqs)}
              >
                <HelpCircle className="h-4 w-4 mr-1" />
                FAQ
                {showFaqs ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* FAQ Section */}
            {showFaqs && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-3">Frequently Asked Questions</h4>
                <div className="space-y-2">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="text-sm">
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-left justify-start"
                        onClick={() => insertFAQ(faq)}
                      >
                        <strong>Q:</strong> {faq.question}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <ScrollArea className="h-96 mb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.is_from_guest ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.is_from_guest
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.is_from_guest ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {format(new Date(message.created_at), 'h:mm a')}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="flex gap-2">
              <Textarea
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  const bookingInfo = bookings.find(b => b.id === selectedBooking);
                  if (bookingInfo && typingChannelRef.current && user) {
                    typingChannelRef.current.send({
                      type: 'broadcast',
                      event: 'typing',
                      payload: { user_id: user.id, isTyping: true }
                    });
                    if (typingTimeoutRef.current) {
                      window.clearTimeout(typingTimeoutRef.current);
                    }
                    typingTimeoutRef.current = window.setTimeout(() => {
                      typingChannelRef.current?.send({
                        type: 'broadcast',
                        event: 'typing',
                        payload: { user_id: user.id, isTyping: false }
                      });
                    }, 1500);
                  }
                }}
                placeholder="Type your message..."
                className="flex-1"
                rows={2}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim() || isLoading}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {isOtherTyping && (
              <div className="text-xs text-muted-foreground mt-1">Typing...</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MessagingSystem;
