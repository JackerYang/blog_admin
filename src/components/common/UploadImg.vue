<template>
    <div :class="['upload-img', fileList.length === 1 ? 'no-trigger' : '']">
        <el-upload
            :before-upload="beforeUpload"
            :file-list="fileList"
            :limit="1"
            :multiple="false"
            :on-exceed="exceed"
            :on-remove="handleRemove"
            action=""
            list-type="picture-card"
        >
            <i class="el-icon-plus" />
        </el-upload>
    </div>
</template>

<script>
    import { uploadBanner as uploadArticleBanner } from "../../api/interface/article"
    import { uploadAvatar as uploadUserAvatar } from "../../api/interface/user"

    export default {
        name: "UploadImg",
        props: {
            value: {
                type: String,
                default: ""
            },
            type: {
                type: String,
                default: ""
            }
        },
        model: {
            prop: "value",
            event: "input"
        },
        watch: {
            value: {
                handler(newVal) {
                    if (newVal) {
                        this.fileList = [
                            {
                                url: newVal,
                                name: newVal.split("/").reverse()[0]
                            }
                        ]
                    } else {
                        this.fileList = []
                    }
                },
                immediate: true
            }
        },
        data() {
            return {
                fileList: []
            }
        },
        methods: {
            beforeUpload(file) {
                this.upload(file)
                return false
            },
            upload(file) {
                let fd = new FormData()
                fd.append("file", file)
                let req
                switch (this.type) {
                    case "article/banner":
                        req = uploadArticleBanner
                        break
                    case "user/avatar":
                        req = uploadUserAvatar
                        break
                }
                req(fd).then(res => {
                    if (res.code === 200) {
                        this.$message.success("上传成功")
                        this.$emit("input", res.data[0].url)
                    }
                })
            },
            handleRemove() {
                this.fileList = []
                this.$emit("input", "")
            },
            exceed() {
                this.$message.warning("已上传图片")
            }
        }
    }
</script>

<style lang="less">
    .upload-img {
        img {
            object-fit: cover;
        }
        &.no-trigger {
            .el-upload {
                display: none;
            }
        }
    }
</style>
