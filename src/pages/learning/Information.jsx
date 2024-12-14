import React from 'react'
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import HTMLReactParser from 'html-react-parser';
import { getFileName } from '../../utils/common';

function Information() {
  const currentLesson = useSelector(state => state.learning.latestLessonSelected)
  const items = [
    {
      label: HTMLReactParser(`<span style="font-size: 18px">Overview</span>`),
      key: 'overview',
      children: currentLesson?.content ? HTMLReactParser(currentLesson?.content) : '',
    },
    {
      label:  HTMLReactParser(`<span style="font-size: 18px">Tài liệu</span>`),
      key: 'document',
      children: currentLesson?.file?.map(function(fileItem) {
        return (
          <div key={fileItem}>
            <a style={{fontSize: 18}} href={fileItem} download target='_blank'>{getFileName(fileItem)}</a><br/>
          </div>
        )
      })
    },
    {
      label:  HTMLReactParser(`<span style="font-size: 18px">Thông báo</span>`),
      key: 'announcement',
      children: currentLesson?.announcement ? HTMLReactParser(currentLesson?.announcement) : '',
    }
  ];
  return (
    <Tabs
      defaultActiveKey="1"
      type="card"
      size={'small'}
      items={items}
    />
  )
}

export default Information