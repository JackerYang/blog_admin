import { get, post, put, del } from "../axios"

// 获取分页列表
export const getArticlePage = params => get("/article/page", params)

// 获取一篇文章
export const getArticle = params => get("/article", params)

// 添加文章
export const addArticle = params => post("/article", params)

// 修改文章
export const editArticle = params => put("/article", params)

// 删除文章
export const delArticle = params => del("/article", params)

// 上传文章banner图
export const uploadBanner = formData => post("/images/article/banner/upload", formData)