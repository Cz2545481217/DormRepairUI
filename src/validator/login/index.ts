import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

export  function passwordValidor(rule:any,value:any,callback:Function){
    const pwdRegex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)$/;
    console.log(value)
    if(!pwdRegex.test(value)){
        callback(new Error('密码必须包含大小写字母以及特殊字符'))
    }else{
        callback() 
    }
}
/*
@param val
*/
export  function mailValidor(rule:any,val:string,call:Function){    
    if(!(val.includes('@'))){
        call(new Error('邮箱格式错误'))
    }else{
        call()
    }
}
//身份证号重复
export function cnIDValidor(){
    ElMessageBox.alert('身份证号已存在', '提示', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: '确定',
        callback: (action: Action) => {
          ElMessage({
            type: 'info',
            message: `action: ${action}`,
          })
        },
      })
}

//验证码错误
export function captchaValidor(){
    ElMessageBox.alert('邮箱验证码错误', '提示', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: '确定',
        callback: (action: Action) => {
          ElMessage({
            type: 'info',
            message: `action: ${action}`,
          })
        },
      })
}
//手机号重复
export function phoneValidor(){
    ElMessageBox.alert('手机号已存在', '提示', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: '确定',
        callback: (action: Action) => {
          ElMessage({
            type: 'info',
            message: `action: ${action}`,
          })
        },
      })
}
//学号重复
export function stuNumberValidor(){
    ElMessageBox.alert('学号已存在', '提示', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: '确定',
        callback: (action: Action) => {
          ElMessage({
            type: 'info',
            message: `action: ${action}`,
          })
        },
      })
}
