import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://source.unsplash.com/random/100x100?face',
    bio: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully.');
  };

  const handlePasswordReset = async () => {
    try {
      // Simulasi pengiriman email berisi token reset password
      alert(`A password reset link has been sent to ${userData.email}`);

      // Misal backend akan kirim email berisi token ke user
      // Setelah dikirim, arahkan user ke halaman ganti password
      navigate('/ResetPassword'); 
    } catch (error) {
      alert('Failed to send reset link. Please try again.');
      console.error('Error sending reset link:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-orange-200 shadow-sm">
                <img
                  src={userData.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <button
                  type="button"
                  className="px-4 py-2 text-sm border border-orange-500 text-orange-500 rounded-full hover:bg-orange-50 transition-colors"
                >
                  Change Photo
                </button>
                <p className="text-sm text-gray-500">
                  Recommended: Square image, at least 400x400px
                </p>
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-orange-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-orange-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={userData.bio}
                  onChange={(e) =>
                    setUserData({ ...userData, bio: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-orange-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Password Reset Info */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  To change your password, click the button below. A password reset link will be sent to your email.
                </p>
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  className="mt-3 px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Send Password Reset Link
                </button>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
