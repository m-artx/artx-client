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
import KakaoCancel from './pages/userPages/KakaoCancel';
import CustomerCenter from './pages/CustomerCenter';
import CustomerPersonal from './pages/CustomerPersonal';

//작가용
import ArtistRegistrationPage from './pages/userPages/ArtistRegistrationPage';
import ArtistProfilePage from './pages/userPages/ArtistProfilePage';
import ArtistsPage from './pages/ArtistsPage';

//관리자용
import AdminPage from './pages/AdminPage';
import ArtistManagement from './pages/admin/ArtistManagement';
import OrderManagement from './pages/admin/OrderManagement';
import ShippingManagement from './pages/admin/ShippingManagement';
import UserManagement from './pages/admin/UserManagement';
import AnnouncementManagement from './pages/admin/AnnouncementManagement';

//아직 사용하지 않는 페이지
import DownloadPage from './pages/DownloadPage';
import ArtxPage from './pages/ArtxPage';
import Test from './pages/Test';
import NoticePage from './pages/NoticePage';
import InquiryManagement from './pages/InquiryManagement';
import InquiryFormPage from './pages/InquiryFormPage';

//마이페이지
import PersonalInfo from './pages/myPages/PersonalInfo';
import PersonalQA from './pages/myPages/PersonalQA';
import Post from './components/shared/Post';
import ArtistDelivery from './pages/ArtistDelivery';

import MyPageAddress from './pages/MyPageAddress';



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
                    <Route path="/productslist/:productCategory" element={<ProductList />} />
                    <Route path="/productslist/" element={<ProductList />} />
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
                    <Route path="/success" element={<KakaoSuccess />} />
                    <Route path="/kakaofail" element={<KakaoFail />} />
                    <Route path="/kakaocancel" element={<KakaoCancel />} />
                    <Route path="/customer" element={<CustomerCenter />} />
                    {/* 작가관련 페이지 */}
                    <Route path="/ArtistRegistration" element={<ArtistRegistrationPage />} />
                    <Route path="/artistprofile" element={<ArtistProfilePage />} />
                    <Route path="/Artist" element={<ArtistsPage />} />
                    <Route path="/inquirymanagement" element={<InquiryManagement />} />
                    <Route path="/inquiry" element={<InquiryFormPage />} />
                    <Route path="/artistdelivery" element={<ArtistDelivery />} />
                    {/* 관리자 페이지 */}
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/notice" element={<NoticePage />} />
                    
                    <Route path="/artistmanagement" element={<ArtistManagement/>} />
                    <Route path="/announcementmanagement" element={<AnnouncementManagement />} />
                    <Route path="/ordermanagement" element={<OrderManagement/>} />
                    <Route path="/shippingmanagement" element={<ShippingManagement />} />
                    <Route path="/usermanagement" element={<UserManagement/>} />

                    {/* 현재 사용하지 않는 페이지 */}
                    <Route path="/artx" element={<ArtxPage />} />
                    <Route path="/download" element={<DownloadPage />} />
                    <Route path="/test" element={<Test />} /> {/* 슬라이드 테스트. 임시. */}
                    {/* 마이페이지 */}
                    {/* 개인정보관리 */}
                    <Route path="/personalinfo" element={<PersonalInfo />} />
                    <Route path="/customerPersonal" element={<CustomerPersonal />} />

                    <Route path="/mypageaddress" element={<MyPageAddress />} />

                    {/* 문의경로 */}
                    <Route path="/porsonalQA" element={<PersonalQA />} />
                    <Route path="/porsonalQA/:postId" element={<Post />} />
                    
                </Route>
            </Routes>
        </div>
    );
}
export default App;
