import axios from 'axios'
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../useTheme'

const API_KEY = "AIzaSyBFPyxs7mwID2ANscz-vKfH8eYl9rcH4fY"

const getLocalResponse = (userMessage) => {
  const q = userMessage.toLowerCase()

  if (q.includes('hello') || q.includes('hi') || q.includes('hey'))
    return "Hello! 👋 I'm your AI Assistant. How can I help you today?"

  if (q.includes('how are you'))
    return "I'm doing great, thank you! I'm here to help you with anything. 😊"

  if (q.includes('joke'))
    return "Why do programmers prefer dark mode? 😄\n\nBecause light attracts bugs! 🐛"

  if (q.includes('dsa') || q.includes('data structure') || q.includes('algorithm'))
    return "DSA (Data Structures & Algorithms) covers:\n\n• Arrays, Linked Lists, Stacks, Queues\n• Trees (Binary, BST, AVL)\n• Graphs (BFS, DFS)\n• Sorting: Bubble, Merge, Quick Sort\n• Dynamic Programming\n• Hash Tables\n\nStart with arrays and linked lists, then move to trees and graphs. Practice on LeetCode!"

  if (q.includes('react'))
    return "React key concepts:\n\n• Components (functional & class)\n• JSX syntax\n• Props & State\n• Hooks (useState, useEffect, useContext)\n• React Router for navigation\n• Context API for state management\n\nBuild small projects to practice!"

  if (q.includes('javascript') || q.includes(' js '))
    return "JavaScript key concepts:\n\n• Variables: var, let, const\n• Functions & Arrow functions\n• Promises & Async/Await\n• DOM manipulation\n• ES6+ features (destructuring, spread)\n• Closures & Prototypes\n\nPractice on freeCodeCamp or JavaScript.info!"

  if (q.includes('python'))
    return "Python key topics:\n\n• Variables, loops, functions\n• Lists, tuples, dictionaries\n• OOP (classes, inheritance)\n• File handling\n• Libraries: NumPy, Pandas, Flask\n\nStart with Python.org tutorials!"

  if (q.includes('stress') || q.includes('anxiety') || q.includes('mental health') || q.includes('burnout'))
    return "I hear you. Mental wellness matters! 💙\n\nHelpful strategies:\n• Deep breathing (4-7-8 technique)\n• Break tasks into smaller steps\n• Pomodoro: 25 min work, 5 min break\n• Regular exercise and sleep\n• Talk to someone you trust\n• Limit social media\n\nYou're doing great! 🌟"

  if (q.includes('study') || q.includes('exam') || q.includes('learn'))
    return "Proven study strategies:\n\n• Active recall over passive reading\n• Spaced repetition (review after 1, 3, 7 days)\n• Pomodoro technique\n• Teach concepts to others\n• Practice with past papers\n• Stay consistent - daily beats cramming\n\nYou've got this! 💪"

  if (q.includes('sleep'))
    return "Tips for better sleep:\n\n• Maintain a consistent sleep schedule\n• Avoid screens 1 hour before bed\n• Keep your room cool and dark\n• Limit caffeine after 2 PM\n• Try deep breathing before sleep\n• Aim for 7-9 hours per night"

  if (q.includes('fitness') || q.includes('exercise') || q.includes('workout'))
    return "Fitness tips:\n\n• Start with 30 min of exercise daily\n• Mix cardio and strength training\n• Stay hydrated (8 glasses/day)\n• Warm up before and cool down after\n• Rest days are important for recovery\n• Track your progress for motivation"

  if (q.includes('diet') || q.includes('food') || q.includes('nutrition'))
    return "Healthy eating tips:\n\n• Eat balanced meals (protein, carbs, fats)\n• Include fruits and vegetables daily\n• Avoid processed foods\n• Don't skip breakfast\n• Eat smaller, frequent meals\n• Stay hydrated throughout the day"

  if (q.includes('thank'))
    return "You're welcome! 😊 Feel free to ask anything else!"

  if (q.includes('bye') || q.includes('goodbye'))
    return "Goodbye! Take care and come back anytime! 👋"

  if (q.includes('what is') || q.includes('explain') || q.includes('define')) {
    const topic = userMessage.replace(/what is|explain|define/gi, '').trim()
    return `Here's an overview of "${topic}":\n\n• This is an important concept worth understanding deeply\n• Start with official documentation or tutorials\n• Practice with hands-on examples\n• Join communities like Reddit or Discord for help\n\nWould you like more specific information about ${topic}?`
  }

  if (q.includes('how to') || q.includes('how do')) {
    const task = userMessage.replace(/how to|how do i|how do you/gi, '').trim()
    return `Here's how to ${task}:\n\n1. Understand the basics first\n2. Break it into smaller steps\n3. Find good resources (docs, tutorials)\n4. Practice with real examples\n5. Review and improve\n\nWant me to go deeper on any specific step?`
  }

  return `You asked: "${userMessage}"\n\nHere's what I can suggest:\n• Break your question into smaller parts\n• Search for official documentation\n• Try hands-on practice\n• Ask more specific questions for better answers\n\nFeel free to ask me about coding, health, study tips, or anything else! 😊`
}

