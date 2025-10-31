import React, { useState, useRef, ChangeEvent } from 'react';
import { Paperclip, Sparkles, ArrowUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const GeneratorInterface: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      console.log('Please select an image file.');
    }
  };

  const handleGenerateMockups = () => {
    if (!prompt || !logoFile || !logoPreview) {
      alert("Please upload a logo and enter a prompt.");
      return;
    }
  
    // Immediately navigate to the results page with the prompt and logo data URL
    navigate("/results", { state: { prompt, logo: logoPreview } });
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEnhancePrompt = async () => {
    if (!prompt) {
      alert('Please enter a prompt to enhance.');
      return;
    }
    setIsEnhancing(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPrompt(data.enhanced_prompt);

    } catch (error) {
      console.error("Error enhancing prompt:", error);
      alert("Failed to enhance prompt. Please check the console for errors.");
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <main className="w-full max-w-4xl flex flex-col items-center pt-32">
       <div className="flex items-center gap-2 border border-gray-700 rounded-full px-4 py-2 mb-8 text-sm">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <span>Powered by MockupGen AI</span>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold text-center mb-12 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
        Generate Stunning Mockups
        <br />
        from Your Logo
      </h1>

      <div className="w-full max-w-2xl p-[2px] rounded-xl animated-border-box">
        <div className="relative bg-[#1E1E22] rounded-[11px] p-4 flex flex-col min-h-[180px]">
          <AnimatePresence>
            {isEnhancing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#1E1E22]/80 backdrop-blur-sm flex items-center justify-center rounded-[11px] z-10"
              >
                <div className="flex items-center gap-3 text-cyan-400">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  <span className="font-semibold">Enhancing your idea...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your mockup idea — e.g. ‘t-shirt with minimalist design’, ‘logo on a ceramic cup’, or ‘sticker set for laptops’"
            className="flex-grow w-full bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none resize-none text-sm sm:text-base"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-4">
              <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="hidden" id="logo-upload"/>
              <label htmlFor="logo-upload" className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer transition-colors">
                <Paperclip className="w-5 h-5" />
                <span>Upload Logo</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <button
                title="Enhance prompt with AI"
                onClick={handleEnhancePrompt}
                disabled={isEnhancing}
                className="p-2 bg-gray-700/50 rounded-full hover:bg-gray-600/70 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </button>
              <button
                title="Generate Mockups"
                onClick={handleGenerateMockups}
                className="p-2 bg-gray-700/50 rounded-full hover:bg-gray-600/70 transition-colors"
              >
                <ArrowUp className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {logoPreview && (
        <div className="mt-8">
          <h3 className="text-center text-gray-400 mb-4">Logo Preview:</h3>
          <div className="relative w-32 h-32 border-2 border-dashed border-gray-600 rounded-lg flex justify-center items-center">
            <img src={logoPreview} alt="Logo Preview" className="max-w-full max-h-full rounded-md"/>
            <button onClick={removeLogo} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default GeneratorInterface;