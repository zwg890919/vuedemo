<template>
    <div class="gobal-menu">
        <div>
            <ul>
                <li class="row-row">
                    <div>
                        <div class="scroll-cell">
                            <jyc-tree :treedata="treedata" :showCheckbox="false" @tree-dbclick="treedbclick" @tree-click="treeClick" @tree-close="treeClose" >
                            </jyc-tree>
                        </div>
                    </div>
                </li>
                <li class="menu-bottom">
                    <Button v-if="addshow1" type="success" @click="toggleAddShow1">
                        <Icon type="plus" size="16px"></Icon>
                        新增部门
                    </Button>
                    <div v-else>
                    	<Input v-model="addDept.orgName" placeholder="请输入..." style="width: 200px"></Input>
                    	<Button  type="primary" @click="submitDept">提交</Button>
                    	<Button type="ghost" @click="toggleAddShow1">返回</Button>
                    </div>
                </li>
            </ul>
        </div>
        <div>
            <ul>
                <li class="row-row">
                    <div>
                    	<div class="search-item">
				            <span>
				                <Icon type="ios-search-strong" size="22" style=""></Icon>
				            </span>
				            <input type="text" placeholder="输入关键字查询" v-model="itemFilter">

				        </div>
				        <div class="l-list">
				        	<a @click="userClick(i, x)" v-show="x.userOrgId == showid || showAll" :class="{select: selectUser== x}" v-for="(x,i) in filtrate(userList)">{{x.userName}}({{x.userCode}})</a>
				        </div>
                    </div>
                </li>
                <li class="menu-bottom">
                    <Button  type="success" @click="addFunction">
                        <Icon type="plus" size="16px"></Icon>
                        新增联系人
                    </Button>
                </li>
            </ul>
        </div>
        <div class="" v-show="i == index" v-for="(x,i) in userList">
        	<div class="l-info">
        		<div class="l-info_title">
        			<Button @click="editUser" v-show="editStatus == 1" type="primary" size="small">编辑</Button>
                    <Button @click="submitEditUser" v-show="editStatus == 2" type="primary" size="small">完成</Button>
                    <Button @click="editStatus = 1" v-show="editStatus == 2" size="small">取消</Button>
                    <Button style="float:right" size="small" @click="delUser"><Icon type="close" /></Button>
        		</div>
				<div class="l-info_content">
					<div class="l-info_hbox">
						<div class="hbox1">
							<img src="../../../../assets/images/a0.jpg" alt="">
						</div>
						<div class="hbox2">
							<p v-show="editStatus == 1">{{selectUser.userName}}</p>
                            <Input v-model="editData.userName" v-show="editStatus == 2" style="width: 180px"></Input>
						</div>
					</div>

					<div class="l-info_group">
						<div class="l-row">
							<label>用户账号</label>
							<span v-show="editStatus == 1">{{selectUser.userCode}}</span>
                            <Input v-model="editData.userCode" v-show="editStatus == 2" style="width: 180px"></Input>
						</div>
						<div class="l-row">
							<label>手机号码</label>
							<span v-show="editStatus == 1">{{selectUser.userMobile}}</span>
                            <Input v-model="editData.userMobile" v-show="editStatus == 2" style="width: 180px"></Input>
						</div>
                        <div class="l-row">
                            <label>邮箱地址</label>
                            <span v-show="editStatus == 1">{{selectUser.userEmail}}</span>
                            <Input v-model="editData.userEmail" v-show="editStatus == 2" style="width: 180px"></Input>
                        </div>
						<div class="l-row">
							<label>用户状态</label>
							<i-switch v-model="selectUser.userStatus" @on-change="changeStatus"></i-switch>
						</div>
						<div class="l-row">
							<label>用户角色</label>
							<span>{{selectUser.userRole | filterUserRole}}</span>
						</div>
						<div class="l-row">
							<label>所在部门</label>
							<span v-show="editStatus == 1">{{selectUser.userOrgId | filterUserOrgId}}</span>
                            <Input v-model="editData.userOrgId" v-show="editStatus == 2" style="width: 180px"></Input>

						</div>
					</div>
				</div>
        	</div>
        	<!-- <a v-show="i == index"  v-for="(x,i) in userList">{{x.userName}}({{x.userCode}})</a> -->
        </div>

    </div>
