import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { Send, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConversation, useMessages, useSendMessage, useMarkMessagesRead } from '@/hooks/useChat';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface ChatWindowProps {
  bookingId: string;
  onClose: () => void;
  recipientName: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ bookingId, onClose, recipientName }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { user } = useAuth();
  const { data: conversation, isLoading: loadingConversation } = useConversation(bookingId);
  const { data: messages = [], isLoading: loadingMessages } = useMessages(conversation?.id || '');
  const { mutate: sendMessage, isPending: isSending } = useSendMessage();
  const { mutate: markRead } = useMarkMessagesRead();

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mark messages as read
  useEffect(() => {
    if (conversation && user) {
      markRead({ conversationId: conversation.id, userId: user.id });
    }
  }, [conversation, user, markRead]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = () => {
    if (!message.trim() || !conversation) return;

    sendMessage(
      { conversationId: conversation.id, content: message.trim() },
      {
        onSuccess: () => {
          setMessage('');
        },
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isLoading = loadingConversation || loadingMessages;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:items-end md:justify-end p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-md h-[500px] flex flex-col animate-scale-in md:mb-4 md:mr-4">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div>
            <h3 className="font-semibold text-foreground">{recipientName}</h3>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : !conversation ? (
            <div className="flex items-center justify-center h-full text-center">
              <p className="text-muted-foreground">
                Chat will be available once the booking is accepted.
              </p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <p className="text-muted-foreground">
                No messages yet. Start the conversation!
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isOwnMessage = msg.sender_id === user?.id;
              return (
                <div
                  key={msg.id}
                  className={cn(
                    'flex',
                    isOwnMessage ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[75%] px-4 py-2.5 rounded-2xl',
                      isOwnMessage
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-muted text-foreground rounded-bl-md'
                    )}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p
                      className={cn(
                        'text-xs mt-1',
                        isOwnMessage ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      )}
                    >
                      {format(new Date(msg.created_at), 'h:mm a')}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 rounded-full bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              disabled={!conversation || isSending}
            />
            <Button
              size="icon"
              className="rounded-full"
              onClick={handleSend}
              disabled={!message.trim() || !conversation || isSending}
            >
              {isSending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
