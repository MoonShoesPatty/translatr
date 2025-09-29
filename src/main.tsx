import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Translator from '@pages/translator/Translator.tsx';
import { BrowserRouter, Routes, Route } from "react-router";
import { MantineProvider } from '@mantine/core';
import { customTheme } from './theme/theme';
import '@mantine/core/styles.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={customTheme}>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Translator />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
)
