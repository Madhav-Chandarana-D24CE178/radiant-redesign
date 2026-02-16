import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, User as UserIcon, Sun, Moon, AlertTriangle, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import handyfixLogo from '@/assets/handyfix-logo.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [notifications] = useState([
    { id: 1, message: 'Your booking is confirmed', time: '5 min ago', unread: true },
    { id: 2, message: 'New provider in your area', time: '1 hour ago', unread: true },
    { id: 3, message: 'Service completed successfully', time: '2 hours ago', unread: false },
  ]);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, profile, isAuthenticated, logout, getPrimaryRole } = useAuth();

  const unreadCount = notifications.filter(n => n.unread).length;
  const primaryRole = getPrimaryRole();
  
  const getDashboardPath = () => {
    if (primaryRole === 'admin') return '/admin/dashboard';
    if (primaryRole === 'service_provider') return '/provider/dashboard';
    return '/user/dashboard';
  };

  // Role-specific nav links - providers don't see "Find Providers", users don't see provider-only links
  const getNavLinks = () => {
    const baseLinks = [{ path: '/', label: 'Home' }, { path: '/services', label: 'Services' }];
    
    if (primaryRole === 'service_provider') {
      // Providers see their dashboard links, NOT "Find Providers"
      return [
        ...baseLinks,
        { path: '/provider/dashboard', label: 'Dashboard' },
        { path: '/provider/requests', label: 'Requests' },
      ];
    }
    
    if (primaryRole === 'admin') {
      return [
        ...baseLinks,
        { path: '/admin/dashboard', label: 'Dashboard' },
      ];
    }

    // Regular users and unauthenticated
    return [
      ...baseLinks,
      { path: '/providers', label: 'Find Providers' },
      { path: '/about', label: 'About' },
      { path: '/contact', label: 'Contact' },
    ];
  };

  const navLinks = getNavLinks();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    if (isNotificationsOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotificationsOpen]);

  return (
    <header className="sticky top-0 z-50 w-full glass">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <img src={handyfixLogo} alt="HandyFix Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">HandyFix</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/emergency">
              <Button variant="emergency" size="sm" className="hidden sm:flex gap-2">
                <AlertTriangle className="w-4 h-4" /><span>Emergency</span>
              </Button>
            </Link>

            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            {isAuthenticated && (
              <div className="relative" ref={notificationRef} onMouseLeave={() => setTimeout(() => setIsNotificationsOpen(false), 200)}>
                <Button variant="ghost" size="icon" className="rounded-full relative" onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}>
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                </Button>
                <div className={`absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-xl shadow-xl z-50 overflow-hidden transition-all duration-200 ease-out origin-top-right ${isNotificationsOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'}`}>
                  <div className="px-4 py-3 border-b border-border"><h4 className="font-semibold text-foreground">Notifications</h4></div>
                  {notifications.map((notification) => (
                    <button key={notification.id} className={`w-full flex flex-col items-start gap-1 px-4 py-3 cursor-pointer transition-colors hover:bg-muted text-left ${notification.unread ? 'bg-primary/5' : ''}`} onClick={() => setIsNotificationsOpen(false)}>
                      <span className="text-sm text-foreground">{notification.message}</span>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isAuthenticated ? (
              <div className="relative" onMouseLeave={() => setTimeout(() => setIsProfileOpen(false), 200)} onMouseEnter={() => setIsProfileOpen(true)}>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt={profile.full_name || ''} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </Button>
                <div className={`absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-xl shadow-xl z-50 overflow-hidden transition-all duration-200 ease-out origin-top-right ${isProfileOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'}`} onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => setTimeout(() => setIsProfileOpen(false), 200)}>
                  <div className="px-4 py-3 border-b border-border">
                    <p className="font-semibold text-foreground">{profile?.full_name || user?.email}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    {primaryRole && (
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium capitalize">
                        {primaryRole === 'service_provider' ? 'Provider' : primaryRole}
                      </span>
                    )}
                  </div>
                  <Link to={getDashboardPath()} className="flex items-center gap-2 px-4 py-2.5 hover:bg-muted transition-colors" onClick={() => setIsProfileOpen(false)}>
                    <LayoutDashboard className="w-4 h-4" /><span className="text-sm">Dashboard</span>
                  </Link>
                  <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 hover:bg-muted transition-colors" onClick={() => setIsProfileOpen(false)}>
                    <UserIcon className="w-4 h-4" /><span className="text-sm">Profile</span>
                  </Link>
                  <div className="border-t border-border">
                    <button className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-muted transition-colors text-left text-destructive" onClick={() => { logout(); setIsProfileOpen(false); }}>
                      <LogOut className="w-4 h-4" /><span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/auth"><Button variant="default" size="sm">Sign In</Button></Link>
            )}

            <Button variant="ghost" size="icon" className="md:hidden rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${location.pathname === link.path ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                  {link.label}
                </Link>
              ))}
              <Link to="/emergency" onClick={() => setIsMenuOpen(false)} className="mt-2">
                <Button variant="emergency" className="w-full gap-2"><AlertTriangle className="w-4 h-4" />Emergency Services</Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
