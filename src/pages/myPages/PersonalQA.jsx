import React from 'react';
import dummyForBoard from '../../instance/dummyForBoard';
import PostListRanderer from "../../components/shared/PostListRanderer";

function PersonalQA() {
    // const localUsername = localStorage.getItem('username')
    const localUsername = 'user1(하드코딩)';
    const boardData = dummyForBoard();

    //유저셀렉터로 전역저장된 userId 가져오기 userId로 게시글 검색한뒤 반환하기
    const userId = 'dddd1';
    console.log('boardData', boardData);

    //아이디로 데이터 필터링
    const userPosts = boardData.filter((post) => post.userId === userId);

    return (
        <div className=" ">
            <div className="border w-[500px] h-[500px]">
                <div className="p-6">
                    <p>{localUsername} 님의 문의 내역</p>
                    <p className="text-gray-500">
                        전체공지 및 자주묻는 질문은 상단의 '고객센터' 메뉴에서 확인하실 수 있습니다.
                    </p>
                </div>
                <div className="w-full border">
                   <PostListRanderer boardData={userPosts} />
                </div>
            </div>
        </div>
    );
}

export default PersonalQA;
