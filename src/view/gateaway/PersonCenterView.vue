<script lang="ts" setup>
import { reactive } from 'vue'
import type { User } from '@/types/dormUser';
import { useUserStore } from '@/store/userStore';
import { useRouter,useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const store = useUserStore()
const User = reactive({
    mailText: true,
    reMail:false,
    data: <User>{
        id: '',
        cnName: '',
        username: '',
        password: '',
        phone: '',
        statusId: '',
        address: '',
        grade: '',
        className: '',
        isGender: 0,
        cnId: '',
        isDisable: 0,
        dormNum: '',
        mail: '',
        academy: '',
        editBy: '',
        editOn: '',
        createOn: '',
        stuNumber: 0
    }

})
const isAdmin = () => {
    
    if(route.query.type === 'create')
    {
        rules.title ='个人中心',
        rules.btnHidden = true
    }else if(route.query.type === 'edit')
    {
        rules.title ='学生信息核验'
        rules.btnHidden = false

    }
}
//解析token为表单赋值
const getUser = () => {
    store.infoStore(localStorage.getItem('token')?.toString() as string).then((res) => {
        User.data = res.data.User

        User.data.isGender ? User.data.isGender = '男' : User.data.isGender = '女'

        User.data.statusId ? User.data.statusId = '可用' : User.data.statusId = '禁用'
    })
}
//换绑弹窗
const goToReMail = () => {
    store.sendStore(User.data.mail, 'reMail').then((res) => {
        console.log(res);

    })
    let w =  ElMessageBox.prompt('请输入验证码', '提示信息', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        inputValidator: value => {
            if (value.length !== 6) {
                return false
            } else {
                return true
            }
        },
        inputErrorMessage: '验证码格式错误',
    })
        .then(({ value }) => {
            store.reMailStore(value, User.data.mail).then((res) => {
                if (res.code === 20000) {
                    ElMessage({
                        type: 'success',
                        message: `现在可用输入新的邮箱了`,
                    })
                    User.reMail = true
                    User.mailText = false
                }
                else
                {
                    ElMessage({
                    type: 'error',
                    message: res.msg,
            })      
                }
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消',
            })
        })
        console.log(w);
        
}
getUser()
//修改
const updateUser = () => {
    if(User.data.isGender  === '男'){
        User.data.isGender = 1
    }else{
        User.data.isGender = 0
    }

    if(User.data.statusId  === '可用'){
        User.data.statusId = 1
    }else{
        User.data.isGender = 0
    }

    store.updateUserStore(User.data).then((res)=>{
            ElMessage({
                        type: 'success',
                        message: `修改成功`,
                    })
            router.push('/self')
            User.data.isGender ? User.data.isGender = '男' : User.data.isGender = '女'

        User.data.statusId ? User.data.statusId = '可用' : User.data.statusId = '禁用'
    })
}
const rules = reactive({
    title:'',
    btnHidden:false
})

isAdmin()
</script>

<template>
    <div class="bg-box">
        <div class="reg-box">
            <h3 style="margin-top: 20px;">{{ rules.title }}</h3>
            <el-form style="margin-top: 20px;"  :model="User" class="demo-form-inline">
                <el-form-item style="margin-left: 50px;" label="姓名：" prop="username">
                    <el-input style="width: 20%;" v-model="User.data.cnName" clearable />
                </el-form-item>
                <el-form-item style="margin-left: 50px;" label="年级：">
                    <el-input style="width: 20%;" v-model="User.data.grade" clearable />
                </el-form-item>
                <el-form-item style="margin-left: 50px;" label="班级：" prop = "className" >
                    <el-input style="width: 20%;" v-model="User.data.className" clearable />
                </el-form-item>
                <el-form-item style="margin-left: 50px;" label="学号：">
                    <el-input style="width: 20%;" v-model="User.data.stuNumber" clearable />
                </el-form-item>
                <el-form-item style="margin-left: 50px;" label="性别：">
                    <el-select style="width: 10%;" v-model="User.data.isGender">
                        <el-option label="男" value=1 />
                        <el-option label="女" value=0 />
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-left: 50px;" label="状态：">
                    <el-select style="width: 10%;" v-model="User.data.statusId" :disabled=true>
                        <el-option label="可用" value=1 />
                        <el-option label="禁用" value=0 />
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-left: 50px;" label="宿舍：">
                    <el-input style="width: 20%;" v-model="User.data.dormNum" clearable />
                </el-form-item>
                <el-form-item style="margin-left: 50px;" label="邮箱：" prop = "mail" >
                    <el-input style="width: 20%;" v-model="User.data.mail" :disabled=User.mailText clearable />
                    
                    <el-button v-if="rules.btnHidden" style="margin-left: 50px;" type="primary"  :disabled = User.reMail @click="goToReMail">换绑</el-button>
                </el-form-item>
                <el-form-item style="margin-left: 50px;" label="学院：">
                    <el-input style="width: 20%;" v-model="User.data.academy" clearable />
                </el-form-item>
                <el-form-item style="margin-left: 50px;" label="用户名：">
                    <el-input style="width: 20%;" v-model="User.data.username" clearable />
                </el-form-item>
                <el-form-item style="margin-left: 50px;" label="联系方式：" prop = "phone">
                    <el-input style="width: 20%;" v-model="User.data.phone" clearable />
                </el-form-item>
                <el-form-item style="margin-left: 50px;" label="身份证号：" prop = "cnId">
                    <el-input style="width: 20%;" v-model="User.data.cnId" clearable />
                </el-form-item>
                <el-form-item style="margin-left: 50px;" label="创建日期：">
                    <el-date-picker :disabled=true v-model="User.data.createOn" type="date" clearable />
                </el-form-item>
                <el-form-item style="margin-left: 50px;" label="住址：">
                    <el-input style="width: 40%;" v-model="User.data.address" type="textarea" clearable />
                </el-form-item>
            </el-form>
            <div class="container-login100-form-btn">
                <button class="login100-form-btn" @click="updateUser" style="width: 20%;">
                    修改
                </button>
            </div>
        </div>
    </div>
</template>
<style>
.bg-box {
    width: 100vw;
    height: 1100px;
    background-color: #545c64;
    /* div居中 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.reg-box {
    border-radius: 10px;
    width: 80%;
    background-color: white;
    height: 95%;
    text-align: center;
}
</style>
