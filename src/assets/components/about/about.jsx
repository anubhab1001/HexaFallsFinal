import React, { useState } from 'react';
import { 
  Shield, 
  Upload, 
  Camera, 
  Bell, 
  Users, 
  History, 
  Search, 
  CheckCircle, 
  XCircle, 
  Home,
  Info,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronDown
} from 'lucide-react';


const AboutPage = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About SafeBite</h1>
        <p className="text-xl text-gray-600">Revolutionizing food safety through AI-powered allergen detection</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          At SafeBite, we believe everyone deserves to eat safely and confidently. Our mission is to harness the power of artificial intelligence to create a world where food allergies no longer pose a constant threat to daily life.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          We're committed to developing cutting-edge technology that makes allergen detection accessible, accurate, and instantaneous for everyone, everywhere.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <Shield className="w-12 h-12 text-emerald-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced AI Technology</h3>
          <p className="text-gray-600 leading-relaxed">
            Our proprietary AI algorithms analyze food images with 98% accuracy, identifying potential allergens in seconds using advanced computer vision and machine learning techniques.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <Users className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-4">Community-Driven</h3>
          <p className="text-gray-600 leading-relaxed">
            Built with input from food allergy sufferers, healthcare professionals, and nutrition experts to ensure our platform meets real-world needs and challenges.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How SafeBite Works</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="bg-emerald-100 rounded-full p-2 mt-1">
              <Camera className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Image Capture</h4>
              <p className="text-gray-600">Upload photos of food items, ingredient lists, or nutrition labels</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 rounded-full p-2 mt-1">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">AI Analysis</h4>
              <p className="text-gray-600">Our AI processes the image using advanced computer vision and allergen databases</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-orange-100 rounded-full p-2 mt-1">
              <Bell className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Instant Results</h4>
              <p className="text-gray-600">Receive immediate alerts about potential allergens with safety recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;