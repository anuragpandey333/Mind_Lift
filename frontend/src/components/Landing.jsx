import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const Landing = () => {
  const navigate = useNavigate();
  const [isToggled, setIsToggled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const theme = localStorage.getItem('theme');
    setIsAuthenticated(!!token);
    setIsToggled(theme === 'dark');
    
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isToggled;
    setIsToggled(newTheme);
    localStorage.setItem('theme', newTheme ? 'brown' : 'light');
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isToggled 
        ? 'bg-[#000000]' 
        : 'bg-[#EFECE3]'
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
                : 'bg-[#EFECE3]/60'
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
              isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
            }`}>
              Elevate Your
              <span className={`block bg-clip-text text-transparent transition-all duration-500 mt-2 ${
                isToggled 
                  ? 'bg-gradient-to-r from-[#8FABD4] via-[#4A70A9] to-[#8FABD4]' 
                  : 'bg-gradient-to-r from-[#4A70A9] via-[#8FABD4] to-[#4A70A9]'
              }`}>
                Mental Wellness
              </span>
            </h1>
            <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed transition-all duration-500 px-4 font-medium ${
              isToggled ? 'text-[#8FABD4]/90' : 'text-[#000000]/80'
            }`}>
              A comprehensive platform designed for students to manage stress, track mood, 
              connect with mentors, and build healthy habits for academic and personal success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <button
                onClick={() => navigate('/signup')}
                className={`text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-base sm:text-lg ${
                  isToggled 
                    ? 'bg-gradient-to-r from-[#4A70A9] to-[#8FABD4]' 
                    : 'bg-gradient-to-r from-[#8FABD4] to-[#4A70A9]'
                }`}
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/login')}
                className={`border-2 px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-base sm:text-lg backdrop-blur-sm ${
                  isToggled 
                    ? 'border-[#4A70A9] text-[#8FABD4] hover:bg-[#4A70A9] hover:text-white bg-white/10' 
                    : 'border-[#4A70A9] text-[#4A70A9] hover:bg-[#4A70A9] hover:text-white bg-white/50'
                }`}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" style={{ scrollMarginTop: '80px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-3xl sm:text-4xl font-bold mb-6 transition-all duration-500 ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
              }`}>Supporting Student Mental Health</h2>
              <p className={`text-lg mb-6 leading-relaxed transition-all duration-500 ${
                isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
              }`}>
                Mental health challenges affect 1 in 4 students. MindLift provides evidence-based tools and resources to help students thrive academically and personally.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isToggled ? 'bg-[#4A70A9]' : 'bg-[#8FABD4]'
                  }`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={`transition-all duration-500 ${
                    isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
                  }`}>24/7 Crisis Support Available</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isToggled ? 'bg-[#4A70A9]' : 'bg-[#8FABD4]'
                  }`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={`transition-all duration-500 ${
                    isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
                  }`}>Licensed Mental Health Professionals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isToggled ? 'bg-[#4A70A9]' : 'bg-[#8FABD4]'
                  }`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={`transition-all duration-500 ${
                    isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
                  }`}>Privacy-First Approach</span>
                </div>
              </div>
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
        </div>

        {/* Features Section */}
        <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative" style={{ scrollMarginTop: '80px' }}>
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 transition-all duration-500 ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
            }`}>Why Choose MindLift?</h2>
            <p className={`text-lg max-w-2xl mx-auto transition-all duration-500 ${
              isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
            }`}>Comprehensive tools designed specifically for student mental wellness</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={`backdrop-blur-sm p-8 rounded-3xl shadow-2xl border transition-all duration-500 ${
              isToggled 
                ? 'bg-[#000000]/80 border-[#8FABD4]/20' 
                : 'bg-white/90 border-[#8FABD4]/10'
            }`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                isToggled 
                  ? 'bg-gradient-to-r from-[#4A70A9] to-[#8FABD4]' 
                  : 'bg-gradient-to-r from-[#8FABD4] to-[#4A70A9]'
              }`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-4 transition-all duration-300 ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
              }`}>Mood Tracking</h3>
              <p className={`transition-all duration-300 ${
                isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
              }`}>Monitor your emotional well-being with daily mood logs and insights.</p>
            </div>

            <div className={`backdrop-blur-sm p-8 rounded-3xl shadow-2xl border transition-all duration-500 ${
              isToggled 
                ? 'bg-[#000000]/80 border-[#8FABD4]/20' 
                : 'bg-white/90 border-[#8FABD4]/10'
            }`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                isToggled 
                  ? 'bg-gradient-to-r from-[#4A70A9] to-[#8FABD4]' 
                  : 'bg-gradient-to-r from-[#8FABD4] to-[#4A70A9]'
              }`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-4 transition-all duration-300 ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
              }`}>Expert Mentorship</h3>
              <p className={`transition-all duration-300 ${
                isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
              }`}>Connect with verified mental health professionals and peer mentors.</p>
            </div>

            <div className={`backdrop-blur-sm p-8 rounded-3xl shadow-2xl border transition-all duration-500 ${
              isToggled 
                ? 'bg-[#000000]/80 border-[#8FABD4]/20' 
                : 'bg-white/90 border-[#8FABD4]/10'
            }`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                isToggled 
                  ? 'bg-gradient-to-r from-[#4A70A9] to-[#8FABD4]' 
                  : 'bg-gradient-to-r from-[#8FABD4] to-[#4A70A9]'
              }`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-4 transition-all duration-300 ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
              }`}>Wellness Tools</h3>
              <p className={`transition-all duration-300 ${
                isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
              }`}>Comprehensive fitness tracking, diet planning, and productivity tools.</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" style={{ scrollMarginTop: '80px' }}>
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 transition-all duration-500 ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
            }`}>What Students Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-3xl shadow-2xl border transition-all duration-500 ${
              isToggled 
                ? 'bg-[#000000]/80 border-[#8FABD4]/20' 
                : 'bg-white/90 border-[#8FABD4]/10'
            }`}>
              <div className="flex items-center mb-6">
                <img 
                  src="./Photo1.png" 
                  alt="Student testimonial" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className={`font-bold ${
                    isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
                  }`}>Mayank Yadav</h4>
                  <p className={`text-sm ${
                    isToggled ? 'text-[#8FABD4]/70' : 'text-[#000000]/60'
                  }`}>Psychology Major</p>
                </div>
              </div>
              <p className={`text-lg leading-relaxed ${
                isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
              }`}>
                "MindLift helped me manage my anxiety during final exam week. The mood tracking feature made me more aware of my mental state."
              </p>
            </div>

            <div className={`p-8 rounded-3xl shadow-2xl border transition-all duration-500 ${
              isToggled 
                ? 'bg-[#000000]/80 border-[#8FABD4]/20' 
                : 'bg-white/90 border-[#8FABD4]/10'
            }`}>
              <div className="flex items-center mb-6">
                <img 
                  src="photo.png" 
                  alt="Student testimonial" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className={`font-bold ${
                    isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
                  }`}>Dhruv Kumar</h4>
                  <p className={`text-sm ${
                    isToggled ? 'text-[#8FABD4]/70' : 'text-[#000000]/60'
                  }`}>Engineering Student</p>
                </div>
              </div>
              <p className={`text-lg leading-relaxed ${
                isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
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