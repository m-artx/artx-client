import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, loginUser } from '../store/userSlice';
import instance from '../instance/instance';

//로그인 후 유저롤이 USER일때, ARTIST일때, ADMIN일때 상단 메뉴가 다 달라야한다.

function Header() {
    const navigate = useNavigate();
    const [dropdownVisibility, setDropdownVisibility] = React.useState(false);
    const { isLogin, username } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const localUsername = localStorage.getItem('username')
    console.log(localUsername)


    //토큰확인을 항상 처리해야하는지?

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            instance.get(`/api/users/${username}`)
                .then(response => {
                    // 토큰이 유효한 경우, 로그인 상태 유지
                    console.log('헤더 : 로그인 성공처리됨');
                    dispatch(loginUser({ response })); // response 데이터 구조에 맞게 조정.. 이부분 잘 모르겠음
                    navigate('/');

                })
                .catch(error => {
                    // 토큰이 유효하지 않은 경우, 로그아웃 처리
                    console.log('헤더 : 로그인 안됨');
                    dispatch(logoutUser());
                    localStorage.removeItem('accessToken');
                    navigate('/login');
                });
        }
    }, [dispatch, navigate]);


    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
        dispatch(logoutUser());
        navigate('/');
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
                <div className="ml-5"> {localUsername} 님</div>
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

    return (
        <div className=" w-screen max-w-[1300px] border border-red-400">
            {/* 작가센터, 관리자센터, 마이페이지 */}
            <div className="absolute flex w-screen h-[25px] max-w-[1300px] justify-between border text-gray-400">
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
