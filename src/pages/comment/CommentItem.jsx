import React from 'react'
import { Avatar } from 'antd'

function CommentItem({ children }) {
  return (
    <>
      {/* <Comment
        actions={[
          <span key="comment-nested-reply-to">Thích</span>,
          <span key="comment-nested-reply-to">Trả lời</span>,
          <span key="comment-nested-reply-to">2 tháng trước</span>
        ]}
        author={<a>Han Solo</a>}
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure).
          </p>
        }
      >
        {children}
      </Comment> */}
    </>
  )
}

export default CommentItem