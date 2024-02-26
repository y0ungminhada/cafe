import React, { useEffect, useRef, useState } from 'react'
import './style.css';
import { useBoardstore } from 'stores';

export default function BoardWrite() {

  //본문 영역 요소 참조 상태//
  const contentRef = useRef<HTMLTextAreaElement|null>(null);
  //이미지 입력 요소 참조 상태//
  const imageInputRef =useRef<HTMLInputElement|null>(null);
  //게시물 상태//
  const { title,setTitle }=useBoardstore();
  const { content,setContent }=useBoardstore();
  const { boardImageFileList,setBoardImageFileList }=useBoardstore();
  const { resetBoard }=useBoardstore();
  //게시물 이미지 미리보기 URL 상태//
  const [imageUrls,setImageUrls]=useState<string[]>([]);

  //effect 마운트 시 실행될 함수 //
  useEffect(()=>{
    resetBoard();
  },[]);

  return (
    <div id='board-write-wrapper'>
      <div className='board-write-container'>
        <div className='board-write-box'>
          <div className='board-write-title-box'>
            <input className='board-write-title-input' type='text' placeholder='제목을 작성해주세요.' value={title} />
          </div>
          <div className='devider'></div>
          <div className='board-write-content-box'>
            <textarea ref={contentRef} className='board-write-content-textarea' placeholder='본문을 작성해주세요.' value={content}/>
            <div className='icon-button'>
              <div className='icon image-box-light-icon' ></div>
            </div>
            <input ref={imageInputRef} type='file' accept='image/*' style={{display:'none'}}/>
          </div>
          <div className='board-write-images-box'>
            <div className='board-write-image-box'>
              <img className='board-write-image' src='https://oopy.lazyrockets.com/api/v2/notion/image?src=https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Ff71cbdcd-b763-41af-9bbb-42abdb18bd6a%2F924f98cd-0a25-4463-90b5-c222313c4437%2F%25E1%2584%258B%25E1%2585%25AE%25E1%2584%2590%25E1%2585%25A6%25E1%2584%258F%25E1%2585%25A9_%25E1%2584%2589%25E1%2585%25A1%25E1%2584%258B%25E1%2585%25B5%25E1%2584%2590%25E1%2585%25B3_%25E1%2584%2592%25E1%2585%25A6%25E1%2584%2583%25E1%2585%25A5_2000x1333.png&blockId=c2dd0879-c2b5-484e-bbe8-5545f70aa320&width=3600'/>
              <div className='icon-button image-close'>
                <div className='icon close-icon'></div>
              </div>
            </div>

            <div className='board-write-image-box'>
              <img className='board-write-image' src='https://mportal.ajou.ac.kr/file/imageView.do?filePath=/Upload/TIS/ADMIN/BOARD/180904150908_66047992.png'/>
              <div className='icon-button image-close'>
                <div className='icon close-icon'></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
