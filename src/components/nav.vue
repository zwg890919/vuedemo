<template>
    <div class="layout-nav" :class="{'layout-fixed':headerFixed}">
        <div class="layout-nav__header" :class="{'layout-indent':asideIndent,'layout-fixed':asidefixed||headerFixed}">
            <a href="javascript:;" class="navbar-brand">
                <Icon type="ionic"></Icon>
                <span v-show="!asideIndent">聚有财理财</span>
            </a>
        </div>
        <div class="layout-nav__con" :class="{'layout-indent':asideIndent}">
            <span @click="changeIndent">
                <Icon size="20" type="navicon-round"></Icon>
            </span>
<<<<<<< HEAD
            <span>
                <Icon size="20"  type="person"></Icon>
=======
            <span @click="showUser">
                <Icon size="20" type="person"></Icon>
>>>>>>> zhengshang
            </span>
            <div class="layout-nav-dropdown" :class="{active : dropdown}" @click="dropdown = !dropdown">
                <a>
                    应用
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <div class="dropdown-area" v-show="dropdown">
                    <div @click="changeMenu(userapp)" v-for="userapp in applist" :key="userapp.id">
                        <p>{{userapp.name}}</p>
                        <img :src="'../../static'+userapp.menuIconclass" width="100" height="100">
                    </div>
                </div>
            </div>
            <div class="navbar-right fr">
                <span>
                    <Icon size="20" type="ios-bell-outline"></Icon>
                </span>
                <span @click="settingshow = !settingshow">
                    <Icon size="20" type="ios-gear" class="fa-spin"></Icon>
                </span>
                <div class="layout-nav-dropdown navbar-right__user" @click="userShow = !userShow">
                    <span>
                        周文广
                        <Icon type="arrow-down-b"></Icon>
                    </span>
                    <div class="head">
                        <img src="../assets/images/a0.jpg" width="40" height="40">
                    </div>
                    <div class="user" v-show="userShow">
                        <ul>
                            <li>
                                <a href="javascript:;">个人主页</a>
                            </li>
                            <li>
                                <a href="javascript:;">修改密码</a>
                            </li>
                            <li>
                                <a href="javascript:;">屏幕锁定</a>
                            </li>
                            <li @click="quit">
                                <a href="javascript:;">退出登录</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <setting :settingshow="settingshow"></setting>
    </div>
</template>
<script>
import setting from "./setting"
import { mapActions } from 'vuex'
import api from '@/api'

export default {
    data() {
        return {
            dropdown: false,
            settingshow: false,
            userShow: false
        }
    },
    props: ["asideIndent", 'headerFixed', 'asidefixed'],
    computed: {
        applist: v => v.$store.state.appMenu.applist
    },
    methods: {
        changeIndent() {
            this.$store.commit("changeSetting", 3)
        },
        ...mapActions([
            'changeMenu',
            'showUser'
        ]),
        async quit() {
            // const data = await api.get(api.config.logout);
            this.$router.push("/login");
        }
    },
    components: {
        setting
    }
}
</script>
<style lang="scss">
.navbar-right {
    font-size: 0;
    .navbar-right__user {
        position: relative;
        padding: 4px 10px 0;
        .head {
            display: inline-block;
            vertical-align: middle;
            img {
                border-radius: 100%;
            }
        }
        .user {
            position: absolute;
            right: 0;
            top: 52px;
            z-index: 100;
            min-width: 160px;
            padding: 2px 0;
            background: #fff;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.175);
            li {
                a {
                    display: block;
                    padding: 8px 15px;
                    &:hover {
                        background: #edf1f2;
                        color: #333;
                    }
                }
                &:last-child {
                    padding-top: 5px;
                    margin-top: 5px;
                    border-top: 1px solid #e5e5e5;
                }
            }
        }
    }
}
</style>
