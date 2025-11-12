import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Phone, MessageCircle, AlertTriangle, Send, 
  User, Crown, Building, Shield, Heart, Store, Truck,
  MapPin, Clock, CheckCircle, X
} from 'lucide-react';

interface Authority {
  id: string;
  name: string;
  position: string;
  department: string;
  icon: React.ElementType;
  priority: 'high' | 'medium' | 'low';
  status: 'online' | 'offline' | 'busy';
  responseTime: string;
  contact: string;
}

interface Message {
  id: string;
  sender: 'user' | 'authority';
  authorityId?: string;
  content: string;
  timestamp: Date;
  urgent?: boolean;
}

const authorities: Authority[] = [
  {
    id: 'cm',
    name: 'Mamata Banerjee',
    position: 'Chief Minister',
    department: 'West Bengal Government',
    icon: Crown,
    priority: 'high',
    status: 'online',
    responseTime: '< 5 min',
    contact: '+91-98765-43210'
  },
  {
    id: 'hm',
    name: 'Amit Shah',
    position: 'Home Minister',
    department: 'Ministry of Home Affairs',
    icon: Shield,
    priority: 'high',
    status: 'online',
    responseTime: '< 10 min',
    contact: '+91-98765-43211'
  },
  {
    id: 'em',
    name: 'Bhupendra Yadav',
    position: 'Environment Minister',
    department: 'Ministry of Environment',
    icon: Building,
    priority: 'high',
    status: 'busy',
    responseTime: '< 15 min',
    contact: '+91-98765-43212'
  },
  {
    id: 'mcd',
    name: 'Municipal Corporation',
    position: 'Local Authority',
    department: 'Delhi MCD',
    icon: Building,
    priority: 'medium',
    status: 'online',
    responseTime: '< 20 min',
    contact: '+91-98765-43213'
  },
  {
    id: 'medical',
    name: 'Emergency Medical',
    position: 'Emergency Services',
    department: 'AIIMS Emergency',
    icon: Heart,
    priority: 'high',
    status: 'online',
    responseTime: '< 2 min',
    contact: '108'
  },
  {
    id: 'police',
    name: 'Police Control Room',
    position: 'Emergency Response',
    department: 'Delhi Police',
    icon: Shield,
    priority: 'high',
    status: 'online',
    responseTime: '< 3 min',
    contact: '100'
  },
  {
    id: 'fire',
    name: 'Fire Department',
    position: 'Fire & Rescue',
    department: 'Delhi Fire Service',
    icon: AlertTriangle,
    priority: 'high',
    status: 'online',
    responseTime: '< 5 min',
    contact: '101'
  },
  {
    id: 'shops',
    name: 'Local Shop Network',
    position: 'Supply Chain',
    department: 'Emergency Supplies',
    icon: Store,
    priority: 'medium',
    status: 'online',
    responseTime: '< 30 min',
    contact: '+91-98765-43214'
  },
  {
    id: 'transport',
    name: 'Emergency Transport',
    position: 'Logistics',
    department: 'Transport Authority',
    icon: Truck,
    priority: 'medium',
    status: 'online',
    responseTime: '< 15 min',
    contact: '+91-98765-43215'
  }
];

