import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AlcCalculation from './components/AlcCalculation/AlcCalculation';
import PercentSRCalc from './components/PercentSRCalc/PercentSRCalc';
import SrCalc from './components/srCalc/SrCalc';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<PercentSRCalc />} />
        <Route path='sr auf||in' element={<PercentSRCalc />} />
        <Route path='alc' element={<AlcCalculation />} />
        <Route path='srCalc' element={<SrCalc />} />
    


       
      </Route>
    </Routes>
  );
};

export default App;