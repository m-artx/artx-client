import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/shared/Login';

// 아이디와 비번을 입력받는다
// 아이디와 비밀번호 서버에 있는지 확인하고 각각의 값이 일치하는지 확인한다
// 예외처리 1. 없는 아이디는 없는 아이디라고 한다
//        2. 패스워드가 틀린경우 입력을 잘해달라고 한다
// 아이디가 일치하면 콘솔에 로그인완료를 띄운 뒤, 서버를 이용(?)하여 알맞은 데이터를 불러온 뒤 화면구성을 변경한다
//       1. 아이디가 관리자/작가/유저중 한사람인지 판단하고 연관된 헤더처리를 해준다.
//          (상단에 유저상태별 메뉴 추가, 장바구니부분 앞에 회원가입,로그인을 지우고 아이디를 띄운다.)

// 재영
// 유저아이디 따로 비번따로 요청하라
// 엑세스 토큰만 로컬에 저장해서 그걸 엑시오스 인터셉터 사용해서 모든 요청에 토큰을 보낸다
// 요청을 보냈다가 토큰이 오래되는 등 에러가 발생하면 리프레시토근이 남아있는데
// 리이슈(토큰 재발급 요청) 보내서 응답으로 또 새로운 엑세스 토큰을 로컬에 설정
// 이전에 요청을 한번더 다시해서 사용자가 계속 사이트를 이용(api호출 등)하도록
// 엑세스 토큰을 쓰게되면 유저아이디를 서버에서 쓰게된다. 그러면 뭐 수정해야할수도있다
// 리덕스는? 토큰자체는 관리를 할게없다. 하고싶은게 생긴다면.. 리덕스는 로그인관리x
// 리스폰스데이터중에 유지하고싶은걸 리덕스로 관리한다, 카트데이터정도
// 상태관리란 카트내용이 아니라 오더등에서 쓸수있게 하는게 리덕스로하는 상태관리. 오더페이지에서 겟으로 가져와서..쓰는 중앙저장소(프롭스대신)! 서버에서 저장된거 따로이다.

export default function LoginPage() {
    const navigate = useNavigate();
    const isLogin = useSelector((state) => state.user.isLogin);

    //로그인 상태라면 메인페이지로 연결된다.
    useEffect(() => {
        if (isLogin) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }, [isLogin, navigate]);

    return (
        <div className="flex justify-center items-center w-[1300px] p-10">
            <Login />
        </div>
    );
}
