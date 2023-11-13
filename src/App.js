import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Layout from './components/shared/Layout';


//제품 라우터
import ArtPage from './pages/ArtPage';
import Product from './pages/Product';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductList from './pages/ProductList';
import ProductRegistrationPage from './pages/ProductRegistrationPage';


//유저 라우터
import SignUpPage from './pages/userPages/SignUpPage';
import LoginPage from './pages/userPages/LoginPage';
import ShoppingCart from './pages/ShoppingCart';
import OrderHistory from './pages/OrderHistory';
import ProductPage from './pages/ProductPage';
import MyPage from './pages/userPages/Mypage';
import MemberInfoPage from './pages/userPages/MemberInfoPage';
import Orderpage from './pages/Orderpage';
import Kakaologin from './pages/userPages/Kakaologin';
import KakaoAuth from './pages/userPages/KakaoAuth';
import ShippingInfo from './pages/ShippingInfo';
import Addaddress from './pages/Addaddress';
import KakaoSuccess from './pages/userPages/KakaoSuccess';
import KakaoFail from './pages/userPages/KakaoFail';
import CustomerCenter from "./pages/CustomerCenter";



//작가용
import ArtistRegistrationPage from './pages/userPages/ArtistRegistrationPage';
import ArtistProfilePage from './pages/userPages/ArtistProfilePage';
import ArtistsPage from "./pages/ArtistsPage";

//관리자용
import AdminPage from "./pages/AdminPage";


//아직 사용하지 않는 페이지
import DownloadPage from './pages/DownloadPage';
import ArtxPage from './pages/ArtxPage';
import Test from './pages/Test';
import NoticePage from "./pages/NoticePage";





function App() {
   return (
      <div>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<MainPage />} /> 

               {/* 제품 페이지 */}
               <Route path="/paint" element={<ArtPage />} /> {/* 작품관 */}
               <Route path="/product" element={<Product />} />
               <Route path="/productpage" element={<ProductPage />} />
               <Route path="/productdetail/:productId" element={<ProductDetailPage />} />
               <Route path="/ProductRegistration" element={<ProductRegistrationPage />} />


               {/* 유저 페이지 */}
               <Route path="/signup" element={<SignUpPage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/carts/:cartId" element={<ShoppingCart />} />
               <Route path="/orderhistory" element={<OrderHistory />} />
               <Route path="/mypage" element={<MyPage />} />
               <Route path="/member" element={<MemberInfoPage />} />
               <Route path="/order" element={<Orderpage />} />
               <Route path="/kakao" element={<Kakaologin />} />
               <Route path="/auth" element={<KakaoAuth />} />
               <Route path="/shippingInfo" element={<ShippingInfo />} />
               <Route path="/addaddress" element={<Addaddress />} />
               <Route path="/kakaosuccess" element={<KakaoSuccess />} />
               <Route path="/kakaofail" element={<KakaoFail />} />
               <Route path="/customer" element={<CustomerCenter />} />


               {/* 작가관련 페이지 */}
               <Route path="/ArtistRegistration" element={<ArtistRegistrationPage />} />
               <Route path="/ArtistProfile" element={<ArtistProfilePage />} />
               <Route path="/Artist" element={<ArtistsPage />} />

               {/* 관리자 페이지 */}
               <Route path="/admin" element={<AdminPage />} />
               <Route path="/notice" element={<NoticePage />} />


               {/* 현재 사용하지 않는 페이지 */}
               <Route path="/productslist/:productCategoryType" element={<ProductList />} />
               <Route path="/artx" element={<ArtxPage />} />
               <Route path="/download" element={<DownloadPage />} />
               <Route path="/test" element={<Test />} /> {/* 슬라이드 테스트. 임시. */}


            </Route>
         </Routes>
      </div>
   );
}
export default App;
