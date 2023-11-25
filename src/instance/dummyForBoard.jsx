import React from 'react';
import dummyForBoard from './dummyForBoard';

const ArtistProfilePage = () => {
    // 작가 정보를 받아오는 API 호출 등을 추가하세요
    const posts = dummyForBoard();

    return (
        <div className="bg-black min-h-screen flex items-center justify-center text-white">
            <div className="p-6 rounded-lg shadow-lg max-w-md w-full">
                {/* 작가 정보를 표시하는 부분 */}
                <h2 className="text-3xl font-semibold mb-4 text-center">작가 소개</h2>
                <div className="mb-4">
                    {/* 작가 이미지 */}
                    <img src="작가이미지URL" alt="작가이름" className="w-full h-64 object-cover rounded" />
                </div>
                <h3 className="text-xl font-semibold mb-2">작가 이름</h3>
                <p className="text-gray-500 mb-4">작가 소개 내용...</p>

                <div>
                    {/* 기본정보.. 채현님 와이어프레임 참고 */}
                    <div>기본정보.. 채현님 와이어프레임 참고</div>
                    <div>진행중인 커미션 보기 - 커미션 신청창</div>
                    <div>문의하기</div>
                </div>

                {/* 포스트 목록 표시 */}
                <div className="mt-6">
                    <h3 className="text-2xl font-semibold mb-4">최근 작성한 포스트</h3>
                    <ul>
                        {posts.map((post) => (
                            <li key={post.postId} className="mb-4">
                                <h4 className="text-lg font-semibold">{post.title}</h4>
                                <p className="text-gray-500">{post.content}</p>
                                <div className="flex justify-between mt-2">
                                    <span>{post.username}</span>
                                    <span>{post.publicationDate}</span>
                                </div>
                                {/* 링크를 추가하려면 적절한 방법으로 포스트의 세부 페이지로 이동할 수 있도록 링크를 추가하세요 */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ArtistProfilePage;
