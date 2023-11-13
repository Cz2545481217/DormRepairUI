import axios,{AxiosInstance,AxiosResponse} from 'axios'
const axiosInstance:AxiosInstance = axios.create({
    baseURL:'http://192.168.158.1:8081/api',
    timeout:20000
})
//请求拦截器
axiosInstance.interceptors.request.use(
    (conf) => {
        //发送请求do
        return conf
    },
    //处理请求错误
    (err:any) => {
        return Promise.reject(err)
    }
)
//响应拦截器
axiosInstance.interceptors.response.use(
    //对响应数据do
    (res:AxiosResponse) => {
        return res.data
    },
    //处理错误信息
    (err) => {
        return Promise.reject(err)
    }
)

export default axiosInstance