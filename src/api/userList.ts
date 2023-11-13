import axiosInstance from "@/config/axiosConfig"
import type { searchStudent } from "@/types/search/searchStudent"
export function tableData(params:searchStudent) {
    return axiosInstance({
        url:'/student/list',
        method:'get',
        params
    })
}
export function delStudent(id:string){
    return axiosInstance({
        url:'/student/del',
        method:'delete',
        params:{
            id:id
        }
    })
}