import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from './userSlice';
import { Button, Col, Image, Result, Row, Spin, Typography, Progress, notification } from 'antd';
const { Title, Paragraph } = Typography;
import {
  RadarChartOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { setIsLearningLayout } from '../../app/appSlice';
import { AUTHORIZATION } from '../../const/common';
import CourseTable from './CourseTable';
import { setFalseEnrollFreeCourse } from '../order/orderSlice';
import { setTrueIsCourseValid } from '../course/courseSlice';

function Course() {
  const auth = JSON.parse(localStorage.getItem(AUTHORIZATION) || '{}');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courses = useSelector(state => state.user.courses)
  const loading = useSelector(state => state.user.loading)
  const enrollFreeCourse = useSelector(state => state.order.enrollFreeCourse);

  useEffect(() => {
    dispatch(getCourses());
    dispatch(setIsLearningLayout(false));
  }, [dispatch])

  useEffect(() => {
    if (enrollFreeCourse) {
      notification.success({
        message: `Bạn đã tham gia khoá học thành công. Hãy bắt đầu trải nghiệm nhé!`,
        placement: 'topRight',
        duration: 5
      });
      dispatch(setFalseEnrollFreeCourse())
    }
  }, [])

  const startLearning = (uuid) => {
    dispatch(setTrueIsCourseValid())
    navigate(`/learning/${uuid}`);
  };

  const styles = {
    btnStartLearning: {
      backgroundColor: 'white',
      borderRadius: 20,
      border: '1px solid black',
      color: 'black',
      paddingTop: 9,
      paddingBottom: 30,
    }
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Typography>
            <Title level={4}>Tất cả các khoá học đã mua</Title>
            <Paragraph style={{ fontSize: 16 }}>
              Danh sách các khoá học mà bạn đã đăng ký tại DnSoft Elearning. Đừng quên cố gắng và luyện tập mỗi ngày nhé.
              Chúc bạn có những trải nghiệm tuyệt vời khi học tập tại DnSoft Elearning - <strong>Hệ Thống Học Lập Trình Đơn Giản Hiệu Quả.</strong>
            </Paragraph>
          </Typography>
        </Col>
      </Row>
      {
        loading ? (
          <div className="spin-loading-common">
            <Spin size="large" tip="Loading..." />
          </div>
        ) : (
          <Row className='course-list'>
            {
              courses?.courses?.length > 0 ? courses?.courses?.map((course) => (
                <React.Fragment key={course.uuid}>
                  <Col key={course.uuid} className='course-list-item'>
                    <Image
                      width={'100%'}
                      src={course?.image ? course?.image : 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
                      preview={
                        course.is_actived ? {
                          getContainer: 'Dong Nguyen',
                          mask: <Button type="primary" key={course.uuid} ghost onClick={() => startLearning(course.course_uuid)} style={styles.btnStartLearning}> Bắt đầu học </Button>
                        } : false
                      }
                      key={course.uuid}
                      style={{ borderRadius: 10 }}
                    />
                    <div style={{ marginTop: 20, }} key={course.id}>
                      <p><RadarChartOutlined style={{ marginRight: 10 }} key={course.id} />{course?.course_name}</p>
                      {
                        course.is_actived ? <Progress percent={course.percent_completed} /> : <p style={{ color: 'red' }}>Vui lòng kích hoạt khoá học để bắt đầu học.</p>
                      }
                    </div>
                  </Col>
                </React.Fragment>
              )) :
                <>
                  <Col span={5}></Col>
                  <Col span={14}>
                    <Result
                      title="Bạn không có khóa học nào, vui lòng đăng ký"
                      extra={
                        <Button type="primary" href='/courses' size="large" shape="round">
                          Xem tất cả khóa học
                        </Button>
                      }
                    />
                  </Col>
                  <Col span={5}></Col>
                </>
            }
          </Row>
        )
      }
      {
        auth.is_teacher && courses?.course_created?.length > 0 ? (
          <>
          <hr style={{ marginTop: 20, border: '#ececec 1px solid' }}/>
            <Row style={{ marginTop: 20 }}>
              <Col span={24}>
                <Typography>
                  <Title level={4}>Tất cả các khoá học đã tạo</Title>
                </Typography>
              </Col>
            </Row>
            <Row>
              {
                courses?.course_created?.length > 0 ? 
                <Col span={24}>
                  <CourseTable data={courses?.course_created}/>
                </Col> :
                  <>
                    <Col span={5}></Col>
                    <Col span={14}>
                      <Result
                        title="Bạn chưa tạo khóa học nào!"
                        extra={
                          <Button type="primary" href='/courses' size="large" shape="round">
                            Xem tất cả khóa học
                          </Button>
                        }
                      />
                    </Col>
                    <Col span={5}></Col>
                  </>
              }
            </Row>
          </>
        ) : ('')
      }
    </>
  )
}

export default Course