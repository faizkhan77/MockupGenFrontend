import React from 'react';
import Navbar from '../components/Navbar';

const DemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-5xl font-bold">Demo Page (Coming Soon)</h1>
      </div>
    </div>
  );
};

export default DemoPage;