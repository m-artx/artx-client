import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DownloadPage from './pages/DownloadPage';
import ArtPage from './pages/ArtPage';
import ArtxPage from './pages/ArtxPage';
import Layout from './components/shared/Layout';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 메인으로 받아오는 페이지는 메인페이지 */}
          <Route index element={<MainPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/art" element={<ArtPage />} />
          <Route path="/artx" element={<ArtxPage />} />
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
