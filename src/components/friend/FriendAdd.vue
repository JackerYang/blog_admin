<template>
    <div class="friend-add">
        <ViewDialog
            v-model="show"
            title="添加友邻"
            @on-ok="add"
            @on-cancel="cancel"
            width="600px"
            :loading="loading"
        >
            <el-form size="small" :model="form" :rules="rules" ref="addForm" label-width="60px">
                <el-form-item label="头像" prop="avatars">
                    <UploadImg v-model="form.avatars" />
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input placeholder="请输入名称" v-model="form.name" />
                </el-form-item>
                <el-form-item label="地址" prop="link">
                    <el-input placeholder="请输入地址" v-model="form.link">
                        <el-select style="width: 100px" v-model="linkPrefix" slot="prepend" placeholder="请选择">
                            <el-option label="http://" value="http://" />
                            <el-option label="https://" value="https://" />
                        </el-select>
                    </el-input>
                </el-form-item>
                <el-form-item label="简介" prop="introduction">
                    <el-input
                        :autosize="{ minRows: 2 }"
                        show-word-limit
                        :maxlength="256"
                        placeholder="请输入简介"
                        type="textarea"
                        v-model="form.introduction"
                    />
                </el-form-item>
            </el-form>
        </ViewDialog>
    </div>
</template>

<script>
    import ViewDialog from "../common/ViewDialog"
    import UploadImg from "../common/UploadImg"

    export default {
        name: "FriendAdd",
        components: {
            ViewDialog,
            UploadImg
        },
        data() {
            return {
                show: false,
                loading: false,
                form: {
                    avatars: [],
                    name: "",
                    link: "",
                    introduction: ""
                },
                linkPrefix: "https://",
                rules: {
                    avatars: [
                        { required: true, type: "array", message: "请上传头像", trigger: "change" },
                    ],
                    name: [
                        { required: true, message: "请输入名称", trigger: "change" },
                        { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "change" }
                    ],
                    link: [
                        { required: true, message: "请输入地址", trigger: "change" },
                    ],
                    introduction: [
                        { required: true, message: "请输入简介", trigger: "change" },
                        { min: 1, max: 256, message: "长度在 1 到 256 个字符", trigger: "change" }
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
