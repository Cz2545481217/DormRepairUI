<script lang="ts" setup>
//user引入
import type { RegUser } from '@/types/register'
import type { FormInstance, FormRules } from 'element-plus';
//表单model创建
import { nextTick, reactive, ref } from 'vue'

const statusItem = reactive({
	data:[
		{
			statusId: 0,
			statusName: ''
		}
	]
}
)
//学院
const options = [
    {
        value: '会计学院',
        label: '会计学院',
    },
    {
        value: '马克思主义学院',
        label: '马克思主义学院',
    },
    {
        value: '人文学院',
        label: '人文学院',
    },
    {
        value: '计算机与信息工程学院',
        label: '计算机与信息工程学院',
    },
    {
        value: '经济与管理学院',
        label: '经济与管理学院',
    },
    {
        value: '人文学院',
        label: '人文学院',
    },
    {
        value: '生物与化学工程学院',
        label: '生物与化学工程学院',
    },
    {
        value: '机械与自动化学院',
        label: '机械与自动化学院',
    },
    {
        value: '粮食与食品工程学院',
        label: '粮食与食品工程学院',
    },
    {
        value: '外国语学院',
        label: '外国语学院',
    },
    {
        value: '艺术与设计学院',
        label: '艺术与设计学院',
    }
]
//表单验证函数引入
import { mailValidor } from '@/validator/login/index'
import { useUserStore } from '@/store/userStore';
import router from '@/router';
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

