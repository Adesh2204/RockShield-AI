import React from 'react';
import { motion } from 'framer-motion';
import { Award, Github, Star, Users, Zap, Target } from 'lucide-react';

const SocialProof: React.FC = () => {
  const achievements = [
    {
      icon: Award,
      title: 'Best AI Innovation',
      subtitle: 'Mining Tech Hackathon 2024',
      color: 'from-yellow-400 to-yellow-600',
      emoji: '🏆'
    },
    {
      icon: Award,
      title: 'Safety Excellence',
      subtitle: 'National Mining Awards',
      color: 'from-green-400 to-green-600',
      emoji: '🥇'
    },
    {
      icon: Star,
      title: 'Industry Recognition',
      subtitle: 'Tech Innovation Summit',
      color: 'from-purple-400 to-purple-600',
      emoji: '⭐'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Chief Safety Officer, Coal India Ltd',
      quote: 'RockShield AI has transformed our safety protocols. The predictive capabilities are remarkable.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
    },
    {
      name: 'Priya Sharma',
      role: 'Mining Operations Manager',
      quote: 'The real-time alerts have prevented multiple incidents. This technology is a game-changer.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    },
    {
      name: 'Michael Chen',
      role: 'Safety Engineer',
      quote: 'The AI predictions are incredibly accurate. It feels like having a crystal ball for mining safety.',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg'
    }
  ];


  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4 font-['Poppins']">
            Industry Recognition
          </h2>
          <p className="text-xl text-blue-100 font-['Poppins'] font-light">
            Trusted by mining leaders worldwide
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className={`bg-gradient-to-br ${achievement.color} rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden`}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1] 
                }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                className="text-6xl mb-4"
              >
                {achievement.emoji}
              </motion.div>
              
              <h3 className="text-xl font-bold text-white mb-2">
                {achievement.title}
              </h3>
              <p className="text-white/90 text-sm">{achievement.subtitle}</p>
              
              {/* Sparkle effect */}
              <motion.div
                animate={{ scale: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                className="absolute top-4 right-4 w-4 h-4 bg-white rounded-full opacity-60"
              />
            </motion.div>
          ))}
        </div>

        {/* GitHub and Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-700 mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Github className="w-8 h-8 text-white" />
              Open Source Community
            </h3>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-slate-800 rounded-xl p-6 border border-slate-600"
            >
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">2.3k</div>
              <div className="text-gray-400 text-sm">GitHub Stars</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-slate-800 rounded-xl p-6 border border-slate-600"
            >
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">850+</div>
              <div className="text-gray-400 text-sm">Contributors</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-slate-800 rounded-xl p-6 border border-slate-600"
            >
              <Zap className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">15k+</div>
              <div className="text-gray-400 text-sm">Commits</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-slate-800 rounded-xl p-6 border border-slate-600"
            >
              <Target className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            What Industry Leaders Say
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-700 relative"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-400"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm">{testimonial.name}</h4>
                    <p className="text-gray-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>
                
                <blockquote className="text-gray-300 text-sm italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Quote mark decoration */}
                <div className="absolute top-4 right-4 text-4xl text-orange-400/20 font-serif">
                  "
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;