import React from 'react'
import { Col, Row, Typography } from 'antd'
import Title from 'antd/lib/typography/Title'
import Paragraph from 'antd/lib/typography/Paragraph'
import HTMLReactParser from 'html-react-parser'
import { getFileName } from '../../utils/common'

function FileLesson({ currentLesson }) {
  return (
    <div style={{ background: '#f4f4f4', padding: 30, borderRadius: 10 }}>
      <Row>
        <Col span={24}>
          <Typography>
            <Title level={1}>Source code - Document</Title>
          </Typography>
          <Row>
            <Col span={17}>
              <Paragraph style={{ fontSize: 17 }}>
                {
                  currentLesson?.content ? HTMLReactParser(currentLesson?.content) : ''
                }
              </Paragraph>
              {
                currentLesson?.file?.map((fileItem) => (
                  <div key={fileItem}>
                    <a style={{fontSize: 18}} href={fileItem} download target='_blank'>{getFileName(fileItem)}</a><br/>
                  </div>
                ))
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default FileLesson