const formRef = ref<FormInstance>()
const user = reactive<RegUser>({
	cnName: '',
	username: '',
	password: '',
	phone: '',
	address: '',
	grade: '',
	className: '',
	isGender: '男',
	stuNumber: '',
	cnID: '',
	dormNum: '',
	mail: '',
	academy: '',
	captcha: '',
	statusId: '',
	type:'reg'
})
const rules = reactive<FormRules<RegUser>>({
	username: [
		{ required: true, message: '请输入用户名' },
		{ min: 2, max: 16, message: '至少2位且不能超过16位', trigger: 'blur' }
	],
	password: [
		{ required: true, message: '请输入密码' },
		{ min: 8, max: 16, message: '至少8位且不能超过16位', trigger: 'blur' }
	],
	cnName: [
		{ required: true, message: '请输入姓名' },
		{ min: 2, max: 10, message: '姓名格式有误', trigger: 'blur' }
	],
	dormNum: [
		{ required: true, message: '请输入宿舍号' },
		{ min: 2, max: 15, message: '宿舍格式有误', trigger: 'blur' }
	],
	academy: [
		{ required: true, message: '请输入院系' },
		{ min: 2, max: 20, message: '院系格式有误', trigger: 'blur' }
	],
	className: [
		{ required: true, message: '请输入班级' }
	],
	cnID: [
		{ required: true, message: '请输入身份证号' },
		{ min: 18, max: 18, message: '身份证号格式有误', trigger: 'blur' }
	],
	mail: [
		{ required: true, message: '请输入邮箱号' },
		{ validator: mailValidor, trigger: 'blur' }
	],
	captcha: [
		{ required: true, message: '请输入验证码' }
	],
	phone: [
		{ required: true, message: '请输入手机号' }
	]
})
//获取员工类型
const getStatus = () => {
	nextTick(() => {
		store.getStatuStore().then((res) => {
			statusItem.data = res.data.data
		})
	})

}
getStatus()
// 根据用户名获取验证码
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
	
	if (user.mail.length > 1) {
		store.sendStore(user.mail,'reg').then((res) => {
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
//用户创建
const reg = () => {
	//用户类型判断
	if (user.statusId === '学生') {
		user.statusId = 1
	} else if (user.statusId === '维修人员') {
		user.statusId = 2
	} else {
		user.statusId = 3
	}
	//用户性别判断
	if (user.isGender === '男') {
		user.isGender = 1
	} else {
		user.isGender = 0
	}
	store.regUserStore(user).then((res) => {		
		if (res.code === 20000) {
			alert('注册成功')
			router.push('/login')
		} else if (res.code === 20004) {
			alert('验证码错误')
		}else if(res.code === 20007){
			alert('学号已被绑定')
		}else if(res.code === 20008){
			alert('身份证号已被绑定')
		}else if(res.code === 20009){
			alert('手机号已被绑定')
		}
	})
}
</script>
<template>
	<div class="bg-box">
		<div class="reg-box">
			<el-form class="reg-form demo-dynamic"  ref="formRef" :rules="rules" :model="user" :inline="true"
				label-width="120px">
				<el-form-item prop="username" label="用户名:">
					<el-input v-model="user.username" placeholder="请输入用户名" />
				</el-form-item>
				<el-form-item prop="password" label="密码:">
					<el-input type="password" v-model="user.password" placeholder="请输入密码" />
				</el-form-item>
				<el-form-item label="姓名:" prop="cnName">
					<el-input v-model="user.cnName" placeholder="请输入姓名" />
				</el-form-item>
				<el-form-item label="性别:">
					<el-select v-model="user.isGender">
						<el-option label="男" selelcted value='男' />
						<el-option label="女" value='女' />
					</el-select>
				</el-form-item>
				<el-form-item label="身份:">
					<el-select v-model="user.statusId" placeholder="请选择身份">
						<el-option v-for="item in statusItem.data" :label="item.statusName" :value="item.statusId"
							:key="item.statusId" />
					</el-select>
				</el-form-item>
				<el-form-item label="联系方式:">
					<el-input v-model="user.phone" placeholder="请输入手机号" />
				</el-form-item>
				<el-form-item label="学号:">
					<el-input v-model="user.stuNumber" placeholder="请输入学号" />
				</el-form-item>
				<el-form-item label="宿舍号:" prop="dormNum">
					<el-input v-model="user.dormNum" placeholder="请输入宿舍号" />
				</el-form-item>
				<el-form-item label="学院:" prop="academy">
					<el-select prop="academy" placeholder="请选择学院" style="width: 220px;" v-model="user.academy">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
				</el-form-item>
				
				<el-form-item label="班级:" prop="class">
					<el-input v-model="user.className" placeholder="请输入班级" />
				</el-form-item>
				<el-form-item label="年级:">
					<el-input v-model="user.grade" placeholder="请输入年级" />
				</el-form-item>
				<el-form-item label="住址:" prop="address">
					<el-input v-model="user.address" placeholder="请输入住址" />
				</el-form-item>
				<el-form-item label="身份证号:" prop="cnID">
					<el-input v-model="user.cnID" placeholder="请输入身份证号" />
				</el-form-item>
				<el-form-item  label="邮箱:" prop="mail">
					<el-input v-model="user.mail" type="mail" placeholder="请输入邮箱" />
					<div class="el-form-item__error" :style="{ display: mailBtn.display }">{{ mailBtn.err }}</div>
				</el-form-item>
				<el-form-item prop="code">
					<el-input style="width: 180px; margin-left: 60px;" placeholder="请输入验证码" v-model="user.captcha" />
					<el-button type="primary" style="margin-left: 30px;"  @click="send" :disabled="mailBtn.disable" :loading="mailBtn.loading">{{
						mailBtn.text }}</el-button>
				</el-form-item>
			</el-form>
			<div class="container-login100-form-btn">
				<button @click="reg" class="login100-form-btn" style="width: 20%;">
					创建
				</button>
			</div>
		</div>
	</div>
</template>
<style scoped>
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

.reg-box {
	border-radius: 10px;
	width: 62%;
	background-color: white;
	height: 95%;
	text-align: center;
}

.reg-form {
	margin-top: 80px;
}

.reg-form .el-form-item {
	font-size: 10pt;
	margin-top: 10px;
}

.el-form-item .el-input {
	width: 225px;

}
</style>