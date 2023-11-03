import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DownloadPage from './pages/DownloadPage';
import ArtPage from './pages/ArtPage';
import ArtxPage from './pages/ArtxPage';
import Layout from './components/shared/Layout';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Product from './pages/Product';
import ShoppingCart from './pages/ShoppingCart';
import OrderHistory from './pages/OrderHistory';

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
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