</template>
<script>
import api from "@/api/"
import menuInfo from "@/views/system/auth/menu/menuinfo"
export default {
    data() {
        return {
            itemFilter:'',
            editStatus:1,
        	addshow1:true,
        	addshow2:true,
        	showAll:true,
			showid:'',
            treedata: [],
            currentData: {},
            selectData:{},
            addMenu: false,
            modalType:"add",
            functionType:false,
            userList:[],
            index:0,
            operate:'',
            addDept:{
            	pageid:10013,
            	orgId:'',
            	orgName:'',
            },
            editData:{
                userName:'',
                userCode:'',
                userMobile:'',
                userOrgId:'',
                userEmail:'',
                userId:'',
                userRole:''
            },
            selectUser:{

            }
        }
    },
    created() {
        this.getMenu();
        this.getUserList();
    },

    methods: {
        filtrate(itemlist){
            var CurrentArray = [];
            if(itemlist.length>0 && this.itemFilter != ""){
                var searchRegex = new RegExp(this.itemFilter, 'i');
                for (var item of itemlist) {
                    if(searchRegex.test(item.userCode) || searchRegex.test(item.userName)){
                        CurrentArray.push(item)
                    }
                }
                return CurrentArray
            }else{
                return itemlist
            }
        },
        addFunction(){
            this.editData.userName = '';
            this.editData.userCode = '';
            this.editData.userMobile = '';
            this.editData.userOrgId = '';
            this.editData.userEmail = '';
            //这两个不能改
            this.editData.userId = '';
            this.editData.userRole = '';
            this.operate = 'edit';
            this.editStatus = 2;
        },
        editUser(){
            this.operate = 'edit';
            let currentUser = this.userList[this.index];
            console.log(currentUser)
            this.editStatus = 2;
            this.editData.userName = currentUser.userName;
            this.editData.userCode = currentUser.userCode;
            this.editData.userMobile = currentUser.userMobile;
            this.editData.userOrgId = currentUser.userOrgId;
            this.editData.userEmail = currentUser.userEmail;
            //这两个不能改
            this.editData.userId = currentUser.userId;
            this.editData.userRole = currentUser.userRole;

        },
        async submitEditUser(){
            if(this.operate == 'edit'){
                const data = await api.put(api.config.authUser,this.editData)
            }else{
                const data = await api.post(api.config.authUser,this.editData)
            }
            if(data){
                this.$totast.success({
                    title:"系统提示",
                    message:"操作成功"
                });
                // 刷新用户
                this.getUserList();
            }
            console.log(data);
        },
        // 删除用户弹框
        delUser(){
             this.$Modal.confirm({
                title: '操作确认',
                content: "<p>您确定要删除用户?</p>",
                onOk: () => {
                    this.excuteDelUser()
                },
            });
        },
        // 删除用户
        async excuteDelUser(){
            const data = await api.delete(api.config.authUser,{
                userId:this.userList[this.index].userId
            });
            if(data){
                this.$totast.success({
                    title:"系统提示",
                    message:"操作成功"
                });
                // 刷新用户
                this.getUserList();
            }
        },
        // 删除部门
    	async submitDept(){
    		if(this.orgId == ''){
    			this.$totast.warning({
                    title:"操作提示",
                    message:"请先选择一个父级部门"
                })
    		} else if(this.addDept.orgName == ''){
    			this.$totast.warning({
                    title:"操作提示",
                    message:"请先输入组织名称，后提交"
                })
    		} else{
    			const data = await api.post(api.config.orgBattch, this.addDept);
                if(data){
                    this.$totast.success({
                        title:"系统提示",
                        message:"操作成功"
                    });
                    this.getMenu();
                }
    		}
    	},
    	toggleAddShow1(){
    		this.addshow1 = !this.addshow1;
    	},
        // 切换用户状态
    	async changeStatus(status){
    		const data = await api.put(api.config.userStatus, {
    			userStatus:status
    		})
            if(data){
                this.$totast.success({
                    title:"系统提示",
                    message:"操作成功"
                });
            }
    	},
        // 点击用户列表
    	userClick(i, data){
            // console.log(data)
    		// this.index = i;
    		console.log(data);
            this.selectUser = data;
    	},


        async getMenu() {
        	let arr = new Array();
        	const data = await api.get(api.config.orgTree)
            arr[0] = data.datas.result
            arr[0].level = 1;
            for(let x of arr[0].childrens){
            	x.level = 2;
            	for(let y of x.childrens){
            		y.level = 3;
            	}
            }
            this.treedata = arr;
        },
        async getUserList() {
            const data = await api.post(api.config.userList)
            this.userList = data.datas.result;
        },
        treedbclick(data) {
        	console.log(12);
            this.currentData = data
            this.modalType = "edit"
            var _this = this
            this.eachNode(this.treedata, function (item) {
                if (item.id == data.parentId) {
                    _this.currentData.menuParentName = item.name;
                    _this.currentData.menuParentId = item.id
                }
            })
            this.addMenu = true
        },
        filterList(id){
        	let temp = this.userList
        	let arr = [];
        	console.log(temp)
        	for(let x of temp){
        		console.log(x);
        		if(x.userOrgId == id){
        			arr.push(x);
        		}
        	}
        	return arr;
        },
        treeClick(data) {
        	this.addDept.orgId = data.id;
        	// 浙江聚有财金融服务外包有限公司
        	if(data.id == 2){
        		this.index = 0;
        		this.showAll = true;
        		return;
        	}else{
        		this.showAll = false;
        	}
        	console.log(data.id);
        	this.showid = data.id;
        	for(let x in this.userList){
        		if(this.userList[x].userOrgId == data.id){
        			this.index = x;
        			// console.log(this.index)
        			return;
        		}
        	}

        },
        treeClose(data) {
        	console.log(data.id);
        	console.log(data.name);
            this.$Modal.confirm({
                title: '操作确认',
                content: "<p>您确定要删除"+data.name+"，及下属所有的用户?</p>",
                onOk: () => {
                    this.delMenu(data)
                },
            });
        },
        eachNode(data, callback) {
            var that = this
            callback(data)
            data.childrens.map(item => {
                that.eachNode(item, callback);
            })
        },
        resetCurrentData() {
        	let param = {
        		orgId:'100020',
        		orgName:'ssss1',
        		pageid:'10031'
        	}
        },

        async updateMenu(param){
            const data = await api.put(api.config.authMenu,param)
            if(data){
                this.$totast.success({
                    title:"系统提示",
                    message:"提交成功"
                })
                this.addMenu = false
            }
        },
        async delMenu(obj){
            const param = {
                pageid : 10031,
                userDel: true,
                orgId : obj.id
            };
            const data = await api.delete(api.config.authOrg,param);
            console.log(data);
            // this.$totast.success({
            //     title:"系统提示",
            //     message:"删除成功"
            // })
        },
        cancle(){
            this.addMenu = false;
        }
    },
    filters:{
    	filterUserRole(value){
    		if(value == 1){
    			return '平台管理员';
    		}else if(value == 2){
    			return '管理员';
    		}else if(value == 3){
    			return '成员';
    		}else{
    			return '';
    		}
    	},
    	filterUserOrgId(value){
    		let map = {
    			'2':'浙江聚有财金融服务外包有限公司',
    			'10020':'技术研发中心',
    			'10022':'系统运维组',
    			'100021':'系统架构组',
    			'10005':'大客户事业部',
    			'100016':'车险项目组',
    			'100015':'EHR项目组',
    			'10003':'平台应用部',
    			'10017':'云采家项目',
    			'10004':'框架开发组',
    			'10002':'销售运营中心',
    			'10010':'数字营销部',
    			'10009':'工商企业部',
    			'10000':'行政服务中心',
    			'10008':'综合管理部',
    			'10007':'人力资源部',
    		}
    		return map[String(value)];
    	}
    },
    components: {
        menuInfo
    }
}
</script>
<style lang="scss" scoped>
.model-wrap {
    P {
        margin: 8px 0px 5px;
        color: #98a6ad;
    }
    .ivu-input {
        font-size: 16px;
    }
}

