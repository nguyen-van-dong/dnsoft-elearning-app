import React, { useEffect } from 'react'
import { Button, Col, Form, Input, Row, Steps } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getPackageById } from './membershipSlice';
import {
  SendOutlined,
} from '@ant-design/icons';
import HTMLReactParser from 'html-react-parser';
import { Helmet } from 'react-helmet';

function ProccessMembership() {
  const { id } = useParams();
  const packageItem = useSelector(state => state.package.package);
  const loading = useSelector(state => state.package.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPackageById(id));
  }, [id]);

  const onSubmitInformation = (values) => {
    const data = { ...values }
    console.log({ data });
  }

  const onFinishFailed = () => {

  }

  const style = {
    input: {
      borderRadius: '7px',
    },
    rowStyle: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      textAlign: 'center'
    }
  }

  const validateMessages = {
    types: {
      email: 'Vui lòng nhập email đúng định dạng!',
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    },
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Gói hội viên</title>
        <meta name="description" content={`Các gói hội viên tại DnSoft Elearning`} />
      </Helmet>
      <div>
        <Steps
          current={1}
          items={[
            {
              title: 'Nhập thông tin',
            },
            {
              title: 'Thanh toán',
            },
            {
              title: 'Vào học',
            },
          ]}
          style={{ background: 'rgb(255 177 117)', padding: 30, borderRadius: 10 }}
        />
      </div>
      <div style={{ marginTop: 30 }}>
        <Row style={{ background: 'rgb(244, 244, 244)' }}>
          <Col span={16} style={{ padding: 20 }}>
            <Form
              layout="vertical"
              name="basic"
              labelCol={{
                span: 6,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onSubmitInformation}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              labelAlign='left'
              style={{ marginTop: "10", background: 'white', padding: 20 }}
              validateMessages={validateMessages}
            >
              <Form.Item
                name="name"
                wrapperCol={{
                  span: 24,
                }}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập họ tên!',
                  },
                ]}
                label='Họ tên'
              >
                <Input size='large' placeholder="Nhập họ tên" style={style.input} />
              </Form.Item>

              <Form.Item
                name="email"
                wrapperCol={{
                  span: 24,
                }}
                rules={[
                  {
                    type: 'email',
                    required: true,
                    message: 'Vui lòng nhập email'
                  },
                ]}
                label='Nhập email'
              >
                <Input size='large' placeholder="Nhập email" style={style.input} />
              </Form.Item>

              <Form.Item
                name="phone"
                wrapperCol={{
                  span: 24,
                }}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số điện thoại!',
                  },
                ]}
                label='Nhập số điện thoại'
              >
                <Input size='large' placeholder="Nhập số điện thoại" style={style.input} />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  span: 24,
                }}
              >
                <Button type="primary" danger htmlType="submit" icon={<SendOutlined />} size="large" loading={loading}>
                  Thanh toán
                </Button>
              </Form.Item>

            </Form>
          </Col>
          <Col span={8} style={{ padding: 20 }}>
            <div style={{ background: 'white', padding: 15 }}>
              <strong>Đơn hàng</strong>
              <hr style={{ border: '#ececec 1px solid' }} />
              <div style={{ paddingTop: 10, paddingBlock: 10 }}>
                <span>Hội Viên DnSoft</span>
                <span style={{ float: 'right' }}><strong>{packageItem?.data?.total}₫</strong></span>
                <div>{packageItem?.data?.price}₫ x {packageItem?.data?.expire_month} tháng</div>
              </div>
              <hr style={{ border: '#ececec 1px solid' }} />
              <span>Thành tiền: </span>
              <span style={{ float: 'right' }}><strong>{packageItem?.data?.total}₫</strong></span>
            </div>
          </Col>
          <Row style={{ background: 'rgb(244, 244, 244)', padding: 20, background: 'rgb(244, 244, 244)' }}>
            <Col span={24}>
              <h3><u>Mô tả gói hội viên</u></h3>
              {packageItem?.data?.content ? HTMLReactParser(packageItem?.data?.content) : ''}
            </Col>
          </Row>
        </Row>
      </div>
    </>

  )
}

export default ProccessMembership
