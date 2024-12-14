// import Login from '../pages/auth/Login';
// import Register from '../pages/auth/Register';
import AboutMe from '../pages/contact/AboutMe';
import Contact from '../pages/contact/Contact';
import Course from '../pages/course/Course';
import Home from '../pages/home/Home';
import Post from '../pages/post/Post';
import Category from '../pages/category/Category';
import PostDetail from '../pages/post/PostDetail';
import CourseDetail from '../pages/course/CourseDetail';
import CategoryDetail from '../pages/category/CategoryDetail';
import Order from '../pages/order/Order';
import PageNotFound from '../components/PageNotFound';
import Auth from '../pages/auth/Auth';
import ActiveCourse from '../pages/course/ActiveCourse';
import RegisterPartner from '../pages/user/RegisterPartner';
import StaticPage from '../pages/static/StaticPage';
import Membership from '../pages/membership/Membership';
import Proccess from '../pages/membership/Proccess';
import Payment from '../pages/membership/Payment';
import TeacherCourse from '../pages/teacher/TeacherCourse';

const publicRoutes = [
  {
    path: '/',
    element: <Home />,
    isExac: true,
  },
  {
    path: '/posts',
    element: <Post />,
    isExac: true,
  },
  {
    path: '/posts/:slug',
    element: <PostDetail />,
    isExac: true,
  },
  {
    path: '/courses',
    element: <Course />,
    isExac: true,
  },
  {
    path: '/courses/:slug',
    element: <CourseDetail />,
    isExac: true,
  },
  {
    path: '/courses/active',
    element: <ActiveCourse />,
    isExac: true,
  },
  {
    path: '/register/partner',
    element: <RegisterPartner />,
    isExac: true,
  },
  {
    path: '/membership',
    element: <Membership />,
    isExac: true,
  },
  {
    path: '/membership/:id',
    element: <Proccess />,
    isExac: true,
  },
  {
    path: '/membership/payment',
    element: <Payment />,
    isExac: true,
  },
  {
    path: '/categories',
    element: <Category />,
    isExac: true,
  },
  {
    path: '/categories/:slug',
    element: <CategoryDetail />,
    isExac: true,
  },
  {
    path: '/order/:slug',
    element: <Order/>,
    isExac: true,
  },
  {
    path: '/lien-he',
    element: <Contact />,
    isExac: true,
  },
  {
    path: '/about-me',
    element: <AboutMe />,
    isExac: true,
  },
  {
    path: '/login',
    element: <Auth />,
    isExac: true,
  },
  {
    path: '/page/:slug',
    element: <StaticPage/>,
    isExac: true,
  },
  {
    path: '/teacher/:teacherId',
    element: <TeacherCourse/>,
    isExac: true,
  },
  {
    path: '*',
    element: <PageNotFound />,
  }
]

const publicData= {
  publicRoutes
}

export default publicData
