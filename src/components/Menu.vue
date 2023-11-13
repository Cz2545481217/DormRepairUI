
<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  const router = useRouter()
  import {
    Menu as IconMenu,
    Location,
  } from '@element-plus/icons-vue'
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  </script>
<template>
  <el-container style="height: 100vh; width: 100vw; border: 1px solid #eee">
    <el-aside width="200px" style="background-color:  #545c64">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="1"
          text-color="#fff"
          
          @open="handleOpen"
          @close="handleClose"
        >
          
        <router-link  to="/admin/stuRp" style="color: white;">
          <el-menu-item index="1">
            <el-icon><icon-menu /></el-icon>
            <span>学生报修管理</span>
          </el-menu-item>
        </router-link>
        <router-link  to="/admin/order" style="color: white;">
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>接单管理</span>
          </el-menu-item>
        </router-link>
        <router-link  to="/admin/student" style="color: white;">
          <el-menu-item index="3">
            <el-icon><icon-menu /></el-icon>
            <span>学生管理 </span>
          </el-menu-item>
        </router-link>
        <router-link  to="/admin/repairer" style="color: white;">
          <el-menu-item index="4">
            <el-icon><icon-menu /></el-icon>
            <span>维修员管理</span> 
          </el-menu-item>
        </router-link>
        <router-link  to="/admin/category" style="color: white;">
          <el-menu-item index="5">
            <el-icon><icon-menu /></el-icon>
            <span>报修类型管理</span> 
          </el-menu-item>
        </router-link>
        <router-link  to="/admin/feedback" style="color: white;">
          <el-menu-item index="6">
            <el-icon><icon-menu /></el-icon>
            <span>留言反馈</span> 
          </el-menu-item>
        </router-link>
        <router-link  to="/admin/evaluation" style="color: white;">
          <el-menu-item index="7">
            <el-icon><icon-menu /></el-icon>
            <span>报修评价管理</span> 
          </el-menu-item>
        </router-link>
        <router-link  to="/admin/sys" style="color: white;">
          <el-menu-item index="8">
            <el-icon><icon-menu /></el-icon>
            <span>系统管理</span> 
          </el-menu-item>
        </router-link>
        </el-menu>
      </el-aside>
      <el-container>
			<el-main>
				<!-- 让主体做子路由的显示 -->
				<router-view></router-view>
			</el-main>
		</el-container>
  </el-container>
  </template>
  
  
  <style scoped>
</style>
  