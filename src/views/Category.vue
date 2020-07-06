<template>
    <div class="category">
        <ViewTable :btnList="btnList" :searchList="searchList" :columns="columns" />
        <CategoryAdd ref="categoryAdd" />
        <CategoryEdit ref="categoryEdit" />
        <CategoryDel ref="categoryDel" />
    </div>
</template>

<script>
    import ViewButtons from "../mixins/ViewButtons";
    import ViewTable from "../components/common/ViewTable";
    import CategoryAdd from "../components/category/CategoryAdd";
    import CategoryEdit from "../components/category/CategoryEdit";
    import CategoryDel from "../components/category/CategoryDel";

    export default {
        name: "Category",
        components: {
            ViewTable,
            CategoryAdd,
            CategoryEdit,
            CategoryDel
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
                        prop: "desc",
                        label: "分类描述"
                    },
                    {
                        prop: "createAt",
                        label: "创建时间"
                    },
                ]
            }
        },
        methods: {
            add() {
                this.$refs.categoryAdd.show = true
            },
            edit(selectedRows) {
                this.$refs.categoryEdit.id = selectedRows[0].id
                this.$refs.categoryEdit.show = true
            },
            del(selectedRows) {
                this.$refs.categoryDel.ids = selectedRows.map(row => row.id)
                this.$refs.categoryDel.show = true
            }
        }
    }
</script>