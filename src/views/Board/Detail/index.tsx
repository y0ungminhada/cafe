import React from 'react'
import './style.css';

export default function BoardDetail() {
  //상단 컴포넌트//
  const BoardDetailTop=()=>{

    return(
      <div id='board-detail-top'>
        <div className='board-detail-top-header'>
          <div className='board-detail-title'>{'타이틀입니다'}</div>
          <div className='board-detail-top-sub-box'>
            <div className='board-detail-write-info-box'>
              <div className='board-detail-writer-profile-image'></div>
              <div className='board-detail-writer-nickname'>{'박영민'}</div>
              <div className='board-detail-info-divider'>{'\|'}</div>
              <div className='board-detail-writer-date'>{'2020.05.26. '}</div>
            </div>
            <div className='icon-button'>
              <div className='icon more-icon'></div>
            </div>
            <div className='board-detail-more-box'>
              <div className='board-detail-update-button'>{'수정'}</div>
              <div className='divider'></div>
              <div className='board-detail-delete-button'>{'삭제'}</div>
            </div>
          </div>
        </div>
        <div className='divider'></div>
        <div className='board-deatail-top-main'>
          <div className='board-detail-main-text'>{'본문입니다.'}</div>
          <div className='board-detail-main-image'></div>
        </div>
      </div>
    )

  }
  //하단 컴포넌트//
  const BoardDetailBottom=()=>{
    return(<></>)
  }
  return (
    <div id='board-detail-wrapper'>
      <div className='board-detail-container'>
        <BoardDetailTop />
        <BoardDetailBottom />
      </div>
    </div>
  )
}
