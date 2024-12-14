import React, { useEffect, useState } from 'react';
import { Button, Layout, Space } from 'antd';
import { StepForwardOutlined, StepBackwardOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeLesson, getNextPrevLesson, setLatestLessonSelected } from '../pages/learning/learningSlice';
import { setEmptyNoteLists } from '../pages/note/noteSlice';
import { setEmptyComments } from '../pages/comment/commentSlice';
const { Footer } = Layout;

function FooterLearning({isMobile, handleShowSidebar}) {
  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);

  const dispatch = useDispatch();
  const lessonNextPrev = useSelector(state => state.learning.lessonNextPrev);
  useEffect(() => {
    if (lessonNextPrev && !lessonNextPrev.prev_lesson) {
      setDisablePrev(true)
    } else {
      setDisablePrev(false)
    }

    if (lessonNextPrev && !lessonNextPrev.next_lesson) {
      setDisableNext(true)
    } else {
      setDisableNext(false)
    }
  }, [lessonNextPrev])

  const handleClickPreLesson = () => {
    if (lessonNextPrev.prev_lesson) {
      dispatch(changeLesson(lessonNextPrev.prev_lesson));
      dispatch(setEmptyNoteLists());
      dispatch(setEmptyComments());
      dispatch(getNextPrevLesson(lessonNextPrev.prev_lesson.uuid))
      const data = {
        course_id: lessonNextPrev?.prev_lesson?.course_id, uuid: lessonNextPrev.prev_lesson.uuid
      }
      dispatch(setLatestLessonSelected(data))
      // dispatch(setToFalseLearned());
    }
  }

  const handleClickNextLesson = () => {
    if (lessonNextPrev.next_lesson) {
      dispatch(changeLesson(lessonNextPrev.next_lesson));
      dispatch(setEmptyNoteLists());
      dispatch(setEmptyComments());
      dispatch(getNextPrevLesson(lessonNextPrev.next_lesson.uuid))
      const data = {
        course_id: lessonNextPrev?.next_lesson?.course_id, uuid: lessonNextPrev.next_lesson.uuid
      }
      dispatch(setLatestLessonSelected(data))
      // dispatch(setToFalseLearned());
    }
  }

  return (
    <Footer
      className="footer-learning"
      style={{
        textAlign: 'center',
        position: 'fixed',
        width: '100' + '%',
        bottom: 0
      }}
    >
  {isMobile ? (<div className='btn-sidebar' onClick={handleShowSidebar}>
    <span></span>
    <span></span>
    <span></span>
  </div>) : ''}
      <Space size="middle" className='footer-learning-btn'>
        <Button type="primary" icon={<StepBackwardOutlined />} onClick={() => handleClickPreLesson()} disabled={disablePrev}>
          BÀI TRƯỚC
        </Button>
        <Button type="primary" danger id='btnNextLesson' onClick={() => handleClickNextLesson()} disabled={disableNext}>
          BÀI TIẾP THEO
          <StepForwardOutlined />
        </Button>
      </Space>
    </Footer>
  )
}

export default FooterLearning
