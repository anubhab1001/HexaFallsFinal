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

const mockHistory = [
  { id: 1, name: 'Peanut Butter Cookies', result: 'Contains Peanuts', safe: false, date: '2024-06-28' },
  { id: 2, name: 'Gluten-Free Bread', result: 'Safe for You', safe: true, date: '2024-06-27' },
  { id: 3, name: 'Mixed Nuts Trail Mix', result: 'Contains Tree Nuts', safe: false, date: '2024-06-26' },
  { id: 4, name: 'Organic Salad', result: 'Safe for You', safe: true, date: '2024-06-25' }
];

const HistoryPage = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Scan History</h1>
        <p className="text-xl text-gray-600">Review your previous allergen detection scans</p>
      </div>

      <div className="space-y-4">
        {mockHistory.map((scan) => (
          <div key={scan.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {scan.safe ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-500" />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{scan.name}</h3>
                  <p className={`text-sm font-medium ${scan.safe ? 'text-green-600' : 'text-red-600'}`}>
                    {scan.result}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{scan.date}</p>
                <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mt-1">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mockHistory.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Scans Yet</h3>
          <p className="text-gray-600 mb-6">Start by uploading your first food image to see your scan history here.</p>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Upload First Image
          </button>
        </div>
      )}
    </div>
  </div>
);

export default HistoryPage;