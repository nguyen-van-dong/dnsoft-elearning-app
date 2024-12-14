import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getStaticPage } from './staticSlice';
import { Col, Row, Spin, Typography } from 'antd';
import Parser from 'html-react-parser';
import { Helmet } from 'react-helmet';
const { Title, Paragraph } = Typography;

function StaticPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const page = useSelector(state => state.static.page)
  const loading = useSelector(state => state.static.loading)

  useEffect(() => {
    dispatch(getStaticPage(slug));
  }, [dispatch, slug]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{page?.data?.name}</title>
        <meta name="description" content={page?.data?.name} />
      </Helmet>
      <Row>
        {
          loading ? (
            <div className="spin-loading">
              <Spin size="large" tip="Loading..." />
            </div>
          ) : (
            <Col span={24}>
              <Typography>
                <Title>{page?.data?.name}</Title>
                <Paragraph style={{ fontSize: 18 }}>
                  {page?.data?.description ? Parser(page?.data?.description) : ''}
                </Paragraph>
                <Paragraph style={{ fontSize: 18 }}>
                  {page?.data?.content ? Parser(page?.data?.content) : ''}
                </Paragraph>
              </Typography>
            </Col>
          )
        }
      </Row>
    </>
  )
}

export default StaticPage
