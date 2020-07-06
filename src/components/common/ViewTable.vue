<template>
    <div class="view-table">
        <div class="header">
            <div class="search">
                <div v-for="item in searchList" :key="item.label" class="search-item">
                    <template v-if="item.type === 'input'">
                        <el-input
                            clearable
                            size="small"
                            v-model="searchData[item.key]"
                            @input="debounceSearch"
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
            <el-table border @row-click="clickRow" @selection-change="selectRow" ref="ArticleCategoryTable"
                      :data="tableData">
                <el-table-column
                    v-for="column in columns"
                    :key="column.prop"
                    :width="column.width"
                    :type="column.type"
                    :align="column.align"
                    :label="column.label"
                    :prop="column.prop"
                />
            </el-table>
        </div>
        <div class="page">
            <el-pagination
                @size-change="sizeChange"
                @current-change="pageChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="currentSize"
                background
                layout="total, sizes, prev, pager, next"
                :total="400">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { debounce } from "../../libs/util";

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
            }
        },
        data() {
            return {
                tableData: [{}],
                currentPage: 1,
                currentSize: 10,

                // 已选中的行
                selectedRow: [],
                // 搜索数据
                searchData: {}
            }
        },
        methods: {
            // 已选中的行
            selectRow(selectedRow) {
                this.selectedRow = selectedRow
            },
            // 点击行选中或取消
            clickRow(row) {
                this.$refs.ArticleCategoryTable.toggleRowSelection(row)
            },

            // 改变每页多少条
            sizeChange() {
                this.currentPage = 1
                this.getData();
            },
            // 改变页码
            pageChange() {
                this.getData();
            },

            // 搜索条件防抖
            debounceSearch() {
                debounce(this.getData, 300)
            },

            // 获取数据
            getData() {
                console.log("getData")
            },
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
        }
        .page {
            text-align: right;
        }
    }
</style>