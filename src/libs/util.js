/**
 * 根据路由表生成菜单
 * @param routes
 * @returns {*}
 */
export const getMenuFromRoutes = routes => {
    return routes.filter(route => !(route?.meta?.hideInMenu)).map(route => {
        let { title, icon } = route.meta;
        let { name, path } = route;
        let children = [];
        if (route.children && route.children.length) {
            children = getMenuFromRoutes(route.children);
        }
        path = path.startsWith("/") ? path : "/" + path;
        return {
            title,
            icon,
            name,
            path,
            children
        };
    })
}

/**
 * 防抖
 * @param fn
 * @param delay
 * @returns {function(...[*]=)}
 */
let debounceTimer;
export const debounce = (fn, delay = 500) => {
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
        debounceTimer = null;
        fn();
    }, delay);
};

/**
 *
 * @param params
 * @param withToken
 * @returns {string}
 */
export const paramsHandler = (params, withToken = false) => {
    let res = ""
    Object.keys(params).forEach(key => {
        if (params[key] || params[key] === 0) {
            res += `${key}=${params[key]}&`
        }
    })

    if (withToken) {
        res = "?" + res
        res = res + `token=${123456}`
    } else {
        res = res.slice(0, res.length - 1)
        res = res ? `?${res}` : ""
    }
    return res
}