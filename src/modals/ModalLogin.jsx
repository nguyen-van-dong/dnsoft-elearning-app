import React from 'react'
import { Button, Modal } from 'antd'

function ModalLogin({ isModalVisible}) {
  return (
    <Modal
      title="Vui lòng đăng nhập lại để tiếp tục"
      open={isModalVisible}
      width={1000}
      style={{
        top: 30,
      }}
      >
    </Modal>
  )
}

export default ModalLogin