import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import NewEra from '../components/NewEra';
import Showcase from '../components/Showcase';
import FeatureHighlight from '../components/FeatureHighlight';
import InteractiveGrid from '../components/InteractiveGrid';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <Hero />
      <NewEra />
      <Showcase/>
      <FeatureHighlight/>
      <InteractiveGrid/>
      <Footer/>
      
    </div>
  );
};

export default HomePage;