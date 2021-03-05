<template>
    <div class="user-edit">
        <ViewDialog
            :visible="show"
            :title="isAdd ? '添加用户' : '修改用户'"
            @on-ok="edit"
            @on-cancel="cancel"
            width="600px"
            :loading="loading"
            :disabled="disabled"
        >
            <el-form v-loading="disabled" size="small" :model="form" :rules="rules" ref="editForm" label-width="80px">
                <el-form-item label="头像" prop="avatar">
                    <UploadImg v-model="form.avatar" type="user/avatar" />
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input placeholder="请输入名称" v-model="form.name" />
                </el-form-item>
                <el-form-item v-if="isAdd" label="密码" prop="password">
                    <el-input show-password type="password" placeholder="请输入密码" v-model="form.password" />
                </el-form-item>
                <el-form-item v-if="isAdd" label="重复密码" prop="rePassword">
                    <el-input show-password type="password" placeholder="请输入密码" v-model="form.rePassword" />
                </el-form-item>
            </el-form>
        </ViewDialog>
    </div>
</template>

<script>
    import ViewDialog from "../common/ViewDialog"
    import UploadImg from "../common/UploadImg"
    import { addUser, editUser, getUser } from "@/api/interface/user"
    import { mapActions, mapState } from "vuex"

    export default {
        name: "UserEdit",
        components: {
            ViewDialog,
            UploadImg
        },
        props: {
            getDataFn: {
                type: Function,
                require: true
            }
        },
        computed: {
            ...mapState({
                userInfo: state => state.app.userInfo
            }),
            isAdd() {
                return this.id === null
            }
        },
        watch: {
            show(newVal) {
                if (newVal && !this.isAdd) {
                    this.disabled = true
                    getUser({ id: this.id }).then(res => {
                        if (res.code === 200) {
                            this.form = res.data
                        }
                        this.disabled = false
                    })
                }
            }
        },
        data() {
            const validateRePwd = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入密码"))
                } else if (value !== this.form.password) {
                    callback(new Error("两次输入密码不一致"))
                } else {
                    callback()
                }
            }
            return {
                id: null,
                show: false,
                loading: false,
                disabled: false,
                form: {
                    avatar: "",
                    name: "",
                    password: "",
                    rePassword: ""
                },
                rules: {
                    name: [
                        { required: true, message: "请输入名称", trigger: "change" },
                        { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "change" }
                    ],
                    password: [
                        { required: true, message: "请输入密码", trigger: "change" },
                        { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "change" }
                    ],
                    rePassword: [
                        { required: true, validator: validateRePwd, trigger: "change" }
                    ]
                }
            }
        },
        methods: {
            ...mapActions({
                get_table_data: "get_table_data",
                get_user_info: "get_user_info"
            }),
            edit() {
                this.$refs.editForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        let req = this.isAdd ? addUser : editUser
                        let tip = this.isAdd ? "添加成功" : "修改成功"
                        let reqData = {
                            avatar: this.form.avatar,
                            name: this.form.name
                        }
                        this.isAdd ? reqData.password = this.form.password : reqData.id = this.form.id
                        req(reqData).then(res => {
                            if (res.code === 200) {
                                this.$message.success(tip)
                                if (!this.isAdd && this.userInfo.id === reqData.id) {
                                    this.get_user_info()
                                }
                                this.cancel()
                                this.get_table_data(this.getDataFn)
                            }
                            this.loading = false
                        })
                    }
                })
            },
            cancel() {
                delete this.form.id
                this.show = false
                this.id = null
                this.$refs.editForm.resetFields()
            }
        }
    }
</script>
