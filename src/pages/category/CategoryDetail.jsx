import React, { useEffect } from 'react'
import { Avatar, BackTop, Col, List, Row, Spin, Tag, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LikeOutlined, MessageOutlined, ToTopOutlined } from '@ant-design/icons';
import IconText from '../../components/IconText';
import { getAllCategories, getCategoryBySlug, getPostsByCategory } from './categorySlice';
import useLocalStorage from '../../hooks/useLocalStorage';
import { LOCAL_KEY_CATEGORY } from '../../const/common';
import { convertToSlug, getAvatar, showPostDetail, showPostInCategory } from '../../utils/common';
import HTMLReactParser from 'html-react-parser';

const { Title, Paragraph } = Typography;

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

function CategoryDetail() {
  let { slug } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.category.posts);
  const loading = useSelector(state => state.category.loading);
  const categories = useSelector(state => state.category.entities)
  const categoryId = useLocalStorage(LOCAL_KEY_CATEGORY);

  // useEffect( () => {
  //   dispatch(getCategoryBySlug(category?.id));
  // }, [slug, dispatch]);

  useEffect(() => {
    dispatch(getPostsByCategory(categoryId))
  }, [slug, dispatch]);

  useEffect(() => {
    if (!categories?.data) {
      dispatch(getAllCategories());
    }
  }, [dispatch]);

  let data = []
  if (posts) {
    data = posts.data.map((item) => ({
      id: item.id,
      href: item.url,
      title: item.title,
      thumbnail: item.thumbnail,
      description: <Paragraph style={{ fontSize: 16 }}>{item.description ? HTMLReactParser(item.description) : ''}</Paragraph>,
      content: item.content,
      author: item.author,
      url: item.url,
      comment_count: item.comments_count,
      count_like: item.count_like,
    }));
  }

  return (
    <>
      <Typography>
        <Title>Bài Viết Trong Danh Mục {posts ? posts?.data[0]?.category : ''}</Title>
        <Paragraph style={{ fontSize: 18 }}>
          Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.
          Đặc biệt có những chủ đề dành cho các bạn trái ngành rất bổ ích cho các bạn.
        </Paragraph>
      </Typography>
      {
        !posts || loading ? (
          <div className="spin-loading-common">
            <Spin size="large" tip="Loading..." />
          </div>
        ) : (
          <Row>
            <Col span={18}>
              <List
                itemLayout="vertical"
                size="large"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item
                    key={item.title}
                    actions={[
                      <IconText icon={LikeOutlined} text={item.count_like ? item.count_like : 0} key="list-vertical-like-o" />,
                      <IconText icon={MessageOutlined} text={item.comment_count} key="list-vertical-message" />,
                    ]}
                    extra={
                      <img
                        width={250}
                        alt="logo"
                        src={item.thumbnail}
                      />
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={getAvatar()} />}
                      title={<Link to={`/posts/${convertToSlug(item.url)}`} onClick={() => showPostDetail(item)}>{item.title}</Link>}
                      description={<h5> Đăng bởi <strong>{item.author}</strong></h5>}
                    />
                    {item.description}
                  </List.Item>
                )}
              />

              <BackTop>
                <div style={style}><ToTopOutlined /></div>
              </BackTop>

            </Col>
            <Col span={6}>
            {
              categories.data && categories.data.map((item, index) => (
              <Tag key={index} style={{ padding: 5, margin: 5, paddingLeft: 15, paddingRight: 15, borderRadius: 15 }}>
                <Link to={'/categories/'+ convertToSlug(item.url)} onClick={() => showPostInCategory(item)}>{item.name}</Link>
              </Tag>
              ))
            }
            </Col>
          </Row>
        )
      }
    </>
  )
}

export default CategoryDetail
