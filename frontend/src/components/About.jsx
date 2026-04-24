import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useTheme } from '../useTheme';

const About = () => {
  const navigate = useNavigate();
  const { isToggled, toggleTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const toggleThemeAndSave = () => toggleTheme();

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isToggled 
        ? 'bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#333333]' 
        : 'bg-gradient-to-br from-[#F8FAFC] via-[#f5f2e9] to-[#e8e5dc]'
    }`}>
      {/* Navigation */}
      <nav className={`backdrop-blur-md shadow-sm border-b transition-all duration-500 ${
        isToggled 
          ? 'bg-[#000000]/90 border-[#BCCCDC]/30' 
          : 'bg-[#F8FAFC]/80 border-[#D9EAFD]/20'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleTheme}
                className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-110 ${
                  isToggled 
                    ? 'from-[#BCCCDC] to-[#D9EAFD] rotate-180' 
                    : 'from-[#D9EAFD] to-[#BCCCDC] rotate-0'
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
                    ? 'bg-gradient-to-r from-[#D9EAFD] via-[#BCCCDC] to-[#D9EAFD]' 
                    : 'bg-gradient-to-r from-[#BCCCDC] via-[#D9EAFD] to-[#BCCCDC]'
                }`}
              >
                MindLift
              </button>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigate('/features')} className={`font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 ${
                isToggled 
                  ? 'text-[#D9EAFD] hover:text-[#BCCCDC]' 
                  : 'text-[#BCCCDC] hover:text-[#D9EAFD]'
              }`}>Features</button>
              <button onClick={() => navigate('/about')} className={`font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 ${
                isToggled 
                  ? 'text-[#D9EAFD] hover:text-[#BCCCDC]' 
                  : 'text-[#BCCCDC] hover:text-[#D9EAFD]'
              }`}>About</button>
              <button onClick={() => navigate('/contact')} className={`font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 ${
                isToggled 
                  ? 'text-[#D9EAFD] hover:text-[#BCCCDC]' 
                  : 'text-[#BCCCDC] hover:text-[#D9EAFD]'
              }`}>Contact</button>
            </div>
            
            <button
              onClick={() => navigate('/dashboard')}
              className={`text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                isToggled 
                  ? 'bg-[#BCCCDC] hover:bg-[#BCCCDC]/90' 
                  : 'bg-[#D9EAFD] hover:bg-[#D9EAFD]/90'
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
            isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
          }`}>About MindLift</h1>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto transition-all duration-500 ${
            isToggled ? 'text-[#D9EAFD]/80' : 'text-[#000000]/80'
          }`}>
            Empowering students to achieve mental wellness and academic success through comprehensive support tools
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className={`text-3xl font-bold mb-6 transition-all duration-500 ${
              isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
            }`}>Our Mission</h2>
            <p className={`text-lg mb-6 leading-relaxed transition-all duration-500 ${
              isToggled ? 'text-[#D9EAFD]/80' : 'text-[#000000]/80'
            }`}>
              MindLift is dedicated to supporting student mental health by providing a comprehensive platform that combines 
              evidence-based wellness tools, professional mentorship, and peer support to help students thrive academically 
              and personally.
            </p>
            <p className={`text-lg leading-relaxed transition-all duration-500 ${
              isToggled ? 'text-[#D9EAFD]/80' : 'text-[#000000]/80'
            }`}>
              We believe that mental wellness is fundamental to academic success and personal growth. Our platform addresses 
              the unique challenges faced by students in today's demanding educational environment.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800" 
              alt="Mental wellness and meditation" 
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
            <div className={`absolute inset-0 rounded-2xl ${
              isToggled ? 'bg-[#000000]/20' : 'bg-white/10'
            }`}></div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold mb-12 text-center transition-all duration-500 ${
            isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
          }`}>Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`text-center p-8 rounded-2xl shadow-lg transition-all duration-500 ${
              isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
            }`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                isToggled 
                  ? 'bg-gradient-to-r from-[#BCCCDC] to-[#D9EAFD]' 
                  : 'bg-gradient-to-r from-[#D9EAFD] to-[#BCCCDC]'
              }`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
              }`}>Privacy & Security</h3>
              <p className={`${
                isToggled ? 'text-[#D9EAFD]/80' : 'text-[#000000]/80'
              }`}>Your mental health data is protected with enterprise-grade security and complete privacy.</p>
            </div>

            <div className={`text-center p-8 rounded-2xl shadow-lg transition-all duration-500 ${
              isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
            }`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                isToggled 
                  ? 'bg-gradient-to-r from-[#BCCCDC] to-[#D9EAFD]' 
                  : 'bg-gradient-to-r from-[#D9EAFD] to-[#BCCCDC]'
              }`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
              }`}>Evidence-Based</h3>
              <p className={`${
                isToggled ? 'text-[#D9EAFD]/80' : 'text-[#000000]/80'
              }`}>All our tools and recommendations are based on scientific research and proven methodologies.</p>
            </div>

            <div className={`text-center p-8 rounded-2xl shadow-lg transition-all duration-500 ${
              isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
            }`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                isToggled 
                  ? 'bg-gradient-to-r from-[#BCCCDC] to-[#D9EAFD]' 
                  : 'bg-gradient-to-r from-[#D9EAFD] to-[#BCCCDC]'
              }`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
              }`}>Community Support</h3>
              <p className={`${
                isToggled ? 'text-[#D9EAFD]/80' : 'text-[#000000]/80'
              }`}>Connect with peers and professionals who understand your journey and challenges.</p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className={`p-12 rounded-2xl shadow-lg mb-16 ${
          isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
        }`}>
          <h2 className={`text-3xl font-bold mb-8 text-center transition-all duration-500 ${
            isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
          }`}>Making a Difference</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className={`text-4xl font-bold mb-2 ${
                isToggled ? 'text-[#D9EAFD]' : 'text-[#BCCCDC]'
              }`}>10,000+</div>
              <div className={`text-sm font-medium ${
                isToggled ? 'text-[#D9EAFD]/80' : 'text-[#000000]/80'
              }`}>Students Supported</div>
            </div>
            <div>
              <div className={`text-4xl font-bold mb-2 ${
                isToggled ? 'text-[#D9EAFD]' : 'text-[#BCCCDC]'
              }`}>500+</div>
              <div className={`text-sm font-medium ${
                isToggled ? 'text-[#D9EAFD]/80' : 'text-[#000000]/80'
              }`}>Licensed Mentors</div>
            </div>
            <div>
              <div className={`text-4xl font-bold mb-2 ${
                isToggled ? 'text-[#D9EAFD]' : 'text-[#BCCCDC]'
              }`}>95%</div>
              <div className={`text-sm font-medium ${
                isToggled ? 'text-[#D9EAFD]/80' : 'text-[#000000]/80'
              }`}>Satisfaction Rate</div>
            </div>
            <div>
              <div className={`text-4xl font-bold mb-2 ${
                isToggled ? 'text-[#D9EAFD]' : 'text-[#BCCCDC]'
              }`}>24/7</div>
              <div className={`text-sm font-medium ${
                isToggled ? 'text-[#D9EAFD]/80' : 'text-[#000000]/80'
              }`}>Support Available</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className={`text-3xl font-bold mb-6 transition-all duration-500 ${
            isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
          }`}>Ready to Start Your Wellness Journey?</h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto transition-all duration-500 ${
            isToggled ? 'text-[#D9EAFD]/80' : 'text-[#000000]/80'
          }`}>
            Join thousands of students who are already improving their mental health and academic performance with MindLift.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className={`text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg ${
              isToggled 
                ? 'bg-gradient-to-r from-[#BCCCDC] to-[#D9EAFD]' 
                : 'bg-gradient-to-r from-[#D9EAFD] to-[#BCCCDC]'
            }`}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;