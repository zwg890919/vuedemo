<template>
    <div class="layout-aside" :class="{'asideIndent':asideIndent,'layout-fixed':Asidefixed,'aside-fixed':!Asidefixed&&headerFixed}">
        <div class="aside-con">
            <div class="layout-aside-user" v-show="asideUserShow" :class="{'layout-aside-user__s': asideIndent}">
                <div class="head">
                    <img src="../assets/images/a0.jpg" width="96" height="96" v-show="!asideIndent">
                    <img src="../assets/images/a0.jpg" width="30" height="30" v-show="asideIndent">
                </div>
                <div class="user" @click="userShow = !userShow" v-show="!asideIndent">
                    <span>周文广</span>
                    <Icon size="12" type="arrow-down-b"></Icon>
                    <p>行政服务中心</p>
                </div>
                <div class="user__win" v-show="userShow">
                    <ul>
                        <li>
                            <a href="javascript:;">个人主页</a>
                        </li>
                        <li>
                            <a href="javascript:;">修改密码</a>
                        </li>
                        <li>
                            <a href="javascript:;">登陆历史</a>
                        </li>
                        <li @click="quit">
                            <a href="javascript:;">退出登录</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="nav_warp">
                <ul>
                    <li class="layout-aside__title" v-show="!asideIndent">快捷菜单</li>
                    <li class="layout-aside__item layout-aside__quick">
                        <router-link to="app" active-class="active">
                            <Icon type="android-home" size="20" color="#564aa3"></Icon>
                            <span v-show="!asideIndent">应用主页</span>
                        </router-link>
                        <router-link v-show="hisRoute.length == 2" :to="e.route" active-class="active" v-for="(e, i) in hisRoute" :key="e.name">
                            <Icon v-show="i == 0" type="pricetags" size="20" color="#23c24c"></Icon>
                            <Icon v-show="i == 1" type="pricetags" size="20" color="#23b7e5"></Icon>
                            <span v-show="!asideIndent">{{e.name}}</span>
                        </router-link>

                    </li>
                    <li class="line"></li>

                    <li class="layout-aside__title" v-show="!asideIndent">{{currentMenu.name}}</li>
                    <li class="layout-aside__item" v-for="item in currentMenu.childrens" :key="item" v-if="item.childrens[0].menuType==1" :class="{active:item.id == lastmenu}">
                        <a @click="drowpDown(item)" @mouseenter="showCurrent(item,$event)">
                            <Icon :type="item.menuIconclass" size="20"></Icon>
                            <!--<i :class="item.menuIconclass" style="font-size:14px;"></i>-->
                            <span v-show="!asideIndent">{{item.name}}</span>
                            <span class="fr" v-show="!asideIndent">
                                <Icon type="ios-arrow-forward" size="12" v-show="item.id != lastmenu"></Icon>
                                <Icon type="ios-arrow-down" size="12" v-show="item.id == lastmenu"></Icon>
                            </span>
                        </a>
                        <ul v-if="!asideIndent && currentItem.length == 0">
                            <li v-for="subitem in item.childrens" :key="subitem.id">
                                <router-link :to="subitem.menuHref | transformUrl" active-class="active">
                                    {{subitem.name}}
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="layout-aside__item" v-for="item in currentMenu.childrens" :key="item" v-if="item.childrens[0].menuType>1" @mouseenter="hideCurrent()">
                        <router-link :to="item.menuHref | transformUrl" active-class="active" class="itemMenu">
                            <Icon :type="item.menuIconclass" size="20"></Icon>
                            <span v-show="!asideIndent">{{item.name}}</span>
                        </router-link>
                        <!--<a @click="selectedMenu(item)" @mouseenter="hideCurrent()" :class="{active:lastmenu == item.id}">
                            <Icon type="ios-paper"></Icon>
                            <span v-show="!asideIndent">{{item.name}}</span>
                        </a>-->
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="asideIndent && currentItem.length > 0" class="currentItem" :style="currentStyle" @mouseleave="hideCurrent()">
            <ul>
                <li v-for="subitem in currentItem" :key="subitem.id">
                    <router-link :to="subitem.menuHref | transformUrl" active-class="active">
                        {{subitem.name}}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            lastmenu: window.localStorage.getItem("menuId"),
            currentItem: [],
            currentStyle: {
                top: "0px",
                left: "0px",
            },
            userShow: false,
        }
    },
    computed: {
        activeName() {
            let url = this.$route.path.substring(1);
            url = url.replace(/\//g, ".")
            return url
        },
        currentMenu: v => v.$store.state.appMenu.currentApp,
        asideUserShow: v => v.$store.state.systemSetting.asideUserShow,
        ...mapState({
            hisRoute: state => state.systemSetting.hisRoute
        }),

    },
    props: ['asideIndent', 'Asidefixed', 'headerFixed'],
    methods: {
        drowpDown(item) {
            if (this.asideIndent) {
                this.currentItem = []
            } else {
                if (this.lastmenu == item.id) {
                    this.lastmenu = ""
                    window.localStorage.setItem("menuId", "")
                } else {
                    this.lastmenu = item.id
                    window.localStorage.setItem("menuId", item.id)
                }
            }
        },
        showCurrent(item, el) {
            if (this.asideIndent) {
                this.lastmenu = item.id
                window.localStorage.setItem("menuId", item.id)
                const react = el.target.getBoundingClientRect()
                this.currentItem = item.childrens
                this.currentStyle.left = react.left + 60 + "px"
                this.currentStyle.top = react.top + document.documentElement.scrollTop + "px"
            }
        },
        hideCurrent() {
            if (this.asideIndent) {
                this.lastmenu = ""
                this.currentItem = []
                window.localStorage.setItem("menuId", "")
            }
        },
        selectedMenu(item) {
            this.lastmenu = item.id
            window.localStorage.setItem("menuId", item.id)
            var hrefUrl = "/" + item.menuHref.replace(/\./g, "/")
            this.$router.push(hrefUrl)
        },
        async quit() {
            // const data = await api.get(api.config.logout);
            this.$router.push("/login");
        }
    },
    filters: {
        transformUrl(val) {
            val = "/" + val.replace(/\./g, "/")
            return val
        }
    }
}
</script>
<style lang="scss" scoped>
.currentItem {
    position: fixed;
    background: #131e26;
    width: 200px;
    max-height: 200px;
    overflow: hidden;
    z-index: 9999999;
    ul {
        width: 220px;
        max-height: 200px;
        overflow-x: hidden;
        overflow-y: scroll;
        li {
            a {
                display: block;
                width: 220px;
                color: #869fb1;
                padding: 5px 15px;
                line-height: 40px;
                &.active,
                &:hover {
                    background-color: #16232d;
                    color: #fff;
                }
            }
        }
    }
}

