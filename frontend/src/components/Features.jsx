import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Features = () => {
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

  const features = [
    {
      title: "Mood Tracker",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      description: "Track your daily emotions and mental state with detailed insights and analytics.",
      details: "Monitor mood patterns, identify triggers, and receive personalized recommendations for emotional well-being."
    },
    {
      title: "Mentorship",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      description: "Connect with verified mental health mentors and peer support.",
      details: "Book one-on-one sessions, join group discussions, and access 24/7 crisis support from licensed professionals."
    },
    {
      title: "Fitness Tracker",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: "Monitor your physical wellness and activities for better mental health.",
      details: "Track workouts, steps, water intake, and receive fitness suggestions tailored to reduce stress and anxiety."
    },
    {
      title: "Diet Planner",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
        </svg>
      ),
      description: "Personalized nutrition plans for better mental health and focus.",
      details: "Get meal recommendations, track nutrition, and learn about foods that boost mood and cognitive function."
    },
    {
      title: "Scheduler",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      description: "Organize tasks and manage your daily routine effectively.",
      details: "Create to-do lists, set reminders, plan study schedules, and maintain work-life balance."
    },
    {
      title: "AI Chatbot",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      description: "24/7 AI support for mental wellness guidance and motivation.",
      details: "Get instant support, coping strategies, mindfulness exercises, and personalized wellness recommendations."
    }
  ];

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
          }`}>Platform Features</h1>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto transition-all duration-500 ${
            isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
          }`}>
            Comprehensive tools designed specifically for student mental wellness and productivity
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl shadow-lg border transition-all duration-500 hover:scale-105 ${
                isToggled 
                  ? 'bg-[#000000]/60 border-[#8FABD4]/20' 
                  : 'bg-white/90 border-[#8FABD4]/10'
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                isToggled 
                  ? 'bg-gradient-to-r from-[#4A70A9] to-[#8FABD4]' 
                  : 'bg-gradient-to-r from-[#8FABD4] to-[#4A70A9]'
              }`}>
                {feature.icon}
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
              }`}>{feature.title}</h3>
              <p className={`text-lg mb-4 ${
                isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
              }`}>{feature.description}</p>
              <p className={`text-sm mb-6 ${
                isToggled ? 'text-[#8FABD4]/60' : 'text-[#000000]/60'
              }`}>{feature.details}</p>
              <button 
                onClick={() => {
                  if (feature.title === 'AI Chatbot') navigate('/ai')
                  else if (feature.title === 'Scheduler') navigate('/scheduler')
                  else if (feature.title === 'Diet Planner') navigate('/diet')
                  else if (feature.title === 'Fitness Tracker') navigate('/fitness')
                  else if (feature.title === 'Mood Tracker') navigate('/mood')
                  else if (feature.title === 'Mentorship') navigate('/mentorship')
                  else navigate('/login')
                }}
                className={`w-full text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                  isToggled 
                    ? 'bg-gradient-to-r from-[#4A70A9] to-[#8FABD4] text-white' 
                    : 'bg-gradient-to-r from-[#8FABD4] to-[#4A70A9] text-white'
                }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;