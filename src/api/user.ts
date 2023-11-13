import axiosInstance from "@/config/axiosConfig";
import { User } from "@/types/dormUser";
import type { RegUser } from "@/types/register";
import type { RetrieveUser } from "@/types/retrievePwd"
//登录
export  function login(data:any)
{
    return axiosInstance({
        url:'/user/login',
        method:'post',
        data
    })
}

//解析token
export function info(token:string) {
    return axiosInstance({
        url:'/user/info',
        method:'get',
        params:{
            token:token
        }
    })
}

//邮箱验证码发送
export function send(mail:string,type:string) {
    return axiosInstance({
        url:'/mail/send',
        method:'get',
        params:{
            mail:mail,
            type:type
        }
    })
}
//注册用户
export function regUser(data:RegUser) {
    return axiosInstance({
        url:'/user/reg',
        method:'post',
        data
    })    
}
//获取用户类型
export function getStatus(){
    return axiosInstance({
        url:'/user/status',
        method:'get'
    })
}

//判断用户是否存在
export function userIsExist(username:string){
    return axiosInstance({
        url:'/user/exUsers',
        method:'get',
        params:{
            username:username
        }
    })
}

//找回密码
export function retrievePwd(data:RetrieveUser){
    return axiosInstance({
        url:'/user/retrieve',
        method:'put',
        data
    })
}
//退出登录
export function logout() {
    return axiosInstance({
        url:"/user/logout",
        method:"get"
    })
}
//换绑验证
export function reMail(captcha:string,mail:string)
{
    return axiosInstance({
        url:'/user/reMail',
        method:'get',
        params:{
            captcha:captcha,
            mail:mail
        }
    })
}
//修改用户
export function  updateUser(data:User) {
    return axiosInstance({
        url:'/user/update',
        method:'post',
        data
    })
}
