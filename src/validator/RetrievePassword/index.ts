import { useUserStore } from "@/store/userStore"
export function userIsExistValidor(rule:any,val:string,call:Function){
    const store = useUserStore()
    store.userIsExistStore(val).then((res)=>{
        if(res.code === 20000){
            call()
        }else if(res.code === 20010){
            call(new Error(res.msg)) 
        }else{
            call(new Error(res))
        }
    })
}

export function passwordIsNull(rule:any,val:string,call:Function) {
    if(val === ''){
        
        return call(new Error('请输入密码'))
    }else{
        return call()
    }
}

export function mailFromDate(rule:any,val:string,call:Function) {
    if(val.includes('@')){
        return call()
    }else{
        return call(new Error('邮箱格式错误'))
    }
}