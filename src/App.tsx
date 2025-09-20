import { BrowserRouter, Routes, Route } from 'react-router';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import Translator from './pages/translator/Translator';
import Game from './pages/game/Game';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Translator />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;