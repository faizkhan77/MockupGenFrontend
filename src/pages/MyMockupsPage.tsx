import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, X, ZoomIn } from 'lucide-react'; // Import necessary icons

interface Mockup {
  id: number;
  prompt: string;
  base64_image: string;
}

const MyMockupsPage: React.FC = () => {
  const [mockups, setMockups] = useState<Mockup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewImg, setPreviewImg] = useState<string | null>(null); // State for the preview modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMockups = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch('http://127.0.0.1:8000/api/my-mockups', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to fetch mockups.');

        const data = await res.json();
        setMockups(data);
      } catch (error) {
        console.error(error);
        localStorage.removeItem('authToken');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMockups();
  }, [navigate]);
  
  // --- NEW: Handler Functions ---

  const handleDownload = (base64: string, prompt: string) => {
    const a = document.createElement("a");
    a.href = `data:image/png;base64,${base64}`;
    // Create a user-friendly filename from the prompt
    a.download = `${prompt.slice(0, 20).replace(/\s+/g, '_') || 'mockup'}.png`;
    a.click();
  };

  const handleShare = async (base64: string) => {
    try {
        const blob = await fetch(`data:image/png;base64,${base64}`).then((res) => res.blob());
        const file = new File([blob], "mockup.png", { type: blob.type });

        if (navigator.share && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: "AI Mockup",
                text: "Check out this AI-generated mockup!",
            });
        } else {
            alert("Sharing is not supported on this browser.");
        }
    } catch (err) {
        console.error("Share failed:", err)
        alert("Sharing failed. Please try again or use the download option.");
    }
  };
  
  // Effect to close the modal with the 'Escape' key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewImg(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
            <p className="text-xl text-cyan-400">Loading Your Mockups...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center relative overflow-hidden">
      <Navbar />
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center mt-24 mb-12 bg-gradient-to-b from-white to-cyan-400 bg-clip-text text-transparent z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Your Generated Mockups
      </motion.h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-6 z-10 pb-12">
        {mockups.length > 0 ? (
          mockups.map((mockup) => (
            <motion.div
              key={mockup.id}
              className="relative rounded-2xl overflow-hidden shadow-lg bg-[#1a1a1e] border border-gray-800 group cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setPreviewImg(mockup.base64_image)}
            >
              <img
                src={`data:image/png;base64,${mockup.base64_image}`}
                alt={mockup.prompt}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-gray-200 text-sm truncate font-medium">{mockup.prompt}</p>
              </div>
              
              {/* --- NEW: Hover Overlay with Buttons --- */}
              <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  title="Preview"
                  className="bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition-transform hover:scale-110"
                  onClick={(e) => { e.stopPropagation(); setPreviewImg(mockup.base64_image); }}
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  title="Download"
                  className="bg-cyan-600 hover:bg-cyan-500 p-3 rounded-full transition-transform hover:scale-110"
                  onClick={(e) => { e.stopPropagation(); handleDownload(mockup.base64_image, mockup.prompt); }}
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  title="Share"
                  className="bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition-transform hover:scale-110"
                  onClick={(e) => { e.stopPropagation(); handleShare(mockup.base64_image); }}
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full mt-10 text-lg">
            You haven't generated any mockups yet.
          </p>
        )}
      </div>

      {/* --- NEW: Preview Modal --- */}
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
              className="relative max-w-5xl w-[90%] rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking image
            >
              <img
                src={`data:image/png;base64,${previewImg}`}
                alt="Preview"
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setPreviewImg(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/75 p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default MyMockupsPage;