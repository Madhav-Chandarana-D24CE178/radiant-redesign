import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Clock, DollarSign, Star, Users, ChevronRight, 
  TrendingUp, AlertCircle, CheckCircle, XCircle, MessageSquare,
  Power
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';

const ProviderDashboard: React.FC = () => {
  const { profile } = useAuth();
  const [isOnline, setIsOnline] = useState(true);

  // Mock data - will be replaced with real data
  const stats = [
    { label: 'Total Earnings', value: '$3,450', icon: DollarSign, color: 'text-success', trend: '+12%' },
    { label: 'Completed Jobs', value: 47, icon: CheckCircle, color: 'text-primary', trend: '+5' },
    { label: 'Pending Requests', value: 3, icon: Clock, color: 'text-warning', trend: 'New' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: 'text-warning', trend: '+0.2' },
  ];

  const pendingRequests = [
    { id: 1, customer: 'Alice Brown', service: 'Plumbing Repair', date: '2024-02-15', time: '10:00 AM', amount: 120 },
    { id: 2, customer: 'Bob Wilson', service: 'Pipe Installation', date: '2024-02-16', time: '2:00 PM', amount: 250 },
    { id: 3, customer: 'Carol Davis', service: 'Leak Fix', date: '2024-02-17', time: '9:00 AM', amount: 80 },
  ];

  const recentReviews = [
    { id: 1, customer: 'John Doe', rating: 5, comment: 'Excellent service! Very professional.', date: '2 days ago' },
    { id: 2, customer: 'Jane Smith', rating: 4, comment: 'Good work, arrived on time.', date: '1 week ago' },
  ];

  const handleAccept = (id: number) => {
    console.log('Accepting request:', id);
    // TODO: Implement accept logic
  };

  const handleReject = (id: number) => {
    console.log('Rejecting request:', id);
    // TODO: Implement reject logic
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Provider Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {profile?.full_name || 'Provider'}!
              </p>
            </div>

            {/* Online/Offline Toggle */}
            <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
              <Power className={`w-5 h-5 ${isOnline ? 'text-success' : 'text-muted-foreground'}`} />
              <div>
                <p className="font-medium text-foreground">
                  {isOnline ? 'Online' : 'Offline'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isOnline ? 'Accepting new bookings' : 'Not accepting bookings'}
                </p>
              </div>
              <Switch 
                checked={isOnline} 
                onCheckedChange={setIsOnline}
                className="ml-4"
              />
            </div>
          </div>

          {/* Verification Alert */}
          <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Verification Pending</p>
              <p className="text-sm text-muted-foreground">
                Your provider account is awaiting admin verification. You'll receive bookings once approved.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                    {stat.trend}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Pending Requests */}
            <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg text-foreground">Pending Requests</h2>
                <Link to="/provider/requests" className="text-primary text-sm hover:underline flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              
              {pendingRequests.length > 0 ? (
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="p-4 rounded-xl bg-muted/50 border border-border">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium text-foreground">{request.service}</p>
                          <p className="text-sm text-muted-foreground">
                            {request.customer} • {request.date} at {request.time}
                          </p>
                        </div>
                        <p className="font-bold text-primary">${request.amount}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 gap-2"
                          onClick={() => handleAccept(request.id)}
                        >
                          <CheckCircle className="w-4 h-4" />
                          Accept
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 gap-2"
                          onClick={() => handleReject(request.id)}
                        >
                          <XCircle className="w-4 h-4" />
                          Decline
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
            </div>

            {/* Recent Reviews */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg text-foreground">Recent Reviews</h2>
                <Link to="/provider/reviews" className="text-primary text-sm hover:underline">
                  See All
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="p-3 rounded-xl bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-foreground">{review.customer}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-warning fill-warning' : 'text-muted-foreground'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{review.comment}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                ))}
              </div>

              {/* Quick Links */}
              <div className="mt-6 pt-4 border-t border-border space-y-2">
                <Link 
                  to="/provider/profile" 
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors"
                >
                  <span className="text-sm text-foreground">Manage Profile</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
                <Link 
                  to="/provider/services" 
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors"
                >
                  <span className="text-sm text-foreground">Manage Services</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
                <Link 
                  to="/provider/earnings" 
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors"
                >
                  <span className="text-sm text-foreground">View Earnings</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderDashboard;
