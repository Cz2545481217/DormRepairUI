// stores/counter.js  在pinia中，getters和state中不能使用相同的名字，但是vuex中可以使用相同的名字
import { defineStore } from 'pinia'
import { User } from '@/types/dormUser';
//存储token 和 解析token 的用户
export const useTokenStore = defineStore('auth', {
    state: () => { //管理俩个状态 一个是是否登录成功即token是否存在，二是解析的token里面所包含的数据
        return { isAuth: false, user: {} as User }
    },
    // 也可以定义为
    // state: () => ({ count: 0 })
    getters: { //通过getters对状态state进行获取
        getAuthenticated: (state) => state.isAuth,
        getUser: (state) => state.user
    },
    actions: {
        async setAuth(isAuth: boolean)
         {//修改当前登录的状态
            if (isAuth) {
                this.isAuth = isAuth; //在pinia中this指代state
            } else {
                this.isAuth = false;
            }
        },
        async setUser(user: User) { //解析的用户
            if (user) {
                this.user = user;
            } else {
                this.user = {} as User;
            }
        }
    },
})
