<template>
    <div class="upload-img">
        <el-upload
            :multiple="false"
            action=""
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :file-list="fileList"
            :limit="1"
            :on-exceed="exceed"
            list-type="picture-card"
        >
            <i class="el-icon-plus" />
        </el-upload>
    </div>
</template>

<script>
    import { uploadAvatar } from "../../api/interface/friend"
    import { uploadBanner } from "../../api/interface/article"

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
                    case "friend/avatar":
                        req = uploadAvatar
                        break
                    case "article/banner":
                        req = uploadBanner
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
