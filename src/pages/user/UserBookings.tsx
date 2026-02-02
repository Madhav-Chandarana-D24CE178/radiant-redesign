import React, { useState } from 'react';
import { Calendar, Filter, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import BookingCard from '@/components/booking/BookingCard';
import ChatWindow from '@/components/chat/ChatWindow';
import ReviewModal from '@/components/review/ReviewModal';
import { useUserBookings } from '@/hooks/useBookings';

type StatusFilter = 'all' | 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

const UserBookings: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [chatBookingId, setChatBookingId] = useState<string | null>(null);
  const [reviewBooking, setReviewBooking] = useState<{ id: string; providerId: string; providerName: string } | null>(null);
  
  const { data: bookings = [], isLoading } = useUserBookings();

  const filteredBookings = bookings.filter(
    (b: any) => statusFilter === 'all' || b.status === statusFilter
  );

  const statusOptions: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const handleChatClick = (bookingId: string) => {
    setChatBookingId(bookingId);
  };

  const handleReviewClick = (bookingId: string) => {
    const booking = bookings.find((b: any) => b.id === bookingId) as any;
    if (booking) {
      setReviewBooking({
        id: bookingId,
        providerId: booking.provider_id,
        providerName: booking.providers?.business_name || 'Provider',
      });
    }
  };

  const chatBooking = bookings.find((b: any) => b.id === chatBookingId) as any;

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link to="/user/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">My Bookings</h1>
              <p className="text-sm text-muted-foreground">
                Manage and track your service bookings
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setStatusFilter(option.value)}
                className={`filter-chip whitespace-nowrap ${
                  statusFilter === option.value ? 'active' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Bookings List */}
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-5 animate-pulse">
                  <div className="h-6 bg-muted rounded w-2/3 mb-3" />
                  <div className="h-4 bg-muted rounded w-1/2 mb-4" />
                  <div className="h-8 bg-muted rounded w-full" />
                </div>
              ))}
            </div>
          ) : filteredBookings.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredBookings.map((booking: any) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  viewType="user"
                  onChatClick={handleChatClick}
                  onReviewClick={handleReviewClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Bookings Found</h3>
              <p className="text-muted-foreground mb-4">
                {statusFilter === 'all'
                  ? "You haven't made any bookings yet."
                  : `No ${statusFilter.replace('_', ' ')} bookings.`}
              </p>
              <Link to="/providers">
                <Button>Find a Provider</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      {chatBookingId && chatBooking && (
        <ChatWindow
          bookingId={chatBookingId}
          onClose={() => setChatBookingId(null)}
          recipientName={chatBooking.providers?.business_name || 'Provider'}
        />
      )}

      {/* Review Modal */}
      {reviewBooking && (
        <ReviewModal
          isOpen={true}
          onClose={() => setReviewBooking(null)}
          bookingId={reviewBooking.id}
          providerId={reviewBooking.providerId}
          providerName={reviewBooking.providerName}
        />
      )}
    </Layout>
  );
};

export default UserBookings;