.layout-aside-user {
    position: relative;
    width: 200px;
    padding: 15px 15px 25px;
    text-align: center;
    border-bottom: 2px solid #131e26;
    .head {
        padding-top: 10px;
        img {
            border-radius: 100%;
        }
    }
    .user {
        padding-top: 10px;
        font-size: 0;
        cursor: pointer;
        span {
            display: inline-block;
            vertical-align: middle;
            font-size: 12px;
            color: #c4d0d9;
        }
        i {
            margin: 4px 0 0 6px;
            vertical-align: middle;
        }
        p {
            line-height: 18px;
            font-size: 12px;
        }
    }
    .user__win {
        position: absolute;
        right: 0;
        bottom: -140px;
        z-index: 100;
        min-width: 200px;
        padding: 2px 0;
        text-align: left;
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

.layout-aside-user__s {
    width: 60px;
    border-bottom: 0 none;
}

.asideTitle {
    color: #5c798f;
    margin: 15px 15px 10px;
}

.nav_warp {
    position: relative;
    width: 217px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
}

.asideIndent {
    .nav_warp {
        width: 77px;
    }
    .layout-aside__item {
        a {
            padding: 0px;
            height: 50px;
            i {
                display: block;
                float: none;
                width: 60px;
                margin: 0;
                font-size: 16px;
                line-height: 50px;
                border: none!important;
            }
        }
        ul {
            position: absolute;
            left: 100%;
            top: 0px;
        }
    }
}
.layout-aside {
    .line {
        width: 100%;
        height: 2px;
        margin: 10px 0px 0px;
        overflow: hidden;
        font-size: 0;
        background: #131e26;
    }
    &__title {
        height: 48px;
        line-height: 48px;
        font-size: 12px;
        padding-left: 20px;
        color: #5c798f;
    }
    &__item {
        position: relative;
        display: block;
        &.active {
            ul {
                height: auto
            }
            &>a {
                background: #16232d;
                color:#fff;
            }
        }
        ul {
            background-color: #131e26;
            height: 0px;
            overflow: hidden;
        }
        li {
            a {
                padding-left: 55px;
                &.active {
                    background-color: #16232d;
                    color: #fff;
                }
            }
        }
        &>i {
            position: relative;
            float: left;
            width: 40px;
            margin: -12px -10px;
            margin-right: 5px;
            overflow: hidden;
            line-height: 40px;
            text-align: center;
        }
        a {
            position: relative;
            display: block;
            height: 40px;
            line-height:19px;
            padding: 10px 20px;
            font-weight: normal;
            text-transform: none;
            color: #869fb1;
            &.active {
                background: #16232d;
                color: #fff;
            }
            &:hover{
                background: #16232d;
                color: #fff;
            }
            i {
                position: relative;
                float: left;
                width: 40px;
                margin: -12px -10px;
                margin-right: 5px;
                overflow: hidden;
                line-height: 40px;
                text-align: center;
            }
        }
    }
    &__quick {
        &>i {
            color: #23b7e5;
        }
    }
}
.itemMenu:hover{
    background: #131e26
}
</style>
