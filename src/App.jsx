import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Membership from './pages/Membership';
import MembershipCheckout from './pages/MembershipCheckout';
import Contact from './pages/Contact';
import BusinessDirectory from './pages/BusinessDirectory';
import BusinessDetails from './pages/BusinessDetails';
import Resources from './pages/Resources';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import Legal from './pages/Legal';
// import EConsultReview from './gazuntite/EConsultReview';

import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';


// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
       <Navbar />
       <main className="flex-grow">
         {children}
       </main>
       <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <ScrollToTop />
          <Routes>
          {/* Public Routes */}
          <Route path="*" element={
              <MainLayout>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about-us" element={<About />} />
                      <Route path="/programs" element={<Programs />} />
                      <Route path="/membership" element={<Membership />} />
                      <Route path="/membership/checkout" element={<MembershipCheckout />} />
                      <Route path="/contact-us" element={<Contact />} />
                      <Route path="/directory" element={<BusinessDirectory />} />
                      <Route path="/directory/:slug" element={<BusinessDetails />} />
                      <Route path="/resources" element={<Resources />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/events/:slug" element={<EventDetails />} />
                      <Route path="/blogs" element={<Blogs />} />
                      <Route path="/blogs/:slug" element={<BlogDetails />} />
                      <Route path="/privacy-policy" element={<Legal type="privacy" />} />
                      <Route path="/terms-of-service" element={<Legal type="terms" />} />
                      <Route path="*" element={<div className="p-20 text-center">Page not found</div>} />
                  </Routes>
              </MainLayout>
          } />
        </Routes>
      </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
