import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Quote, X, Linkedin, Mail, ChevronRight, Expand } from 'lucide-react';

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
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/70 border border-white/30 rounded-full text-white transition-colors z-20 shadow-lg">
          <X size={20} />
        </button>
        
        <div className="flex flex-col relative">
            <div className="h-48 bg-slate-100 relative">
                <img 
                  src={leader.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(leader.name)}&background=0F2C59&color=fff&size=256`}
                  alt={leader.name} 
                  className="w-full h-full object-cover"
                  style={{ objectPosition: leader.objectPosition || 'center 15%' }}
                />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold">{leader.name}</h3>
                  <p className="text-secondary font-bold uppercase tracking-wider text-xs">{leader.role}</p>
               </div>
            </div>
             <div className="p-6 max-h-[50vh] overflow-y-auto">
                <h4 className="text-lg font-heading font-bold text-slate-900 mb-3">Biography</h4>
                <div className="space-y-3 text-slate-600 leading-relaxed text-sm mb-6">
                  {(leader.bio || `${leader.name} is a dedicated leader in the Nepalese American community, serving as ${leader.role} for the 2024-2025 term. They have been instrumental in fostering growth and connectivity within the DFW metroplex.`)
                    .split(/\n\s*\n/)
                    .filter(p => p.trim())
                    .map((paragraph, i) => (
                      <p key={i} className="first:drop-cap">{paragraph.trim()}</p>
                    ))
                  }
                </div>
               
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
     {
       name: 'Shraddha Shrestha',
       role: 'President',
       img: 'https://cms.nacoc.org/wp-content/uploads/2026/06/image-1.jpg',
       bio: `Shraddha Shrestha is an entrepreneur with cross-sector experience in insurance, real estate, and property management, bringing practical expertise in business operations, client relations, and asset management. She is currently pursuing a Master's in Public Administration at the University of Texas at Arlington, where she is strengthening her expertise in governance, leadership, and organizational strategy with a focus on public impact and institutional effectiveness.

Her professional work reflects a commitment to building sustainable, trust-based systems within both business and community settings. She focuses on long-term value creation through responsible business practices, stakeholder engagement, and community-centered development.

Shraddha brings a multidisciplinary perspective shaped by her entrepreneurial experience and academic training, with emphasis on collaboration across public, private, and community sectors. An avid reader and writer, she is committed to continuous learning and contributes a thoughtful, informed approach to leadership, civic engagement, and advisory responsibilities within mission-driven organizations.`
     },
      {
        name: 'Mitesh Koirala',
        role: 'Vice President',
        img: 'https://cms.nacoc.org/wp-content/uploads/2026/06/image-1-1.jpg',
         objectPosition: 'center 10%',
        bio: `Mitesh Koirala is a business leader, entrepreneur, and community advocate with nearly two decades of experience living and working in Texas. He has been part of the Dallas\u2013Fort Worth community since 2019 and has been actively engaged in supporting business growth and community development among Nepalese Americans in the region.

Mitesh is the Owner and CEO of Karma Mortgage, a mortgage brokerage firm dedicated to helping individuals and families achieve homeownership through personalized lending solutions. Through his work in the mortgage industry, he has assisted numerous clients in navigating the home financing process and building long-term financial stability.

Beyond mortgage lending, Mitesh is actively involved in real estate development and real estate investment, contributing to the growth of local communities through strategic property development and investment initiatives. He is also a franchise owner of India Bazaar, a well-known South Asian grocery retail brand that serves diverse communities across the Dallas\u2013Fort Worth metroplex.

Mitesh joined Nepalese American Chamber of Commerce in 2024 as a board of directors and he is currently serving as Vice President for 2026-2027 term, where he has contributed to initiatives that promote entrepreneurship, networking, and collaboration among Nepalese professionals and business owners.

