import React, { useState } from 'react'
import { Avatar, Col, Row, Progress } from 'antd'
import { 
  UserOutlined,
  ArrowLeftOutlined,
  QuestionCircleOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import NoteList from '../pages/note/NoteList';
import { useDispatch, useSelector } from 'react-redux';
import { getNoteLists } from '../pages/note/noteSlice';
import Comment from '../pages/comment/Comment';
import TourGuide from './TourGuide';
import { setColCarouselContent, setColCarouselLeft, setIsLearningLayout } from '../app/appSlice';

function HeaderLearning(isMobile) {
  const [open, setOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [completedPercent, setCompletedPercent] = useState(0);
  const [completedLesson, setCompletedLesson] = useState(0);
  const [totalLesson, setTotalLesson] = useState(0);
  const [listsLearned, setListsLearned] = useState([]);

  const noteLists = useSelector(state => state.note.noteLists);
  const currentCourse = useSelector(state => state.courses.course);
  const currentLesson = useSelector(state => state.learning.latestLessonSelected);
  const setLearned = useSelector(state => state.learning.setLearned);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const showDrawerNote = () => {
    setOpen(true);
    if (noteLists.length === 0) {
      dispatch(getNoteLists(currentLesson.id));
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  const onCloseComment = () => {
    setOpenComment(false);
  }

  React.useEffect( () => {
    if (currentCourse) {
      const percent = Math.round((currentCourse?.data?.completed / currentCourse?.data?.lesson_count) * 100);
      setCompletedPercent(percent);
      setCompletedLesson(currentCourse?.data?.completed);
      setTotalLesson(currentCourse?.data?.lesson_count);
      setListsLearned(currentCourse?.data?.lists);
    }
  }, [currentCourse]);

  React.useEffect(() => {
    if (setLearned && listsLearned.indexOf(currentLesson.id) < 0) {
      setCompletedLesson(completedLesson + 1);
      setListsLearned([...listsLearned, currentLesson.id]);
    }
  }, [setLearned, currentCourse]);

  React.useEffect(() => {
    const percent = Math.round((completedLesson / totalLesson) * 100);
    setCompletedPercent(percent);
  }, [completedLesson])


  const showGuide = () => {
    setIsTourOpen(true)
  }

  const backToListCourses = () => {
    dispatch(setIsLearningLayout(false));
    dispatch(setColCarouselContent(19));
    dispatch(setColCarouselLeft(4));
    navigate('/courses/my-courses');
  }

  return (
    <>
      <Row className='header-learning'>
        <Col>
          <Col style={{ alignSelf: 'center' }}>
            <a onClick={() => backToListCourses()}>
              <ArrowLeftOutlined />
            </a>
          </Col>
          <Col>
            <a href="/">
              <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
            </a>
          </Col>
          <Col align="left" style={{ alignSelf: 'center' }}>{currentCourse?.data?.name}</Col>
        </Col>  
        <Col>
          <Col align="right" style={{ alignSelf: 'center' }}>
            <Progress type="circle" style={{ alignSelf: 'center' }} percent={completedPercent} width={40} />
            <span style={{ marginLeft: 10}}>{`${completedLesson}/${totalLesson} bài học`}</span>
          </Col>

          <Col align="right" style={{ alignSelf: 'center' }}>
          <FormOutlined />
            <a style={{ marginLeft: 10}} onClick={showDrawerNote} id="note">Ghi Chú</a>
          </Col>

          <Col align="right" className='guide' style={{ alignSelf: 'center', cursor: 'pointer', hover: true }} onClick={() => showGuide()}>
            <QuestionCircleOutlined />
            <span style={{ marginLeft: 5,}}><strong><i>Hướng Dẫn</i></strong></span>
          </Col>
        </Col>
      </Row>
      <NoteList open={open} setOpen={setOpen} onClose={onClose}/>
      <Comment openComment={openComment} setOpenComment={setOpenComment} onCloseComment={onCloseComment}/>
      <TourGuide isTourOpen={isTourOpen} setIsTourOpen={setIsTourOpen}/>
    </>
  )
}

export default HeaderLearning