import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Star, 
  ArrowRight, 
  Wrench, 
  Zap, 
  Droplet, 
  Paintbrush, 
  Hammer, 
  Wind,
  Shield,
  Clock,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  Quote
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const categories = [
  { icon: Wrench, name: 'Plumbing', count: '245+ Providers', color: 'from-blue-500 to-blue-600' },
  { icon: Zap, name: 'Electrical', count: '189+ Providers', color: 'from-emerald-500 to-teal-500' },
  { icon: Hammer, name: 'Carpentry', count: '156+ Providers', color: 'from-teal-600 to-teal-700' },
  { icon: Paintbrush, name: 'Painting', count: '178+ Providers', color: 'from-purple-500 to-purple-600' },
  { icon: Droplet, name: 'Cleaning', count: '312+ Providers', color: 'from-cyan-500 to-cyan-600' },
  { icon: Wind, name: 'HVAC', count: '98+ Providers', color: 'from-teal-500 to-teal-600' },
];

const featuredProviders = [
  {
    id: 1,
    name: 'John Smith',
    profession: 'Master Plumber',
    rating: 4.9,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    verified: true,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    profession: 'Electrician',
    rating: 4.8,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    verified: true,
  },
  {
    id: 3,
    name: 'Mike Chen',
    profession: 'Carpenter',
    rating: 4.9,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    verified: true,
  },
  {
    id: 4,
    name: 'Emily Davis',
    profession: 'Interior Painter',
    rating: 4.7,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    verified: true,
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Amanda Roberts',
    role: 'Homeowner',
    content: 'HandyFix saved me so much time! Found an amazing plumber within minutes. The service was professional and affordable.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'David Thompson',
    role: 'Property Manager',
    content: 'As a property manager, I rely on HandyFix for all maintenance needs. The providers are vetted and reliable.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    name: 'Lisa Martinez',
    role: 'Business Owner',
    content: 'Quick response time and excellent work quality. HandyFix has become our go-to for all commercial repairs.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
  },
];

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '2,500+', label: 'Verified Providers' },
  { value: '100K+', label: 'Jobs Completed' },
  { value: '4.8★', label: 'Average Rating' },
];

const Index: React.FC = () => {
  const [service, setService] = useState('');
  const [pincode, setPincode] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setService(value);
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setPincode(value);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 py-20 lg:py-32 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-up">
              <Shield className="w-4 h-4" />
              Trusted by 50,000+ customers
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Find Trusted <span className="text-primary">Home Service</span> Professionals Near You
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Connect with verified plumbers, electricians, carpenters, and more. Quality work guaranteed, hassle-free booking.
            </p>

            {/* Search Box */}
            <div className="max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-card border border-border shadow-xl">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Enter pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button variant="hero" size="lg" className="gap-2">
                  Search
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-8 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: Shield, text: 'Verified Providers' },
              { icon: Clock, text: '24/7 Availability' },
              { icon: ThumbsUp, text: 'Satisfaction Guaranteed' },
            ].map((feature) => (
              <div key={feature.text} className="flex items-center gap-3 text-muted-foreground">
                <feature.icon className="w-5 h-5 text-primary" />
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Categories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through our most requested service categories and find the right professional for your needs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to="/services"
                className="category-card group animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.count}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services">
              <Button variant="outline" size="lg" className="gap-2">
                View All Services
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Service Providers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet our top-rated professionals ready to help with your home service needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProviders.map((provider, index) => (
              <div 
                key={provider.id} 
                className="provider-card animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img 
                    src={provider.image} 
                    alt={provider.name}
                    className="w-full h-48 object-cover"
                  />
                  {provider.verified && (
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-success text-success-foreground text-xs font-medium flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Verified
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-foreground text-lg">{provider.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{provider.profession}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium text-foreground">{provider.rating}</span>
                      <span className="text-sm text-muted-foreground">({provider.reviews})</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/providers">
              <Button variant="default" size="lg" className="gap-2">
                Find More Providers
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real reviews from real customers who found their perfect service provider.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="testimonial-card">
                <Quote className="w-12 h-12 text-primary/20 mb-6" />
                <p className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-4 mt-8">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={prevTestimonial}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentTestimonial ? 'w-8 bg-primary' : 'bg-border hover:bg-primary/50'
                      }`}
                    />
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers and find your perfect service provider today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services">
              <Button size="xl" className="bg-white text-primary hover:bg-white/90 gap-2">
                Browse Services
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="ghost" size="xl" className="border-2 border-white text-white hover:bg-white/20 gap-2">
                Join as Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
