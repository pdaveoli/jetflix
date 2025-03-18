'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ApiKeysPage() {
  const [geminiKey, setGeminiKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  
  const saveGeminiKey = async () => {
    setIsSaving(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/settings/gemini-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: geminiKey }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage('API key saved successfully!');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        setMessage('Failed to save API key. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Error saving API key:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">API Key Settings</h1>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Gemini AI API Key</h2>
        <p className="mb-4 text-sm text-gray-400">
          To enable personalized movie recommendations, enter your Gemini AI API key below.
          You can get a key from the <a href="https://ai.google.dev/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Google AI Studio</a>.
        </p>
        
        <div className="mb-4">
          <input
            type="password"
            value={geminiKey}
            onChange={(e) => setGeminiKey(e.target.value)}
            placeholder="Enter your Gemini API key"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {message && (
          <div className="mb-4 p-2 bg-gray-700 rounded text-center">
            {message}
          </div>
        )}
        
        <button
          onClick={saveGeminiKey}
          disabled={isSaving || !geminiKey}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save API Key'}
        </button>
      </div>
    </div>
  );
}