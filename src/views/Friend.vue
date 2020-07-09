<template>
    <div class="friend">
        <ViewTable :btnList="btnList" :searchList="searchList" :columns="columns" :getDataFn="getDataFn" />
        <FriendEdit ref="friendEdit" :getDataFn="getDataFn" />
        <ViewTableDel ref="friendDel" title="删除友邻" :getDataFn="getDataFn" :delDataFn="delDataFn" />
    </div>
</template>

<script>
    import ViewButtons from "../mixins/ViewButtons"
    import ViewTable from "../components/common/ViewTable"
    import FriendEdit from "../components/friend/FriendEdit"
    import ViewTableDel from "../components/common/ViewTableDel"
    import { delFriend, getFriendPage } from "../api/interface/friend"

    export default {
        name: "Friend",
        components: {
            ViewTable,
            FriendEdit,
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
                        align: "center",
                        type: "selection",
                        width: "60"
                    },
                    {
                        prop: "avatar",
                        label: "头像"
                    },
                    {
                        prop: "name",
                        label: "名称"
                    },
                    {
                        prop: "url",
                        label: "地址"
                    },
                    {
                        prop: "introduction",
                        label: "简介"
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
                this.$refs.friendEdit.show = true
            },
            edit(selectedRows) {
                this.$refs.friendEdit.id = selectedRows[0].id
                this.$refs.friendEdit.show = true
            },
            del(selectedRows) {
                this.$refs.friendDel.ids = selectedRows.map(row => row.id)
                this.$refs.friendDel.show = true
            },
            getDataFn: getFriendPage,
            delDataFn: delFriend
        }
    }
</script>