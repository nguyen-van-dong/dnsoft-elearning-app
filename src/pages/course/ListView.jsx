import React from 'react'
import { Avatar, Button, List, Space, Image } from 'antd'
import { VideoCameraAddOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getAvatar } from '../../utils/common';

const styles = {
  btnViewDetail: {
    backgroundColor: 'white',
    borderRadius: 20,
    border: '1px solid black',
    color: 'black',
    paddingTop: 9,
    paddingBottom: 30,
  },
}

const IconText = ({ icon, text, style }) => (
  <Space style={style}>
    {React.createElement(icon)}
    {text}
  </Space>
);

function ListView({data}) {
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText style={{color: '#f56a00', fontWeight: 'bold'}} icon={FieldTimeOutlined} text={item.total_hour} key="list-vertical-star-o" />,
            <IconText style={{color: '#1890ff', fontWeight: 'bold'}} icon={VideoCameraAddOutlined} text={item.lesson_count} key="list-vertical-star-o" />,
          ]}
          extra={
            <div className='course-list-image'>
              <Image
              width={270}
              src={item.thumbnail}
              preview={
                {
                  getContainer: 'Course',
                  mask: <Link to={'/courses/' + item.slug}><Button className='course-list-btn'> Xem Chi Tiết </Button></Link>
                }
              }
              style={{ borderRadius: 10 }}
            />
            </div>
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={getAvatar()} />}
            title={<Link to={'/courses/' + item.slug}>{item.title}</Link>}
            description={<h5><strong>{item.author}</strong></h5>}
          />
          {item.content}
        </List.Item>
      )}
    />
  )
}

export default ListView