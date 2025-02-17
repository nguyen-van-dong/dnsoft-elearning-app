import { useEffect } from 'react'
import {
  NotificationTwoTone,
  UnorderedListOutlined,
  PieChartOutlined,
  ApartmentOutlined,
  ClockCircleFilled,
  PhoneOutlined,
  MailOutlined,
  HeatMapOutlined,
  ArrowRightOutlined,
  YoutubeOutlined,
  LineChartOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';
import { Button, Alert, Card, Col, Divider, Row, Space, Typography, Input, Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import Payment from './Payment';
import { getCourseBySlug } from '../course/courseSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Parser from 'html-react-parser';
import {
  applyCoupon,
  getCouponByCourseId,
  removeCouponApplied,
  setNullErrorApplyCoupon
} from './couponSlice';
import { toast } from 'react-toastify';
import { handleEnrollFreeCourse } from './orderSlice';
import useCookie from '../../hooks/useCookie';

const { Title, Paragraph } = Typography;
const { Search } = Input;

const styles = {
  cardCourseInfo: {
    background: '#efefef',
    borderRadius: 10
  }
}

function Order() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const course = useSelector(state => state.courses.course);
  const coupon = useSelector(state => state.coupon.couponApplied);
  const errorApplyCoupon = useSelector(state => state.coupon.errorApplyCoupon);
  const enrollFreeCourse = useSelector(state => state.order.enrollFreeCourse);
  const navigate = useNavigate();
  const isAuth = useCookie();

  useEffect(() => {
    if (!course?.data) {
      dispatch(getCourseBySlug({ slug }));
    }
  }, [slug, dispatch])

  const coursePrice = course?.data?.price;
  const originPrice = course?.data?.origin_price;

  const onApplyCoupon = (value) => {
    if (value) {
      const data = { couponCode: value, courseId: course.data.id }
      dispatch(applyCoupon(data));
    }
  }

  useEffect(() => {
    if (errorApplyCoupon) {
      const messageError = errorApplyCoupon;
      dispatch(setNullErrorApplyCoupon());
      toast.error(messageError);
    }
  }, [errorApplyCoupon]);

  const removeCoupon = () => {
    const couponId = coupon.id;
    const courseId = course?.data?.id;
    dispatch(removeCouponApplied({ couponId, courseId }));
  }

  const onEnrollFreeCourse = () => {
    dispatch(handleEnrollFreeCourse(course?.data?.id))
  }
  if (enrollFreeCourse) {
    navigate('/courses/my-courses');
  }

  useEffect(() => {
    if (course?.data?.id) {
      dispatch(getCouponByCourseId(course?.data?.id));
    }
  }, [course]);

  return (
    <>
      <Typography>
        <Title level={1}>Mở khóa toàn bộ khóa học</Title>
      </Typography>
      <Row className='course-detail-content'>
        <Col>
          <Paragraph style={{ fontSize: 17 }}>
            {
              course?.data ? Parser(course?.data?.content) : ''
            }
          </Paragraph>
          <Paragraph className='course-price'>
            <Alert style={{ fontSize: 16, textAlign: 'end' }}
              message={`Giá khoá học:`}
              action={
                !course?.data?.is_selling ? (
                  <strong style={{ color: '#1890ff', fontSize: 20 }}>MIỄN PHÍ</strong>
                ) : (
                  <Space direction="horizontal">
                    <span style={{ textDecoration: 'line-through', color: 'red' }}>
                      {originPrice}
                    </span>
                    <span style={{ color: '#1890ff', fontSize: 20 }}>
                      <strong>{coursePrice}</strong>
                    </span>
                  </Space>
                )
              }
              type="success" />
          </Paragraph>
          {
            course?.data?.is_selling ? (
              <Payment />
            ) : (
              isAuth ? (
                <Button
                  type="primary" danger
                  icon={<PlusSquareOutlined />}
                  style={{ marginTop: 15, borderRadius: 10, fontSize: 18, height: 45 }}
                  size="large"
                  onClick={() => onEnrollFreeCourse()}
                > Đăng Ký Học </Button>
              ) : (
                <h3><i>Vui lòng <a href='/login'>đăng nhập</a> để tiến hành đăng ký học!</i></h3>
              )
            )
          }

          <Divider dashed />

          <h2>Nhận thông báo về khóa học</h2>
          <Row className='course-noti'>
            <Col span={3} className='course-detail-icon'>
              <NotificationTwoTone />
            </Col>
            <Col>
              <Paragraph>
                <ul>
                  <li>Khóa học sẽ được kích hoạt sau khi DnSoft nhận được thanh toán của bạn (tối đa 10 phút).</li>
                  <li>Bạn sẽ nhận được thông báo trên dnsoft.edu.vn và qua email.</li>
                  <li><PhoneOutlined style={{ marginRight: 10 }} /><strong>077 874 8897</strong></li>
                  <li><MailOutlined style={{ marginRight: 10 }} /><strong>dong.joseph2810@gmail.com</strong></li>
                  <li><HeatMapOutlined style={{ marginRight: 10 }} /><strong>87 Nguyễn Đình Chiểu, Ngũ Hành Sơn, Đà Nẵng</strong></li>
                </ul>
              </Paragraph>
            </Col>
          </Row>
        </Col>
        <Col>
          <Paragraph style={{ fontSize: 18 }}>
            <Space
              direction="vertical"
              size="middle"
              style={{
                display: 'flex',
              }}
            >
              <Card title="Bạn sẽ nhận được gì?" size="large" style={styles.cardCourseInfo}>
                <div style={{ fontSize: 15 }}>
                  <p><ApartmentOutlined style={{ marginRight: 10 }} />Gồm {course?.data?.total_chapter} chương</p>
                  <p><PieChartOutlined style={{ marginRight: 10 }} />Tổng số {course?.data?.lesson_count} bài học</p>
                  <p><ClockCircleFilled style={{ marginRight: 10 }} />Thời lượng {course?.data?.total_hour}</p>
                  <p><UnorderedListOutlined style={{ marginRight: 10 }} />Học mọi lúc, mọi nơi</p>
                  <p><YoutubeOutlined style={{ marginRight: 10 }} />Học trên mọi thiết bị</p>
                  <p><LineChartOutlined style={{ marginRight: 10 }} />Liên tục cập nhật</p>
                  <p><ArrowRightOutlined style={{ marginRight: 10 }} />Truy cập trọn đời</p>
                </div>
                <hr style={{
                  border: '1px white solid',
                  marginTop: 20,
                  marginBottom: 15,
                }} />
                {
                  coupon ? (
                    <Tag color="#108ee9" closable onClose={() => removeCoupon()} style={{ marginBottom: 5 }}>{coupon?.code}</Tag>
                  ) : ''
                }
                <Search
                  placeholder="Nhập mã giảm giá"
                  allowClear
                  enterButton="Apply"
                  size="large"
                  onSearch={onApplyCoupon}
                  required={true}
                />
              </Card>

            </Space>
          </Paragraph>
        </Col>
      </Row>

      <Row>
        <Col>
          <Typography>
            <Title level={1} className='course-title-learn'>Bạn sẽ học được những gì?</Title>
            <ul>
              {
                course?.data && course?.data?.course_purpose.map(item => {
                  return <h5 key={item}><li>{item}</li></h5>
                })
              }
            </ul>
          </Typography>
        </Col>
      </Row>
    </>
  )
}

export default Order