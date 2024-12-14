
import React, { useEffect, useState } from 'react';
import { Drawer, List, Skeleton, Popconfirm, message, Tag } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, setSelectedNote } from './noteSlice';

const count = 3;

function NoteList({ open, setOpen, onClose }) {
  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const dispatch = useDispatch();

  const noteLists = useSelector(state => state.note.noteLists);
  const note = useSelector(state => state.note.note);
  const lesson = useSelector(state => state.learning.latestLessonSelected);
  const loadingNote = useSelector(state => state.note.loadingNote);

  // Case get notes list
  useEffect(() => {
    setData(noteLists.data)
    setList(noteLists.data)
    setInitLoading(false)
  }, [noteLists])

  // Case create new note
  useEffect(() => {
    if (noteLists?.data && note?.data) {
      const item = {...note.data, lesson_name: lesson.name}
      const newObject = [...noteLists.data, item]
      setData(newObject)
      setList(newObject)
    }
  }, [note])

  const onLoadMore = () => {
    // setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          // loading: true,
          name: {},
          picture: {},
        })),
      ),
    );

    // fetch(fakeDataUrl)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     const newData = data.concat(res.results);
    //     setData(newData);
    //     setList(newData);
    //     setLoading(false); // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    //     // In real scene, you can using public method of react-virtualized:
    //     // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized

    //     window.dispatchEvent(new Event('resize'));
    //   });
  };

  const loadMore =
    !initLoading && !loadingNote ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        {/* <Button onClick={onLoadMore}>Loading More</Button> */}
      </div>
    ) : null;

  const confirm = (noteId) => {
    dispatch(deleteNote(noteId));
    message.info('Đã xóa ghi chú.');
    // const item = {...note.data, lesson_name: lesson.name}
    const newObject = [...noteLists.data]
    const remainNote = newObject.filter(item => item.id !== noteId);
    setData(remainNote)
    setList(remainNote)
  };

  const seekingPlayer = (note) => {
    dispatch(setSelectedNote(note));
    onClose()
  }

  return (
    <Drawer title="Ghi chú của tôi" placement="right" onClose={onClose} open={open} size={'large'}>
      <List
        className="demo-loadmore-list"
        loading={loadingNote}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit"><EditOutlined /></a>,
              <Popconfirm placement="left" title={'Xóa ghi chú này?'} onConfirm={() => confirm(item.id)} okText="Yes" cancelText="No">
                <DeleteOutlined style={{ color: 'red' }} />
              </Popconfirm>
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title={
                  <a onClick={() => seekingPlayer(item)}>
                      <span><Tag color="#2db7f5">{item.time_iso}</Tag></span>
                      {`${item.lesson_name}`}
                    </a>
                  }
                description={<blockquote className="item-note">{item.content}</blockquote>}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </Drawer>
  )
}

export default NoteList