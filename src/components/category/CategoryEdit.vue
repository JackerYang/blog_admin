<template>
    <ViewDialog
        :visible="show"
        :title="isAdd ? '添加分类' : '修改分类'"
        @on-ok="edit"
        @on-cancel="cancel"
        width="400px"
        :disabled="disabled"
        :loading="loading"
    >
        <el-form v-loading="disabled" size="small" :model="form" :rules="rules" ref="editForm" label-width="80px">
            <el-form-item label="分类名称" prop="name">
                <el-input placeholder="请输入分类名称" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input
                    show-word-limit
                    :maxlength="256"
                    placeholder="请输入备注"
                    type="textarea"
                    v-model="form.remark"
                />
            </el-form-item>
        </el-form>
    </ViewDialog>
</template>

<script>
    import ViewDialog from "../common/ViewDialog"
    import { addCategory, getCategory, editCategory } from "../../api/interface/category"
    import { mapActions } from "vuex"

    export default {
        name: "CategoryEdit",
        props: {
            getDataFn: {
                type: Function,
                require: true
            }
        },
        components: {
            ViewDialog
        },
        computed: {
            isAdd() {
                return this.id === null
            }
        },
        watch: {
            show(newVal) {
                if (newVal && !this.isAdd) {
                    this.disabled = true
                    getCategory({ id: this.id }).then(res => {
                        if (res.code === 200) {
                            this.form = res.data
                        }
                        this.disabled = false
                    })
                }
            }
        },
        data() {
            return {
                id: null,
                show: false,
                loading: false,
                disabled: false,
                form: {
                    name: "",
                    remark: ""
                },
                rules: {
                    name: [
                        { required: true, message: "请输入分类名称", trigger: "change" },
                        { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "change" }
                    ]
                }
            }
        },
        methods: {
            ...mapActions({
                get_table_data: "get_table_data"
            }),
            edit() {
                this.$refs.editForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        let req = this.isAdd ? addCategory : editCategory
                        let tip = this.isAdd ? "添加成功" : "修改成功"
                        req(this.form).then(res => {
                            if (res.code === 200) {
                                this.$message.success(tip)
                                this.cancel()
                                this.get_table_data(this.getDataFn)
                            }
                            this.loading = false
                        })
                    }
                })
            },
            cancel() {
                this.id = null
                this.show = false
                this.$refs.editForm.resetFields()
            }
        }
    }
</script>
