<template>
    <div class="friend">
        <ViewTable :btnList="btnList" :searchList="searchList" :columns="columns" />
        <FriendAdd ref="friendAdd" />
        <FriendEdit ref="friendEdit" />
        <FriendDel ref="friendDel" />
    </div>
</template>

<script>
    import ViewButtons from "../mixins/ViewButtons"
    import ViewTable from "../components/common/ViewTable"
    import FriendAdd from "../components/friend/FriendAdd"
    import FriendEdit from "../components/friend/FriendEdit"
    import FriendDel from "../components/friend/FriendDel"

    export default {
        name: "Friend",
        components: {
            ViewTable,
            FriendAdd,
            FriendEdit,
            FriendDel
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
                        prop: "link",
                        label: "地址"
                    },
                    {
                        prop: "introduction",
                        label: "简介"
                    },
                    {
                        prop: "createAt",
                        label: "创建时间"
                    }
                ]
            }
        },
        methods: {
            add() {
                this.$refs.friendAdd.show = true
            },
            edit(selectedRows) {
                this.$refs.friendEdit.id = selectedRows[0].id
                this.$refs.friendEdit.show = true
            },
            del(selectedRows) {
                this.$refs.friendDel.ids = selectedRows.map(row => row.id)
                this.$refs.friendDel.show = true
            }
        }
    }
</script>

<style scoped>

</style>