With a strong background in business, real estate, and finance, Mitesh is passionate about strengthening the Nepalese American business community, fostering partnerships, and creating opportunities for economic growth. As Vice President, he aims to further expand the chamber\u2019s impact by supporting local entrepreneurs, encouraging professional development, and building stronger connections between businesses and the broader community.`
     },
     {
       name: 'Sanjay K Rajbhandari',
       role: 'General Secretary',
       img: 'https://cms.nacoc.org/wp-content/uploads/2026/06/image-2.jpg',
       bio: `Sanjay K. Rajbhandari is a seasoned IT professional and entrepreneur based in North Texas with over 30 years of experience across multiple industries, including IT services, real estate, mortgage brokerage, hospitality, and investments. Coming from a humble middle-class background, he is self-made and guided by values of perseverance, humility, and service.

He holds an MBA in Information Systems Management and Finance from Dallas Baptist University and a BBA in Accounting and Marketing from the University of Central Oklahoma.

Sanjay currently serves as General Secretary of the Nepalese American Chamber of Commerce and has previously served as Treasurer of the Nepalese Society of Texas. He also serves as a Trustee of the Nepalese Culture and Spiritual Center. Known for his low-profile leadership and community service, he believes in contributing quietly and meaningfully.

Outside of his professional and community work, Sanjay enjoys traveling, hiking, camping, and solo motorcycle adventures. He values family deeply and is a proud parent of three children, including a daughter who is a practicing attorney and two sons pursuing engineering studies.`
     },
     {
       name: 'Basanta Panta',
       role: 'Treasurer',
       img: 'https://cms.nacoc.org/wp-content/uploads/2026/06/image-3.jpg',
       bio: `Basanta Panta serves as Treasurer of the Nepalese American Chamber of Commerce, bringing strong financial acumen and a commitment to organizational accountability to the chamber\u2019s leadership team. His role focuses on ensuring financial transparency, responsible fiscal management, and long-term sustainability for the organization\u2019s programs and initiatives.`
     },
     {
       name: 'Prince Agrawal',
       role: 'Secretary',
       img: 'https://cms.nacoc.org/wp-content/uploads/2026/06/image-4.jpg',
       bio: `Prince Agrawal is a dedicated professional based in the Dallas\u2013Fort Worth area, focused on helping individuals and families navigate real estate opportunities with confidence and clarity. He is passionate about creating meaningful connections within the community and supporting others in achieving their personal and professional goals.

Prince actively engages in community initiatives and educational events designed to bring people together, encourage growth, and create a positive impact. He believes in the power of collaboration, continuous learning, and building strong relationships that contribute to long-term success.

With a people-first approach, Prince is committed to providing value, fostering trust, and contributing to a thriving and connected community.`
     },
  ];

  const boardDirectors = [
     {
       name: 'Dr. Vishnu Maya Upadhyay',
       role: 'Board Director',
       img: 'https://cms.nacoc.org/wp-content/uploads/2026/06/image-5.jpg',
       bio: `Dr. Vishnu Maya Upadhyay, DNP, APRN, WHCNP-C, FNP-BC, PMHNP-BC, is a triple board-certified Advanced Nurse Practitioner, healthcare entrepreneur, educator, and community leader with over 25 years of experience in healthcare. She is the CEO and Owner of a Primary and Behavioral Health Care Clinic and the Women\u2019s Clinic of Mid-Cities in Texas, dedicated to improving access to quality healthcare and advancing patient outcomes.

A passionate advocate for public health and community service, Dr. Upadhyay currently serves as President of the Dallas Health Foundation and Mobile Medical Care Unit and President of the Dallas Health Lions Club. She has led numerous health initiatives, medical outreach programs, and charitable projects locally and internationally, earning recognition as one of the DFW Great 100 Nurses and multiple Best Nurse Practitioner awards.

