import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'

const Profile = () => {
  const navigate = useNavigate()
  const [isToggled, setIsToggled] = useState(false)
  const [user, setUser] = useState({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    phone: '',
    location: '',
    profilePhoto: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [photoPreview, setPhotoPreview] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          console.log('Fetched user data:', data)
          const userData = data.user
          
          setUser(userData)
          setFormData({
            name: userData.name || '',
            email: userData.email || '',
            bio: userData.bio || '',
            phone: userData.phone || '',
            location: userData.location || '',
            profilePhoto: userData.profilePhoto || ''
          })
          setPhotoPreview(userData.profilePhoto || '')
          localStorage.setItem('user', JSON.stringify(userData))
        } else {
          console.error('Failed to fetch user data:', response.status)
          if (response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate('/login')
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
    
    fetchUserData()
    
    const theme = localStorage.getItem('theme')
    setIsToggled(theme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = !isToggled
    setIsToggled(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const photoUrl = e.target.result
        setPhotoPreview(photoUrl)
        setFormData({ ...formData, profilePhoto: photoUrl })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      console.log('Sending profile update:', formData)
      console.log('API URL:', import.meta.env.VITE_API_URL)
      
      // Test if API is reachable
      const testResponse = await fetch(`${import.meta.env.VITE_API_URL}/`)
      console.log('API test response:', testResponse.status)
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      
      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers.get('content-type'))
      
      const responseText = await response.text()
      console.log('Raw response:', responseText)
      
      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('JSON parse error:', parseError)
        alert('Server returned invalid response. Make sure backend is running on localhost:5001')
        return
      }
      
      if (response.ok) {
        const updatedUser = data.user
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setUser(updatedUser)
        setFormData({
          name: updatedUser.name || '',
          email: updatedUser.email || '',
          bio: updatedUser.bio || '',
          phone: updatedUser.phone || '',
          location: updatedUser.location || '',
          profilePhoto: updatedUser.profilePhoto || ''
        })
        setPhotoPreview(updatedUser.profilePhoto || '')
        setIsEditing(false)
        alert('Profile updated successfully!')
      } else {
        console.error('Failed to update profile:', response.status, data)
        alert(`Failed to update profile: ${data.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      if (error.message.includes('fetch')) {
        alert('Cannot connect to server. Please make sure the backend is running on localhost:5001')
      } else {
        alert(`Network error: ${error.message}`)
      }
    }
    setLoading(false)
  }

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isToggled 
        ? 'bg-[#000000]' 
        : 'bg-[#EFECE3]'
    }`}>
      <div className="pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <button
              onClick={() => navigate('/dashboard')}
              className={`flex items-center space-x-2 mb-4 transition-colors ${
                isToggled ? 'text-[#8FABD4] hover:text-[#4A70A9]' : 'text-[#4A70A9] hover:text-[#8FABD4]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Dashboard</span>
            </button>
            <h1 className={`text-3xl font-bold ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
            }`}>Profile Settings</h1>
          </div>

          <div className={`backdrop-blur-sm p-8 rounded-3xl shadow-2xl border ${
            isToggled 
              ? 'bg-[#000000]/90 border-[#4A70A9]/30' 
              : 'bg-white/90 border-[#8FABD4]/20'
          }`}>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <div className="flex flex-col items-center space-y-3">
                <div className="relative">
                  {photoPreview || formData.profilePhoto ? (
                    <img 
                      src={photoPreview || formData.profilePhoto} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-white ${
                      isToggled ? 'bg-[#4A70A9]' : 'bg-[#8FABD4]'
                    }`}>
                      {formData.name.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  {isEditing && (
                    <label className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 hover:scale-110 border-2 border-white ${
                      isToggled ? 'bg-[#4A70A9] hover:bg-[#4A70A9]/90' : 'bg-[#8FABD4] hover:bg-[#8FABD4]/90'
                    }`}>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </label>
                  )}
                </div>
                {isEditing && (
                  <label className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isToggled 
                      ? 'bg-[#4A70A9]/20 text-[#8FABD4] hover:bg-[#4A70A9]/30' 
                      : 'bg-[#8FABD4]/20 text-[#4A70A9] hover:bg-[#8FABD4]/30'
                  }`}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    📷 Upload Photo
                  </label>
                )}
              </div>
              <div className="text-center sm:text-left">
                <h2 className={`text-2xl font-bold ${
                  isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
                }`}>{formData.name || 'User'}</h2>
                <p className={`${
                  isToggled ? 'text-[#8FABD4]/70' : 'text-[#000000]/70'
                }`}>{formData.email}</p>
              </div>
              <div className="sm:ml-auto">
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                      isToggled 
                        ? 'bg-[#4A70A9] hover:bg-[#4A70A9]/90 text-white' 
                        : 'bg-[#8FABD4] hover:bg-[#8FABD4]/90 text-white'
                    }`}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
                }`}>Full Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    isToggled 
                      ? 'border-[#4A70A9]/30 focus:ring-[#4A70A9] bg-[#000000] text-[#8FABD4] placeholder-[#8FABD4]/60' 
                      : 'border-[#8FABD4]/30 focus:ring-[#8FABD4] bg-[#8FABD4]/10 text-[#000000] placeholder-[#000000]/70'
                  } ${!isEditing ? 'opacity-60' : ''}`}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
                }`}>Email</label>
                <input
                  type="email"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    isToggled 
                      ? 'border-[#4A70A9]/30 focus:ring-[#4A70A9] bg-[#000000] text-[#8FABD4] placeholder-[#8FABD4]/60' 
                      : 'border-[#8FABD4]/30 focus:ring-[#8FABD4] bg-[#8FABD4]/10 text-[#000000] placeholder-[#000000]/70'
                  } ${!isEditing ? 'opacity-60' : ''}`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
                }`}>Phone Number</label>
                <input
                  type="tel"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    isToggled 
                      ? 'border-[#4A70A9]/30 focus:ring-[#4A70A9] bg-[#000000] text-[#8FABD4] placeholder-[#8FABD4]/60' 
                      : 'border-[#8FABD4]/30 focus:ring-[#8FABD4] bg-[#8FABD4]/10 text-[#000000] placeholder-[#000000]/70'
                  } ${!isEditing ? 'opacity-60' : ''}`}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
                }`}>Location</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    isToggled 
                      ? 'border-[#4A70A9]/30 focus:ring-[#4A70A9] bg-[#000000] text-[#8FABD4] placeholder-[#8FABD4]/60' 
                      : 'border-[#8FABD4]/30 focus:ring-[#8FABD4] bg-[#8FABD4]/10 text-[#000000] placeholder-[#000000]/70'
                  } ${!isEditing ? 'opacity-60' : ''}`}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter your location"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className={`block text-sm font-semibold ${
                  isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
                }`}>Bio</label>
                <textarea
                  disabled={!isEditing}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none ${
                    isToggled 
                      ? 'border-[#4A70A9]/30 focus:ring-[#4A70A9] bg-[#000000] text-[#8FABD4] placeholder-[#8FABD4]/60' 
                      : 'border-[#8FABD4]/30 focus:ring-[#8FABD4] bg-[#8FABD4]/10 text-[#000000] placeholder-[#000000]/70'
                  } ${!isEditing ? 'opacity-60' : ''}`}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                />
              </div>

              {isEditing && (
                <div className="md:col-span-2 flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      setIsEditing(false)
                      setFormData({
                        name: user.name || '',
                        email: user.email || '',
                        bio: user.bio || '',
                        phone: user.phone || '',
                        location: user.location || '',
                        profilePhoto: user.profilePhoto || ''
                      })
                      setPhotoPreview(user.profilePhoto || '')
                    }}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                      isToggled 
                        ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                        : 'bg-gray-400 hover:bg-gray-500 text-white'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                      isToggled 
                        ? 'bg-[#4A70A9] hover:bg-[#4A70A9]/90 text-white' 
                        : 'bg-[#8FABD4] hover:bg-[#8FABD4]/90 text-white'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer isToggled={isToggled} />
    </div>
  )
}

export default Profile