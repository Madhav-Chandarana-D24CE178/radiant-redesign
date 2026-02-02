import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Booking {
  id: string;
  user_id: string;
  provider_id: string;
  service_id: string;
  scheduled_date: string;
  scheduled_time: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  notes: string | null;
  total_amount: number | null;
  created_at: string;
  updated_at: string;
}

export interface CreateBookingData {
  provider_id: string;
  service_id: string;
  scheduled_date: string;
  scheduled_time: string;
  notes?: string;
  total_amount?: number;
}

export const useUserBookings = () => {
  return useQuery({
    queryKey: ['userBookings'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          providers (
            id,
            business_name,
            user_id,
            profiles:user_id (full_name, avatar_url)
          ),
          provider_services (
            id,
            price,
            service_categories (name, icon)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useProviderBookings = () => {
  return useQuery({
    queryKey: ['providerBookings'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // First get the provider record for this user
      const { data: provider } = await supabase
        .from('providers')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!provider) throw new Error('Not a provider');

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          profiles:user_id (full_name, email, phone, avatar_url),
          provider_services (
            id,
            price,
            service_categories (name, icon)
          )
        `)
        .eq('provider_id', provider.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData: CreateBookingData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('bookings')
        .insert({
          ...bookingData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userBookings'] });
    },
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookingId, status }: { bookingId: string; status: Booking['status'] }) => {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userBookings'] });
      queryClient.invalidateQueries({ queryKey: ['providerBookings'] });
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId: string) => {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userBookings'] });
    },
  });
};
