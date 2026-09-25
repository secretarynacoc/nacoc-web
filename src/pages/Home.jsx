import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, TrendingUp, Calendar, ArrowUpRight, MapPin, Clock, Shield, Award } from 'lucide-react';
import { api } from '../services/api';
import { adaptEvent } from '../services/adapters';

const Home = () => {

  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    let active = true;
    (async () => {
      const raw = await api.getUpcomingEvents(3);
      if (!active) return;
      setUpcoming(raw.map(adaptEvent).filter(Boolean));
    })();
    return () => { active = false; };
  }, []);
    
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="overflow-x-hidden">
      
      {/* Centered Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center bg-slate-900 overflow-hidden text-center pt-20 pb-10">
        {/* Background Elements - Signature Event Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Signature Event Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60"></div>
        </div>
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 mix-blend-soft-light"></div>

        <div className="container mx-auto px-6 relative z-10">
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-sm text-xs font-bold uppercase tracking-widest mb-8 text-white"
            >
                <div className="flex items-center gap-2 border-r border-white/20 pr-3">
                   <img src="https://flagcdn.com/h24/us.png" alt="USA" className="h-3 w-auto object-contain rounded-[1px] shadow-sm" />
                   <img src="https://flagcdn.com/h24/np.png" alt="Nepal" className="h-4 w-auto object-contain drop-shadow-sm" />
                </div>
                Texas, USA
            </motion.div>

            <motion.h1 
                initial="initial"
                animate="animate"
                variants={stagger}
                className="text-5xl lg:text-7xl font-heading font-bold text-white leading-[1.1] mb-8 max-w-5xl mx-auto flex flex-col items-center"
            >
                <div className="flex items-center gap-4 flex-wrap justify-center">
                    <motion.span variants={fadeInUp} className="block">Uniting Businesses.</motion.span>
                    {/* Placeholder for NACOC POP-UP or Image provided by Shraddha */}
                </div>
                <motion.span variants={fadeInUp} className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-white to-secondary pb-2">Empowering Community.</motion.span>
            </motion.h1>

            {/* Shifted "Driving Economic Growth" text down - Removed from here */}

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row justify-center gap-4 relative z-20 mb-20 mt-8"
            >
              <Link to="/membership" className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-all duration-300 shadow-xl shadow-primary/30 flex items-center justify-center hover:-translate-y-1 text-base group">
                Show your Support <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about-us" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all duration-300 flex items-center justify-center shadow-lg hover:-translate-y-1 text-base">
                Our Mission
              </Link>
            </motion.div>


            {/* Feature Cards - Minimal Design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto text-left">
                {[
                  { 
                    icon: <Users className="w-8 h-8" />, 
                    title: "Networking", 
                    desc: "Connect with industry leaders and professionals.",
                    bgClass: "bg-white/5 backdrop-blur-sm", // Slate
                    iconColor: "text-white",
                    watermarkIcon: <Users strokeWidth={1} />,
                    link: "/about-us"
                  },
                  { 
                    icon: <TrendingUp className="w-8 h-8" />, 
                    title: "Growth", 
                    desc: "Tools and mentorship to scale your business.",
                    bgClass: "bg-white/5 backdrop-blur-sm", // Slate
                    iconColor: "text-white",
                    watermarkIcon: <TrendingUp strokeWidth={1} />,
                    link: "/resources"
                  },
                  { 
                    icon: <Calendar className="w-8 h-8" />, 
                    title: "Events", 
                    desc: "High-impact events designed for collaboration.",
                    bgClass: "bg-white/5 backdrop-blur-sm", // Slate
                    iconColor: "text-white",
                    watermarkIcon: <Calendar strokeWidth={1} />,
                    link: "/events"
                  }
                ].map((item, index) => (
                  <Link to={item.link} key={index} className="block h-full"> 
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className={`${item.bgClass} rounded-3xl p-8 shadow-lg relative overflow-hidden group cursor-pointer h-full flex flex-col justify-between border border-white/10 hover:border-white/20 transition-colors`}
                  > 
                    {/* Watermark Icon */}
                    <div className="absolute -bottom-8 -right-8 text-white opacity-5 w-48 h-48 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                        {React.cloneElement(item.watermarkIcon, { size: 180 })}
                    </div>

                    <div className="relative z-10 flex justify-between items-start">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner text-white">
                            {item.icon}
                        </div>
                    </div>
                    
                    <div className="relative z-10 mt-auto">
                        <h3 className="text-2xl font-bold font-heading mb-2 text-white">{item.title}</h3>
                        <p className="text-slate-300 leading-relaxed font-body text-sm font-medium">
                        {item.desc}
                        </p>
                    </div>
                  </motion.div>
                  </Link>
                ))}
            </div>
        </div>
      </section>

            {/* Vision Mission Goal Section & Intro */}
      <section className="py-20 bg-slate-50 relative">
         <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
                 <span className="text-secondary font-bold uppercase tracking-widest text-xs mb-3 block">Who We Are</span>
                 <h2 className="text-3xl lg:text-5xl font-heading font-bold text-slate-900 mb-6">Driving Economic Growth</h2>
                 <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
                    The Nepalese American Chamber of Commerce (NACOC) is the premier organization dedicated to fostering economic growth and professional development for Nepalese businesses in the USA.
                 </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               <div className="md:col-span-1 p-8 rounded-3xl bg-white border border-slate-100 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group h-full">
                   <div className="w-16 h-16 mx-auto bg-slate-100 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Award size={32} />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                   <p className="text-slate-600">To be the leading catalyst for the economic success and professional growth of the Nepalese-American community.</p>
               </div>
               <div className="md:col-span-1 p-8 rounded-3xl bg-white border border-slate-100 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden h-full">
                   <div className="relative z-10">
                       <div className="w-16 h-16 mx-auto bg-slate-100 text-slate-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                          <Shield size={32} />
                       </div>
                       <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                       <p className="text-slate-600">To empower businesses through networking, advocacy, and resources while preserving cultural heritage and promoting commerce.</p>
                   </div>
               </div>
               <div className="md:col-span-1 p-8 rounded-3xl bg-white border border-slate-100 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group h-full">
                   <div className="w-16 h-16 mx-auto bg-slate-100 text-secondary rounded-full flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                      <TrendingUp size={32} />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Goals</h3>
                   <p className="text-slate-600">Foster entrepreneurship, facilitate trade between Nepal and USA, and provide mentorship for the next generation of leaders.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Featured Partners / Platinum Sponsor Video */}
      <section className="py-20 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 z-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-6 text-center relative z-10">
             <span className="text-secondary font-bold uppercase tracking-widest text-xs mb-8 block">Our Platinum Partners</span>
             <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-12">Proudly Supported By</h2>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
                 {/* Logo Side */}
                 <div className="flex flex-col gap-8 justify-center items-center p-8 bg-white rounded-2xl shadow-xl min-h-[300px]">
                      <img 
                        src="https://cms.nacoc.org/wp-content/uploads/2025/05/virtural-team-member-5-e1748341032903.png" 
                        alt="Platinum Sponsor" 
                        className="max-w-[280px] w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                      />
                      <div className="w-3/4 h-px bg-slate-100"></div>
                      <img 
                        src="https://cms.nacoc.org/wp-content/uploads/2025/05/virtural-team-member-5-1-e1748341077152.png" 
                        alt="Platinum Sponsor" 
                        className="max-w-[280px] w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                      />
                 </div>

                 {/* Video Side */}
                 <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-black order-first lg:order-last">
                    <video 
                        className="w-full h-full object-cover" 
                        controls 
                        muted
                        autoPlay
                        loop
                        playsInline
                        src="https://cms.nacoc.org/wp-content/uploads/2025/05/NXGA-Video-EDITED-.mp4"
                    >
                        Your browser does not support the video tag.
                    </video>
                 </div>
             </div>
          </div>
      </section>

      {/* Latest Events - Visual Improvements */}
      <section className="py-24 bg-white relative">
        <div className="hidden lg:block absolute top-1/2 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-slate-100 pb-8">
            <div>
              <span className="text-secondary font-bold uppercase tracking-widest text-xs mb-2 block">Calendar</span>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900">Upcoming Events</h2>
            </div>
            <Link to="/events" className="mt-6 md:mt-0 px-6 py-2 bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold rounded-lg transition-colors border border-slate-200 flex items-center text-sm w-full md:w-auto justify-center">
              View All Events <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {upcoming.length === 0 ? (
              <div className="lg:col-span-3 text-center py-16 bg-slate-50 rounded-3xl border border-slate-100">
                <Calendar className="mx-auto text-slate-300 mb-4" size={48} />
                <h3 className="text-xl font-bold text-slate-700 mb-2">No upcoming events scheduled</h3>
                <p className="text-slate-500 text-sm">Check back soon — new events are published on our WordPress calendar.</p>
              </div>
            ) : (
              upcoming.map((event, index) => {
                const dateObj = new Date(event.start_date);
                const dateLabel = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                const fallbackImg = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
                const linkTo = `/events/${event.slug || event.id}`;
                const isFeatured = index === 0;

                if (isFeatured) {
                  return (
                    <Link to={linkTo} key={event.id} className="lg:col-span-2 group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-[400px] lg:h-[450px] block">
                      <img
                        src={event.image || fallbackImg}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => { e.target.src = fallbackImg; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90"></div>
                      <div className="absolute top-6 left-6">
                        <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                          Featured
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 p-6 lg:p-10 w-full">
                        <div className="text-secondary mb-3 font-bold flex items-center text-sm uppercase tracking-wide">
                          <Calendar size={16} className="mr-2" /> {dateLabel}
                        </div>
                        <h3 className="text-2xl lg:text-4xl font-heading font-bold text-white mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: event.title }} />
                        <span className="inline-flex items-center px-6 py-3 bg-white text-slate-900 rounded-lg font-bold hover:bg-secondary hover:text-white transition-colors text-sm lg:text-base">
                          Event Details <ArrowUpRight className="ml-2 w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  );
                }

                return (
                  <Link to={linkTo} key={event.id} className="group bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300">
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={event.image || fallbackImg}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => { e.target.src = fallbackImg; }}
                      />
                    </div>
                    <div className="p-8 flex-grow flex flex-col">
                      <div className="mb-4">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1 block">{dateLabel}</span>
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors" dangerouslySetInnerHTML={{ __html: event.title }} />
                      </div>
                      {event.venue && (
                        <div className="flex items-center text-slate-500 mb-4 text-sm font-medium">
                          <MapPin size={16} className="mr-2 text-slate-400" /> <span className="truncate">{event.venue}</span>
                        </div>
                      )}
                      <span className="text-slate-900 font-bold text-sm inline-flex items-center mt-auto hover:text-primary transition-colors group/link">
                        Event Details <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800 skew-x-[-20deg] transform translate-x-1/4"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[80px]"></div>
         
         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-6">Ready to expand your horizon?</h2>
                <p className="text-xl text-slate-400 mb-10 font-light max-w-2xl mx-auto">Join a network of over 500+ businesses and professionals driving growth in the Nepalese American community.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/membership" className="px-8 py-4 bg-secondary hover:bg-secondary-light text-slate-900 font-bold rounded-lg transition-colors shadow-lg shadow-secondary/20 hover:-translate-y-1 transform duration-200">
                        Become a Member
                    </Link>
                    <Link to="/contact-us" className="px-8 py-4 bg-transparent border border-slate-700 text-white font-bold rounded-lg hover:bg-white/10 transition-colors hover:-translate-y-1 transform duration-200">
                        Contact Support
                    </Link>
                </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default Home;
