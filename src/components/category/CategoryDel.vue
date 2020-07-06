<template>
    <ViewDialog
        v-model="show"
        title="删除分类"
        @on-ok="del"
        width="400px"
        :loading="loading"
    >
        <p>
            <i class="el-icon-warning"
               style="font-size: 24px; color: #e6a23c; vertical-align: middle;" />
            确定删除当前选中的 {{ ids.length }} 项数据？
        </p>
    </ViewDialog>
</template>

<script>
    import ViewDialog from "../common/ViewDialog"

    export default {
        name: "CategoryDel",
        components: {
            ViewDialog
        },
        data() {
            return {
                ids: [],
                show: false,
                loading: false
            }
        },
        methods: {
            del() {
                this.loading = true
                setTimeout(() => {
                    this.loading = false
                    this.show = false
                    this.$message.success("删除成功")
                }, 2000)
            }
        }
    }
</script>
