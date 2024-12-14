
import React from 'react'
import { Space } from 'antd'

function IconText({ icon, text, style }) {
  return (
    <Space style={style}>
      {React.createElement(icon)}
      {text}
    </Space>
  )
}

export default IconText
