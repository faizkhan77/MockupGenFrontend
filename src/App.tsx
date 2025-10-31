import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GeneratorPage from './pages/GeneratorPage';
import GeneratedResults from "./pages/GeneratedResults";
import MyMockupsPage from './pages/MyMockupsPage';
import PricingPage from './pages/PricingPage'; 
import DemoPage from './pages/DemoPage';  

function App() {
  return (
    // The background color is now set in the individual page/component for more control
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/generate" element={<GeneratorPage />} />
      <Route path="/results" element={<GeneratedResults />} />
      <Route path="/my-mockups" element={<MyMockupsPage />} />
       <Route path="/pricing" element={<PricingPage />} /> 
      <Route path="/demo" element={<DemoPage />} />      
    </Routes>
  );
}

export default App;