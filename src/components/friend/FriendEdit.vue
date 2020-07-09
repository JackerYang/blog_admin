<template>
    <div class="friend-edit">
        <ViewDialog
            :visible="show"
            :title="isAdd ? '添加友邻' : '修改友邻'"
            @on-ok="edit"
            @on-cancel="cancel"
            width="600px"
            :loading="loading"
            :disabled="disabled"
        >
            <el-form v-loading="disabled" size="small" :model="form" :rules="rules" ref="editForm" label-width="60px">
                <el-form-item label="头像" prop="avatars">
                    <UploadImg v-model="form.avatars" />
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input placeholder="请输入名称" v-model="form.name" />
                </el-form-item>
                <el-form-item label="地址" prop="url">
                    <el-input placeholder="请输入地址" v-model="form.url" />
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
    import { addFriend, getFriend, editFriend } from "../../api/interface/friend"
    import { mapActions } from "vuex"

    export default {
        name: "FriendEdit",
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
            isAdd() {
                return this.id === null
            }
        },
        watch: {
            show(newVal) {
                if (newVal && !this.isAdd) {
                    this.disabled = true
                    getFriend({ id: this.id }).then(res => {
                        if (res.code === 200) {
                            let resData = {
                                ...res.data,
                                avatars: [{ url: res.data.avatar }]
                            }
                            delete resData.avatar
                            this.form = resData
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
                    avatars: [],
                    name: "",
                    url: "",
                    introduction: ""
                },
                rules: {
                    avatars: [
                        { required: true, type: "array", message: "请上传头像", trigger: "change" },
                    ],
                    name: [
                        { required: true, message: "请输入名称", trigger: "change" },
                        { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "change" }
                    ],
                    url: [
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
            ...mapActions({
                get_table_data: "get_table_data"
            }),
            edit() {
                this.$refs.editForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        let req = this.isAdd ? addFriend : editFriend
                        let tip = this.isAdd ? "添加成功" : "修改成功"
                        let reqData = {
                            ...this.form,
                            avatar: this.form.avatars[0].url
                        }
                        delete reqData.avatars
                        req(reqData).then(res => {
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
