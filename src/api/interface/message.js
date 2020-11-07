import { del, get } from "../axios"

// 获取分页列表
export const getMessagePage = params => get("/message/page", params)

// 获取一个留言
export const getMessage = params => get("/message", params)

// 删除留言
export const delMessage = params => del("/message", params)