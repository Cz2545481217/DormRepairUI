<script lang="ts" setup>
//样式引入
import '@/layout/login/vendor/bootstrap/css/bootstrap.min.css'
import '@/layout/login/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '@/layout/login/vendor/animate/animate.css'
import '@/layout/login/vendor/css-hamburgers/hamburgers.min.css'
import '@/layout/login/vendor/select2/select2.min.css'
import '@/layout/login/css/util.css'
import '@/layout/login/css/main.css'
import '@/layout/login/images/icons/favicon.ico'
import { ElMessage } from 'element-plus'

//路由引入
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
//请求引入
import { useUserStore } from '@/store/userStore'
const msg: any = ref<HTMLElement>()
const store = useUserStore()
const router = useRouter()

//创建账号
const goRegister = () => {
	router.push('reg')
}
const loginForm = reactive({
	username: '',
	password: ''
})
const login = () => {
	if (loginForm.username.length > 0) {
		if (loginForm.password.length > 0) {
			store.loginStore(loginForm).then((res) => {
				if (res.code === 20000) {
					//存储Token
					const token = res.data.token
					localStorage.setItem('token', token)
					router.push('/admin/stuRp')
				} else {
					msg.value.text = "账号或密码错误"
					msg.value.style.display = 'block'
				}
			}).catch((err) => {
				ElMessage({
					type:'error',
					message:err
				})
			})
		}
		else {
			msg.value.text = "请输入密码"
			msg.value.style.display = "block"
		}
	}
	else {
		msg.value.text = "请输入账号"
		msg.value.style.display = "block"
	}
}

//找回密码
const goRePwd = () => {
	router.push('/rePwd')
}
</script>
<template>
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src="/src/layout/login/images/img-01.png" alt="IMG">
				</div>

				<form class="login100-form validate-form">
					<span class="login100-form-title">
						登录
					</span>

					<div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
						<input class="input100" type="text" name="username" v-model="loginForm.username"
							placeholder="请输入账号">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Password is required">
						<input class="input100" type="password" v-model="loginForm.password" placeholder="请输入密码">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					<a style="margin-right: 100px; color: red; display: none;" ref="msg">账号或密码错误</a>
					<div class="container-login100-form-btn">
						<input type="button" value="登录" @click="login" class="login100-form-btn">
					</div>
					<div class="text-center p-t-12">
						<span class="txt1">
							忘记
						</span>
						<a class="txt2" href="#" @click="goRePwd">
							账号 / 密码?
						</a>
					</div>
					<div class="text-center p-t-136">
						<a class="txt2" href="#" @click="goRegister">
							创建账号
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<style></style>