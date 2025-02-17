import React, { useEffect, useState } from 'react'
import './Course.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Collapse, Image, Modal, Row, Spin, Typography } from 'antd';
import {
  UnorderedListOutlined,
  PieChartOutlined,
  YoutubeOutlined,
  ClockCircleFilled,
  LockFilled,
  CheckCircleTwoTone,
  PlayCircleOutlined,
  LineChartOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import Parser from 'html-react-parser';
import { getCourseBySlug } from './courseSlice';
import GoToTop from '../../components/GoToTop';
import RegisterCourse from './RegisterCourse';
import ReactPlayer from 'react-player'
import axios from 'axios';
import Info from './teacher/Info';
import { scrollToTop } from '../../utils/common';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

function CourseDetail() {
  let { slug } = useParams();
  const dispatch = useDispatch();
  const course = useSelector(state => state.courses.course);
  const loading = useSelector(state => state.courses.loading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoName, setVideoName] = useState('');
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    dispatch(getCourseBySlug({ slug }));
  }, [slug, dispatch]);

  React.useEffect(() => {
    if (slug) {
      scrollToTop(200);
    }
  }, [slug]);

  const onChange = (key) => {
    console.log(key);
  };

  const showModal = (lesson) => {
    console.log({ lesson });
    setIsModalOpen(true);
    setVideoUrl(lesson.video);
    setVideoName(lesson.name);
  }

  const handlePause = () => {
    setPlaying(false);
    console.log('ON PAUSE');
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setPlaying(false);
  };

  useEffect(() => {
    axios.get(`${videoUrl}`, {
      responseType: "blob"
    })
      .then(function (response) {
        console.log({ response });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [videoUrl])

  return (
    <>
      {
        loading ? (
          <div className="spin-loading-common">
            <Spin size="large" tip="Loading..." />
          </div>
        ) : (
          <div className='course-detail'>
            <Row className='course-detail-content'>
              <Col>
                <Typography>
                  <Title level={4}>{course?.data?.name}</Title>
                  <Paragraph style={{ fontSize: 16 }}>
                    {course?.data?.summary ? Parser(course?.data?.summary) : ''}
                  </Paragraph>
                </Typography>
                <Card title="Bạn sẽ học được gì?">
                  {
                    course?.data?.course_purpose &&
                    course?.data?.course_purpose.map((item, idx) =>
                      <React.Fragment key={item.url} >
                        <div className={`purpose_item ${idx === 0 ? 'purpose_item_first' : ''} ${idx === course?.data?.course_purpose.length - 1 ? 'purpose_item_last' : ''}`}>
                          <CheckCircleTwoTone key={idx} twoToneColor="#52c41a" style={{ marginRight: 15, fontSize: 'larger' }} />{item}<br />
                        </div>
                      </React.Fragment>)
                  }
                </Card>

                <GoToTop />

                <Typography>
                  <Title level={5} style={{ marginTop: 15, marginBottom: 15 }}>Nội dung khóa học</Title>

                  <Collapse defaultActiveKey={[course?.data?.chapters[0]?.id]} onChange={onChange}>
                    {
                      course?.data?.chapters.map(chapter => (
                        <Panel header={Parser(`<h5>${chapter.name}</h5>`)} key={chapter.name} extra={chapter.lesson_count + ' bài học'}>
                          {chapter?.lessons?.map(
                              (lesson, index) =>
                                <div key={index} className={`course__lesson_item ${index === 0 ? 'course__lesson_item_first' : ''} ${index === chapter.lessons.length - 1 ? 'course__lesson_item_last' : ''}`}>
                                  <div style={{ fontSize: 16, marginTop: 5, }}>
                                    {
                                      <>
                                        <LockFilled key={chapter.id} style={{ marginRight: 15, fontSize: 15, }} />
                                        {lesson.name}
                                      </>
                                    }
                                    <span style={{ float: 'right', marginRight: 10 }}>
                                      {
                                        lesson.is_free ? (
                                          <>
                                            <a onClick={() => showModal(lesson)}>Học Thử</a>
                                            <PlayCircleOutlined style={{ marginLeft: 10 }} />
                                          </>
                                        ) : (
                                          <LockFilled style={{ marginLeft: 10 }} />
                                        )
                                      }

                                    </span>
                                  </div>
                                  {
                                    <>
                                      <ClockCircleFilled key={chapter.id} style={{ marginRight: 15, fontSize: 15, }} /> <span>{lesson.duration}</span>
                                    </>
                                  }
                                </div>
                            )
                          }
                        </Panel>
                      ))
                    }
                  </Collapse>
                </Typography>
              </Col>
              <Col>
                <Image
                  width={'100%'}
                  src={course?.data?.thumbnail ? course?.data?.thumbnail : 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
                  preview={false}
                  style={{ borderRadius: 10 }}
                />

                <RegisterCourse slug={slug} price={course?.data?.price} is_selling={course?.data?.is_selling} />

                <div style={{ marginTop: 20, background: 'rgb(239, 239, 239)', padding: 20, borderRadius: 10 }}>
                  <p><strong style={{ fontSize: 18, textDecoration: 'underline' }}>Khoá học bao gồm</strong></p>
                  <div style={{fontSize: 15}}>
                    <p><ApartmentOutlined style={{ marginRight: 10 }} />Gồm {course?.data?.total_chapter} chương</p>
                    <p><PieChartOutlined style={{ marginRight: 10 }} />Tổng số {course?.data?.lesson_count} bài học</p>
                    <p><UnorderedListOutlined style={{ marginRight: 10 }} />Thời lượng {course?.data?.total_hour}</p>
                    <p><ClockCircleFilled style={{ marginRight: 10 }} />Học mọi lúc, mọi nơi</p>
                    <p><YoutubeOutlined style={{ marginRight: 10 }} />Học trên mọi thiết bị</p>
                    <p><LineChartOutlined style={{ marginRight: 10 }} />Cập nhật liên tục</p>
                  </div>
                </div>
              </Col>
            </Row>
            <Info course={course} />
          </div>
        )
      }

      <Modal
        title={videoName}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        style={{
          top: 30,
        }}>
        <ReactPlayer
          url={videoUrl}
          playing={playing}
          controls={true}
          width="100%"
          height="500px"
          loop={true}
          onContextMenu={e => e.preventDefault()}
          config={{ file: { attributes: { controlsList: 'nodownload' } } }}
          onPause={() => handlePause()}
        />
      </Modal>
    </>
  )
}

export default CourseDetail
