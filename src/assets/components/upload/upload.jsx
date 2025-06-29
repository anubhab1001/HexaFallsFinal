// src/pages/UploadPage.jsx

import React, { useState, useCallback } from 'react';
import { XCircle, Loader2, CheckCircle } from 'lucide-react';

const UploadPage = () => {
  const [textInput, setTextInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [apiEndpoint] = useState("http://127.0.0.1:5000");

  const resetAnalysis = () => {
    setTextInput("");
    setAnalysisResult(null);
    setError(null);
  };

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: textInput }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      setAnalysisResult({
        safe: Object.keys(data.prediction)[0] === "No allergens detected",
        allergens: Object.keys(data.prediction),
        confidence: data.confidence || 95,
        rawText: textInput
      });

    } catch (err) {
      setError(err.message || "Analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  }, [textInput, apiEndpoint]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">SafeBite Allergen Detection</h1>
          <p className="text-gray-600 mt-2">Enter food ingredients to detect potential allergens</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6">
          <textarea
            rows={5}
            placeholder="Enter ingredients (e.g. milk, eggs, wheat, peanuts...)"
            value={textInput}
            onChange={(e) => {
              setTextInput(e.target.value);
              setError(null);
            }}
            disabled={isAnalyzing}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-emerald-500"
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

        {analysisResult && (
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <div className="text-center">
              <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${
                analysisResult.safe ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {analysisResult.safe ? (
                  <CheckCircle className="h-10 w-10 text-green-600" />
                ) : (
                  <XCircle className="h-10 w-10 text-red-600" />
                )}
              </div>
              <h3 className={`mt-3 text-2xl font-bold ${
                analysisResult.safe ? 'text-green-600' : 'text-red-600'
              }`}>
                {analysisResult.safe ? 'No Allergens Detected' : 'Allergens Found'}
              </h3>
              <p className="text-gray-500">Confidence: {analysisResult.confidence}%</p>
            </div>

            {!analysisResult.safe && (
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Detected Allergens:</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.allergens.map((allergen, idx) => (
                    <span key={idx} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-800 mb-1">Analyzed Text:</h4>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{analysisResult.rawText}</p>
            </div>

            <button
              onClick={resetAnalysis}
              className="w-full py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
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
