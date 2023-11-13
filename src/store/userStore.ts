import { defineStore } from 'pinia'
import type { RegUser } from '@/types/register'
import type { RetrieveUser } from '@/types/retrievePwd'
import type { User } from '@/types/dormUser'
import { login,info, send, regUser,getStatus,userIsExist, retrievePwd, logout,reMail,updateUser } from '@/api/user'
export const useUserStore = defineStore('user',{
    state:() => {
        return {
            user:{} as RegUser
        }
    },
    actions:{
        //用户登录
        async loginStore (data:any) 
        {
            return await login(data)
        },
        //解析Token
        async infoStore(token:string)
        {
            return await info(token)
        },
        //邮箱验证码发送
        async sendStore(mail:string,type:string)
        {   
            return await send(mail,type)
        },
        //注册用户
        async regUserStore(data:RegUser)
        {
            return await regUser(data)
        },
        //获取用户类型
        async getStatuStore()
        {
            return await getStatus()
        },
        //判断用户是否存在
        async userIsExistStore(username:string)
        {
            return await userIsExist(username)
        },
        //找回密码
        async retrievePwdStore(data:RetrieveUser){
            return retrievePwd(data)
        },
        //退出登录
        async logoutStore(){
            return logout()
        },
        //邮箱换绑
        async reMailStore(captcha:string,mail:string)
        {
            return reMail(captcha,mail)
        },
        //修改用户
        async updateUserStore(data:User){
            return updateUser(data)
        }
    }
})