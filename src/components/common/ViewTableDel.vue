<template>
    <ViewDialog
        :visible="show"
        :title="title"
        @on-ok="del"
        @on-cancel="cancel"
        width="400px"
        :loading="loading"
    >
        <p>
            <i class="el-icon-warning" style="font-size: 24px; color: #e6a23c; vertical-align: middle;"/>
            确定删除当前选中的 {{ ids.length }} 项数据？
        </p>
    </ViewDialog>
</template>

<script>
    import { mapActions } from "vuex"
    import ViewDialog from "./ViewDialog"

    export default {
        name: "CategoryDel",
        components: {
            ViewDialog
        },
        props: {
            title: String,
            getDataFn: {
                type: Function,
                require: true
            },
            delDataFn: {
                type: Function,
                require: true
            }
        },
        data() {
            return {
                ids: [],
                show: false,
                loading: false
            }
        },
        methods: {
            ...mapActions({
                get_table_data: "get_table_data"
            }),
            del() {
                this.loading = true
                this.delDataFn({ ids: this.ids.toString() }).then(res => {
                    if (res.code === 200) {
                        this.cancel()
                        this.$message.success("删除成功")
                        this.get_table_data(this.getDataFn)
                    }
                    this.loading = false
                })
            },
            cancel() {
                this.ids = []
                this.show = false
            }
        }
    }
</script>
