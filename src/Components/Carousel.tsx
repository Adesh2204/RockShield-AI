import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Bot } from 'lucide-react';
import { Story } from '../Types';
import { storiesData } from '../data/mockData';

const Carousel: React.FC = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentStory(prev => (prev + 1) % storiesData.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextStory = () => {
    setCurrentStory(prev => (prev + 1) % storiesData.length);
  };

  const prevStory = () => {
    setCurrentStory(prev => (prev - 1 + storiesData.length) % storiesData.length);
  };

  const currentStoryData = storiesData[currentStory];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-800 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-gradient-to-r from-orange-400 to-orange-500 p-3 rounded-full"
            >
              <Bot className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-4xl font-bold text-white font-['Poppins']">
              RockyBot Stories
            </h2>
          </div>
          <p className="text-xl text-blue-100 font-['Poppins'] font-light">
            Real rescue scenarios narrated by our AI safety assistant
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStory}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2"
              >
                {/* Story Image */}
                <div className="relative h-64 md:h-96">
                  <img
                    src={currentStoryData.image}
                    alt={currentStoryData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  
                  {/* RockyBot Avatar */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute bottom-4 left-4 bg-orange-500 p-3 rounded-full shadow-lg"
                  >
                    <Bot className="w-6 h-6 text-white" />
                  </motion.div>
                </div>

                {/* Story Content */}
                <div className="p-8 flex flex-col justify-center">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-white mb-4 font-['Poppins']"
                  >
                    {currentStoryData.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-300 mb-6 leading-relaxed"
                  >
                    {currentStoryData.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl p-4 border border-green-500/30"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-green-400">✨</div>
                      <span className="text-green-400 font-semibold">Outcome</span>
                    </div>
                    <p className="text-green-200 text-sm">{currentStoryData.outcome}</p>
                  </motion.div>

                  {/* Story Navigation */}
                  <div className="flex items-center justify-between mt-8">
                    <button
                      onClick={prevStory}
                      className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-full transition-all duration-200"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex gap-2">
                      {storiesData.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentStory(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            index === currentStory ? 'bg-orange-400' : 'bg-slate-600'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextStory}
                      className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-full transition-all duration-200"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Auto-play toggle */}
          <div className="flex justify-center mt-6">
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                isAutoPlaying
                  ? 'bg-orange-500 text-white shadow-lg hover:shadow-orange-500/25'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {isAutoPlaying ? '⏸️ Pause Stories' : '▶️ Auto Play'}
            </motion.button>
          </div>
        </div>

        {/* RockyBot Introduction */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl p-8 border border-orange-500/30"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="bg-gradient-to-br from-orange-400 to-orange-600 p-6 rounded-full shadow-2xl"
            >
              <Bot className="w-16 h-16 text-white" />
            </motion.div>
            
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Meet RockyBot</h3>
              <p className="text-orange-200 mb-4">
                Your friendly AI safety assistant, here to guide you through mine safety protocols 
                and share real success stories from the field.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-orange-400/20 text-orange-300 px-3 py-1 rounded-full text-sm">
                  📚 Safety Guide
                </span>
                <span className="bg-orange-400/20 text-orange-300 px-3 py-1 rounded-full text-sm">
                  🚨 Emergency Response
                </span>
                <span className="bg-orange-400/20 text-orange-300 px-3 py-1 rounded-full text-sm">
                  📈 Performance Analytics
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Carousel;