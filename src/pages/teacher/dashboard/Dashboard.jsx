import React, { useEffect } from 'react'
import { Tabs, notification } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../user/userSlice';
import Course from './Course';
import { setNullSuccessMessage } from '../teacherSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const messageSuccess = useSelector(state => state.teacher.messageSuccess);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  useEffect(() => {
    if (messageSuccess) {
      notification.success({
        message: messageSuccess,
        placement: 'topRight',
        duration: 10
      });
    };
  }, [messageSuccess])

  useEffect(() => {
    dispatch(setNullSuccessMessage());
  }, [messageSuccess, dispatch]);

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={'large'}
        items={[
          {
            label: `Khoá học`,
            key: 'bs',
            children: <Course />,
          },
        ]}
      />
    </>
  )
}

export default Dashboard
