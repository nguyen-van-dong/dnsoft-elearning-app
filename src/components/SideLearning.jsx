
import React, { useEffect } from 'react'
import '../pages/learning/Learning.css'
import { Checkbox, Collapse, Spin, Typography } from 'antd';
import {
  ClockCircleFilled,
  FileTextOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Parser from 'html-react-parser';
import { setEmptyNoteLists } from '../pages/note/noteSlice';
import { changeLesson, getLatestLessonSelected, getNextPrevLesson, setLatestLessonSelected, setLearnedLesson, setToFalseLearned } from '../pages/learning/learningSlice';
import { setEmptyComments } from '../pages/comment/commentSlice';
import { setColCarouselContent, setColCarouselLeft, setMarginLeft } from '../app/appSlice';

const { Title } = Typography;
const { Panel } = Collapse;

function SideLearning({isMobile,handleCloseSidebarLearning}) {
  const dispatch = useDispatch();
  const course = useSelector(state => state.courses.course);
  const loading = useSelector(state => state.courses.loading);
  const currentLessonSelected = useSelector(state => state.learning.latestLessonSelected);

  const [collapsedLesson, setCollapsedLesson] = React.useState([course?.data?.chapters[0]?.id])
  const [checkedList, setCheckedList] = React.useState([])

  React.useEffect(() => {
    dispatch(setColCarouselContent(17));
    dispatch(setColCarouselLeft(6));
    dispatch(setMarginLeft(30));
  });

  React.useEffect(() => {
    if (course?.data?.id) {
      dispatch(getLatestLessonSelected(course.data.id));
    }
    setCheckedList(course?.data?.lists);
  }, [course]);

  const onChange = (activeKey) => {
    setCollapsedLesson(activeKey)
  }

  const selectLesson = (lesson) => {
    if (lesson.id !== currentLessonSelected.id) {
      dispatch(changeLesson(lesson));
      dispatch(setEmptyNoteLists());
      dispatch(setEmptyComments());
      dispatch(getNextPrevLesson(lesson.uuid));
      const data = {
        course_id: course?.data?.id,
        uuid: lesson.uuid,
      }
      dispatch(setLatestLessonSelected(data));
      dispatch(setToFalseLearned());
    }
  }

  const titleStyle = {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 16,
    backgroundColor: 'aliceblue'
  }

  useEffect(() => {
    if (currentLessonSelected?.chapter_id) {
      setCollapsedLesson(currentLessonSelected.chapter_id);
    }
  }, [currentLessonSelected])

  const maskLearnedLesson = (e) => {
    const lessonId = parseInt(e.target.value);
    const newCheckedLists = [...checkedList];
    if (newCheckedLists.includes(lessonId)) {
      const index = newCheckedLists.indexOf(lessonId);
      newCheckedLists.splice(index, 1);
    } else {
      newCheckedLists.push(lessonId);
    }
    setCheckedList(newCheckedLists);

    dispatch(setLearnedLesson({
      course_id: currentLessonSelected.course_id,
      lesson_id: lessonId,
    }));
  }

  return (
    <>
      {
        loading ? (
          <div className="text-center">
            <Spin size="large" tip="Loading..." />
          </div>
        ) : (
          <Typography className='learning-top'>
            <Title  className="learning-title" level={5} style={titleStyle}>
              <span>Nội dung khóa học</span>
              {isMobile ? <div className='btn-close-sidebar' onClick={handleCloseSidebarLearning}>
                <span></span>
                <span></span>
              </div> : ''}
              
            </Title>
            <Collapse activeKey={collapsedLesson} onChange={onChange} className="course-content">
              {
                course?.data?.chapters.map(chapter => {
                  return (
                    <Panel header={Parser(`<h5>${chapter.name}</h5>`)} key={chapter.id} extra={2 + ' / ' + chapter.lesson_count}>
                      {
                        chapter?.lessons?.map(
                          (lesson, index) =>
                            <div
                              onClick={() => selectLesson(lesson)}
                              key={lesson.id}
                              className={`lesson-item ${(currentLessonSelected?.uuid === lesson.uuid) ? 'active' : ''} ${index === 0 ? 'lesson-first' : ''} ${index === chapter.lessons.length - 1 ? 'lesson-last' : ''}`}
                            >
                              <div style={{ fontSize: 16, marginTop: 5, }} onClick={handleCloseSidebarLearning}>
                                {
                                  <>
                                    <Checkbox
                                      value={lesson.id}
                                      checked={checkedList?.some(item => item == lesson.id)}
                                      onChange={maskLearnedLesson}
                                      style={{ marginRight: 15, marginLeft: 6 }}
                                    ></Checkbox>
                                    <a onClick={() => selectLesson(lesson)}>{lesson.name}</a>
                                  </>
                                }
                              </div>
                              {
                                lesson?.duration ? (
                                  <>
                                    <ClockCircleFilled key={chapter.id} style={{ marginRight: 10, marginLeft: 6, fontSize: 15, }} /> <span>{lesson.duration}</span>
                                  </>
                                ) : ''
                              }
                              {
                                lesson?.type == 'file' ? (
                                  <><FileTextOutlined key={chapter.id} style={{ marginRight: 15, marginLeft: 6, fontSize: 15, }} />Document</>
                                ) : ''
                              }
                            </div>
                        )
                      }
                    </Panel>
                  )
                })
              }
            </Collapse>
          </Typography>
        )
      }
    </>
  )
}

export default SideLearning
