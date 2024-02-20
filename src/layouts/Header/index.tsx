import React, { ChangeEvent, useRef, useState, KeyboardEvent, useEffect } from 'react'
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { MAIN_PATH, SEARCH_PATH } from 'constant';

export default function Header() {

  //function 네비게이트 함수//
  const navigate= useNavigate();

  //event handler//
  const onLogoClickHandler=()=>{
    navigate(MAIN_PATH());
  }

  //검색 버튼//
  const SearchButton=()=>{
    //검색 버튼 요소 참조 상태//
    const searchButtonRef=useRef<HTMLDivElement|null>(null);
    
    //검색 버튼 상태//
    const [status,setStatus]=useState<boolean>(false);
    //검색어 상태//
    const[word,setWord]=useState<string>('');
    //검색어 path variable 상태
    const {searchWord }=useParams();

    //event handler 검색어 변경 이벤트 처리 //
    const onSearchWordChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
      const value=event.target.value;
      setWord(value)
    };
    //검색어 키 이벤트 처리 함수/
    const onSearchWordKeyDownHandler=(event:KeyboardEvent<HTMLInputElement>)=>{
      if(event.key!=='Enter') return;
      if(!searchButtonRef.current) return;
      searchButtonRef.current.click();
    };
    //event handler (검색 아이콘 클릭)
    const onSearchButtonClickHandler=()=>{
      if(!status){
        setStatus(!status);
        return;
      }
      navigate(SEARCH_PATH(word));
    };

    //effect 검색어 path variable 변경 시 실행
    useEffect(()=>{
     if(searchWord){
      setWord(searchWord);
      setStatus(true);
     }

    },[searchWord]);

    if(!status)
    //클릭 false 상태//
    return (
    <div className='icon-button' onClick={onSearchButtonClickHandler}>
      <div className='icon search-light-icon'></div>
    </div>
    );

    //클릭 true 상태//
    return(
      <div className='header-search-input-box'>
        <input className='header-search-input' type='text' placeholder='검색어를 입력해주세요. ' value={word} onChange={onSearchWordChangeHandler} onKeyDown={onSearchWordKeyDownHandler} />
        <div ref={searchButtonRef} className='icon-button' onClick={onSearchButtonClickHandler}>
          <div className='icon search-light-icon'></div>
        </div>
      </div>
    );
  }

  return (
    <div id='header'>
      <div className='header-container'>
        <div className='header-left-box' onClick={onLogoClickHandler}>
          <div className='icon-box'>
            <div className='icon logo-dark-icon'></div>
          </div>
          <div className='header-logo'>{'Daily-Dev Cafe'}</div>
        </div>
        <div className='header-right-box'>
          <SearchButton />
        </div>
      </div>
    </div>
  )
}
