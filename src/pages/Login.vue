<template>
    <div class="login">
        <div class="login-header">
            <div class="content">
                <div class="left">
                    <h1>blog_admin</h1>
                    <p>博客管理后台系统</p>
                </div>
                <el-card class="box-card">
                    <div slot="header">
                        <span>欢迎登录</span>
                    </div>
                    <el-form :model="form" ref="loginForm" :rules="rules">
                        <el-form-item prop="name">
                            <el-input prefix-icon="el-icon-user" v-model="form.name" placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                @keyup.enter.native="login"
                                prefix-icon="el-icon-lock"
                                show-password
                                type="password"
                                v-model="form.password"
                                placeholder="密码"
                            />
                        </el-form-item>
                        <el-form-item>
                            <el-button :loading="loading" type="primary" long @click="login">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import { setToken } from "../libs/token"
    import { login } from "../api/interface/user"

    export default {
        name: "Login",
        data() {
            return {
                form: {
                    name: "",
                    password: ""
                },
                rules: {
                    name: [
                        { required: true, message: "请输入用户名", trigger: "change" }
                    ],
                    password: [
                        { required: true, message: "请输入密码", trigger: "change" }
                    ]
                },
                loading: false
            }
        },
        methods: {
            login() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        login(this.form).then(res => {
                            if (res.code === 200) {
                                setToken(res.data.token)
                                this.$router.push({ name: "home" })
                                this.$message.success("登录成功")
                            }
                            this.loading = false
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    .login {
        &-header {
            width: 100%;
            height: 500px;
            background-image: url("../assets/img/login-header.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: 50%;
            .content {
                width: 800px;
                height: 100%;
                margin: 0 auto;
                display: flex;
                align-items: flex-start;
                padding-top: 200px;
                .left {
                    width: 400px;
                    color: #fff;
                    h1 {
                        font-size: 32px;
                    }
                    p {
                        margin-top: 20px;
                        font-size: 20px;
                    }
                }
                .el-card {
                    width: 400px;
                    .el-form {
                        padding: 20px 40px 0;
                        .el-button {
                            width: 100%;
                            margin-top: 40px;
                        }
                    }
                }
            }
        }
    }
</style>