.gobal-menu {
    color: #58666e;
    background-color: #edf1f2;
    display: table;
    width: 100%;
    height: 100%;
    border-spacing: 0;
    table-layout: fixed;
    &>div {
        display: table-cell;
        float: none;
        height: 100%;
        vertical-align: top;
        &:first-child {
            width: 360px;
            border-right: 1px solid #dee5e7;
        }
        &:nth-child(2){
        	border-right:1px solid #dee5e7;
        	width:200px;
        	background:#f6f8f8;
        }

        ul {
            position: relative;
            display: table;
            width: 100%;
            height: 100%;
            min-height: 240px;
            border-spacing: 0;
            .row-row {
                display: table-row;
                width: 100%;
                height: 100%;
                background: #edf1f2;
                &.bg-white {
                    background: #fff;
                }
                &>div {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
                .search-item{
                    padding:5px;
                    height:40px;
                    border-bottom: #dee5e7 1px solid;
                    background:#f6f8f8;
                }
                .scroll-cell {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    right: 0px;
                    bottom: 0px;
                    overflow: hidden;
                    &:hover {
                        overflow-y: auto;
                    }
                }
            }
            .menu-bottom {
                border-top: 1px solid #dee5e7;
                padding: 15px;
                &.ltr {
                    background-color: #f6f8f8;
                }
            }
        }
    }
}
.search-item {
    display: table;
    width: 100%;
    padding: 5px;
    height: 40px;
    border-bottom: #dee5e7 1px solid;
    background: #f6f8f8;
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
.l-list{
	overflow:scroll;
	position:absolute;
	width:100%;
	height:100%;
	padding-bottom: 100px;
	 a{
	 	display:inline-block;
	 	width:100%;
    	padding:15px;
    	color: #555;
    	font-size:16px;
    	border-bottom:1px solid #e7ecee;
    }
    a.select{
    	background:#dbeef9;
    }
}
.l-info{
	background:#fff;
	height:100%;
}
.l-info_title{
	padding:8px;
	border-bottom:1px solid #e7ecee;
}
.l-info_content{
	padding:30px;
}
.l-info_hbox{
	display:table;
	margin-bottom:30px;
}
.hbox1{
	width:150px;
	height:96px;
	display:table-cell;
	text-align: center;
	img{
		width:96px;
		height:96px;
		border-radius:96px;
		vertical-align:text-middle;
	}
}
.hbox2{
	font-size:36px;
	font-weight:300;
	display:table-cell;
}
.l-info_group{
	.l-row{
		margin-bottom:30px;
		font-size:14px;
		label{
			display:inline-block;
			width:100px;
			margin-left:40px;
			color:#98a6ad;
		}
		span{

		}
	}
}

</style>
