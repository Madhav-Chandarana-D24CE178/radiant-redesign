import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Briefcase, Calendar, DollarSign, ChevronRight, 
  TrendingUp, CheckCircle, XCircle, Clock, Shield,
  AlertTriangle, BarChart3, MessageSquare
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProviders: 0,
    pendingVerifications: 0,
    totalBookings: 0,
  });

  const [pendingProviders, setPendingProviders] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // Fetch counts
    const [usersResult, providersResult, pendingResult, bookingsResult] = await Promise.all([
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
      supabase.from('providers').select('id', { count: 'exact', head: true }).eq('verification_status', 'verified'),
      supabase.from('providers').select('id', { count: 'exact', head: true }).eq('verification_status', 'pending'),
      supabase.from('bookings').select('id', { count: 'exact', head: true }),
    ]);

    setStats({
      totalUsers: usersResult.count || 0,
      totalProviders: providersResult.count || 0,
      pendingVerifications: pendingResult.count || 0,
      totalBookings: bookingsResult.count || 0,
    });

    // Fetch pending providers
    const { data: pending } = await supabase
      .from('providers')
      .select(`
        *,
        profiles:user_id (full_name, email)
      `)
      .eq('verification_status', 'pending')
      .limit(5);

    setPendingProviders(pending || []);
  };

  const handleVerifyProvider = async (providerId: string, action: 'verified' | 'rejected') => {
    const { error } = await supabase
      .from('providers')
      .update({ verification_status: action })
      .eq('id', providerId);

    if (!error) {
      // If verified, add service_provider role
      if (action === 'verified') {
        const provider = pendingProviders.find(p => p.id === providerId);
        if (provider) {
          await supabase
            .from('user_roles')
            .insert({ user_id: provider.user_id, role: 'service_provider' });
        }
      }
      fetchDashboardData();
    }
  };

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-primary', bgColor: 'bg-primary/10' },
    { label: 'Verified Providers', value: stats.totalProviders, icon: Briefcase, color: 'text-success', bgColor: 'bg-success/10' },
    { label: 'Pending Verifications', value: stats.pendingVerifications, icon: Clock, color: 'text-warning', bgColor: 'bg-warning/10' },
    { label: 'Total Bookings', value: stats.totalBookings, icon: Calendar, color: 'text-accent', bgColor: 'bg-accent/10' },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-6 h-6 text-primary" />
              <h1 className="font-display text-3xl font-bold text-foreground">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-muted-foreground">
              Manage users, providers, and monitor platform activity.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Pending Verifications */}
            <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg text-foreground flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Pending Provider Verifications
                </h2>
                <Link to="/admin/providers" className="text-primary text-sm hover:underline flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              
              {pendingProviders.length > 0 ? (
                <div className="space-y-4">
                  {pendingProviders.map((provider) => (
                    <div key={provider.id} className="p-4 rounded-xl bg-muted/50 border border-border">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium text-foreground">{provider.business_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {provider.profiles?.full_name} • {provider.profiles?.email}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Location: {provider.location || 'Not specified'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 gap-2"
                          onClick={() => handleVerifyProvider(provider.id, 'verified')}
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          className="flex-1 gap-2"
                          onClick={() => handleVerifyProvider(provider.id, 'rejected')}
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                  <p className="text-muted-foreground">All providers verified!</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-semibold text-lg text-foreground mb-4">Quick Actions</h2>
              
              <div className="space-y-2">
                <Link 
                  to="/admin/users" 
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">Manage Users</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
                
                <Link 
                  to="/admin/providers" 
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-success" />
                    <span className="font-medium text-foreground">Manage Providers</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
                
                <Link 
                  to="/admin/bookings" 
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-accent" />
                    <span className="font-medium text-foreground">View Bookings</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
                
                <Link 
                  to="/admin/messages" 
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-warning" />
                    <span className="font-medium text-foreground">View Messages</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
                
                <Link 
                  to="/admin/analytics" 
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">Analytics</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
