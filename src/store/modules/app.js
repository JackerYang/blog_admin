import { getMenuFromRoutes } from "../../libs/util";
import { views } from "../../router/routes";

export default {
    state: {
        btnMap: {
            add: {
                title: "添加",
                icon: "el-icon-plus",
                condition: "any",
                type: "primary"
            },
            edit: {
                title: "修改",
                icon: "el-icon-edit",
                condition: "single",
                type: "warning"
            },
            del: {
                title: "删除",
                icon: "el-icon-delete",
                condition: "multiple",
                type: "danger"
            }
        }
    },

    getters: {
        menuList: () => getMenuFromRoutes(views)
    }
}