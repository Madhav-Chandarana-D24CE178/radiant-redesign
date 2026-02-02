import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, MessageSquare, Star, X, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUpdateBookingStatus, useCancelBooking } from '@/hooks/useBookings';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface BookingCardProps {
  booking: {
    id: string;
    scheduled_date: string;
    scheduled_time: string;
    status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
    notes: string | null;
    total_amount: number | null;
    providers?: {
      business_name: string;
      profiles?: { full_name: string | null; avatar_url: string | null };
    };
    profiles?: { full_name: string | null; avatar_url: string | null; email: string | null };
    provider_services?: {
      price: number | null;
      service_categories: { name: string; icon: string | null };
    };
  };
  viewType: 'user' | 'provider';
  onChatClick?: (bookingId: string) => void;
  onReviewClick?: (bookingId: string) => void;
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-warning/10 text-warning border-warning/20' },
  accepted: { label: 'Accepted', color: 'bg-success/10 text-success border-success/20' },
  in_progress: { label: 'In Progress', color: 'bg-primary/10 text-primary border-primary/20' },
  completed: { label: 'Completed', color: 'bg-muted text-muted-foreground border-border' },
  cancelled: { label: 'Cancelled', color: 'bg-destructive/10 text-destructive border-destructive/20' },
};

const BookingCard: React.FC<BookingCardProps> = ({ 
  booking, 
  viewType, 
  onChatClick, 
  onReviewClick 
}) => {
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateBookingStatus();
  const { mutate: cancelBooking, isPending: isCancelling } = useCancelBooking();
  const { toast } = useToast();

  const handleAccept = () => {
    updateStatus(
      { bookingId: booking.id, status: 'accepted' },
      {
        onSuccess: () => {
          toast({ title: 'Booking accepted!' });
        },
      }
    );
  };

  const handleReject = () => {
    updateStatus(
      { bookingId: booking.id, status: 'cancelled' },
      {
        onSuccess: () => {
          toast({ title: 'Booking rejected' });
        },
      }
    );
  };

  const handleStartJob = () => {
    updateStatus(
      { bookingId: booking.id, status: 'in_progress' },
      {
        onSuccess: () => {
          toast({ title: 'Job started!' });
        },
      }
    );
  };

  const handleCompleteJob = () => {
    updateStatus(
      { bookingId: booking.id, status: 'completed' },
      {
        onSuccess: () => {
          toast({ title: 'Job marked as completed!' });
        },
      }
    );
  };

  const handleCancel = () => {
    cancelBooking(booking.id, {
      onSuccess: () => {
        toast({ title: 'Booking cancelled' });
      },
    });
  };

  const status = statusConfig[booking.status];
  const serviceName = booking.provider_services?.service_categories?.name || 'Service';
  const personName = viewType === 'user' 
    ? booking.providers?.business_name 
    : booking.profiles?.full_name;

  const canChat = booking.status === 'accepted' || booking.status === 'in_progress';
  const canReview = viewType === 'user' && booking.status === 'completed';

  return (
    <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">{serviceName}</h3>
          <p className="text-sm text-muted-foreground">{personName}</p>
        </div>
        <span className={cn('px-3 py-1 rounded-full text-xs font-medium border', status.color)}>
          {status.label}
        </span>
      </div>

      {/* Date & Time */}
      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>{format(new Date(booking.scheduled_date), 'MMM d, yyyy')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{booking.scheduled_time}</span>
        </div>
      </div>

      {/* Amount */}
      {booking.total_amount && (
        <p className="text-lg font-bold text-primary mb-4">${booking.total_amount}</p>
      )}

      {/* Notes */}
      {booking.notes && (
        <p className="text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg">
          {booking.notes}
        </p>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        {/* Provider Actions */}
        {viewType === 'provider' && (
          <>
            {booking.status === 'pending' && (
              <>
                <Button size="sm" className="gap-1.5" onClick={handleAccept} disabled={isUpdating}>
                  {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                  Accept
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5" onClick={handleReject} disabled={isUpdating}>
                  <XCircle className="w-4 h-4" />
                  Decline
                </Button>
              </>
            )}
            {booking.status === 'accepted' && (
              <Button size="sm" onClick={handleStartJob} disabled={isUpdating}>
                Start Job
              </Button>
            )}
            {booking.status === 'in_progress' && (
              <Button size="sm" onClick={handleCompleteJob} disabled={isUpdating}>
                Mark Complete
              </Button>
            )}
          </>
        )}

        {/* User Actions */}
        {viewType === 'user' && booking.status === 'pending' && (
          <Button size="sm" variant="destructive" className="gap-1.5" onClick={handleCancel} disabled={isCancelling}>
            {isCancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
            Cancel
          </Button>
        )}

        {/* Chat Button */}
        {canChat && onChatClick && (
          <Button size="sm" variant="outline" className="gap-1.5" onClick={() => onChatClick(booking.id)}>
            <MessageSquare className="w-4 h-4" />
            Chat
          </Button>
        )}

        {/* Review Button */}
        {canReview && onReviewClick && (
          <Button size="sm" variant="outline" className="gap-1.5" onClick={() => onReviewClick(booking.id)}>
            <Star className="w-4 h-4" />
            Leave Review
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
