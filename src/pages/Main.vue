<template>
    <div class="main">
        <div class="main-header">
            <div class="center">
                <TheMenu />
                <TheControl />
            </div>
        </div>
        <div class="main-container">
            <div class="center">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
    import TheMenu from "../components/main/TheMenu"
    import TheControl from "../components/main/TheControl"

    export default {
        name: "Main",
        components: {
            TheMenu,
            TheControl
        }
    }
</script>

<style lang="less">
    .main {
        overflow-y: auto;
        .center {
            width: 1200px;
            margin: 0 auto;
        }
        &-header {
            width: 100%;
            height: 60px;
            border-bottom: 1px solid #e6e6e6;
            box-shadow: 1px 1px 10px #eee;
            position: fixed;
            top: 0;
            left: 0;
            background: #fff;
            z-index: 1501;
        }
        &-container {
            padding-top: 80px;
        }
    }
</style>
