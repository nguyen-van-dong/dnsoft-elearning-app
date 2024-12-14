import React from 'react'
import { Modal, Tabs } from 'antd';

import { useSelector } from 'react-redux';
import cookieService from '../services/cookie.service';
import { AUTHORIZATION, MAX_AGE_COOKIE } from '../const/common';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Verify from '../pages/auth/Verify';
// import {socket} from './../app/socket';

function AuthModal({ isModalVisible, setIsModalVisible }) {

  const user = useSelector(state => state.auth.user)
  const title = useSelector(state => state.auth.title)
  const showFormVerify = useSelector(state => state.auth.showFormVerify)

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (user?.data?.token) {
    const data = {
      full_name: user.data.user.name,
      email: user.data.user.email,
      phone: user.data.user.phone,
      avatar: user.data.user.social_avatar,
      is_teacher: user.data.user.is_teacher,
      is_login_social: user.data.user.is_social,
    }
    localStorage.setItem(AUTHORIZATION, JSON.stringify(data));
    cookieService.set('token', user.data.token, {
      path: '/',
      maxAge: MAX_AGE_COOKIE // 30 days
    });

    if (document.location.pathname == '/login') {
      window.location.href = '/user/profile';
      console.log(1111140);
    } else {
      window.location.reload();
    }
  }

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
    <Modal style={{ top: 50 }} open={isModalVisible} title={title} onOk={handleOk} onCancel={handleCancel} footer={null}>
      {
        showFormVerify ? (
          <Verify />
        ) : (
          <Tabs defaultActiveKey={'login'} items={items}></Tabs>
        )
      }
    </Modal>
  )
}

export default AuthModal
