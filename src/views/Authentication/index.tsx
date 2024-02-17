import React, { useState , KeyboardEvent, useRef, ChangeEvent} from 'react';
import './style.css';
import InputBox from 'components/InputBox';
import { SignInRequestDto } from 'apis/request/auth';
import { signInRequest } from 'apis';
import { SignInResponseDto } from 'apis/reponse/auth';
import { ResponseDto } from 'apis/reponse';
import {useCookies} from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';

//component : 인증 화면 컴포넌트//
export default function Authentication(){

//state: 화면 상태//
const[view,setView]=useState<'sign-in'|'sign-up'>('sign-in');

//쿠키 상태//
const [cookies, setCookie]=useCookies();

const navigator=useNavigate();

//componet : sign in card 컴포넌트//
const SignUpCard=()=>{
    //render : sign in card 컴포넌트 랜더링//

    return(
        <div className='auth-card'></div>
    );
};

//componet : sign up card 컴포넌트//
const SignInCard=()=>{

    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const[email,setEmail]=useState<string>('');
    const[password, setPassword]=useState<string>('');
    const[passwordType,setPasswordType]=useState<'text'|'password'>('password');
    const[error,setError]=useState<boolean>(false);
    const[passwordButtonIcon,setPasswordButtonIcon]=useState<'eye-light-off-icon'|'eye-light-on-icon'>('eye-light-off-icon')

    //function : sign in response 처리//
    const signInResponse=(responseBody:SignInResponseDto|ResponseDto|null)=>{
        if(!responseBody){
            alert('네트워크 이상입니다.');
            return;
        }
        const {code}=responseBody;
        if(code==='DBE') alert('데이터베이스 오류입니다');
        if(code==='SF'|| code==='VF') setError(true);
        if (code!=='SU') return;

        const {token,expirationTime}=responseBody as SignInResponseDto;
        const now=new Date().getTime();
        const expires=new Date(now+expirationTime*1000);

        setCookie('accessToken',token,{expires,path:MAIN_PATH()});
        navigator(MAIN_PATH());
    }
    //이메일 변경//
    const onEmailChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        setError(false);
        const {value} =event.target;
        setEmail(value);
    }
    //패스워드 변경//
    const onPasswordChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        setError(false);
        const {value} =event.target;
        setPassword(value);
    }
    //event handler//
    const onSignInButtonClickHandler=()=>{
        const requestBody:SignInRequestDto={email,password};
        signInRequest(requestBody).then(signInResponse);

    }
    const onSignUpLinkClickHandler=()=>{
        setView('sign-up');
    }
    const onPasswordButtonClickHandler=()=>{
        if(passwordType==='text'){
            setPasswordType('password');
            setPasswordButtonIcon('eye-light-off-icon');
        }
        else{
            setPasswordType('text');
            setPasswordButtonIcon('eye-light-on-icon');
        }
    }
    const onEmailKeyDownHandler=(event:KeyboardEvent<HTMLInputElement>)=>{
        if(event.key !== 'Enter') return;
        if(!passwordRef.current) return;
        passwordRef.current.focus();
    }
    const onPasswordKeyDownHandler=(event:KeyboardEvent<HTMLInputElement>)=>{
        if(event.key !== 'Enter') return;
        onSignInButtonClickHandler();
    }
    //render : sign Up card 컴포넌트 랜더링//
    return(
        <div className='auth-card'>
            <div className='auth-card-box'>
                <div className='auth-card-top'>
                    <div className='auth-card-title-box'>
                        <div className='auth-card-title'>{'로그인'}</div>
                    </div>
                    <InputBox ref={emailRef} label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요.' error={error} value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler} />
                    <InputBox ref={passwordRef} label='패스워드' type={passwordType} placeholder='비밀번호를 입력해주세요.' error={error} value={password} onChange={onPasswordChangeHandler} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
                </div>
                <div className='auth-card-bottom'>
                    {error &&
                    <div className='auth-sign-in-error-box'>
                        <div className='auth-sign-in-error-message'>
                            {'이메일 주소 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요'}
                        </div>
                    </div>
                    }
                    <div className='black-large-full-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
                    <div className='auth-description-box'>
                        <div className='auth-description'>{'신규 사용자이신가요?'}<span className='auth-description-link' onClick={onSignUpLinkClickHandler}>{'회원가입'}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
    return(
        <div id='auth-wrapper'>
            <div className='auth-container'>
                <div className='auth-jumbotron-box'>
                    <div className='auth-jumbotron-contents'>
                        <div className='auth-logo-icon'></div>
                        <div className='auth-jumbotron-text-box'>
                            <div className='auth-jumbotron-text'>{'환영합니다'}</div>
                            <div className='auth-jumbotron-text'>{'Daily-Dev-Cafe'}</div>
                        </div>
                    </div>
                </div>
                {view==='sign-in'&&<SignInCard/>}
                {view==='sign-up'&&<SignUpCard/>}
            </div>
        </div>
    )
}

