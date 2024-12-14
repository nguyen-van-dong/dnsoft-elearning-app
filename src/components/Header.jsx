import React, { useEffect, useState } from 'react'
import { Avatar, Col, Dropdown, Row, Space, Badge, Divider } from 'antd'
import {
  UserOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import AuthModal from '../modals/AuthModal';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../pages/auth/authSlice';
import { getLogo } from '../utils/common';
import AutocompleteSearch from './AutocompleteSearch';
import cookieService from '../services/cookie.service';
import { AUTHORIZATION } from '../const/common';

function Header({isMobile, handleToggleSidebar}) {
  const token = cookieService.get('token');
  const dispatch = useDispatch();
  const items = [
    {
      key: '1',
      label: (
        <a href="/user/profile">
          <UserOutlined /> Trang Cá Nhân
        </a>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '4',
      label: (
        <a href="/teacher/dashboard">
          <SettingOutlined /> Dashboard
        </a>
      ),
    },
    {
      key: '5',
      label: (
        <a rel="noopener noreferrer" onClick={() => onLogout()}>
          <LogoutOutlined /> Đăng Xuất
        </a>
      ),
    }
  ]

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState
  (false);
  

  const showAllNotification = () => {
    console.log('showAllNotification');
  }

  const showModal = (keyActive) => {
    setIsModalVisible(true);
  };

  const auth = JSON.parse(localStorage.getItem(AUTHORIZATION) || '{}');
  useEffect(() => {
    if (token && Object.keys(auth).length > 0) {
      setIsLoggedIn(true)
    }
  }, [auth]);

  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
    }
  }, [token])

  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem(AUTHORIZATION);
    cookieService.remove('token', { path: '/' });
    window.location.href = '/login';
  }


  return (
    <>
      <Row className='header'>
        <Col span={1} className='header-logo'>
          <a href="/">
            <Avatar icon={<UserOutlined />} src={getLogo()} style={{ cursor: 'pointer' }} />
          </a>
        </Col>
        <Col align="left" style={{ alignSelf: 'center' }} className='header-text-user'><strong>Lập Trình Thực Chiến</strong></Col>
        <Col span={8} className='header-search'>
          <AutocompleteSearch />
        </Col>
        {isMobile ? 
          <div className='toggle-sidebar'>
            <div className={`sidebar-icon`} onClick={handleToggleSidebar}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>: ''}
        
        {
          isLoggedIn ? (
            <Col className={`header-right-wrapper`}>
            <div className='header-menu'>
              <Col>
                <Link to={'/membership'}>Hội Viên</Link>
                <Divider type="vertical" />
                <Link to={'/courses/active'}>Kích hoạt khoá học</Link>
                {
                  !auth.is_teacher ? (
                    <>
                      <Divider type="vertical" />
                      <Link to={'/register/partner'}>Đăng ký partner</Link>
                    </>
                  ) : ''
                }
                <Divider type="vertical" />
                <Link to={'/courses/my-courses'}>Khóa Học Của Tôi</Link>
              </Col>
              <Badge count={5}>
                <BellOutlined onClick={() => showAllNotification()} style={{ cursor: 'pointer', fontSize: 20 }} />
              </Badge>
            </div>
          </Col>
          ) : ''
        }
        
        {
            !isLoggedIn ?
            <Col className={`header-right-wrapper`}>
              <div className='header-menu'>
                <span>
                  <Link to={'/membership'}>Hội Viên</Link>
                  <Divider type="vertical" />
                  <Link to={'/courses/active'}>Kích hoạt khoá học</Link>
                  <Divider type="vertical" />
                  <Link to={'/register/partner'}>Đăng ký partner</Link>
                </span>
                <span style={{ marginLeft: 8, marginRight: 8 }} className='header-right-space'>||</span>

                <span>
                  <a onClick={() => showModal('login')}>Đăng Nhập</a>
                  <Divider type="vertical" />
                  <a onClick={() => showModal('register')}>Đăng Ký</a>
                </span>
              </div>
            </Col>
              : 
            <div className='header-user'>
              <span className='header-user-name'>{auth?.full_name}</span>
              <Col align="right">
                <Space direction="vertical">
                  <Space wrap>
                    <Dropdown menu={{ items }} placement="bottomRight" trigger={'click'}>
                      <Avatar icon={<UserOutlined />} src={auth?.avatar} style={{ cursor: 'pointer' }} />
                    </Dropdown>
                  </Space>
                </Space>
              </Col>
            </div>
          }


      </Row>

      <AuthModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </>
  )
}

export default Header