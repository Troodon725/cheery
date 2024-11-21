import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, Calendar, ChefHat, Box, Users, Trophy, ArrowRight, Star, Heart } from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Party Planning',
    description: 'Organize holiday gatherings with ease',
    image: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?q=80&w=2069&auto=format&fit=crop',
    link: '/auth?redirect=party-planner'
  },
  {
    icon: Gift,
    title: 'Gift Management',
    description: 'Track gifts, budgets, and wishlists',
    image: 'https://images.unsplash.com/photo-1511895571-b6cf8c563178?q=80&w=2070&auto=format&fit=crop',
    link: '/auth?redirect=gifts'
  },
  {
    icon: ChefHat,
    title: 'Recipe Collection',
    description: 'Store and share holiday recipes',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&w=2069&auto=format&fit=crop',
    link: '/auth?redirect=recipes'
  },
  {
    icon: Box,
    title: 'Decor Storage',
    description: 'Organize your holiday decorations',
    image: 'https://images.unsplash.com/photo-1544665215-e8239d25dd77?q=80&w=2070&auto=format&fit=crop',
    link: '/auth?redirect=decor'
  },
  {
    icon: Users,
    title: 'Secret Santa',
    description: 'Coordinate gift exchanges',
    image: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=2069&auto=format&fit=crop',
    link: '/auth?redirect=secret-santa'
  },
  {
    icon: Trophy,
    title: 'Task Management',
    description: 'Track holiday preparations',
    image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?q=80&w=2070&auto=format&fit=crop',
    link: '/auth?redirect=tasks'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Party Planner',
    content: 'Holiday Hub has transformed how I organize holiday events. Everything in one place!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Michael Chen',
    role: 'Home Chef',
    content: 'The recipe management system is incredible. I can easily share family traditions.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Emily Davis',
    role: 'Family Organizer',
    content: 'Secret Santa organization has never been easier. Our family loves it!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'
  }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-holiday-green-50 to-holiday-red-50">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?q=80&w=2070&auto=format&fit=crop')",
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-holiday-red-600/90 to-holiday-green-600/90" />
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6 flex justify-center">
              <Heart className="w-16 h-16 text-white animate-pulse" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Make Your Holidays 
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Magical
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8">
              Your all-in-one solution for planning, organizing, and celebrating the holiday season
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/auth')} 
                className="group btn btn-primary bg-white text-holiday-red-600 hover:bg-gray-100 text-lg px-8 py-3"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-secondary bg-transparent text-white border-white hover:bg-white/10 text-lg px-8 py-3"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for the Perfect Holiday Season
            </h2>
            <p className="text-xl text-gray-600">
              Streamline your holiday planning with our comprehensive suite of tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description, image, link }, index) => (
              <div 
                key={title}
                className="group relative overflow-hidden rounded-xl shadow-sm border border-gray-100 hover:border-holiday-green-200 hover:shadow-md transition-all cursor-pointer"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                onClick={() => navigate(link)}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{title}</h3>
                  </div>
                  <p className="text-white/90">{description}</p>
                  <button className="mt-4 text-sm font-medium flex items-center text-holiday-green-300 group-hover:text-white transition-colors">
                    Learn More
                    <ArrowRight className={`w-4 h-4 ml-1 transition-transform ${
                      hoveredFeature === index ? 'translate-x-1' : ''
                    }`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Star className="w-12 h-12 text-holiday-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Loved by Holiday Enthusiasts
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of happy users making their holidays special
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=2069&auto=format&fit=crop')"
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Make Your Holidays Special?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community of holiday enthusiasts and start planning your perfect celebration
          </p>
          <button 
            onClick={() => navigate('/auth')}
            className="group btn btn-primary text-lg px-8 py-3"
          >
            Start Planning Now
            <ArrowRight className="inline-block w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}