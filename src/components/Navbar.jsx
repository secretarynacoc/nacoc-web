import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, User, ChevronRight, Search, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchModal from './SearchModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about-us' },
    { name: 'Programs', path: '/programs' },
    { 
      name: 'News', 
      path: '#',
      children: [
        { name: 'Events', path: '/events' },
        { name: 'Blogs', path: '/blogs' }
      ]
    },
    { name: 'Directory', path: '/directory' },
    { name: 'Resources', path: '/resources' },
    { name: 'Membership', path: '/membership' },
    { name: 'Contact', path: '/contact-us' },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Top Bar - Vibrant Gradient */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-secondary text-white py-2.5 relative z-50 overflow-hidden">
         {/* Abstract background blobs for top bar */}
         <div className="absolute top-0 right-0 w-20 h-full bg-white/10 skew-x-12"></div>
         <div className="absolute top-0 left-10 w-10 h-full bg-black/10 skew-x-12"></div>

         <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 items-center gap-2 lg:gap-0 relative z-10">
            {/* Left: Contact */}
            <div className="flex flex-col lg:flex-row lg:space-x-6 justify-center lg:justify-start items-center text-white/90 text-xs font-medium gap-1 lg:gap-0">
               <a href="tel:4693456419" className="flex items-center hover:text-white hover:bg-white/10 px-2 py-0.5 rounded transition-all cursor-pointer">
                 <Phone size={12} className="mr-2 text-secondary-light" /> +1 (469) 345-6419
               </a>
               <a href="mailto:info@nacoc.org" className="flex items-center hover:text-white hover:bg-white/10 px-2 py-0.5 rounded transition-all cursor-pointer">
                 <Mail size={12} className="mr-2 text-secondary-light" /> info@nacoc.org
               </a>
            </div>
            
            {/* Center: Organization Name */}
            <div className="hidden lg:block text-center font-bold tracking-widest uppercase text-white/80 text-[10px] lg:text-xs">
               Nepalese American Chamber of Commerce
            </div>

            {/* Right: Social/Extras */}
            <div className="hidden lg:flex justify-end items-center space-x-5 text-white/90 text-xs font-bold">
               <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                 <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                 Accepting New Members
               </span>
               <span className="text-secondary-light">EN</span>
            </div>
         </div>
      </div>

      <header 
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-primary/5 py-3' 
            : 'bg-white py-4 lg:py-5 border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <Link to="/" className="flex items-center group gap-3 flex-shrink-0 relative">
               <div className="p-1 rounded-md transition-transform duration-300 group-hover:scale-105">
                  <img src="/assets/logo.png" alt="NACOC Logo" className="h-10 lg:h-12 w-auto" />
               </div>
               <div className="font-heading font-bold text-slate-800 text-xs sm:text-sm lg:text-base leading-tight max-w-[160px] sm:max-w-[200px]">
                  Nepalese American Chamber of Commerce
               </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  {link.children ? (
                    <button
                      className={`flex items-center gap-1 px-4 py-2 rounded-full text-[15px] font-bold whitespace-nowrap transition-all duration-300 ${
                         openDropdown === link.name ? 'text-primary' : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                      }`}
                      onMouseEnter={() => setOpenDropdown(link.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.name}
                      <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      className={`relative px-4 py-2 rounded-full text-[15px] font-bold whitespace-nowrap transition-all duration-300 ${
                        isActive(link.path) 
                          ? 'text-primary bg-primary/5' 
                          : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                      }`}
                    >
                      {link.name}
                      {isActive(link.path) && (
                         <motion.div layoutId="navbar-indicator" className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-secondary rounded-full" />
                      )}
                    </Link>
                  )}

                  {/* Dropdown Menu - Enhanced */}
                  {link.children && (
                     <div 
                        className={`absolute top-full left-0 w-52 pt-4 transition-all duration-300 origin-top-left ${
                           openDropdown === link.name ? 'opacity-100 visible scale-100 translate-y-0' : 'opacity-0 invisible scale-95 -translate-y-2'
                        }`}
                        onMouseEnter={() => setOpenDropdown(link.name)}
                        onMouseLeave={() => setOpenDropdown(null)}
                     >
                        <div className="bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-2 flex flex-col gap-1 relative">
                           <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>
                           {link.children.map(child => (
                              <Link 
                                 key={child.name} 
                                 to={child.path}
                                 className="flex items-center justify-between px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-primary rounded-lg transition-colors group/item"
                              >
                                 {child.name}
                                 <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-secondary" />
                              </Link>
                           ))}
                        </div>
                     </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Navigation (Compact for smaller LG screens) */}
             <nav className="hidden lg:flex xl:hidden items-center space-x-0">
               {/* Simplified nav for smaller screens if needed */}
             </nav>

            {/* CTA Button & Search */}
            <div className="hidden lg:flex items-center flex-shrink-0 ml-4 gap-3">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-full transition-colors border border-transparent hover:border-slate-200"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              
              <Link 
                  to="/membership" 
                  className="hidden xl:flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-primary mr-2 transition-colors"
                >
                  Join NACOC
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-4 lg:hidden">
                <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <Search size={24} />
                </button>
                <button
                className="text-slate-800 focus:outline-none p-2 hover:bg-slate-100 rounded-lg transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Radiant */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-30 bg-white pt-24 px-6 lg:hidden overflow-y-auto"
          >
             <div className="flex flex-col space-y-2 pb-10">
               {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {link.children ? (
                     <div className="flex flex-col border-b border-slate-100 pb-2 mb-2">
                        <div className="flex items-center justify-between py-3 px-4 rounded-xl text-lg font-bold text-slate-800">
                           <span>{link.name}</span>
                        </div>
                        <div className="pl-4 flex flex-col gap-1 border-l-2 border-slate-100 ml-4">
                           {link.children.map(child => (
                              <Link
                                 key={child.name}
                                 to={child.path}
                                 className="py-2 px-4 rounded-lg text-base font-medium text-slate-600 hover:text-primary transition-colors flex items-center justify-between group"
                                 onClick={() => setIsOpen(false)}
                              >
                                 {child.name}
                                 <ChevronRight size={14} className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Link>
                           ))}
                        </div>
                     </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`flex items-center justify-between py-3 px-4 rounded-xl text-lg font-bold transition-colors ${
                        isActive(link.path)
                          ? 'bg-primary/5 text-primary border border-primary/10'
                          : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{link.name}</span>
                      <ChevronRight size={16} className={`transition-transform settings ${isActive(link.path) ? 'text-primary' : 'text-slate-300'}`} />
                    </Link>
                  )}
                </motion.div>
              ))}
              <div className="h-px bg-slate-100 my-4"></div>
               <Link
                  to="/membership"
                  className="w-full py-4 text-center rounded-xl bg-slate-100 text-slate-800 font-bold mb-3 hover:bg-slate-200 transition-colors block"
                  onClick={() => setIsOpen(false)}
                >
                 Join NACOC
                </Link>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
