import React from 'react'
import { Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../../const/common';

function CourseTable({data}) {
  const dataSource = data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      price: item.price + 'đ',
      lesson_count: item.lesson_count,
      total_chapter: item.total_chapter,
      created_at: item.created_at,
      is_enable: item.is_enable,
      student_count: item.student_count,
    }
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số lượng HV',
      dataIndex: 'student_count',
      key: 'student_count',
    },
    {
      title: 'Tổng số chương',
      dataIndex: 'total_chapter',
      key: 'total_chapter',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'is_enable',
      key: 'is_enable',
      render: (_, {is_enable}) => {
        return (<Tag color={is_enable ? '#108ee9' : 'red'}>
          {is_enable ? 'Enable' : 'Disable'}
        </Tag>)
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, {id}) => (
        <Space size="middle">
          <Link target='_blank' to={`${SERVER_URL}/admin/elearning/courses/${id}/edit`}>Edit</Link>
        </Space>
      ),
    },
  ];
  return (
    <Table className='course-table' dataSource={dataSource} columns={columns} rowKey={'id'}/> 
  )
}

export default CourseTable
