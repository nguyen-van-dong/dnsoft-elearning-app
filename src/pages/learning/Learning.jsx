import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setIsLearningLayout } from '../../app/appSlice';
import { getCourseByUuid, setTrueIsCourseValid } from '../course/courseSlice';
import { getNextPrevLesson } from './learningSlice';
import VideoLesson from './VideoLesson';
import { Row, notification } from 'antd';
import FileLesson from './FileLesson';
import QuizLesson from './QuizLesson';
import Information from './Information';

function Learning() {
  const { uuid } = useParams();
  const dispatch = useDispatch();

  const isCourseValid = useSelector(state => state.courses.isCourseValid);
  const currentLesson = useSelector(state => state.learning.latestLessonSelected);

  React.useEffect(() => {
    if (currentLesson) {
      dispatch(getNextPrevLesson(currentLesson?.uuid))
    }
  }, [currentLesson])

  React.useEffect(() => {
    if (!isCourseValid) {
      notification.error({
        message: `Bạn chưa đăng ký khoá học này, vui lòng đăng ký để được học!`,
        placement: 'topRight',
        duration: 5
      });
      dispatch(setTrueIsCourseValid())
    }
  }, [])

  React.useEffect(() => {
    dispatch(setIsLearningLayout(true));
  }, [dispatch])

  React.useEffect(() => {
    dispatch(getCourseByUuid({ uuid }));
  }, [uuid, dispatch]);

  return (
    <div className='learning'>
      {
        currentLesson?.type == 'video' ? (
          <VideoLesson currentLesson={currentLesson} />
        ) : currentLesson?.type == 'file' ? (
          <FileLesson currentLesson={currentLesson} />
        ) : currentLesson?.type == 'quiz' ? (
          <QuizLesson currentLesson={currentLesson} />
        ) : ''
      }
      <Row >
        <Information />
      </Row>
    </div>
  )
}

export default Learning
