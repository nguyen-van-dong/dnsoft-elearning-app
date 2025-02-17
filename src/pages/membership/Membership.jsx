import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Row, notification, Typography, Divider, Badge } from 'antd';
const { Title, Paragraph } = Typography;
import './membership.css'
import {
  SendOutlined,
  CrownOutlined
} from '@ant-design/icons';
import { getAllMemberships } from './membershipSlice';
import { Helmet } from 'react-helmet';

function Membership() {
  const navigate = useNavigate();

  const messageError = useSelector(state => state.courses.messageError);
  const messageSucess = useSelector(state => state.courses.messageSucess);
  const memberships = useSelector(state => state.package.memberships);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!memberships?.data) {
      dispatch(getAllMemberships());
    }
  }, [dispatch, memberships])

  useEffect(() => {
    if (messageSucess) {
      notification.success({
        message: messageSucess,
        placement: 'topRight',
        duration: 10
      });
      navigate('/courses/my-courses');
    };
    if (messageError) {
      notification.error({
        message: messageError,
        placement: 'topRight',
        duration: 10
      });
    };
  }, [messageSucess, messageError, navigate])

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Gói hội viên</title>
        <meta name="description" content="Các gói hội viên đang có tại DnSoft Elearning" />
      </Helmet>
      <Row className='membership-top'>
        <Col span={24}>
          <Typography>
            <Title level={3}>ĐĂNG KÝ HỘI VIÊN - CÀNG HỌC CÀNG TIẾT KIỆM</Title>
            <Paragraph style={{ fontSize: 16 }}>
              Tham khảo ngay các gói hội viên tại DnSoft để học tập không giới hạn với mức giá ưu đãi nhất!
              Chúc bạn có những trải nghiệm tuyệt vời khi học tập tại DnSoft Elearning - <strong>Hệ Thống Học Lập Trình Đơn Giản Hiệu Quả.</strong>
            </Paragraph>
          </Typography>
        </Col>
      </Row>
      <Divider />
      <Row className='membership-list'>
        {
          memberships?.data?.map(item => (
            <Col key={item.id}>
              <Badge.Ribbon
                text={item.is_popular ? 'MUA NHIỀU' : 'PHỔ BIẾN'}
                color={item.is_popular ? 'red' : '#1890ff'}>
                <div style={{
                  backgroundColor: item.is_popular ? 'rgb(16, 136, 233)' : 'rgb(239 239 239)',
                  height: item.is_popular ? 350 : 330,
                  borderRadius: 10
                }}>
                  <h2 style={{
                    textAlign: 'center',
                    paddingTop: 10,
                    color: item.is_popular ? 'white' : 'black'
                  }}>{item.name}</h2>

                  <div style={{
                    textAlign: 'center',
                    marginTop: 30
                  }}>
                    {
                      item.is_popular ? <CrownOutlined style={{
                        fontSize: 50,
                        color: 'yellow'
                      }} /> : ''
                    }
                    <CrownOutlined style={{
                      fontSize: 50,
                      color: 'yellow'
                    }} />
                    <CrownOutlined style={{
                      fontSize: 50,
                      color: 'yellow'
                    }} />
                  </div>
                  <p style={{
                    marginTop: 30,
                    textAlign: 'center',
                    padding: 10,
                    color: item.is_popular ? 'white' : 'black'
                  }}><strong style={{ fontSize: 16 }}>{item.price}₫ / tháng</strong></p>
                  <p className='membership-textPay'>Thanh toán: {item.total}₫</p>
                  <div style={{ textAlign: 'center', marginTop: item.is_popular ? 40 : '' }}>
                    <Link to={`/membership/${item.slug}`}>
                    <Button size={'large'} icon={<SendOutlined />} type={!item.is_popular ? 'primary' : ''}>
                      Đăng Ký Ngay
                    </Button>
                    </Link>
                  </div>
                </div>
              </Badge.Ribbon>
            </Col>
          ))
        }
        {/* <p style={{ marginTop: 20 }}>Hỗ trợ: 0778748897</p> */}
      </Row>

      <Row style={{marginTop: 30}}>
        <Col span={24} style={{fontSize: 16, background: '#f4f4f4', padding: 20}}>
          <p>
            Để giúp các học viên có thể sở hữu khóa học mình yêu thích mà không phải đầu tư nhiều kinh phí, DnSoft ra mắt chương trình HỘI VIÊN
          </p>
          <p><strong>GÓI HỘI VIÊN LÀ GÌ?</strong></p>

          <p>Hội Viên là một tài khoản đặc biệt cho phép người dùng truy cập vào tất cả các khóa học trên website hệ thống của dnsoft.vn</p>
          <p>Không bị giới hạn lượt truy cập - thỏa sức học những chủ đề mà bạn quan tâm!</p>
          <p>Thời lượng học của từng bài giảng không bị hạn chế nên trải nghiệm học tập của bạn sẽ không bị ảnh hưởng!</p>
          <p>Nếu bạn muốn nâng cao năng lực bản thân thì không thể bỏ qua Gói Hội Viên siêu hấp dẫn này. Còn gì tuyệt hơn khi học thỏa thích tất cả khóa học chỉ với 399.000đ / tháng!</p>
        </Col>
      </Row>
    </div>
  )
}

export default Membership
