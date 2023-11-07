import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Dropdown from './Dropdown';

//강의에서 말하는 APP부분

function Header() {
  const navigate = useNavigate();
  const [dropdownVisibility, setDropdownVisibility] = React.useState(false);

  // 페이지 이동 함수
  const goToPage = (path) => {
    navigate(path);
  };
  //카테고리 이동 함수
  const goToCategory = (path) => {
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

  // Links
  function links() {
    return (
      <div className="flex justify-center text-center text-sm w-[300px]  border ">
        <button className="pr-9" onClick={() => goToPage('/')}>
          홈 화면
        </button>

        <div
          className="px-9 relative flex justify-center text-center" // relative 위치를 준 이유는 Dropdown을 버튼에 대해 절대적 위치로 배치하기 위함입니다
          onMouseEnter={showDropdown}
          onMouseLeave={hideDropdown}
        >
          <button onClick={() => goToPage('/art')}className="">작품관</button>
          {dropdownVisibility && (
            <Dropdown>
              <ul className="flex text-center border w-[250px] absolute p-2">
                <li className="flex-1  border" onClick={() => goToCategory('productlist')}>그림</li>
                <li className="flex-1  border" onClick={() => goToCategory('ceramic')}>도자기</li>
                <li className="flex-1  border" onClick={() => goToCategory('etc')}>etc.</li>
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

  return (
    <div className="flex items-center  w-screen max-w-[1300px]">
      <div className="flex-1 text-lg border">
        <Link to="/">
          <div className="ml-20">artx*</div>
        </Link>
      </div>
      <div className="flex-1 flex justify-center items-center h-20 text-sm border">{links()}</div>
      <div className="flex-1 text-sm border">
        <div className="flex justify-end mr-20">
          <Link to="signup">
            <div className="ml-5">회원가입</div>
          </Link>
          <Link to="login">
            <div className="ml-5">로그인</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
