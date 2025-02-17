import { useEffect } from 'react'

import {
  BlockOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

import { Col, Typography, Statistic, Row, Spin, Divider, Result, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from './categorySlice';
import { Link } from 'react-router-dom';
import { convertToSlug, getCourseByCategory } from '../../utils/common';
import useLocalStorage from '../../hooks/useLocalStorage';
import { LOCAL_KEY_CATEGORY } from '../../const/common';
import { getAllCourseCategory } from '../course/courseSlice';
import { Helmet } from 'react-helmet';
const { Title, Paragraph } = Typography;

function Category() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category.entities);
  const loading = useSelector(state => state.category.loading);
  const courseCategories = useSelector(state => state.courses.categories);

  useEffect(() => {
    if (!categories?.data) {
      dispatch(getAllCategories());
    }
  }, [dispatch, categories]);

  useEffect(() => {
    if (!courseCategories?.data) {
      dispatch(getAllCourseCategory());
    }
  }, [dispatch, courseCategories]);

  const showPostInCategory = (item) => {
    useLocalStorage(LOCAL_KEY_CATEGORY, JSON.stringify(item.id))
  }

  const styles = {
    styleRow: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      textAlign: 'center',
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Danh mục và chủ đề</title>
        <meta name="description" content="Các chủ để và danh mục tại DnSoft Elearning." />
      </Helmet>
      <Typography>
        <Title level={3}>Các Chủ Đề</Title>
        <Paragraph style={{ fontSize: 17 }}>
          Tất cả các chủ được mình đúc kết từ kinh nghiệm đi làm hơn 4 năm qua của mình. Ở đây các chủ đề đã được sắp xếp một cách khoa học để giúp các bạn tiện theo dõi.
          Mình là dân trái ngành nên hiểu được khó khăn của các bạn khi bắt đầu học lập trình, nên mình đã tổng hợp lại kiến thức để thứ nhất mình có nơi để chia sẻ lại
          kinh nghiệm cũng giúp các bạn dễ dàng hơn khi tiếp xúc với lĩnh vực đầy hấp dẫn hiện nay.
        </Paragraph>
      </Typography>

      <Divider dashed orientation='center' style={{ marginTop: 45 }}>CÁC CHỦ ĐỀ KHOÁ HỌC</Divider>
      {
        (courseCategories.data && courseCategories.data.length === 0) || loading ? (
          <Row>
            <Col span={16}>
              <div className="spin-loading">
                <Spin size="large" tip="Loading..." />
              </div>
            </Col>
            <Col span={4}></Col>
          </Row>
        ) : (
          <Row style={styles.styleRow}>
            {
              courseCategories?.data?.map((item) => (
                <Col
                  span={4}
                  key={item.id}
                  style={{ margin: 30 }}
                >
                  <Statistic
                    title={<Link to={`/courses?category=${item.slug}`} onClick={() => getCourseByCategory(item)}><strong style={{ fontSize: 20 }}>{item.name}</strong></Link>}
                    value={item.counts}
                    prefix={<AppstoreOutlined style={{ marginRight: 5, color: 'rgb(82, 196, 26)' }} />}
                  />
                </Col>
              ))
            }
            <Divider dashed orientation="center">DANH MỤC BÀI VIẾT</Divider>
            {
              categories?.data?.map((item) => (
                <Col
                  span={4}
                  key={item.id}
                  style={{ margin: 30 }}
                >
                  <Statistic
                    title={<Link to={'/categories/' + convertToSlug(item.url)} onClick={() => showPostInCategory(item)}><strong style={{ fontSize: 20 }}>{item.name}</strong></Link>}
                    value={item.counts}
                    prefix={<BlockOutlined style={{ marginRight: 5, color: 'rgb(255 97 5)' }} />}
                  />
                </Col>
              ))
            }

            {
              categories.length === 0 && !loading ? (
                <Result
                  style={{ marginLeft: '20%' }}
                  status="warning"
                  title="There are some problems with the connection."
                  extra={
                    <Button type="primary" key="console">
                      Reload
                    </Button>
                  }
                />
              ) : (<></>)
            }
          </Row>
        )
      }
    </>
  )
}

export default Category