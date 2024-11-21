import React from 'react';
import { useProfileStore } from '../../store/profileStore';
import { User, MapPin, Gift, Settings, Share2, Users } from 'lucide-react';
import SharedItems from './SharedItems';
import Connections from './Connections';

export default function UserProfile() {
  const { profile, loading, error, updateProfile } = useProfileStore();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editForm, setEditForm] = React.useState(profile);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-holiday-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        {error}
      </div>
    );
  }

  if (!profile) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;
    
    await updateProfile(editForm);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-holiday-red-500 to-holiday-green-500"></div>
        <div className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 sm:-mt-16 space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <img
                src={profile.avatar_url || 'https://via.placeholder.com/128'}
                alt={profile.display_name}
                className="w-32 h-32 rounded-full border-4 border-white bg-white"
              />
              {profile.is_public && (
                <span className="absolute bottom-2 right-2 w-4 h-4 bg-holiday-green-500 rounded-full border-2 border-white"></span>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900">{profile.display_name}</h1>
              <p className="text-gray-600">{profile.bio}</p>
              <div className="mt-2 flex flex-wrap gap-4 justify-center sm:justify-start">
                {profile.location && (
                  <span className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {profile.location}
                  </span>
                )}
                {profile.favorite_holiday && (
                  <span className="flex items-center text-sm text-gray-500">
                    <Gift className="w-4 h-4 mr-1" />
                    {profile.favorite_holiday}
                  </span>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn btn-secondary"
              >
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
              <button className="btn btn-primary">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* About */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">About</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Interests</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-holiday-green-100 text-holiday-green-800"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              {profile.social_links && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Social Links</h3>
                  <div className="mt-2 space-y-2">
                    {Object.entries(profile.social_links).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-holiday-green-600 hover:text-holiday-green-700"
                      >
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Connections */}
          <Connections />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <SharedItems />
        </div>
      </div>
    </div>
  );
}