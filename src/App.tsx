import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CataloguePage } from './pages/CataloguePage';
import { DetailPage } from './pages/DetailPage';
import { loadFonts } from 'bootstrap-italia'
import { useEffect } from 'react';

export default function App() {

  useEffect(() => {
    loadFonts('');
  }, []);






  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CataloguePage />} />
        <Route path="/software/:slug" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
