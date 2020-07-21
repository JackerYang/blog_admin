<template>
    <div class="user">
        <ViewTable :btnList="btnList" :searchList="searchList" :columns="columns" :getDataFn="getDataFn" />
        <UserEdit ref="userEdit" :getDataFn="getDataFn" />
        <ViewTableDel ref="userDel" title="删除用户" :getDataFn="getDataFn" :delDataFn="delDataFn" />
    </div>
</template>

<script>
    import ViewButtons from "../mixins/ViewButtons"
    import ViewTable from "../components/common/ViewTable"
    import UserEdit from "../components/user/UserEdit"
    import ViewTableDel from "../components/common/ViewTableDel"
    import { delUser, getUserPage } from "../api/interface/user"

    export default {
        name: "User",
        components: {
            ViewTable,
            UserEdit,
            ViewTableDel
        },
        mixins: [ViewButtons],
        data() {
            return {
                searchList: [
                    {
                        label: "名称",
                        key: "name",
                        type: "input"
                    }
                ],
                signs: ["add", "edit", "del"],
                columns: [
                    {
                        type: "selection",
                        width: "60"
                    },
                    {
                        prop: "avatar",
                        label: "头像",
                        render: "avatar"
                    },
                    {
                        prop: "name",
                        label: "名称"
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
                this.$refs.userEdit.show = true
            },
            edit(selectedRows) {
                this.$refs.userEdit.id = selectedRows[0].id
                this.$refs.userEdit.show = true
            },
            del(selectedRows) {
                this.$refs.userDel.ids = selectedRows.map(row => row.id)
                this.$refs.userDel.show = true
            },
            getDataFn: getUserPage,
            delDataFn: delUser
        }
    }
</script>