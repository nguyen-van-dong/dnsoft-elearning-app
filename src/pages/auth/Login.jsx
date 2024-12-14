import React, { useEffect, useState } from 'react'
import {
  FacebookFilled,
  GoogleSquareFilled,
  GithubFilled,
  SendOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input } from 'antd'
import { login, setMessErrLogin, socialAuthentication } from './authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Login() {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const messageErrLogin = useSelector(state => state.auth.messageErrLogin)
  const loading = useSelector(state => state.auth.loading);

  const onLoginForm = (values) => {
    setDisabled(true)
    dispatch(login(values));
  }

  const handleSocialAuthentication = (platform) => {
    dispatch(socialAuthentication(platform));
  }

  // Login
  useEffect(() => {
    if (messageErrLogin) {
      setDisabled(false);
      if (messageErrLogin.verifier) {
        toast.error(messageErrLogin.verifier[0]);
      }
      if (messageErrLogin.invalid) {
        toast.error(messageErrLogin.invalid[0]);
      }
      // console.log({ messageErrLogin });
      // const messageErr = JSON.parse(messageErrLogin);
      // if (typeof messageErr == 'object' && messageErr.message) {
      //   toast.error(messageErr.message);
      // }
    }
  }, [messageErrLogin]);

  useEffect(() => {
    dispatch(setMessErrLogin());
  }, [messageErrLogin, dispatch]);

  const onFinishFailedLogin = () => { }

  const style = {
    input: {
      borderRadius: '10px'
    }
  }

  return (
    <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onLoginForm}
      onFinishFailed={onFinishFailedLogin}
      autoComplete="off"
      labelAlign='left'
      style={{ marginTop: "10" }}
    >
      <Form.Item
        label="Email / Phone"
        name="login"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
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
      >
        <Input.Password size='large' placeholder="Enter your password" style={style.input} />
      </Form.Item>

      <Form.Item 
        className='form-auth-remember'
        name="remember"
        valuePropName="checked"
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item className='form-auth-btn btn-center'>
        <Button type="primary" icon={<SendOutlined />} htmlType="submit" size='large' disabled={disabled} loading={loading}>
          Đăng Nhập
        </Button>
      </Form.Item>

      <Divider>Social Login</Divider>

      <Button block shape="round" icon={<FacebookFilled />} size={'large'}
        onClick={() => handleSocialAuthentication('facebook')} style={{
          backgroundColor: '#3171ff',
          color: 'white',
        }}>Tiếp tục với Facebook</Button>

      <Button block shape="round" icon={<GoogleSquareFilled />} size={'large'} style={{
        marginBottom: 15,
        marginTop: 15,
        backgroundColor: '#ec4f4f',
        color: 'white',
      }} onClick={() => handleSocialAuthentication('google')}>Tiếp tục với Google</Button>

      <Button block shape="round" icon={<GithubFilled />} size={'large'} style={{ marginBottom: 30 }}
        onClick={() => handleSocialAuthentication('github')}>Tiếp tục với Github</Button>
    </Form>
  )
}

export default Login
