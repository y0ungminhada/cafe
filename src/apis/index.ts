import axios from 'axios';
import { SignInRequestDto, SignUpRequestDto } from "./request/auth";
import { SignInResponseDto, SignUpResponseDto } from './reponse/auth';
import { ResponseDto } from './reponse';
import { GetSignInUserResponseDto } from './reponse/user';

const DOMAIN ='https://api.dailydevcafe.com';

const API_DOMAIN=`${DOMAIN}/api.v1`;
const authorization = (accessToken : string)=>{
    return { headers:{Authorization:`Bearer ${accessToken}`}}
}

const SIGN_IN_URL=()=>`${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL=()=>`${API_DOMAIN}/auth/sign-up`;

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
