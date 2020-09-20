<template>
    <div class="the-menu">
        <el-menu :default-active="currentPathName"
                 mode="horizontal">
            <template v-for="menu in menuList">
                <el-menu-item v-if="!menu.children || !menu.children.length"
                              @click="toView(menu)"
                              :index="menu.name"
                              :key="menu.name">
                    <i :class="menu.icon"></i>
                    <span slot="title">{{ menu.title }}</span>
                </el-menu-item>
                <el-submenu :index="menu.name" v-else>
                    <template slot="title">{{ menu.title }}</template>
                    <el-menu-item v-for="subMenu in menu.children"
                                  @click="toView(subMenu)"
                                  :index="subMenu.name"
                                  :key="subMenu.name">
                        <i :class="subMenu.icon"></i>
                        <span slot="title">{{ subMenu.title }}</span>
                    </el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"

    export default {
        name: "TheMenu",
        computed: {
            ...mapGetters({
                menuList: "menuList"
            })
        },
        watch: {
            $route: {
                handler(val) {
                    if (val.name.indexOf("-") > - 1) {
                        this.currentPathName = val.name.split("-")[0]
                    } else {
                        this.currentPathName = val.name
                    }
                },
                immediate: true
            }
        },
        data() {
            return {
                currentPathName: ""
            }
        },
        methods: {
            toView({ name, path }) {
                if (this.$route.name !== name && this.$route.path !== path) {
                    if (name) {
                        this.$router.push({ name })
                    } else {
                        this.$router.push(path)
                    }
                }
            }
        }
    }
</script>

<style lang="less">
    .the-menu {
        float: left;
    }
</style>
