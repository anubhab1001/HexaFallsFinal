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

const Footer = () => (
  <footer className="bg-emerald-700 text-white py-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="md:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-8 h-8 text-emerald-300" />
            <span className="text-2xl font-bold">SafeBite</span>
          </div>
          <p className="text-emerald-100 mb-6 max-w-md">
            Advanced AI application designed to revolutionize allergen detection for safer eating experiences.
          </p>
          <div className="flex space-x-4">
            <div className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
              <Facebook className="w-5 h-5" />
            </div>
            <div className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
              <Twitter className="w-5 h-5" />
            </div>
            <div className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
              <Instagram className="w-5 h-5" />
            </div>
            <div className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
              <Linkedin className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-emerald-100">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Upload</li>
            <li className="hover:text-white cursor-pointer">Community</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-emerald-100">
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms of Service</li>
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">FAQ</li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-emerald-600 mt-8 pt-8 text-center text-emerald-100">
        <p>&copy; 2024 SafeBite. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
