<template>
	<div class="jyc-wrap">
        <h2>Sortable</h2>
        <p>Drag to sort list</p>
        <div class="drag-box">
            <draggable v-model="myArray" :options="{group:'people'}" @start="drag=true" @end="drag=false">
                <div class="item" v-for="element in myArray">{{element.name}}</div>
            </draggable> 
        </div>
        <p>Drag across list</p>
        <p>list 1</p>
        <div class="drag-box">
            <draggable v-model="list" :options="{group:'people2'}">
                <div class="item" v-for="element in list">{{element.name}}</div>
            </draggable>
        </div>
        <p>list2</p>
        <div class="drag-box">
            <draggable v-model="list2" :options="{group:'people2'}">
                <div class="item" v-for="element in list2">{{element.name}}</div>
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
            list: [{
              name: "list1-item1"
            }, {
              name: "list1-item2"
            }, {
              name: "list1-item3"
            }],
            list2: [{
              name: "list2-item1"
            }, {
              name: "list2-item2"
            }, {
              name: "list2-item3"
            }]
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
}

</style>