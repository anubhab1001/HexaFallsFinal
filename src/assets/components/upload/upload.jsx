import React, { useState, useCallback } from 'react';
import { Upload, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const UploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [error, setError] = useState(null);
  const [apiEndpoint] = useState("http://127.0.0.1:5000");

  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  // Handle file drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files?.length) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setUploadedFile(file);
        setAnalysisResult(null);
        setError(null);
      } else {
        setError('Please upload an image file (JPEG, PNG)');
      }
    }
  }, []);

  // Handle file selection
  const handleFileSelect = useCallback((e) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setUploadedFile(file);
        setAnalysisResult(null);
        setError(null);
      } else {
        setError('Please upload an image file (JPEG, PNG)');
      }
    }
  }, []);

  // Reset analysis
  const resetAnalysis = useCallback(() => {
    setUploadedFile(null);
    setAnalysisResult(null);
    setTextInput("");
    setError(null);
  }, []);

  // Analyze text input
  const analyzeText = useCallback(async () => {
    if (!textInput.trim()) {
      setError("Please enter ingredients to analyze");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch(`${apiEndpoint}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: textInput }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();
      
      setAnalysisResult({
        safe: Object.keys(data.prediction)[0] === "No allergens detected",
        allergens: Object.keys(data.prediction),
        confidence: data.confidence || 90,
        rawText: textInput
      });
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err.message || "Failed to analyze ingredients");
    } finally {
      setIsAnalyzing(false);
    }
  }, [textInput, apiEndpoint]);

  // Analyze image file
  const analyzeImage = useCallback(async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', uploadedFile);

      const response = await fetch(`${apiEndpoint}/predict-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();
      
      setAnalysisResult({
        safe: Object.keys(data.prediction)[0] === "No allergens detected",
        allergens: Object.keys(data.prediction),
        confidence: data.confidence || 85, // Slightly lower confidence for OCR
        rawText: data.extracted_text || "Could not extract text from image"
      });
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err.message || "Failed to analyze image");
    } finally {
      setIsAnalyzing(false);
    }
  }, [uploadedFile, apiEndpoint]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SafeBite Allergen Detection</h1>
          <p className="text-lg text-gray-600">
            Upload a food label or enter ingredients to detect potential allergens
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Text Input Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Analyze Ingredients Text</h2>
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            rows={5}
            placeholder="Enter ingredients list (e.g., milk, wheat flour, eggs, sugar...)"
            value={textInput}
            onChange={(e) => {
              setTextInput(e.target.value);
              setError(null);
            }}
            disabled={isAnalyzing}
          />
          <button
            onClick={analyzeText}
            disabled={isAnalyzing || !textInput.trim()}
            className={`mt-4 w-full py-2 px-4 rounded-md text-white font-medium ${
              isAnalyzing || !textInput.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {isAnalyzing ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Analyzing...
              </span>
            ) : (
              'Analyze Text'
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gray-50 px-2 text-sm text-gray-500">OR</span>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Food Label Image</h2>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {uploadedFile ? (
              <div className="space-y-4">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100">
                  <CheckCircle className="h-10 w-10 text-emerald-600" />
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-emerald-600">{uploadedFile.name}</span>
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Change File
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
                  <Upload className="h-10 w-10 text-gray-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-emerald-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isAnalyzing}
                />
                <label
                  htmlFor="file-upload"
                  className={`inline-block px-4 py-2 rounded-md text-sm font-medium ${
                    isAnalyzing
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
                  }`}
                >
                  Select Image
                </label>
              </div>
            )}
          </div>

          {uploadedFile && !analysisResult && (
            <button
              onClick={analyzeImage}
              disabled={isAnalyzing}
              className={`mt-6 w-full py-2 px-4 rounded-md text-white font-medium ${
                isAnalyzing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Analyzing Image...
                </span>
              ) : (
                'Detect Allergens'
              )}
            </button>
          )}
        </div>

        {/* Results Display */}
        {analysisResult && (
          <div className="bg-white shadow rounded-lg p-6 space-y-6">
            <div className="text-center">
              {analysisResult.safe ? (
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              ) : (
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                  <XCircle className="h-10 w-10 text-red-600" />
                </div>
              )}
              <h3 className={`mt-3 text-2xl font-bold ${
                analysisResult.safe ? 'text-green-600' : 'text-red-600'
              }`}>
                {analysisResult.safe ? 'No Allergens Detected' : 'Allergens Found'}
              </h3>
              <p className="text-gray-500">Confidence: {analysisResult.confidence}%</p>
            </div>

            {!analysisResult.safe && (
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-medium text-red-800 mb-3">Detected Allergens:</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.allergens.map((allergen, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm text-red-700">
                  ⚠️ This product contains ingredients that may cause allergic reactions.
                </p>
              </div>
            )}

            {analysisResult.rawText && (
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-800 mb-2">Analyzed Text:</h4>
                <div className="bg-gray-50 p-3 rounded-md overflow-auto max-h-40">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {analysisResult.rawText}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={resetAnalysis}
              className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Start New Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;