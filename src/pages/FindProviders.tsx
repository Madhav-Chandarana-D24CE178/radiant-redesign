import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Shield, Clock, ChevronDown, X, Phone, MessageSquare } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const specializations = [
  { id: 'all', name: 'All Specializations' },
  { id: 'plumber', name: 'Plumber' },
  { id: 'electrician', name: 'Electrician' },
  { id: 'carpenter', name: 'Carpenter' },
  { id: 'painter', name: 'Painter' },
  { id: 'cleaner', name: 'Cleaner' },
  { id: 'hvac', name: 'HVAC Technician' },
];

const availabilityOptions = [
  { id: 'all', name: 'Any Time' },
  { id: 'now', name: 'Available Now' },
  { id: 'today', name: 'Today' },
  { id: 'week', name: 'This Week' },
];

const providers = [
  {
    id: 1,
    name: 'John Smith',
    specialization: 'plumber',
    title: 'Master Plumber',
    rating: 4.9,
    reviews: 234,
    experience: '15 years',
    location: 'Downtown',
    distance: '2.5 km',
    hourlyRate: 650,
    verified: true,
    available: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    skills: ['Pipe Repair', 'Water Heaters', 'Emergency'],
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    specialization: 'electrician',
    title: 'Licensed Electrician',
    rating: 4.8,
    reviews: 189,
    experience: '12 years',
    location: 'Westside',
    distance: '3.1 km',
    hourlyRate: 750,
    verified: true,
    available: true,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    skills: ['Rewiring', 'Smart Home', 'Panel Upgrade'],
  },
  {
    id: 3,
    name: 'Mike Chen',
    specialization: 'carpenter',
    title: 'Master Carpenter',
    rating: 4.9,
    reviews: 167,
    experience: '20 years',
    location: 'Eastside',
    distance: '4.2 km',
    hourlyRate: 700,
    verified: true,
    available: false,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    skills: ['Custom Furniture', 'Decks', 'Cabinets'],
  },
  {
    id: 4,
    name: 'Emily Davis',
    specialization: 'painter',
    title: 'Interior Painter',
    rating: 4.7,
    reviews: 145,
    experience: '8 years',
    location: 'Northside',
    distance: '1.8 km',
    hourlyRate: 550,
    verified: true,
    available: true,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    skills: ['Interior', 'Exterior', 'Wallpaper'],
  },
  {
    id: 5,
    name: 'Robert Garcia',
    specialization: 'hvac',
    title: 'HVAC Specialist',
    rating: 4.8,
    reviews: 198,
    experience: '10 years',
    location: 'Midtown',
    distance: '2.9 km',
    hourlyRate: 800,
    verified: true,
    available: true,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    skills: ['AC Repair', 'Heating', 'Ventilation'],
  },
  {
    id: 6,
    name: 'Lisa Martinez',
    specialization: 'cleaner',
    title: 'Professional Cleaner',
    rating: 4.9,
    reviews: 312,
    experience: '6 years',
    location: 'Southside',
    distance: '3.5 km',
    hourlyRate: 450,
    verified: true,
    available: true,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    skills: ['Deep Clean', 'Move-out', 'Commercial'],
  },
];

const FindProviders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pincode, setPincode] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setSearchQuery(value);
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setPincode(value);
  };

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          provider.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpec = selectedSpec === 'all' || provider.specialization === selectedSpec;
    const matchesAvailability = selectedAvailability === 'all' ||
                                (selectedAvailability === 'now' && provider.available);
    return matchesSearch && matchesSpec && matchesAvailability;
  });

  const sortedProviders = [...filteredProviders].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviews - a.reviews;
    if (sortBy === 'price-low') return a.hourlyRate - b.hourlyRate;
    if (sortBy === 'price-high') return b.hourlyRate - a.hourlyRate;
    return 0;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Find Service Providers
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect with verified professionals in your area ready to help with your projects.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-card border border-border shadow-lg">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search providers... (alphabets only)"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Enter pincode (6 digits)"
                    value={pincode}
                    onChange={handlePincodeChange}
                    maxLength={6}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button variant="hero" size="lg" disabled={pincode.length !== 6}>
                  Search
                </Button>
              </div>
              {pincode && pincode.length !== 6 && (
                <p className="text-xs text-destructive">Pincode must be exactly 6 digits</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Horizontal Filters & Sort */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">{sortedProviders.length}</span> providers found
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {/* Filters Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border text-foreground hover:bg-muted transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    <span className="text-sm font-medium">Filters</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {showFilters && (
                    <div className="absolute top-full mt-2 left-0 w-56 bg-card border border-border rounded-xl shadow-lg z-50 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-foreground">Specialization</h4>
                        <button
                          onClick={() => setSelectedSpec('all')}
                          className="text-xs text-primary hover:text-primary/80"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="space-y-2 mb-4">
                        {specializations.map((spec) => (
                          <button
                            key={spec.id}
                            onClick={() => setSelectedSpec(spec.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                              selectedSpec === spec.id
                                ? 'bg-primary text-primary-foreground font-medium'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            }`}
                          >
                            {spec.name}
                          </button>
                        ))}
                      </div>

                      <div className="border-t border-border pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-foreground">Availability</h4>
                          <button
                            onClick={() => setSelectedAvailability('all')}
                            className="text-xs text-primary hover:text-primary/80"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="space-y-2">
                          {availabilityOptions.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setSelectedAvailability(option.id)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                                selectedAvailability === option.id
                                  ? 'bg-primary text-primary-foreground font-medium'
                                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                              }`}
                            >
                              {option.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-card border border-border rounded-xl px-4 py-2 pr-10 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviews</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>

                {/* Clear All Button */}
                {(selectedSpec !== 'all' || selectedAvailability !== 'all') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedSpec('all');
                      setSelectedAvailability('all');
                      setShowFilters(false);
                    }}
                    className="text-muted-foreground hover:text-primary"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Providers List */}
          <div className="space-y-4">
            {sortedProviders.map((provider, index) => (
              <div 
                key={provider.id} 
                className="provider-card p-6 animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <img 
                      src={provider.image} 
                      alt={provider.name}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground text-xl">{provider.name}</h3>
                          {provider.verified && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                              <Shield className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground">{provider.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary text-2xl">₹{provider.hourlyRate.toLocaleString('en-IN')}</p>
                        <p className="text-sm text-muted-foreground">per hour</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                      <span className="flex items-center gap-1 text-foreground">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {provider.rating}
                        <span className="text-muted-foreground">({provider.reviews} reviews)</span>
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {provider.experience}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {provider.distance}
                      </span>
                      {provider.available && (
                        <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                          Available Now
                        </span>
                      )}
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {provider.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <Button variant="default">
                        View Profile
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Phone className="w-4 h-4" />
                        Call
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedProviders.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground text-xl mb-2">No providers found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default FindProviders;