Dr. Upadhyay is also a strong advocate for women\u2019s empowerment, mentorship, and healthcare education. Outside of her professional and volunteer work, she enjoys cooking, gardening, yoga, meditation, and spending time with her husband and three children.`
     },
     {
       name: 'Pradip Giri',
       role: 'Board Director',
       img: 'https://cms.nacoc.org/wp-content/uploads/2026/06/image-6.jpg',
       bio: `Pradip Giri is an entrepreneur, retail business owner, and community leader with a background in accounting and more than a decade of corporate experience. He currently manages eight retail locations and leads a team of over 50 employees, demonstrating a strong commitment to operational excellence, strategic growth, and customer-focused service. His professional journey reflects a passion for building successful businesses while creating meaningful opportunities within the communities he serves.

Beyond his business accomplishments, Pradip is a dedicated civic leader and advocate for community engagement. He served two terms as General Secretary of the Nepalese American Chamber of Commerce, contributing to initiatives that support entrepreneurship and economic development. He has also been actively involved with the Walk for Nepal fundraising campaign for over 14 years, helping advance charitable and community-focused causes.

Pradip is the founder of the MoMo Festival, one of the largest annual community food festivals in the region, attracting more than 15,000 attendees each year. He also established the Buwa Aama Picnic, a beloved community event dedicated to honoring parents, which continues to thrive under the leadership of the Walk for Nepal team.

Today, Pradip is focused on urban governance, real estate investment, and strategic infrastructure development. Whether optimizing business performance, investing in sustainable growth opportunities, or exploring avenues for public service and municipal leadership, he remains committed to building systems that promote economic prosperity, community well-being, and long-term sustainability.`
     },
      {
        name: 'Samikshya Ojha',
        role: 'Board Director',
        img: 'https://cms.nacoc.org/wp-content/uploads/2026/06/image-7.jpg',
        objectPosition: 'center 25%',
        bio: `Samikshya Ojha is a Relationship Manager in Business Banking with PNC Bank, where she supports small and mid-sized businesses across the Dallas\u2013Fort Worth area with tailored commercial banking solutions. She is passionate about helping business owners strengthen their financial foundations, achieve their goals, and grow their businesses sustainably.

Based in Flower Mound, Texas, Samikshya is actively involved in her local community and has a strong interest in mentorship, professional development, and supporting fellow entrepreneurs. She values building meaningful relationships and empowering others through guidance, collaboration, and shared success.

Outside of her professional career, Samikshya enjoys spending quality time with her family and friends. She has a deep appreciation for the outdoors and loves exploring nature through hiking and other outdoor activities. Committed to both personal and professional growth, she continually seeks opportunities to make a positive impact in her community and beyond.`
     },
     {
       name: 'Sumanjali Shrestha',
       role: 'Board Director',
       img: 'https://cms.nacoc.org/wp-content/uploads/2026/06/image-8.jpg',
       bio: `Sumanjali Shrestha is a lecturer, entrepreneur, and investor with over a decade of experience in the accounting and business sectors. Her career is distinguished by a unique blend of academic expertise and practical financial strategy, enabling her to make a meaningful impact in both education and business. She is passionate about empowering the next generation of professionals by helping them develop strong technical skills and build successful, fulfilling careers.

Beyond her professional accomplishments, Sumanjali is deeply committed to mentoring emerging talent and fostering inclusive communities. She believes that continuous learning, personal growth, and meaningful connections are essential to both personal and professional success. Through her teaching, mentorship, and leadership, she strives to inspire others to reach their full potential.

Outside of her professional endeavors, Sumanjali is a devoted mother who enjoys dancing and spending quality time with her family and friends. She values a balanced lifestyle and believes that a well-rounded life is the foundation of excellence in every aspect of one\u2019s career. Always eager to embrace new opportunities, she continuously seeks challenges that allow her to grow both personally and professionally.`
     },
     {
       name: 'Bijaya Adhikari',
       role: 'Board Director',
       img: 'https://cms.nacoc.org/wp-content/uploads/2026/06/image-9.png',
       bio: `Bijaya Adhikari is a Certified Public Accountant (CPA), Mortgage Loan Officer, entrepreneur, and community leader dedicated to helping individuals, families, and businesses achieve their financial goals. With expertise in accounting, taxation, financial planning, and mortgage lending, he brings a comprehensive approach to guiding clients through important financial decisions.

