import { del, get, post, put } from "../axios"

// 获取分页列表
export const getUserPage = params => get("/user/page", params)

// 获取一个用户
export const getUser = params => get("/user", params)

// 添加用户
export const addUser = params => post("/user", params)

// 修改用户
export const editUser = params => put("/user", params)

// 删除用户
export const delUser = params => del("/user", params)

// 上传头像
export const uploadAvatar = formData => post("/images/user/avatar/upload", formData)

// 登录
export const login = params => post("/user/login", params)

// 修改密码
export const updatePwd = params => put("/user/update/password", params)

// 获取信息
export const getUserInfo = () => get("/user/info")