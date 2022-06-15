<template>
	<view class="loginview">
		<u-navbar :is-back="true" back-text="" title="登录吧"></u-navbar>
		<view class="loginbody">

			<u-toast ref="uToast" />
			<view class="loginfrom">
				<view class="logbody">
					<image class="logimg" src="/static/imgs/logo.gif">
						</u-image>

				</view>
				<u-subsection style="width: 80%;margin: auto;" :list="list" @change="change" :current="0">
				</u-subsection>
				<view class="loginfrombody">
					<u-field v-model="userlogn.mobile" label="手机号" placeholder="请填写手机号">
					</u-field>
					<u-field :clearable='false' v-model="userlogn.code" label="验证码" placeholder="请填写验证码">
						<u-button v-if="istimestamp" size="mini" slot="right" type="success" @click="getCode">
							{{codeText}}
						</u-button>
						<view v-else slot="right">
							<u-count-down :show-hours='false' :show-minutes='false' :timestamp="59" :autoplay="true">
							</u-count-down>
						</view>
					</u-field>
				</view>
				<view class="subminbottom">
					<u-button size="medium" type="primary" @click="loginclick">我想登录</u-button>
				</view>
				<view class="circle">
					<u-icon name="question-circle" size="40"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
		import checkuser from '@/uitls/userlogin.js'
	export default {
		data() {
			return {
				list: [{
					name: '手机号登录'
				}],
				userlogn: {},
				istimestamp: true,
				codeText: '发送验证码',
				timer: null,
			}
		},
		methods: {
			change(index) {

				this.current = index;
			},
			async getCode() {
				if (this.userlogn.mobile == null && this.userlogn.mobile == undefined) {
					return this.$refs.uToast.show({
						title: "请输入手机号",
						type: 'warning',
					})
				}
				this.istimestamp = false;

				const timer = setInterval(() => {
					this.istimestamp = true
					clearTimeout(this.timer)
				}, 30000);
				const result = await this.http.post('/users/usercode', {
					'iphone': this.userlogn.mobile,
					'password': this.userlogn.password
				})
				console.log(result)
				if (result.code === "200") {
					this.$refs.uToast.show({
						title: '已发送',
						type: 'success',
					})
				}
				//const result = await this.http.post('/users/Login',{'iphone': this.userlogn.mobile})
			},
			async loginclick() {
				const result = await this.http.post('/users/login', {
					'iphone': this.userlogn.mobile,
					'code': this.userlogn.code
				})

				if (result.code !== "200") {
					this.$refs.uToast.show({
						title: result.msg,
						type: 'info',
					})
				} else {
					uni.setStorageSync("token", result.token);
					this.store.state.user_id=result.userid;
					console.log(this.store.state.user_id,result.userid,checkuser.islogin())
					
					url: uni.navigateBack()

				}
				// this.resultmsg(result)
				// console.log(result)

			},
			resultmsg() {

				this.$refs.uToast.show({
					title: result.msg,
					type: 'success',
					url: uni.navigateBack()
				})


			}
		}
	}
</script>

<style lang="scss">
	.subminbottom {
		width: 50%;
		margin: auto;
		margin-top: 3vh;
	}

	.loginview {
		background: #F7DB56;
		// position: relative;
	}

	.logbody {

		display: flex;
		justify-content: center;
		height: 24vh;
		align-items: center;
	}

	.logimg {
		width: 125px;
		height: 125px;
		border-radius: 50%;
	}

	.loginbody {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;

		.loginfrom {
			border-radius: 25px;
			background: #EEEEEE;
			width: 75%;
			height: 60vh;

		}
	}

	.loginfrombody {
		margin-top: 30px;
	}

	.circle {
		position: absolute;
		font-size: inherit;
		font-weight: normal;
		top: 4vh;
		right: 9vw;
	}
</style>
