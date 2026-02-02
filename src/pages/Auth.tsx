import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth, AppRole } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import handyfixLogo from '@/assets/handyfix-logo.png';

const Auth: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<'user' | 'service_provider'>('user');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login, signup, loginWithGoogle, continueAsGuest, isAuthenticated, getPrimaryRole } = useAuth();
  const { toast } = useToast();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const role = getPrimaryRole();
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'service_provider') {
        navigate('/provider/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    }
  }, [isAuthenticated, getPrimaryRole, navigate]);

  const validateForm = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (!isLogin) {
      if (!name.trim()) {
        setError('Full name is required');
        return false;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await login(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError('Invalid email or password');
          } else if (error.message.includes('Email not confirmed')) {
            setError('Please verify your email before signing in');
          } else {
            setError(error.message);
          }
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
        }
      } else {
        const { error } = await signup(email, password, name, selectedRole);
        if (error) {
          if (error.message.includes('already registered')) {
            setError('An account with this email already exists');
          } else {
            setError(error.message);
          }
        } else {
          toast({
            title: "Account created!",
            description: "Please check your email to verify your account.",
          });
          setIsLogin(true);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await loginWithGoogle();
      if (error) {
        setError('Google login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestContinue = () => {
    continueAsGuest();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-8 sm:py-12">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
              <img src={handyfixLogo} alt="HandyFix Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-display font-bold text-xl sm:text-2xl text-foreground">HandyFix</span>
          </Link>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {isLogin 
                ? 'Sign in to access your account and book services'
                : 'Join HandyFix to find trusted service providers'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {!isLogin && (
              <>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="input-modern pl-10 sm:pl-12 text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">I want to</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('user')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedRole === 'user'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <User className={`w-6 h-6 mx-auto mb-2 ${selectedRole === 'user' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <p className={`text-sm font-medium ${selectedRole === 'user' ? 'text-foreground' : 'text-muted-foreground'}`}>
                        Find Services
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('service_provider')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedRole === 'service_provider'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <Briefcase className={`w-6 h-6 mx-auto mb-2 ${selectedRole === 'service_provider' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <p className={`text-sm font-medium ${selectedRole === 'service_provider' ? 'text-foreground' : 'text-muted-foreground'}`}>
                        Offer Services
                      </p>
                    </button>
                  </div>
                  {selectedRole === 'service_provider' && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Provider accounts require admin verification before receiving bookings.
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-modern pl-10 sm:pl-12 text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-modern pl-10 sm:pl-12 pr-10 sm:pr-12 text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-modern pl-10 sm:pl-12 text-sm sm:text-base"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-xl bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Alternative Actions */}
          <div className="space-y-3">
            <Button 
              type="button"
              variant="outline" 
              size="lg" 
              className="w-full gap-3"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <Button 
              type="button"
              variant="ghost" 
              size="lg" 
              className="w-full text-muted-foreground hover:text-foreground"
              onClick={handleGuestContinue}
            >
              Continue as Guest
            </Button>
          </div>

          {/* Toggle */}
          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-primary font-semibold hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Hero Image */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/8 via-muted to-accent/8 items-center justify-center p-8 xl:p-12">
        <div className="max-w-lg space-y-6 xl:space-y-8 text-center">
          <div className="w-28 h-28 xl:w-32 xl:h-32 mx-auto rounded-3xl overflow-hidden flex items-center justify-center animate-float shadow-lg shadow-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-4">
            <img src={handyfixLogo} alt="HandyFix Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="font-display text-2xl xl:text-3xl font-bold text-foreground">
            Find Trusted Professionals
          </h2>
          <p className="text-muted-foreground text-base xl:text-lg leading-relaxed">
            Connect with verified handymen, plumbers, electricians, and more. Quality service guaranteed.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['✓ Verified Providers', '✓ 24/7 Support', '✓ Secure Payments'].map((feature) => (
              <span key={feature} className="text-xs xl:text-sm text-muted-foreground bg-card/80 backdrop-blur-sm px-3 xl:px-4 py-2 rounded-full border border-border/50 shadow-sm">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
