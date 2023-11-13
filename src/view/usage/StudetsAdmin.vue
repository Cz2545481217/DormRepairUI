<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import type { searchStudent } from '@/types/search/searchStudent'
import { User } from '@/types/dormUser';
import { userTableStore } from '@/store/userTable'
import { useRouter } from 'vue-router';
import moment from 'moment'
import "moment/locale/zh-cn";
const router = useRouter()
const store = userTableStore()
const  columns:any = [
    {
        title:'学号',
        dateIndex:'stuNumber',
        width:'10%'
    },
    {
        title:'姓名',
        dateIndex:'cnName',
        width:'10%'
    },
    {
        title:'性别',
        dateIndex:'isGender',
        width:'10%'
    },
    {
        title:'邮箱',
        dateIndex:'mail',
        width:'10%'
    },
    {
        title:'联系方式',
        dateIndex:'phone',
        width:'10%'
    },
    {
        title:'班级',
        dateIndex:'className',
        width:'10%'
    },
    {
        title:'学院',
        dateIndex:'grade',
        width:'10%'
    },
    {
        title:'宿舍',
        dateIndex:'dormNum',
        width:'10%'
    },
    {
        title:'操作',
        width:'10%'
    }
]
//搜索值
const search = reactive({
    data: <searchStudent>{
        stuNumber: 0,
        cnName: '',
        academy: '',
        fromTime: '',
        toTime: ''
    }
})
moment.locales()
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
    },
    {
        value: '',
        label: '不选',
    }
]
const defualtData = () => {
    store.tableDataStore(search.data).then((res) => {
        tableData.value = res.data.data
        tableData.value.forEach((item) => {
            if (item.isGender === 1) {
                item.isGender = '男'
            } else if (item.isGender === 0) {
                item.isGender = '女'
            }
        })
    })
}
defualtData()
//list数据
const tableData = ref<User[]>([])

//表格渲染
const getTableList = async () => {
    search.data.toTime = moment(search.data.toTime).format('yyyy-MM-DD')
    if (search.data.fromTime.length === 12 || search.data.fromTime.length === 0) {
        search.data.fromTime = ''
    } else {
        search.data.fromTime = moment(search.data.fromTime).format('yyyy-MM-DD')
    }

    if (search.data.toTime.length === 12 || search.data.toTime.length === 0) {
        search.data.toTime = ''
    } else {
        search.data.toTime = moment(search.data.toTime).format('yyyy-MM-DD')
    }

    store.tableDataStore(search.data).then((res) => {
        tableData.value = res.data.data
        tableData.value.forEach((item) => {
            if (item.isGender === 1) {
                item.isGender = '男'
            } else if (item.isGender === 0) {
                item.isGender = '女'
            }
        })
    })
}



const goEdit = () => {
    router.push({
        path: '/self',
        query: {
            type: 'edit'
        }
    })
}
const delStudent = (id:string) => 
{
        ElMessageBox.confirm(
            '是否确认删除?',
            '提示信息',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(()=>{
            store.delStudentStore(id).then((res)=>{
                if(res.code === 20000){
                    getTableList()
                    ElMessage({
                    type:'success',
                    message:'删除成功'
                })
                }
            })
        }).catch(()=>{
            ElMessage({
                    type:'warning',
                    message:'取消删除'
                })
        })
        console.log(id);
}
</script>
<template>
    <span class="ml-3 w-35 text-gray-600 inline-flex items-center">学号：</span>
    <el-input style="width: 150px;" placeholder="请输入学号" :prefix-icon="Search" v-model="search.data.stuNumber" />
    <span class="ml-3 w-35 text-gray-600 inline-flex items-center">姓名：</span>
    <el-input style="width: 150px;" v-model="search.data.cnName" placeholder="请输入姓名" :prefix-icon="Search" />
    <span class="ml-3 w-35 text-gray-600 inline-flex items-center">学院：</span>
    <el-select class="m-2" placeholder="请选择学院" style="width: 150px;" v-model="search.data.academy">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <span class="ml-3 w-35 text-gray-600 inline-flex items-center">创建日期从：</span>
    <el-config-provider :locale="zhCn">
        <el-date-picker v-model="search.data.fromTime" type="date" style="width: 150px;" placeholder="选择日期">
        </el-date-picker>
    </el-config-provider>
    <span class="ml-3 w-35 text-gray-600 inline-flex items-center">到：</span>
    <el-config-provider :locale="zhCn">
        <el-date-picker type="date" v-model="search.data.toTime" style="width: 150px;" placeholder="选择日期">
        </el-date-picker>
    </el-config-provider>
    <el-button type="primary" style="margin-left: 50px;" :icon="Search" @click="getTableList">搜索</el-button>
    <!-- 表格 -->


    <a-table  :columns="columns" :data-source="tableData" bordered>
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'">
            <a>action</a>
          </template>
        </template>

  </a-table>
</template>
<style scoped>
</style>