Beyond his professional career, Bijaya is actively involved in community initiatives and leadership efforts that support economic growth, financial literacy, and community engagement. He is passionate about mentoring others and fostering meaningful connections that create opportunities for success.

A devoted family man, Bijaya is the proud father of two daughters. He values family, integrity, and service, and strives to balance professional excellence with a strong commitment to his community and loved ones. Through his work and leadership, he continues to make a positive impact both professionally and personally.`
     },
  ];

  const directorsAdvisors = [
     {
       name: 'Rupa Laxmi Shah',
       role: 'Advisor',
       img: 'https://cms.nacoc.org/wp-content/uploads/2026/06/image-10.jpg',
       bio: `Rupa Laxmi Shah is an experienced nonprofit leader specializing in global fundraising, strategic partnerships, and the growth of high-impact organizations. Over the course of her career, she has helped raise more than $700 million and supported initiatives representing more than $2.5 billion in global impact. Her work focuses on helping promising programs grow into sustainable, influential institutions with the capacity to scale.

Rupa has played a key role in expanding global education and technology platforms, including Scratch and MIT App Inventor, by building the fundraising strategies, partnerships, and organizational capacity needed to broaden their reach and deepen their long-term impact.

She currently leads global philanthropy and partnerships for MIT RAISE, MIT\u2019s Responsible AI for Social Empowerment and Education initiative. Working across the MIT Media Lab, MIT CSAIL, and the MIT Scheller Teacher Education Program, she advances partnerships that expand access to responsible AI literacy for learners, educators, and communities worldwide.

Rupa also helped launch and grow PATH, Pathways for AI Training and Hiring, MIT\u2019s workforce initiative designed to create scalable, debt-free pathways into AI-enabled careers for community college students. In collaboration with MIT faculty and national partners, she helped secure more than $17 million to support the initiative, which brings together MIT, R1 university hubs, community colleges, industry, and public-sector partners to connect AI education with real career opportunities.

She has also helped secure major support for MIT RAISE\u2019s global AI literacy work, including programs such as Day of AI. In 2025, RAISE reached more than 3.5 million learners globally, with a projected reach of more than 10 million learners in 2026 through open curricula, educator training, and scalable partnerships.`
     },
     {
       name: 'Anup Tamrakar',
       role: 'Advisor',
       img: 'https://cms.nacoc.org/wp-content/uploads/2026/06/image-11.jpg',
       bio: `Anup Tamrakar is a dedicated father, husband, son, and a friend, roles that form the cornerstone of his life. With over 20 years of experience in the construction industry, Anup hails from a family of builders and entrepreneurs, instilling in him a strong work ethic, passion for creating values and meaningful impact.

In 2015, Anup founded Urban, turning a simple idea into one of the fastest-growing infrastructure solutions providers in the USA through vision and relentless pursuit of excellence\u2014a true example of the American Dream. Under his leadership, Urban has experienced rapid growth, expanding its reach and influence into major cities in Texas including the Dallas-Fort Worth metroplex, San Antonio, and Austin.

