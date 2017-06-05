<template>
    <div class="l-info">
        <div class="l-info_title">
            <Button @click="editUser" v-show="state == 1" type="primary" size="small">编辑</Button>
            <Button @click="submitEditUser('editData')" v-show="state != 1" type="primary" size="small">完成</Button>
            <Button @click="cancleUser" v-show="state != 1" size="small">取消</Button>
            <Button style="float:right" size="small" @click="delUser">
                <Icon type="close"></Icon>
            </Button>
        </div>
        <div class="l-info_content">
            <Form ref="editData" :model="currentUser" :rules="ruleValidate" :label-width="80">
                <div class="l-info_hbox">
                    <div class="hbox1">
                        <img src="../../../../assets/images/a0.jpg" alt="">
                    </div>
                    <div class="hbox2">
                        <p v-show="state == 1">{{currentUser.userName}}</p>
                        <Form-item label="" prop="userName" v-show="state != 1">
                            <Input v-model="currentUser.userName" size="large" placeholder="请输入姓名"></Input>
                        </Form-item>
                    </div>
                </div>
                <div class="l-info_group">
                    <Form-item label="用户账号" prop="userCode">
                        <Input v-model="currentUser.userCode" v-show="state != 1" placeholder="请输入姓名"></Input>
                        <span class="l-info__data" v-show="state == 1">{{currentUser.userCode}}</span>
                    </Form-item>
                    <Form-item label="手机号码" prop="userMobile">
                        <Input v-model="currentUser.userMobile" v-show="state != 1" placeholder="请输入手机号码"></Input>
                        <span class="l-info__data" v-show="state == 1">{{currentUser.userMobile}}</span>
                    </Form-item>
                    <Form-item label="邮箱地址" prop="userEmail">
                        <Input v-model="currentUser.userEmail" v-show="state != 1" placeholder="请输入邮箱地址"></Input>
                        <span class="l-info__data" v-show="state == 1">{{currentUser.userEmail}}</span>
                    </Form-item>
                    <Form-item label="用户状态">
                        <i-switch v-model="currentUser.userStatus" @on-change="changeStatus"></i-switch>
                    </Form-item>
                    <Form-item label="用户角色" prop="userRole">
                        <span class="l-info__data">{{currentUser.userRole | filterUserRole}}</span>
                    </Form-item>
                    <Form-item label="所在部门" prop="userRole">
                        <span class="l-info__data" v-show="state == 1">{{currentUser.userOrgName}}</span>
                        <Select v-model="currentUser.userOrgId" v-show="state != 1" style="width:180px" placement="top">
                            <Option v-for="item in deptlist" :value="item.value" :key="item">{{ item.label }}</Option>
                        </Select>
                    </Form-item>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
import api from "@/api/"
export default {
    data() {
        const validateuserMobile = (rule, value, callback) => {
            if (!(/^1[34578]\d{9}$/.test(value))) {
                callback(new Error('请再次输入正确的手机号码'));
            } else {
                callback();
            }
        };
        const validateuserEmail = (rule, value, callback) => {
            var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (!myreg.test(value)) {
                callback(new Error('请再次输入正确的邮箱地址'));
            } else {
                callback();
            }
        };
        return {
            ruleValidate: {
                userName: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                userCode: [
                    { required: true, message: '用户账号不能为空', trigger: 'blur' }
                ],
                userMobile: [
                    { validator: validateuserMobile, trigger: 'blur' }
                ],
                userEmail: [
                    { validator: validateuserEmail, trigger: 'blur' }
                ],
            },
        }
    },
    computed: {
        currentUser() {
            if (this.state === 2) {
                return {
                    userStatus: true
                }
            } else {
                var userData = {}
                this.deptlist.map(item => {
                    if(item.value == this.userdata.userOrgId){
                        userData.userOrgName = item.label
                    }
                })
                // console.log(1,Object.assign(userData,this.userdata))
                return Object.assign(userData,this.userdata)
            }

        }
    },
    props: ['userdata', 'state', 'deptlist'],
    methods: {
        editUser() {
            this.$emit("changstate")
        },
        cancleUser() {
            this.$emit("cancle")
        },
        delUser() {  // 确认删除用户
            this.$Modal.confirm({
                title: '操作确认',
                content: "<p>您确定要删除用户?</p>",
                onOk: () => {
                    this.excuteDelUser()
                },
            });
        },
        async changeStatus(val) {
            const data = api.put(api.config.userStatus, {
                userId: this.currentUser.userId,
                userStatus: val
            })
            if (data) {
                this.$emit("changUserstate", val)
            }
        },
        async excuteDelUser() { // 删除用户
            const data = await api.delete(api.config.authUser, {
                userId: this.currentUser.userId
            });
            if (data) {
                this.$totast.success({
                    title: "系统提示",
                    message: "操作成功"
                });
                // 刷新用户
                this.$emit("delDone")
            }
        },
        submitEditUser(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.submitEditUserAjax();
                }
            })
        },
        async submitEditUserAjax() {
            if (this.state == '3') {
                // 编辑用户
                var data = await api.put(api.config.authUser, this.currentUser)
            } else {
                // 新增用户
                var data = await api.post(api.config.authUser, this.currentUser)
            }
            if (data) {
                this.$totast.success({
                    title: "系统提示",
                    message: "操作成功"
                });
                // 刷新用户
                this.$emit("editDone",this.currentUser)
                this.$emit("cancle")
            }
        },
    },
    filters: {
        filterUserRole(value) {
            switch (value) {
                case 1:
                    return '平台管理员'
                case 2:
                    return '管理员'
                default:
                    return '成员'
            }
        }
    },
}
</script>
<style lang="scss">
.l-info {
    background: #fff;
    height: 100%;
}

.l-info_title {
    padding: 8px;
    border-bottom: 1px solid #e7ecee;
    i {
        margin: 3px 1px 2px;
        float: right;
        cursor: pointer;
    }
}

.l-info_content {
    padding: 30px;
}

.l-info_hbox {
    display: table;
    margin-bottom: 30px;
}

.hbox1 {
    width: 150px;
    height: 96px;
    display: table-cell;
    text-align: center;
    img {
        width: 96px;
        height: 96px;
        border-radius: 96px;
        vertical-align: text-middle;
    }
}

.hbox2 {
    font-size: 36px;
    font-weight: 300;
    display: table-cell;
    vertical-align: middle;
    .ivu-form-item-content {
        padding-left: 0px;
        margin-left: 0px!important;
    }
}

.l-info_group {
    width: 400px;
    margin-left: 20px;
    .ivu-form-item-label {
        font-size: 14px;
        color: #98a6ad;
    }
    .l-info__data {
        font-size: 14px;
    }
    .ivu-form-item-content {
        padding-left: 20px;
    }
}
</style>
