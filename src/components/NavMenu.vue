<script lang="ts" setup>
  import { onMounted, reactive,ref } from 'vue'
  import { Avatar } from '@element-plus/icons-vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { User } from '@/types/dormUser';
  import { useUserStore } from '@/store/userStore'
  import router from '@/router'
  
  const store = useUserStore()
  let User = reactive({  
    data:{
      id:'',
    cnName:'',
    username:'',
    password:'',
    phone:'',
    statusId:'',
    address:'',
    grade:'',
    className:'',
    isGender:0,
    cnId:'',
    isDisable:0,
    dormNum:'',
    mail:'',
    academy:'',
    editBy:'',
    editOn:'',
    createOn:''
    }
  })
  const refName = ref('')
  //解析token
  const resolveToken = () => {
    const token:string = localStorage.getItem('token')?.toString() as string
    store.infoStore(token).then((res)=>{
      console.log(res);
      User.data = res.data.User
      
      console.log(User);
    
      console.log(refName.value)
    })
  }
  onMounted(()=>{
    resolveToken()
  })
  
  //个人中心
  const gotoPersonCenter = () => {
    router.push({
      path:'/self',
      query:{
        type:"create"
      }
    })
  }

  //退出
  const logout = () => {
    ElMessageBox.confirm('您确定要退出吗？','提示信息',{
      confirmButtonText:'确定',
      cancelButtonText:'取消',
      type:'warning'
    }).then(()=>{
      store.logoutStore().then((res)=>{
      if(res.code === 20000){
          localStorage.removeItem
          ElMessage({message:'已退出',type:'success'})
          router.push('/login')
      }
    })
    })
    
  }
  
  //用户操作
  const handleCommand = (command: string | number | object) => {
  if(command === 'b'){
    logout()
  }else if(command === 'a'){
    gotoPersonCenter()
  }
  }

  </script>
<template>
    <div class="h-6" />
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      style="width:100vw;"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :ellipsis="false"
    >
      <el-menu-item @click="()=>{router.push('/admin')}" index="1">
        智慧报修检修系统
        </el-menu-item>
      <div class="flex-grow"/>
      <el-menu-item>
      <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link" style="color:white;">
      <a ref="refName">{{User.data.cnName}}</a>  <el-icon class="el-icon--right"> <Avatar /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="a">个人中心</el-dropdown-item>
        <el-dropdown-item command="b" style="color: red;">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
      </el-menu-item>
    </el-menu>
  </template>
  

  <style scoped>
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon--right{
  color:white;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.flex-grow {
  flex-grow: 1;
}
</style>
  
