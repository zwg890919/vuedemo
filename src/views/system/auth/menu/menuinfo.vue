<template>
    <div>
        <div class="search-item">
            <span>
                <Icon type="ios-search-strong" size="22" style=""></Icon>
            </span>
            <input type="text" placeholder="输入关键字查询" v-model="itemFilter">
        </div>
        <div class="scroll-cell">
            <div class="api-details">
                <a v-for="item in itemdata" :id="item.itemId" :class="{select:item.itemId == selectItem.menuItemId}">
                    <div >
                    <span class="label">{{item.itemTab}}组</span>
                    /**<br>&nbsp;*&nbsp;<span>{{item.itemAllDesc}}</span><br>
                    <span v-for="param in item.params">
                        &nbsp;* <span class="text-muted">@param</span>
                        <span class="hightLight">{{param}}</span><br>
                    </span>
                    &nbsp;*/<br>
                    <span ><i class="glyphicon glyphicon-trash"></i></span>
                    @RequestMapping(value="<span class="hightLight">/{{item.itemUrl}}</span>"
                    <span v-if="item.itemRequestmethod">, method=RequestMethod.<span class="hightLight"><em>{{item.itemRequestmethod}}</em></span></span>)
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                itemFilter:""
            }
        },
        props:["itemdata","selectItem"],
        watch:{
            itemdata(val){
                console.log(val)
            },
            selectItem(x){
                console.log(x)
            }
        }
    }
</script>
<style lang="scss" scoped>
.search-item {
    display: table;
    width:100%;
    padding: 5px;
    height: 40px;
    border-bottom: #dee5e7 1px solid;
    background: #f6f8f8;
    span{
        display: table-cell;
        vertical-align: middle;
        padding: 0px 10px;
        width:40px;
    }
    input {
        display: table-cell;
        height: 30px;
        padding: 5px 10px;
        float: left;
        font-size: 12px;
        line-height: 1.5;
        width: 100%;
        background:none;
        border:none
    }
}

.scroll-cell {
    position: absolute;
    top: 40px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow: hidden;
    overflow-y: auto;
}

.api-details {
    a{
        display: block;
        padding:15px 20px;
        border-bottom:#e7ecee 1px solid;
        color:#555;
        font-size:14px;
        &:hover{
            color: #555;
        }
        .text-muted{
            color:#98a6ad;
        }
        .hightLight{
            color:#19a9d5
        }
        .label{
            color: #f4f3f9;
            background-color: #7266ba;
            float:right;
            font-size:12px;
            padding:2px 5px;
            border-radius: 5px;
            font-weight: bold;
        }
        &.select{
            position: relative;
            z-index: 1;
            background-color: #dbeef9 !important;
            border-color: #c5e4f5;
        }
    }
}
</style>
