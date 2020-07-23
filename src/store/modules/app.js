import { getMenuFromRoutes } from "../../libs/util"
import { views } from "../../router/routes"
import { getUserInfo } from "../../api/interface/app"

export default {
    state: {
        userInfo: {},
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
    },

    mutations: {
        SET_USER_INFO: (state, data) => {
            state.userInfo = data
        }
    },

    actions: {
        get_user_info: ({ commit }) => {
            getUserInfo().then(res => {
                if (res.code === 200) {
                    commit("SET_USER_INFO", res.data)
                }
            })
        }
    }
}