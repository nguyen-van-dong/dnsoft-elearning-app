import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'

function TeacherCourse() {
  const { teacherId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch();
  }, []);

  return (
    <div>TeacherCourse</div>
  )
}

export default TeacherCourse
