import React, { useEffect } from 'react'
import { Avatar, Badge, Button, Col, Divider, Image, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { getAllSliders, getAllReasonsLearn } from './homeSlice';
import './Home.css';
import { getAllPosts } from '../post/postSlice';
import { Link, useNavigate } from 'react-router-dom';
import { convertToSlug, showPostDetail } from '../../utils/common';
import { getAllCourses } from '../course/courseSlice';
import { UserOutlined, EyeOutlined, SendOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import CarouselSlide from './CarouselSlide';
import Course from './Course';
import Reason from './Reason';

function Home() {
  const slides = useSelector(state => state.home.slides);
  const reasonsLearn = useSelector(state => state.home.reasonsLearn);
  const posts = useSelector(state => state.posts.entities);
  const courses = useSelector(state => state.courses.entities);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slides?.data) {
      dispatch(getAllSliders());
    }
    if (!reasonsLearn?.data) {
      dispatch(getAllReasonsLearn());
    }
  }, [dispatch]);

  // useEffect(() => {
  //   if (!posts?.data) {
  //     const fetchData = async () => {
  //       dispatch(getAllPosts())
  //     }
  //     fetchData()
  //   }
  // }, [dispatch]);

  useEffect(() => {
    if (!courses?.data) {
      dispatch(getAllCourses());
    }
  }, [dispatch]);

  const handleClickPost = (item) => {
    showPostDetail(item);
    const slug = convertToSlug(item.url);
    navigate(`/posts/${slug}`);
  }

  const styles = {
    btnViewDetail: {
      backgroundColor: 'white',
      borderRadius: 15,
      border: '1px solid black',
      color: 'black',
      paddingTop: 9,
      paddingBottom: 30,
    },
  }

  const courseSelling = courses?.courses?.filter(item => item.is_selling === true);
  const courseFree = courses?.courses?.filter(item => item.is_selling === false);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>DnSoft Elearning - Trang chủ</title>
        <meta name="description" content="DnSoft Elearning. Hệ thống học online hiệu quả, chuyên nghiệp." />
      </Helmet>

      <CarouselSlide slides={slides} />

      <br />
      <Badge count={'Pro'} offset={[20, 10]}
        style={{
          backgroundColor: '#52c41a',
        }}>
        <h1 style={{ fontWeight: 700, marginBottom: 20 }} className='course-title'>Khoá học có phí</h1>
      </Badge>

      <Course courses={courseSelling} />

      {
        <>
          <Divider dashed />
          <Badge count={'Free'} offset={[20, 10]}
            style={{
              backgroundColor: '#52c41a',
            }}>
            <h1 style={{ fontWeight: 700, marginBottom: 20 }} className='course-title'>Khoá học Miễn Phí</h1>
          </Badge>
          <Row className='course-list scroll-snap'>
            {
              courseFree?.map(item => (
                <Col
                  key={item.id}
                  className='course-list-item'
                >
                  {
                    <div className='course-list-image'>
                      <Image
                        width={'100%'}
                        style={{
                          borderRadius: '15px',
                        }}
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
                  <p style={{
                    paddingTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10
                  }}><h3><Link to={`/courses/` + convertToSlug(item.url)}>{item.name}</Link></h3></p>
                  <Avatar
                    style={{
                      backgroundColor: '#f56a00',
                    }}
                    icon={<UserOutlined />}
                  />
                  <strong style={{ marginLeft: 10 }}>{item.author}</strong> -
                  &nbsp;<span style={{ marginLeft: 10 }}>{item.lesson_count} bài học</span>
                </Col>
              ))
            }
          </Row>
        </>
      }
      <Divider dashed />

      <Reason reasonsLearn={reasonsLearn} />

      <Divider dashed />
      <Badge count={'News'} offset={[25, 10]}
        style={{
          backgroundColor: '#f5222d',
        }}>
        <h1 className='course-title' style={{ fontWeight: 700 }}>Bài Viết Mới Nhất</h1>
      </Badge>
      

      <Divider dashed />
      <Row style={{ marginTop: 30 }}>
        <Col span={24} style={{ fontSize: 16, background: '#f4f4f4', padding: 20 }}>
          <h2 style={{ textTransform: 'uppercase', textAlign: 'center' }} className='course-title'><strong>Trở thành Giảng viên tại DnSoft eLearning</strong></h2>
          <div>
            Bạn có kiến thức chuyên môn sâu rộng? Bạn muốn chia sẻ kiến thức và kinh nghiệm của mình với người học trên toàn thế giới?
            Hãy cùng tham gia vào chương trình đăng ký làm giảng viên tại trung tâm chúng tôi!
            <br />
            <strong>Làm giảng viên tại trung tâm chúng tôi mang lại cho bạn những cơ hội hấp dẫn sau:</strong><br />
            <strong>Chia Sẻ Kiến Thức:</strong> Được làm giảng viên tại trung tâm, bạn sẽ có cơ hội truyền đạt kiến thức và kinh nghiệm của mình cho các học viên đang tìm kiếm sự học hỏi và phát triển.<br />
            <strong>Tự Do Thời Gian: </strong>Chúng tôi cung cấp mô hình linh hoạt, cho phép bạn quản lý thời gian dạy học dựa trên lịch trình cá nhân. Điều này giúp bạn duy trì sự cân bằng giữa cuộc sống cá nhân và công việc.<br />
            <strong>Hỗ Trợ Từ Chuyên Gia:</strong> Chúng tôi cam kết hỗ trợ bạn trong quá trình làm giảng viên. Bạn sẽ nhận được hỗ trợ về nội dung, công nghệ và hướng dẫn từ đội ngũ chuyên gia.<br />
          </div>
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <Link to={'/register/partner'} >
              <Button type="primary" icon={<SendOutlined />} htmlType="submit" size="large">
                ĐĂNG KÝ NGAY
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Home
