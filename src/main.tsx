import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Translator from '@pages/translator/Translator.tsx';
import Game from '@pages/game/Game.tsx';
import { BrowserRouter, Routes, Route } from "react-router";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Game />} />
        <Route path='/translatr' element={<Translator />} />
        <Route path='*' element={<>404</>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
