<template>
    <div class="message">
        <ViewTable :btnList="btnList" :columns="columns" :getDataFn="getDataFn" />
        <ViewTableDel ref="messageDel" title="删除留言" :getDataFn="getDataFn" :delDataFn="delDataFn" />
    </div>
</template>

<script>
    import { delMessage, getMessagePage } from "../api/interface/message"
    import ViewTable from "../components/common/ViewTable"
    import ViewTableDel from "../components/common/ViewTableDel"
    import ViewButtons from "../mixins/ViewButtons"

    export default {
        name: "Message",
        components: {
            ViewTable,
            ViewTableDel
        },
        mixins: [ViewButtons],
        data() {
            return {
                signs: ["del"],
                columns: [
                    {
                        type: "selection",
                        width: "60"
                    },
                    {
                        prop: "name",
                        label: "用户"
                    },
                    {
                        prop: "content",
                        label: "内容"
                    },
                    {
                        prop: "like_count",
                        label: "点赞"
                    },
                    {
                        prop: "reply_count",
                        label: "回复"
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
            del(selectedRows) {
                this.$refs.messageDel.ids = selectedRows.map(row => row.id)
                this.$refs.messageDel.show = true
            },
            getDataFn: getMessagePage,
            delDataFn: delMessage
        }
    }
</script>
