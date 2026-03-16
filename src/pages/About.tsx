import React from 'react';
import { Users, Award, Clock, Shield, Target, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/animations/PageTransition';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import AnimatedCounter from '@/components/animations/AnimatedCounter';
import MagneticButton from '@/components/animations/MagneticButton';
import FloatingElement from '@/components/animations/FloatingElement';

const values = [
  { icon: Shield, title: 'Trust & Safety', description: 'All our providers are thoroughly vetted and background checked for your peace of mind.' },
  { icon: Award, title: 'Quality Service', description: 'We only partner with skilled professionals who meet our high standards of excellence.' },
  { icon: Clock, title: 'Reliability', description: 'Count on us for timely service delivery and consistent communication throughout.' },
  { icon: Heart, title: 'Customer First', description: 'Your satisfaction is our priority. We go above and beyond to exceed expectations.' },
];

const stats = [
  { value: '50,000+', label: 'Happy Customers' },
  { value: '2,500+', label: 'Verified Providers' },
  { value: '100,000+', label: 'Jobs Completed' },
  { value: '4.8/5', label: 'Average Rating' },
];

const team = [
  { name: 'Alex Rodriguez', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop' },
  { name: 'Jennifer Park', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop' },
  { name: 'Marcus Johnson', role: 'CTO', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop' },
  { name: 'Sophia Chen', role: 'Head of Customer Success', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop' },
];

const About: React.FC = () => {
  return (
    <Layout>
      <PageTransition>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" data-parallax="0.2" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal direction="down">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Target className="w-4 h-4" /> Our Mission
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.15}>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Making Home Services <span className="text-primary">Simple & Reliable</span>
                </h1>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.25}>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  We're on a mission to connect homeowners with trusted, skilled professionals for all their service needs. Quality work, guaranteed satisfaction.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <ScrollReveal>
          <section className="py-16 border-y border-border bg-muted/30">
            <div className="container mx-auto px-4">
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <StaggerItem key={stat.label}>
                    <div className="text-center">
                      <div className="font-display text-4xl font-bold text-foreground mb-2">
                        <AnimatedCounter value={stat.value} />
                      </div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        </ScrollReveal>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal direction="left">
                <div className="space-y-6">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Our Story</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    HandyFix was founded in 2020 with a simple idea: make it easy for homeowners to find reliable service professionals. After experiencing the frustration of hiring unvetted contractors, our founders set out to create a platform that prioritizes trust and quality.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Today, we've grown to serve over 50,000 customers across the country, connecting them with 2,500+ verified professionals.
                  </p>
                  <ul className="space-y-3">
                    {['Rigorous vetting process for all providers', '100% satisfaction guarantee on every job', '24/7 customer support for emergencies', 'Secure payments and transparent pricing'].map((item, i) => (
                      <motion.li key={item} className="flex items-center gap-3 text-foreground"
                        initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}>
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" /> {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right">
                <div className="relative">
                  <motion.div className="aspect-square rounded-3xl overflow-hidden"
                    whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
                    <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=800&fit=crop" alt="Team collaboration" className="w-full h-full object-cover" />
                  </motion.div>
                  <FloatingElement duration={4} distance={8}>
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
                  </FloatingElement>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">These principles guide everything we do at HandyFix.</p>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <StaggerItem key={value.title}>
                  <motion.div className="bg-card border border-border rounded-2xl p-6 h-full"
                    whileHover={{ y: -8, boxShadow: '0 20px 40px -10px hsl(220 15% 50% / 0.15)' }} transition={{ duration: 0.3 }}>
                    <motion.div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5"
                      whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                      <value.icon className="w-7 h-7 text-primary" />
                    </motion.div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">The passionate people behind HandyFix.</p>
            </ScrollReveal>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <StaggerItem key={member.name}>
                  <div className="text-center">
                    <motion.div className="mb-4 relative inline-block" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                      <img src={member.image} alt={member.name} className="w-40 h-40 rounded-2xl object-cover mx-auto" />
                    </motion.div>
                    <h3 className="font-semibold text-foreground text-lg">{member.name}</h3>
                    <p className="text-muted-foreground text-sm">{member.role}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <ScrollReveal direction="up">
          <section className="py-20 bg-primary relative overflow-hidden">
            <FloatingElement duration={6} distance={15} className="absolute -top-20 -right-20 opacity-10">
              <div className="w-64 h-64 rounded-full border-2 border-white" />
            </FloatingElement>
            <div className="container mx-auto px-4 text-center relative">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Ready to Experience HandyFix?</h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-8">Join thousands of satisfied customers and find your perfect service provider today.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/services">
                  <MagneticButton><Button size="xl" className="bg-white text-primary hover:bg-white/90 gap-2">Browse Services <ArrowRight className="w-5 h-5" /></Button></MagneticButton>
                </Link>
                <Link to="/contact">
                  <MagneticButton><Button variant="ghost" size="xl" className="border-2 border-white text-white hover:bg-white/20 gap-2">Contact Us</Button></MagneticButton>
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </PageTransition>
    </Layout>
  );
};

export default About;
