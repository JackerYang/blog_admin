<template>
    <div class="article-edit">
        <el-form
            :model="form"
            v-loading="disabled"
            size="small"
            status-icon
            :rules="rules"
            ref="editForm"
            label-width="100px"
        >
            <el-form-item label="缩略图" prop="banner_img">
                <UploadImg v-model="form.banner_img" type="article/banner" />
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input placeholder="请输入标题" v-model="form.title" />
            </el-form-item>
            <el-form-item label="描述" prop="desc">
                <el-input
                    :autosize="{ minRows: 2 }"
                    show-word-limit
                    :maxlength="256"
                    placeholder="请输入描述"
                    type="textarea"
                    v-model="form.desc"
                />
            </el-form-item>
            <el-form-item label="分类" prop="categories">
                <el-select v-model="form.categories" multiple placeholder="请选择文章分类">
                    <el-option
                        v-for="item in categories"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <Markdown v-model="form.content" />
            </el-form-item>
        </el-form>
        <div class="btn">
            <el-button size="small" :loading="loading" :disabled="disabled" type="primary" @click="save">保存</el-button>
            <el-button size="small" @click="cancel">取消</el-button>
        </div>
    </div>
</template>

<script>
    import UploadImg from "../../components/common/UploadImg"
    import Markdown from "../../components/common/Markdown"
    import { getArticle, addArticle, editArticle } from "../../api/interface/article"
    import { getCategoryList } from "../../api/interface/category"

    export default {
        name: "ArticleEdit",
        components: {
            UploadImg,
            Markdown
        },
        props: {
            getDataFn: {
                type: Function,
                require: true
            }
        },
        computed: {
            isAdd() {
                return this.$route.path.indexOf("add") > -1
            }
        },
        data() {
            return {
                form: {
                    banner_img: "",
                    title: "",
                    desc: "",
                    categories: [],
                    content: ""
                },
                rules: {
                    title: [
                        { required: true, message: "请输入标题", trigger: "change" }
                    ],
                    desc: [
                        { required: true, message: "请输入描述", trigger: "change" }
                    ],
                    categories: [
                        { required: true, type: "array", message: "请输入描述", trigger: "change" }
                    ],
                    content: [
                        { required: true, message: "请输入内容", trigger: "change" }
                    ]
                },

                // 文章类型
                categories: [
                    {
                        value: "选项1",
                        label: "黄金糕"
                    }, {
                        value: "选项2",
                        label: "双皮奶"
                    }, {
                        value: "选项3",
                        label: "蚵仔煎"
                    }, {
                        value: "选项4",
                        label: "龙须面"
                    }, {
                        value: "选项5",
                        label: "北京烤鸭"
                    }
                ],

                disabled: false,
                loading: false
            }
        },
        methods: {
            save() {
                this.$refs.editForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        let req = this.isAdd ? addArticle : editArticle
                        let tip = this.isAdd ? "添加成功" : "修改成功"
                        req(this.form).then(res => {
                            if (res.code === 200) {
                                this.$message.success(tip)
                                this.cancel()
                            }
                            this.loading = false
                        })
                    }
                })
            },
            cancel() {
                this.$router.push({ name: "article" })
            }
        },
        async created() {
            this.disabled = true
            let categories = await getCategoryList()
            if (categories.code === 200) {
                this.categories = categories.data
            }
            if (!this.isAdd) {
                let id = this.$route.params.id
                let article = await getArticle({ id })
                if (article.code === 200) {
                    this.form = article.data
                    this.form._banner_img = article.data.banner_img
                }
            }
            this.disabled = false
        }
    }
</script>

<style lang="less">
    .article-edit {
        .el-select {
            width: 100%;
        }
        .btn {
            margin-left: 100px;
        }
    }
</style>