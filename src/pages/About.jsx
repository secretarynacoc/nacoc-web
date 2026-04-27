import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Quote, X, Linkedin, Mail, ChevronRight } from 'lucide-react';

const LeadershipModal = ({ leader, onClose }) => {
  if (!leader) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl overflow-hidden max-w-xl w-full shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-colors z-20">
          <X size={18} />
        </button>
        
        <div className="flex flex-col relative">
            <div className="h-48 bg-slate-100 relative">
               <img 
                 src={leader.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(leader.name)}&background=0F2C59&color=fff&size=256`}
                 alt={leader.name} 
                 className="w-full h-full object-cover object-center"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold">{leader.name}</h3>
                  <p className="text-secondary font-bold uppercase tracking-wider text-xs">{leader.role}</p>
               </div>
            </div>
            <div className="p-6 max-h-[50vh] overflow-y-auto">
               <h4 className="text-lg font-heading font-bold text-slate-900 mb-2">Biography</h4>
               <p className="text-slate-600 leading-relaxed text-sm mb-6">
                 {leader.bio || `${leader.name} is a dedicated leader in the Nepalese American community, serving as ${leader.role} for the 2024-2025 term. They have been instrumental in fostering growth and connectivity within the DFW metroplex.`}
               </p>
               
               <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Connect</h4>
               <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-700 rounded-md hover:bg-slate-100 transition-colors font-semibold text-xs">
                     <Mail size={14} /> Email
                  </button>
               </div>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SectionHeading = ({ children }) => (
    <div className="flex items-center gap-6 mb-10 justify-center">
        <div className="h-px bg-white/20 w-16 lg:w-24"></div>
        <h3 className="text-2xl font-bold text-center tracking-wide">{children}</h3>
        <div className="h-px bg-white/20 w-16 lg:w-24"></div>
    </div>
);

const About = () => {
  const [selectedLeader, setSelectedLeader] = useState(null);

  const executiveCommittee = [
     { name: 'Suraj Poudyal', role: 'President', img: 'https://cms.nacoc.org/wp-content/uploads/2023/01/Untitled-design-4.png' },
     { name: 'Smriti Karki, CPA', role: 'Immediate Past President', img: 'https://cms.nacoc.org/wp-content/uploads/2023/01/Untitled-design-2-1.png' },
     { name: 'Suresh Pokhrel', role: 'Vice President', img: 'https://cms.nacoc.org/wp-content/uploads/2023/01/Untitled-design-12.png' },
     { name: 'Suresh Basyal', role: 'General Secretary', img: 'https://cms.nacoc.org/wp-content/uploads/2023/01/Untitled-design-11.png' },
     { name: 'Shraddha Shrestha', role: 'Secretary', img: 'https://cms.nacoc.org/wp-content/uploads/2023/01/Untitled-design-6-1.png' },
     { name: 'Bilas Upadhyay, CPA', role: 'Treasurer', img: 'https://cms.nacoc.org/wp-content/uploads/woocommerce-placeholder.png' },
  ];

  const boardDirectors = [
     { name: 'Pradip Giri', role: 'Board Director', img: 'https://cms.nacoc.org/wp-content/uploads/2023/01/Untitled-design-3-3.png' },
     { name: 'Dipak Silwal', role: 'Board Director', img: 'https://cms.nacoc.org/wp-content/uploads/2023/01/Untitled-design-7-1.png' },
     { name: 'Manoj Katwal', role: 'Board Director', img: 'https://cms.nacoc.org/wp-content/uploads/2023/01/Untitled-design-3-2.png' },
     { name: 'Suman Karki', role: 'Board Director', img: 'https://cms.nacoc.org/wp-content/uploads/woocommerce-placeholder.png' },
     { name: 'Basanta Panta', role: 'Board Director', img: 'https://cms.nacoc.org/wp-content/uploads/woocommerce-placeholder.png' },
     { name: 'Basu Shrestha', role: 'Board Director', img: 'https://cms.nacoc.org/wp-content/uploads/woocommerce-placeholder.png' },
     { name: 'Raslina Joshi', role: 'Board Director', img: 'https://cms.nacoc.org/wp-content/uploads/2023/01/Untitled-design-6-2.png' },
     { name: 'Santosh Chaudhary', role: 'Board Director', img: 'https://cms.nacoc.org/wp-content/uploads/2023/01/Untitled-design-7-2.png' },
     { name: 'Bijaya Humagain', role: 'Board Director', img: 'https://cms.nacoc.org/wp-content/uploads/woocommerce-placeholder.png' },
     { name: 'Mitesh Koirala', role: 'Board Director', img: 'https://cms.nacoc.org/wp-content/uploads/woocommerce-placeholder.png' },
     { name: 'Raj Bhetwal', role: 'Board Director', img: 'https://cms.nacoc.org/wp-content/uploads/woocommerce-placeholder.png' },
     { name: 'Shova Gyawali', role: 'Board Director', img: 'https://cms.nacoc.org/wp-content/uploads/woocommerce-placeholder.png' },
  ];

  const directorsAdvisors = [
      { name: 'Manoj Sigdel', role: 'Executive Director', img: 'https://cms.nacoc.org/wp-content/uploads/2023/01/Untitled-design-5.png' },
      { name: 'Sita Sapkota', role: 'Advisor', img: 'https://cms.nacoc.org/wp-content/uploads/2023/01/Untitled-design-3.png' },
      { name: 'Bhim Karki', role: 'Advisor', img: 'https://cms.nacoc.org/wp-content/uploads/2023/01/Untitled-design-6.png' },
      { name: 'Niraj Shrestha', role: 'Advisor', img: 'https://cms.nacoc.org/wp-content/uploads/2023/01/Untitled-design-7.png' },
      { name: 'Reena Batra', role: 'Advisor', img: 'https://cms.nacoc.org/wp-content/uploads/2023/01/Untitled-design-8.png' },
  ];

  const guidelines = [
    { title: "Lifelong Learning", desc: "Promote continuous education to stay ahead in a changing market.", bg: "bg-slate-50" },
    { title: "Economic Prosperity", desc: "Encourage business and community wealth through strategic programs.", bg: "bg-slate-50" },
    { title: "Overcoming Obstacles", desc: "Identify and remove barriers detrimental to the business climate.", bg: "bg-slate-50" },
    { title: "Unified Voice", desc: "Serve as a non-partisan advocate for the DFW Nepali business community.", bg: "bg-slate-50" },
    { title: "Civic Engagement", desc: "Support programs that increase the community's functional and aesthetic value.", bg: "bg-slate-50" },
    { title: "Key Leadership", desc: "Provide direction on economic growth, education, quality of life, and diversity.", bg: "bg-slate-50" }
  ];

  const renderMemberCard = (leader, index) => (
    <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        onClick={() => setSelectedLeader(leader)}
        className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-secondary/10 transition-all duration-300 group border border-slate-700/50 hover:border-secondary/30"
    >
        <div className="relative h-44 lg:h-48 overflow-hidden">
            <img 
                src={leader.img} 
                alt={leader.name} 
                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(leader.name)}&background=1e293b&color=fff&size=256`; }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
        </div>
        
        <div className="p-3 relative -mt-14 z-10 text-center">
            <div className="bg-slate-900/95 backdrop-blur-sm p-3 rounded-lg border border-slate-700 group-hover:border-secondary/30 transition-colors shadow-lg">
                <h3 className="text-base font-bold text-white mb-0.5 group-hover:text-secondary transition-colors truncate">{leader.name}</h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{leader.role}</p>
            </div>
        </div>
    </motion.div>
  );

  return (
    <div className="bg-white min-h-screen pt-20">
      
      <AnimatePresence>
        {selectedLeader && <LeadershipModal leader={selectedLeader} onClose={() => setSelectedLeader(null)} />}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative py-16 bg-surface-50 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
             className="lg:w-1/2"
           >
              <h1 className="text-4xl lg:text-6xl font-heading font-bold text-slate-900 mb-6 leading-tight">
                Advancing the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Economic Future</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed font-body border-l-4 border-secondary pl-4 max-w-lg">
                The Nepalese American Chamber of Commerce (NACOC) is dedicated to advocating for responsive government, quality education, and preserving the unique characteristics of the DFW Nepali community.
              </p>
           </motion.div>
           
           <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:w-1/2"
           >
              <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-sm mx-auto">
                  <Quote className="text-primary/20 w-10 h-10 mb-2" />
                  <p className="text-base italic text-slate-700 mb-4 px-2">
                      "Our mission is simple yet profound: to create an environment where businesses don't just survive, but truly thrive through connection and support."
                  </p>
                  <div className="flex items-center px-2">
                      <div className="w-10 h-10 overflow-hidden rounded-full mr-3 shrink-0">
                          <img src="https://cms.nacoc.org/wp-content/uploads/2023/01/Untitled-design-4.png" alt="Suraj Poudyal" className="w-full h-full object-cover" />
                      </div>
                      <div>
                          <div className="font-bold text-slate-900 text-sm">Suraj Poudyal</div>
                          <div className="text-[10px] text-secondary uppercase font-bold tracking-widest">President</div>
                      </div>
                  </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Guidelines Grid - Wider Cards (2 Columns) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
             <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">Our Guiding Principles</h2>
             <p className="text-lg text-slate-500 max-w-2xl mx-auto">To accomplish our goals, we adhere to these core values that drive every decision we make.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {guidelines.map((item, index) => (
               <motion.div 
                 key={index}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: index * 0.1 }}
                 className={`${item.bg} p-8 rounded-2xl border border-slate-200 hover:-translate-y-1 transition-transform duration-300 shadow-sm group text-slate-800 relative overflow-hidden flex flex-col gap-6 min-h-[240px] hover:shadow-md`}
               >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/50 rounded-bl-full -mr-8 -mt-8"></div>
                 <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center shrink-0 relative z-10 shadow-sm">
                    <CheckCircle size={24} className="text-primary" />
                 </div>
                 <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2 text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm font-medium">
                    {item.desc}
                    </p>
                 </div>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section - Compact Cards & Correct Data */}
      <section className="py-16 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-mesh mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4 text-white">Our Leadership</h2>
            <p className="text-slate-400 text-base">Meet the dedicated leaders serving the 2024-2025 term.</p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Executive Committee */}
            <SectionHeading><span className="text-white">Executive Committee</span></SectionHeading>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 mb-12">
                {executiveCommittee.map(renderMemberCard)}
            </div>

            {/* Board Of Directors */}
            <SectionHeading><span className="text-white">Board of Directors</span></SectionHeading>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 mb-12">
                {boardDirectors.map(renderMemberCard)}
            </div>
            
             {/* Advisors */}
             <SectionHeading><span className="text-white">Directors & Advisors</span></SectionHeading>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
                {directorsAdvisors.map(renderMemberCard)}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
