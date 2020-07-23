<template>
    <div class="the-control">
        <TheUser />
    </div>
</template>

<script>
    import TheUser from "./the-control/TheUser"

    export default {
        name: "TheControl",
        components: {
            TheUser
        }
    }
</script>

<style lang="less">
    .the-control {
        height: 60px;
        float: right;
        display: flex;
        align-items: center;
    }
</style>