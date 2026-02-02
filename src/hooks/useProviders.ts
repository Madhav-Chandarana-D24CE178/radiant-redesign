import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

export interface Provider {
  id: string;
  user_id: string;
  business_name: string;
  description: string | null;
  location: string | null;
  verification_status: 'pending' | 'verified' | 'rejected';
  is_online: boolean;
  available_days: string[];
  available_start_time: string;
  available_end_time: string;
  average_rating: number;
  total_reviews: number;
  created_at: string;
  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
  };
  provider_services?: {
    id: string;
    price: number | null;
    duration_minutes: number;
    service_categories: {
      id: string;
      name: string;
      icon: string | null;
    };
  }[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
}

export const useServiceCategories = () => {
  return useQuery({
    queryKey: ['serviceCategories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as ServiceCategory[];
    },
  });
};

export const useProviders = (filters?: {
  categoryId?: string;
  location?: string;
  minRating?: number;
  onlineOnly?: boolean;
}) => {
  return useQuery({
    queryKey: ['providers', filters],
    queryFn: async () => {
      let query = supabase
        .from('providers')
        .select(`
          *,
          provider_services (
            id,
            price,
            duration_minutes,
            service_categories (id, name, icon)
          )
        `)
        .eq('verification_status', 'verified');

      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }

      if (filters?.minRating) {
        query = query.gte('average_rating', filters.minRating);
      }

      if (filters?.onlineOnly) {
        query = query.eq('is_online', true);
      }

      const { data, error } = await query.order('average_rating', { ascending: false });

      if (error) throw error;

      // Filter by category if specified
      let providers = data as any[];
      if (filters?.categoryId) {
        providers = providers.filter(p => 
          p.provider_services?.some((s: any) => s.service_categories?.id === filters.categoryId)
        );
      }

      return providers;
    },
  });
};

export const useProvider = (providerId: string) => {
  return useQuery({
    queryKey: ['provider', providerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('providers')
        .select(`
          *,
          provider_services (
            id,
            price,
            duration_minutes,
            service_categories (id, name, description, icon)
          )
        `)
        .eq('id', providerId)
        .single();

      if (error) throw error;
      return data as any;
    },
    enabled: !!providerId,
  });
};

export const useProviderReviews = (providerId: string) => {
  return useQuery({
    queryKey: ['providerReviews', providerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:user_id (full_name, avatar_url)
        `)
        .eq('provider_id', providerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!providerId,
  });
};
