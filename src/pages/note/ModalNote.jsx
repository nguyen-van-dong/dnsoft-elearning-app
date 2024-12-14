import React, { useState } from 'react'
import './Note.css';
import { Button, Form, Input, Modal, Space } from 'antd'
import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import { createNote } from './noteSlice';
const { TextArea } = Input;

const openNotification = (placement) => {
  notification.success({
    message: `Tạo ghi chú thành công!`,
    placement,
  });
};

function ModalNote({timeSeconds, timeIso, lesson, openModalNote, setOpenModalNote}) {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [content, setContent] = useState('');

  const onChange = (e) => {
    setContent(e.target.value);
    setDisabled(false);
  }

  const onHandleSubmit = () => {
    if (!content) return;
    setSubmitting(true);
    const data = {
      lesson_id: lesson.id,
      video_id: lesson.video,
      content,
      time_iso: timeIso,
      time_seconds: timeSeconds
    };
    dispatch(createNote(data));
    setContent('');
    setSubmitting(false);
    setOpenModalNote(false);
    setDisabled(true);
    openNotification('bottomRight');
  };

  return (
    <Modal
        title={`Thêm ghi chú tại ${timeIso}`}
        open={openModalNote}
        onCancel={() => setOpenModalNote(false)}
        width={1000}
        footer={null}
      >
        {/* <Comment
          content={
            <>
              <Form.Item rules={[
                {
                  required: true,
                  message: 'Nhập nội dung!',
                },
              ]}>
                <TextArea rows={3} onChange={onChange} value={content} placeholder="Nhập ghi chú"/>
              </Form.Item>
              <Form.Item style={{textAlign: 'right'}}>
                <Space size={'small'}>
                  <Button htmlType="submit" shape="round" onClick={() => setOpenModalNote(false)} type="danger" size="large">
                    Hủy
                  </Button>
                  <Button htmlType="submit" shape="round" loading={submitting} onClick={onHandleSubmit} type="primary" size="large" disabled={disabled}>
                    Tạo ghi chú
                  </Button>
                </Space>
              </Form.Item>
            </>
          }
        /> */}
    </Modal>
  )
}

export default ModalNote