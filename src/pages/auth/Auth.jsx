import React from 'react'
import { Col, Row, Tabs } from 'antd'
import { useSelector } from 'react-redux';
import Login from './Login';
import Register from './Register';
import Verify from './Verify';
import './auth.css'

function Auth() {
  const showFormVerify = useSelector(state => state.auth.showFormVerify)

  const items = [
    {
      key: 'login',
      label: 'Đăng Nhập',
      children: <Login />,
    },
    {
      key: 'register',
      label: 'Đăng Ký',
      children: <Register />
    },
  ];

  return (
    <Row className="form-auth">
      <Col>
        {showFormVerify ? (
          <Verify/>
        ) : (
          <Tabs defaultActiveKey={'login'} items={items}></Tabs>
          )
        }
      </Col>
    </Row>
  )
}

export default Auth