Anup is committed to making a positive impact in the community, as seen in his involvement with the Young Presidents\u2019 Organization (YPO) for the past five years, where he collaborates with fellow leaders to drive positive change. He is also a member of the Associated General Contractors of America (AGC), contributing to the advancement of the construction industry, and serves on the board of the Greater Dallas Planning Council (GDPC), where he brings infrastructure expertise to regional planning and urban policy. Anup is dedicated to charitable work in his home country of Nepal, with a vision to provide education for one million kids, having established the Amaalya SK Foundation. In the USA, he gives back to the community through his nonprofit Urban Cares. Additionally, he is an avid marathon runner, using the discipline of running to fuel his business approach. Anup also serves as president of a local soccer team, Goalbusters FC, and enjoys playing with his teammates, fostering teamwork and community outside of his professional and philanthropic endeavors.`
     },
     {
       name: 'Mohammed Farshori',
       role: 'Advisor',
       img: 'https://cms.nacoc.org/wp-content/uploads/2026/06/image-12.jpg',
       bio: `Mohammed Farshori is a globally recognized sustainability and social impact leader driving transformative impact across business, civic, and international platforms. He currently serves as Chair of the Asian Chamber of Texas, Sustainability Chair of the National Cricket League\u2013USA, cofounder of Bluebonnet Hub, cofounder of Faith @ Work, serves on the Visit Dallas Board, and is a member of the FIFA Dallas Sustainability Committee.

Previously, as Director of Citizenship & Sustainability for a Fortune 10 company, he supported digital divide access, carbon neutrality goals and led large-scale ESG and community impact employee engagement initiatives across the U.S., EMEA, and APAC.

A recipient of the 2025 United Nations Global Leadership Award in Sustainability, the Dallas Business Journal\u2019s Minority Business Leader Award, Immigrant Journey Award and recognized in the Dallas 500, he is currently pursuing a Master\u2019s in Sustainability at Harvard University. He has also served for nine years as a career transition coach for veterans through the ACP program and for eight years on the Global Funds for Children\u2019s Girl Up Advisory board.

In the past, Mohammed has also served as the President and Trustee Chair of the India Association of North Texas (Est 1962), Mahatma Gandhi Memorial of North Texas Board, and President of the North American Society of Indian Muslims.

He continues to shape the future of resilient, inclusive, and environmentally responsible communities worldwide.`
     },
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
                style={{ objectPosition: leader.objectPosition || 'center 15%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Expand size={16} className="text-white/70 drop-shadow-lg" />
            </div>
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
               <h1 className="text-3xl lg:text-5xl font-heading font-bold text-slate-900 mb-6 leading-tight">
                 Advancing Business.<br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Empowering Communities.</span><br/>
                 Building the Future.
               </h1>
               <div className="text-slate-600 leading-relaxed font-body max-w-xl space-y-4">
                 <p>
                   The Nepalese American Chamber of Commerce (NACOC) serves as the leading voice for Nepalese American entrepreneurs, professionals, and businesses. We are committed to advancing economic growth, supporting business development, advocating for policies that strengthen commerce, and creating opportunities that empower our community to thrive.
                 </p>
                 <p>
                   Through strategic partnerships, leadership development, networking, education, and advocacy, NACOC connects businesses with the resources and relationships they need to succeed. Together, we are building a stronger, more prosperous future for the Nepalese American business community and the regions we serve.
                 </p>
               </div>
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
                            <img src="https://cms.nacoc.org/wp-content/uploads/2026/06/image-1.jpg" alt="Shraddha Shrestha" className="w-full h-full object-cover" />
                      </div>
                      <div>
                           <div className="font-bold text-slate-900 text-sm">Shraddha Shrestha</div>
                           <div className="text-[10px] text-secondary uppercase font-bold tracking-widest">President, 2026-2027</div>
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
            <p className="text-slate-400 text-base">Meet the dedicated leaders serving the 2026-2027 term.</p>
          </div>

          <div className="max-w-7xl mx-auto">
            {/* Executive Committee */}
            <SectionHeading><span className="text-white">Executive Committee</span></SectionHeading>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mb-12">
                {executiveCommittee.map(renderMemberCard)}
            </div>

            {/* Board Of Directors */}
            <SectionHeading><span className="text-white">Executive Members</span></SectionHeading>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mb-12">
                {boardDirectors.map(renderMemberCard)}
            </div>
            
             {/* Advisors */}
             <SectionHeading><span className="text-white">Advisors</span></SectionHeading>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
                {directorsAdvisors.map(renderMemberCard)}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
