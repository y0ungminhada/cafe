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

//componet : sign up card 컴포넌트//
const SignUpCard=()=>{
    //render : sign in card 컴포넌트 랜더링//
    const emailRef=useRef<HTMLInputElement|null>(null);
    const passwordRef=useRef<HTMLInputElement|null>(null);
    const passwordCheckRef=useRef<HTMLInputElement|null>(null);
    const nicknameRef=useRef<HTMLInputElement|null>(null);
    const nameRef=useRef<HTMLInputElement|null>(null);

    const [page,setPage]=useState<1|2>(1);
    //입력
    const[email,setEmail]=useState<string>('');
    const[password,setPassword]=useState<string>('');
    const[passwordCheck,setPasswordCheck]=useState<string>('');
    const [name,setName]=useState<string>('');
    const[nickname,setNickname]=useState<string>('');
    const [agreedPersonal,setAgreedPersonal]=useState<boolean>(false);
    //패스워드 타입
    const[passwordType,setPasswordType]=useState<'text'|'password'>('password');
    const[passwordCheckType,setPasswordCheckType]=useState<'text'|'password'>('password');
    //에러 처리
    const [isEmailError,setEmailError]=useState<boolean>(false);
    const [isPasswordError,setPasswordError]=useState<boolean>(false);
    const [isPasswordCheckError,setPasswordCheckError]=useState<boolean>(false);
    const [isNameError,setNameError]=useState<boolean>(false);
    const [isNicknameError,setNicknameError]=useState<boolean>(false);
    const [isAgreedPersonalError,setAgreedPersonalError]=useState<boolean>(false);
    //에러 메시지
    const [emailErrorMessage,setEmailErrorMessage]=useState<string>('');
    const [passwordErrorMessage,setPasswordErrorMessage]=useState<string>('');
    const [passwordCheckErrorMessage,setPasswordCheckErrorMessage]=useState<string>('');
    const [nameErrorMessage,setNameErrorMessage]=useState<string>('');
    const [nicknameErrorMessage,setNicknameErrorMessage]=useState<string>('');

    const[passwordButtonIcon,setPasswordButtonIcon]=useState<'eye-light-off-icon'|'eye-light-on-icon'>('eye-light-off-icon')
    const[passwordCheckButtonIcon,setPasswordCheckButtonIcon]=useState<'eye-light-off-icon'|'eye-light-on-icon'>('eye-light-off-icon')
    //event handler//
    //change evnet
    const onEmailChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        const {value}=event.target;
        setEmail(value);
        setEmailError(false);
        setEmailErrorMessage('');
    }
    const onPasswordChangeHandle=(event:ChangeEvent<HTMLInputElement>)=>{
        const {value}=event.target;
        setPassword(value);
        setPasswordError(false);
        setPasswordErrorMessage('');
    }
    const onPasswordCheckChangeHandle=(event:ChangeEvent<HTMLInputElement>)=>{
        const {value}=event.target;
        setPasswordCheck(value);
        setPasswordCheckError(false);
        setPasswordCheckErrorMessage('');
    }
    const onNameChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        const {value}=event.target;
        setName(value);
        setNameError(false);
        setNameErrorMessage('');
    }
    const onNicknameChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        const {value}=event.target;
        setNickname(value);
        setNicknameError(false);
        setNicknameErrorMessage('');
    }

    const onPasswordButtonClickHandler=()=>{
        if(passwordButtonIcon==='eye-light-off-icon'){
            setPasswordButtonIcon('eye-light-on-icon');
            setPasswordType('text');
        }
        else{
            setPasswordButtonIcon('eye-light-off-icon');
            setPasswordType('password');
        }
    }
    const onPasswordCheckButtonClickHandler=()=>{
        if(passwordButtonIcon==='eye-light-off-icon'){
            setPasswordCheckButtonIcon('eye-light-on-icon');
            setPasswordCheckType('text');
        }
        else{
            setPasswordCheckButtonIcon('eye-light-off-icon');
            setPasswordCheckType('password');
        }
    }
    const onAgreedPersonalClickHandler=()=>{
        setAgreedPersonal(!agreedPersonal);
        setAgreedPersonalError(false);
    }
    const onNextButtonClick=()=>{
        const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/
        const isEmailPattern=emailPattern.test(email);
        if(!isEmailPattern){
            setEmailError(true);
            setEmailErrorMessage('이메일 주소 포멧이 맞지 않습니다.')
        }
        const isCheckedPassword=password.trim().length>=8;
        if (!isCheckedPassword){
            setPasswordError(true);
            setPasswordErrorMessage('비밀번호는 8자 이상 입력해주세요');
        }
        const isEqualPassword=password===passwordCheck;
        if(!isEqualPassword){
            setPasswordCheckError(true);
            setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다');
        }
        if(!isEmailPattern||!isCheckedPassword||!isEqualPassword) return;

        setPage(2);
    }
    //회원가입 버튼 클릭 이벤트 처리
    const onSignUpButtonClickHandler=()=>{
        alert('회원가입 버튼 클릭')
    }
    //키 다운 이벤트 처리
    const onEmailKeyDownHandler=(event:KeyboardEvent<HTMLInputElement>)=>{
        if(event.key!=='Enter') return;
        if(!passwordRef.current) return;
        passwordRef.current.focus();
    }
    const onPasswordKeyDownHandler=(event:KeyboardEvent<HTMLInputElement>)=>{
        if(event.key!== 'Enter') return;
        if(!passwordCheckRef.current) return;
        passwordCheckRef.current.focus();
    }
    const onPasswordCheckKeyDownHandler=(event:KeyboardEvent<HTMLInputElement>)=>{
        if(event.key!=='Enter') return;
        if(!nameRef.current) return;
        onNextButtonClick();
        nameRef.current.focus();
    }
    const onNameKeyDownHandler=(event:KeyboardEvent<HTMLInputElement>)=>{
        if(event.key!=='Enter') return;
        if(!nicknameRef.current) return;
        nicknameRef.current.focus();
    }
    const onNicknameKeyDownHandler=(event:KeyboardEvent<HTMLInputElement>)=>{
        if(event.key!=='Enter') return;
        onSignUpButtonClickHandler();
    }
    //로그인 링크 클릭 이벤트 
    const onSignInLinkClickHandler=()=>{
        setView('sign-in');
    }

    return(
        <div className='auth-card'>
            <div className='auth-card-box'>
                <div className='auth-card-top'>
                    <div className='auth-card-title-box'>
                        <div className='auth-card-title'>{'회원가입'}</div>
                        <div className='auth-card-page'>{`${page}/2`}</div>
                    </div>
                    {page===1 && (
                        <>
                        <InputBox ref={emailRef} label='이메일 주소*' type='text' placeholder='이메일 주소를 입력해세요.' value={email} onChange={onEmailChangeHandler} error={isEmailError} message={emailErrorMessage} onKeyDown={onEmailKeyDownHandler}/>
                        <InputBox ref={passwordRef} label='비밀번호*' type={passwordType} placeholder='비밀번호를 입력해주세요.' value={password} onChange={onPasswordChangeHandle} error={isPasswordError} message={passwordErrorMessage} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
                        <InputBox ref={passwordCheckRef} label='비밀번호 확인*' type={passwordCheckType} placeholder='비밀번호를 다시 입력해주세요.' value={passwordCheck} onChange={onPasswordCheckChangeHandle} error={isPasswordCheckError} message={passwordCheckErrorMessage} icon={passwordCheckButtonIcon} onButtonClick={onPasswordCheckButtonClickHandler} onKeyDown={onPasswordCheckKeyDownHandler}/>
                        
                        </>
                    )}
                    {page===2 && (
                        <>
                        <InputBox ref={nameRef} label="이름*" type='text' placeholder='이름을 입력해주세요.' value={name} onChange={onNameChangeHandler} error={isNameError} message={nameErrorMessage} onKeyDown={onNameKeyDownHandler}/>
                        <InputBox ref={nicknameRef} label="닉네임*" type='text'placeholder='닉네임을 입력해주세요.' value={nickname} onChange={onNicknameChangeHandler} error={isNicknameError} message={nicknameErrorMessage} onKeyDown={onNicknameKeyDownHandler}/>
                        </>
                    )}
                </div>
                <div className='auth-card-bottom'>
                    {page===1 && (
                        <div className='black-large-full-button' onClick={onNextButtonClick}>{'다음 단계'}</div>
                    )}
                    {page===2 && (
                        <>
                        <div className='auth-consent-box'>
                            <div className='auth-check-box' onClick={onAgreedPersonalClickHandler}>
                                <div className={`icon ${agreedPersonal ? 'check-round-fill-icon': 'check-ring-light-icon'}`}></div>
                            </div>
                            <div className={isAgreedPersonalError ? 'auth-consent-title-error':'auth-consent-title'}>{'개인정보동의'}</div>
                            <div className='auth-consent-link'>{'더보기 >'}</div>
                        </div>
                        <div className='black-large-full-button' onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
                        </>
                    )}
                    <div className='auth-description-box'>
                        <div className='auth-description'>{'이미 계정이 있으신가요? '}<span className='auth-description-link' onClick={onSignInLinkClickHandler}>{'로그인'}</span></div>
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

