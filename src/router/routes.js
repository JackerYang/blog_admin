const views = [
    {
        path: "/",
        name: "home",
        meta: {
            title: "首页",
            icon: "el-icon-house"
        },
        component: () => import("../views/Home.vue")
    },
    {
        path: "/article",
        name: "article",
        meta: {
            title: "文章",
            icon: "el-icon-tickets"
        },
        component: () => import("../views/article/Article.vue")
    },
    {
        path: "/article/add",
        name: "article-add",
        meta: {
            title: "写文章",
            icon: "el-icon-tickets",
            hideInMenu: true
        },
        component: () => import("../views/article/ArticleEdit.vue")
    },
    {
        path: "/article/edit/:id",
        name: "article-edit",
        meta: {
            title: "改文章",
            icon: "el-icon-tickets",
            hideInMenu: true
        },
        component: () => import("../views/article/ArticleEdit.vue")
    },
    {
        path: "/category",
        name: "category",
        meta: {
            title: "分类",
            icon: "el-icon-paperclip"
        },
        component: () => import("../views/Category.vue")
    },
    {
        path: "/comment",
        name: "comment",
        meta: {
            title: "评论",
            icon: "el-icon-chat-line-square"
        },
        component: () => import("../views/Comment.vue")
    },
    {
        path: "/message",
        name: "message",
        meta: {
            title: "留言",
            icon: "el-icon-chat-line-round"
        },
        component: () => import("../views/Message.vue")
    },
    {
        path: "/friend",
        name: "friend",
        meta: {
            title: "友邻",
            icon: "el-icon-link"
        },
        component: () => import("../views/Friend.vue")
    },
    {
        path: "/user",
        name: "user",
        meta: {
            title: "用户",
            icon: "el-icon-user"
        },
        component: () => import("../views/User.vue")
    }
]

const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("../pages/Login.vue")
    },
    {
        path: "",
        component: () => import("../pages/Main.vue"),
        children: views
    }
]

export default routes
export { views }
