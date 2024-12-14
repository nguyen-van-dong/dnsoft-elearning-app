import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Tabs, Typography, notification } from 'antd'
import {
  SendOutlined,
} from '@ant-design/icons';
const { Title, Paragraph } = Typography;
import { useDispatch, useSelector } from 'react-redux';
import { getUser, setNullErrorMessage, setNullSuccessMessage, updateUser } from './userSlice';
import './profile.css'

function Profile() {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user.user);
  const messageError = useSelector(state => state.user.messageError);
  const messageSuccess = useSelector(state => state.user.messageSuccess);
  const dispatch = useDispatch();

  const onUpdateForm = (values) => {
    dispatch(updateUser(values));
  }

  const style = {
    input: {
      borderRadius: '5px'
    }
  }

  React.useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  React.useEffect(() => {
    form.setFieldsValue({
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
    });
  }, [user, form])

  React.useEffect(() => {
    if (messageSuccess) {
      notification.success({
        message: messageSuccess,
        placement: 'topRight',
        duration: 10
      });
    };
    if (messageError) {
      notification.error({
        message: messageError,
        placement: 'topRight',
        duration: 10
      });
    };
  }, [messageSuccess, messageError]);

  React.useEffect(() => {
    dispatch(setNullErrorMessage());
    dispatch(setNullSuccessMessage());
  }, [messageSuccess, messageError, dispatch]);

  const generalInfo = () => {
    return (
      <Row class="profile">
        <Col className='profile-form'>
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
            onFinish={onUpdateForm}
            autoComplete="off"
            labelAlign='left'
            style={{ marginTop: "10" }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your full name!',
                },
              ]}
            >
              <Input size='large' placeholder="Enter your full name" style={style.input}/>
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input size='large' placeholder="Enter your email" style={style.input} />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone!',
                },
              ]}
            >
              <Input size='large' placeholder="Enter your phone" style={style.input} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password size='large' placeholder="Enter your password" style={style.input} />
            </Form.Item>

            <Form.Item
              name="confirm_password"
              label="Nhập lại mật khẩu"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
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
              <Input.Password size='large' placeholder='Enter the confirm password' style={style.input} />
            </Form.Item>

            <Form.Item className ="btn-center">
              <Button type="primary" htmlType="submit" danger icon={<SendOutlined />}  disabled={disabled} loading={loading} size="large">
                Update
              </Button>
            </Form.Item>

          </Form>
        </Col>
      </Row>
    )
  }

  const tabInfo = [
    {
      label: `Thông tin cá nhân`,
      key: 1,
      children: generalInfo(),
    },
    {
      label: `Billing Information`,
      key: 2,
      children: 'Billing is comming...',
    },
  ]

  return (
    <>
      <Row>
        <Col span={24}>
          <Typography>
            <Title level={4}>Thông tin cá nhân</Title>
            <Paragraph style={{ fontSize: 16 }}>
              Bạn có thể thay đổi thông tin cá nhân và các thông tin liên quan tại đây.
            </Paragraph>
          </Typography>
        </Col>
      </Row>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size='large'
        items={tabInfo}
      />
    </>
  )
}

export default Profile