const EmergencyAlert: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAuthority, setSelectedAuthority] = useState<Authority | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [emergencyLevel, setEmergencyLevel] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [location, setLocation] = useState('Jharkhand Mining Area, Sector 15');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedAuthority) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date(),
      urgent: emergencyLevel === 'critical' || emergencyLevel === 'high'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate authority response
    setTimeout(() => {
      const responses = [
        "Received your emergency alert. Dispatching team immediately.",
        "Emergency protocol activated. ETA 15 minutes.",
        "Alert acknowledged. Coordinating with local authorities.",
        "Immediate response team en route. Stay safe.",
        "Emergency services notified. Please share exact coordinates.",
        "High priority alert received. All units being mobilized."
      ];

      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'authority',
        authorityId: selectedAuthority.id,
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 2000 + Math.random() * 3000);
  };

  const getStatusColor = (status: Authority['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: Authority['priority']) => {
    switch (priority) {
      case 'high': return 'border-red-500/50 bg-red-500/10';
      case 'medium': return 'border-orange-500/50 bg-orange-500/10';
      case 'low': return 'border-green-500/50 bg-green-500/10';
    }
  };

  const getEmergencyColor = (level: typeof emergencyLevel) => {
    switch (level) {
      case 'critical': return 'bg-red-600 border-red-500';
      case 'high': return 'bg-red-500 border-red-400';
      case 'medium': return 'bg-orange-500 border-orange-400';
      case 'low': return 'bg-green-500 border-green-400';
    }
  };

  const startEmergencyCall = (authority: Authority) => {
    window.open(`tel:${authority.contact}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-800 font-['Poppins']">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        
        {/* Emergency floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-red-400/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/analytics')}
              className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Analytics</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-2 rounded-xl shadow-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Emergency Alert System</h1>
                <p className="text-xs text-red-200">Contact Higher Authorities</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <motion.div
            className="mb-6 inline-block"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-4xl">🚨</span>
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Emergency Alert System
          </h2>
          <p className="text-xl text-red-200">
            Instant communication with Indian authorities and emergency services
          </p>
        </motion.div>

        {/* Emergency Level Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-red-400/30 shadow-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              Emergency Level & Location
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-3">Emergency Level</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['low', 'medium', 'high', 'critical'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setEmergencyLevel(level)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        emergencyLevel === level 
                          ? getEmergencyColor(level) + ' text-white'
                          : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600/50'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-3">Current Location</label>
                <div className="flex items-center gap-2 bg-slate-700/50 rounded-xl px-4 py-3 border border-slate-600">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-transparent text-white flex-1 outline-none"
                    placeholder="Enter current location"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Authorities List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-red-400/30 shadow-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <User className="w-6 h-6 text-red-400" />
                Authorities & Services
              </h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {authorities.map((authority) => {
                  const IconComponent = authority.icon;
                  return (
                    <motion.div
                      key={authority.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedAuthority(authority)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedAuthority?.id === authority.id
                          ? 'border-red-500 bg-red-500/20'
                          : getPriorityColor(authority.priority) + ' hover:border-red-400/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="bg-slate-700 p-2 rounded-lg">
                              <IconComponent className="w-5 h-5 text-red-400" />
                            </div>
                            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(authority.status)}`} />
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm">{authority.name}</h4>
                            <p className="text-xs text-slate-300">{authority.position}</p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startEmergencyCall(authority);
                          }}
                          className="bg-green-500 hover:bg-green-600 p-2 rounded-lg transition-colors"
                        >
                          <Phone className="w-4 h-4 text-white" />
                        </button>
                      </div>
                      
                      <div className="text-xs text-slate-400 mb-1">{authority.department}</div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {authority.responseTime}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          authority.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                          authority.priority === 'medium' ? 'bg-orange-500/20 text-orange-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {authority.priority}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-red-400/30 shadow-xl p-6 h-[600px] flex flex-col">
              {selectedAuthority ? (
                <>
                  {/* Chat Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-600">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="bg-slate-700 p-3 rounded-xl">
                          <selectedAuthority.icon className="w-6 h-6 text-red-400" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${getStatusColor(selectedAuthority.status)}`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{selectedAuthority.name}</h4>
                        <p className="text-sm text-slate-300">{selectedAuthority.position}</p>
                        <p className="text-xs text-slate-400">{selectedAuthority.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        selectedAuthority.status === 'online' ? 'bg-green-500/20 text-green-300' :
                        selectedAuthority.status === 'busy' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-gray-500/20 text-gray-300'
                      }`}>
                        {selectedAuthority.status}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Response: {selectedAuthority.responseTime}</p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto py-4 space-y-4">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                            message.sender === 'user'
                              ? 'bg-red-500 text-white'
                              : 'bg-slate-700 text-white'
                          } ${message.urgent ? 'ring-2 ring-red-400 ring-opacity-50' : ''}`}>
                            <div className="flex items-center gap-2 mb-1">
                              {message.urgent && (
                                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                              )}
                              <span className="text-xs opacity-75">
                                {message.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-slate-700 text-white px-4 py-3 rounded-2xl">
                          <div className="flex items-center gap-1">
                            <div className="flex space-x-1">
                              <motion.div
                                className="w-2 h-2 bg-slate-400 rounded-full"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-slate-400 rounded-full"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-slate-400 rounded-full"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                              />
                            </div>
                            <span className="text-xs ml-2">{selectedAuthority.name} is typing...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="pt-4 border-t border-slate-600">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder={`Send ${emergencyLevel} priority message to ${selectedAuthority.name}...`}
                        className="flex-1 bg-slate-700 text-white rounded-xl px-4 py-3 border border-slate-600 focus:border-red-400 focus:outline-none transition-colors"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-red-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Send className="w-5 h-5" />
                        Send
                      </motion.button>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Emergency Level: <span className="font-bold text-red-400">{emergencyLevel.toUpperCase()}</span>
                    </p>
                  </div>
                </>
              ) : (
                // No authority selected
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <MessageCircle className="w-12 h-12 text-red-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Select an Authority</h3>
                    <p className="text-slate-400">Choose an authority or service from the list to start emergency communication</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-red-400/30 shadow-xl p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Emergency Hotlines</h3>
            <p className="text-slate-400 text-sm mb-4">Direct access to emergency services</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white">
                <span>Police:</span>
                <span className="font-bold">100</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Fire:</span>
                <span className="font-bold">101</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Medical:</span>
                <span className="font-bold">108</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-red-400/30 shadow-xl p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Alert Status</h3>
            <p className="text-slate-400 text-sm mb-4">Current emergency level</p>
            <div className={`px-4 py-2 rounded-full text-white font-bold ${getEmergencyColor(emergencyLevel)}`}>
              {emergencyLevel.toUpperCase()} PRIORITY
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-red-400/30 shadow-xl p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Response Time</h3>
            <p className="text-slate-400 text-sm mb-4">Average authority response</p>
            <div className="text-2xl font-bold text-green-400">
              {selectedAuthority?.responseTime || '< 10 min'}
            </div>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => navigate('/analytics')}
            className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-3 mx-auto hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Risk Analytics
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default EmergencyAlert;
