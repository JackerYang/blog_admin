<template>
    <div class="upload-img">
        <el-upload
            :multiple="multiple"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
    </div>
</template>

<script>
    export default {
        name: "UploadImg",
        props: {
            multiple: {
                type: Boolean,
                default: false
            },
            value: {
                type: Array,
                default: () => []
            }
        },
        model: {
            prop: "value",
            event: "input"
        },
        watch: {
            value: {
                handler(newVal) {
                    this.fileList = newVal
                },
                immediate: true
            },
            fileList(newVal) {
                this.$emit("input", newVal)
            }
        },
        data() {
            return {
                fileList: []
            }
        },
        methods: {
            handleRemove(file, fileList) {
                this.fileList = fileList
            }
        }
    }
</script>
