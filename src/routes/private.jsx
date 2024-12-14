import Logout from '../pages/auth/Logout';
import Learning from '../pages/learning/Learning';
import Profile from '../pages/user/Profile';
import Setting from '../pages/user/Setting';
import Course from '../pages/user/Course';
import Dashboard from '../pages/teacher/dashboard/Dashboard';

const privateRoutes = [
  {
    path: '/logout',
    element: <Logout/>,
    isExac: true,
  },
  {
    path: '/user/profile',
    element: <Profile/>,
    isExac: true,
  },
  {
    path: '/setting',
    element: <Setting/>,
    isExac: true,
  },
  {
    path: '/learning/:uuid',
    element: <Learning/>,
    isExac: true,
  },
  {
    path: '/courses/my-courses',
    element: <Course/>,
    isExac: true,
  },
  {
    path: '/teacher/dashboard',
    element: <Dashboard/>,
    isExac: true,
  },
];

const privateData= {
  privateRoutes,
}

export default privateData