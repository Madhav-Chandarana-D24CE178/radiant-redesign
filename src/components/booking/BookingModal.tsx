import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useCreateBooking } from '@/hooks/useBookings';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: {
    id: string;
    business_name: string;
    available_start_time: string;
    available_end_time: string;
    available_days: string[];
  };
  service: {
    id: string;
    name: string;
    price: number | null;
    duration_minutes: number;
  };
}

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, provider, service }) => {
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>('');
  const [notes, setNotes] = useState('');
  
  const { mutate: createBooking, isPending } = useCreateBooking();
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!date || !time) {
      toast({
        title: 'Missing Information',
        description: 'Please select a date and time for your booking.',
        variant: 'destructive',
      });
      return;
    }

    createBooking(
      {
        provider_id: provider.id,
        service_id: service.id,
        scheduled_date: format(date, 'yyyy-MM-dd'),
        scheduled_time: time,
        notes: notes || undefined,
        total_amount: service.price || undefined,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Booking Submitted!',
            description: 'Your booking request has been sent to the provider.',
          });
          onClose();
        },
        onError: (error) => {
          toast({
            title: 'Booking Failed',
            description: 'Unable to create booking. Please try again.',
            variant: 'destructive',
          });
        },
      }
    );
  };

  const isDateDisabled = (date: Date) => {
    const day = format(date, 'EEEE').toLowerCase();
    return !provider.available_days.includes(day) || date < new Date();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-card border border-border rounded-2xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-foreground">Book Service</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Service Info */}
        <div className="p-4 bg-muted/50 rounded-xl mb-6">
          <p className="font-medium text-foreground">{service.name}</p>
          <p className="text-sm text-muted-foreground">with {provider.business_name}</p>
          {service.price && (
            <p className="text-lg font-bold text-primary mt-2">${service.price}</p>
          )}
        </div>

        {/* Date Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            Select Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={isDateDisabled}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            Select Time
          </label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setTime(slot)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  time === slot
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                )}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Additional Notes (Optional)
          </label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special instructions or details..."
            rows={3}
            className="resize-none"
          />
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit} 
          className="w-full" 
          disabled={isPending || !date || !time}
        >
          {isPending ? (
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            'Confirm Booking'
          )}
        </Button>
      </div>
    </div>
  );
};

export default BookingModal;
