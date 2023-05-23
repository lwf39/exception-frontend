import axios from 'axios'

//创建axios实例
const service = axios.create({
    baseURL: "/api",
    timeout: 5000,//超时时间
    headers: {//编译语言
        "Content-type": "application/json;charset=utf-8"
    }
})

export default service