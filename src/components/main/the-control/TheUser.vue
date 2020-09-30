<template>
    <div class="the-user">
        <el-dropdown placement="bottom" trigger="click">
            <div class="user">
                <el-avatar fit="contain" :src="userInfo.avatar">
                    <img src="../../../assets/img/avatar.gif" alt="头像">
                </el-avatar>
                <div class="username">
                    {{ userInfo.name }}
                    <i class="el-icon-caret-right el-icon--right" />
                </div>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="changePwd" icon="el-icon-lock">修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="logout" icon="el-icon-switch-button">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <ViewDialog
            :appendToBody="true"
            :visible="show"
            title="修改密码"
            @on-ok="save"
            @on-cancel="cancel"
            width="400px"
            :loading="loading"
        >
            <el-form size="small" :model="form" :rules="rules" ref="editForm" label-width="80px">
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input show-password type="password" placeholder="请输入旧密码" v-model="form.oldPassword" />
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input show-password type="password" placeholder="请输入新密码" v-model="form.newPassword" />
                </el-form-item>
                <el-form-item label="新密码" prop="reNewPassword">
                    <el-input show-password type="password" placeholder="请重复新密码" v-model="form.reNewPassword" />
                </el-form-item>
            </el-form>
        </ViewDialog>
    </div>
</template>

<script>
    import ViewDialog from "../../common/ViewDialog"
    import { delToken } from "../../../libs/token"
    import { updatePwd } from "../../../api/interface/user"
    import { mapActions, mapState } from "vuex"

    export default {
        name: "TheUser",
        components: {
            ViewDialog
        },
        computed: {
            ...mapState({
                userInfo: state => state.app.userInfo
            })
        },
        data() {
            const validateRePwd = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入密码"))
                } else if (value !== this.form.newPassword) {
                    callback(new Error("两次输入密码不一致"))
                } else {
                    callback()
                }
            }
            return {
                show: false,
                loading: false,
                form: {
                    oldPassword: "",
                    newPassword: "",
                    reNewPassword: ""
                },
                rules: {
                    oldPassword: [
                        { required: true, message: "请输入旧密码", trigger: "change" },
                        { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "change" }
                    ],
                    newPassword: [
                        { required: true, message: "请输入新密码", trigger: "change" },
                        { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "change" }
                    ],
                    reNewPassword: [
                        { required: true, validator: validateRePwd, trigger: "change" }
                    ]
                }
            }
        },
        methods: {
            ...mapActions({
                get_user_info: "get_user_info"
            }),
            changePwd() {
                this.show = true
            },
            logout() {
                delToken()
                this.$router.push({ name: "login" })
                this.$message.success("已退出登录")
            },
            save() {
                this.$refs.editForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        updatePwd({
                            oldPassword: this.form.oldPassword,
                            newPassword: this.form.newPassword
                        }).then(res => {
                            if (res.code === 200) {
                                this.$message.success("修改成功")
                                this.cancel()
                            }
                            this.loading = false
                        })
                    }
                })
            },
            cancel() {
                this.show = false
                this.$refs.editForm.resetFields()
            }
        },
        created() {
            this.get_user_info()
        }
    }
</script>

<style lang="less" scoped>
    .the-user {
        .user {
            display: flex;
            align-items: center;
            color: #333;
            cursor: pointer;
            .el-avatar {
                z-index: 2;
            }
            .username {
                background: rgba(236, 204, 156, 0.2);
                padding: 2px 10px 2px 25px;
                border-radius: 13px;
                position: relative;
                left: -15px;
            }
        }
    }
</style>