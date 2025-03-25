"use client";
import { useState, useEffect } from "react";
import * as randomWordsModule from 'random-words';
import { Copy, RefreshCcw, Lock } from 'lucide-react';

export default function Home() {
  const [generatedText, setGeneratedText] = useState("");
  const [copied, setCopied] = useState(false);
 
  useEffect(() => {
    handleRegenerate();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
 
  const handleRegenerate = () => {
    let newText = '';
    let attempts = 0;
   
    while ((newText.length < 16 || newText.length > 20) && attempts < 10) {
      try {
        const words = getPassword(3);
        
        const capitalizedWords = words.map(word => capitalizeFirstLetter(word));
        
        const randomIndex = Math.floor(Math.random() * capitalizedWords.length);
        const randomNumber = Math.floor(Math.random() * 10); // 0-9
        const beforeOrAfter = Math.random() > 0.5;
        
        if (beforeOrAfter) {
          capitalizedWords[randomIndex] = randomNumber + capitalizedWords[randomIndex];
        } else {
          capitalizedWords[randomIndex] = capitalizedWords[randomIndex] + randomNumber;
        }
        
        newText = capitalizedWords.join('-');
      } catch (error) {
        newText = passwordFailsafe();
      }
      attempts++;
    }
  
    if (newText.length < 16 || newText.length > 20) {
      newText = passwordFailsafe();
    }
   
    setGeneratedText(newText);
    setCopied(false);
  };
 
  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const getPassword = (count) => {
    if (typeof randomWordsModule === 'function') {
      return randomWordsModule(count);
    } else if (typeof randomWordsModule.default === 'function') {
      return randomWordsModule.default(count);
    } else if (typeof randomWordsModule.generate === 'function') {
      return randomWordsModule.generate(count);
    }
    throw new Error("Could not find valid random-words function");
  };
  
  const passwordFailsafe = () => {
    const part1 = Math.random().toString(36).substring(2, 8);
    const part2 = Math.random().toString(36).substring(2, 8);
    const randomNumber = Math.floor(Math.random() * 10);
    
    if (Math.random() > 0.5) {
      return capitalizeFirstLetter(part1) + randomNumber + "-" + capitalizeFirstLetter(part2);
    } else {
      return capitalizeFirstLetter(part1) + "-" + capitalizeFirstLetter(part2) + randomNumber;
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url(https://www.otago.ac.nz/__data/assets/image/0035/568295/University-of-Otago-tohu-image-1880.jpg)",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 w-full max-w-md px-4">
        <h1 className="text-5xl font-bold text-center mb-6" style={{color: '#ffde46'}}>UOpass</h1>
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6 bg-gray-100 text-center relative">
            <div className="text-2xl font-mono text-gray-800 break-words">
              {generatedText}
              {copied && (
                <span className="absolute top-2 right-2 text-green-600 text-sm font-semibold animate-pulse">
                  Copied!
                </span>
              )}
            </div>
          </div>
          <div className="p-6 bg-white">
            <div className="grid grid-cols-3 gap-4">
              <button onClick={handleCopy} className="btn flex items-center justify-center gap-2"
                style={{
                  backgroundColor: '#000044', 
                  color: 'white',
                  borderColor: '#000044'
                }}
              >
                <Copy className="w-5 h-5" />
                Copy
              </button>
              <button onClick={handleRegenerate} className="btn flex items-center justify-center gap-2"
                style={{
                  backgroundColor: '#ee8a07', 
                  color: 'white',
                  borderColor: '#ee8a07'
                }}
              >
                <RefreshCcw className="w-5 h-5" />
                New
              </button>
              <button className="btn flex items-center justify-center gap-2"
                style={{
                  backgroundColor: '#ffde46', 
                  color: '#000044',
                  borderColor: '#ffde46'
                }}
              >
                <Lock className="w-5 h-5" />
                Encrypt
              </button>
            </div>
          </div>
        </div>
        <p className="text-white text-center mt-4 text-sm opacity-75" style={{color: '#ffde46'}}>
          Generate secure passwords with ease
        </p>
      </div>
    </div>
  );
}