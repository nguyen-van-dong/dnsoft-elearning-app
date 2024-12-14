import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { activeCourse, setNullErrorMessage, setNullSuccessMessage } from './courseSlice';
import { Button, Col, Form, Input, Row, notification, Typography, Divider, Badge, Alert } from 'antd';
const { Title, Paragraph } = Typography;
import useCookie from '../../hooks/useCookie';
import {
  UnlockOutlined,
} from '@ant-design/icons';

function ActiveCourse() {
  const auth = useCookie();
  const navigate = useNavigate();

  const loading = useSelector(state => state.courses.loading);
  const messageError = useSelector(state => state.courses.messageError);
  const messageSucess = useSelector(state => state.courses.messageSucess);

  const dispatch = useDispatch();

  const onActiveCourse = (values) => {
    const data = { ...values }
    dispatch(activeCourse(data));
  };

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
  }, [messageSucess, messageError])

  useEffect(() => {
    dispatch(setNullErrorMessage());
    dispatch(setNullSuccessMessage());
  }, [messageSucess, messageError, dispatch]);

  const onFinishFailedActive = (errorInfo) => {
    console.log('Failed login:', errorInfo);
    setDisabled(false);
  };

  const style = {
    rowStyle: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      textAlign: 'center'
    }
  }

  return (
    <div>
      <Row>
        <Col span={24}>
          <Typography>
            <Title level={3}>KÍCH HOẠT KHOÁ HỌC</Title>
            <Paragraph style={{ fontSize: 16 }}>
              Vui lòng nhập mã khoá học để kích hoạt khoá học và bắt đầu quá trình trải nghiệm học tập.
              Nếu có bất kỳ thắc mắc nào đừng ngần ngại liên hệ với chúng tôi để được hỗ trợ kịp thời.
              Chúc bạn có những trải nghiệm tuyệt vời khi học tập tại DnSoft Elearning - <strong>Hệ Thống Học Lập Trình Đơn Giản Hiệu Quả.</strong>
            </Paragraph>
          </Typography>
        </Col>
      </Row>
      <Divider />
      <Row style={style.rowStyle}>
        <Col span={24}>
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onActiveCourse}
            onFinishFailed={onFinishFailedActive}
            autoComplete="off"
            labelAlign='left'
            style={{ marginTop: "10" }}
          >

            <h2>Lưu ý: Mỗi khoá học chỉ cần kích hoạt 1 lần duy nhất.</h2>
            <div style={{ fontSize: 16 }}>
              <p><Badge count={1} /> <strong>Bạn chưa có </strong> tài khoản?, vui lòng <strong><Link to={'/login'}>Đăng ký tài khoản mới.</Link></strong></p>

              <p><Badge count={2} /> Bạn <strong>đã có </strong>tài khoản?, vui lòng <strong><Link to={'/login'}>Đăng nhập tài khoản</Link>.</strong></p>
            </div>
            <Form.Item
              name="active_code"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã kích hoạt!',
                },
              ]}
            >
              <Input size='large' placeholder="Nhập mã kích hoạt" className="active-course-input" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 24,
              }}
            >
              <Button type="primary" danger htmlType="submit" icon={<UnlockOutlined />} size="large" loading={loading}>
                Kích hoạt
              </Button>
            </Form.Item>

          </Form>
          {
            !auth ? <Alert style={{ height: 55, fontSize: 16 }} message="Vui lòng đăng nhập trước khi kích hoạt" type="error" /> : ''
          }
          <p style={{marginTop: 20}}>Hỗ trợ: 0778748897</p>
        </Col>
      </Row>
    </div>
  )
}

export default ActiveCourse
