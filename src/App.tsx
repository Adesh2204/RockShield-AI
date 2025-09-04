import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from './Components/Navigation';
import Hero from './Components/Hero';
import InteractiveMap from './Components/InteractiveMap';
import HazardFeed from './Components/HazardFeed';
import RiskPredictor from './Components/RiskPredictor';
import Leaderboard from './Components/LeaderBoard';
import Carousel from './Components/Carousel';
import Timeline from './Components/Timeline';
import Demo from './Components/Demo';
import ChatBot from './Components/ChatBot';
import SocialProof from './Components/SocialProof';
import Footer from './Components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'map', 'predictor', 'demo', 'leaderboard', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToDemo = () => {
    scrollToSection('demo');
  };

  return (
    <div className="min-h-screen bg-slate-900 font-['Poppins']">
      {/* Global Loading Animation */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-orange-400 to-orange-500 p-4 rounded-full"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, ease: "linear" }}
          >
            ⛏️
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Navigation */}
      <Navigation activeSection={activeSection} onSectionClick={scrollToSection} />

      {/* Page Sections */}
      <Hero onScrollToDemo={scrollToDemo} />
      <InteractiveMap />
      <HazardFeed />
      <RiskPredictor />
      <Timeline />
      <Demo />
      <Leaderboard />
      <Carousel />
      <SocialProof />
      <Footer />

      {/* Chat Bot */}
      <ChatBot />

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

export default App;