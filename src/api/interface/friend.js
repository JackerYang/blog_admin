import { del, get, post, put } from "../axios"

// 获取分页列表
export const getFriendPage = params => get("/friend/page", params)

// 获取一个友邻
export const getFriend = params => get("/friend", params)

// 添加友邻
export const addFriend = params => post("/friend", params)

// 修改友邻
export const editFriend = params => put("/friend", params)

// 删除友邻
export const delFriend = params => del("/friend", params)

// 上传友邻头像
export const uploadAvatar = formData => post("/images/friend/avatar/upload", formData)