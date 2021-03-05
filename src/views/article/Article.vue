<template>
    <div class="article">
        <ViewTable :btnList="btnList" :searchList="searchList" :columns="columns" :getDataFn="getDataFn" />
        <ViewTableDel ref="articleDel" title="删除文章" :getDataFn="getDataFn" :delDataFn="delDataFn" />
    </div>
</template>

<script>
    import ViewButtons from "../../mixins/ViewButtons"
    import ViewTable from "../../components/common/ViewTable"
    import ViewTableDel from "../../components/common/ViewTableDel"
    import { delArticle, getArticlePage } from "../../api/interface/article"

    export default {
        name: "Article",
        components: {
            ViewTable,
            ViewTableDel
        },
        mixins: [ViewButtons],
        data() {
            return {
                searchList: [
                    {
                        label: "标题",
                        key: "title",
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
                        prop: "title",
                        label: "标题"
                    },
                    {
                        prop: "comment_count",
                        label: "评论数量"
                    },
                    {
                        prop: "view_count",
                        label: "阅读数量"
                    },
                    {
                        prop: "like_count",
                        label: "点赞数量"
                    },
                    {
                        prop: "word_count",
                        label: "字数"
                    },
                    {
                        prop: "author",
                        label: "作者"
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
                this.$router.push({ name: "article-add" })
            },
            edit(selectedRows) {
                let id = selectedRows[0].id
                this.$router.push({ name: "article-edit", params: { id } })
            },
            del(selectedRows) {
                this.$refs.articleDel.ids = selectedRows.map(row => row.id)
                this.$refs.articleDel.show = true
            },
            getDataFn: getArticlePage,
            delDataFn: delArticle
        }
    }
</script>
