import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MessageSquare, Star, Search, ChevronRight, TrendingUp } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const UserDashboard: React.FC = () => {
  const { profile } = useAuth();

  // Mock data - will be replaced with real data
  const stats = [
    { label: 'Active Bookings', value: 2, icon: Calendar, color: 'text-primary' },
    { label: 'Completed Services', value: 15, icon: Clock, color: 'text-success' },
    { label: 'Unread Messages', value: 3, icon: MessageSquare, color: 'text-warning' },
    { label: 'Reviews Given', value: 12, icon: Star, color: 'text-accent' },
  ];

  const recentBookings = [
    { id: 1, provider: 'John Smith', service: 'Plumbing', date: '2024-02-15', time: '10:00 AM', status: 'accepted' },
    { id: 2, provider: 'Mike Johnson', service: 'Electrical', date: '2024-02-16', time: '2:00 PM', status: 'pending' },
  ];

  const recommendedProviders = [
    { id: 1, name: 'Sarah Wilson', service: 'Cleaning', rating: 4.9, reviews: 128, available: true },
    { id: 2, name: 'David Brown', service: 'Carpentry', rating: 4.8, reviews: 95, available: true },
    { id: 3, name: 'Emily Davis', service: 'Painting', rating: 4.7, reviews: 67, available: false },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-success/10 text-success';
      case 'pending': return 'bg-warning/10 text-warning';
      case 'in_progress': return 'bg-primary/10 text-primary';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Welcome back, {profile?.full_name?.split(' ')[0] || 'User'}! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your services today.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link to="/providers">
              <Button className="gap-2">
                <Search className="w-4 h-4" />
                Find a Provider
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="gap-2">
                Browse Services
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Bookings */}
            <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg text-foreground">Recent Bookings</h2>
                <Link to="/user/bookings" className="text-primary text-sm hover:underline flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              
              {recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{booking.service}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.provider} • {booking.date} at {booking.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.replace('_', ' ')}
                        </span>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No recent bookings</p>
                  <Link to="/providers">
                    <Button variant="link" className="mt-2">Find a provider</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Recommended Providers */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg text-foreground">Recommended</h2>
                <Link to="/providers" className="text-primary text-sm hover:underline">
                  See All
                </Link>
              </div>
              
              <div className="space-y-4">
                {recommendedProviders.map((provider) => (
                  <Link 
                    key={provider.id} 
                    to={`/providers/${provider.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold">{provider.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{provider.name}</p>
                      <p className="text-sm text-muted-foreground">{provider.service}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span className="text-sm font-medium">{provider.rating}</span>
                      </div>
                      <span className={`text-xs ${provider.available ? 'text-success' : 'text-muted-foreground'}`}>
                        {provider.available ? 'Available' : 'Busy'}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
