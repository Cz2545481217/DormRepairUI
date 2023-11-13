<script lang="ts" setup>
import { reactive,ref } from 'vue'
import { useUserStore } from "@/store/userStore"
import { FormRules, ElMessageBox, ElMessage  } from 'element-plus'
import type { RetrieveUser } from '@/types/retrievePwd'
import  { userIsExistValidor,mailFromDate }  from '@/validator/RetrievePassword';
import { useRouter } from 'vue-router';
const router = useRouter()
const usernameRef = ref()
const store = useUserStore()
let mailBtn = reactive<any>({
	text: '发送',
	duration: 60,
	isSuccess: false,
	disable: false,
	loading: false,
	timer: null,
	err: '123',
	display: 'none'
})
const RePwdUser = reactive<RetrieveUser>({
    username:'',
    password:'',
    mail:'',
    captcha:''
})
const confirm = reactive({value:''})
const getCheckCode = () => {
	// 倒计时期间按钮不能单击
	if (mailBtn.time !== 60) {
		mailBtn.disable = true
	}
// 清除掉定时器
		mailBtn.timer && clearInterval(mailBtn.timer)
		// 开启定时器
		mailBtn.timer = setInterval(() => {
			const tmp = mailBtn.duration--
			mailBtn.text = `${tmp}秒`
			if (tmp <= 0) {
				// 清除掉定时器
				clearInterval(mailBtn.timer)
				mailBtn.duration = 60
				mailBtn.text = '重新获取'
				// 设置按钮可以单击
				mailBtn.disable = false
			}
		}, 1000)
}
//验证码发送
const send = () => {
	if (RePwdUser.mail.length > 1) {
		store.sendStore(RePwdUser.mail,'back').then((res) => {
			if (res.code === 20005) {
				mailBtn.isSuccess = false
				mailBtn.err = '邮箱号错误'
				mailBtn.text = '重新获取'
				mailBtn.display = 'block'
			} else if (res.code === 20006) {
				mailBtn.isSuccess = false
				mailBtn.text = '重新获取'
				mailBtn.err = '邮箱已绑定'
				mailBtn.display = 'block'
			} else {
				getCheckCode()
				mailBtn.err = ''
			}
		})
	} else {
		mailBtn.err = '请输入邮箱号'
		mailBtn.text = '重新获取'
		mailBtn.display = 'block'
		mailBtn.isSuccess = false
	}
}
 //密码相同验证
 const  passwordIsSame = (rule:any,val:string,call:Function) => {
    if(confirm.value === val)
    {
        return call()
    }else{
        return call(new Error('两次输入的密码不一样'))
    }
}
const rules = reactive<FormRules<RetrieveUser>>({
    username:[
        {required:true,message:'请输入用户名'},
        {validator:userIsExistValidor,trigger:'blur'}
    ],
    password:[
        {required:true,message:'请重复密码'},
        {min:8,max:16,message:'至少8位最多16位'},
        {validator:passwordIsSame,trigger:'blur'}
    ],
    mail:[
        {required:true,message:'请输入邮箱'},
        {validator:mailFromDate,trigger:'blur'}
    ],
    captcha:[
        {required:true,message:'请输入验证码'}
    ]
})
//找回密码
const RePwd = () => {
    if(RePwdUser.username.length === 0 || RePwdUser.password.length === 0 || RePwdUser.mail.length === 0 || RePwdUser.captcha.toString().length === 0 ){
        ElMessageBox.alert('请完成信息填写', '提示', {
    confirmButtonText: 'OK',
    callback: () => {
        usernameRef.value.focus()
    },
  })
    }else{
        store.retrievePwdStore(RePwdUser).then((res)=>{
           if(res.code === 20000){
            ElMessage({
        message: '修改成功',
        type: 'success',
         })
         router.push('/login')
           }else{
            ElMessage.error(res.msg)
           }
        })
    }
}
 </script>
<template>
    <div class="bg-box">        
        <div class="pwd-form">
            <el-row :gutter="20">
    <el-col :span="7"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="14">
        <el-form
    style="
    margin-top: 100px;
    "
    ref="ruleFormRef"
    :model="RePwdUser"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    >
    <el-form-item  label="用户名：" prop="username">
      <el-input ref="usernameRef" style="width: 35%; margin-left: 10px;" v-model="RePwdUser.username" type="text" autocomplete="off" />
    </el-form-item>
  <el-form-item label="密码：" prop="confirm">
      <el-input style="width: 35%; margin-left: 10px;" v-model="confirm.value" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item  label="重复密码：" prop="password">
      <el-input style="width: 35%; margin-left: 10px;" v-model="RePwdUser.password" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="邮箱" prop="mail">
      <el-input style="width: 35%; margin-left: 10px;" v-model="RePwdUser.mail" type="text" autocomplete="off" />
      <div class="el-form-item__error" :style="{ display: mailBtn.display }">{{ mailBtn.err }}</div>
    </el-form-item>
    <el-form-item label="验证码:" prop="captcha">
      <el-input  style="width: 35%; margin-left: 10px;" v-model="RePwdUser.captcha" type="text" autocomplete="off" />
      <el-button style="margin-left: 35px;" type="primary" @click="send" :disabled="mailBtn.disable" :loading="mailBtn.loading">{{
						mailBtn.text }}</el-button>
    </el-form-item>
  </el-form>
        </el-col>
    <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
  </el-row>
     
  <div class="container-login100-form-btn">
				<button @click="RePwd"  class="login100-form-btn" style="width: 15%;">
					修改
				</button>
			</div>
    </div>
    </div>
</template>

<style>
.bg-box {
	width: 100vw;
	height: 100vh;
	background-color: #545c64;
	/* div居中 */
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.pwd-form {
	border-radius: 10px;
	width: 62%;
	background-color: white;
	height: 90%;
	text-align: center;
    
}
</style>