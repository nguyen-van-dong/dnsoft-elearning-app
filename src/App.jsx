
import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Row, Col } from 'antd'
import Footer from './components/Footer';
import Header from './components/Header';
import privateData from './routes/private';
import publicData from './routes/public';
import SideMenu from './components/SideMenu';
import { useDispatch, useSelector } from 'react-redux';
import { setMarginLeft, setSelectedMenu } from './app/appSlice';
import useCookie from './hooks/useCookie';
import HeaderLearning from './components/HeaderLearning';
import SideLearning from './components/SideLearning';
import FooterLearning from './components/FooterLearning';
import { AUTHORIZATION } from './const/common';
// import { socket } from './app/socket';

function App() {
  const user = useCookie();

  const menuKey = window.location.pathname.split('/');
  const dispatch = useDispatch();
  const colCarouselContent = useSelector(state => state.app.colCarouselContent);
  const colCarouselLeft = useSelector(state => state.app.colCarouselLeft);
  const marginLeft = useSelector(state => state.app.marginLeft);

  const isLearningLayout = useSelector(state => state.app.isLearningLayout);
  const selectedMenu = useSelector(state => state.app.selectedMenu);
  const routesMerged = [...privateData.privateRoutes, ...publicData.publicRoutes];

  const isAuthenticated = useSelector(state => state.app.isAuthenticated);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [toggleSidebarLearning, setToggleSidebarLearning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleMediaChange = (e) => {
      setIsMobile(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);
    setIsMobile(mediaQuery.matches);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  },[])
  const handleToggleSidebar = () => {
      setToggleSidebar(true)
  }
  const handleCloseSidebar = () => {
    setToggleSidebar(false)
  }
  const handleShowSidebarLearning = () => {
      setToggleSidebarLearning(true)
  }
  const handleCloseSidebarLearning = () => {
    setToggleSidebarLearning(false)
  }
  React.useEffect(() => {
    dispatch(setSelectedMenu(menuKey[1] ? menuKey[1] : '/'));
  }, []);

  const styles = {
    hr: {
      border: '1px solid #f2e9e9',
      marginBottom: 18
    },
    contentWithBg: {
      background: 'rgb(242 249 255)',
      padding: 30
    }
  }

  React.useEffect(() => {
    dispatch(setMarginLeft(55));
  }, [isLearningLayout]);

  React.useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem(AUTHORIZATION);
    }
  });

  return (
    <>
      <div className="container-fluid">
        <Router>
          {isLearningLayout ? <HeaderLearning isMobile={isMobile} /> : <Header isMobile={isMobile} handleToggleSidebar={handleToggleSidebar}/>}
          <hr style={styles.hr} />
          <div className="container">
            <Row className={`home-inner ${toggleSidebar ? 'active-sidebar' : ''}`}>
              
              <Col className={`${isLearningLayout ? 'sidebar-learning' : 'side-bar'} ${toggleSidebarLearning ? 'sidebar-learning-active' : ''}`}>
                {
                  isLearningLayout ? <SideLearning isMobile={isAuthenticated} handleCloseSidebarLearning= {handleCloseSidebarLearning} /> : <SideMenu selectedMenu={selectedMenu} isMb={isMobile} handleCloseSidebar={handleCloseSidebar} />
                }
              </Col>

              <Col className={`content-center course-page ${isLearningLayout ? 'content-learning' : ''}`}>
                <Routes>
                  {
                    user ? routesMerged.map(menu => <Route path={menu.path} element={menu.element} key={menu.path} />) : publicData.publicRoutes.map(menu => <Route path={menu.path} element={menu.element} key={menu.path} />)
                  }
                </Routes>
              </Col>
            </Row>
          </div>
          {isLearningLayout ? <FooterLearning isMobile={isMobile} handleShowSidebar={handleShowSidebarLearning} /> : <Footer />}
        </Router>
      </div>

    </>
  )
};

export default App;

