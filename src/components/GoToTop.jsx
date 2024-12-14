import React from 'react'
import { BackTop } from 'antd'
import { ToTopOutlined } from '@ant-design/icons';

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 18,
};

function GoToTop() {
  return (
    <BackTop>
      <div style={style}><ToTopOutlined /></div>
    </BackTop>
  )
}

export default GoToTop