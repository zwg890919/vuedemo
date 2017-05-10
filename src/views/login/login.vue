<template>
	<div class="login">
		<div class="login-header">
			<div class="login-container">
				<i class="login-header-logo"></i>
				<span>运营支撑平台</span>
			</div>
		</div>
		<div class="login-wrap">
			<p class="login-box__error"></p>
			<i-input
				type="text"
				class="login-wrap__input"
				v-model="formInline.userMobile"
				size="large"
				placeholder="请输入用户名">
			</i-input>
			<i-input
				type="password"
				class="login-wrap__input password"
				v-model="formInline.userPassword"
				size="large"
				placeholder="请输入密码">
			</i-input>
			<Row :gutter="20">
				<Col span="16">
					<i-input
						type="text"
						class="login-wrap__input validate"
						v-model="formInline.verifyCode"
						size="large"
						placeholder="请输入验证码">
					</i-input>
				</Col>
				<Col span="4" style="width: auto;">
					<img src="api/verifycode" onclick="this.src='/verifycode?' + Math.random()"/>
				</Col>
			</Row>
			<Button type="primary" long size="large" style="margin-top:15px;" @click="getToken">登陆</Button>
			<p class="login-reg">
				<a>立即注册</a>
				<a>忘记密码？</a>
			</p>
		</div>
		<div class="login-bottom">
			<p>Copuright@ 2016 JYC99.COM All RighS Reserved 浙江聚有财金融服务有限公司</p>
		</div>
	</div>
</template>
<script>
import api from "../../api"

export default {
	data() {
		return {
			formInline: {
				userMobile: "13800000000",
				userPassword: "123456",
				verifyCode: ""
			}
		}
	},
	created() {
		window.localStorage.removeItem('menuId');
	},
	methods: {
		async getToken() {
			var data = await api.login(this.formInline)
			if(data.success){
			  // console.log(this.$totast)
			// this.$totast.warning({
			// title:"一条提示信息啊",
			// message:"这是一条提示信息啊一条提示信息啊"
			// })
                window.localStorage.clear("menuId")
				this.$router.push("app");
			}
		}
	}
}
</script>
<style lang="scss">
.login {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: url("../../assets/images/login/bg.jpg") center no-repeat;
	background-size: cover;
	&-header {
		height: 70px;
		background: #fff;
		opacity: 0.9;
		.login-container {
			width: 970px;
			height: 100%;
			padding: 20px 0;
			margin: 0px auto;
			.login-header-logo {
				float: left;
				width: 105px;
				height: 30px;
				background: url(../../assets/images/login/loginicon.png);
			}
			span {
				float: left;
				height: 18px;
				padding: 0px 15px;
				margin: 7px 0px 7px 15px;
				line-height: 18px;
				font-size: 16px;
				color: #679fd7;
				border-left: 1px solid #127fce;
			}
		}
	}
	&-bottom {
		position: absolute;
		bottom: 0px;
		width: 100%;
		height: 75px;
		background: #fff;
		opacity: 0.9;
		p {
			text-align: center;
			line-height: 75px;
		}
	}
	&-wrap {
		position: absolute;
		top: 20%;
		right: 10%;
		z-index: 101;
		width: 400px;
		height: 350px;
		padding: 0 50px;
		background: #fff;
		opacity: 0.9;
		&__input {
			position: relative;
			margin-bottom: 15px;
			&:before {
				position: absolute;
				left: 10px;
				top: 50%;
				z-index: 1;
				content: "";
				width: 16px;
				height: 12px;
				margin-top: -6px;
				background: url('../../assets/images/login/loginicon.png') no-repeat 0 -36px;
			}
			input {
				padding-left: 35px;
			}
		}
		.password {
			&:before {
				left: 12px;
				width: 10px;
				height: 14px;
				margin-top: -7px;
				background: url('../../assets/images/login/loginicon.png') no-repeat -38px -35px;
			}
		}
		.validate {
			&:before {
				left: 10px;
				width: 16px;
				height: 12px;
				margin-top: -5px;
				background: url('../../assets/images/login/loginicon.png') no-repeat -84px -37px;
			}
		}
	}
	&-box__error {
		height: 18px;
		margin: 20px 0 30px 0;
		font-size: 12px;
		text-align: right;
		color: #ff1216;
	}
	&-input__icon {
		padding: 0px 6px;
		font-size: 20px;
	}
	&-reg {
		margin-top: 15px;
		text-align: right;
		a {
			color: #00b4ff;
			font-family: Microsoft YaHei, sans-serif;
		}
	}
}
</style>
