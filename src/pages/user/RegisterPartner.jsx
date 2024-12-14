import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Input, Row, notification, Typography, Divider } from 'antd';
const { Title, Paragraph } = Typography;
import {
  SendOutlined,
} from '@ant-design/icons';
import { registerPartner, setNullErrorMessage } from '../teacher/teacherSlice';
import { AUTHORIZATION } from '../../const/common';
import { useNavigate } from 'react-router-dom';

function RegisterPartner() {
  const auth = JSON.parse(localStorage.getItem(AUTHORIZATION) || '{}');
  if (Object.keys(auth).length === 0) {
    window.location.href = '/login?src=/register/partner'
  }
  const loading = useSelector(state => state.teacher.loading);
  const messageError = useSelector(state => state.teacher.messageError);
  const messageSuccess = useSelector(state => state.teacher.messageSuccess);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegisterPartner = (values) => {
    const data = { ...values }
    dispatch(registerPartner(data));
  };

  useEffect(() => {
    if (messageSuccess) {
      const newAuth = { ...auth, is_teacher: true };
      localStorage.setItem(AUTHORIZATION, JSON.stringify(newAuth));
      navigate('/teacher/dashboard');
    }
    if (messageError) {
      notification.error({
        message: messageError,
        placement: 'topRight',
        duration: 10
      });
    }
  }, [messageSuccess, messageError])

  useEffect(() => {
    dispatch(setNullErrorMessage());
  }, [messageSuccess, messageError, dispatch]);

  const onFinishFailedActive = (errorInfo) => {
    console.log('Failed login:', errorInfo);
    setDisabled(false);
  };

  const style = {
    input: {
      borderRadius: '7px'
    }
  }
  React.useEffect(() => {
    form.setFieldsValue({
      name: auth?.full_name,
      email: auth?.email,
    });
  }, [auth, form])

  return (
    <div>
      <Row>
        <Col span={24}>
          <Typography>
            <Title level={4}>Đăng ký trở thành partner của DnSoft để tạo ra những khoá học chất lượng và đồng thời nâng cao thu nhập của bạn!</Title>
            <Paragraph style={{ fontSize: 16 }}>
              Bạn có chuyên môn? Bạn có kỹ năng truyền đạt, truyền cảm hứng cho người khác? Bạn muốn đem kỹ năng mình để đóng góp cho sự phát triển
              chung cho cộng đồng? Bạn muốn tăng thu nhập vào thời gian rảnh?... Vậy đừng ngần ngại đăng ký làm partner cho hệ thống học lập trình DnSoft.
              <br />
              Nếu có bất kỳ thắc mắc nào đừng ngần ngại liên hệ với chúng tôi để được hỗ trợ kịp thời.
              Chúc bạn có những trải nghiệm tuyệt vời khi học tập tại DnSoft Elearning - <strong>Hệ Thống Học Lập Trình Thực Chiến Đơn Giản Hiệu Quả.</strong>
            </Paragraph>
            <Paragraph style={{ fontSize: 16 }}>
              Để biết thêm về thông tin chính sách vui lòng tham khảo tại <a href='/page/chinh-sach-cho-doi-tac'> Chính Sách Dành Cho Partner</a>
            </Paragraph>
          </Typography>
        </Col>
      </Row>
      <Divider />
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onRegisterPartner}
        onFinishFailed={onFinishFailedActive}
        autoComplete="off"
        labelAlign='left'
        style={{ marginTop: "10" }}
      >
        {
          <>
            <Form.Item
              label="Name"
              name="name"
            >
              <Input size='large' placeholder="Enter your full name" style={style.input} disabled={true} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
            >
              <Input size='large' placeholder="Enter your email" style={style.input} disabled={true} />
            </Form.Item>
            <Form.Item
              label="Trình độ cao nhất"
              name="skill"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập trình độ cao nhất!',
                },
              ]}
            >
              <Input size='large' placeholder="Nhập trình độ cao nhất (cử nhân, kỹ sư, thạc sỹ,...)" style={style.input} />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại!',
                },
              ]}
            >
              <Input size='large' placeholder="Nhập số điện thoại" style={style.input} />
            </Form.Item>
            <Form.Item
              label="Link facebook"
              name="facebook"
            >
              <Input size='large' placeholder="Nhập link facebook" style={style.input} />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="introduce"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mô tả bản thân!',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Mô tả ngắn về bản thân" />
            </Form.Item>
            <Form.Item
              label="Chủ đề"
              name="topic"
              rules={[
                {
                  required: true,
                  message: 'Chủ đề bạn muốn dạy!',
                },
              ]}
            >
              <Input.TextArea rows={3} placeholder="Nhập chủ đề bạn muốn dạy" />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
            >
              <Input size='large' placeholder="Nhập địa chỉ" style={style.input} />
            </Form.Item>

            {
              auth.is_login_social ? (
                <>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                    style={{ textAlign: 'left' }}
                  >
                    <Input.Password size='large' placeholder='Enter your password' style={style.input} />
                  </Form.Item>

                  <Form.Item
                    label="Re-type Password"
                    name="password_confirmation"
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password size='large' placeholder="Enter the password confirmation" style={style.input} />
                  </Form.Item>
                </>
              ) : ('')
            }
          </>
        }

        <Form.Item className='register-partner-btn'>
          <Button icon={<SendOutlined />} type="primary" htmlType="submit" size="large" disabled={loading} loading={loading}>
            Đăng ký Ngay
          </Button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default RegisterPartner
