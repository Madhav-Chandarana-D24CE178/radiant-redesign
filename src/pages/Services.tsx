import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Clock, Shield, ChevronDown, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const serviceCategories = [
  { id: 'all', name: 'All Services' },
  { id: 'plumbing', name: 'Plumbing' },
  { id: 'electrical', name: 'Electrical' },
  { id: 'carpentry', name: 'Carpentry' },
  { id: 'painting', name: 'Painting' },
  { id: 'cleaning', name: 'Cleaning' },
  { id: 'hvac', name: 'HVAC' },
  { id: 'appliance', name: 'Appliance Repair' },
  { id: 'landscaping', name: 'Landscaping' },
];

const priceRanges = [
  { id: 'all', label: 'All Prices' },
  { id: 'budget', label: 'Under ₹500' },
  { id: 'mid', label: '₹500 - ₹1500' },
  { id: 'premium', label: '₹1500+' },
];

const services = [
  {
    id: 1,
    name: 'Emergency Plumbing Repair',
    category: 'plumbing',
    description: '24/7 emergency plumbing services for leaks, clogs, and pipe repairs.',
    price: 899,
    rating: 4.9,
    reviews: 234,
    duration: '1-2 hours',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop',
    popular: true,
  },
  {
    id: 2,
    name: 'Electrical Panel Upgrade',
    category: 'electrical',
    description: 'Upgrade your electrical panel for improved safety and capacity.',
    price: 1999,
    rating: 4.8,
    reviews: 189,
    duration: '4-6 hours',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
    popular: false,
  },
  {
    id: 3,
    name: 'Custom Furniture Building',
    category: 'carpentry',
    description: 'Handcrafted custom furniture tailored to your specifications.',
    price: 3599,
    rating: 4.9,
    reviews: 156,
    duration: '1-2 weeks',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    popular: true,
  },
  {
    id: 4,
    name: 'Interior Painting',
    category: 'painting',
    description: 'Professional interior painting with premium quality paints.',
    price: 1799,
    rating: 4.7,
    reviews: 203,
    duration: '1-3 days',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop',
    popular: false,
  },
  {
    id: 5,
    name: 'Deep Home Cleaning',
    category: 'cleaning',
    description: 'Comprehensive deep cleaning service for your entire home.',
    price: 999,
    rating: 4.8,
    reviews: 312,
    duration: '3-5 hours',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
    popular: true,
  },
  {
    id: 6,
    name: 'AC Installation & Repair',
    category: 'hvac',
    description: 'Professional AC installation, maintenance, and repair services.',
    price: 1299,
    rating: 4.6,
    reviews: 178,
    duration: '2-4 hours',
    image: 'https://images.unsplash.com/photo-1631545806609-35d4ae440431?w=400&h=300&fit=crop',
    popular: false,
  },
  {
    id: 7,
    name: 'Water Heater Installation',
    category: 'plumbing',
    description: 'Expert water heater installation and replacement services.',
    price: 2499,
    rating: 4.9,
    reviews: 145,
    duration: '3-4 hours',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop',
    popular: false,
  },
  {
    id: 8,
    name: 'Smart Home Wiring',
    category: 'electrical',
    description: 'Complete smart home wiring and automation setup.',
    price: 4999,
    rating: 4.8,
    reviews: 98,
    duration: '1-2 days',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop',
    popular: true,
  },
];

const Services: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [priceRange, setPriceRange] = useState([100, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesPrice = selectedPrice === 'all' ||
                         (selectedPrice === 'budget' && service.price < 500) ||
                         (selectedPrice === 'mid' && service.price >= 500 && service.price < 1500) ||
                         (selectedPrice === 'premium' && service.price >= 1500);
    const matchesPriceRange = service.price >= priceRange[0] && service.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice && matchesPriceRange;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === 'popular') return b.reviews - a.reviews;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Browse Our Services
            </h1>
            <p className="text-lg text-muted-foreground">
              Find the perfect service for your home needs from our wide range of professional offerings.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground placeholder:text-muted-foreground"
              />
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
                Showing <span className="font-medium text-foreground">{sortedServices.length}</span> services
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
                        <h4 className="font-semibold text-foreground">Category</h4>
                        <button
                          onClick={() => setSelectedCategory('all')}
                          className="text-xs text-primary hover:text-primary/80"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="space-y-2 mb-4">
                        {serviceCategories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                              selectedCategory === category.id
                                ? 'bg-primary text-primary-foreground font-medium'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>

                      <div className="border-t border-border pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-foreground">Price Range</h4>
                          <button
                            onClick={() => setSelectedPrice('all')}
                            className="text-xs text-primary hover:text-primary/80"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="space-y-2">
                          {priceRanges.map((range) => (
                            <button
                              key={range.id}
                              onClick={() => setSelectedPrice(range.id)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                                selectedPrice === range.id
                                  ? 'bg-primary text-primary-foreground font-medium'
                                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                              }`}
                            >
                              {range.label}
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
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>

                {/* Clear All Button */}
                {(selectedCategory !== 'all' || selectedPrice !== 'all') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedPrice('all');
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

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedServices.map((service, index) => (
              <div 
                key={service.id} 
                className="service-card animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  {service.popular && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      Popular
                    </div>
                  )}
                </div>
                <div className="pt-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground text-lg leading-tight">{service.name}</h3>
                    <span className="font-bold text-primary text-lg">₹{service.price.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-foreground">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {service.rating}
                      </span>
                      <span className="text-muted-foreground">({service.reviews})</span>
                    </div>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {service.duration}
                    </span>
                  </div>
                  <Button variant="default" className="w-full mt-4">
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {sortedServices.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground text-xl mb-2">No services found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Services;
