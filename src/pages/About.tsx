import React from 'react';
import { Users, Award, Clock, Shield, Target, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: Shield,
    title: 'Trust & Safety',
    description: 'All our providers are thoroughly vetted and background checked for your peace of mind.',
  },
  {
    icon: Award,
    title: 'Quality Service',
    description: 'We only partner with skilled professionals who meet our high standards of excellence.',
  },
  {
    icon: Clock,
    title: 'Reliability',
    description: 'Count on us for timely service delivery and consistent communication throughout.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We go above and beyond to exceed expectations.',
  },
];

const stats = [
  { value: '50,000+', label: 'Happy Customers' },
  { value: '2,500+', label: 'Verified Providers' },
  { value: '100,000+', label: 'Jobs Completed' },
  { value: '4.8/5', label: 'Average Rating' },
];

const team = [
  {
    name: 'Alex Rodriguez',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
  },
  {
    name: 'Jennifer Park',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
  },
  {
    name: 'Marcus Johnson',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
  },
  {
    name: 'Sophia Chen',
    role: 'Head of Customer Success',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
  },
];

const About: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              Our Mission
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Making Home Services <span className="text-primary">Simple & Reliable</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              We're on a mission to connect homeowners with trusted, skilled professionals 
              for all their service needs. Quality work, guaranteed satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Our Story
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                HandyFix was founded in 2020 with a simple idea: make it easy for homeowners 
                to find reliable service professionals. After experiencing the frustration of 
                hiring unvetted contractors, our founders set out to create a platform that 
                prioritizes trust and quality.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Today, we've grown to serve over 50,000 customers across the country, 
                connecting them with 2,500+ verified professionals. Our commitment to 
                excellence remains unchanged – every provider on our platform is thoroughly 
                vetted, background-checked, and reviewed by real customers.
              </p>
              <ul className="space-y-3">
                {[
                  'Rigorous vetting process for all providers',
                  '100% satisfaction guarantee on every job',
                  '24/7 customer support for emergencies',
                  'Secure payments and transparent pricing',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=800&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 p-6 rounded-2xl bg-card border border-border shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-2xl text-foreground">50K+</div>
                    <div className="text-muted-foreground text-sm">Satisfied Customers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at HandyFix.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind HandyFix, dedicated to improving your home service experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div 
                key={member.name}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 relative inline-block">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-40 h-40 rounded-2xl object-cover mx-auto"
                  />
                </div>
                <h3 className="font-semibold text-foreground text-lg">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Experience HandyFix?
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
            <Link to="/contact">
              <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
