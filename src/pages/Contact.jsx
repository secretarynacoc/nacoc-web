import React from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';

// WordPress Contact Form 7 form ID for the Contact page form.
// Configure this in the WordPress admin (Contact > Forms) and expose the
// numeric ID via VITE_WP_CONTACT_FORM_ID at build time.
const CONTACT_FORM_ID = import.meta.env.VITE_WP_CONTACT_FORM_ID;

const Contact = () => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    organisation: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = React.useState('idle'); // idle, submitting, success, error
  const [errorMsg, setErrorMsg] = React.useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    // Field names below MUST match the field names defined in the
    // Contact Form 7 form on the WordPress backend.
    // The field set mirrors https://nacoc.org/contact-us/ exactly:
    //   First name *, Last name *, Organisation, Email *, Phone, Comments / Questions.
    const result = await api.submitForm(CONTACT_FORM_ID, {
      'your-name': `${formData.firstName} ${formData.lastName}`.trim(),
      'your-first-name': formData.firstName,
      'your-last-name': formData.lastName,
      'organisation': formData.organisation,
      'your-email': formData.email,
      'your-tel': formData.phone,
      'your-message': formData.message,
    });

    if (result.status === 'mail_sent') {
      setStatus('success');
      setFormData({ firstName: '', lastName: '', organisation: '', email: '', phone: '', message: '' });
    } else {
      setStatus('error');
      setErrorMsg(result.message || 'Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800 skew-x-[-20deg] transform translate-x-1/4 opacity-50"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-6xl font-heading font-bold text-white mb-6"
            >
                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Touch</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-300 max-w-2xl mx-auto"
            >
                We'd love to hear from you. Whether you have a question about membership, events, or just want to say hello.
            </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">
            
            {/* Contact Info Sidebar */}
            <div className="lg:w-1/3 bg-slate-50 p-10 lg:p-12 border-r border-slate-100 flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-8">Contact Information</h3>
                    
                    <div className="space-y-8">
                        <div className="flex items-start group">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <MapPin size={24} />
                            </div>
                            <div className="ml-5">
                                <h4 className="font-bold text-slate-900 mb-1">Our Location</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">1212 Royal Pkwy,<br/>Euless, TX 76040</p>
                            </div>
                        </div>

                        <div className="flex items-start group">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <Phone size={24} />
                            </div>
                            <div className="ml-5">
                                <h4 className="font-bold text-slate-900 mb-1">Phone Number</h4>
                                <p className="text-slate-500 text-sm">+1 (469) 345-6419</p>
                                <p className="text-slate-400 text-xs mt-1">Mon-Fri 9am-6pm</p>
                            </div>
                        </div>

                        <div className="flex items-start group">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <Mail size={24} />
                            </div>
                            <div className="ml-5">
                                <h4 className="font-bold text-slate-900 mb-1">Email Address</h4>
                                <p className="text-slate-500 text-sm break-all">info@nacoc.org</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-2 flex items-center">
                        <Clock size={16} className="mr-2 text-secondary" /> Office Hours
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-500">
                        <div className="flex justify-between">
                            <span>Monday - Friday</span>
                            <span className="font-medium text-slate-900">9:00 AM - 5:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Saturday - Sunday</span>
                            <span className="font-medium text-slate-900">Closed</span>
                        </div>
                    </ul>
                </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-2/3 p-10 lg:p-16">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Send us a Message</h3>
                <p className="text-slate-500 mb-10">Fill out the form below and our team will get back to you within 24 hours.</p>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">First Name</label>
                            <input 
                                type="text" 
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400" 
                                placeholder="John" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Last Name</label>
                            <input 
                                type="text" 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400" 
                                placeholder="Doe" 
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Organisation</label>
                        <input
                            type="text"
                            name="organisation"
                            value={formData.organisation}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                            placeholder="Company or organization (optional)"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400" 
                                placeholder="john@example.com" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone (Optional)</label>
                            <input 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400" 
                                placeholder="+1 (555) 000-0000" 
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Comments / Questions</label>
                        <textarea 
                            rows="5" 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400" 
                            placeholder="How can we help you?"
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={status === 'submitting'}
                        className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/30 w-full sm:w-auto hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'submitting' ? 'Sending...' : 'Send Message'} <Send size={18} className="ml-2" />
                    </button>
                    
                    {status === 'success' && (
                        <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 flex items-center">
                            <Clock className="mr-2" size={18} /> Message sent successfully! We'll get back to you shortly.
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
                            {errorMsg || 'Failed to send message. Please try again later.'}
                        </div>
                    )}
                </form>
            </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-16 rounded-3xl overflow-hidden shadow-lg border border-slate-100 h-96 relative bg-slate-100 group">
             <iframe 
                src="https://maps.google.com/maps?q=1212+Royal+Pkwy+Euless+TX+76040&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
