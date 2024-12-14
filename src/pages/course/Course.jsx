import React, { useEffect, useState } from 'react'
import { Col, Row, Spin, Switch, Tag, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourseCategory, getAllCourses } from './courseSlice';
import { Link, useSearchParams } from 'react-router-dom';
import GoToTop from '../../components/GoToTop';
import { getCourseByCategory } from '../../utils/common';
import useLocalStorage from '../../hooks/useLocalStorage';
import { CURRENT_PAGE_COURSE, LOCAL_KEY_COURSE } from '../../const/common';
const { Title, Paragraph } = Typography;
import { Helmet } from "react-helmet";
import ListView from './ListView';
import GridView from './GridView';
import Parser from 'html-react-parser';

function Course() {
  const resultCourses = useSelector(state => state.courses.entities);
  const categories = useSelector(state => state.courses.categories);
  const loading = useSelector(state => state.courses.loading);
  const [isGridView, setIsGridView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    dispatch(getAllCourses(categoryParam ? useLocalStorage(LOCAL_KEY_COURSE) : '')).unwrap().then((response) => {
      setCurrentPage(response.data.meta.current_page)
      setTotal(response.data.meta.total)
    });
  }, [dispatch, categoryParam]);

  useEffect(() => {
    if (!categories?.data) {
      dispatch(getAllCourseCategory());
    }
  }, [dispatch]);

  let data = []
  if (resultCourses?.courses) {
    data = resultCourses?.courses.map((item) => ({
      href: item.url,
      title: item.name,
      total_hour: item.total_hour,
      lesson_count: item.lesson_count,
      avatar: '',
      description: item.description,
      content: <Paragraph style={{ fontSize: 16 }}>
        {Parser(item.short_summary)}
      </Paragraph>,
      author: item.author,
      image: item.image,
      slug: item.slug,
      thumbnail: item.thumbnail ? item.thumbnail : null
    }));
  }

  const changeViewMode = () => {
    if (isGridView) {
      setIsGridView(false);
    } else {
      setIsGridView(true);
    }
  }

  const onChange = (page) => {
    if (!page) {
      page = 1;
    }
    dispatch(getAllCourses(page));
    setCurrentPage(page);
    useLocalStorage(CURRENT_PAGE_COURSE, page);
  }

  const styles = {
    selectedCategory: {
      borderColor: '#1391ff',
      backgroundColor: '#e0f1ff'
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tất cả khoá học</title>
        <meta name="description" content="Tất cả khoá học đang có tại DnSoft Elearning" />
      </Helmet>
      <div className='course-category'>
      <Tag style={categoryParam == null ? styles.selectedCategory : ''}>
        <Link to={'/courses'}>{'All'}</Link>
      </Tag>
      {
        categories?.data && categories.data.map((item, index) => (
          <Tag style={item.slug == categoryParam ? styles.selectedCategory : ''} key={index}>
            <Link to={`/courses?category=${item.slug}`} onClick={() => getCourseByCategory(item)}>{item.name}</Link>
          </Tag>
        ))
      }
      </div>
      <div className='course-viewMode'><span style={{ color: 'rgb(245, 106, 0)' }}><strong>Chế độ xem</strong></span>
        <Switch style={{ marginLeft: 10 }} checkedChildren="Grid" unCheckedChildren="List" defaultChecked onChange={() => changeViewMode()} />
      </div>
      <Typography style={{marginTop: 20}} className='course-article'>
        <Title>Các khóa học tại DnSoft eLearning</Title>
        <Paragraph>{ resultCourses?.category?.description ? Parser(resultCourses?.category?.description) : resultCourses?.default_des }</Paragraph>
      </Typography>

      {
        (resultCourses?.courses && resultCourses?.courses.length === 0) || loading ? (
          <div className="spin-loading-common">
            <Spin size="large" tip="Loading..." />
          </div>
        ) : (
          <Row className={`${isGridView ? 'course-list scroll-snap' : 'course-list-grid'}`}>
            {
              isGridView ? (
                <GridView courses={resultCourses?.courses} />
              ) :
                <Col>
                  <ListView data={data} />
                  <GoToTop />
                </Col>
              // {/* <Pagination current={currentPage} onChange={onChange} total={total} /> */}
            }
          </Row>
        )
      }
    </>
  )
}

export default Course