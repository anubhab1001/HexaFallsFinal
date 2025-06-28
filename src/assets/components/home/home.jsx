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
import FeatureCard from '../featurecard/featurecard';

const HomePage = ({ setCurrentPage }) => (
  <div className="min-h-screen">
    {/* Hero Section */}
    <section className="bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Revolutionize Food Safety with 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400"> AI-Powered</span> Allergen Detection
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Advanced application designed to revolutionize allergen detection and food safety management for everyone.
          </p>
          <button 
            onClick={() => setCurrentPage('upload')}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>

    {/* Feature Cards */}
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Search}
            title="AI-Powered Allergen Detection"
            description="Early detection with 98% accuracy protects you from devastating allergic reactions."
            gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
          />
          <FeatureCard
            icon={Bell}
            title="Personalized Alert System"
            description="Get tailored treatment plans based on your specific allergen profile and medical history."
            gradient="bg-gradient-to-br from-blue-500 to-purple-600"
          />
          <FeatureCard
            icon={Users}
            title="Community Knowledge Hub"
            description="Interact with fellow users, share knowledge and solve challenges together in our supportive community."
            gradient="bg-gradient-to-br from-orange-500 to-red-600"
          />
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
        
        <div className="space-y-16">
          {/* Step 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4">1</div>
                <h3 className="text-2xl font-bold text-gray-900">Capture Image</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Go to the upload page, click on the "Take a Picture" button. This allows you to do one of two things: take the photo from your phone or select the image from your files. An alternative would be to drag and drop the image there. Use high quality images for accurate results.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-8 rounded-2xl">
                <div className="bg-emerald-200 p-6 rounded-xl flex items-center justify-center">
                  <Camera className="w-16 h-16 text-emerald-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex items-center mb-6">
                <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4">2</div>
                <h3 className="text-2xl font-bold text-gray-900">AI-Powered Analysis</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Wait for the loading icon to disappear. This indicates that our AI is analyzing your image. Once the analysis is complete, you will see the name of any allergens detected, a short description and links to articles that provide more information about the allergens.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-2xl">
                <div className="bg-blue-200 p-6 rounded-xl flex items-center justify-center">
                  <Search className="w-16 h-16 text-blue-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex items-center mb-6">
                <div className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4">3</div>
                <h3 className="text-2xl font-bold text-gray-900">Get Safety Recommendations</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                You will receive personalized safety recommendations and a list of nearby suppliers selling safe products, along with their contact information and location details to help you make informed decisions.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-orange-100 to-red-100 p-8 rounded-2xl">
                <div className="bg-orange-200 p-6 rounded-xl flex items-center justify-center">
                  <Shield className="w-16 h-16 text-orange-700" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <button 
            onClick={() => setCurrentPage('upload')}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>

    {/* Newsletter */}
    <section className="bg-gradient-to-r from-emerald-100 to-teal-100 py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Newsletter</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Sign up for our free newsletter and receive regular updates on food safety, allergen prevention, treatment and cultivation tips. Join us today and take your food safety to the next level.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;