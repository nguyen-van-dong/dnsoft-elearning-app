import React from 'react'
import { Card, Col, Row } from 'antd';
const { Meta } = Card;

function Reason({reasonsLearn}) {


  return (
    <div className='reason-wrapper'>
      <h1> LÝ DO BẠN NÊN HỌC ONLINE TẠI DNSOFT ELEARNING</h1>
      <Row className='reason scroll-snap'>
        {
          reasonsLearn?.data?.map(item => (
            <Col span={6} key={item.id}>
              <Card
                hoverable
                cover={<img alt={item.name} src={item.image} />}
              >
                <Meta title={item.name} description={item.description} />
              </Card>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

export default Reason
