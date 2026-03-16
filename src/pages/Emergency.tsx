import React, { useState } from 'react';
import { Phone, AlertTriangle, Zap, Droplet, Flame, Wind, Shield, Clock, MapPin, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/animations/PageTransition';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import MagneticButton from '@/components/animations/MagneticButton';

const emergencyServices = [
  { id: 'plumbing', icon: Droplet, name: 'Plumbing Emergency', description: 'Burst pipes, severe leaks, flooding, sewage backup', response: '30-60 min', phone: '+1 (234) 567-8901' },
  { id: 'electrical', icon: Zap, name: 'Electrical Emergency', description: 'Power outages, electrical fires, exposed wiring', response: '20-45 min', phone: '+1 (234) 567-8902' },
  { id: 'gas', icon: Flame, name: 'Gas Leak', description: 'Gas odor, suspected leak, appliance issues', response: '15-30 min', phone: '+1 (234) 567-8903' },
  { id: 'hvac', icon: Wind, name: 'HVAC Emergency', description: 'No heat in winter, AC failure in summer, carbon monoxide', response: '45-90 min', phone: '+1 (234) 567-8904' },
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
      <PageTransition>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/30 dark:via-background dark:to-background">
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal direction="down">
                <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emergency/10 text-emergency text-sm font-bold mb-6"
                  animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  <AlertTriangle className="w-5 h-5" /> 24/7 EMERGENCY SERVICES
                </motion.div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.1}>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Need <span className="text-emergency">Urgent Help?</span>
                </h1>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.2}>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  We're available around the clock for all home emergencies. Our verified professionals will be at your door within minutes.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <a href="tel:+1234567890">
                    <MagneticButton>
                      <motion.div animate={{ boxShadow: ['0 0 0 0 hsl(4 75% 52% / 0.4)', '0 0 0 20px hsl(4 75% 52% / 0)', '0 0 0 0 hsl(4 75% 52% / 0)'] }}
                        transition={{ duration: 2, repeat: Infinity }} className="rounded-2xl">
                        <Button variant="emergency" size="xl" className="gap-3 text-lg">
                          <Phone className="w-6 h-6" /> Call Emergency: +1 (234) 567-890
                        </Button>
                      </motion.div>
                    </MagneticButton>
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="max-w-lg mx-auto">
                  <div className="flex gap-3 p-2 rounded-2xl bg-card border border-border shadow-lg">
                    <div className="flex-1 relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input type="text" placeholder="Enter your pincode for fastest response" value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted border-0 focus:outline-none focus:ring-2 focus:ring-emergency/50 text-foreground placeholder:text-muted-foreground" />
                    </div>
                    <Button variant="emergency" size="lg">Find Help</Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Emergency Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Emergency Services We Provide</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Select your emergency type for immediate assistance from our specialized teams.</p>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {emergencyServices.map((service) => (
                <StaggerItem key={service.id}>
                  <motion.div onClick={() => setSelectedService(service.id)}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-colors ${
                      selectedService === service.id ? 'border-emergency bg-emergency/5 shadow-lg' : 'border-border bg-card hover:border-emergency/50'
                    }`}>
                    <div className="flex items-start gap-4">
                      <motion.div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${selectedService === service.id ? 'bg-emergency' : 'bg-emergency/10'}`}
                        animate={selectedService === service.id ? { rotate: [0, -10, 10, 0] } : {}} transition={{ duration: 0.5 }}>
                        <service.icon className={`w-7 h-7 ${selectedService === service.id ? 'text-white' : 'text-emergency'}`} />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-lg mb-1">{service.name}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{service.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1 text-success font-medium"><Clock className="w-4 h-4" /> Response: {service.response}</span>
                          <a href={`tel:${service.phone.replace(/\D/g, '')}`} className="text-emergency font-semibold hover:underline" onClick={(e) => e.stopPropagation()}>{service.phone}</a>
                        </div>
                      </div>
                    </div>
                    <AnimatePresence>
                      {selectedService === service.id && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-emergency/20 overflow-hidden">
                          <a href={`tel:${service.phone.replace(/\D/g, '')}`}>
                            <Button variant="emergency" className="w-full gap-2"><Phone className="w-4 h-4" /> Call Now for {service.name}</Button>
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">How Emergency Service Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Fast, simple, and reliable emergency response process.</p>
            </ScrollReveal>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {steps.map((item, index) => (
                <StaggerItem key={item.step}>
                  <div className="relative">
                    <motion.div className="bg-card border border-border rounded-2xl p-6 text-center h-full"
                      whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                      <motion.div className="w-12 h-12 rounded-full bg-emergency text-white font-bold text-xl flex items-center justify-center mx-auto mb-4"
                        whileHover={{ scale: 1.15, rotate: 360 }} transition={{ duration: 0.5 }}>
                        {item.step}
                      </motion.div>
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </motion.div>
                    {index < steps.length - 1 && (
                      <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Trust Badges */}
        <ScrollReveal>
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                {[
                  { icon: Shield, text: 'Licensed & Insured' },
                  { icon: Clock, text: 'Average 30 Min Response' },
                  { icon: Phone, text: '24/7 Availability' },
                ].map((item) => (
                  <motion.div key={item.text} className="flex items-center gap-3" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                    <div className="w-12 h-12 rounded-xl bg-emergency/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-emergency" />
                    </div>
                    <span className="font-semibold text-foreground">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Final CTA */}
        <ScrollReveal direction="up">
          <section className="py-16 bg-gradient-to-r from-red-500 to-orange-500 relative overflow-hidden">
            <div className="container mx-auto px-4 text-center relative">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Don't Wait - Get Help Now</h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-8">Every minute counts in an emergency. Our team is standing by to help you 24/7.</p>
              <a href="tel:+1234567890">
                <MagneticButton>
                  <Button size="xl" className="bg-white text-emergency hover:bg-white/90 gap-3 text-lg font-bold">
                    <Phone className="w-6 h-6" /> +1 (234) 567-890
                  </Button>
                </MagneticButton>
              </a>
            </div>
          </section>
        </ScrollReveal>
      </PageTransition>
    </Layout>
  );
};

export default Emergency;
