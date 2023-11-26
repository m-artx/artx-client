import React from 'react';

//본문 링크가 있어야 클릭하면 글에 들어가진다
//댓글도 보여야한다

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

export default dummyForBoard;
