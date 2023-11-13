import { createRouter,createWebHistory } from 'vue-router'
import loginView from '@/view/gateaway/loginView.vue'
import adminView from '@/view/gateaway/adminView.vue'
import registerView from '@/view/gateaway/registerView.vue'
import RetrievePasswordView from '@/view/gateaway/RetrievePasswordView.vue'
import feedback from '@/view/usage/feedbackView.vue'
import ordersView from '@/view/usage/ordersView.vue'
import repairAdminView from '@/view/usage/repairAdminView.vue'
import repairCategoryView from '@/view/usage/repairCategoryView.vue'
import repairEvaluationView from '@/view/usage/repairEvaluationView.vue'
import studentsRepairAdminView from '@/view/usage/studentsRepairAdminView.vue'
import systemAdminView from '@/view/usage/systemAdminView.vue'
import studentAdmin from '@/view/usage/StudetsAdmin.vue'
import repairerAdminViewVue from '@/view/usage/repairerAdminView.vue'
import PersonCenter from '@/view/gateaway/PersonCenterView.vue'
import { ElMessage } from 'element-plus'
const router = createRouter({
    history:createWebHistory(),
    routes:[
        //主页
        {
            path:'/',
            name:'home',
            component:loginView
        },
        //登录页面
        {
            path:'/login',
            name:'login',
            component:loginView
        },
        //管理页面
        {
            path:'/admin',
            name:'admin',
            component:adminView,
            children:[
                //留言反馈界面
                {
                    path:'feedback',
                    name:'feedback',
                    component:feedback
                },
                //系统管理
                {
                    path:'sys',
                    name:'systemAdmin',
                    component:systemAdminView
                },
                //报修类型管理
                {
                    path:'category',
                    name:'category',
                    component:repairCategoryView
                },
                //学生报修管理
                {
                    path:'stuRp',
                    name:'stuRp',
                    component:studentsRepairAdminView
                },
                //报修接单管理
                {
                    path:'order',
                    name:'order',
                    component:ordersView
                },
                //报修评价管理
                {
                    path:'evaluation',
                    name:'evaluation',
                    component:repairEvaluationView
                },
                //报修管理
                {
                    path:'repairAdmin',
                    name:'repairAdmin',
                    component:repairAdminView
                },
                //学生管理
                {
                    path:'student',
                    name:'student',
                    component:studentAdmin
                },
                //维修员管理
                {
                    path:'repairer',
                    name:'repairer',
                    component:repairerAdminViewVue
                }
                    ]
        },
        //创建账号界面
        {
            path:'/reg',
            name:'reg',
            component:registerView
        },

        //忘记密码页面
        {
            path:'/rePwd',
            name:'rePwd',
            component:RetrievePasswordView
        },
        //个人中心
        {
            path:'/self',
            name:'self',
            component:PersonCenter
        }

    ]
})

router.beforeEach((to,from,next)=>{
    if(to.path === '/login' || to.path === '/')
    {
        localStorage.removeItem('token')
        next()

    }
    else if(localStorage.token)
    {
        next()
    }
    else if(to.path === '/reg'|| to.path == '/rePwd')
    {
        next()
    }
    else
    {
        ElMessage({
            message: '请先登录',
            type: 'error',
          })
        next('/')
    }   
    
})

export default router