import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MessageSquare, Star, Search, ChevronRight, TrendingUp, Loader2, AlertCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useUserBookings } from '@/hooks/useBookings';
import { format } from 'date-fns';

const UserDashboard: React.FC = () => {
  const { profile } = useAuth();
  const { data: bookings = [], isLoading } = useUserBookings();

  const activeBookings = bookings.filter((b: any) => ['pending', 'accepted', 'in_progress'].includes(b.status));
  const completedBookings = bookings.filter((b: any) => b.status === 'completed');
  const pendingBookings = bookings.filter((b: any) => b.status === 'pending');
  const recentBookings = bookings.slice(0, 5);

  const stats = [
    { label: 'Active Bookings', value: activeBookings.length, icon: Calendar, color: 'text-primary' },
    { label: 'Completed', value: completedBookings.length, icon: Clock, color: 'text-success' },
    { label: 'Pending', value: pendingBookings.length, icon: AlertCircle, color: 'text-warning' },
    { label: 'Total Bookings', value: bookings.length, icon: Star, color: 'text-accent' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-success/10 text-success';
      case 'pending': return 'bg-warning/10 text-warning';
      case 'in_progress': return 'bg-primary/10 text-primary';
      case 'completed': return 'bg-muted text-muted-foreground';
      case 'cancelled': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Welcome back, {profile?.full_name?.split(' ')[0] || 'User'}! 👋
            </h1>
            <p className="text-muted-foreground">Here's what's happening with your services today.</p>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <Link to="/providers">
              <Button className="gap-2"><Search className="w-4 h-4" />Find a Provider</Button>
            </Link>
            <Link to="/user/bookings">
              <Button variant="outline" className="gap-2"><Calendar className="w-4 h-4" />My Bookings</Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
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

              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg text-foreground">Recent Bookings</h2>
                  <Link to="/user/bookings" className="text-primary text-sm hover:underline flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                
                {recentBookings.length > 0 ? (
                  <div className="space-y-3">
                    {recentBookings.map((booking: any) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {booking.provider_services?.service_categories?.name || 'Service'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {booking.providers?.business_name || 'Provider'} • {format(new Date(booking.scheduled_date), 'MMM d, yyyy')} at {booking.scheduled_time}
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">No bookings yet. Find a provider to get started!</p>
                    <Link to="/providers"><Button>Find a Provider</Button></Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
