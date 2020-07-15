<template>
    <div class="view-table">
        <div class="header">
            <div class="search">
                <div v-for="item in searchList" :key="item.label" class="search-item">
                    <template v-if="item.type === 'input'">
                        <el-input
                            clearable
                            size="small"
                            v-model="item.value"
                            @input="debounceSearch(item.key, item.value)"
                            @keydown.native.enter="getData"
                            :placeholder="'根据'+item.label+'搜索'" />
                    </template>
                </div>
            </div>
            <div class="btn">
                <el-button
                    size="small"
                    round plain
                    v-for="btn in btnList"
                    :key="btn.title"
                    :type="btn.type"
                    @click="btn.fn(selectedRow)"
                    :icon="btn.icon"
                    :disabled="btn.condition === 'any' ? false : btn.condition === 'single' ? selectedRow.length !== 1 : selectedRow.length === 0"
                >
                    {{ btn.title }}
                </el-button>
            </div>
        </div>
        <div class="table">
            <el-table
                border
                @row-click="clickRow"
                @selection-change="selectRow"
                ref="viewTable"
                v-loading="loading"
                :data="tableData">
                <template v-for="column in columns">
                    <el-table-column
                        v-if="column.render === 'friend-avatar'"
                        :key="column.prop"
                        :width="column.width"
                        :type="column.type"
                        :label="column.label"
                        :prop="column.prop"
                        align="center"
                        class-name="friend-avatar"
                    >
                        <template slot-scope="scope">
                            <img :src="scope.row.avatar" alt="头像">
                        </template>
                    </el-table-column>
                    <el-table-column
                        v-else
                        :key="column.prop"
                        :width="column.width"
                        :type="column.type"
                        :label="column.label"
                        :prop="column.prop"
                        align="center"
                    />
                </template>
            </el-table>
        </div>
        <div class="page">
            <el-pagination
                @size-change="sizeChange"
                @current-change="pageChange"
                :current-page="searchData.page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="searchData.pageSize"
                background
                layout="total, sizes, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { debounce } from "../../libs/util"
    import { mapActions, mapMutations, mapState } from "vuex"

    export default {
        name: "ViewTable",
        props: {
            searchList: {
                type: Array,
                default: () => []
            },
            btnList: {
                type: Array,
                default: () => []
            },
            columns: {
                type: Array,
                default: () => []
            },
            getDataFn: {
                type: Function,
                require: true
            }
        },
        computed: {
            ...mapState({
                tableData: state => state.table.tableData,
                total: state => state.table.total,
                loading: state => state.table.loading,
                searchData: state => state.table.searchData
            })
        },
        data() {
            return {
                // 已选中的行
                selectedRow: []
            }
        },
        methods: {
            ...mapMutations({
                SET_SEARCH_DATA: "SET_SEARCH_DATA"
            }),
            ...mapActions({
                get_table_data: "get_table_data"
            }),
            // 已选中的行
            selectRow(selectedRow) {
                this.selectedRow = selectedRow
            },
            // 点击行选中或取消
            clickRow(row) {
                this.$refs.viewTable.toggleRowSelection(row)
            },

            // 改变每页多少条
            sizeChange(pageSize) {
                this.SET_SEARCH_DATA({
                    ...this.searchData,
                    page: 1,
                    pageSize
                })
                this.getData()
            },
            // 改变页码
            pageChange(page) {
                this.SET_SEARCH_DATA({
                    ...this.searchData,
                    page
                })
                this.getData()
            },

            // 搜索条件防抖
            debounceSearch(key, val) {
                let temp = {
                    ...this.searchData,
                }
                temp[key] = val
                this.SET_SEARCH_DATA(temp)
                debounce(this.getData, 300)
            },

            getData() {
                this.get_table_data(this.getDataFn)
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style lang="less">
    .view-table {
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .search {
                display: flex;
                &-item {
                    margin-right: 20px;
                }
            }
        }
        .table {
            margin: 20px 0;
            .el-table__body {
                .friend-avatar {
                    padding: 3px 0;
                    .cell {
                        height: 41px;
                        img {
                            height: 41px;
                        }
                    }
                }
            }
        }
        .page {
            text-align: right;
        }
    }
</style>