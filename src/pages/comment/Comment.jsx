import React, { useEffect, useState } from 'react'
import { Drawer, List, Popconfirm, Skeleton, Tag, message, Avatar } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from './commentSlice';
import CommentItem from './CommentItem';

function CommentPage({ openComment, setOpenComment, onCloseComment }) {

  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const dispatch = useDispatch();

  const comments = useSelector(state => state.comment.comments);
  const lesson = useSelector(state => state.note.lesson);

  // Case get notes list
  // useEffect(() => {
    // setData(noteLists.data)
    // setList(noteLists.data)
  //   setInitLoading(false)
  // }, [noteLists])

  // Case create new note
  // useEffect(() => {
  //   if (noteLists?.data && note?.data) {
  //     const item = {...note.data, lesson_name: lesson.name}
  //     const newObject = [...noteLists.data, item]
  //     setData(newObject)
  //     setList(newObject)
  //   }
  // }, [note])

  const confirm = (noteId) => {
    dispatch(deleteComment(noteId));
    message.info('Đã xóa bình luận.');
    // const newObject = [...noteLists.data];
    // const remainNote = newObject.filter(item => item.id !== noteId);
    // setData(remainNote)
    // setList(remainNote)
  };

  const loadMore = () => {}

  return (
    <Drawer title="20 Thảo luận" placement="right" onClose={onCloseComment} open={openComment} size={'large'}>
      <CommentItem>
        <CommentItem>
          <CommentItem />
        </CommentItem>
      </CommentItem>
    </Drawer>
  )
}

export default CommentPage