import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const About = () => {
  const navigate = useNavigate();
  const [isToggled, setIsToggled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isToggled 
        ? 'bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#333333]' 
        : 'bg-gradient-to-br from-[#EFECE3] via-[#f5f2e9] to-[#e8e5dc]'
    }`}>
      <Navbar 
        isToggled={isToggled} 
        toggleTheme={toggleTheme} 
        isAuthenticated={isAuthenticated} 
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto pt-24 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 transition-all duration-500 ${
            isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
          }`}>About MindLift</h1>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto transition-all duration-500 ${
            isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
          }`}>
            Empowering students to achieve mental wellness and academic success through comprehensive support tools
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className={`text-3xl font-bold mb-6 transition-all duration-500 ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
            }`}>Our Mission</h2>
            <p className={`text-lg mb-6 leading-relaxed transition-all duration-500 ${
              isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
            }`}>
              MindLift is dedicated to supporting student mental health by providing a comprehensive platform that combines 
              evidence-based wellness tools, professional mentorship, and peer support to help students thrive academically 
              and personally.
            </p>
            <p className={`text-lg leading-relaxed transition-all duration-500 ${
              isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
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
            isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
          }`}>Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`text-center p-8 rounded-2xl shadow-lg transition-all duration-500 ${
              isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
            }`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                isToggled 
                  ? 'bg-gradient-to-r from-[#4A70A9] to-[#8FABD4]' 
                  : 'bg-gradient-to-r from-[#8FABD4] to-[#4A70A9]'
              }`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
              }`}>Privacy & Security</h3>
              <p className={`${
                isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
              }`}>Your mental health data is protected with enterprise-grade security and complete privacy.</p>
            </div>

            <div className={`text-center p-8 rounded-2xl shadow-lg transition-all duration-500 ${
              isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
            }`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                isToggled 
                  ? 'bg-gradient-to-r from-[#4A70A9] to-[#8FABD4]' 
                  : 'bg-gradient-to-r from-[#8FABD4] to-[#4A70A9]'
              }`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
              }`}>Evidence-Based</h3>
              <p className={`${
                isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
              }`}>All our tools and recommendations are based on scientific research and proven methodologies.</p>
            </div>

            <div className={`text-center p-8 rounded-2xl shadow-lg transition-all duration-500 ${
              isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
            }`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                isToggled 
                  ? 'bg-gradient-to-r from-[#4A70A9] to-[#8FABD4]' 
                  : 'bg-gradient-to-r from-[#8FABD4] to-[#4A70A9]'
              }`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
              }`}>Community Support</h3>
              <p className={`${
                isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
              }`}>Connect with peers and professionals who understand your journey and challenges.</p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className={`p-12 rounded-2xl shadow-lg mb-16 ${
          isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
        }`}>
          <h2 className={`text-3xl font-bold mb-8 text-center transition-all duration-500 ${
            isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
          }`}>Making a Difference</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className={`text-4xl font-bold mb-2 ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
              }`}>10,000+</div>
              <div className={`text-sm font-medium ${
                isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
              }`}>Students Supported</div>
            </div>
            <div>
              <div className={`text-4xl font-bold mb-2 ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
              }`}>500+</div>
              <div className={`text-sm font-medium ${
                isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
              }`}>Licensed Mentors</div>
            </div>
            <div>
              <div className={`text-4xl font-bold mb-2 ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
              }`}>95%</div>
              <div className={`text-sm font-medium ${
                isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
              }`}>Satisfaction Rate</div>
            </div>
            <div>
              <div className={`text-4xl font-bold mb-2 ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
              }`}>24/7</div>
              <div className={`text-sm font-medium ${
                isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
              }`}>Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;