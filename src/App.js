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
import Test from './pages/Test';
import ProductList from './pages/ProductList';
import MyPage from './pages/Mypage';
import MemberInfoPage from './pages/MemberInfoPage';
import Orderpage from './pages/Orderpage';
import ProductRegistrationPage from './pages/ProductRegistrationPage';
import ArtistRegistrationPage from './pages/ArtistRegistrationPage';
import ArtistProfilePage from './pages/ArtistProfilePage';
import Kakaologin from './pages/Kakaologin';
import KakaoAuth from './pages/KakaoAuth';
import ShippingInfo from './pages/ShippingInfo';
import Addaddress from './pages/Addaddress';
import KakaoSuccess from './pages/KakaoSuccess';
import KakaoFail from './pages/KakaoFail';

function App() {
   return (
      <div>
         <Routes>
            <Route path="/" element={<Layout />}>
               {/* 메인으로 받아오는 페이지는 메인페이지 */}
               <Route index element={<MainPage />} /> {/*메인페이지 */}
               <Route path="/paint" element={<ArtPage />} /> {/* 작품관 */}
               {/*작품관 하부 페이지 도자기, 그림, 기타로 연결*/}
               {/* <Route path="/productlist" element={<ProductList />} />  */}
               <Route path="/productslist/:productCategoryType" element={<ProductList />} />
               <Route path="/signup" element={<SignUpPage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/artx" element={<ArtxPage />} />
               <Route path="/download" element={<DownloadPage />} />
               <Route path="/product" element={<Product />} />
               <Route path="/carts/:cartId" element={<ShoppingCart />} />
               <Route path="/orderhistory" element={<OrderHistory />} />
               <Route path="/productpage" element={<ProductPage />} />
               {/* <Route path="/productdetail" element={<ProductDetailPage />} /> */}
               <Route path="/productdetail/:productId" element={<ProductDetailPage />} />
               <Route path="/test" element={<Test />} /> {/* 슬라이드 테스트. 임시. */}
               <Route path="/mypage" element={<MyPage />} />
               <Route path="/member" element={<MemberInfoPage />} />
               <Route path="/order" element={<Orderpage />} />
               <Route path="/ProductRegistration" element={<ProductRegistrationPage />} />
               <Route path="/ArtistRegistration" element={<ArtistRegistrationPage />} />
               <Route path="/ArtistProfile" element={<ArtistProfilePage />} />
               <Route path="/kakao" element={<Kakaologin />} />
               <Route path="/auth" element={<KakaoAuth />} />
               <Route path="/shippingInfo" element={<ShippingInfo />} />
               <Route path="/addaddress" element={<Addaddress />} />
               <Route path="/kakaosuccess" element={<KakaoSuccess />} />
               <Route path="/kakaofail" element={<KakaoFail />} />
            </Route>
         </Routes>
      </div>
   );
}
export default App;
