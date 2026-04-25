import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import { useTheme } from '../useTheme';

const Landing = () => {
  const navigate = useNavigate();
  const { isToggled, toggleTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isToggled 
        ? 'bg-[#000000]' 
        : 'bg-[#F8FAFC]'
    }`} style={{ scrollBehavior: 'smooth' }}>
      <div className="relative z-10">
        <Navbar 
          isToggled={isToggled} 
          toggleTheme={toggleTheme} 
          isAuthenticated={isAuthenticated} 
        />

        {/* Hero Section */}
        <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-20 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="./landing1.png" 
              alt="Students studying and mental wellness" 
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 ${
              isToggled 
                ? 'bg-[#000000]/80' 
                : 'bg-[#F8FAFC]/60'
            }`}></div>
          </div>
          
          <div className="max-w-4xl relative z-10">
            {/* <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-8 transition-all duration-500 shadow-2xl ${
              isToggled 
                ? 'bg-gradient-to-r from-[#68D391] to-[#9AE6B4]' 
                : 'bg-gradient-to-r from-[#4299E1] to-[#63B3ED]'
            }`}>
            </div> */}
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight transition-all duration-500 ${
              isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
            }`}>
              Elevate Your
              <span className={`block transition-all duration-500 mt-2 font-bold ${
                isToggled 
                  ? 'text-[#4A70A9]' 
                  : 'text-[#4A70A9]'
              }`}>
                Mental Wellness
              </span>
            </h1>
            <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed transition-all duration-500 px-4 font-medium ${
              isToggled ? 'text-[#D9EAFD]/90' : 'text-[#000000]/80'
            }`}>
              A comprehensive platform designed for students to manage stress, track mood, 
              connect with mentors, and build healthy habits for academic and personal success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <button
                onClick={() => navigate('/signup')}
                className={`text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-base sm:text-lg ${
                  isToggled 
                    ? 'bg-gradient-to-r from-[#4A70A9] to-[#5A6F8C]' 
                    : 'bg-gradient-to-r from-[#4A70A9] to-[#5A6F8C]'
                }`}
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/login')}
                className={`border-2 px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-base sm:text-lg backdrop-blur-sm ${
                  isToggled 
                    ? 'border-[#4A70A9] text-[#9AA6B2] hover:bg-[#4A70A9] hover:text-white bg-white/10' 
                    : 'border-[#4A70A9] text-[#4A70A9] hover:bg-[#4A70A9] hover:text-white bg-white/50'
                }`}
              >
                Sign In
              </button>
            </div>

            {/* AI Assistant Highlight */}
            <div className={`mt-10 p-6 rounded-2xl border flex flex-col sm:flex-row items-center gap-5 text-left ${
              isToggled
                ? 'bg-gradient-to-r from-[#1a2e45] to-[#0d1b2a] border-[#4A70A9]/60'
                : 'bg-gradient-to-r from-[#4A70A9] to-[#5A6F8C] border-[#3a5a8c]/30'
            }`}>
              <div className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg ${
                isToggled
                  ? 'bg-gradient-to-br from-[#4A70A9] to-[#D9EAFD]/30'
                  : 'bg-white/20'
              }`}>
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 text-white">AI-Powered Assistant</h3>
                <p className="text-sm leading-relaxed text-white/85">
                  Experience smarter mental wellness support with our built-in AI Assistant — get intelligent insights, personalized suggestions, and real-time guidance to help you track your mood, manage stress, and build healthier habits every day.
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Features Section */}
        <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative" style={{ scrollMarginTop: '80px' }}>
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 transition-all duration-500 ${
              isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
            }`}>Why Choose MindLift?</h2>
            <p className={`text-lg max-w-2xl mx-auto transition-all duration-500 ${
              isToggled ? 'text-[#D9EAFD]/80' : 'text-[#000000]/80'
            }`}>Comprehensive tools designed specifically for student mental wellness</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={`backdrop-blur-sm p-8 rounded-3xl shadow-2xl border transition-all duration-500 ${
              isToggled 
                ? 'bg-[#000000]/80 border-[#D9EAFD]/20' 
                : 'bg-white/90 border-[#D9EAFD]/10'
            }`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                isToggled 
                  ? 'bg-gradient-to-r from-[#BCCCDC] to-[#D9EAFD]' 
                  : 'bg-gradient-to-r from-[#D9EAFD] to-[#BCCCDC]'
              }`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-4 transition-all duration-300 ${
                isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
              }`}>Mood Tracking</h3>
              <p className={`transition-all duration-300 ${
                isToggled ? 'text-[#D9EAFD]/80' : 'text-[#000000]/80'
              }`}>Monitor your emotional well-being with daily mood logs and insights.</p>
            </div>

            <div className={`backdrop-blur-sm p-8 rounded-3xl shadow-2xl border transition-all duration-500 ${
              isToggled 
                ? 'bg-[#000000]/80 border-[#D9EAFD]/20' 
                : 'bg-white/90 border-[#D9EAFD]/10'
            }`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                isToggled 
                  ? 'bg-gradient-to-r from-[#BCCCDC] to-[#D9EAFD]' 
                  : 'bg-gradient-to-r from-[#D9EAFD] to-[#BCCCDC]'
              }`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-4 transition-all duration-300 ${
                isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
              }`}>Expert Mentorship</h3>
              <p className={`transition-all duration-300 ${
                isToggled ? 'text-[#D9EAFD]/80' : 'text-[#000000]/80'
              }`}>Connect with verified mental health professionals and peer mentors.</p>
            </div>

            <div className={`backdrop-blur-sm p-8 rounded-3xl shadow-2xl border transition-all duration-500 ${
              isToggled 
                ? 'bg-[#000000]/80 border-[#D9EAFD]/20' 
                : 'bg-white/90 border-[#D9EAFD]/10'
            }`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                isToggled 
                  ? 'bg-gradient-to-r from-[#BCCCDC] to-[#D9EAFD]' 
                  : 'bg-gradient-to-r from-[#D9EAFD] to-[#BCCCDC]'
              }`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-4 transition-all duration-300 ${
                isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
              }`}>Wellness Tools</h3>
              <p className={`transition-all duration-300 ${
                isToggled ? 'text-[#D9EAFD]/80' : 'text-[#000000]/80'
              }`}>Comprehensive fitness tracking, diet planning, and productivity tools.</p>
            </div>
          </div>

        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" style={{ scrollMarginTop: '80px' }}>
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 transition-all duration-500 ${
              isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
            }`}>What Students Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-3xl shadow-2xl border transition-all duration-500 ${
              isToggled 
                ? 'bg-[#000000]/80 border-[#D9EAFD]/20' 
                : 'bg-white/90 border-[#D9EAFD]/10'
            }`}>
              <div className="flex items-center mb-6">
                <img 
                  src="./Photo1.png" 
                  alt="Student testimonial" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className={`font-bold ${
                    isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
                  }`}>Mayank Yadav</h4>
                  <p className={`text-sm ${
                    isToggled ? 'text-[#D9EAFD]/70' : 'text-[#000000]/60'
                  }`}>Psychology Major</p>
                </div>
              </div>
              <p className={`text-lg leading-relaxed ${
                isToggled ? 'text-[#D9EAFD]/80' : 'text-[#000000]/80'
              }`}>
                "MindLift helped me manage my anxiety during final exam week. The mood tracking feature made me more aware of my mental state."
              </p>
            </div>

            <div className={`p-8 rounded-3xl shadow-2xl border transition-all duration-500 ${
              isToggled 
                ? 'bg-[#000000]/80 border-[#D9EAFD]/20' 
                : 'bg-white/90 border-[#D9EAFD]/10'
            }`}>
              <div className="flex items-center mb-6">
                <img 
                  src="photo.png" 
                  alt="Student testimonial" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className={`font-bold ${
                    isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
                  }`}>Dhruv Kumar</h4>
                  <p className={`text-sm ${
                    isToggled ? 'text-[#D9EAFD]/70' : 'text-[#000000]/60'
                  }`}>Engineering Student</p>
                </div>
              </div>
              <p className={`text-lg leading-relaxed ${
                isToggled ? 'text-[#D9EAFD]/80' : 'text-[#000000]/80'
              }`}>
                "The mentorship program connected me with someone who understood my struggles. It's been life-changing."
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer isToggled={isToggled} />
    </div>
  );
};

export default Landing;