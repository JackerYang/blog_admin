<template>
    <div class="upload-img">
        <el-upload
            ref="uploadImg"
            :multiple="false"
            action="http://localhost:8000/api/images/avatar"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
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
    export default {
        name: "UploadImg",
        props: {
            value: {
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
            handleRemove() {
                this.fileList = []
                this.$emit("input", "")
                this.$emit("change", "")
                this.$refs.uploadImg.clearFiles()
            },
            handleSuccess(res) {
                this.$emit("change", res.data[0].url)
            },
            exceed() {
                this.$message.warning("已上传图片")
            }
        }
    }
</script>
