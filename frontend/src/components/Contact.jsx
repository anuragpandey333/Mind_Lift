import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Contact = () => {
  const navigate = useNavigate();
  const [isToggled, setIsToggled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'support', message: 'Hello! How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const theme = localStorage.getItem('theme');
    setIsAuthenticated(!!token);
    setIsToggled(theme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isToggled;
    setIsToggled(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      const userMessage = chatInput.trim();
      setChatMessages(prev => [...prev, { sender: 'user', message: userMessage }]);
      setChatInput('');
      
      setIsTyping(true);
      setTimeout(() => {
        const responses = {
          'hello': 'Hello! How can I assist you with your mental wellness today?',
          'hi': 'Hi there! I\'m here to support you. What can I help you with?',
          'help': 'I\'m here to help! You can ask me about our services, book a session, or get immediate support.',
          'crisis': 'If you\'re in crisis, please call 988 (Suicide Prevention Lifeline) or 911 immediately. I can also connect you with a counselor.',
          'emergency': 'This sounds urgent. Please call 911 or 988 immediately. Would you like me to provide more crisis resources?',
          'appointment': 'I can help you book an appointment with one of our licensed therapists. Would you like to schedule a session?',
          'mood': 'Our mood tracking feature helps you monitor your emotional well-being. Would you like to learn more about it?',
          'anxiety': 'I understand anxiety can be overwhelming. Our platform offers mood tracking and professional support. Would you like to connect with a counselor?',
          'depression': 'Thank you for sharing. Depression is treatable and you\'re not alone. Would you like to speak with one of our mental health professionals?',
          'stress': 'Stress management is important for your wellbeing. We have tools and professionals who can help. What\'s causing you the most stress?',
          'default': 'I understand you have a question. If this is urgent, please contact our support system at support@mindlift.com or call 1-800-MINDLIFT for immediate assistance. Otherwise, a mental health professional will respond within 2-3 minutes.'
        };
        
        const lowerMessage = userMessage.toLowerCase();
        let response = responses.default;
        let foundMatch = false;
        
        for (const [key, value] of Object.entries(responses)) {
          if (key !== 'default' && lowerMessage.includes(key)) {
            response = value;
            foundMatch = true;
            break;
          }
        }
        
        // If no specific keyword match, use the default urgent contact message
        if (!foundMatch) {
          response = 'I understand you have a question. If this is urgent, please contact our support system at support@mindlift.com or call 1-800-MINDLIFT for immediate assistance. A mental health professional will also respond to you here within 2-3 minutes.';
        }
        
        setIsTyping(false);
        setChatMessages(prev => [...prev, { sender: 'support', message: response }]);
        
        // Add follow-up message for non-matched queries
        if (!foundMatch) {
          setTimeout(() => {
            setChatMessages(prev => [...prev, { 
              sender: 'support', 
              message: 'You can also email us at support@mindlift.com or use the contact form on this page for detailed assistance.' 
            }]);
          }, 2000);
        }
        
        // Auto scroll to bottom
        setTimeout(() => {
          const chatContainer = document.getElementById('chat-messages');
          if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
          }
        }, 100);
      }, 1500);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your message has been sent. We'll get back to you at ${formData.email} within 24 hours.`);
    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isToggled 
        ? 'bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#333333]' 
        : 'bg-gradient-to-br from-[#EFECE3] via-[#f5f2e9] to-[#e8e5dc]'
    }`}>
      {/* Navigation */}
      <nav className={`backdrop-blur-md shadow-sm border-b transition-all duration-500 ${
        isToggled 
          ? 'bg-[#000000]/90 border-[#4A70A9]/30' 
          : 'bg-[#EFECE3]/80 border-[#8FABD4]/20'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleTheme}
                className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-110 ${
                  isToggled 
                    ? 'from-[#4A70A9] to-[#8FABD4] rotate-180' 
                    : 'from-[#8FABD4] to-[#4A70A9] rotate-0'
                }`}
              >
                <svg className={`w-7 h-7 text-white transition-all duration-500 ${
                  isToggled ? 'rotate-45 scale-110' : 'rotate-0 scale-100'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className={`text-3xl font-semibold bg-clip-text text-transparent tracking-wider transition-all duration-500 hover:opacity-80 ${
                  isToggled 
                    ? 'bg-gradient-to-r from-[#8FABD4] via-[#4A70A9] to-[#8FABD4]' 
                    : 'bg-gradient-to-r from-[#4A70A9] via-[#8FABD4] to-[#4A70A9]'
                }`}
              >
                MindLift
              </button>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigate('/features')} className={`font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 ${
                isToggled 
                  ? 'text-[#8FABD4] hover:text-[#4A70A9]' 
                  : 'text-[#4A70A9] hover:text-[#8FABD4]'
              }`}>Features</button>
              <button onClick={() => navigate('/about')} className={`font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 ${
                isToggled 
                  ? 'text-[#8FABD4] hover:text-[#4A70A9]' 
                  : 'text-[#4A70A9] hover:text-[#8FABD4]'
              }`}>About</button>
              <button onClick={() => navigate('/contact')} className={`font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 ${
                isToggled 
                  ? 'text-[#8FABD4] hover:text-[#4A70A9]' 
                  : 'text-[#4A70A9] hover:text-[#8FABD4]'
              }`}>Contact</button>
            </div>
            
            <button
              onClick={() => navigate('/dashboard')}
              className={`text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                isToggled 
                  ? 'bg-[#4A70A9] hover:bg-[#4A70A9]/90' 
                  : 'bg-[#8FABD4] hover:bg-[#8FABD4]/90'
              }`}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto pt-24 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 transition-all duration-500 ${
            isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
          }`}>Get In Touch</h1>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto transition-all duration-500 ${
            isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
          }`}>
            We're here to support you on your mental wellness journey. Reach out anytime for help, questions, or feedback.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className={`text-center p-8 rounded-2xl shadow-lg transition-all duration-500 hover:scale-105 ${
            isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
          }`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
              isToggled 
                ? 'bg-gradient-to-r from-[#4A70A9] to-[#8FABD4]' 
                : 'bg-gradient-to-r from-[#8FABD4] to-[#4A70A9]'
            }`}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className={`text-xl font-bold mb-4 ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
            }`}>Email Support</h3>
            <p className={`mb-4 ${
              isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
            }`}>Get personalized help via email</p>
            <a href="mailto:support@mindlift.com" className={`font-semibold ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
            }`}>support@mindlift.com</a>
          </div>

          <div className={`text-center p-8 rounded-2xl shadow-lg transition-all duration-500 hover:scale-105 ${
            isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
          }`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
              isToggled 
                ? 'bg-gradient-to-r from-[#4A70A9] to-[#8FABD4]' 
                : 'bg-gradient-to-r from-[#8FABD4] to-[#4A70A9]'
            }`}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className={`text-xl font-bold mb-4 ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
            }`}>Crisis Hotline</h3>
            <p className={`mb-4 ${
              isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
            }`}>Immediate support when you need it most</p>
            <a href="tel:1-800-MINDLIFT" className={`font-semibold ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
            }`}>6303945340-MINDLIFT</a>
          </div>

          <button
            onClick={() => setShowChat(true)}
            className={`text-center p-8 rounded-2xl shadow-lg transition-all duration-500 hover:scale-105 w-full ${
              isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
            }`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
              isToggled 
                ? 'bg-gradient-to-r from-[#4A70A9] to-[#8FABD4]' 
                : 'bg-gradient-to-r from-[#8FABD4] to-[#4A70A9]'
            }`}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className={`text-xl font-bold mb-4 ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
            }`}>Live Chat</h3>
            <p className={`mb-4 ${
              isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
            }`}>Real-time support from our team</p>
            <span className={`font-semibold ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
            }`}>Available 24/7</span>
          </button>
        </div>

        {/* Contact Form */}
        <div className={`max-w-2xl mx-auto p-8 rounded-2xl shadow-lg ${
          isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
        }`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${
            isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
          }`}>Send us a Message</h2>
          
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
              }`}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 ${
                  isToggled 
                    ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:ring-[#4A70A9] focus:border-[#4A70A9]' 
                    : 'bg-white border-[#8FABD4]/30 text-[#000000] focus:ring-[#8FABD4] focus:border-[#8FABD4]'
                }`}
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
              }`}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 ${
                  isToggled 
                    ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:ring-[#4A70A9] focus:border-[#4A70A9]' 
                    : 'bg-white border-[#8FABD4]/30 text-[#000000] focus:ring-[#8FABD4] focus:border-[#8FABD4]'
                }`}
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
              }`}>Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 ${
                  isToggled 
                    ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:ring-[#4A70A9] focus:border-[#4A70A9]' 
                    : 'bg-white border-[#8FABD4]/30 text-[#000000] focus:ring-[#8FABD4] focus:border-[#8FABD4]'
                }`}
              >
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Mental Health Crisis</option>
                <option>Feature Request</option>
                <option>Feedback</option>
              </select>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
              }`}>Message</label>
              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 resize-none ${
                  isToggled 
                    ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:ring-[#4A70A9] focus:border-[#4A70A9]' 
                    : 'bg-white border-[#8FABD4]/30 text-[#000000] focus:ring-[#8FABD4] focus:border-[#8FABD4]'
                }`}
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              className={`w-full text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                isToggled 
                  ? 'bg-gradient-to-r from-[#4A70A9] to-[#8FABD4]' 
                  : 'bg-gradient-to-r from-[#8FABD4] to-[#4A70A9]'
              }`}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Emergency Resources */}
        <div className={`mt-16 p-8 rounded-2xl shadow-lg border-l-4 ${
          isToggled 
            ? 'bg-[#000000]/60 border-[#8FABD4]' 
            : 'bg-white/90 border-[#4A70A9]'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${
            isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
          }`}>Emergency Resources</h3>
          <p className={`mb-4 ${
            isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
          }`}>
            If you're experiencing a mental health crisis, please reach out for immediate help:
          </p>
          <div className="space-y-2">
            <p className={`${
              isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
            }`}>
              <strong>National Suicide Prevention Lifeline:</strong> <a href="tel:988" className={`${
                isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
              } font-semibold`}>988</a>
            </p>
            <p className={`${
              isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
            }`}>
              <strong>Crisis Text Line:</strong> Text HOME to <a href="sms:741741" className={`${
                isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
              } font-semibold`}>741741</a>
            </p>
            <p className={`${
              isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
            }`}>
              <strong>Emergency Services:</strong> <a href="tel:911" className={`${
                isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
              } font-semibold`}>911</a>
            </p>
          </div>
        </div>

        {/* Live Chat Modal */}
        {showChat && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`w-full max-w-md h-96 rounded-2xl shadow-2xl flex flex-col ${
              isToggled ? 'bg-[#000000]/90' : 'bg-white'
            }`}>
              <div className={`p-4 border-b flex justify-between items-center ${
                isToggled ? 'border-[#8FABD4]/20' : 'border-gray-200'
              }`}>
                <h3 className={`font-bold ${
                  isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
                }`}>Live Chat Support</h3>
                <button
                  onClick={() => setShowChat(false)}
                  className={`text-2xl ${
                    isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
                  }`}
                >
                  ×
                </button>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto space-y-3" id="chat-messages">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    <div className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                      msg.sender === 'user'
                        ? isToggled 
                          ? 'bg-[#4A70A9] text-white' 
                          : 'bg-[#8FABD4] text-white'
                        : isToggled
                          ? 'bg-[#8FABD4]/20 text-[#8FABD4]'
                          : 'bg-gray-100 text-[#000000]'
                    }`}>
                      {msg.message}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                      isToggled ? 'bg-[#8FABD4]/20 text-[#8FABD4]' : 'bg-gray-100 text-[#000000]'
                    }`}>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <form onSubmit={handleChatSubmit} className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isTyping}
                    className={`flex-1 px-3 py-2 rounded-lg border ${
                      isToggled 
                        ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4]' 
                        : 'bg-white border-gray-300 text-[#000000]'
                    } ${isTyping ? 'opacity-50' : ''}`}
                  />
                  <button
                    type="submit"
                    disabled={isTyping || !chatInput.trim()}
                    className={`px-4 py-2 rounded-lg text-white transition-opacity ${
                      isToggled 
                        ? 'bg-[#4A70A9]' 
                        : 'bg-[#8FABD4]'
                    } ${(isTyping || !chatInput.trim()) ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;