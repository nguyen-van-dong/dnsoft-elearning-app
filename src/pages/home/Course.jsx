import React from 'react'
import { Button, Col, Image, Row } from 'antd'
import { Link } from 'react-router-dom'
import CoursePrice from './CoursePrice';

function Course({ courses }) {
  return (
    <Row className='course-list scroll-snap'>
      {
        courses?.map(item => (
          <Col
            key={item.id}
            className='course-list-item'
            style={{marginBottom: 20}}
          >
            {
              <div className='course-list-image'>
                <Image
                  width={'100%'}
                  preview={
                    !item.is_coming_soon ? {
                      getContainer: 'Home Page',
                      mask: <Link to={'/courses/' + item.slug}><Button className='course-list-btn'> Xem Chi Tiết </Button></Link>
                    } : false
                  }
                  src={item.thumbnail}
                />
              </div>
            }
            <div style={{
              paddingTop: 10,
              paddingRight: 10,
              cursor: 'pointer',
              fontSize: 16
            }}><h3>
                {
                  item.is_coming_soon ? <span style={{ color: '#1890ff' }}>{item.name}</span> : <Link to={`/courses/` + item.slug}>{item.name}</Link>
                }
              </h3>
            </div>
            {
              item.is_coming_soon ? (
                <strong style={{ fontSize: 20, color: 'rgb(245, 106, 0)' }}>COMING SOON</strong>
              ) : (
                <>
                  <strong>{item.author}</strong> -
                  <span style={{ marginLeft: 10 }}>{item.lesson_count} bài học</span>
                  
                  <CoursePrice item={item}/>

                </>
              )
            }
          </Col>
        ))
      }
    </Row>
  )
}

export default Course
