import http from "axios"
import { Message } from "element-ui"
import router from "../router"

const instance = http.create({
    baseURL: `http://localhost:8000/api`,
    timeout: 1000 * 10
})

// 添加请求拦截器 <==> 请求发起前做的事
instance.interceptors.request.use(
    config => {
        // if (getToken()) {
        //     config.headers["Authorization"] = getToken()
        // }
        return config
    },
    error => {
        return Promise.resolve(error)
    }
)

// 添加响应拦截器 <==> 响应回来后做的事
instance.interceptors.response.use(
    response => {
        if (response.data.code === 401) {
            // 登录过期
            // logoutHandler()
            router.push({ name: "login" }).then(() => {
                Message.error("登录过期")
            })
        } else if (response.data.code !== 200) {
            // 其他错误
            Message.error(response.data.msg)
        }
        return response.data
    },
    error => {
        if (error.response) {
            Message.error(error.response.data.message)
            return Promise.resolve(error.response.data)
        } else {
            if (error.message.indexOf("timeout") >= 0) {
                Message.error("请求超时")
            } else if (error.message.indexOf("Network") >= 0) {
                Message.error("网络错误")
            } else {
                Message.error("未知错误，请联系管理员")
            }
            return Promise.resolve({ code: "400", msg: "未知错误，请联系管理员", data: null })
        }
    }
)

export const get = (url, params) => instance.get(url, { params })
export const post = (url, params) => instance.post(url, params)
export const put = (url, params) => instance.put(url, params)
export const del = (url, params) => instance.delete(url, { params })
