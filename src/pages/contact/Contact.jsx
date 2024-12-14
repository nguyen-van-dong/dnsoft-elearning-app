import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Typography, Input, Row, notification } from 'antd'
import './contact.css'
import {
  HomeOutlined,
  PhoneOutlined,
  MailOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createContact, setFalseSentContact, setMessageErrSubmit } from './contactSlice';
const { TextArea } = Input;
const { Title, Paragraph } = Typography;

function Contact() {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);
  const loading = useSelector(state => state.contact.loading)
  const messageErrSubmit = useSelector(state => state.contact.messageErrSubmit)
  const sentContact = useSelector(state => state.contact.sentContact)

  const dispatch = useDispatch();

  const onSubmitContact = (values) => {
    dispatch(createContact(values));
  }

  useEffect(() => {
    if (sentContact) {
      notification.success({
        message: `Đã gởi thông tin thành công. Cảm ơn bạn đã liên lạc với chúng tôi, chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.!`,
        placement: 'bottomRight',
        duration: 10
      });
      form.resetFields();
      dispatch(setFalseSentContact());
    }
  }, [sentContact, dispatch])

  useEffect(() => {
    if (messageErrSubmit) {
      setDisabled(false);
      toast.error(messageErrSubmit);
    }
  }, [messageErrSubmit]);

  useEffect(() => {
    dispatch(setMessageErrSubmit());
  }, [messageErrSubmit, dispatch]);

  const style = {
    input: {
      borderRadius: '10px'
    }
  }

  return (
    <div className='contact-page'>
      <Row>
        <Col span={24}>
          <Typography>
            <Title>Thông tin liên hệ</Title>
            <Paragraph>
              Nếu có thắc mắc hoặc yêu cầu gì, đừng ngần ngại để lại thông tin bên dưới, chúng tôi sẽ trả lời bạn trong thời gian sớm nhất có thể, xin chân thành cảm ơn
              sự hợp tác và đóng góp ý kiến của các bạn. Ý kiến của bạn là động lực để chúng tôi phấn đấu hoàn thiện hơn mỗi ngày và mang đến trải nghiệm hệ thống tốt nhất,
              góp phần nhỏ của mình vào sự phát triển chung của cộng đồng công nghệ Việt Nam.
            </Paragraph>
          </Typography>
        </Col>
      </Row>
      <Row className='contact-form'>
        <Col >
          <Form
            form={form}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onSubmitContact}
            autoComplete="off"
            labelAlign='left'
            style={{ marginTop: "10" }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your full name!',
                },
              ]}
            >
              <Input size='large' placeholder="Enter your full name" style={style.input} />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input size='large' placeholder="Enter your email" style={style.input} />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone!',
                },
              ]}
            >
              <Input size='large' placeholder="Enter your phone" style={style.input} />
            </Form.Item>

            <Form.Item
              label="Nội dung"
              name="content"
              rules={[
                {
                  required: true,
                  message: 'Nhập nội dung!',
                },
              ]}
            >
              <TextArea rows={3} placeholder="Nhập nội dung" style={style.input}/>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 18,
              }}
            >
              <Button type="primary" danger icon={<SendOutlined />} htmlType="submit" disabled={disabled} loading={loading} size="large">
                Gởi Thông Tin
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.731238078923!2d108.24205817541343!3d16.02750034055313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421750a4dd42b5%3A0x393f7aa53d214f1!2zODUgxJAuIE5ndXnhu4VuIMSQw6xuaCBDaGnhu4N1LCBLaHXDqiBN4bu5LCBOZ8WpIEjDoG5oIFPGoW4sIMSQw6AgTuG6tW5nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1690814736806!5m2!1svi!2s" width="100%" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </Col>
      </Row>
      <Row>
        <Col span={20}>
          <p><HomeOutlined /><span style={{ marginLeft: 10 }}>85/17 Đường Nguyễn Đình Chiểu, Khuê Mỹ, Ngũ Hành Sơn, Đà Nẵng</span></p>
          <p><PhoneOutlined /><span style={{ marginLeft: 10 }}><a href='tel:0778748897'>077 874 8897</a></span></p>
          <p><MailOutlined /><span style={{ marginLeft: 10 }}><a href="mailto:dong.joseph2810@gmail.com">dong.joseph2810@gmail.com</a></span></p>
        </Col>
      </Row>
    </div>
  )
}

export default Contact
