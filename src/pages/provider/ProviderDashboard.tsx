import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Clock, DollarSign, Star, ChevronRight, 
  AlertCircle, CheckCircle, XCircle, Loader2, Power, AlertTriangle
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useProviderBookings, useUpdateBookingStatus } from '@/hooks/useBookings';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

const ProviderDashboard: React.FC = () => {
  const { profile, user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: bookings = [], isLoading: bookingsLoading } = useProviderBookings();
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateBookingStatus();

  // Fetch provider record
  const { data: provider, isLoading: providerLoading } = useQuery({
    queryKey: ['myProvider'],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .eq('user_id', user.id)
        .single();
      if (error) return null;
      return data;
    },
    enabled: !!user,
  });

  // Fetch earnings
  const { data: earnings = [] } = useQuery({
    queryKey: ['myEarnings'],
    queryFn: async () => {
      if (!provider) return [];
      const { data, error } = await supabase
        .from('earnings')
        .select('*')
        .eq('provider_id', provider.id)
        .order('earned_at', { ascending: false });
      if (error) return [];
      return data;
    },
    enabled: !!provider,
  });

  // Fetch reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ['myReviews'],
    queryFn: async () => {
      if (!provider) return [];
      const { data, error } = await supabase
        .from('reviews')
        .select('*, profiles:user_id (full_name)')
        .eq('provider_id', provider.id)
        .order('created_at', { ascending: false })
        .limit(5);
      if (error) return [];
      return data;
    },
    enabled: !!provider,
  });

  const isOnline = provider?.is_online ?? false;

  const toggleOnline = async () => {
    if (!provider) return;
    const { error } = await supabase
      .from('providers')
      .update({ is_online: !isOnline })
      .eq('id', provider.id);
    if (!error) {
      queryClient.invalidateQueries({ queryKey: ['myProvider'] });
      toast({ title: !isOnline ? 'You are now online' : 'You are now offline' });
    }
  };

  const pendingBookings = bookings.filter((b: any) => b.status === 'pending');
  const completedBookings = bookings.filter((b: any) => b.status === 'completed');
  const inProgressBookings = bookings.filter((b: any) => b.status === 'in_progress');
  const emergencyBookings = bookings.filter((b: any) => b.notes?.toLowerCase().includes('emergency'));
  const totalEarnings = earnings.reduce((sum: number, e: any) => sum + Number(e.amount), 0);

  const isVerified = provider?.verification_status === 'verified';
  const isPendingVerification = provider?.verification_status === 'pending';

  const handleAccept = (bookingId: string) => {
    updateStatus({ bookingId, status: 'accepted' }, {
      onSuccess: () => toast({ title: 'Booking accepted!' }),
    });
  };

  const handleReject = (bookingId: string) => {
    updateStatus({ bookingId, status: 'cancelled' }, {
      onSuccess: () => toast({ title: 'Booking declined' }),
    });
  };

  const stats = [
    { label: 'Total Earnings', value: `$${totalEarnings.toLocaleString()}`, icon: DollarSign, color: 'text-success' },
    { label: 'Completed Jobs', value: completedBookings.length, icon: CheckCircle, color: 'text-primary' },
    { label: 'Pending Requests', value: pendingBookings.length, icon: Clock, color: 'text-warning' },
    { label: 'Average Rating', value: provider?.average_rating?.toFixed(1) || '0.0', icon: Star, color: 'text-warning' },
  ];

  const isLoading = bookingsLoading || providerLoading;

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">Provider Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {profile?.full_name || 'Provider'}!</p>
            </div>
            <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
              <Power className={`w-5 h-5 ${isOnline ? 'text-success' : 'text-muted-foreground'}`} />
              <div>
                <p className="font-medium text-foreground">{isOnline ? 'Online' : 'Offline'}</p>
                <p className="text-xs text-muted-foreground">{isOnline ? 'Accepting new bookings' : 'Not accepting bookings'}</p>
              </div>
              <Switch checked={isOnline} onCheckedChange={toggleOnline} className="ml-4" />
            </div>
          </div>

          {/* Verification Alert */}
          {isPendingVerification && (
            <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Verification Pending</p>
                <p className="text-sm text-muted-foreground">Your provider account is awaiting admin verification. You'll receive bookings once approved.</p>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-card border border-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Emergency Requests */}
              {emergencyBookings.length > 0 && (
                <div className="mb-6 p-4 bg-destructive/5 border border-destructive/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <h2 className="font-semibold text-foreground">Emergency Requests ({emergencyBookings.length})</h2>
                  </div>
                  <div className="space-y-3">
                    {emergencyBookings.filter((b: any) => b.status === 'pending').slice(0, 3).map((booking: any) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-card rounded-lg border border-destructive/10">
                        <div>
                          <p className="font-medium text-foreground">{booking.provider_services?.service_categories?.name || 'Service'}</p>
                          <p className="text-sm text-muted-foreground">{booking.profiles?.full_name || 'Customer'}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleAccept(booking.id)} disabled={isUpdating}>Accept</Button>
                          <Button size="sm" variant="outline" onClick={() => handleReject(booking.id)} disabled={isUpdating}>Decline</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Pending Requests */}
                <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-lg text-foreground">Pending Requests</h2>
                    <Link to="/provider/requests" className="text-primary text-sm hover:underline flex items-center gap-1">
                      View All <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                  
                  {pendingBookings.length > 0 ? (
                    <div className="space-y-4">
                      {pendingBookings.slice(0, 5).map((request: any) => (
                        <div key={request.id} className="p-4 rounded-xl bg-muted/50 border border-border">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="font-medium text-foreground">{request.provider_services?.service_categories?.name || 'Service'}</p>
                              <p className="text-sm text-muted-foreground">
                                {request.profiles?.full_name || 'Customer'} • {format(new Date(request.scheduled_date), 'MMM d, yyyy')} at {request.scheduled_time}
                              </p>
                            </div>
                            {request.total_amount && (
                              <p className="font-bold text-primary">${request.total_amount}</p>
                            )}
                          </div>
                          {request.notes && (
                            <p className="text-sm text-muted-foreground mb-3 p-2 bg-muted rounded-lg">{request.notes}</p>
                          )}
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 gap-2" onClick={() => handleAccept(request.id)} disabled={isUpdating}>
                              <CheckCircle className="w-4 h-4" /> Accept
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 gap-2" onClick={() => handleReject(request.id)} disabled={isUpdating}>
                              <XCircle className="w-4 h-4" /> Decline
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">No pending requests</p>
                    </div>
                  )}

                  {/* In Progress Jobs */}
                  {inProgressBookings.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <h3 className="font-semibold text-foreground mb-3">In Progress ({inProgressBookings.length})</h3>
                      <div className="space-y-3">
                        {inProgressBookings.slice(0, 3).map((booking: any) => (
                          <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10">
                            <div>
                              <p className="font-medium text-foreground">{booking.provider_services?.service_categories?.name || 'Service'}</p>
                              <p className="text-sm text-muted-foreground">{booking.profiles?.full_name || 'Customer'}</p>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">In Progress</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Recent Reviews & Quick Links */}
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="font-semibold text-lg text-foreground mb-4">Recent Reviews</h2>
                    {reviews.length > 0 ? (
                      <div className="space-y-4">
                        {reviews.slice(0, 3).map((review: any) => (
                          <div key={review.id} className="p-3 rounded-xl bg-muted/50">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium text-foreground text-sm">{review.profiles?.full_name || 'Customer'}</p>
                              <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-warning fill-warning' : 'text-muted-foreground'}`} />
                                ))}
                              </div>
                            </div>
                            {review.comment && <p className="text-sm text-muted-foreground">{review.comment}</p>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">No reviews yet</p>
                    )}
                  </div>

                  {/* Quick Links */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="font-semibold text-lg text-foreground mb-4">Quick Actions</h2>
                    <div className="space-y-2">
                      <Link to="/provider/requests" className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors">
                        <span className="text-sm text-foreground">All Job Requests</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </Link>
                      <Link to="/profile" className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors">
                        <span className="text-sm text-foreground">Manage Profile</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProviderDashboard;
