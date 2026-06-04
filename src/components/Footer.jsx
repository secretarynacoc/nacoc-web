import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-slate-200 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-white to-primary"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-6 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* About Section */}
          <div className="space-y-6">
            <div className="bg-white p-2 inline-block rounded-xl shadow-lg">
                <img src="/assets/logo.png" alt="NACOC Logo" className="h-12 w-auto" />
            </div>
            
            <p className="text-sm leading-relaxed text-slate-300">
              <span className="font-bold text-white">Nepalese American Chamber of Commerce</span> serves as the leading voice for Nepalese American entrepreneurs, professionals, and businesses — advancing economic growth, supporting business development, and creating opportunities that empower our community to thrive.
            </p>
            
            <div className="flex gap-3">
              <a href="https://www.facebook.com/nepalichamber" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-secondary p-2.5 rounded-lg transition-all duration-300 hover:-translate-y-1 group">
                 <Facebook size={18} className="group-hover:text-white text-slate-300" />
              </a>
              <a href="https://www.instagram.com/nacoc_tx/" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-secondary p-2.5 rounded-lg transition-all duration-300 hover:-translate-y-1 group">
                 <Instagram size={18} className="group-hover:text-white text-slate-300" />
              </a>
              <a href="#" className="bg-white/5 hover:bg-secondary p-2.5 rounded-lg transition-all duration-300 hover:-translate-y-1 group">
                 <Linkedin size={18} className="group-hover:text-white text-slate-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-heading font-bold mb-6 flex items-center gap-2">
               <span className="w-1 h-5 bg-secondary rounded-full"></span> Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about-us" className="text-slate-300 hover:text-white hover:translate-x-1 inline-flex items-center transition-all bg-transparent w-full"><ArrowRight size={12} className="mr-2 opacity-0 -ml-4 hover:ml-0 hover:opacity-100 transition-all text-secondary" /> About Us</Link></li>
              <li><Link to="/programs" className="text-slate-300 hover:text-white hover:translate-x-1 inline-flex items-center transition-all bg-transparent w-full"><ArrowRight size={12} className="mr-2 opacity-0 -ml-4 hover:ml-0 hover:opacity-100 transition-all text-secondary" /> Programs</Link></li>
              <li><Link to="/directory" className="text-slate-300 hover:text-white hover:translate-x-1 inline-flex items-center transition-all bg-transparent w-full"><ArrowRight size={12} className="mr-2 opacity-0 -ml-4 hover:ml-0 hover:opacity-100 transition-all text-secondary" /> Business Directory</Link></li>
              <li><Link to="/membership" className="text-slate-300 hover:text-white hover:translate-x-1 inline-flex items-center transition-all bg-transparent w-full"><ArrowRight size={12} className="mr-2 opacity-0 -ml-4 hover:ml-0 hover:opacity-100 transition-all text-secondary" /> Membership</Link></li>
              <li><Link to="/contact-us" className="text-slate-300 hover:text-white hover:translate-x-1 inline-flex items-center transition-all bg-transparent w-full"><ArrowRight size={12} className="mr-2 opacity-0 -ml-4 hover:ml-0 hover:opacity-100 transition-all text-secondary" /> Contact Us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white text-lg font-heading font-bold mb-6 flex items-center gap-2">
               <span className="w-1 h-5 bg-secondary rounded-full"></span> Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/events" className="text-slate-300 hover:text-white hover:translate-x-1 inline-flex items-center transition-all w-full"><ArrowRight size={12} className="mr-2 opacity-0 -ml-4 hover:ml-0 hover:opacity-100 transition-all text-secondary" /> News & Events</Link></li>
              <li><Link to="/resources" className="text-slate-300 hover:text-white hover:translate-x-1 inline-flex items-center transition-all w-full"><ArrowRight size={12} className="mr-2 opacity-0 -ml-4 hover:ml-0 hover:opacity-100 transition-all text-secondary" /> Community Resources</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-heading font-bold mb-6 flex items-center gap-2">
               <span className="w-1 h-5 bg-secondary rounded-full"></span> Contact Us
            </h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start group cursor-default">
                <div className="bg-white/5 p-2 rounded-lg mr-3 group-hover:bg-secondary group-hover:text-white transition-colors text-secondary">
                    <MapPin size={18} />
                </div>
                <span className="text-slate-300">
                   <span className="block text-white font-bold mb-1">Mailing Address</span>
                   1212 Royal Pkwy<br />Euless, TX 76040
                </span>
              </li>
              <li className="flex items-center group">
                <div className="bg-white/5 p-2 rounded-lg mr-3 group-hover:bg-secondary group-hover:text-white transition-colors text-secondary">
                    <Phone size={18} />
                </div>
                <div>
                   <span className="block text-white font-bold text-xs mb-0.5">Phone</span>
                    <a href="tel:+14693456419" className="hover:text-white transition-colors text-slate-300">+1 (469) 345-6419</a>
                </div>
              </li>
              <li className="flex items-center group">
                <div className="bg-white/5 p-2 rounded-lg mr-3 group-hover:bg-secondary group-hover:text-white transition-colors text-secondary">
                    <Mail size={18} />
                </div>
                <div>
                  <span className="block text-white font-bold text-xs mb-0.5">Email</span>
                  <a href="mailto:info@nacoc.org" className="hover:text-white transition-colors text-slate-300">info@nacoc.org</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Nepalese American Chamber of Commerce. All rights reserved.</p>
          <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
