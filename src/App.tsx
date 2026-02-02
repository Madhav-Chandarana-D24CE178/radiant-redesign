import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Public pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Services from "./pages/Services";
import FindProviders from "./pages/FindProviders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Emergency from "./pages/Emergency";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// User Dashboard pages
import UserDashboard from "./pages/user/UserDashboard";
import UserBookings from "./pages/user/UserBookings";

// Provider Dashboard pages
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import ProviderRequests from "./pages/provider/ProviderRequests";

// Admin Dashboard pages
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/services" element={<Services />} />
              <Route path="/providers" element={<FindProviders />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/emergency" element={<Emergency />} />
              
              {/* Protected Profile Route */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              {/* User Dashboard Routes */}
              <Route path="/user/dashboard" element={
                <ProtectedRoute requiredRoles={['user']}>
                  <UserDashboard />
                </ProtectedRoute>
              } />
              <Route path="/user/bookings" element={
                <ProtectedRoute requiredRoles={['user']}>
                  <UserBookings />
                </ProtectedRoute>
              } />
              
              {/* Provider Dashboard Routes */}
              <Route path="/provider/dashboard" element={
                <ProtectedRoute requiredRoles={['service_provider']}>
                  <ProviderDashboard />
                </ProtectedRoute>
              } />
              <Route path="/provider/requests" element={
                <ProtectedRoute requiredRoles={['service_provider']}>
                  <ProviderRequests />
                </ProtectedRoute>
              } />
              
              {/* Admin Dashboard Routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
