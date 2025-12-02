import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Mentorship = () => {
  const navigate = useNavigate()
  const [isToggled, setIsToggled] = useState(false)
  const [activeTab, setActiveTab] = useState('mentors')
  const [selectedMentor, setSelectedMentor] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterDomain, setFilterDomain] = useState('all')
  const [mentorRequests, setMentorRequests] = useState([])
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [showAddMentorForm, setShowAddMentorForm] = useState(false)
  const [customMentors, setCustomMentors] = useState([])
  const [requestData, setRequestData] = useState({
    name: '',
    year: '',
    issue: '',
    description: ''
  })
  const [newMentorData, setNewMentorData] = useState({
    name: '',
    role: '',
    company: '',
    domain: '',
    experience: '',
    specialization: '',
    availability: '',
    bio: '',
    email: '',
    phone: '',
    linkedin: ''
  })

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    const savedCustomMentors = localStorage.getItem('customMentors')
    setIsToggled(theme === 'dark')
    setCustomMentors(savedCustomMentors ? JSON.parse(savedCustomMentors) : [])
    
    // Track mentorship page visit
    const activity = {
      id: Date.now(),
      type: 'mentorship',
      action: 'Visited Mentorship Hub',
      timestamp: new Date().toLocaleString(),
      icon: 'mentorship'
    }
    
    const existingActivities = JSON.parse(localStorage.getItem('recentActivities') || '[]')
    const updatedActivities = [activity, ...existingActivities.slice(0, 4)]
    localStorage.setItem('recentActivities', JSON.stringify(updatedActivities))
  }, [])

  const addCustomMentor = () => {
    if (!newMentorData.name || !newMentorData.role || !newMentorData.email) {
      alert('Please fill required fields (Name, Role, Email)')
      return
    }

    const mentor = {
      id: Date.now(),
      name: newMentorData.name,
      role: newMentorData.role,
      company: newMentorData.company || 'Not specified',
      domain: newMentorData.domain || 'General',
      experience: newMentorData.experience || '0 years',
      specialization: newMentorData.specialization ? newMentorData.specialization.split(',').map(s => s.trim()) : ['General Guidance'],
      availability: newMentorData.availability || 'Flexible',
      rating: 0,
      sessions: 0,
      image: '👤',
      bio: newMentorData.bio || 'Personal mentor added by student.',
      focus: ['Personal Mentor'],
      contact: {
        email: newMentorData.email,
        phone: newMentorData.phone || 'Not provided',
        linkedin: newMentorData.linkedin || 'Not provided'
      },
      isCustom: true
    }

    const updatedCustomMentors = [...customMentors, mentor]
    setCustomMentors(updatedCustomMentors)
    localStorage.setItem('customMentors', JSON.stringify(updatedCustomMentors))
    setNewMentorData({
      name: '', role: '', company: '', domain: '', experience: '', specialization: '',
      availability: '', bio: '', email: '', phone: '', linkedin: ''
    })
    setShowAddMentorForm(false)
  }

  const mentors = [
    {
      id: 1,
      name: 'Dhruv Kumar',
      role: 'Senior Software Engineer',
      company: 'Google',
      domain: 'Computer Science',
      experience: '8 years',
      specialization: ['DSA', 'System Design', 'Career Guidance'],
      availability: 'Weekends',
      rating: 4.9,
      sessions: 127,
      image: '👨',
      bio: 'Graduated from IIT Delhi. Passionate about helping students navigate technical interviews and career decisions.',
      focus: ['Placements', 'Coding', 'Career'],
      contact: { email: 'dhruv.kumar@gmail.com', phone: '+91-9876543210', linkedin: 'linkedin.com/in/dhruvkumar' }
    },
    {
      id: 2,
      name: 'Khushi Mehta',
      role: 'Machine Learning Engineer',
      company: 'Microsoft',
      domain: 'AI/ML',
      experience: '6 years',
      specialization: ['Python', 'ML Projects', 'Research Guidance'],
      availability: 'Weekday Evenings',
      rating: 4.8,
      sessions: 95,
      image: '👩',
      bio: 'Specialized in helping students with ML projects and research papers. Published 10+ papers.',
      focus: ['Projects', 'Research', 'ML'],
      contact: { email: 'khushi.mehta@outlook.com', phone: '+91-9876543323', linkedin: 'linkedin.com/in/khushimehta' }
    },
    {
      id: 3,
      name: 'Rohit ',
      role: 'Product Manager',
      company: 'Amazon',
      domain: 'Product Management',
      experience: '10 years',
      specialization: ['Product Strategy', 'Internships', 'Entrepreneurship'],
      availability: 'Flexible',
      rating: 4.7,
      sessions: 84,
      image: '👨',
      bio: 'From B.Tech to PM. Help students understand different career paths beyond coding.',
      focus: ['Career Switch', 'PM Role', 'Strategy'],
      contact: { email: 'rohit.patel@amazon.com', phone: '+91 94680 52731', linkedin: 'linkedin.com/in/rohitpatel' }
    },
    {
      id: 4,
      name: 'Naman',
      role: 'Assistant Professor',
      company: 'IIT Bombay',
      domain: 'Electronics',
      experience: '12 years',
      specialization: ['Core Subjects', 'GATE Prep', 'Higher Studies'],
      availability: 'Weekends',
      rating: 4.9,
      sessions: 156,
      image: '👨',
      bio: 'Helping students with academic struggles and guiding towards higher education paths.',
      focus: ['Academics', 'GATE', 'MS/PhD'],
      contact: { email: 'naman.reddy@iitb.ac.in', phone: '+918569971000', linkedin: 'linkedin.com/in/namanreddy' }
    },
    {
      id: 5,
      name: 'Harender',
      role: 'Startup Founder & CTO',
      company: 'TechVenture',
      domain: 'Entrepreneurship',
      experience: '7 years',
      specialization: ['Web Dev', 'Startup Building', 'Full Stack'],
      availability: 'Weekday Evenings',
      rating: 4.6,
      sessions: 72,
      image: '👨',
      bio: 'Built 3 startups. Mentor students interested in entrepreneurship and product development.',
      focus: ['Startup', 'Web Dev', 'Innovation'],
      contact: { email: 'harender.singh@techventure.com', phone: '+91 80596 86967', linkedin: 'linkedin.com/in/harendersingh' }
    },
    {
      id: 6,
      name: 'Karan',
      role: 'Counseling Psychologist',
      company: 'Wellness Center',
      domain: 'Mental Health',
      experience: '9 years',
      specialization: ['Stress Management', 'Academic Pressure', 'Work-Life Balance'],
      availability: 'Daily',
      rating: 5.0,
      sessions: 203,
      image: '👨',
      bio: 'Specialized in student mental health. Here to help you manage stress and build resilience.',
      focus: ['Mental Health', 'Stress', 'Balance'],
      contact: { email: 'karan.iyer@wellness.com', phone: '+91 87085 12069', linkedin: 'linkedin.com/in/karaniyer' }
    }
  ]

  const issues = [
    'Academic Pressure',
    'Career Confusion',
    'Placement Preparation',
    'Project Guidance',
    'Time Management',
    'Mental Health Support',
    'Subject Understanding',
    'Internship Guidance'
  ]

  const allMentors = [...mentors, ...customMentors]
  const filteredMentors = allMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         mentor.domain.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDomain = filterDomain === 'all' || mentor.domain === filterDomain
    return matchesSearch && matchesDomain
  })

  const domains = ['all', ...new Set(allMentors.map(m => m.domain))]

  const handleRequestMentorship = (mentor) => {
    setSelectedMentor(mentor)
    setShowRequestForm(true)
  }

  const submitRequest = () => {
    if (!requestData.name || !requestData.year || !requestData.issue) {
      alert('Please fill all required fields')
      return
    }

    const newRequest = {
      id: Date.now(),
      mentorId: selectedMentor.id,
      mentorName: selectedMentor.name,
      studentName: requestData.name,
      year: requestData.year,
      issue: requestData.issue,
      description: requestData.description,
      status: 'pending',
      timestamp: new Date().toLocaleString()
    }

    setMentorRequests([newRequest, ...mentorRequests])
    setRequestData({ name: '', year: '', issue: '', description: '' })
    setShowRequestForm(false)
    setSelectedMentor(null)
    setActiveTab('requests')
  }

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isToggled 
        ? 'bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#333333]' 
        : 'bg-gradient-to-br from-[#EFECE3] via-[#f5f2e9] to-[#e8e5dc]'
    }`}>
      {/* Header */}
      <div className={`backdrop-blur-md shadow-sm border-b transition-all duration-500 ${
        isToggled 
          ? 'bg-[#000000]/90 border-[#4A70A9]/30' 
          : 'bg-[#EFECE3]/80 border-[#8FABD4]/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  isToggled ? 'text-[#8FABD4] hover:bg-[#4A70A9]/20' : 'text-[#4A70A9] hover:bg-[#8FABD4]/20'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className={`text-xl sm:text-2xl font-bold ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
              }`}>B.Tech Mentorship Hub</h1>
            </div>
            <div className="hidden md:flex items-center gap-6 text-center">
              <div>
                <div className={`text-2xl font-bold ${
                  isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
                }`}>{allMentors.length}</div>
                <div className={`text-sm ${
                  isToggled ? 'text-[#8FABD4]/80' : 'text-gray-600'
                }`}>Mentors</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${
                  isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
                }`}>{mentorRequests.length}</div>
                <div className={`text-sm ${
                  isToggled ? 'text-[#8FABD4]/80' : 'text-gray-600'
                }`}>Requests</div>
              </div>
              <button
                onClick={() => setShowAddMentorForm(true)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  isToggled 
                    ? 'bg-[#4A70A9] hover:bg-[#4A70A9]/80 text-white' 
                    : 'bg-[#8FABD4] hover:bg-[#8FABD4]/80 text-white'
                }`}
              >
                + Add Mentor
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Navigation Tabs */}
        <div className={`rounded-2xl shadow-lg p-2 mb-6 ${
          isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
        }`}>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setActiveTab('mentors')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'mentors'
                  ? isToggled ? 'bg-[#4A70A9] text-white' : 'bg-[#8FABD4] text-white'
                  : isToggled ? 'text-[#8FABD4] hover:bg-[#4A70A9]/20' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🎓 Find Mentors
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'requests'
                  ? isToggled ? 'bg-[#4A70A9] text-white' : 'bg-[#8FABD4] text-white'
                  : isToggled ? 'text-[#8FABD4] hover:bg-[#4A70A9]/20' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              My Requests ({mentorRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'resources'
                  ? isToggled ? 'bg-[#4A70A9] text-white' : 'bg-[#8FABD4] text-white'
                  : isToggled ? 'text-[#8FABD4] hover:bg-[#4A70A9]/20' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📚 Resources
            </button>
          </div>
        </div>

        {/* Mentors Tab */}
        {activeTab === 'mentors' && (
          <>
            {/* Search and Filter */}
            <div className={`rounded-2xl shadow-lg p-6 mb-6 ${
              isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
            }`}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search mentors by name, skill, or domain..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none ${
                      isToggled 
                        ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9] placeholder-[#8FABD4]/50'
                        : 'bg-white border-gray-200 text-gray-800 focus:border-indigo-500 placeholder-gray-500'
                    }`}
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <select
                  value={filterDomain}
                  onChange={(e) => setFilterDomain(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                    isToggled 
                      ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9]'
                      : 'bg-white border-gray-200 text-gray-800 focus:border-indigo-500'
                  }`}
                >
                  {domains.map(domain => (
                    <option key={domain} value={domain}>
                      {domain === 'all' ? 'All Domains' : domain}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredMentors.map(mentor => (
                <div key={mentor.id} className={`rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden ${
                  isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
                }`}>
                  <div className={`p-6 text-white ${
                    isToggled 
                      ? 'bg-gradient-to-br from-[#4A70A9] to-[#8FABD4]'
                      : 'bg-gradient-to-br from-[#8FABD4] to-[#4A70A9]'
                  }`}>
                    <div className="text-5xl mb-3 text-center">{mentor.image}</div>
                    <h3 className="text-xl font-bold text-center">{mentor.name}</h3>
                    <p className="text-indigo-100 text-center text-sm">{mentor.role}</p>
                    <p className="text-indigo-200 text-center text-sm">{mentor.company}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className={`font-semibold ${
                          isToggled ? 'text-[#8FABD4]' : 'text-gray-800'
                        }`}>{mentor.rating}</span>
                        <span className={`text-sm ${
                          isToggled ? 'text-[#8FABD4]/80' : 'text-gray-500'
                        }`}>({mentor.sessions} sessions)</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className={`text-sm font-semibold mb-2 ${
                        isToggled ? 'text-[#8FABD4]' : 'text-gray-700'
                      }`}>Specialization:</div>
                      <div className="flex flex-wrap gap-2">
                        {mentor.specialization.map((spec, idx) => (
                          <span key={idx} className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isToggled ? 'bg-[#4A70A9]/20 text-[#8FABD4]' : 'bg-indigo-100 text-indigo-700'
                          }`}>
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className={`text-sm font-semibold mb-2 ${
                        isToggled ? 'text-[#8FABD4]' : 'text-gray-700'
                      }`}>Focus Areas:</div>
                      <div className="flex flex-wrap gap-2">
                        {mentor.focus.map((f, idx) => (
                          <span key={idx} className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isToggled ? 'bg-[#8FABD4]/20 text-[#8FABD4]' : 'bg-purple-100 text-purple-700'
                          }`}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className={`text-sm mb-4 ${
                      isToggled ? 'text-[#8FABD4]/90' : 'text-gray-600'
                    }`}>{mentor.bio}</p>

                    <div className={`flex items-center gap-2 text-sm mb-4 ${
                      isToggled ? 'text-[#8FABD4]/80' : 'text-gray-600'
                    }`}>
                      <span>🕒</span>
                      <span>{mentor.availability}</span>
                    </div>

                    <div className={`mb-4 p-3 rounded-lg ${
                      isToggled ? 'bg-[#000000]/40' : 'bg-gray-50'
                    }`}>
                      <div className={`text-sm font-semibold mb-2 ${
                        isToggled ? 'text-[#8FABD4]' : 'text-gray-700'
                      }`}>Contact Information:</div>
                      <div className={`space-y-1 text-xs ${
                        isToggled ? 'text-[#8FABD4]/80' : 'text-gray-600'
                      }`}>
                        <div className="flex items-center gap-2">
                          <span>📧</span>
                          <span>{mentor.contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>📱</span>
                          <span>{mentor.contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>💼</span>
                          <span>{mentor.contact.linkedin}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRequestMentorship(mentor)}
                      className={`w-full font-semibold py-3 rounded-lg transition-all ${
                        isToggled 
                          ? 'bg-[#4A70A9] hover:bg-[#4A70A9]/80 text-white' 
                          : 'bg-[#8FABD4] hover:bg-[#8FABD4]/80 text-white'
                      }`}
                    >
                      Request Mentorship
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className={`rounded-2xl shadow-lg p-6 ${
            isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
          }`}>
            <h2 className={`text-2xl font-bold mb-6 ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
            }`}>My Mentorship Requests</h2>
            {mentorRequests.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💬</div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  isToggled ? 'text-[#8FABD4]' : 'text-gray-700'
                }`}>No requests yet</h3>
                <p className={`mb-4 ${
                  isToggled ? 'text-[#8FABD4]/80' : 'text-gray-500'
                }`}>Start by requesting mentorship from our experienced mentors</p>
                <button
                  onClick={() => setActiveTab('mentors')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    isToggled 
                      ? 'bg-[#4A70A9] hover:bg-[#4A70A9]/80 text-white' 
                      : 'bg-[#8FABD4] hover:bg-[#8FABD4]/80 text-white'
                  }`}
                >
                  Browse Mentors
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {mentorRequests.map(request => (
                  <div key={request.id} className={`border-2 rounded-xl p-6 transition-all ${
                    isToggled ? 'border-[#8FABD4]/30 hover:border-[#4A70A9]' : 'border-gray-200 hover:border-indigo-300'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className={`text-lg font-bold ${
                          isToggled ? 'text-[#8FABD4]' : 'text-gray-800'
                        }`}>{request.mentorName}</h3>
                        <p className={`text-sm ${
                          isToggled ? 'text-[#8FABD4]/80' : 'text-gray-600'
                        }`}>{request.timestamp}</p>
                      </div>
                      <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        request.status === 'accepted' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <span className={`text-sm font-semibold ${
                          isToggled ? 'text-[#8FABD4]' : 'text-gray-700'
                        }`}>Student: </span>
                        <span className={`text-sm ${
                          isToggled ? 'text-[#8FABD4]/80' : 'text-gray-600'
                        }`}>{request.studentName}</span>
                      </div>
                      <div>
                        <span className={`text-sm font-semibold ${
                          isToggled ? 'text-[#8FABD4]' : 'text-gray-700'
                        }`}>Year: </span>
                        <span className={`text-sm ${
                          isToggled ? 'text-[#8FABD4]/80' : 'text-gray-600'
                        }`}>{request.year}</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <span className={`text-sm font-semibold ${
                        isToggled ? 'text-[#8FABD4]' : 'text-gray-700'
                      }`}>Issue: </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ml-2 ${
                        isToggled ? 'bg-[#8FABD4]/20 text-[#8FABD4]' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {request.issue}
                      </span>
                    </div>
                    {request.description && (
                      <p className={`text-sm p-3 rounded-lg ${
                        isToggled ? 'text-[#8FABD4]/90 bg-[#000000]/40' : 'text-gray-600 bg-gray-50'
                      }`}>{request.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className={`rounded-2xl shadow-lg p-6 ${
              isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
            }`}>
              <h2 className={`text-2xl font-bold mb-6 ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
              }`}>Helpful Resources</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`border-2 rounded-xl p-6 transition-all ${
                  isToggled ? 'border-[#8FABD4]/30 hover:border-[#4A70A9]' : 'border-indigo-200 hover:border-indigo-400'
                }`}>
                  <div className="text-3xl mb-3">❤️</div>
                  <h3 className={`text-lg font-bold mb-2 ${
                    isToggled ? 'text-[#8FABD4]' : 'text-gray-800'
                  }`}>Mental Health Support</h3>
                  <ul className={`space-y-2 text-sm ${
                    isToggled ? 'text-[#8FABD4]/90' : 'text-gray-600'
                  }`}>
                    <li>• AASRA: 91-22-27546669 (24x7 Crisis Helpline)</li>
                    <li>• iCall: 91-22-25521111 (Mon-Sat, 8am-10pm)</li>
                    <li>• Vandrevala Foundation: 1860-2662-345</li>
                    <li>• Your Campus Counseling Center</li>
                  </ul>
                </div>

                <div className={`border-2 rounded-xl p-6 transition-all ${
                  isToggled ? 'border-[#8FABD4]/30 hover:border-[#4A70A9]' : 'border-purple-200 hover:border-purple-400'
                }`}>
                  <div className="text-3xl mb-3">🎯</div>
                  <h3 className={`text-lg font-bold mb-2 ${
                    isToggled ? 'text-[#8FABD4]' : 'text-gray-800'
                  }`}>Career Guidance</h3>
                  <ul className={`space-y-2 text-sm ${
                    isToggled ? 'text-[#8FABD4]/90' : 'text-gray-600'
                  }`}>
                    <li>• LinkedIn Learning - Free courses</li>
                    <li>• GeeksforGeeks - Interview prep</li>
                    <li>• Coursera - Skill development</li>
                    <li>• GitHub - Build portfolio</li>
                  </ul>
                </div>

                <div className={`border-2 rounded-xl p-6 transition-all ${
                  isToggled ? 'border-[#8FABD4]/30 hover:border-[#4A70A9]' : 'border-green-200 hover:border-green-400'
                }`}>
                  <div className="text-3xl mb-3">📚</div>
                  <h3 className={`text-lg font-bold mb-2 ${
                    isToggled ? 'text-[#8FABD4]' : 'text-gray-800'
                  }`}>Study Resources</h3>
                  <ul className={`space-y-2 text-sm ${
                    isToggled ? 'text-[#8FABD4]/90' : 'text-gray-600'
                  }`}>
                    <li>• NPTEL - Free video lectures</li>
                    <li>• MIT OCW - Course materials</li>
                    <li>• Khan Academy - Fundamentals</li>
                    <li>• Stack Overflow - Problem solving</li>
                  </ul>
                </div>

                <div className={`border-2 rounded-xl p-6 transition-all ${
                  isToggled ? 'border-[#8FABD4]/30 hover:border-[#4A70A9]' : 'border-blue-200 hover:border-blue-400'
                }`}>
                  <div className="text-3xl mb-3">💼</div>
                  <h3 className={`text-lg font-bold mb-2 ${
                    isToggled ? 'text-[#8FABD4]' : 'text-gray-800'
                  }`}>Internship Platforms</h3>
                  <ul className={`space-y-2 text-sm ${
                    isToggled ? 'text-[#8FABD4]/90' : 'text-gray-600'
                  }`}>
                    <li>• Internshala - Indian internships</li>
                    <li>• LinkedIn Jobs - Professional network</li>
                    <li>• AngelList - Startup opportunities</li>
                    <li>• LetsIntern - Student focused</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={`rounded-2xl shadow-lg p-8 text-white ${
              isToggled 
                ? 'bg-gradient-to-br from-[#4A70A9] to-[#8FABD4]'
                : 'bg-gradient-to-br from-[#8FABD4] to-[#4A70A9]'
            }`}>
              <h3 className="text-2xl font-bold mb-4">Remember</h3>
              <div className="space-y-3">
                <p className="flex items-start gap-3">
                  <span className="text-xl">✅</span>
                  <span>It's okay to ask for help. Every successful person had mentors.</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-xl">✅</span>
                  <span>Academic pressure is temporary. Your mental health is permanent.</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-xl">✅</span>
                  <span>One bad semester doesn't define your career or future.</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-xl">✅</span>
                  <span>Take breaks. Rest is productive. Burnout helps no one.</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Add Mentor Form Modal */}
        {showAddMentorForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
              isToggled ? 'bg-[#000000]/95' : 'bg-white'
            }`}>
              <div className={`p-6 text-white ${
                isToggled 
                  ? 'bg-gradient-to-br from-[#4A70A9] to-[#8FABD4]'
                  : 'bg-gradient-to-br from-[#8FABD4] to-[#4A70A9]'
              }`}>
                <h2 className="text-2xl font-bold mb-2">Add Personal Mentor</h2>
                <p className="text-indigo-100">Add someone you know as your mentor</p>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Mentor Name *"
                    value={newMentorData.name}
                    onChange={(e) => setNewMentorData({...newMentorData, name: e.target.value})}
                    className={`w-full p-3 border-2 rounded-lg focus:outline-none ${
                      isToggled 
                        ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9] placeholder-[#8FABD4]/50'
                        : 'bg-white border-gray-200 text-gray-800 focus:border-indigo-500 placeholder-gray-500'
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Role/Position *"
                    value={newMentorData.role}
                    onChange={(e) => setNewMentorData({...newMentorData, role: e.target.value})}
                    className={`w-full p-3 border-2 rounded-lg focus:outline-none ${
                      isToggled 
                        ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9] placeholder-[#8FABD4]/50'
                        : 'bg-white border-gray-200 text-gray-800 focus:border-indigo-500 placeholder-gray-500'
                    }`}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Company"
                    value={newMentorData.company}
                    onChange={(e) => setNewMentorData({...newMentorData, company: e.target.value})}
                    className={`w-full p-3 border-2 rounded-lg focus:outline-none ${
                      isToggled 
                        ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9] placeholder-[#8FABD4]/50'
                        : 'bg-white border-gray-200 text-gray-800 focus:border-indigo-500 placeholder-gray-500'
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Domain"
                    value={newMentorData.domain}
                    onChange={(e) => setNewMentorData({...newMentorData, domain: e.target.value})}
                    className={`w-full p-3 border-2 rounded-lg focus:outline-none ${
                      isToggled 
                        ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9] placeholder-[#8FABD4]/50'
                        : 'bg-white border-gray-200 text-gray-800 focus:border-indigo-500 placeholder-gray-500'
                    }`}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={newMentorData.email}
                  onChange={(e) => setNewMentorData({...newMentorData, email: e.target.value})}
                  className={`w-full p-3 border-2 rounded-lg focus:outline-none ${
                    isToggled 
                      ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9] placeholder-[#8FABD4]/50'
                      : 'bg-white border-gray-200 text-gray-800 focus:border-indigo-500 placeholder-gray-500'
                  }`}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={newMentorData.phone}
                    onChange={(e) => setNewMentorData({...newMentorData, phone: e.target.value})}
                    className={`w-full p-3 border-2 rounded-lg focus:outline-none ${
                      isToggled 
                        ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9] placeholder-[#8FABD4]/50'
                        : 'bg-white border-gray-200 text-gray-800 focus:border-indigo-500 placeholder-gray-500'
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="LinkedIn Profile"
                    value={newMentorData.linkedin}
                    onChange={(e) => setNewMentorData({...newMentorData, linkedin: e.target.value})}
                    className={`w-full p-3 border-2 rounded-lg focus:outline-none ${
                      isToggled 
                        ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9] placeholder-[#8FABD4]/50'
                        : 'bg-white border-gray-200 text-gray-800 focus:border-indigo-500 placeholder-gray-500'
                    }`}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Specialization (comma separated)"
                  value={newMentorData.specialization}
                  onChange={(e) => setNewMentorData({...newMentorData, specialization: e.target.value})}
                  className={`w-full p-3 border-2 rounded-lg focus:outline-none ${
                    isToggled 
                      ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9] placeholder-[#8FABD4]/50'
                      : 'bg-white border-gray-200 text-gray-800 focus:border-indigo-500 placeholder-gray-500'
                  }`}
                />
                <textarea
                  placeholder="Bio/Description"
                  value={newMentorData.bio}
                  onChange={(e) => setNewMentorData({...newMentorData, bio: e.target.value})}
                  className={`w-full p-3 border-2 rounded-lg focus:outline-none resize-none ${
                    isToggled 
                      ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9] placeholder-[#8FABD4]/50'
                      : 'bg-white border-gray-200 text-gray-800 focus:border-indigo-500 placeholder-gray-500'
                  }`}
                  rows="3"
                />

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowAddMentorForm(false)
                      setNewMentorData({
                        name: '', role: '', company: '', domain: '', experience: '', specialization: '',
                        availability: '', bio: '', email: '', phone: '', linkedin: ''
                      })
                    }}
                    className={`flex-1 px-6 py-3 border-2 font-semibold rounded-lg transition-all ${
                      isToggled 
                        ? 'border-[#8FABD4]/30 text-[#8FABD4] hover:bg-[#8FABD4]/10'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addCustomMentor}
                    className={`flex-1 font-semibold py-3 rounded-lg transition-all text-white ${
                      isToggled 
                        ? 'bg-[#4A70A9] hover:bg-[#4A70A9]/80'
                        : 'bg-[#8FABD4] hover:bg-[#8FABD4]/80'
                    }`}
                  >
                    Add Mentor
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Request Form Modal */}
        {showRequestForm && selectedMentor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
              isToggled ? 'bg-[#000000]/95' : 'bg-white'
            }`}>
              <div className={`p-6 text-white ${
                isToggled 
                  ? 'bg-gradient-to-br from-[#4A70A9] to-[#8FABD4]'
                  : 'bg-gradient-to-br from-[#8FABD4] to-[#4A70A9]'
              }`}>
                <h2 className="text-2xl font-bold mb-2">Request Mentorship</h2>
                <p className="text-indigo-100">Connecting with {selectedMentor.name}</p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    isToggled ? 'text-[#8FABD4]' : 'text-gray-700'
                  }`}>
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={requestData.name}
                    onChange={(e) => setRequestData({...requestData, name: e.target.value})}
                    placeholder="Enter your full name"
                    className={`w-full p-3 border-2 rounded-lg focus:outline-none ${
                      isToggled 
                        ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9] placeholder-[#8FABD4]/50'
                        : 'bg-white border-gray-200 text-gray-800 focus:border-indigo-500 placeholder-gray-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    isToggled ? 'text-[#8FABD4]' : 'text-gray-700'
                  }`}>
                    Current Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={requestData.year}
                    onChange={(e) => setRequestData({...requestData, year: e.target.value})}
                    className={`w-full p-3 border-2 rounded-lg focus:outline-none ${
                      isToggled 
                        ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9]'
                        : 'bg-white border-gray-200 text-gray-800 focus:border-indigo-500'
                    }`}
                  >
                    <option value="">Select your year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    isToggled ? 'text-[#8FABD4]' : 'text-gray-700'
                  }`}>
                    What do you need help with? <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={requestData.issue}
                    onChange={(e) => setRequestData({...requestData, issue: e.target.value})}
                    className={`w-full p-3 border-2 rounded-lg focus:outline-none ${
                      isToggled 
                        ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9]'
                        : 'bg-white border-gray-200 text-gray-800 focus:border-indigo-500'
                    }`}
                  >
                    <option value="">Select an issue</option>
                    {issues.map(issue => (
                      <option key={issue} value={issue}>{issue}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    isToggled ? 'text-[#8FABD4]' : 'text-gray-700'
                  }`}>
                    Describe your situation (Optional)
                  </label>
                  <textarea
                    value={requestData.description}
                    onChange={(e) => setRequestData({...requestData, description: e.target.value})}
                    placeholder="Share more details about what you're facing and what kind of guidance you're looking for..."
                    className={`w-full p-3 border-2 rounded-lg focus:outline-none resize-none ${
                      isToggled 
                        ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9] placeholder-[#8FABD4]/50'
                        : 'bg-white border-gray-200 text-gray-800 focus:border-indigo-500 placeholder-gray-500'
                    }`}
                    rows="4"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowRequestForm(false)
                      setSelectedMentor(null)
                      setRequestData({ name: '', year: '', issue: '', description: '' })
                    }}
                    className={`flex-1 px-6 py-3 border-2 font-semibold rounded-lg transition-all ${
                      isToggled 
                        ? 'border-[#8FABD4]/30 text-[#8FABD4] hover:bg-[#8FABD4]/10'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitRequest}
                    className={`flex-1 font-semibold py-3 rounded-lg transition-all text-white ${
                      isToggled 
                        ? 'bg-[#4A70A9] hover:bg-[#4A70A9]/80'
                        : 'bg-[#8FABD4] hover:bg-[#8FABD4]/80'
                    }`}
                  >
                    📤 Send Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Mentorship