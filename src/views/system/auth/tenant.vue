<template>
  <div class="hbox">
  	<div class="col">
  		<div class="wrapper">
  			<div class="panel panel-default">
				 	<div class="panel-heading">
				 		<Button type="success">新增</Button>
				 		<Button>删除</Button>
				 		<div style="float:right">
				 			<Input v-model="value1" placeholder="请输入..." style="width:100px"></Input>
				 		 	<Input v-model="value2" placeholder="请输入..." style="width:120px"></Input>
				 		 	<Button>查询</Button>	
				 		</div>
			    </div>
			    <div class="panel-body">
			    	<Table :context="self" :data="list" :columns="tableColumns1" stripe></Table>
  					<div style="margin: 10px;overflow: hidden">
      				<div style="float: right;">
          			<Page :total="100" :current="1" @on-change="changePage" show-total show-elevator show-sizer ></Page>
      				</div>
  					</div>
			    </div>
		    </div>
  		</div>
  	</div>
  	<div class="col w-lg" style="background-color: #f3f5f6;">
  	 <div></div>	
  	</div>		
  </div>
</template>
<script>
  import api from "../../../api"

  export default{
    data(){
      return {
      	value1:"",
      	value2:"",
      	self: this,
        list: [],
        tableColumns1: [
        	{
        		type:"selection",
        		width:60
        	},
          {
            title: '账号',
            key: 'tenantCode',
            width:90
          },
          {
            title: '简称',
            key: 'tenantShortname'
          },
          {
            title: '全称',
            key: 'tenantName'
          },
          {
            title: '电话',
            key: 'tenantPhone'
          },
          {
            title: '注册时间',
            key: 'tenantCreatedon',
            sortable: true,
            render (row, column, index) {
              return `{{ formatDate(list[${index}].tenantCreatedon,3) }}`;
            }
          },
          {
            title: '状态',
            key: 'tenantStatus',
            render (row) {
              const color = row.tenantStatus?'blue' : 'red';
              const text = row.tenantStatus ?'启用中' : '已禁用';
              return `<tag type="dot" color="${color}">${text}</tag>`;
          	}
          },
          {
            title: '操作',
            key: 'operate',
            render(row){
            	return `<a class="text-primary">菜单</a>`;
            }
        	}
        ]
      }
    },
    computed:{

    },
    created(){
      this.getTenantList()
    },
    methods: {
      async getTenantList() {
        const data = await api.post(api.config.tenantList);
        this.list = data.datas.result;
        console.log(data);
      },
      formatDate (date,l) {
        if(!date)return "-";
				if(Object.prototype.toString.call(date) == "[object Number]")date = new Date(date);
				if(Object.prototype.toString.call(date) != "[object Date]")return "时间存储错误";
				l = Math.min(parseInt(l) || 6,7);
				let timeStr = "";
				for(let i =0;i<l;i++){
					if(i==0){
						timeStr += date.getFullYear() + '-';
					}else if(i==1){
						timeStr += (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
					}else if(i==2){
						timeStr += (date.getDate() < 10 ? '0'+date.getDate() : date.getDate())  + ' ';
					}else if(i==3){
						timeStr += date.getHours()<10? '0' + date.getHours()+ ':':date.getHours()+':';
					}else if(i==4){
						timeStr += date.getMinutes()<10?'0' + date.getMinutes()+ ':':date.getMinutes()+':';
					}else if(i==5){
						timeStr += date.getSeconds()<10?'0'+date.getSeconds()+ ':' :date.getSeconds() + ':';
					}else if(i==6){
						timeStr += date.getMilliseconds();
					}
				}
        return timeStr.substring(0,timeStr.length-1);
      },
      changePage(){
      	console.log(2);
      }
    }
  }
</script>
<style lang="scss">
	.hbox{
    display: table;
    width: 100%;
    height: 100%;
    border-spacing: 0;
    table-layout: fixed;
    .col{
	    display: table-cell;
	    float: none;
	    height: 100%;
	    vertical-align: top;
    }
    .w-lg{width:280px;}
	}
	.wrapper{padding:15px;}
	.panel-default{
		border-color: #dee5e7;
		border-radius: 2px;
    background-color: #fff;
    border: 1px solid transparent;
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
		.panel-heading{
			border-color:#edf1f2;
			background-color: #f6f8f8;
			padding: 10px 15px;
		  border-bottom: 1px solid transparent;
		}
	}
	a.text-primary{
		color: #7266ba;
		text-decoration: none;
    cursor: pointer;
	}
// 	.panel {
// 	  border-radius: 2px;
// 		.accordion-toggle {
// 		  display: block;
// 		  font-size: 12px;
// 		  cursor: pointer;
// 		}
// 		.list-group-item {
//   		border-color: #edf1f2;
// 		}
// 		&.no-borders {
//   		border-width: 0;
// 			.panel-heading,.panel-footer{
// 				border-width: 0;
// 			}
// 		}
// 	}

// .panel-heading {
//   border-radius: 2px 2px 0 0;
//   &.no-border{
//   	margin: -1px -1px 0 -1px;
//   	border: none;	
//   }
//   .nav{
//   	margin: -10px -15px;	
//   }
//   .list-group{background: transparent;}
// }

// .panel-footer {
//   background-color: #ffffff;
//   border-color: #edf1f2;
//   border-radius: 0 0 2px 2px;
// }

// .panel-default {
//   border-color: #dee5e7;
//   .panel-heading{background-color: #f6f8f8;}
//   >.panel-heading,>.panel-footer{border-color: #edf1f2;}
// }

// .panel-group .panel-heading + .panel-collapse .panel-body {
//   border-top: 1px solid #eaedef;
// }
</style>

