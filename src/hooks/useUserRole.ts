import { useAuth, AppRole } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useUserRole = () => {
  const { roles, hasRole, getPrimaryRole, isAuthenticated, isGuest } = useAuth();
  const navigate = useNavigate();

  const redirectToDashboard = () => {
    const role = getPrimaryRole();
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else if (role === 'service_provider') {
      navigate('/provider/dashboard');
    } else if (role === 'user') {
      navigate('/user/dashboard');
    } else {
      navigate('/');
    }
  };

  const canBook = isAuthenticated && !isGuest;
  const canChat = isAuthenticated && !isGuest;
  const canReview = isAuthenticated && !isGuest;
  const isProvider = hasRole('service_provider');
  const isAdmin = hasRole('admin');
  const isUser = hasRole('user');

  return {
    roles,
    hasRole,
    getPrimaryRole,
    redirectToDashboard,
    canBook,
    canChat,
    canReview,
    isProvider,
    isAdmin,
    isUser,
    isAuthenticated,
    isGuest,
  };
};
