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

const UploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setUploadedFile(file);
    setAnalysisResult(null);
  };

  const analyzeFile = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      // Mock results - randomly show safe or unsafe
      const mockResults = [
        { safe: false, allergens: ['Peanuts', 'Tree Nuts'], confidence: 95 },
        { safe: true, allergens: [], confidence: 98 },
        { safe: false, allergens: ['Gluten', 'Wheat'], confidence: 92 },
        { safe: false, allergens: ['Milk', 'Dairy'], confidence: 89 }
      ];
      
      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Upload Food Image</h1>
          <p className="text-xl text-gray-600">Upload an image or ingredient list to detect potential allergens</p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              dragActive 
                ? 'border-emerald-500 bg-emerald-50' 
                : 'border-gray-300 hover:border-emerald-400 hover:bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {uploadedFile ? (
              <div className="space-y-4">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-900">File Uploaded</h3>
                <p className="text-gray-600">{uploadedFile.name}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-900">Drop your image here</h3>
                <p className="text-gray-600">or click to browse files</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg cursor-pointer transition-all duration-300"
                >
                  Browse Files
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Analyze Button */}
        {uploadedFile && !analysisResult && (
          <div className="text-center mb-8">
            <button
              onClick={analyzeFile}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze for Allergens'}
            </button>
          </div>
        )}

        {/* Analysis Loading */}
        {isAnalyzing && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="animate-spin w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Food</h3>
            <p className="text-gray-600">Our AI is scanning for potential allergens...</p>
          </div>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              {analysisResult.safe ? (
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              ) : (
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              )}
              <h3 className={`text-2xl font-bold mb-2 ${analysisResult.safe ? 'text-green-600' : 'text-red-600'}`}>
                {analysisResult.safe ? 'Safe for You! ✅' : 'Allergens Detected! ❌'}
              </h3>
              <p className="text-gray-600">Confidence: {analysisResult.confidence}%</p>
            </div>

            {!analysisResult.safe && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-semibold text-red-800 mb-3">Detected Allergens:</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.allergens.map((allergen, index) => (
                    <span
                      key={index}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
                <p className="text-red-700 mt-4">
                  ⚠️ This food contains allergens that may be harmful to you. Please avoid consumption and consult with a healthcare professional if needed.
                </p>
              </div>
            )}

            {analysisResult.safe && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="text-green-700">
                  🎉 Great news! Our analysis didn't detect any known allergens in this food item. It should be safe for you to consume.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;