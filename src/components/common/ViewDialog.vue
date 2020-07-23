<template>
    <el-dialog
        :title="title"
        :visible="visible"
        :width="width"
        :show-close="false"
        destroy-on-close
        :append-to-body="appendToBody"
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
            visible: {
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
            },
            appendToBody: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            cancel() {
                this.$emit("on-cancel")
            },
            ok() {
                this.$emit("on-ok")
            }
        }
    }
</script>
