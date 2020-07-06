<template>
    <ViewDialog
        v-model="show"
        title="添加分类"
        @on-ok="add"
        @on-cancel="cancel"
        width="400px"
        :loading="loading"
    >
        <el-form size="small" :model="form" :rules="rules" ref="addForm" label-width="80px">
            <el-form-item label="分类名称" prop="name">
                <el-input placeholder="请输入分类名称" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="分类描述" prop="desc">
                <el-input
                    show-word-limit
                    :maxlength="256"
                    placeholder="请输入分类描述"
                    type="textarea"
                    v-model="form.desc"
                />
            </el-form-item>
        </el-form>
    </ViewDialog>
</template>

<script>
    import ViewDialog from "../common/ViewDialog"

    export default {
        name: "CategoryAdd",
        components: {
            ViewDialog
        },
        data() {
            return {
                show: false,
                loading: false,
                form: {
                    name: "",
                    desc: ""
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
            add() {
                this.$refs.addForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        setTimeout(() => {
                            this.loading = false
                            this.show = false
                            this.clearForm()
                            this.$message.success("添加成功")
                        }, 1000)
                    }
                })
            },
            cancel() {
                this.clearForm()
            },
            clearForm() {
                this.$refs.addForm.resetFields()
            }
        }
    }
</script>