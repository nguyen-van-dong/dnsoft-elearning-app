import React from 'react'
import { Button, Col, Result, Row, Typography } from 'antd'
import CourseTable from '../../user/CourseTable'
import { useSelector } from 'react-redux';
import { AUTHORIZATION, SERVER_URL } from '../../../const/common';
const { Title } = Typography;

function Course() {
  const courses = useSelector(state => state.user.courses);
  const auth = JSON.parse(localStorage.getItem(AUTHORIZATION) || '{}');
  return (
    <>
      {
        courses?.course_created?.length > 0 ?
          <Col span={24}>
            <Row style={{ marginTop: 20 }}>
              <Col span={24}>
                <Typography>
                  <Title level={4}>Tất cả các khoá học đã tạo</Title>
                </Typography>
              </Col>
            </Row>
            <CourseTable data={courses?.course_created} />
          </Col> :
          <Col span={24}>
            <Result
              title="Bạn chưa tạo khóa học nào!"
              extra={
                auth.is_teacher ? (
                  <a href={SERVER_URL + '/admin'}>
                  <Button type="primary" size="large" shape="round">
                    Tạo khóa học
                  </Button>
                </a>
                ) : (
                  <Button type="primary" href='/courses' size="large" shape="round">
                    Xem tất cả khóa học
                  </Button>
                )
              }
            />
          </Col>
      }
    </>
  )
}

export default Course
