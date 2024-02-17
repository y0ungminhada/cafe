import React, { ChangeEvent, Dispatch,KeyboardEvent,SetStateAction,forwardRef } from 'react'
import './style.css';

//interface : input box 컴포넌트 properties//
interface Props{
    label:string;
    type:'text'|'password';
    placeholder:string;
    value:string
    setValue:Dispatch<React.SetStateAction<string>>
    error:boolean;

    icon?:string;
    onButtonClick?:()=>void;

    message?:'eye-light-off-icon'|'eye-light-on-icon'|'expand-right-light-icon';

    onKeyDown?:(event:KeyboardEvent<HTMLInputElement>)=> void;
}

//component:input box 컴포넌트//
const InputBox=forwardRef<HTMLInputElement, Props>((props:Props, ref)=>{

    //state : property//
    const{label,type,placeholder,value,error,icon,message}=props;
    const{setValue, onButtonClick,onKeyDown}=props;
    //event handler: input 값 변경 이벤트 처리 함수//
    const onChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        const value=event.target.value;
        setValue(value)
    }
    //event handler: 키 이벤트 처리 함수//
    const onKeyDownHandler=(event:KeyboardEvent<HTMLInputElement>)=>{
        if(!onKeyDown) return;
        onKeyDown(event);
    }

    //render:input box 컴포넌트// 
    return(
        <div className='inputbox'>
            <div className='inputbox-label'>{label}</div>
            <div className={error ? 'inputbox-container-error' : 'inputbox-container'}>
                <input ref={ref} type={type} className='input' placeholder={placeholder} value={value} onChange={onChangeHandler}/>
                {onButtonClick !== undefined &&
                    <div className='icon-button' onClick={onButtonClick}>
                        {icon !== undefined && <div className={`icon ${icon}`}></div>}
                    </div>
                }
                
            </div>
            {message !==undefined && <div className='inputbox-message'>{message}</div>}
        </div>
    )
});

export default InputBox;