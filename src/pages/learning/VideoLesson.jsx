import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { convertSecondstoHHMMSS, scrollToTop } from '../../utils/common';
import ModalNote from '../note/ModalNote';
import { setLearnedLesson, setToFalseLearned } from './learningSlice';
import { setNullSelectedNote } from '../note/noteSlice';
import ReactPlayer from 'react-player'

function VideoLesson({currentLesson}) {
  const [timeIso, setTimeIso] = useState('00:00');
  const [timeSeconds, setTimeSeconds] = useState('0');
  const [duration, setDuration] = useState(0);
  const [playingVideo, setPlayingVideo] = useState('');
  const [playing, setPlaying] = useState(false);
  const [seeking, setSeeking] = useState(0);
  const [played, setPlayed] = useState(0);
  const [openModalNote, setOpenModalNote] = useState(false);
  const [countTimeLearning, setCountTimeLearning] = useState(0);

  const reactPlayer = React.useRef(null);
  const selectedNote = useSelector(state => state.note.selectedNote)
  const setLearned = useSelector(state => state.learning.setLearned)

  useEffect(() => {
    let countTime;
    if (playing) {
      countTime = setInterval( () => {
        setCountTimeLearning(countTimeLearning + 1)
      }, 1000)
    }
    return () => clearInterval(countTime)
  }, [countTimeLearning, playing]);

  useEffect(() => {
    if (selectedNote) {
      reactPlayer.current.seekTo(selectedNote.time_seconds);
      setPlaying(true);
      dispatch(setNullSelectedNote())
    }
  }, [selectedNote])

  const dispatch = useDispatch();

  const onDuration = (value) => {
    setDuration(value)
  }

  const onStart = (d) => {
    console.log({ d });
  }

  const handleOnEnded = () => {
    setPlaying(false);
    const data = {
      course_id: currentLesson.course_id,
      lesson_id: currentLesson.id,
    }
    document.getElementById('btnNextLesson').click();
    dispatch(setLearnedLesson(data));
  }

  React.useEffect(() => {
    if (currentLesson) {
      setPlayingVideo(currentLesson?.video);
      scrollToTop(200);
      setPlaying(false);
      setCountTimeLearning(0);
      dispatch(setToFalseLearned());
    }
  }, [currentLesson])

  const handleAddNote = () => {
    setPlaying(false);
    setOpenModalNote(true)
  }

  const handleSeekMouseDown = e => {
    console.log('handleSeekMouseDown');
    setSeeking(true);
  }

  const handleSeekChange = e => {
    console.log('handleSeekChange');
    setPlayed(parseFloat(e.target.value))
    reactPlayer.current.seekTo(parseFloat(e.target.value))
  }

  const handleSeekMouseUp = e => {
    console.log('handleSeekMouseUp');
    setSeeking(false);
    reactPlayer.current.seekTo(parseFloat(e.target.value))
  }

  const onProgress = (state) => {
    if (countTimeLearning > 2 && !setLearned) {
      const data = {
        course_id: currentLesson.course_id,
        lesson_id: currentLesson.id,
        is_learned: true,
      }
      dispatch(setLearnedLesson(data));
    }
    setPlayed(state.played);
    setTimeIso(convertSecondstoHHMMSS(state.playedSeconds));
    setTimeSeconds(state.playedSeconds);
  }

  const handlePlay = () => {
    setPlaying(true);
  }

  const handlePause = () => {
    console.log({ countTimeLearning });
    setPlaying(false);
  }

  useEffect(() => {
    // Auto play the video when changing the lesson
    setPlaying(true)
  }, [currentLesson])

  return (
    <>
      <Row>
        <Col span={24} className="video-player">
          <ReactPlayer
            ref={reactPlayer}
            url={currentLesson?.video}
            width="100%"
            onDuration={state => onDuration(state)}
            onProgress={state => onProgress(state)}
            onStart={state => onStart(state)}
            controls={true}
            playing={playing}
            onPlay={() => handlePlay()}
            onPause={() => handlePause()}
            onEnded={(state) => handleOnEnded()}
            onContextMenu={e => e.preventDefault()}
            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
          />

        </Col>
      </Row>
      <Row className='video-note'>
        {/* <p>{countTimeLearning}</p> */}
        <Col>
          <h3><i>Bạn cần học trên 2/3 nội dung bài học để được đánh dấu là hoàn thành</i></h3>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Button
            className="add-note"
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            size={'large'}
            onClick={() => handleAddNote()}
          >
            Thêm ghi chú tại {timeIso}
          </Button>
        </Col>
      </Row>
      <hr style={{
        border: '1px solid #ececec',
        marginTop: 20
      }}/>
      <ModalNote timeSeconds={timeSeconds} timeIso={timeIso} lesson={currentLesson} openModalNote={openModalNote} setOpenModalNote={setOpenModalNote} />
    </>
  )
}

export default VideoLesson
