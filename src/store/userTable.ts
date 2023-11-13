import { User } from "@/types/dormUser"
import { defineStore } from "pinia"
import type {searchStudent} from '@/types/search/searchStudent'
import { delStudent, tableData } from "@/api/userList"
export const userTableStore = defineStore('userList',{
    state:() => {
        return {
            userList: {} as User
        }
    },
    actions:{
        async tableDataStore(params:searchStudent){
            return await tableData(params)
        },
        async delStudentStore(id:string){
            return await delStudent(id)
        }
    }
})