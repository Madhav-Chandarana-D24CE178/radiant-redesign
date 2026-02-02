import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';

interface GuestRouteProps {
  children: React.ReactNode;
  actionType: 'book' | 'chat' | 'review' | 'rate';
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children, actionType }) => {
  const { isAuthenticated, isGuest } = useAuth();
  const navigate = useNavigate();

  const actionMessages = {
    book: 'book a service',
    chat: 'chat with providers',
    review: 'leave a review',
    rate: 'rate a provider',
  };

  if (isGuest && !isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-card border border-border text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <LogIn className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Login Required</h3>
        <p className="text-muted-foreground">
          You need to sign in to {actionMessages[actionType]}.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/auth')}>
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </Button>
          <Button onClick={() => navigate('/auth?mode=signup')}>
            <UserPlus className="w-4 h-4 mr-2" />
            Create Account
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default GuestRoute;
