import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DownloadPage from './pages/DownloadPage';
import ArtPage from './pages/ArtPage';
import LadingMobile from './pages/LandingMobilePage';
import ArtxPage from './pages/ArtxPage';

function App() {
  return (
    <div>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/art" element={<ArtPage />} />
        <Route path="/m.landing" element={<LadingMobile />} />
        <Route path="/artx" element={<ArtxPage />} />
      </Routes>
    </div>
  );
}

export default App;
