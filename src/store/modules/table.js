export default {
    state: {
        tableData: [],
        total: 0,
        loading: false,
        searchData: {
            page: 1,
            pageSize: 10
        }
    },

    mutations: {
        SET_TABLE_DATA: (state, data) => {
            state.tableData = data
        },
        SET_TOTAL: (state, n) => {
            state.total = n
        },
        SET_LOADING: (state, val) => {
            state.loading = val
        },
        SET_SEARCH_DATA: (state, data) => {
            let res = {}
            for (let key in data) {
                if (data.hasOwnProperty(key) && data[key] !== null && data[key] !== undefined && data[key] !== "") {
                    res[key] = data[key]
                }
            }
            state.searchData = res
        }
    },

    actions: {
        get_table_data: ({ commit, state }, fn) => {
            commit("SET_LOADING", true)
            commit("SET_TABLE_DATA", [])
            fn(state.searchData).then(res => {
                if (res.code === 200) {
                    let { record, total } = res.data
                    commit("SET_TABLE_DATA", record)
                    commit("SET_TOTAL", total)
                }
                commit("SET_LOADING", false)
            })
        }
    }
}