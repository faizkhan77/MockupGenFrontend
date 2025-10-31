import React from 'react';
import Navbar from '../components/Navbar';
import GeneratorInterface from '../components/GeneratorInterface';

const GeneratorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4">
      <Navbar />
      <GeneratorInterface />
    </div>
  );
};

export default GeneratorPage;