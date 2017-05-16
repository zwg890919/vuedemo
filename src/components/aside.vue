<template>
    <div class="layout-aside" :class="{'asideIndent':asideIndent,'layout-fixed':Asidefixed,'aside-fixed':!Asidefixed&&headerFixed}">
        <div class="aside-con">
            <div class="nav_warp">
                <ul>
                    <li class="layout-aside__title" v-show="!asideIndent">快捷菜单</li>
                    <li class="layout-aside__item layout-aside__quick">
                        <a href="">
                            <Icon type="ios-paper"></Icon>
                            <span v-show="!asideIndent">应用主页</span>
                        </a>
                    </li>
                    <li class="line"></li>

                    <li class="layout-aside__title" v-show="!asideIndent">{{currentMenu.name}}</li>
                    <li class="layout-aside__item" v-for="item in currentMenu.childrens" v-if="item.childrens[0].menuType==1" :class="{active:item.id == lastmenu}">
                        <a @click="drowpDown(item)" @mouseenter="showCurrent(item,$event)">
                            <Icon type="ios-paper"></Icon>
                            <span v-show="!asideIndent">{{item.name}}</span>
                            <span class="fr" v-show="!asideIndent">
                                <Icon type="chevron-right" v-show="item.id != lastmenu"></Icon>
                                <Icon type="chevron-down" v-show="item.id == lastmenu"></Icon>
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
                    <li class="layout-aside__item" v-for="item in currentMenu.childrens" v-if="item.childrens[0].menuType>1">
                        <a @click="selectedMenu(item)" @mouseenter="hideCurrent()" :class="{active:lastmenu == item.id}">
                            <Icon type="ios-paper"></Icon>
                            <span v-show="!asideIndent">{{item.name}}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="asideIndent && currentItem.length > 0" class="currentItem" :style="currentStyle"  @mouseleave="hideCurrent()">
            <ul>
                <li v-for="subitem in currentItem" :key="subitem.id" >
                    <router-link :to="subitem.menuHref | transformUrl" active-class="active">
                        {{subitem.name}}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            lastmenu: window.localStorage.getItem("menuId"),
            currentItem:[],
            currentStyle:{
                top: "0px",
                left: "0px",
            }
        }
    },
    computed: {
        activeName() {
            let url = this.$route.path.substring(1);
            url = url.replace(/\//g, ".")
            return url
        },
        currentMenu: v => v.$store.state.appMenu.currentApp,
    },
    props: ['asideIndent', 'Asidefixed', 'headerFixed'],
    methods: {
        drowpDown(item) {
            if(this.asideIndent){
                this.currentItem = []
            }else{
                if (this.lastmenu == item.id) {
                    this.lastmenu = ""
                    window.localStorage.setItem("menuId", "")
                } else {
                    this.lastmenu = item.id
                    window.localStorage.setItem("menuId", item.id)
                }
            }
        },
        showCurrent(item,el) {
            if(!this.asideIndent){
                return
            }
            this.lastmenu = item.id
            window.localStorage.setItem("menuId", item.id)
            const react = el.target.getBoundingClientRect()
            if(this.asideIndent){
                this.currentItem = item.childrens
                this.currentStyle.left = react.left+60 +"px"
                this.currentStyle.top = react.top-50 +"px"
            }
        },
        hideCurrent(){
            this.lastmenu = ""
            this.currentItem = []
            window.localStorage.setItem("menuId", "")
        },
        selectedMenu(item){
            this.lastmenu = item.id
            window.localStorage.setItem("menuId", item.id)
            var hrefUrl = "/" + item.menuHref.replace(/\./g, "/")
            this.$router.push(hrefUrl)
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
.currentItem{
    position: absolute;
    background:#131e26;
    width:200px;
    max-height:200px;
    overflow: hidden;
    z-index:9999999;
    ul{
        width: 220px;
        max-height: 200px;
        overflow-x: hidden;
        overflow-y: scroll;
        li{
            a{
                display: block;
                width: 220px;
                color: #869fb1;
                padding:5px 15px;
                line-height: 40px;
                &.active,&:hover{
                    background-color: #16232d;
                    color: #fff;
                }
            }
        }
    }
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
.asideIndent{
    .nav_warp{
        width:77px;
    }
    .layout-aside__item{
        a{
            padding:0px;
            height:50px;
            i{
                display: block;
                float: none;
                width: auto;
                margin: 0;
                font-size: 16px;
                line-height: 50px;
                border: none !important;
            }

        }
        ul{
            position: absolute;
            left:100%;
            top:0px;
        }
    }
}
.layout-aside {
    .line {
        width: 100%;
        height: 2px;
        margin: 10px 0;
        overflow: hidden;
        font-size: 0;
        background: #131e26;
    }
    &__title {
        height: 48px;
        line-height: 48px;
        font-size: 12px;
        padding-left: 20px;
        color: #657180;
    }
    &__item {
        position: relative;
        display: block;
        &.active {
            ul {
                height: auto
            }
            &>a {
                background: #131e26;
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
            font-size: 18px;
            margin: -12px -10px;
            margin-right: 5px;
            overflow: hidden;
            line-height: 40px;
            text-align: center;
        }
        a {
            position: relative;
            display: block;
            height:40px;
            padding: 10px 20px;
            font-weight: normal;
            text-transform: none;
            color: #869fb1;
            &.active{
                background:#131e26;
            }
            i {
                position: relative;
                float: left;
                width: 40px;
                font-size: 18px;
                margin: -12px -10px;
                margin-right: 5px;
                overflow: hidden;
                line-height: 40px;
                text-align: center;
            }
            span {
                i {
                    width: auto;
                    font-size: 12px;
                }
            }
        }
    }
    &__quick {
        &>i {
            color: #23b7e5;
        }
    }
}
</style>
