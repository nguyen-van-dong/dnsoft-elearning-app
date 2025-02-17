import { Image, Button, Col } from 'antd'
import { Link } from 'react-router-dom';
import CoursePrice from './../../components/Course/CoursePrice'

function GridView({ courses }) {
  return (
    courses?.length > 0 ? courses?.map(item => (
      <Col
        key={item.id}
        style={{marginBottom: 20}}
      >
        {
          <div className='course-list-image'>
            <Image
              width={'100%'}
              preview={
                !item.is_coming_soon ? {
                  getContainer: 'Course Page',
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
        }}><h3>
          {
            item.is_coming_soon ? <span style={{color: '#1890ff'}}>{item.name}</span> : <Link to={`/courses/` + item.slug}>{item.name}</Link>
          }
          </h3>
        </div>
        {
          item.is_coming_soon ? (
            <strong style={{fontSize: 20, color: 'rgb(245, 106, 0)'}}>COMING SOON</strong>
          ) : (
            <>
            <strong>{item.author}</strong> -
            <span style={{ marginLeft: 10 }}>{item.lesson_count} bài học</span>
            
            <CoursePrice item={item}/>

            </>
          )
        }
        
      </Col>
    )) : (
      <h3 style={{ marginTop: 30 }}>Không tìm thấy khoá học phù hợp</h3>
    )
  )
}

export default GridView