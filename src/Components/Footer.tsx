import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Github, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  const footerLinks = {
    Product: ['Features', 'Pricing', 'Demo', 'API Documentation'],
    Company: ['About', 'Careers', 'Press', 'Partners'],
    Support: ['Help Center', 'Contact', 'Community', 'Status'],
    Legal: ['Privacy', 'Terms', 'Security', 'Compliance']
  };

  return (
    <footer id="contact" className="bg-slate-900 border-t border-slate-700">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-3 rounded-xl shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-white font-['Poppins']">
                RockShield AI
              </span>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Revolutionizing mining safety through artificial intelligence. 
              Protecting workers, preventing incidents, and building a safer future for the mining industry.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-slate-800 hover:bg-orange-500 text-gray-400 hover:text-white p-3 rounded-xl transition-all duration-300 shadow-lg"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-white font-semibold mb-4 font-['Poppins']">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-orange-400 transition-all duration-200 text-sm"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-slate-700"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/20 p-3 rounded-full">
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-white font-semibold">Headquarters</div>
                <div className="text-gray-400 text-sm">Bangalore, India</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-green-500/20 p-3 rounded-full">
                <Phone className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-white font-semibold">24/7 Emergency</div>
                <div className="text-gray-400 text-sm">+91-800-ROCKSHIELD</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-orange-500/20 p-3 rounded-full">
                <Mail className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <div className="text-white font-semibold">Contact</div>
                <div className="text-gray-400 text-sm">hello@rockshield.ai</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hackathon Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-xl p-6 border border-orange-500/30">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <motion.div
                animate={{ bounce: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl"
              >
                🚀
              </motion.div>
              <span className="text-orange-400 font-semibold">
                Built for Mining Tech Innovation Hackathon 2024
              </span>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-2xl"
              >
                ⚡
              </motion.div>
            </div>
            <p className="text-orange-200 text-sm mt-2">
              Empowering safer mining operations through cutting-edge AI technology
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 RockShield AI. All rights reserved. Made with ❤️ for mining safety.
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="hover:text-orange-400 transition-colors"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="hover:text-orange-400 transition-colors"
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="hover:text-orange-400 transition-colors flex items-center gap-1"
              >
                <Github className="w-4 h-4" />
                Open Source
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;