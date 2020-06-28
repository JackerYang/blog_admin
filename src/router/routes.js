const views = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/Home.vue")
    }
];

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
];

export default routes;
export {views};
