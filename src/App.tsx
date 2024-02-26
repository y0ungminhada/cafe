import React, { useEffect, useState } from 'react';
import './App.css';
import InputBox from 'components/InputBox';
import { Route, Routes } from 'react-router-dom';
import Main from 'views/Main';
import Authentication from 'views/Authentication';
import Search from 'views/Search';
import UserP from 'views/User';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';
import Container from 'layouts/Container';
import { USER_PATH } from 'constant';
import { MAIN_PATH,AUTH_PATH,SEARCH_PATH,BOARD_PATH,BOARD_WRITE_PATH,BOARD_DETAIL_PATH,BOARD_UPDATE_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from 'stores';
import { getSignInUserRequest } from 'apis';
import { GetSignInUserResponseDto } from 'apis/reponse/user';
import { ResponseDto } from 'apis/reponse';
import User from 'types/interface/user.interface';



//component : Application 컴포넌트//
function App() {
  
  //로그인 유저 전역 상태//
  const {setLoginUser,resetLoginUser}=useLoginUserStore();
  //cookie 상태//
  const [cookies,setCookie]=useCookies();
  //function get sign in user response처리 함수//
  const getSignInUserResponse=(responseBody:GetSignInUserResponseDto|ResponseDto|null)=>{
    if(!responseBody) return;
    const{code}=responseBody;
    if(code==='AF'||code==='NU'||code==='DBE'){
      resetLoginUser();
      return;
    }
    const loginUser:User = {...(responseBody as GetSignInUserResponseDto)};
    setLoginUser(loginUser);
  }

  //effect accessToken cookie 값이 변경될 때마다 실행할 함수//
  useEffect(()=>{
    if(!cookies.accessToken){
      resetLoginUser();
      return;
    }
    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  },[cookies.accessToken])

  //render: Application 컴포넌트//
  //description : 메인 화명 : '/' -Main
  //description : 로그인 + 회원가입 : '/auth' -Authentication
  //description : 검색화면 : 'search/:word' - Search
  //description : 게시물 상세보기 : '/board/detail/:boardNumber' -BoardDetail
  //description : 게시물 작성하기 '/board/write' -BoardWrite
  //description : 게시불 수정하기 '/board/update/:boardNumber' -BoardUpdate
  //description : 유저 페이지 '/user/:userEmail' -BoardUpdate
  return(
   <Routes>
    <Route element={<Container />}>
      <Route path={MAIN_PATH()} element={<Main/>} />
      <Route path={AUTH_PATH()} element={<Authentication/>} />
      <Route path={SEARCH_PATH(':searchWord')} element={<Search/>} />
      <Route path={USER_PATH(':userEmail')} element={<UserP/>} />
      <Route path={BOARD_PATH()}>
        <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail/>} />
        <Route path={BOARD_WRITE_PATH()} element={<BoardWrite/>} />
        <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate/>} />
      </Route>
      <Route path='*' element={<h1>404 Not Found</h1>}/>
    </Route>
   </Routes>
  );
}

export default App;
