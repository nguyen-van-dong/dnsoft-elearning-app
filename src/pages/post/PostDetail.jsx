import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Parser from 'html-react-parser';
import { getPostBySlug } from './postSlice';
import { Avatar, Button, Col, Dropdown, Row, Space, Spin, Typography, message } from 'antd';
import { LOCAL_KEY_POST } from '../../const/common';
import useLocalStorage from '../../hooks/useLocalStorage';
const { Title, Paragraph } = Typography;
import IconText from '../../components/IconText';
import {
  LikeOutlined,
  UserOutlined,
  BookOutlined,
  FacebookOutlined,
  TwitterOutlined,
  CopyOutlined,
  CommentOutlined,
  StepBackwardOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { getAvatar } from '../../utils/common';
import { Helmet } from 'react-helmet';

function PostDetail() {
  let { slug } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(state => state.posts.post);
  const loading = useSelector(state => state.posts.loading);
  const postId = useLocalStorage(LOCAL_KEY_POST);

  useEffect(() => {
    const value = postId ?? slug
    dispatch(getPostBySlug({ value }));
  }, [slug, dispatch]);

  const copyUrl = () => {
    const url = `${import.meta.env.VITE_REACT_APP_URL}/posts/${slug}`;
    navigator.clipboard.writeText(url);
    message.open({
      type: 'success',
      content: 'Copied the URL',
    });
  }

  const items = [
    {
      key: '1',
      label: (
        <a target='_blank' href={`http://www.facebook.com/sharer.php?u=${import.meta.env.VITE_REACT_APP_URL}/posts/${slug}`}>
          <FacebookOutlined style={{ marginRight: 10, color: 'rgb(7 30 235 / 85%)' }} /> Chia sẽ lên Facebook
        </a>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '4',
      label: (
        <a target='_blank' href={`http://www.linkedin.com/shareArticle?mini=true&url=${import.meta.env.VITE_REACT_APP_URL}/posts/${slug}`}>
          <TwitterOutlined style={{ marginRight: 10, color: 'rgb(7 184 246 / 85%)' }} />Chia sẽ lên Twitter
        </a>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '5',
      label: (
        <a href="#" onClick={() => copyUrl()}>
          <CopyOutlined style={{ marginRight: 10 }} /> Sao chép liên kết
        </a>
      ),
    }
  ]

  return (
    <>
      {
        !post || loading ? (
          <div className="spin-loading-common">
            <Spin size="large" tip="Loading..." />
          </div>
        ) : (
          <Row>
            <Helmet>
              <meta charSet="utf-8" />
              <title>{post.name}</title>
              <meta name="description" content="Các bài viết với nhiều kinh nghiệm tại DnSoft Elearning. Hệ thống học online hiệu quả, chuyên nghiệp." />
            </Helmet>
            <Col span={24} style={{ marginBottom: 15 }}>
              <Link to={'/posts'} style={{ marginRight: 20 }} size="medium">
                <StepBackwardOutlined /> Trở Lại
              </Link>
              <Avatar size="large" icon={<UserOutlined />} src={getAvatar()} />
              <span>
                <span style={{ marginLeft: 10 }}>{post.author}</span>
              </span>
              <span style={{ float: 'right' }}>
                <IconText icon={EyeOutlined} text={post.viewed ? post.viewed : 0} style={{ marginRight: 10 }} />
                <IconText icon={LikeOutlined} text={post.count_like ? post.count_like : 0} style={{ marginRight: 10 }} />
                <IconText icon={CommentOutlined} text={post.comments_count} style={{ marginRight: 10 }} />
                <Space direction="vertical">
                  <Space wrap>
                    <Dropdown menu={{ items }} placement="bottomRight" trigger={'click'}>
                      <BookOutlined style={{ color: 'red' }} />
                    </Dropdown>
                  </Space>
                </Space>
              </span>
            </Col>
            <Col span={24}>
              <Typography>
                <Title level={3}>{post.title}</Title>
                <Paragraph style={{ fontSize: 16 }}>
                  {Parser(post.content)}
                </Paragraph>
                <Paragraph style={{ fontSize: 16 }}>
                </Paragraph>
              </Typography>
              <Link to={'/posts'} style={{ marginRight: 20 }} size="medium">
                <StepBackwardOutlined /> Trở Lại
              </Link>
            </Col>
          </Row>
        )
      }
    </>
  )
}

export default PostDetail
