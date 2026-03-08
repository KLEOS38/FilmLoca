import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Send, 
  ArrowLeft, 
  Search,
  Filter,
  Bell,
  Mail,
  Calendar,
  AlertTriangle,
  User,
  Home
} from 'lucide-react';
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
  is_read?: boolean;
}

interface Conversation {
  id: string;
  property_id: string;
  property_title: string;
  other_user_id: string;
  other_user_name: string;
  other_user_avatar?: string;
  last_message?: string;
  last_message_time?: string;
  unread_count: number;
  is_user_guest: boolean;
  booking_status?: string;
  booking_id?: string;
}

const UnifiedMessages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'host' | 'guest'>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      setIsLoading(true);
      if (!user?.id) return;

      // Fetch all messages where user is involved
      const { data: userMessages, error: messagesError } = await supabase
        .from('messages')
        .select('property_id, sender_id, recipient_id, content, created_at, is_read')
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (messagesError) {
        console.error('Error fetching messages:', messagesError);
        toast.error('Failed to load conversations');
        return;
      }

      // Group messages by property and other user to create conversations
      const conversationMap = new Map<string, Conversation>();

      // Get unique property-user combinations
      const propertyUserPairs = new Set<string>();
      (userMessages || []).forEach(msg => {
        const otherUserId = msg.sender_id === user.id ? msg.recipient_id : msg.sender_id;
        const key = `${msg.property_id}-${otherUserId}`;
        propertyUserPairs.add(key);
      });

      // For each conversation, fetch details and latest message
      for (const pairKey of Array.from(propertyUserPairs)) {
        const [propertyId, otherUserId] = pairKey.split('-');
        
        // Fetch property details
        const { data: property } = await supabase
          .from('properties')
          .select('id, title, owner_id')
          .eq('id', propertyId)
          .single();

        if (!property) continue;

        // Fetch other user's profile
        const { data: otherProfile } = await supabase
          .from('profiles')
          .select('id, name, avatar_url')
          .eq('id', otherUserId)
          .single();

        // Get messages for this conversation
        const conversationMessages = (userMessages || []).filter(msg => {
          const otherId = msg.sender_id === user.id ? msg.recipient_id : msg.sender_id;
          return msg.property_id === propertyId && otherId === otherUserId;
        });

        // Find latest message
        const latestMessage = conversationMessages[0];
        
        // Count unread messages
        const unreadCount = conversationMessages.filter(msg => 
          msg.recipient_id === user.id && !msg.is_read
        ).length;

        // Determine if user is guest or host
        const isUserGuest = property.owner_id !== user.id;

        // Try to find related booking
        const { data: booking } = await supabase
          .from('bookings')
          .select('id, status, user_id')
          .eq('property_id', propertyId)
          .or(`user_id.eq.${user.id},user_id.eq.${otherUserId}`)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        const conversation: Conversation = {
          id: pairKey,
          property_id: propertyId,
          property_title: property.title || 'Unknown Property',
          other_user_id: otherUserId,
          other_user_name: otherProfile?.name || (isUserGuest ? 'Property Owner' : 'Guest'),
          other_user_avatar: otherProfile?.avatar_url,
          last_message: latestMessage?.content,
          last_message_time: latestMessage?.created_at,
          unread_count: unreadCount,
          is_user_guest: isUserGuest,
          booking_status: booking?.status,
          booking_id: booking?.id
        };

        conversationMap.set(pairKey, conversation);
      }

      const allConversations = Array.from(conversationMap.values())
        .sort((a, b) => {
          // Sort by latest message time, unread count, then property title
          if (a.unread_count > 0 && b.unread_count === 0) return -1;
          if (a.unread_count === 0 && b.unread_count > 0) return 1;
          
          const aTime = a.last_message_time ? new Date(a.last_message_time).getTime() : 0;
          const bTime = b.last_message_time ? new Date(b.last_message_time).getTime() : 0;
          
          return bTime - aTime;
        });

      setConversations(allConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast.error('Failed to load conversations');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async () => {
    if (!selectedConversation || !user) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('id, sender_id, recipient_id, property_id, content, created_at, is_read')
        .eq('property_id', selectedConversation.property_id)
        .or(`and(sender_id.eq.${user.id},recipient_id.eq.${selectedConversation.other_user_id}),and(sender_id.eq.${selectedConversation.other_user_id},recipient_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        toast.error('Failed to load messages');
        return;
      }

      // Fetch sender profiles
      const senderIds = [...new Set((data || []).map((msg: { sender_id: string }) => msg.sender_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, name, avatar_url')
        .in('id', senderIds);

      const profileMap = new Map(
        (profiles || []).map((profile: { id: string; name: string; avatar_url?: string }) => [profile.id, profile])
      );

      const formattedMessages: Message[] = (data || []).map((msg: {
        id: string;
        sender_id: string;
        recipient_id: string;
        property_id: string;
        content: string;
        created_at: string;
        is_read?: boolean;
      }) => ({
        id: msg.id,
        sender_id: msg.sender_id,
        recipient_id: msg.recipient_id,
        property_id: msg.property_id,
        content: msg.content,
        created_at: msg.created_at,
        sender_name: profileMap.get(msg.sender_id)?.name,
        sender_avatar: profileMap.get(msg.sender_id)?.avatar_url,
        is_read: msg.is_read
      }));

      setMessages(formattedMessages);

      // Mark messages as read
      const unreadMessageIds = formattedMessages
        .filter(msg => msg.recipient_id === user.id && !msg.is_read)
        .map(msg => msg.id);

      if (unreadMessageIds.length > 0) {
        await supabase
          .from('messages')
          .update({ is_read: true })
          .in('id', unreadMessageIds);
        
        // Update conversations to reflect read status
        fetchConversations();
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !user) return;

    try {
      setIsSending(true);

      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          recipient_id: selectedConversation.other_user_id,
          property_id: selectedConversation.property_id,
          content: newMessage.trim()
        });

      if (error) {
        console.error('Error sending message:', error);
        toast.error(`Failed to send message: ${error.message}`);
        return;
      }

      setNewMessage('');
      await fetchMessages();
      toast.success('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.property_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.other_user_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'host' && !conv.is_user_guest) ||
                         (filter === 'guest' && conv.is_user_guest);
    
    return matchesSearch && matchesFilter;
  });

  const totalUnreadCount = conversations.reduce((sum, conv) => sum + conv.unread_count, 0);

  // Real-time subscription for new messages
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `or(sender_id=eq.${user.id},recipient_id=eq.${user.id})`
      }, (payload) => {
        const newMessage = payload.new as {
          id: string;
          sender_id: string;
          recipient_id: string;
          property_id: string;
          content: string;
          created_at: string;
          is_read: boolean;
        };
        fetchConversations(); // Refresh conversations
        if (selectedConversation && 
            (newMessage.property_id === selectedConversation.property_id) &&
            ((newMessage.sender_id === user.id && newMessage.recipient_id === selectedConversation.other_user_id) ||
             (newMessage.sender_id === selectedConversation.other_user_id && newMessage.recipient_id === user.id))) {
          fetchMessages(); // Refresh current conversation
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, selectedConversation]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading messages...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (selectedConversation) {
    return (
      <div className="space-y-6">
        {/* Chat Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedConversation(null)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Avatar>
                  <AvatarImage src={selectedConversation.other_user_avatar} />
                  <AvatarFallback>
                    {selectedConversation.other_user_name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{selectedConversation.other_user_name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{selectedConversation.property_title}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedConversation.booking_status && (
                  <Badge variant={selectedConversation.booking_status === 'confirmed' ? 'default' : 'secondary'}>
                    {selectedConversation.booking_status}
                  </Badge>
                )}
                <Badge variant="outline">
                  {selectedConversation.is_user_guest ? 'Guest' : 'Host'}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Messages */}
        <Card className="h-[500px] flex flex-col">
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
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
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender_id === user?.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender_id === user?.id ? 'text-blue-100' : 'text-gray-500'
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
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
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
                  disabled={!newMessage.trim() || isSending}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Messages
            {totalUnreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {totalUnreadCount}
              </Badge>
            )}
          </CardTitle>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'guest' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('guest')}
            >
              <Home className="h-4 w-4 mr-1" />
              As Guest
            </Button>
            <Button
              variant={filter === 'host' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('host')}
            >
              <User className="h-4 w-4 mr-1" />
              As Host
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredConversations.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-2">
              {searchQuery ? 'No conversations found' : 'No messages yet'}
            </p>
            {!searchQuery && (
              <p className="text-sm text-muted-foreground mb-4">
                Start a conversation by booking a property or hosting guests
              </p>
            )}
            {!searchQuery && (
              <Button onClick={() => window.location.href = '/locations'}>
                Browse Properties
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <Avatar>
                    <AvatarImage src={conversation.other_user_avatar} />
                    <AvatarFallback>
                      {conversation.other_user_name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{conversation.other_user_name}</h3>
                      {conversation.unread_count > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {conversation.unread_count}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conversation.property_title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {conversation.is_user_guest ? 'Guest' : 'Host'}
                      </Badge>
                      {conversation.booking_status && (
                        <Badge variant={conversation.booking_status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">
                          {conversation.booking_status}
                        </Badge>
                      )}
                    </div>
                    {conversation.last_message && (
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {conversation.last_message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {conversation.last_message_time && (
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(conversation.last_message_time), 'MMM d')}
                    </span>
                  )}
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        const subject = `Slate Dispute: ${conversation.booking_id || conversation.id}`;
                        const body = `Hello Admin,

I'd like to raise a dispute for slate with reference/ID: ${conversation.booking_id || conversation.id}.

Property: ${conversation.property_title}
Conversation with: ${conversation.other_user_name}

Concern:
`;
                        const mailtoLink = `mailto:hello@filmloca.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                        window.location.href = mailtoLink;
                      }}
                    >
                      <AlertTriangle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UnifiedMessages;
