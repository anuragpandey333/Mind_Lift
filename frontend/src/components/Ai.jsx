import axios from 'axios'
import React, { useState, useRef, useEffect } from 'react'

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
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

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
    } catch (error) {
      const localResponse = getLocalResponse(userMessage)
      setMessages((prev) => [...prev, { text: localResponse, isUser: false, id: Date.now() + 1 }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-white px-4 pb-40 flex flex-col">
      <div className="w-full max-w-3xl mx-auto flex-grow overflow-hidden">
        <h1 className="text-2xl md:text-3xl font-bold text-[#818cf8] mb-6 text-center">
          🤖 AI Assistant
        </h1>

        <div className="overflow-y-auto max-h-[calc(100vh-240px)] pr-2 custom-scrollbar">
          {messages.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-[#F5EFFF] inline-block p-4 rounded-full mb-4 shadow-md text-4xl">🤖</div>
              <h2 className="text-lg font-medium text-gray-700 mb-2">Welcome to AI Assistant</h2>
              <p className="text-gray-500 max-w-md mx-auto">Ask me anything — coding, health, study tips, or just chat!</p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className="p-4 my-3 rounded-lg shadow-md border border-[#E5D9F2]"
              style={{
                backgroundColor: message.isUser ? 'white' : '#F5EFFF',
                borderLeftWidth: 4,
                borderLeftColor: message.isUser ? '#CDC1FF' : '#818cf8'
              }}
            >
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm text-sm ${message.isUser ? "bg-[#CDC1FF]" : "bg-[#818cf8]"} text-white`}>
                  {message.isUser ? '👤' : '🤖'}
                </div>
                <span className="ml-2 font-medium text-sm text-gray-700">
                  {message.isUser ? "You" : "AI Assistant"}
                </span>
              </div>
              <div className="pl-10 whitespace-pre-wrap text-gray-700">{message.text}</div>
            </div>
          ))}

          {isLoading && (
            <div className="p-4 my-3 rounded-lg shadow-md border border-[#E5D9F2] bg-[#F5EFFF]"
              style={{ borderLeftWidth: 4, borderLeftColor: '#818cf8' }}>
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#818cf8] text-white text-sm">🤖</div>
                <span className="ml-2 font-medium text-sm text-gray-700">AI Assistant</span>
              </div>
              <div className="pl-10 flex items-center gap-1">
                <div className="w-2 h-2 bg-[#818cf8] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-[#818cf8] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-[#818cf8] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-[#E5D9F2] p-3 flex items-center space-x-3">
          <input
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-3 text-black placeholder-gray-500 rounded-xl border border-[#E5D9F2] focus:outline-none focus:ring-2 focus:ring-[#CDC1FF]"
            type="text"
            placeholder="Ask something..."
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
            disabled={isLoading}
          />
          <button
            className={`${inputMessage.trim() && !isLoading ? "bg-[#818cf8] hover:bg-[#6d75e8]" : "bg-gray-200 cursor-not-allowed"} text-white px-5 py-3 rounded-xl font-medium transition-all duration-200 shadow-md`}
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
          >
            ➤
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
  )
}

export default Ai
