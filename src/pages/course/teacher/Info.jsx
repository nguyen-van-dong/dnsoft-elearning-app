import React, { useState } from 'react'
import { Button, Col, Image, Row, Space, Typography } from 'antd';
import {
  PlayCircleFilled,
} from '@ant-design/icons';
import Parser from 'html-react-parser';

const { Title } = Typography;

function Info({ course }) {

  const [showShortIntro, setShowShortIntro] = useState(true);

  return (
    <div className='course-detail-info'>
      <Row>
        <Col>
          <Typography>
            <Title level={4}>Thông tin giảng viên</Title>
          </Typography>
          <hr style={{ border: '#ececec 1px solid' }} />
        </Col>
      </Row>
      <Row className='course-info-desc'>
        <Col>
          <Image
            src={course?.data?.teacher?.avatar}
            style={{
              borderRadius: 15
            }}
            preview={false}
          />
          <div style={{
            fontSize: 18,
            marginTop: 10,
            marginBottom: 10
          }}>{course?.data?.teacher?.bio}</div>
          <p className='course-number'><PlayCircleFilled /> {course?.data?.teacher?.total_course} khoá học</p>
        </Col>
        <Col style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20,
          paddingTop: 10,
          background: 'rgb(249 249 249)',
          borderRadius: 15
        }}>
          <Typography>
            <Title level={3}>{course?.data?.teacher?.name}</Title>
            <i style={{
              fontSize: 17,
            }}>{course?.data?.teacher?.title}</i>
            <div style={{
              marginTop: 10,
            }}>
              {
                showShortIntro ? (
                  <div style={{ fontSize: 17 }}>
                    {course?.data?.teacher?.short_intro}
                  </div>
                ) : course?.data?.teacher?.introduce ? Parser(course?.data?.teacher?.introduce) : ''
              }
              <Space
                direction="vertical"
                style={{
                  width: '100%',
                  marginTop: 20
                }}>
                {
                  showShortIntro ? (
                    <Button type="primary" danger block size='large' onClick={() => setShowShortIntro(false)}>
                      Xem Thêm
                    </Button>
                  ) : (
                    <Button type="primary" danger block size='large' onClick={() => setShowShortIntro(true)}>
                      Thu Gọn
                    </Button>
                  )
                }
              </Space>
            </div>
          </Typography>
        </Col>
      </Row>
    </div>
  )
}

export default Info