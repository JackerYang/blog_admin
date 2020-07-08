<template>
    <div class="category">
        <ViewTable :btnList="btnList" :searchList="searchList" :columns="columns" :getDataFn="getDataFn" />
        <CategoryEdit ref="categoryEdit" :getDataFn="getDataFn" />
        <ViewTableDel ref="categoryDel" title="删除分类" :getDataFn="getDataFn" :delDataFn="delDataFn" />
    </div>
</template>

<script>
    import ViewButtons from "../mixins/ViewButtons"
    import ViewTable from "../components/common/ViewTable"
    import CategoryEdit from "../components/category/CategoryEdit"
    import ViewTableDel from "../components/common/ViewTableDel"
    import { delCategory, getCategoryPage } from "../api/interface/category"

    export default {
        name: "Category",
        components: {
            ViewTable,
            CategoryEdit,
            ViewTableDel
        },
        mixins: [ViewButtons],
        data() {
            return {
                searchList: [
                    {
                        label: "分类名称",
                        key: "name",
                        type: "input"
                    }
                ],
                signs: ["add", "edit", "del"],
                columns: [
                    {
                        align: "center",
                        type: "selection",
                        width: "60"
                    },
                    {
                        prop: "name",
                        label: "分类名称"
                    },
                    {
                        prop: "remark",
                        label: "备注"
                    },
                    {
                        prop: "update_time",
                        label: "更新时间"
                    },
                    {
                        prop: "create_time",
                        label: "创建时间"
                    }
                ]
            }
        },
        methods: {
            add() {
                this.$refs.categoryEdit.show = true
            },
            edit(selectedRows) {
                this.$refs.categoryEdit.id = selectedRows[0].id
                this.$refs.categoryEdit.show = true
            },
            del(selectedRows) {
                this.$refs.categoryDel.ids = selectedRows.map(row => row.id)
                this.$refs.categoryDel.show = true
            },
            getDataFn: getCategoryPage,
            delDataFn: delCategory
        }
    }
</script>