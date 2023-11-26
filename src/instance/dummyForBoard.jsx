import React from 'react';
import dummyForBoard from './dummyForBoard';

const ArtistProfilePage = () => {
    // 작가 정보를 받아오는 API 호출 등을 추가하세요
    const posts = dummyForBoard();


function dummyForBoard() {
    const posts = [
        {
            postId: 0,
            userId: 'dddd1',
            title: 'Lorem Ipsum Post 1',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            username: 'John Doe',
            publicationDate: '2023-11-15',
            commentsCount: 0,
        },
        {
            postId: 2,
            userId: 'dddd2',
            title: 'Lorem Ipsum Post 2',
            content: 'Nulla facilisi. Fusce ut nisi nec odio dapibus blandit.',
            username: 'Jane Smith',
            publicationDate: '2023-11-14',
            commentsCount: 8,
        },
        // {
        //     postId: 3,
        //     userId: 'dddd1',
        //     title: 'Lorem Ipsum Post 3',
        //     content: 'Suspendisse potenti. In in urna a libero lacinia suscipit.',
        //     username: 'David Johnson',
        //     publicationDate: '2023-11-13',
        //     commentsCount: 12,
        // },
        // {
        //     postId: 4,
        //     userId: 'dddd2',
        //     title: 'Lorem Ipsum Post 4',
        //     content: 'Nulla facilisi. Fusce ut nisi nec odio dapibus blandit.',
        //     username: 'Jane Smith',
        //     publicationDate: '2023-11-14',
        //     commentsCount: 8,
        // },
        // {
        //     postId: 5,
        //     userId: 'dddd1',
        //     title: 'Lorem Ipsum Post 5',
        //     content: 'Suspendisse potenti. In in urna a libero lacinia suscipit.',
        //     username: 'David Johnson',
        //     publicationDate: '2023-11-13',
        //     commentsCount: 12,
        // },
    ];
    return posts;
}


    //             <div>
    //                 {/* 기본정보.. 채현님 와이어프레임 참고 */}
    //                 <div>기본정보.. 채현님 와이어프레임 참고</div>
    //                 <div>진행중인 커미션 보기 - 커미션 신청창</div>
    //                 <div>문의하기</div>
    //             </div>

    //             {/* 포스트 목록 표시 */}
    //             <div className="mt-6">
    //                 <h3 className="text-2xl font-semibold mb-4">최근 작성한 포스트</h3>
    //                 <ul>
    //                     {posts.map((post) => (
    //                         <li key={post.postId} className="mb-4">
    //                             <h4 className="text-lg font-semibold">{post.title}</h4>
    //                             <p className="text-gray-500">{post.content}</p>
    //                             <div className="flex justify-between mt-2">
    //                                 <span>{post.username}</span>
    //                                 <span>{post.publicationDate}</span>
    //                             </div>
    //                             {/* 링크를 추가하려면 적절한 방법으로 포스트의 세부 페이지로 이동할 수 있도록 링크를 추가하세요 */}
    //                         </li>
    //                     ))}
    //                 </ul>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default ArtistProfilePage;
