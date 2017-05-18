<template>
	<div class="jyc-wrap">
        <h2>Portlet</h2>
        <p class="detail">More infomation <a href="https://github.com/SortableJS/Vue.Draggable"> https://github.com/SortableJS/Vue.Draggable</a></p>
        <div class="drag-box">
            <draggable v-model="myArray" :options="{group:'people'}" @start="drag=true" @end="drag=false">
                <div class="item" v-for="element in myArray">{{element.name}}</div>
            </draggable> 
        </div>  
    </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    data() {
        return {
            myArray:[{name:'item1'},{name:'item2'},{name:'item3'},{name:'item4'}],
        }
    },
    
    components: {
        draggable
    },
   
    methods: {
      
    }
}
</script>
<style lang="scss" scoped>
.drag-box{
    padding:0 20px;
}
.item{
    margin:14px 0;
    padding:15px;
    border:1px solid #e7ecee;
    background:#fff;
    display:inline-block;
    width: 50%;
    height: 200px;
}

</style>