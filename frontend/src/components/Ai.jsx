import axios from 'axios'
import React, { useState, useRef, useEffect } from 'react'

function Ai() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const API_KEY = "AIzaSyCppnWyhnspJ4PkUi2_vhLbajj6XjqttVc"

  // Add mental wellness context to prompts
  const createContextualPrompt = (userMessage) => {
    return `You are a helpful AI assistant. Please provide a clear, informative, and helpful response to the following question: ${userMessage}`
  }

  useEffect(() => {
    scrollToBottom()
    if (messages.length === 0) {
      inputRef.current?.focus()
    }
  }, [messages])

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
      const contextualPrompt = createContextualPrompt(userMessage)
      const res = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
        "contents": [{
          "parts": [{ "text": contextualPrompt }]
        }]
      })
      
      const aiResponse = res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response. Please try again."
      setMessages(prev => [...prev, { text: aiResponse, isUser: false, id: Date.now() + 1 }])
    } catch (error) {
      console.error("Error getting AI response:", error)
      
      // Fallback responses based on common topics
      const getFallbackResponse = (question) => {
        const q = question.toLowerCase()
        if (q.includes('hello') || q.includes('hi')) {
          return "Hello! I'm here to help you with any questions you have. How can I assist you today?"
        }
        if (q.includes('how are you')) {
          return "I'm doing well, thank you for asking! I'm here and ready to help you with whatever you need."
        }
        if (q.includes('what') && q.includes('do')) {
          return "I'm an AI assistant designed to help answer your questions and provide information on a wide variety of topics. Feel free to ask me anything!"
        }
        return "I'm having trouble connecting to my AI service right now, but I'm still here to help! Could you try rephrasing your question, or ask me something else?"
      }
      
      const fallbackResponse = getFallbackResponse(userMessage)
      setMessages(prev => [...prev, { 
        text: fallbackResponse,
        isUser: false,
        id: Date.now() + 1
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-white px-4 pb-40 flex flex-col animate-fade-in">
      <div className="w-full max-w-3xl mx-auto flex-grow overflow-hidden">
        <h1 className="text-2xl md:text-3xl font-bold text-[#818cf8] mb-6 text-center animate-fade-down">
          <span className="inline-block mr-2 text-2xl animate-pulse">
            🤖
          </span>
          Chat with AI Assistant
        </h1>
        
        <div className="overflow-y-auto max-h-[calc(100vh-240px)] pr-2 custom-scrollbar">
          {messages.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <div className="bg-[#F5EFFF] inline-block p-4 rounded-full mb-4 shadow-md text-3xl">
                🤖
              </div>
              <h2 className="text-lg font-medium text-gray-700 mb-2">Welcome to AI Assistant</h2>
              <p className="text-gray-500 max-w-md mx-auto">Start a conversation by typing a message below.</p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`p-4 my-3 rounded-lg shadow-md border border-[#E5D9F2] animate-fade-up`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both',
                backgroundColor: message.isUser ? 'white' : '#F5EFFF',
                borderLeftWidth: 4,
                borderLeftColor: message.isUser ? '#CDC1FF' : '#818cf8'
              }}
            >
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm text-sm ${
                  message.isUser 
                    ? "bg-[#CDC1FF] text-white" 
                    : message.isError 
                      ? "bg-red-100 text-red-600"
                      : "bg-[#818cf8] text-white"
                }`}>
                  {message.isUser ? '👤' : '🤖'}
                </div>
                <span className="ml-2 font-medium text-sm text-gray-700">
                  {message.isUser ? "You" : "AI Assistant"}
                </span>
              </div>
              
              {message.isUser ? (
                <p className="text-gray-700 pl-10">{message.text}</p>
              ) : (
                <div className="pl-10 whitespace-pre-wrap text-gray-700">
                  {message.text}
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="p-4 my-3 rounded-lg shadow-md border border-[#E5D9F2] bg-[#F5EFFF] border-l-4 border-l-[#818cf8] animate-fade-up">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#818cf8] text-white shadow-sm text-sm">
                  🤖
                </div>
                <span className="ml-2 font-medium text-sm text-gray-700">AI Assistant</span>
              </div>
              <div className="pl-10 flex items-center">
                <div className="animate-spin text-lg text-[#818cf8]">⟳</div>
                <span className="ml-2 text-gray-600">Thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4 animate-fade-up">
        <div className="bg-white rounded-2xl shadow-lg border border-[#E5D9F2] p-3 flex items-center space-x-3 transition-all duration-300 hover:shadow-xl">
          <input
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-3 text-black placeholder-gray-500 rounded-xl border border-[#E5D9F2] focus:outline-none focus:ring-2 focus:ring-[#CDC1FF] transition-all duration-200"
            type="text"
            placeholder="Ask something..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
          />
          <button
            className={`${
              inputMessage.trim() ? "bg-[#CDC1FF] hover:bg-[#818cf8]" : "bg-gray-200 cursor-not-allowed"
            } text-white px-5 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-2`}
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