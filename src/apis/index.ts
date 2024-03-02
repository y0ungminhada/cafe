import axios from 'axios';
import { SignInRequestDto, SignUpRequestDto } from "./request/auth";
import { SignInResponseDto, SignUpResponseDto } from './reponse/auth';
import { ResponseDto } from './reponse';
import { GetSignInUserResponseDto } from './reponse/user';
import { PostBoardRequestDto } from './request/board';
import { PostBoardResponseDto } from './reponse/board';
import { error } from 'console';

const DOMAIN ='https://api.dailydevcafe.com';

const API_DOMAIN=`${DOMAIN}`;
const authorization = (accessToken : string)=>{
    return { headers:{Authorization:`Bearer ${accessToken}`}}
}

const SIGN_IN_URL=()=>`${DOMAIN}/auth/signin`;
const SIGN_UP_URL=()=>`${DOMAIN}/auth/signup`;

export const signInRequest=async(requestBody:SignInRequestDto)=>{
    const result=await axios.post(SIGN_IN_URL(),requestBody)
    .then(response=>{
        const responseBody:SignInResponseDto=response.data;
        return responseBody
    })
    .catch(error =>{
        if(!error.response.data) return null;
        const reponseBody:ResponseDto=error.response.data;
        return reponseBody
    })
    return result;
}

export const signUpRequest=async(requestBody:SignUpRequestDto)=>{
    const result=await axios.post(SIGN_UP_URL(),requestBody)
    .then(response => {
        const responseBody:SignUpResponseDto = response.data;
        return responseBody;
    })
    .catch(error =>{
        if(!error.response.data) return null;
        const responseBody:ResponseDto=error.reponse.data;
        return responseBody;
    });
    return result;
}

const POST_BOARD_URL = () => `${API_DOMAIN}/board`;

export const PostBoardRequest = async (requestBody:PostBoardRequestDto,accessToken:string)=>{
    const result =await axios.post(POST_BOARD_URL(),requestBody,authorization(accessToken))
    .then(reponse =>{
        const responseBody : PostBoardResponseDto=reponse.data;
        return responseBody;
    })
    .catch(error=>{
        if(!error.response) return null;
        const reponseBody:ResponseDto=error.response.data;
        return reponseBody
    })
    return result;
}

const GET_SIGN_IN_USER_URL = ()=>`${API_DOMAIN}/user`;

export const getSignInUserRequest = async(accessToken:string) =>{
    const result = await axios.get(GET_SIGN_IN_USER_URL(),authorization(accessToken))
        .then(response => {
            const reponseBody:GetSignInUserResponseDto=response.data;
            return reponseBody
        })
        .catch(error => {
            if(!error.response)return null;
            const responseBody:ResponseDto=error.response.data;
            return responseBody;
        });
    return result
}

const FILE_DOMAIN=`${DOMAIN}/file`;

const FILE_UPLOAD_URL=()=>`${FILE_DOMAIN}/upload`;

const multipartFormData ={headers:{'Content-Type':'multipart/form-data'}}

export const fileUploadRequest=async (data:FormData)=>{
    const result=await axios.post(FILE_UPLOAD_URL(),data,multipartFormData)
    .then(reponse => {
        const responseBody:string=reponse.data;
        return responseBody;
    })
    .catch(error=>{
        return null;
    })
    return result;
}