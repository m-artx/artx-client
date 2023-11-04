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
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Test from "./pages/Test";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 메인으로 받아오는 페이지는 메인페이지 */}
          <Route index element={<MainPage />} /> { /*메인페이지 */}
          <Route path="/art" element={<ArtPage />} /> { /* 작품관 */}

          <Route path="/test" element={<Test />} /> { /* 슬라이드 테스트. 임시. */}


          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/artx" element={<ArtxPage />} />

          <Route path="/download" element={<DownloadPage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/productpage" element={<ProductPage />} />
          <Route path="/productdetail" element={<ProductDetailPage />} />
          <Route path="/productdetail/:productId" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
