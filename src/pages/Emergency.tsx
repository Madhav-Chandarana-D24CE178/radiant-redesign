import React, { useState } from 'react';
import { Phone, AlertTriangle, Zap, Droplet, Flame, Wind, Shield, Clock, MapPin, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const emergencyServices = [
  {
    id: 'plumbing',
    icon: Droplet,
    name: 'Plumbing Emergency',
    description: 'Burst pipes, severe leaks, flooding, sewage backup',
    response: '30-60 min',
    phone: '+1 (234) 567-8901',
  },
  {
    id: 'electrical',
    icon: Zap,
    name: 'Electrical Emergency',
    description: 'Power outages, electrical fires, exposed wiring',
    response: '20-45 min',
    phone: '+1 (234) 567-8902',
  },
  {
    id: 'gas',
    icon: Flame,
    name: 'Gas Leak',
    description: 'Gas odor, suspected leak, appliance issues',
    response: '15-30 min',
    phone: '+1 (234) 567-8903',
  },
  {
    id: 'hvac',
    icon: Wind,
    name: 'HVAC Emergency',
    description: 'No heat in winter, AC failure in summer, carbon monoxide',
    response: '45-90 min',
    phone: '+1 (234) 567-8904',
  },
];

const steps = [
  { step: 1, title: 'Call Our Hotline', description: 'Reach our 24/7 emergency line immediately' },
  { step: 2, title: 'Describe the Issue', description: 'Give us details about your emergency' },
  { step: 3, title: 'Help is Dispatched', description: 'We send the nearest available professional' },
  { step: 4, title: 'Problem Solved', description: 'Expert arrives and resolves your emergency' },
];

const Emergency: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [pincode, setPincode] = useState('');

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/30 dark:via-background dark:to-background">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emergency/10 text-emergency text-sm font-bold mb-6 animate-pulse">
              <AlertTriangle className="w-5 h-5" />
              24/7 EMERGENCY SERVICES
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Need <span className="text-emergency">Urgent Help?</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              We're available around the clock for all home emergencies. Our verified professionals will be at your door within minutes.
            </p>

            {/* Emergency Call Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="tel:+1234567890">
                <Button variant="emergency" size="xl" className="gap-3 text-lg animate-pulse-glow">
                  <Phone className="w-6 h-6" />
                  Call Emergency: +1 (234) 567-890
                </Button>
              </a>
            </div>

            {/* Quick Location Input */}
            <div className="max-w-lg mx-auto">
              <div className="flex gap-3 p-2 rounded-2xl bg-card border border-border shadow-lg">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Enter your pincode for fastest response"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted border-0 focus:outline-none focus:ring-2 focus:ring-emergency/50 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button variant="emergency" size="lg">
                  Find Help
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Emergency Services We Provide
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select your emergency type for immediate assistance from our specialized teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {emergencyServices.map((service, index) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 animate-fade-up ${
                  selectedService === service.id
                    ? 'border-emergency bg-emergency/5 shadow-lg'
                    : 'border-border bg-card hover:border-emergency/50 hover:shadow-md'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    selectedService === service.id ? 'bg-emergency' : 'bg-emergency/10'
                  }`}>
                    <service.icon className={`w-7 h-7 ${
                      selectedService === service.id ? 'text-white' : 'text-emergency'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-lg mb-1">{service.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{service.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-success font-medium">
                        <Clock className="w-4 h-4" />
                        Response: {service.response}
                      </span>
                      <a 
                        href={`tel:${service.phone.replace(/\D/g, '')}`}
                        className="text-emergency font-semibold hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {service.phone}
                      </a>
                    </div>
                  </div>
                </div>
                {selectedService === service.id && (
                  <div className="mt-4 pt-4 border-t border-emergency/20">
                    <a href={`tel:${service.phone.replace(/\D/g, '')}`}>
                      <Button variant="emergency" className="w-full gap-2">
                        <Phone className="w-4 h-4" />
                        Call Now for {service.name}
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Emergency Service Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fast, simple, and reliable emergency response process.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="bg-card border border-border rounded-2xl p-6 text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-emergency text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: Shield, text: 'Licensed & Insured' },
              { icon: Clock, text: 'Average 30 Min Response' },
              { icon: Phone, text: '24/7 Availability' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emergency/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-emergency" />
                </div>
                <span className="font-semibold text-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Don't Wait - Get Help Now
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Every minute counts in an emergency. Our team is standing by to help you 24/7.
          </p>
          <a href="tel:+1234567890">
            <Button size="xl" className="bg-white text-emergency hover:bg-white/90 gap-3 text-lg font-bold">
              <Phone className="w-6 h-6" />
              +1 (234) 567-890
            </Button>
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Emergency;
