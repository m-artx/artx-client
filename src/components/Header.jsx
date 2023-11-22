import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, loginUser } from '../store/userSlice';
import MyPageDataFetcher from './shared/MyPageDataFetcher';

//로그인 후 유저롤이 USER일때, ARTIST일때, ADMIN일때 상단 메뉴가 다 달라야한다.
//드롭다운 경로 수정하고 고투페이지 필요한지, navigate('/')
//로그인이 되어있다면 로그인을 한 상태로 , 첫 로그인이라면 리덕스에 저장이 되고, 그상태에서 새로고침이라면...

function Header() {
    const navigate = useNavigate();
    const [dropdownVisibility, setDropdownVisibility] = React.useState(false);
    const { isLogin, userId, userRole } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const localUsername = localStorage.getItem('username');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await MyPageDataFetcher();
                if (data) {
                    const userInfo = data;
                    // console.log('data', data);
                    // console.log('userInfo', userInfo);
                    dispatch(
                        loginUser({
                            userId: userInfo.userId,
                            userRole: userInfo.userRole,
                        })
                    );
                }
            } catch (error) {
                // Handle error
                console.error('Failed to fetch data', error);
            }
        };

        fetchData();
    }, []);


        console.log('userId', userId);
        console.log('userRole', userRole);


    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
        dispatch(logoutUser());
        navigate('/login');
    };

    // 페이지 이동 함수
    const goToPage = (path) => {
        navigate(path);
    };

    // 마우스를 버튼 위에 올리면 드롭다운을 보여주는 함수
    const showDropdown = () => {
        setDropdownVisibility(true);
    };

    // 마우스를 버튼에서 치우면 드롭다운을 숨기는 함수
    const hideDropdown = () => {
        setDropdownVisibility(false);
    };

    //중앙메뉴
    function links() {
        return (
            <div className="flex justify-center text-center w-[300px] border ">
                <button className="pr-9" onClick={() => goToPage('/')}>
                    홈 화면
                </button>

                <div
                    className="px-9 relative flex justify-center text-center" // relative 위치를 준 이유는 Dropdown을 버튼에 대해 절대적 위치로 배치하기 위함입니다
                    onMouseEnter={showDropdown}
                    onMouseLeave={hideDropdown}
                >
                    <button onClick={() => goToPage('productslist/ALL')} className="">
                        작품관
                    </button>
                    {dropdownVisibility && (
                        <Dropdown>
                            <ul className="flex text-center border w-[250px] absolute p-2">
                                <li className="flex-1  border" onClick={() => goToPage('productslist/ALL')}>
                                    전체보기
                                </li>
                                <li className="flex-1  border" onClick={() => goToPage('productslist/PAINT')}>
                                    그림
                                </li>
                                <li className="flex-1  border" onClick={() => goToPage('productslist/CERAMIC')}>
                                    도자기
                                </li>
                                <li className="flex-1  border" onClick={() => goToPage('productslist/ETC')}>
                                    etc.
                                </li>
                            </ul>
                        </Dropdown>
                    )}
                </div>

                <button className="pl-9" onClick={() => goToPage('/test')}>
                    FAQ[test]
                </button>
            </div>
        );
    }

    const renderAuthButtons = () => {
        return isLogin ? (
            <div className="flex">
                <div className="ml-5"> "{localUsername}" 님</div>
                <button onClick={handleLogout} className="ml-5">
                    로그아웃
                </button>
            </div>
        ) : (
            <div className="flex">
                <Link to="signup">
                    <div className="ml-5">회원가입</div>
                </Link>
                <Link to="login">
                    <div className="ml-5">로그인</div>
                </Link>
            </div>
        );
    };

    const renderCentralMenu = () => {
        if (isLogin) {
            switch (userRole) {
                case 'USER':
                    return (
                        <div>
                            {/* Customer Center and My Page */}
                            <Link to="/customer">
                                <div className="px-4">고객센터</div>
                            </Link>
                            <Link to="/mypage">
                                <div className="px-4">MyPage</div>
                            </Link>
                        </div>
                    );
                case 'ARTIST':
                    return (
                        <div>
                            {/* Customer Center, My Page, and Writer Center */}
                            <Link to="/customer">
                                <div className="px-4">고객센터</div>
                            </Link>
                            <Link to="/mypage">
                                <div className="px-4">MyPage</div>
                            </Link>
                            <Link to="/writer">
                                <div className="px-4">작가센터</div>
                            </Link>
                        </div>
                    );
                case 'ADMIN':
                    return (
                        <div>
                            {/* Customer Center, My Page, Writer Center, and Admin Center */}
                            <Link to="/customer">
                                <div className="px-4">고객센터</div>
                            </Link>
                            <Link to="/mypage">
                                <div className="px-4">MyPage</div>
                            </Link>
                            <Link to="/writer">
                                <div className="px-4">작가센터</div>
                            </Link>
                            <Link to="/admin">
                                <div className="px-4">관리자센터</div>
                            </Link>
                        </div>
                    );
                default:
                    return null;
            }
        } else {
            // If the user is not logged in, only show the Customer Center
            return (
                <Link to="/customer">
                    <div className="px-4">고객센터</div>
                </Link>
            );
        }
    };

    return (
        <div className=" ">
            {/* 작가센터, 관리자센터, 마이페이지 */}
            <div className="absolute flex  h-[25px]  justify-between w-screen max-w-[1300px] border text-gray-500">
                <div className="flex border justify-end items-center ">
                    <Link to="/Artist">
                        <div className="px-4">작가센터</div>
                    </Link>
                    <Link to="/admin">
                        <div className="px-4">관리자센터</div>
                    </Link>
                </div>
                <div className="flex border">
                    <div>
                        <Link to="/customer">
                            <div className="px-4">고객센터</div>
                        </Link>
                    </div>
                    <div>
                        <Link to="/mypage">
                            <div className="px-4">마이페이지</div>
                        </Link>
                    </div>
                </div>

                {/* <div className="flex border justify-end items-center ">
                    {userRole === 'ARTIST' || userRole === 'ADMIN' ? (
                        <>
                            <Link to="/writer">
                                <div className="px-4">Writer Center</div>
                            </Link>
                            <Link to="/admin">
                                <div className="px-4">Admin Center</div>
                            </Link>
                        </>
                    ) : null}
                </div> */}
                {/* <div className="flex border">{renderCentralMenu()}</div> */}
            </div>
            {/* 기존 메뉴들 */}
            <div className="flex items-center border w-screen max-w-[1300px] h-[140px]">
                <div className="flex-1 text-lg border">
                    <Link to="/">
                        <div className="ml-20">artx*</div>
                    </Link>
                </div>
                <div className="flex-1 flex justify-center items-center text-sm">{links()}</div>
                <div className="flex-1 text-sm border">
                    <div className="flex justify-end mr-20">
                        {renderAuthButtons()}

                        {/* 카트 임시링크 */}
                        <Link to="/carts/1">
                            <div className="ml-5">장바구니</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
