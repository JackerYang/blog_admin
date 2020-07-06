<template>
    <el-dialog
        :title="title"
        :visible="visible"
        :width="width"
        :show-close="false"
    >
        <slot />
        <div slot="footer">
            <el-button size="small" @click="cancel">取 消</el-button>
            <el-button size="small" type="primary" :disabled="disabled" :loading="loading" @click="ok">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "ViewDialog",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            width: {
                type: String,
                default: "50%"
            },
            title: {
                type: String,
                default: ""
            },
            loading: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        model: {
            prop: "value",
            event: "input"
        },
        watch: {
            value: {
                handler(newVal) {
                    this.visible = newVal
                },
                immediate: true
            },
            visible(newVal) {
                this.$emit("input", newVal)
            }
        },
        data() {
            return {
                visible: false
            }
        },
        methods: {
            cancel() {
                this.visible = false
                this.$emit("on-cancel")
            },
            ok() {
                this.$emit("on-ok")
            }
        }
    }
</script>

<style scoped>

</style>