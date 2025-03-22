"use client";
import { useState, useEffect } from "react";
import * as randomWordsModule from 'random-words';

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
  
 // if the random-words module is not available, use a failsafe
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
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://www.otago.ac.nz/__data/assets/image/0035/568295/University-of-Otago-tohu-image-1880.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">UOpass</h1>
          <div className="card bg-base-100 w-120 shadow-lg">
            <figure>
              <div className="w-full p-4 text-lg font-mono text-center bg-gray-100 text-gray-800 rounded-t-lg relative">
                {generatedText}
                {copied && (
                  <span className="absolute top-1 right-2 text-green-600 text-sm font-semibold animate-fade-in-out">
                    ✓ Copied!
                  </span>
                )}
              </div>
            </figure>
            <div className="card-body">
              <div className="card-actions flex justify-center">
                <button className="btn btn-primary" onClick={handleCopy}>
                  Copy to Clipboard
                </button>
                <button className="btn btn-accent" onClick={handleRegenerate}>
                  Regenerate
                </button>
                <button className="btn btn-secondary">
                  Encrypt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}