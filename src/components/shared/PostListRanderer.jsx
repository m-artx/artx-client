import React from 'react'

function PostListRanderer({  boardData }) {
    const goToPath = (path) => {
        
    }
  return (
    <div className=" max-w-[1300px] ">
        <div className="w-full border">
            {boardData.map((post, idx) => (
                <div key={idx} className="m-3" onClick={() => {goToPath(post.postId)}}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>작성번호 {post.postId}</p>
                    <p>작성일 {post.publicationDate}</p>
                    <p>댓글 수 {post.commentsCount}</p>
                </div>
            ))}
        </div>
    </div>
);
}

export default PostListRanderer