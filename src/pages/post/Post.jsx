import React, { useEffect, useState } from 'react'
import { Avatar, Col, List, Pagination, Row, Spin, Tag, Typography } from 'antd'
import { LikeOutlined, MessageOutlined, EyeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from './postSlice';
import { Link } from 'react-router-dom';
import GoToTop from '../../components/GoToTop';
import IconText from '../../components/IconText';
import { convertToSlug, getAvatar, showPostDetail, showPostInCategory } from '../../utils/common';
const { Title, Paragraph } = Typography;
import Parser from 'html-react-parser';
import { getAllCategories } from '../category/categorySlice';
import useLocalStorage from '../../hooks/useLocalStorage';
import { CURRENT_PAGE } from '../../const/common';
import { Helmet } from 'react-helmet';

function Post() {
  const posts = useSelector(state => state.posts.entities)
  const loading = useSelector(state => state.posts.loading)
  const categories = useSelector(state => state.category.entities)

  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)

  const dispatch = useDispatch();

  useEffect(() => {
    if (!posts?.data) {
      const fetchData = async () => {
        dispatch(getAllPosts()).unwrap().then((response) => {
          setCurrentPage(response.data.meta.current_page)
          setTotal(response.data.meta.total)
        })
      }
      fetchData();
    }
    if (posts?.meta) {
      setTotal(posts.meta.total);
      setCurrentPage(useLocalStorage(CURRENT_PAGE));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!categories?.data) {
      dispatch(getAllCategories());
    }
  }, [dispatch]);

  let data = []
  if (posts.data) {
    data = posts.data.map((item) => ({
      id: item.id,
      href: item.url,
      title: item.name,
      description: <Paragraph style={{ fontSize: 16 }}>{item.description ? Parser(item.description) : ''}</Paragraph>,
      content: (item.content),
      author: item.author,
      slug: convertToSlug(item.url),
      thumbnail: item.image ? item.image : 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
      comment_count: item.comments_count,
      count_like: item.count_like,
      viewed: item.viewed,
    }));
  }

  const onChange = (page) => {
    if (!page) {
      page = 1;
    }
    dispatch(getAllPosts(page));
    setCurrentPage(page);
    useLocalStorage(CURRENT_PAGE, page);
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Các bài viết</title>
        <meta name="description" content="Các bài viết với nhiều kinh nghiệm tại DnSoft Elearning. Hệ thống học online hiệu quả, chuyên nghiệp." />
      </Helmet>
      <Typography>
        <Title>Bài Viết Nỗi Bật</Title>
        <Paragraph style={{ fontSize: 18 }}>
          Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.
          Đặc biệt ở đây mình chia sẻ những khó khăn, và các kỹ năng khi các bạn học trái ngành khi các bạn tiếp xúc lần đầu với lập trình.
          Các kinh nghiệm đều được đúc kết từ những năm tháng đi làm của mình nên hy vọng sẽ bổ ích cho các bạn.
        </Paragraph>
      </Typography>

      {
        (posts.data && posts.data.length === 0) || loading ? (
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
                      <IconText icon={EyeOutlined} text={item.viewed ? item.viewed : 1} key="list-vertical-viewed" />,
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
                      title={<Link to={`/posts/${item.slug}`} onClick={() => showPostDetail(item)}>{item.title}</Link>}
                      description={<h5> Đăng bởi <strong>{item.author}</strong></h5>}
                    />
                    {item.description}
                  </List.Item>
                )}
              />

              <GoToTop />

            </Col>
            <Col span={6}>
              {
                categories?.data?.map((item, index) => (
                  <Tag style={{ padding: 5, margin: 5, paddingLeft: 15, paddingRight: 15, borderRadius: 15 }} key={index}>
                    <Link to={'/categories/' + convertToSlug(item.url)} onClick={() => showPostInCategory(item)}>{item.name}</Link>
                  </Tag>
                ))
              }
            </Col>
            <Pagination current={currentPage} onChange={onChange} total={total} />
          </Row>
        )
      }
    </>
  )
}

export default Post
