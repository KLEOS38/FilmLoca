import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, Lock, HelpCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  property_id: string;
  content: string;
  created_at: string;
  sender_name?: string;
  sender_avatar?: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  host_id: string;
  created_at: string;
}

interface Booking {
  id: string;
  property_id: string;
  user_id: string; // guest_id
  start_date: string;
  end_date: string;
  status: string;
  property_title: string;
  host_id: string;
  host_name: string;
  host_avatar?: string;
  guest_name?: string;
  guest_avatar?: string;
  is_user_guest: boolean; // true if current user is the guest, false if host
}

interface BookingGatedMessagingProps {
  bookingId?: string;
  propertyId?: string;
  forceHostMode?: boolean; // Explicitly set host mode (for hosting dashboard)
}

const BookingGatedMessaging: React.FC<BookingGatedMessagingProps> = ({ 
  bookingId, 
  propertyId,
  forceHostMode = false
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isHost, setIsHost] = useState(forceHostMode || false); // Initialize from prop
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, bookingId, propertyId]);

  useEffect(() => {
    if (selectedBooking && user) {
      console.log('Selected booking changed, fetching messages for:', selectedBooking.id);
      fetchMessages();
      fetchFAQs();
    } else {
      console.log('No selected booking or user:', { selectedBooking: !!selectedBooking, user: !!user });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBooking?.id, user?.id]); // fetchMessages and fetchFAQs use current state values

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Realtime subscription for new messages
  useEffect(() => {
    if (!selectedBooking || !user) return;

    const channel = supabase
      .channel(`messages:${selectedBooking.property_id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `property_id=eq.${selectedBooking.property_id}`
      }, (payload) => {
        const newMessage = payload.new as any;
        // Only add if message involves current user
        if (newMessage.sender_id === user.id || newMessage.recipient_id === user.id) {
          fetchMessages(); // Refresh messages
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedBooking, user]);

  const fetchUserBookings = async () => {
    try {
      setIsLoading(true);
      if (!user?.id) return;

      // Check if user is a host (owns any properties) and fetch all owned properties
      // Always fetch owned properties (needed for host bookings), but use forceHostMode to override isHost state
      const { data: ownedProperties, error: propertiesError } = await supabase
        .from('properties')
        .select('id')
        .eq('owner_id', user.id);
      
      // Set isHost based on forceHostMode or if user owns properties
      if (forceHostMode) {
        setIsHost(true);
      } else {
        setIsHost((ownedProperties?.length || 0) > 0);
      }

      const bookings: Booking[] = [];
      const conversationsMap = new Map<string, Booking>();

      // First, fetch all messages where user is involved to find all conversations
      const { data: allMessages, error: messagesError } = await supabase
        .from('messages')
        .select('property_id, sender_id, recipient_id')
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`);

      if (!messagesError && allMessages && allMessages.length > 0) {
        // Get unique property IDs from messages
        const propertyIds = [...new Set(allMessages.map((msg: any) => msg.property_id).filter(Boolean))];
        
        // For each property, determine the other party and create a conversation
        for (const propId of propertyIds) {
          if (!propId) continue;
          
          const propertyMessages = allMessages.filter((msg: any) => msg.property_id === propId);
          
          // Find the other user ID (not the current user)
          let otherUserId: string | null = null;
          for (const msg of propertyMessages) {
            if (msg.sender_id === user.id && msg.recipient_id !== user.id) {
              otherUserId = msg.recipient_id;
              break;
            } else if (msg.recipient_id === user.id && msg.sender_id !== user.id) {
              otherUserId = msg.sender_id;
              break;
            }
          }

          if (otherUserId) {
            // Fetch property info
            const { data: propertyData } = await supabase
              .from('properties')
              .select('id, title, owner_id')
              .eq('id', propId)
              .single();

            if (propertyData) {
              const isUserOwner = propertyData.owner_id === user.id;
              
              // Fetch other party profile
              const { data: otherProfile } = await supabase
                .from('profiles')
                .select('id, name, avatar_url')
                .eq('id', otherUserId)
                .single();

              // Try to find a related booking
              const { data: relatedBooking } = await supabase
                .from('bookings')
                .select('id, user_id, property_id, start_date, end_date, status')
                .eq('property_id', propId)
                .or(`user_id.eq.${user.id},user_id.eq.${otherUserId}`)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

              const conversationKey = `${propId}-${otherUserId}`;
              if (!conversationsMap.has(conversationKey)) {
                conversationsMap.set(conversationKey, {
                  id: relatedBooking?.id || `conv-${propId}-${otherUserId}`,
                  property_id: propId,
                  user_id: isUserOwner ? otherUserId : user.id,
                  start_date: relatedBooking?.start_date || new Date().toISOString(),
                  end_date: relatedBooking?.end_date || new Date().toISOString(),
                  status: relatedBooking?.status || 'conversation',
                  property_title: propertyData.title || 'Unknown Property',
                  host_id: propertyData.owner_id || '',
                  host_name: isUserOwner ? 'You' : (otherProfile?.name || 'Property Owner'),
                  host_avatar: isUserOwner ? undefined : otherProfile?.avatar_url,
                  guest_name: isUserOwner ? (otherProfile?.name || 'Guest') : undefined,
                  guest_avatar: isUserOwner ? otherProfile?.avatar_url : undefined,
                  is_user_guest: !isUserOwner
                });
              }
            }
          }
        }
      }

      // Also fetch bookings where user is the guest (user_id = current user)
      const { data: guestBookingsData, error: guestError } = await supabase
        .from('bookings')
        .select('id, user_id, property_id, start_date, end_date, status')
        .eq('user_id', user.id)
        .in('status', ['confirmed', 'completed', 'pending']);

      if (!guestError && guestBookingsData) {
        for (const booking of guestBookingsData) {
          const { data: propertyData } = await supabase
            .from('properties')
            .select('id, title, owner_id')
            .eq('id', booking.property_id)
            .single();

          if (propertyData) {
            const { data: hostProfile } = await supabase
              .from('profiles')
              .select('id, name, avatar_url')
              .eq('id', propertyData.owner_id)
              .single();

            const conversationKey = `${booking.property_id}-${propertyData.owner_id}`;
            if (!conversationsMap.has(conversationKey)) {
              conversationsMap.set(conversationKey, {
                id: booking.id,
                property_id: booking.property_id,
                user_id: booking.user_id,
                start_date: booking.start_date,
                end_date: booking.end_date,
                status: booking.status,
                property_title: propertyData.title || 'Unknown Property',
                host_id: propertyData.owner_id || '',
                host_name: hostProfile?.name || 'Property Owner',
                host_avatar: hostProfile?.avatar_url,
                is_user_guest: true
              });
            } else {
              // Update existing conversation with booking info if this booking is more recent
              const existing = conversationsMap.get(conversationKey);
              if (existing && booking.status === 'confirmed') {
                existing.id = booking.id;
                existing.start_date = booking.start_date;
                existing.end_date = booking.end_date;
                existing.status = booking.status;
              }
            }
          }
        }
      }

      // Fetch bookings where user is the host (properties.owner_id = current user)
      // Use the already fetched ownedProperties
      if (!propertiesError && ownedProperties) {
        const propertyIds = ownedProperties.map(p => p.id);

        if (propertyIds.length > 0) {
          const { data: hostBookingsData, error: hostError } = await supabase
            .from('bookings')
            .select('id, user_id, property_id, start_date, end_date, status')
            .in('property_id', propertyIds)
            .in('status', ['confirmed', 'completed', 'pending']);

          if (!hostError && hostBookingsData) {
            for (const booking of hostBookingsData) {
              const { data: propertyData } = await supabase
                .from('properties')
                .select('id, title, owner_id')
                .eq('id', booking.property_id)
                .single();

              if (propertyData) {
                const { data: guestProfile } = await supabase
                  .from('profiles')
                  .select('id, name, avatar_url')
                  .eq('id', booking.user_id)
                  .single();

                const conversationKey = `${booking.property_id}-${booking.user_id}`;
                if (!conversationsMap.has(conversationKey)) {
                  conversationsMap.set(conversationKey, {
                    id: booking.id,
                    property_id: booking.property_id,
                    user_id: booking.user_id,
                    start_date: booking.start_date,
                    end_date: booking.end_date,
                    status: booking.status,
                    property_title: propertyData.title || 'Unknown Property',
                    host_id: propertyData.owner_id || user.id,
                    host_name: 'You',
                    guest_name: guestProfile?.name || 'Guest',
                    guest_avatar: guestProfile?.avatar_url,
                    is_user_guest: false
                  });
                } else {
                  // Update existing conversation with booking info if this booking is more recent
                  const existing = conversationsMap.get(conversationKey);
                  if (existing && booking.status === 'confirmed') {
                    existing.id = booking.id;
                    existing.start_date = booking.start_date;
                    existing.end_date = booking.end_date;
                    existing.status = booking.status;
                  }
                }
              }
            }
          }
        }
      }

      // Convert map to array
      const allConversations = Array.from(conversationsMap.values());
      setUserBookings(allConversations);

      // Handle propertyId prop - create or select conversation for this property
      if (propertyId && user?.id) {
        // Check if conversation already exists for this property
        let existingConversation = allConversations.find(c => c.property_id === propertyId);
        
        if (!existingConversation) {
          // Create a new conversation entry for this property
          const { data: propertyData } = await supabase
            .from('properties')
            .select('id, title, owner_id')
            .eq('id', propertyId)
            .single();

          if (propertyData) {
            const isUserOwner = propertyData.owner_id === user.id;
            const otherPartyId = isUserOwner ? null : propertyData.owner_id; // If guest, we know the host; if host, we need a guest (will be set when message is sent)

            if (!isUserOwner && otherPartyId) {
              // User is guest, fetch host profile
              const { data: hostProfile } = await supabase
                .from('profiles')
                .select('id, name, avatar_url')
                .eq('id', otherPartyId)
                .single();

              existingConversation = {
                id: `conv-${propertyId}-${otherPartyId}`,
                property_id: propertyId,
                user_id: user.id,
                start_date: new Date().toISOString(),
                end_date: new Date().toISOString(),
                status: 'conversation',
                property_title: propertyData.title || 'Unknown Property',
                host_id: otherPartyId,
                host_name: hostProfile?.name || 'Property Owner',
                host_avatar: hostProfile?.avatar_url,
                is_user_guest: true
              };
              allConversations.push(existingConversation);
              setUserBookings(allConversations);
            }
          }
        }

        if (existingConversation) {
          setSelectedBooking(existingConversation);
        }
      } else if (bookingId) {
        // Auto-select booking if provided
        const booking = allConversations.find(b => b.id === bookingId);
        if (booking) {
          setSelectedBooking(booking);
        }
      } else if (allConversations.length > 0 && !selectedBooking && !propertyId) {
        // Auto-select first conversation if none selected and no propertyId
        setSelectedBooking(allConversations[0]);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setIsLoading(false);
      toast.error('Failed to load conversations');
    }
  };

  const fetchMessages = async () => {
    if (!selectedBooking || !user) return;

    try {
      // Determine the other user ID
      const otherUserId = selectedBooking.is_user_guest 
        ? selectedBooking.host_id 
        : selectedBooking.user_id;

      // Fetch messages between current user and the other party for this property
      // PostgREST doesn't support nested AND/OR easily, so we filter by property first,
      // then filter in JavaScript, OR use two queries and combine
      // Alternative: Use a single query with proper OR syntax
      const { data, error } = await supabase
        .from('messages')
        .select('id, sender_id, recipient_id, property_id, content, created_at')
        .eq('property_id', selectedBooking.property_id)
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: true });

      // Filter in JavaScript to ensure we only get messages between these two users
      const filteredData = (data || []).filter((msg: any) => {
        return (
          (msg.sender_id === user.id && msg.recipient_id === otherUserId) ||
          (msg.sender_id === otherUserId && msg.recipient_id === user.id)
        );
      });

      if (error) {
        console.error('Error fetching messages:', error);
        console.error('Query details:', {
          propertyId: selectedBooking.property_id,
          userId: user.id,
          otherUserId,
          errorCode: error.code,
          errorMessage: error.message,
          errorDetails: error.details
        });
        toast.error(`Failed to load messages: ${error.message}`);
        return;
      }

      console.log('Messages fetched successfully:', {
        count: filteredData?.length || 0,
        rawCount: data?.length || 0,
        propertyId: selectedBooking.property_id,
        userId: user.id,
        otherUserId,
        messages: filteredData
      });

      // Fetch sender profiles for all messages
      const senderIds = [...new Set((filteredData || []).map((msg: any) => msg.sender_id))];
      let profileMap = new Map();
      
      if (senderIds.length > 0) {
        const { data: senderProfiles, error: profileError } = await supabase
          .from('profiles')
          .select('id, name, avatar_url')
          .in('id', senderIds);

        if (profileError) {
          console.error('Error fetching sender profiles:', profileError);
          console.error('Profile query details:', {
            senderIds,
            errorCode: profileError.code,
            errorMessage: profileError.message
          });
        } else {
          console.log('Profiles fetched:', {
            requested: senderIds.length,
            received: senderProfiles?.length || 0,
            profiles: senderProfiles
          });
        }

        profileMap = new Map(
          (senderProfiles || []).map((profile: any) => [profile.id, profile])
        );
      }

      // Format messages
      const formattedMessages: Message[] = (filteredData || []).map((msg: any) => {
        const senderProfile = profileMap.get(msg.sender_id);
        return {
          id: msg.id,
          sender_id: msg.sender_id,
          recipient_id: msg.recipient_id,
          property_id: msg.property_id,
          content: msg.content,
          created_at: msg.created_at,
          sender_name: senderProfile?.name || 'Unknown',
          sender_avatar: senderProfile?.avatar_url
        };
      });

      setMessages(formattedMessages);

      // Mark messages as read
      try {
        await supabase
          .from('messages')
          .update({ is_read: true })
          .eq('recipient_id', user.id)
          .eq('property_id', selectedBooking.property_id)
          .eq('is_read', false);
      } catch (e) {
        console.error('Failed to update read receipts:', e);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    }
  };

  const fetchFAQs = async () => {
    try {
      // FAQ data can be fetched from a database table if needed in the future
      // For now, show empty FAQs or remove the FAQ section
      setFaqs([]);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      setFaqs([]);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedBooking || !user) {
      console.log('Cannot send message:', { 
        hasMessage: !!newMessage.trim(), 
        hasBooking: !!selectedBooking, 
        hasUser: !!user,
        booking: selectedBooking 
      });
      return;
    }

    try {
      setIsSending(true);
      console.log('Sending message for booking:', selectedBooking.id);

      // Determine recipient ID
      // For guests: recipient is the host (property owner)
      // For hosts: recipient is the guest (user who booked or is messaging about the property)
      let recipientId: string | null = null;
      
      if (selectedBooking.is_user_guest) {
        // User is guest, message goes to host
        recipientId = selectedBooking.host_id;
      } else {
        // User is host, message goes to guest
        // For hosts, the user_id field contains the guest's ID
        recipientId = selectedBooking.user_id;
        
        // If user_id is not set (conversation without booking), try to find guest from messages
        if (!recipientId && selectedBooking.property_id) {
          // Fetch recent messages for this property to find the guest
          const { data: recentMessages } = await supabase
            .from('messages')
            .select('sender_id, recipient_id')
            .eq('property_id', selectedBooking.property_id)
            .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
            .order('created_at', { ascending: false })
            .limit(10);
          
          if (recentMessages && recentMessages.length > 0) {
            // Find the other party (not the current user)
            for (const msg of recentMessages) {
              if (msg.sender_id === user.id && msg.recipient_id !== user.id) {
                recipientId = msg.recipient_id;
                break;
              } else if (msg.recipient_id === user.id && msg.sender_id !== user.id) {
                recipientId = msg.sender_id;
                break;
              }
            }
          }
        }
      }

      if (!recipientId || !selectedBooking.property_id) {
        console.error('Missing recipient ID or property ID:', { 
          recipientId, 
          propertyId: selectedBooking.property_id,
          booking: selectedBooking,
          isUserGuest: selectedBooking.is_user_guest
        });
        toast.error('Cannot send message: Missing recipient or property information');
        setIsSending(false);
        return;
      }

      console.log('Sending message to:', { recipientId, propertyId: selectedBooking.property_id, content: newMessage.trim() });

      // Send message to database
      const { data: insertedMessage, error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          recipient_id: recipientId,
          property_id: selectedBooking.property_id,
          content: newMessage.trim()
        })
        .select()
        .single();

      if (error) {
        console.error('Error sending message:', error);
        console.error('Insert details:', {
          sender_id: user.id,
          recipient_id: recipientId,
          property_id: selectedBooking.property_id,
          content: newMessage.trim(),
          errorCode: error.code,
          errorMessage: error.message,
          errorDetails: error.details
        });
        toast.error(`Failed to send message: ${error.message}`);
        setIsSending(false);
        return;
      }

      console.log('Message sent successfully:', insertedMessage);
      setNewMessage('');
      // Refresh messages immediately
      await fetchMessages();
      toast.success('Message sent!');
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error(`Failed to send message: ${error?.message || 'Unknown error'}`);
    } finally {
      setIsSending(false);
    }
  };

  const selectBooking = (booking: Booking) => {
    console.log('Selecting booking:', booking);
    if (!booking) {
      console.error('No booking provided to selectBooking');
      return;
    }
    setSelectedBooking(booking);
    setMessages([]); // Clear messages while loading
  };

  // Get the other party's name and avatar
  const getOtherPartyInfo = () => {
    if (!selectedBooking) return { name: 'Unknown', avatar: undefined };
    
    if (selectedBooking.is_user_guest) {
      return {
        name: selectedBooking.host_name,
        avatar: selectedBooking.host_avatar
      };
    } else {
      return {
        name: selectedBooking.guest_name || 'Guest',
        avatar: selectedBooking.guest_avatar
      };
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        <span className="ml-2">Loading messages...</span>
      </div>
    );
  }

  // No need to block - show empty state instead

  const otherParty = getOtherPartyInfo();

  return (
    <div className="space-y-6">
      {/* Conversations/Bookings Selection */}
      {!selectedBooking && (
        <Card>
          <CardHeader>
            <CardTitle>Your Messages</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Select a conversation to view messages
            </p>
          </CardHeader>
          <CardContent>
            {userBookings.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground mb-2">No messages yet</p>
                {isHost ? (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">
                      Conversations with guests who book your properties will appear here. You can message guests directly about their bookings or property inquiries.
                    </p>
                    <Button onClick={() => window.location.href = '/profile?tab=dashboard&mode=host'}>
                      View Dashboard
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start a conversation by booking a property. You can message hosts about properties you're interested in.
                    </p>
                    <Button onClick={() => window.location.href = '/locations'}>
                      Browse Properties
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {userBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => selectBooking(booking)}
                >
                  <div>
                    <h3 className="font-semibold">{booking.property_title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(booking.start_date), 'MMM d, yyyy')} - {format(new Date(booking.end_date), 'MMM d, yyyy')}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {booking.status !== 'conversation' && (
                        <Badge variant={booking.status === 'confirmed' ? 'default' : booking.status === 'completed' ? 'secondary' : 'outline'}>
                          {booking.status}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {booking.is_user_guest ? `Host: ${booking.host_name}` : `Guest: ${booking.guest_name || 'Guest'}`}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const subject = `Slate Dispute: ${booking.id}`;
                        const body = `Hello Admin,

I'd like to raise a dispute for slate with reference/ID: ${booking.id}.

Property: ${booking.property_title}
Dates: ${format(new Date(booking.start_date), 'MMM d, yyyy')} - ${format(new Date(booking.end_date), 'MMM d, yyyy')}

Concern:
`;
                        const mailtoLink = `mailto:hello@filmloca.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                        window.location.href = mailtoLink;
                      }}
                    >
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Dispute
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        console.log('Message button clicked for booking:', booking);
                        selectBooking(booking);
                      }}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {booking.is_user_guest ? 'Message Host' : 'Message Guest'}
                    </Button>
                  </div>
                </div>
              ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {selectedBooking && (
        <>
          {/* Chat Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={otherParty.avatar} />
                    <AvatarFallback>
                      {otherParty.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{otherParty.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{selectedBooking.property_title}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedBooking(null)}
                >
                  Back to Messages
                </Button>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 gap-6">
            {/* Messages Section */}
            <div>
              <Card className="h-[500px] flex flex-col">
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {/* Messages List */}
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                    {messages.length === 0 ? (
                      <div className="text-center text-muted-foreground py-8">
                        <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No messages yet. Start the conversation!</p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${
                            message.sender_id === user?.id ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          {message.sender_id !== user?.id && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={message.sender_avatar} />
                              <AvatarFallback>
                                {message.sender_name?.charAt(0).toUpperCase() || 'U'}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                              message.sender_id === user?.id
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-100'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender_id === user?.id ? 'opacity-80' : 'text-muted-foreground'
                            }`}>
                              {format(new Date(message.created_at), 'h:mm a')}
                            </p>
                          </div>
                          {message.sender_id === user?.id && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user?.user_metadata?.avatar_url} />
                              <AvatarFallback>
                                {user?.user_metadata?.name?.charAt(0).toUpperCase() || 'Y'}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      disabled={isSending}
                    />
                    <Button 
                      onClick={sendMessage} 
                      disabled={!newMessage.trim() || isSending}
                    >
                      {isSending ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingGatedMessaging;
