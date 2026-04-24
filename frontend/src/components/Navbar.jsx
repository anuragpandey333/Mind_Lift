import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isToggled, toggleTheme, isAuthenticated }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={`backdrop-blur-md shadow-lg border-b transition-all duration-500 fixed w-full top-0 z-50 ${
      isToggled 
        ? 'bg-[#000000]/95 border-[#BCCCDC]/30' 
        : 'bg-[#F8FAFC]/95 border-[#D9EAFD]/20'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleTheme}
              className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-110 ${
                isToggled 
                  ? 'from-[#4A70A9] to-[#5A6F8C] rotate-180' 
                  : 'from-[#4A70A9] to-[#5A6F8C] rotate-0'
              }`}
            >
              <svg className={`w-7 h-7 text-white transition-all duration-500 ${
                isToggled ? 'rotate-45 scale-110' : 'rotate-0 scale-100'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
            <h1 className={`text-2xl sm:text-3xl font-semibold bg-clip-text text-transparent tracking-wider transition-all duration-500 ${
              isToggled 
                ? 'bg-gradient-to-r from-[#4A70A9] via-[#5A6F8C] to-[#4A70A9]' 
                : 'bg-gradient-to-r from-[#4A70A9] via-[#5A6F8C] to-[#4A70A9]'
            }`}>MindLift</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => navigate('/about')} className={`font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 ${
              isToggled 
                ? 'text-[#9AA6B2] hover:text-[#4A70A9]' 
                : 'text-[#4A70A9] hover:text-[#5A6F8C]'
            }`}>About</button>
            <button onClick={() => navigate('/features')} className={`font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 ${
              isToggled 
                ? 'text-[#9AA6B2] hover:text-[#4A70A9]' 
                : 'text-[#4A70A9] hover:text-[#5A6F8C]'
            }`}>Features</button>
            <button onClick={() => navigate('/contact')} className={`font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 ${
              isToggled 
                ? 'text-[#9AA6B2] hover:text-[#4A70A9]' 
                : 'text-[#4A70A9] hover:text-[#5A6F8C]'
            }`}>Contact</button>
          </div>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isToggled 
                ? 'text-gray-300 hover:bg-purple-900/30' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className={`text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  isToggled 
                    ? 'bg-[#4A70A9] hover:bg-[#4A70A9]/90' 
                    : 'bg-[#4A70A9] hover:bg-[#5A6F8C]'
                }`}
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className={`font-semibold text-sm tracking-wide transition-all duration-300 px-4 py-2 rounded-full border ${
                    isToggled 
                      ? 'text-[#9AA6B2] hover:text-white border-[#4A70A9] hover:bg-[#4A70A9]' 
                      : 'text-[#4A70A9] hover:text-white hover:bg-[#4A70A9] border-[#4A70A9]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className={`text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
                    isToggled 
                      ? 'bg-[#4A70A9] hover:bg-[#5A6F8C]' 
                      : 'bg-[#4A70A9] hover:bg-[#5A6F8C]'
                  }`}
                >
                   Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className={`md:hidden border-t transition-all duration-300 ${
          isToggled 
            ? 'bg-slate-800/90 border-purple-500/30' 
            : 'bg-white/90 border-gray-200'
        }`}>
          <div className="px-6 py-4 space-y-4">
            <button onClick={() => { navigate('/about'); setIsMobileMenuOpen(false); }} className={`block font-medium transition-colors ${
              isToggled 
                ? 'text-[#9AA6B2] hover:text-[#4A70A9]' 
                : 'text-[#4A70A9] hover:text-[#5A6F8C]'
            }`}>About</button>
            <button onClick={() => { navigate('/features'); setIsMobileMenuOpen(false); }} className={`block font-medium transition-colors ${
              isToggled 
                ? 'text-[#9AA6B2] hover:text-[#4A70A9]' 
                : 'text-[#4A70A9] hover:text-[#5A6F8C]'
            }`}>Features</button>
            <button onClick={() => { navigate('/contact'); setIsMobileMenuOpen(false); }} className={`block font-medium transition-colors ${
              isToggled 
                ? 'text-[#9AA6B2] hover:text-[#4A70A9]' 
                : 'text-[#4A70A9] hover:text-[#5A6F8C]'
            }`}>Contact</button>
            
            <div className="pt-4 space-y-3">
              {isAuthenticated ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className={`w-full text-white py-3 rounded-full font-medium shadow-md transition-all duration-300 ${
                    isToggled 
                      ? 'bg-[#4A70A9] hover:bg-[#5A6F8C]' 
                      : 'bg-[#4A70A9] hover:bg-[#5A6F8C]'
                  }`}
                >
                  Dashboard
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className={`w-full font-medium py-3 rounded-full transition-all duration-300 border ${
                      isToggled 
                        ? 'text-[#9AA6B2] border-[#4A70A9] hover:bg-[#4A70A9] hover:text-white' 
                        : 'text-[#4A70A9] hover:bg-[#4A70A9]/10 border-[#4A70A9]'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className={`w-full text-white py-3 rounded-full font-medium shadow-md transition-all duration-300 ${
                      isToggled 
                        ? 'bg-[#4A70A9] hover:bg-[#5A6F8C]' 
                        : 'bg-[#4A70A9] hover:bg-[#5A6F8C]'
                    }`}
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;