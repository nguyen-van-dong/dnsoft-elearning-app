import React, { useEffect, useState } from 'react'
import { Button, Menu, Dropdown, Avatar, Col, Space } from 'antd'

import {
  ContainerOutlined,
  PicRightOutlined,
  PieChartOutlined,
  FullscreenExitOutlined,
  MailOutlined,
  UserOutlined,
  BulbOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  LogoutOutlined,
  DownloadOutlined,
  CrownOutlined,
  InfoCircleOutlined,
  PlaySquareOutlined,
  DollarOutlined,
  UsergroupAddOutlined,
  BellOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';
import { setColCarouselContent, setColCarouselLeft, setMarginLeft } from '../app/appSlice';
import { useDispatch } from 'react-redux';
import { logout } from '../pages/auth/authSlice';
import { AUTHORIZATION } from '../const/common';
import useCookie from '../hooks/useCookie';
import cookieService from '../services/cookie.service';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

function SideMenu({ selectedMenu, isMb, handleCloseSidebar }) {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState('');
  const auth = useCookie();
  const authAvt = JSON.parse(localStorage.getItem(AUTHORIZATION) || '{}');
  const [isMobile, setIsMobile] = useState(false);
  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem(AUTHORIZATION);
    cookieService.remove('token', { path: '/' });
    window.location.href = '/login';
  }
  const items = [
    getItem(<Link to="/" onClick={handleCloseSidebar}><span>Home</span></Link>, '/', <PieChartOutlined />),
    getItem(<Link to="/categories" onClick={handleCloseSidebar}><span>Danh Mục</span></Link>, 'categories', <PicRightOutlined />),
    getItem(<Link to="/courses" onClick={handleCloseSidebar}><span>Khóa Học</span></Link>, 'courses', <BulbOutlined />),
    getItem(<Link to="/posts" onClick={handleCloseSidebar}><span>Blog</span></Link>, 'posts', <ContainerOutlined />),
    getItem(<a target="_blank" rel="noreferrer" href="https://shop.dnsoft.vn"><span>Shop</span></a>, '8', <ShoppingCartOutlined />),
    getItem('Help', 'help-menu', <InfoCircleOutlined />, [
      getItem(<Link to="/page/huong-dan-dang-ky-gv" onClick={handleCloseSidebar}><span>Hướng dẫn đăng ký GV</span></Link>, '/page/huong-dan-dang-ky-gv', <FullscreenExitOutlined />),
      getItem(<Link to="/page/quy-trinh-hop-tac-gv" onClick={handleCloseSidebar}><span>Quy trình hợp tác GV</span></Link>, '/page/quy-trinh-hop-tac-gv', <UsergroupAddOutlined />),
      getItem(<Link to="/page/huong-dan-tao-profile" onClick={handleCloseSidebar}><span>Hướng dẫn tạo profile</span></Link>, '/page/huong-dan-tao-profile', <UserOutlined />),
      getItem(<Link to="/page/huong-dan-tao-khoa-hoc" onClick={handleCloseSidebar}><span>Hướng dẫn tạo khoá học</span></Link>, '/page/huong-dan-tao-khoa-hoc', <PlaySquareOutlined />),
      getItem(<Link to="/page/tieu-chuan-video" onClick={handleCloseSidebar}><span>Tiêu chuẩn video</span></Link>, '/page/tieu-chuan-video', <PlaySquareOutlined />),
      getItem(<Link to="/page/loi-nhuan-tu-khoa-hoc" onClick={handleCloseSidebar}><span>Lợi nhuận từ khoá học</span></Link>, '/page/loi-nhuan-tu-khoa-hoc', <DollarOutlined />),
    ]),
    getItem('Khác', 'other-menu', <FullscreenExitOutlined />, [
      getItem(<Link to="/lien-he" onClick={handleCloseSidebar}><span>Liên Hệ</span></Link>, 'lien-he', <MailOutlined />),
      getItem(<Link to="/about-me" onClick={handleCloseSidebar}><span>About Me</span></Link>, 'about-me', <UserOutlined />),
      !auth ? getItem(<Link to="/login" onClick={handleCloseSidebar}><span>About Me</span></Link>, 'login', <LoginOutlined />) :
        getItem(<Link to="/login" onClick={() => onLogout()}>Logout</Link>, 'logout', <LogoutOutlined />),
    ]),
  ];
  const itemsAvt = [
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
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    if (collapsed) {
      dispatch(setColCarouselContent(19));
      dispatch(setColCarouselLeft(4));
      dispatch(setMarginLeft(60));
    } else {
      dispatch(setColCarouselContent(21));
      dispatch(setColCarouselLeft(2));
      dispatch(setMarginLeft(15));
    }
  };

  React.useEffect(() => {
    setSelectedKeys(selectedMenu)
  }, [selectedMenu])

  const onSelectMenuItem = (key) => {
    setSelectedKeys(key)
  }
  
  return (
    <div className='sidebar-content'>
      {isMb ? <div className='btn-close-sidebar' onClick={handleCloseSidebar}>
        <span></span>
        <span></span>
      </div> : ''}
      {isMb ? (
        <>
      <div className="avt-user">
        <Col>
          <Space direction="vertical">
            <Space wrap>
              <Dropdown menu={{ items: itemsAvt }} placement="bottomRight" trigger={['click']}>
              <span>
                <Avatar icon={<UserOutlined />} src={authAvt?.avatar} style={{ cursor: 'pointer' }} />
              </span>
            </Dropdown>
            </Space>
          </Space>
        </Col>
        <div className='avt-user-text'>
          <p>DnSoft</p>
          <span>Lập trình thực tế</span>
        </div>
      </div>
      <div className="social">
        <a href="">
          <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="#1877f2" d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"/><path fill="#fff" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"/></svg>
        </a>
        <a href="">
          <svg xmlns="http://www.w3.org/2000/svg" width="256" height="262" viewBox="0 0 256 262"><path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"/><path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"/><path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"/><path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"/></svg>
        </a>
      </div>
      </>
      ) : null}
      
      <Menu
        selectedKeys={[`${selectedKeys}`]}
        defaultOpenKeys={['other-menu']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        onSelect={({ key }) => onSelectMenuItem(key)}
      />
      {isMobile ? <div style={{
        marginTop: 50,
        backgroundColor: 'rgb(16, 136, 233)',
        height: 300,
        borderRadius: 10
      }} className='sidebar-join'>
        <h3 style={{
          textAlign: 'center',
          paddingTop: 10,
          color: 'white'
        }}>Join Membership</h3>
        <div style={{
          textAlign: 'center',
          marginTop: 30
        }}>
          <CrownOutlined style={{
            fontSize: 50,
            color: 'yellow'
          }}/>
          <CrownOutlined style={{
            fontSize: 50,
            color: 'yellow'
          }}/>
          <CrownOutlined style={{
            fontSize: 50,
            color: 'yellow'
          }}/>
        </div>
        <p style={{
          marginTop: 30,
          textAlign: 'center',
          padding: 10,
          color: 'white'
        }}>Truy cập tất cả các khoá học mọi lúc, mọi nơi.</p>
        <div style={{textAlign: 'center'}} >
          <Link to={'/membership'}>
          <Button size={'large'} icon={<DownloadOutlined />}  shape="round">Join Now</Button>
          </Link>
        </div>

      </div> : ''}
      
    </div>
  )
}

export default SideMenu