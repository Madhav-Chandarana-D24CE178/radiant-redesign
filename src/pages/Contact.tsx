import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, CheckCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation - alphabets only
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name must contain only alphabets';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation - Indian format
    if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Please enter a valid Indian phone number';
    }

    // Subject validation
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    // Message validation - reasonable character limits
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.length > 1000) {
      newErrors.message = 'Message cannot exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setErrors({});

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Validation for name field - alphabets only
    if (name === 'name') {
      const validValue = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: validValue
      }));
    }
    // Validation for phone field - numbers only
    else if (name === 'phone') {
      const validValue = value.replace(/[^0-9+\s()-]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: validValue
      }));
    }
    // Validation for message - character limit check
    else if (name === 'message' && value.length <= 1000) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    // Other fields
    else if (name !== 'message') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-8">
                  Reach out to us through any of these channels. We're here to help!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a href="mailto:support@handyfix.com" className="text-muted-foreground hover:text-primary transition-colors">
                      support@handyfix.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <a href="tel:+919876543210" className="text-muted-foreground hover:text-primary transition-colors">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      Bandra<br />
                      Mumbai 400050<br />
                      Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Mon - Fri: 8:00 AM - 8:00 PM<br />
                      Sat - Sun: 9:00 AM - 6:00 PM<br />
                      <span className="text-success font-medium">24/7 Emergency Services</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-2xl p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">Send a Message</h2>
                    <p className="text-muted-foreground text-sm">Fill out the form below and we'll get back to you shortly.</p>
                  </div>
                </div>

                {isSubmitted && (
                  <div className="mb-6 p-4 rounded-xl bg-success/10 border border-success/20 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <p className="text-success font-medium">Message sent successfully! We'll get back to you soon.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name * (alphabets only)
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className={`input-modern ${errors.name ? 'border-destructive ring-destructive/50' : ''}`}
                      />
                      {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className={`input-modern ${errors.email ? 'border-destructive ring-destructive/50' : ''}`}
                      />
                      {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number (Indian format)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={`input-modern ${errors.phone ? 'border-destructive ring-destructive/50' : ''}`}
                      />
                      {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className={`input-modern appearance-none ${errors.subject ? 'border-destructive ring-destructive/50' : ''}`}
                      >
                        <option value="">Select a topic</option>
                        <option value="general">General Inquiry</option>
                        <option value="booking">Booking Help</option>
                        <option value="provider">Become a Provider</option>
                        <option value="feedback">Feedback</option>
                        <option value="complaint">Complaint</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message * ({formData.message.length}/1000)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help... (10-1000 characters)"
                      required
                      rows={6}
                      className={`input-modern resize-none ${errors.message ? 'border-destructive ring-destructive/50' : ''}`}
                    />
                    {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full sm:w-auto gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0937872231597!2d72.82652!3d19.05975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ca6e0000000d%3A0x0!2sBandra%2C%20Mumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="HandyFix Location in Mumbai"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
