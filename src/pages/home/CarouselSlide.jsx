import { Button, Carousel, Col, Row } from 'antd'

function CarouselSlide({ slides }) {

  const naviageUrl = (url) => {
    window.location.href = url;
  }

  return (
    <Carousel autoplay className='carousel-slider'>
      {
        slides?.data?.items?.map((item, index) => {
          return (
            <div key={index}>
              <h1 style={{
                height: '100%',
                width: '100%',
                color: 'black',
                textAlign: 'center',
                backgroundImage: `url(${item.image})`,
                borderRadius: 20,
                display: 'flex',
                alignItems: 'center'
              }}>
                <Row className='carousel'>
                  <Col>
                    <h4>
                      <p style={{fontSize: 30}}>{item.name}</p>
                      <h6><i style={{fontSize: 20}}>{item.description}</i></h6>
                    </h4>
                    <Button type="primary" shape="round" size='large' onClick={() => naviageUrl(item.link)}>Xem Chi Tiết</Button>
                  </Col>
                  {/* <Col span={8}><img style={{ borderRadius: 20 }} width={'100%'} src={item.image} /></Col> */}
                </Row>
              </h1>
            </div>
          );
        })
      }
    </Carousel>
  )
}

export default CarouselSlide
