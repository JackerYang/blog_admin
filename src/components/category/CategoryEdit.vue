<template>
    <ViewDialog
        v-model="show"
        title="修改分类"
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
        name: "CategoryEdit",
        components: {
            ViewDialog
        },
        watch: {
            show(newVal) {
                if (newVal) {
                    this.disabled = true
                    setTimeout(() => {
                        this.disabled = false
                    }, 2000)
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
                    name: "vue",
                    desc: "这是 vue 相关的"
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
            edit() {
                this.$refs.editForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        setTimeout(() => {
                            this.loading = false
                            this.show = false
                            this.clearForm()
                            this.$message.success("修改成功")
                        }, 1000)
                    }
                })
            },
            cancel() {
                this.clearForm()
            },
            clearForm() {
                this.$refs.editForm.resetFields()
            }
        }
    }
</script>

<style scoped>

</style>