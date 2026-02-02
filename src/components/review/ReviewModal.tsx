import React, { useState } from 'react';
import { Star, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  providerId: string;
  providerName: string;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  bookingId,
  providerId,
  providerName,
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: 'Rating Required',
        description: 'Please select a star rating.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('reviews').insert({
        booking_id: bookingId,
        user_id: user.id,
        provider_id: providerId,
        rating,
        comment: comment.trim() || null,
      });

      if (error) throw error;

      toast({
        title: 'Review Submitted!',
        description: 'Thank you for your feedback.',
      });
      onClose();
    } catch (error: any) {
      if (error.code === '23505') {
        toast({
          title: 'Already Reviewed',
          description: 'You have already reviewed this booking.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to submit review. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-card border border-border rounded-2xl p-6 max-w-md w-full mx-4 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-foreground">Leave a Review</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Provider Info */}
        <div className="text-center mb-6">
          <p className="text-muted-foreground">How was your experience with</p>
          <p className="font-semibold text-foreground text-lg">{providerName}?</p>
        </div>

        {/* Star Rating */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={cn(
                  'w-10 h-10 transition-colors',
                  star <= (hoverRating || rating)
                    ? 'text-warning fill-warning'
                    : 'text-muted-foreground'
                )}
              />
            </button>
          ))}
        </div>

        {/* Rating Label */}
        <p className="text-center text-sm text-muted-foreground mb-6">
          {rating === 1 && 'Poor'}
          {rating === 2 && 'Fair'}
          {rating === 3 && 'Good'}
          {rating === 4 && 'Very Good'}
          {rating === 5 && 'Excellent'}
          {rating === 0 && 'Select a rating'}
        </p>

        {/* Comment */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Write a Review (Optional)
          </label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            rows={4}
            className="resize-none"
          />
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit} 
          className="w-full" 
          disabled={isSubmitting || rating === 0}
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Submit Review'
          )}
        </Button>
      </div>
    </div>
  );
};

export default ReviewModal;
