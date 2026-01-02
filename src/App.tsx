import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AlcCalculation from './components/AlcCalculation/AlcCalculation';
import PercentSRCalc from './components/PercentSRCalc/PercentSRCalc';
import SrCalc from './components/srCalc/SrCalc';
import MultiWineCalc from './components/MultiWineCalc/MultiWineCalc';
import Home from './components/Home/Home';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/sr-rechner-auf-in' element={<PercentSRCalc />} />
        <Route path='/alkohol-umrechner' element={<AlcCalculation />} />
        <Route path='/sr-verschnitt-rechner' element={<SrCalc />} />
        <Route path='/mehrfach-verschnitt' element={<MultiWineCalc />} />
    


       
      </Route>
    </Routes>
  );
};

export default App;