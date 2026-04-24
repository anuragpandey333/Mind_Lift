import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = ({ isToggled }) => {
  const navigate = useNavigate();
  return (
    <footer className={`transition-all duration-500 border-t ${
      isToggled 
        ? 'bg-[#000000]/95 border-[#BCCCDC]/20' 
        : 'bg-[#F8FAFC]/95 border-[#D9EAFD]/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isToggled 
                  ? 'bg-gradient-to-r from-[#BCCCDC] to-[#D9EAFD]' 
                  : 'bg-gradient-to-r from-[#D9EAFD] to-[#BCCCDC]'
              }`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className={`text-2xl font-bold bg-clip-text text-transparent ${
                isToggled 
                  ? 'bg-gradient-to-r from-[#D9EAFD] to-[#BCCCDC]' 
                  : 'bg-gradient-to-r from-[#BCCCDC] to-[#D9EAFD]'
              }`}>MindLift</h3>
            </div>
            <p className={`text-sm leading-relaxed max-w-md ${
              isToggled ? 'text-[#D9EAFD]/80' : 'text-[#000000]'
            }`}>
              Empowering students with comprehensive mental wellness tools for academic and personal success.
            </p>
          </div>
          
          <div>
            <h4 className={`font-semibold mb-4 ${
              isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
            }`}>Platform</h4>
            <ul className="space-y-2">
              <li><a href="#about" className={`text-sm transition-colors ${
                isToggled 
                  ? 'text-[#D9EAFD]/70 hover:text-[#BCCCDC]' 
                  : 'text-[#000000]/60 hover:text-[#D9EAFD]'
              }`}>About</a></li>
              <li><a href="#features" className={`text-sm transition-colors ${
                isToggled 
                  ? 'text-[#F8FAFC]/70 hover:text-[#D9EAFD]' 
                  : 'text-gray-600 hover:text-[#687FE5]'
              }`}>Features</a></li>
              <li><a href="#testimonials" className={`text-sm transition-colors ${
                isToggled 
                  ? 'text-[#F8FAFC]/70 hover:text-[#D9EAFD]' 
                  : 'text-gray-600 hover:text-[#687FE5]'
              }`}>Testimonials</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className={`font-semibold mb-4 ${
              isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
            }`}>Support</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('/login')} className={`text-sm transition-colors text-left ${
                isToggled 
                  ? 'text-[#F8FAFC]/70 hover:text-[#D9EAFD]' 
                  : 'text-gray-600 hover:text-[#687FE5]'
              }`}>Sign In</button></li>
              <li><button onClick={() => navigate('/signup')} className={`text-sm transition-colors text-left ${
                isToggled 
                  ? 'text-[#F8FAFC]/70 hover:text-[#D9EAFD]' 
                  : 'text-gray-600 hover:text-[#687FE5]'
              }`}>Sign Up</button></li>
              <li><button onClick={() => navigate('/dashboard')} className={`text-sm transition-colors text-left ${
                isToggled 
                  ? 'text-[#F8FAFC]/70 hover:text-[#D9EAFD]' 
                  : 'text-gray-600 hover:text-[#687FE5]'
              }`}>Dashboard</button></li>
            </ul>
          </div>
        </div>
        
        <div className={`mt-8 pt-8 border-t text-center ${
          isToggled ? 'border-[#BCCCDC]/20' : 'border-[#687FE5]/20'
        }`}>
          <p className={`text-sm ${
            isToggled ? 'text-[#D9EAFD]/60' : 'text-[#000000]/60'
          }`}>
            © 2024 MindLift. All rights reserved. Built with ❤️ for student wellness.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;