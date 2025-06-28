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

const FeatureCard = ({ icon: Icon, title, description, gradient }) => (
  <div className={`${gradient} p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}>
    <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-white/90 leading-relaxed">{description}</p>
  </div>
);

export default FeatureCard;
