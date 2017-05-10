<template>
    <div class="userpck-wrap">
        <div class="cell">
            <div class="search-item">
                <span>
                    <Icon type="ios-search-strong" size="22" style=""></Icon>
                </span>
                <input type="text" placeholder="输入关键字查询" v-model="userFilter">
            </div>
            <div class="userlist">
                <div class="userlist-wrap">

                </div>
            </div>
        </div>
        <div class="cell">
            <div class="search-item">
                <span>
                    <Icon type="ios-search-strong" size="22" style=""></Icon>
                </span>
                <input type="text" placeholder="输入关键字查询" v-model="groupFilter">
            </div>
            <div class="grouplist">
                <div class="grouplist-wrap">

                </div>
            </div>
            <div class="menu-bottom ltr">
                <Button type="success" >
                    <Icon type="plus" size="16px"></Icon>
                    新增用户组
                </Button>
            </div>
        </div>
        <div class="cell">
            <div class="scroll-cell">
                <div style="height:1500px;"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                userFilter:"",
                groupFilter:""
            }
        }
    }
</script>
<style lang="scss" scoped>
.userpck-wrap {
    display: table;
    width: 100%;
    height: 100%;
    border-spacing: 0;
    table-layout: fixed;
    background-color: #edf1f2;
    .cell {
        display: table-cell;
        float: none;
        height: 100%;
        vertical-align: top;
        position: relative;
        &:nth-child(1),
        &:nth-child(2) {
            width: 240px;
        }
        &:nth-child(2) {
            background-color: #f6f8f8;
        }
        &:nth-child(3) {
            background-color: #fff;
        }
    }
}

.scroll-cell {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow: hidden;
    overflow-y: auto;
}

.search-item {
    display: table;
    width: 100%;
    padding: 5px;
    height: 40px;
    border-bottom: #dee5e7 1px solid;
    background: transparent;
    span {
        display: table-cell;
        vertical-align: middle;
        padding: 0px 10px;
        width: 40px;
    }
    input {
        display: table-cell;
        height: 30px;
        padding: 5px 10px;
        float: left;
        font-size: 12px;
        line-height: 1.5;
        width: 100%;
        background: none;
        border: none
    }
}

.menu-bottom {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #dee5e7;
    padding: 10px;
    text-align: center;
}
.grouplist,.userlist{
    position: absolute;
    top:40px;
    bottom:60px;
    left:0px;
    right:0px;
    overflow: hidden;
    &-wrap{
        width: 258px;
        height:100%;
        overflow-y: auto
    }
}
.userlist{
   bottom:0px;
}
</style>
