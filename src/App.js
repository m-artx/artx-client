import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import DownloadPage from './components/DownloadPage';
import ArtPage from './components/ArtPage';
import ArtxPage from './components/ArtxPage';
import Layout from './components/shared/Layout';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 메인으로 받아오는 페이지는 메인페이지 */}
          <Route index element={<Main />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/art" element={<ArtPage />} />
          <Route path="/artx" element={<ArtxPage />} />
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
