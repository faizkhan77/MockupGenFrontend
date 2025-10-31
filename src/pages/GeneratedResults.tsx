import React, { useState, useEffect, useCallback, useRef } from "react"; 
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RefreshCcw, Download, Share2, X } from "lucide-react";
import Navbar from "../components/Navbar";
import GeneratingLoader from "../components/GeneratingLoader";

const GeneratedResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { prompt, logo } = location.state || { prompt: "", logo: null };

  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const generationStarted = useRef(false);

  const runGeneration = useCallback(async () => {
    if (!prompt || !logo) {
      navigate("/generate");
      return;
    }

    setIsLoading(true);
    setImages([]);

    try {
      const blob = await fetch(logo).then((res) => res.blob());
      const logoFile = new File([blob], "logo.png", { type: blob.type });

      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("image", logoFile);

      const res = await fetch("http://127.0.0.1:8000/api/generate-mockups", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to generate mockups");

      const data = await res.json();
      setImages(data.images);
    } catch (err) {
      console.error("Error generating mockups:", err);
      alert("Mockup generation failed. Please try again.");
      navigate("/generate", { state: { prompt } });
    } finally {
      setIsLoading(false);
    }
  }, [prompt, logo, navigate]);

   useEffect(() => {
    // ✅ SOLUTION: Check the ref. If generation has already run, do nothing.
    // If not, run it and set the ref to true.
    if (!generationStarted.current) {
      generationStarted.current = true;
      runGeneration();
    }
  }, [runGeneration]);
  
  const handleRegenerate = () => runGeneration();
  const handleNewMockup = () => navigate("/generate");

  const handleDownload = (base64: string, index: number) => {
    const a = document.createElement("a");
    a.href = `data:image/png;base64,${base64}`;
    a.download = `mockup_${index + 1}.png`;
    a.click();
  };

  const handleShare = async (base64: string) => {
    const blob = await fetch(`data:image/png;base64,${base64}`).then((res) =>
      res.blob()
    );
    const file = new File([blob], "mockup.png", { type: blob.type });
    if (navigator.share) {
      await navigator.share({
        files: [file],
        title: "AI Mockup",
        text: "Check out this AI-generated mockup!",
      });
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewImg(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="scale-90">
            <GeneratingLoader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center relative overflow-hidden">
      <Navbar />

      {/* Aura background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08)_0%,rgba(0,0,50,0.7)_90%)] blur-3xl" />

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center mt-24 mb-12 bg-gradient-to-b from-white to-cyan-400 bg-clip-text text-transparent z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Your Generated Mockups
      </motion.h1>

      {/* Image grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-6 z-10">
        {images && images.length > 0 ? (
          images.map((imgSrc: string, idx: number) => (
            <motion.div
              key={idx}
              className="relative rounded-2xl overflow-hidden shadow-lg bg-[#1a1a1e] border border-gray-800 hover:scale-[1.03] transition-transform duration-300 cursor-pointer group"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setPreviewImg(imgSrc)}
            >
              <img
                src={`data:image/png;base64,${imgSrc}`}
                alt={`Mockup ${idx + 1}`}
                className="w-full h-auto object-cover"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(imgSrc, idx);
                  }}
                  className="bg-cyan-600 hover:bg-cyan-500 p-3 rounded-full"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(imgSrc);
                  }}
                  className="bg-gray-700 hover:bg-gray-600 p-3 rounded-full"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            No mockups found. Try generating again.
          </p>
        )}
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {previewImg && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImg(null)}
          >
            <motion.div
              className="relative max-w-5xl w-[90%] rounded-2xl overflow-hidden"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`data:image/png;base64,${previewImg}`}
                alt="Preview"
                className="w-full h-auto object-contain rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setPreviewImg(null)}
                className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 p-3 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-6 mt-16 mb-10 justify-center z-10">
        <button
          onClick={handleRegenerate}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-xl font-semibold transition"
        >
          <RefreshCcw className="w-5 h-5" /> Generate Again
        </button>
        <button
          onClick={handleNewMockup}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl font-semibold transition"
        >
          <ArrowLeft className="w-5 h-5" /> Generate New Mockup
        </button>
      </div>
    </main>
  );
};

export default GeneratedResults;
