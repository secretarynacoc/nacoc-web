import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowLeft, Share2, Globe } from 'lucide-react';
import { api } from '../services/api';
import { cleanWpHtml } from '../utils/wpContent';

const EventDetails = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      const data = await api.getEventById(slug);
      setEvent(data);
      setLoading(false);
    };

    if (slug) {
      fetchEvent();
    }
  }, [slug]);

  if (loading) {
     return (
        <div className="bg-slate-50 min-h-screen pt-32 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Event not found</h2>
          <Link to="/events" className="text-primary hover:underline font-bold">Back to Events</Link>
        </div>
      </div>
    );
  }

  // Data Extraction
  const image = (typeof event.image === 'object' ? event.image?.url : (typeof event.image === 'string' && event.image !== '' ? event.image : null)) || event.featured_image || null;
  const bgImage = image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';

  // Handle Tribe Events API date format (start_date is ISO format from WordPress)
  const startDateObj = new Date(event.start_date || event.date);
  const endDateObj = event.end_date ? new Date(event.end_date) : null;
  const isFutureEvent = startDateObj > new Date() || (endDateObj && endDateObj > new Date());

  const isValidStart = !isNaN(startDateObj);
  const isValidEnd = endDateObj && !isNaN(endDateObj);

  const startDateFormatted = isValidStart ? startDateObj.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }) : 'TBA';
  const endDateFormatted = isValidEnd ? endDateObj.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }) : null;
  
  const startTimeFormatted = (event.start_date && isValidStart) ? startDateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : (event.time || 'TBA');
  const endTimeFormatted = (event.end_date && isValidEnd) ? endDateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;

  const isSameDay = isValidStart && isValidEnd && startDateObj.toDateString() === endDateObj.toDateString();

  // Title and description can be objects (WP) or strings (Tribe)
  const titleHtml = typeof event.title === 'object' ? event.title?.rendered : event.title;
  const rawDescription = typeof event.description === 'object' ? event.description?.rendered : event.description;
  // For past events, render any inline [button] shortcodes (e.g. "Register Here")
  // as disabled pills so visitors can't click through to a closed Eventbrite page.
  const descriptionHtml = cleanWpHtml(rawDescription, { disabled: !isFutureEvent });

  // Location from Tribe Events API (venue is an object with venue/address/city)
  let locationStr = 'TBA';
  if (typeof event.venue === 'object' && event.venue !== null) {
    const parts = [];
    if (event.venue.venue) parts.push(event.venue.venue);
    if (event.venue.city) parts.push(event.venue.city);
    if (event.venue.stateprovince || event.venue.province) parts.push(event.venue.stateprovince || event.venue.province);
    locationStr = parts.length > 0 ? parts.join(', ') : 'TBA';
  } else if (typeof event.venue === 'string' && event.venue) {
    locationStr = event.venue;
  } else if (event.location) {
    locationStr = event.location;
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      
      {/* Hero Header with Glassmorphism */}
      <div className="relative bg-slate-900 min-h-[50vh] lg:min-h-[60vh] flex items-end pb-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
             <img 
               src={bgImage} 
               alt={titleHtml?.replace(/<[^>]+>/g, '') || 'Event'} 
               className="w-full h-full object-cover opacity-50 contrast-125 key-visual"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
             {/* Decorative gradients */}
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-primary-dark/30 to-transparent mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
           <div className="md:w-2/3 w-full">
             <Link to="/events" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-wider">
                 <ArrowLeft size={16} className="mr-2" /> Back to Calendar
             </Link>
             
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="max-w-4xl"
             >
               <h1 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-6 leading-tight drop-shadow-xl" dangerouslySetInnerHTML={{ __html: titleHtml }}>
               </h1>
               
               <div className="flex flex-wrap gap-4 text-white font-medium">
                  <span className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors">
                      <Calendar size={18} className="mr-2 text-secondary" /> {startDateFormatted}
                  </span>
                  <span className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors">
                      <MapPin size={18} className="mr-2 text-secondary" /> {locationStr}
                  </span>
               </div>
             </motion.div>
           </div>
           
           {image && (
             <motion.div 
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="md:w-1/3 w-full"
             >
                <div className="bg-white/10 p-2 rounded-2xl backdrop-blur-sm border border-white/20 shadow-2xl">
                  <img src={image} className="w-full h-auto rounded-xl shadow-inner max-h-[300px] object-cover" alt="Event visual" />
                </div>
             </motion.div>
           )}
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-10 relative z-20 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">
            
           {/* Main Content */}
           <div className="lg:w-2/3 order-2 lg:order-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-100 prose prose-lg max-w-none text-slate-600 leading-relaxed font-body prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-primary prose-img:rounded-2xl"
              >
                  <div dangerouslySetInnerHTML={{ __html: descriptionHtml || 'Event details coming soon.' }} />
              </motion.div>
           </div>

           {/* Sidebar Actions */}
           <div className="lg:w-1/3 order-1 lg:order-2">
              <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.3 }}
                 className="sticky top-32 space-y-6"
              >
                 <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Calendar size={120} className="text-primary" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-6 font-heading relative z-10">Event Information</h3>
                    
                    <div className="space-y-6 relative z-10">
                        <div className="flex items-start group">
                           <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0 mt-1">
                               <Calendar size={18} />
                           </div>
                           <div className="ml-4">
                              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide">Date</span>
                              <span className="block text-base font-medium text-slate-900">
                                {isSameDay || !endDateFormatted ? startDateFormatted : (
                                  <>
                                    <div className="font-bold">{startDateFormatted}</div>
                                    <div className="text-sm text-slate-500">to</div>
                                    <div className="font-bold">{endDateFormatted}</div>
                                  </>
                                )}
                              </span>
                           </div>
                        </div>
                        
                        <div className="flex items-start group">
                           <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0 mt-1">
                               <Clock size={18} />
                           </div>
                           <div className="ml-4">
                              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide">Time</span>
                              <span className="block text-base font-bold text-slate-900">
                                {startTimeFormatted}
                                {endTimeFormatted && ` - ${endTimeFormatted}`}
                              </span>
                           </div>
                        </div>

                        <div className="flex items-start group">
                           <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0 mt-1">
                               <MapPin size={18} />
                           </div>
                           <div className="ml-4">
                              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide">Location</span>
                              <span className="block text-base font-bold text-slate-900">{locationStr}</span>
                           </div>
                        </div>

                        {event.website && (
                          <div className="flex items-start group">
                             <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0 mt-1">
                                 <Globe size={18} />
                             </div>
                             <div className="ml-4 break-words overflow-hidden w-full max-w-[200px]">
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide">Website</span>
                                <a href={event.website} target="_blank" rel="noopener noreferrer" className="block text-sm font-bold text-primary hover:underline truncate w-full" title={event.website}>
                                  {event.website.replace(/^https?:\/\//, '')}
                                </a>
                             </div>
                          </div>
                        )}
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100 relative z-10">
                       {isFutureEvent ? (
                          <>
                           {event.website ? (
                             <a href={event.website} target="_blank" rel="noopener noreferrer" className="block w-full py-4 bg-gradient-to-r from-secondary to-secondary-light hover:from-secondary-light hover:to-secondary text-slate-900 font-bold rounded-xl transition-all shadow-lg hover:shadow-secondary/30 transform hover:-translate-y-1 text-center">
                                Register Now
                             </a>
                           ) : (
                             <button className="w-full py-4 bg-gradient-to-r from-secondary to-secondary-light hover:from-secondary-light hover:to-secondary text-slate-900 font-bold rounded-xl transition-all shadow-lg hover:shadow-secondary/30 transform hover:-translate-y-1">
                                Register Now
                             </button>
                           )}
                           <p className="text-center text-xs text-slate-400 mt-4 font-medium">Limited spots available</p>
                          </>
                       ) : (
                          <div className="w-full py-4 bg-slate-100 text-slate-400 font-bold rounded-xl text-center cursor-not-allowed border border-slate-200">
                              Event Has Ended
                          </div>
                       )}
                    </div>
                 </div>

                 <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 shadow-lg text-white text-center">
                    <h4 className="font-bold text-lg mb-4">Share this Event</h4>
                    <div className="flex justify-center gap-4">
                        <button className="p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"><Share2 size={20} /></button>
                    </div>
                 </div>
              </motion.div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
