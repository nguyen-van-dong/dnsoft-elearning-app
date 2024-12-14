import React from 'react'
import { Button, Modal } from 'antd'
import ReactPlayer from 'react-player'

function PreviewModal({ isModalVisible, handleCancel, handlePause, videoUrl, videoName, playing}) {

  return (
    <Modal
      title={videoName}
      open={isModalVisible}
      width={1000}
      style={{
        top: 30,
      }}
      footer={[
        <Button key="back" onClick={() => handleCancel()} type="primary">
          Quay Lại
        </Button>
      ]}
      >
      <ReactPlayer
        url={videoUrl}
        playing={false}
        controls={true}
        width="100%"
        height="500px"
        onPause={() => handlePause()}
        onContextMenu={e => e.preventDefault()}
        config={{ file: { attributes: { controlsList: 'nodownload' } } }}
      />

    </Modal>
  )
}

export default PreviewModal