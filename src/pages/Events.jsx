import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { cleanWpHtml } from '../utils/wpContent';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const data = await api.getEvents();
        console.log('Events loaded:', data);
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const processedEvents = useMemo(() => {
    // 1. Sort: Upcoming first (Future events ascending, then past events descending)
    const now = new Date().getTime();
    let sorted = [...events].sort((a, b) => {
      const dateA = new Date(a.start_date || a.date).getTime();
      const dateB = new Date(b.start_date || b.date).getTime();
      
      const isFutureA = dateA >= now;
      const isFutureB = dateB >= now;

      if (isFutureA && !isFutureB) return -1;
      if (!isFutureA && isFutureB) return 1;
      
      if (isFutureA && isFutureB) {
        return dateA - dateB; // Closer future first
      } else {
        return dateB - dateA; // Closer past first
      }
    });

    // 2. Search filter
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      sorted = sorted.filter(event => {
        const title = (typeof event.title === 'object' ? event.title?.rendered : event.title) || '';
        const description = (typeof event.description === 'object' ? event.description?.rendered : event.description) || '';
        return title.toLowerCase().includes(lowerQuery) || description.toLowerCase().includes(lowerQuery);
      });
    }

    return sorted;
  }, [events, searchQuery]);

  if (loading) {
    return (
        <div className="bg-slate-50 min-h-screen pt-32 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-slate-500 text-sm">Loading events...</p>
            <p className="text-slate-400 text-xs mt-2">Check console for details</p>
        </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      
      {/* Hero Section */}
      <section className="bg-primary-dark relative overflow-hidden py-20">
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-4xl lg:text-5xl font-heading font-bold mb-4"
          >
            Events Calendar
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            Connect and grow with our community events.
          </motion.p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="mb-10 max-w-md mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm bg-white"
              />
            </div>
          </div>

          {processedEvents.length === 0 ? (
             <div className="text-center py-20">
                <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-500">No events found</h3>
             </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processedEvents.map((event, index) => {
              // Handle Tribe Events API date format
              const dateObj = new Date(event.start_date || event.date);
              let month = 'TBA';
              let day = '-';
              if (!isNaN(dateObj)) {
                 try {
                   month = dateObj.toLocaleDateString('en-US', { month: 'short' });
                   day = dateObj.toLocaleDateString('en-US', { day: 'numeric' });
                 } catch (e) {
                   console.error("Invalid date parsing", event);
                 }
              }

              // Get featured image from Tribe API (image can be object or string)
              const imageUrl = (typeof event.image === 'object' ? event.image?.url : (typeof event.image === 'string' && event.image !== '' ? event.image : null)) || event.featured_image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

              // Extract title safely
              const safeTitle = (typeof event.title === 'object' ? event.title?.rendered : event.title) || 'Event';
              
              // Extract venue name (Tribe API returns venue as object)
              const venueName = typeof event.venue === 'object' && event.venue !== null
                ? (event.venue.venue || event.venue.address || event.venue.city || '')
                : (event.venue || '');

              return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full`}
              >
                <div className="relative overflow-hidden h-64">
                   <img 
                     src={imageUrl} 
                     alt={safeTitle.replace(/<[^>]+>/g, '')} 
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'; }}
                   />
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-center shadow-md">
                      <span className="block text-xs font-bold text-slate-500 uppercase">{month}</span>
                      <span className="block text-xl font-bold text-slate-900">{day}</span>
                   </div>
                </div>
                
                <div className="p-8 flex flex-col justify-between flex-1">
                   <div>
                      {event.start_date && !isNaN(new Date(event.start_date)) && (
                          <div className="flex items-center text-xs font-bold text-primary uppercase tracking-wider mb-2">
                            <Clock size={14} className="mr-1" /> {new Date(event.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                      )}
                      <h3 className="font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors text-2xl" dangerouslySetInnerHTML={{ __html: safeTitle }}>
                      </h3>
                      {venueName && (
                        <div className="flex items-start text-slate-500 mb-4 text-sm font-medium">
                           <MapPin size={16} className="mr-2 mt-0.5 text-slate-400 shrink-0" />
                           <span>{venueName}</span>
                        </div>
                      )}
                      <p className="text-slate-600 mb-6 leading-relaxed line-clamp-3" dangerouslySetInnerHTML={{ __html: cleanWpHtml((typeof event.description === 'object' ? event.description?.rendered : event.description) || '') || 'Event details coming soon' }}>
                      </p>
                   </div>
                   
                   <Link 
                     to={`/events/${event.slug || event.id}`}
                     className="text-slate-900 font-bold text-sm inline-flex items-center hover:text-primary transition-colors group/btn"
                   >
                      Event Details <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                   </Link>
                </div>
              </motion.div>
              );
            })}
          </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