function Ai() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const { isToggled } = useTheme()
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Theme colors
  const bg = isToggled ? '#0f1117' : '#F8FAFC'
  const sidebar = isToggled ? '#1a1d27' : '#F8FAFC'
  const border = isToggled ? '#2a2d3a' : '#BCCCDC'
  const text = isToggled ? '#e2e8f0' : '#1a202c'
  const subtext = isToggled ? '#94a3b8' : '#9AA6B2'
  const hover = isToggled ? '#252836' : '#D9EAFD'
  const activeColor = isToggled ? '#3b82f6' : '#BCCCDC'

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token')
      if (!token) { navigate('/login'); return }
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        })
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
          localStorage.setItem('user', JSON.stringify(data.user))
        }
      } catch {
        const storedUser = localStorage.getItem('user')
        if (storedUser) setUser(JSON.parse(storedUser))
      }
    }
    fetchUserData()
  }, [navigate])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  async function handleSendMessage() {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = inputMessage.trim()
    const updatedMessages = [...messages, { text: userMessage, isUser: true, id: Date.now() }]
    setMessages(updatedMessages)
    setInputMessage("")
    setIsLoading(true)

    const contents = updatedMessages.map((msg) => ({
      role: msg.isUser ? "user" : "model",
      parts: [{ text: msg.text }],
    }))

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        { contents },
        { headers: { 'Content-Type': 'application/json' } }
      )
      const aiResponse = res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response."
      setMessages((prev) => [...prev, { text: aiResponse, isUser: false, id: Date.now() + 1 }])
    } catch {
      const localResponse = getLocalResponse(userMessage)
      setMessages((prev) => [...prev, { text: localResponse, isUser: false, id: Date.now() + 1 }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: bg, color: text }}>
      {/* Top Bar - Same as Dashboard */}
      <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: sidebar, borderBottom: `1px solid ${border}` }}>
        <div>
          <h1 className="text-lg font-bold" style={{ color: text }}>
            Welcome back, {user?.name?.split(' ')[0] || 'Friend'}!
          </h1>
          <p className="text-xs" style={{ color: subtext }}>Ready to continue your wellness journey?</p>
        </div>
        <button onClick={() => navigate('/profile')} className="flex items-center gap-2 px-3 py-2 rounded-xl transition-colors" style={{ background: hover }}>
          {user?.profilePhoto ? (
            <img src={user.profilePhoto} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: activeColor }}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
          <span className="text-sm font-medium hidden sm:block" style={{ color: text }}>{user?.name || 'Profile'}</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto">
      <div className="h-full flex flex-col" style={{ background: bg }}>
      <div className="w-full max-w-3xl mx-auto flex flex-col flex-1 overflow-hidden px-4 pt-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#9AA6B2] mb-6 text-center flex-shrink-0">
          AI Assistant
        </h1>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {messages.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-[#D9EAFD] inline-block p-4 rounded-full mb-4 shadow-md">
                <svg className="w-12 h-12 text-[#9AA6B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-medium text-gray-700 mb-2">Welcome to AI Assistant</h2>
              <p className="text-gray-500 max-w-md mx-auto">Ask me anything — coding, health, study tips, or just chat!</p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className="p-4 my-3 rounded-lg shadow-md border border-[#BCCCDC]"
              style={{
                backgroundColor: message.isUser ? 'white' : '#F5EFFF',
                borderLeftWidth: 4,
                borderLeftColor: message.isUser ? '#CDC1FF' : '#818cf8'
              }}
            >
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${message.isUser ? "bg-[#9AA6B2]" : "bg-[#9AA6B2]"} text-white`}>
                  {message.isUser ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <span className="ml-2 font-medium text-sm text-gray-700">
                  {message.isUser ? "You" : "AI Assistant"}
                </span>
              </div>
              <div className="pl-10 whitespace-pre-wrap text-gray-700">{message.text}</div>
            </div>
          ))}

          {isLoading && (
            <div className="p-4 my-3 rounded-lg shadow-md border border-[#BCCCDC] bg-[#F6F4E8]"
              style={{ borderLeftWidth: 4, borderLeftColor: '#818cf8' }}>
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#9AA6B2] text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="ml-2 font-medium text-sm text-gray-700">AI Assistant</span>
              </div>
              <div className="pl-10 flex items-center gap-1">
                <div className="w-2 h-2 bg-[#9AA6B2] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-[#9AA6B2] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-[#9AA6B2] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}

        <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto px-4 py-3 flex-shrink-0">
        <div className="bg-[#F8FAFC] rounded-2xl shadow-lg border border-[#BCCCDC] p-3 flex items-center space-x-3">
          <input
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-3 text-black placeholder-gray-500 rounded-xl border border-[#BCCCDC] focus:outline-none focus:ring-2 focus:ring-[#9AA6B2]"
            type="text"
            placeholder="Ask something..."
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
            disabled={isLoading}
          />
          <button
            className={`${inputMessage.trim() && !isLoading ? "bg-[#9AA6B2] hover:bg-[#9AA6B2]/80" : "bg-gray-200 cursor-not-allowed"} text-white px-5 py-3 rounded-xl font-medium transition-all duration-200 shadow-md`}
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #F5EFFF; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #CDC1FF; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #818cf8; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce { animation: bounce 0.8s infinite; }
      `}</style>
      </div>
      </main>
    </div>
  )
}

export default Ai