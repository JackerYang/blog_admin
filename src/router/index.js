import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes"
import NProgress from "../assets/js/NProgress"
import { getToken } from "@/libs/token"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes
})

// 跳转前
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken() && to.name === "login") {
        if (from.name === "home") {
            next(false)
            NProgress.done()
        } else {
            next({ name: "home" })
        }
    } else if (!getToken() && to.name !== "login") {
        if (from.name === "login") {
            next(false)
            NProgress.done()
        } else {
            next({ name: "login" })
        }
    } else {
        next()
    }
})

// 跳转后
router.afterEach(() => {
    NProgress.done()
})

export default router
