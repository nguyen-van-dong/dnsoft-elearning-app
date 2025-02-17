import { useEffect } from 'react'
import { Col, Image, Row, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import Parser from 'html-react-parser';
import { getAboutMe } from './contactSlice';
const { Title, Paragraph } = Typography;

function AboutMe() {
  const dispatch = useDispatch();
  const aboutMe = useSelector(state => state.contact.aboutMe)
  useEffect(() => {
    if (!aboutMe?.data) {
      dispatch(getAboutMe());
    }
  }, [dispatch, aboutMe])

  return (
    <Row className='aboutMe'>
      <Col span={18}>
        <Typography>
          <Title>{aboutMe?.data?.name}</Title>
          <Paragraph style={{ fontSize: 18 }}>
            {aboutMe?.data?.description ? Parser(aboutMe?.data?.description) : ''}
          </Paragraph>
          <Paragraph>
            {aboutMe?.data?.content ? Parser(aboutMe?.data?.content) : ''}
          </Paragraph>
        </Typography>
      </Col>
      <Col span={4} className='about-img'>
        <Image
          src="https://avatars.githubusercontent.com/u/67553313?v=4"
          prefix={false}
          style={{borderRadius: 50 + '%'}}
        />
      </Col>
    </Row>
  )
}

export default AboutMe