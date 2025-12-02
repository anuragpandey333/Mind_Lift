import axios from 'axios'
import React, { useState, useRef, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

function Ai() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isToggled, setIsToggled] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const API_KEY = "AIzaSyASM5L5YLusC7y-kVnl1NlgHL_KEyagK-g"

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    setIsToggled(theme === 'dark')
  }, [])

  useEffect(() => {
    scrollToBottom()
    if (messages.length === 0) {
      inputRef.current?.focus()
    }
  }, [messages])

  const toggleTheme = () => {
    const newTheme = !isToggled
    setIsToggled(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  async function handleSendMessage() {
    if (!inputMessage.trim()) return
    
    const userMessage = inputMessage.trim()
    setMessages(prev => [...prev, { text: userMessage, isUser: true, id: Date.now() }])
    setInputMessage("")
    setIsLoading(true)
    
    try {
      const res = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
        "contents": [{
          "parts": [{ "text": userMessage }]
        }]
      })
      
      const aiResponse = res.data.candidates[0].content.parts[0].text
      setMessages(prev => [...prev, { text: aiResponse, isUser: false, id: Date.now() + 1 }])
    } catch (error) {
      console.error("Error getting AI response:", error)
      setMessages(prev => [...prev, { 
        text: "Sorry, I encountered an error processing your request. Please try again.",
        isUser: false,
        isError: true,
        id: Date.now() + 1
      }])
    } finally {
      setIsLoading(false)
    }
  }

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

      <div className="pt-8 px-4 pb-40 flex flex-col animate-fade-in">
      <div className="w-full max-w-3xl mx-auto flex-grow overflow-hidden">
        <h1 className={`text-2xl md:text-3xl font-bold mb-6 text-center animate-fade-down ${
          isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
        }`}>
          <span className="inline-block mr-2 text-2xl animate-pulse">
            🤖
          </span>
          AI Mental Wellness Assistant
        </h1>
        
        <div className="overflow-y-auto max-h-[calc(100vh-240px)] pr-2 custom-scrollbar">
          {messages.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <div className={`inline-block p-4 rounded-full mb-4 shadow-md text-3xl ${
                isToggled ? 'bg-[#4A70A9]/20' : 'bg-[#8FABD4]/20'
              }`}>
                🤖
              </div>
              <h2 className={`text-lg font-medium mb-2 ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
              }`}>Welcome to AI Mental Wellness Assistant</h2>
              <p className={`max-w-md mx-auto ${
                isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/70'
              }`}>Start a conversation about your mental wellness journey.</p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`p-4 my-3 rounded-lg shadow-md border animate-fade-up ${
                isToggled 
                  ? message.isUser 
                    ? 'bg-[#000000]/60 border-[#8FABD4]/20 border-l-4 border-l-[#8FABD4]'
                    : 'bg-[#4A70A9]/20 border-[#8FABD4]/20 border-l-4 border-l-[#4A70A9]'
                  : message.isUser 
                    ? 'bg-white border-[#8FABD4]/30 border-l-4 border-l-[#8FABD4]'
                    : 'bg-[#8FABD4]/10 border-[#8FABD4]/30 border-l-4 border-l-[#4A70A9]'
              }`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm text-sm ${
                  message.isUser 
                    ? isToggled ? 'bg-[#8FABD4] text-white' : 'bg-[#8FABD4] text-white'
                    : message.isError 
                      ? "bg-red-100 text-red-600"
                      : isToggled ? 'bg-[#4A70A9] text-white' : 'bg-[#4A70A9] text-white'
                }`}>
                  {message.isUser ? '👤' : '🤖'}
                </div>
                <span className={`ml-2 font-medium text-sm ${
                  isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
                }`}>
                  {message.isUser ? "You" : "AI Assistant"}
                </span>
              </div>
              
              {message.isUser ? (
                <p className={`pl-10 ${
                  isToggled ? 'text-[#8FABD4]/90' : 'text-[#000000]/90'
                }`}>{message.text}</p>
              ) : (
                <div className={`pl-10 whitespace-pre-wrap ${
                  isToggled ? 'text-[#8FABD4]/90' : 'text-[#000000]/90'
                }`}>
                  {message.text}
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className={`p-4 my-3 rounded-lg shadow-md border border-l-4 animate-fade-up ${
              isToggled 
                ? 'bg-[#4A70A9]/20 border-[#8FABD4]/20 border-l-[#4A70A9]'
                : 'bg-[#8FABD4]/10 border-[#8FABD4]/30 border-l-[#4A70A9]'
            }`}>
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm text-sm ${
                  isToggled ? 'bg-[#4A70A9] text-white' : 'bg-[#4A70A9] text-white'
                }`}>
                  🤖
                </div>
                <span className={`ml-2 font-medium text-sm ${
                  isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
                }`}>AI Assistant</span>
              </div>
              <div className="pl-10 flex items-center">
                <div className={`animate-spin text-lg ${
                  isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
                }`}>⟳</div>
                <span className={`ml-2 ${
                  isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/70'
                }`}>Thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4 animate-fade-up">
        <div className={`rounded-2xl shadow-lg border p-3 flex items-center space-x-3 transition-all duration-300 hover:shadow-xl ${
          isToggled 
            ? 'bg-[#000000]/80 border-[#8FABD4]/20'
            : 'bg-white border-[#8FABD4]/30'
        }`}>
          <input
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className={`flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
              isToggled 
                ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] placeholder-[#8FABD4]/60 focus:ring-[#4A70A9]'
                : 'bg-white border-[#8FABD4]/30 text-[#000000] placeholder-gray-500 focus:ring-[#8FABD4]'
            }`}
            type="text"
            placeholder="Ask about your mental wellness..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
          />
          <button
            className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-2 text-white ${
              inputMessage.trim() 
                ? isToggled 
                  ? 'bg-gradient-to-r from-[#4A70A9] to-[#8FABD4] hover:shadow-lg'
                  : 'bg-gradient-to-r from-[#8FABD4] to-[#4A70A9] hover:shadow-lg'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
          >
            {isLoading ? (
              <div className="animate-spin text-lg">⟳</div>
            ) : (
              <div className="animate-pulse-subtle text-lg">➤</div>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-fade-down {
          animation: fade-down 0.5s ease-out;
        }
        
        .animate-fade-up {
          animation: fade-up 0.5s ease-out;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-pulse-subtle {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F5EFFF;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #CDC1FF;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #818cf8;
        }
      `}</style>
    </div>
  )
}

export default Ai