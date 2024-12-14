import React, { useEffect, useState } from 'react'
import {
  FacebookFilled,
  GoogleSquareFilled,
  GithubFilled,
  SendOutlined,
} from '@ant-design/icons';
import { Button, Divider, Form, Input } from 'antd'
import { register, setMessErrRegister, socialAuthentication } from './authSlice';
import { useDispatch, useSelector } from 'react-redux';

function Register() {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const messageErrRegister = useSelector(state => state.auth.messageErrRegister);
  const loading = useSelector(state => state.auth.loading);

  const onRegisterForm = (values) => {
    setDisabled(true)
    dispatch(register(values))
  }
  const onFinishFailedRegister = () => { }

  const handleSocialAuthentication = (platform) => {
    dispatch(socialAuthentication(platform));
  }

  // Register
  useEffect(() => {
    if (messageErrRegister) {
      console.log(messageErrRegister);
      setDisabled(false);
    }
  }, [messageErrRegister]);

  useEffect(() => {
    dispatch(setMessErrRegister());
  }, [messageErrRegister, dispatch]);

  const style = {
    input: {
      borderRadius: '10px'
    }
  }

  return (
    <Form
      name="basic"
      labelCol={{
        span: 7,
      }}
      wrapperCol={{
        span: 17,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onRegisterForm}
      onFinishFailed={onFinishFailedRegister}
      autoComplete="off"
      labelAlign='left'
      style={{ marginTop: "10" }}
    >
      <Form.Item
        label="Full Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your full name!',
          },
        ]}
        style={{ textAlign: 'left' }}
      >
        <Input size='large' placeholder='Enter your full name' style={style.input} />
      </Form.Item>

      <Form.Item
        label="Email / Phone"
        name="register"
        rules={[
          {
            required: true,
            message: 'Please input your email or phone!',
          },
        ]}
        style={{ textAlign: 'left' }}
      >
        <Input size='large' placeholder="Enter your email / phone" style={style.input} />
      </Form.Item>

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

      <Form.Item className='form-auth-btn btn-center'>
        <Button type="primary" icon={<SendOutlined />} htmlType="submit" size='large' disabled={disabled} loading={loading}>
          Đăng Ký
        </Button>

      </Form.Item>

      <Divider>Social Login</Divider>

      <Button block shape="round" icon={<FacebookFilled />} size={'large'}
        onClick={() => handleSocialAuthentication('facebook')}
        style={{
          backgroundColor: '#3171ff',
          color: 'white',
        }}
      >Tiếp tục với Facebook</Button>

      <Button block shape="round" icon={<GoogleSquareFilled />} size={'large'}
        onClick={() => handleSocialAuthentication('google')}
        style={{
          marginBottom: 15,
          marginTop: 15,
          backgroundColor: '#ec4f4f',
          color: 'white'
        }}>Tiếp tục với Google</Button>

      <Button block shape="round" icon={<GithubFilled />} size={'large'}
        onClick={() => handleSocialAuthentication('github')}
        style={{ marginBottom: 30 }}>Tiếp tục với Github</Button>
    </Form>
  )
}

export default Register
