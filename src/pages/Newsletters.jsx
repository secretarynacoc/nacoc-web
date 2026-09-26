import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Mic, ExternalLink, Download, Play, Zap, Coffee, Lightbulb, UserSearch, HelpCircle, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../services/api';

const adaptNewsletter = (post) => {
    const postDate = post.date ? new Date(`${post.date.slice(0, 10)}T12:00:00`) : null;
    const content = new DOMParser().parseFromString(post.content?.rendered || '', 'text/html');
    const excerpt = new DOMParser().parseFromString(post.excerpt?.rendered || '', 'text/html').body.textContent.trim();
    const pdfLink = Array.from(content.querySelectorAll('a[href]'))
        .find((link) => /\.pdf(?:$|[?#])/i.test(link.href));

    return {
        id: post.id,
        month: postDate && !Number.isNaN(postDate.getTime())
            ? postDate.toLocaleDateString('en-US', { month: 'long' })
            : 'Newsletter',
        year: postDate && !Number.isNaN(postDate.getTime())
            ? postDate.getFullYear()
            : '',
        summary: excerpt || 'Community Updates & Highlights',
        pdfUrl: pdfLink?.href || '',
    };
};

const Newsletters = () => {
    const [newsletters, setNewsletters] = useState([]);
    const [newslettersLoading, setNewslettersLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const totalPages = Math.ceil(newsletters.length / pageSize);
    const visibleNewsletters = newsletters.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    useEffect(() => {
        const loadNewsletters = async () => {
            const posts = await api.getNewsletters();
            setNewsletters(posts.map(adaptNewsletter));
            setNewslettersLoading(false);
        };

        loadNewsletters();
    }, []);

  const podcasts = [
    {
      title: "All About Entrepreneurship",
      desc: "Join us as we discuss the journey of successful Nepalese business owners in Texas.",
      duration: "45 min",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Is Entrepreneurship For You?",
      desc: "Deep dive into the risks and rewards of starting your own business.",
      duration: "30 min",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const guides = [
     {
        title: "Steps to Finding a Mentor",
        desc: "A comprehensive guide on how to connect with experienced professionals who can help you grow.",
        link: "https://www.sba.gov/business-guide/grow-your-business/find-mentor-or-counselor",
        gradient: "from-blue-600 to-indigo-700",
        icon: <UserSearch size={40} />
     },
     {
        title: "10 Steps to Start Your Business",
        desc: "Ask yourself these critical questions to ensure you're ready for the business journey.",
        link: "https://www.sba.gov/business-guide/10-steps-start-your-business",
        gradient: "from-emerald-500 to-teal-700",
        icon: <HelpCircle size={40} />
     },
     {
        title: "Financial Planning 101",
        desc: "Master the basics of business finance, cash flow, vs profit.",
        link: "https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan",
        gradient: "from-amber-500 to-orange-700",
        icon: <TrendingUp size={40} />
     }
  ];

  // Placeholder icons for the guides above since I didn't import them all
  const GuideIcon = ({ i }) => {
      if(i===0) return <Zap className="text-secondary opacity-80" size={40} />
      if(i===1) return <Lightbulb className="text-secondary opacity-80" size={40} />
      return <Coffee className="text-secondary opacity-80" size={40} />
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      
      {/* Hero Header */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-mesh opacity-20 mix-blend-overlay"></div>
        <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[150%] bg-slate-800/50 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md text-slate-300 font-bold text-xs uppercase tracking-widest mb-6"
            >
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse"></span>
                NACOC Updates & Insights
            </motion.div>
            <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-5xl lg:text-7xl font-heading font-bold text-white mb-6 tracking-tight"
            >
                Newsletters
            </motion.h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-body leading-relaxed">
                Read community updates, hear from Nepali business leaders, and explore practical guides for local businesses.
            </p>
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-20 relative z-20 pb-24">
        
        {/* Newsletters Grid */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-100 mb-20">
            <div className="flex items-center justify-between mb-10 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                        <FileText size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Monthly Newsletters</h2>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newslettersLoading ? (
                    <p className="text-slate-500 md:col-span-2 lg:col-span-3">Loading newsletters...</p>
                ) : newsletters.length === 0 ? (
                    <p className="text-slate-500 md:col-span-2 lg:col-span-3">No newsletters are available yet.</p>
                ) : visibleNewsletters.map((item) => (
                    <motion.div
                        key={item.id}
                        whileHover={{ y: -4 }}
                        className="group bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 flex items-start gap-4"
                    >
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:scale-110 transition-all duration-300 shrink-0">
                            <FileText size={20} />
                        </div>
                        <div className="flex-grow">
                             <div className="flex justify-between items-start mb-1">
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{item.month}</h3>
                                <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded uppercase">{item.year}</span>
                             </div>
                            <p className="text-xs text-slate-500 mb-3">{item.summary}</p>
                            {item.pdfUrl && (
                                <a
                                    href={item.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-800"
                                >
                                    Download PDF <Download size={12} className="ml-1" />
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
            {!newslettersLoading && totalPages > 1 && (
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500">
                        Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, newsletters.length)} of {newsletters.length}
                    </p>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                            disabled={currentPage === 1}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ChevronLeft size={16} /> Previous
                        </button>
                        <span className="text-sm font-medium text-slate-600" aria-live="polite">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            type="button"
                            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                            disabled={currentPage === totalPages}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Next <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>

        {/* Podcast Feature */}
        <div className="bg-slate-900 rounded-3xl p-8 lg:p-14 mb-20 relative overflow-hidden text-white shadow-xl border border-slate-800">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-800/30 rounded-full blur-[100px] -mr-20 -mt-20"></div>
             
             <div className="flex flex-col lg:flex-row gap-12 relative z-10 items-center">
                <div className="lg:w-1/3 text-center lg:text-left">
                    <span className="inline-block p-3 bg-white/5 rounded-2xl mb-6 text-slate-400 backdrop-blur-md border border-white/10">
                        <Mic size={32} />
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">The NACOC Podcast</h2>
                    <p className="text-slate-400 mb-6 leading-relaxed">
                        Authentic conversations with Nepali business leaders navigating the American market. Real stories, real advice.
                    </p>
                </div>


                <div className="lg:w-2/3 grid gap-5 w-full">
                    {podcasts.map((pod, idx) => (
                        <motion.div 
                            key={idx} 
                            whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.08)" }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-6 transition-colors"
                        >
                             <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative group">
                                 <img src={pod.image} alt={pod.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                     <Play size={20} className="fill-white" />
                                 </div>
                             </div>
                             <div className="flex-grow">
                                 <h3 className="text-lg font-bold text-white mb-1 group-hover:text-secondary transition-colors">{pod.title}</h3>
                                 <p className="text-sm text-slate-400 line-clamp-1">{pod.desc}</p>
                             </div>
                             <div className="hidden sm:block text-xs font-mono text-slate-500 bg-black/20 px-3 py-1 rounded-full border border-white/5">
                                 {pod.duration}
                             </div>
                        </motion.div>
                    ))}
                </div>
             </div>
        </div>

        {/* Guides Section */}
        <div>
            <div className="text-center mb-12">
                <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Enterprise Knowledge</span>
                <h2 className="text-3xl font-heading font-bold text-slate-900">Entrepreneur Guides</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {guides.map((guide, index) => (
                     <motion.div 
                        key={index}
                        whileHover={{ y: -8 }}
                        className={`bg-white border border-slate-200 p-8 rounded-3xl text-slate-800 relative overflow-hidden shadow-sm hover:shadow-xl h-80 flex flex-col justify-between group transition-shadow`}
                     >
                        <div className="absolute top-0 right-0 p-6 opacity-10 transform scale-150 group-hover:rotate-12 transition-transform duration-500">
                             <GuideIcon i={index} />
                        </div>
                        
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 border border-slate-200">
                                <GuideIcon i={index} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 leading-tight">{guide.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                {guide.desc}
                            </p>
                        </div>
                        
                        <a href={guide.link} className="relative z-10 inline-flex items-center text-sm font-bold border-b border-primary/30 pb-1 hover:border-primary text-primary transition-colors w-fit">
                            Start Reading <ExternalLink size={14} className="ml-2" />
                        </a>
                     </motion.div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default Newsletters;
