<template>
	<view style="background: #f3f4f4;height: 100vh;width: 100%;">
		<view class="nobackcolor">
			<view class="myuserinfo" v-if="this.islogin=='no'" @click="login()">
				<image class="userimg" mode="widthFix" src="../../static/imgs/13456.jpg"></image>
				<view>点击登录</view>
			</view>
			<view v-else>
				<view class="myuserinfo">
					<image class="userimg" mode="widthFix"
						:src="this.user.headimg==undefined?'../../static/imgs/13456.jpg':'http://localhost:3000/imgs/'+this.user.headimg">
					</image>
					<view class="uptataltext">点击修改</view>
					<u-upload class="userupload" :action="action" 
						:form-data="upFileData" @on-success='uploadsuccess'
						:auto-upload="true" :show-upload-list='false' :file-list="fileList">
					</u-upload>
					<view class="usernames">
						<view class="proname">{{user.user_name}}</view>
						<view class="info">忙碌星人。。。</view>
					</view>
				</view>
			</view>
		</view>

		<view class="">

			<view class="paymentlist">
				<view class="parlist">
					<image src="../../static/ui/wallet.png"></image>
					<view>待付款</view>
				</view>
				<view class="parlist">
					<image src="../../static/ui/jewelry.png"></image>
					<view>待发货</view>
				</view>
				<view class="parlist">
					<image src="../../static/ui/launch.png"></image>
					<view>待收货</view>
				</view>
			</view>
		</view>



		<view class="mymy">
			<view class=" myview nobackcolorc padleft">
				<view class="address" @click="gotoaddress">
					<view>
						<u-icon name="map"></u-icon>地址管理
					</view>
					<u-icon name="arrow-right"></u-icon>

				</view>
			</view>
			<view class="myview myorder padleft" @click="getallorder">
				<view>
					<u-icon name="rmb-circle"></u-icon>全部订单
				</view>
				<view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="myview padleft">
				<u-icon name="eye"></u-icon>我的足迹
			</view>
			<view class="myview padleft">
				<u-icon name="kefu-ermai"></u-icon>联系客服
			</view>
			<view class="myview padleft">
				<u-icon name="qq-circle-fill"></u-icon>关于我们
			</view>
		</view>
		<view style="margin-top: 250px;">
			<view>
				哈哈哈哈哈
			</view>

			<view>
				<u-divider bg-color="#f3f4f4">小卿商店</u-divider>
			</view>

		</view>

	</view>

</template>

<script>
	import isuserlogin from '../../uitls/userlogin.js'
	export default {
		data() {
			return {
				user: {},
				action: 'http://localhost:3000/users/uploaduserhandeimg',
				fileList: [],
				islogin: '',
				upFileData:{
					id:123456,
					name:'kadjfakl'
				}
			}

		},
		onLoad() {
			this.getuser();
			this.islogin = isuserlogin.islogin();

		},
		onShow() {
			this.islogin = isuserlogin.islogin();
		},
		methods: {
			login() {
				uni.navigateTo({
					url: '../login/index'
				})
			},
			async getuser() {
				if (isuserlogin.islogin() === 'yes') {
					const result = await this.http.post('/users/getuser', {
						'id': this.store.state.user_id
					})
					this.user = result.result[0]
					console.log(this.user)
				}
			},
			gotoaddress() {
				console.log(1)
				uni.navigateTo({
					url: '../address/index'
				})
			},
			getallorder() {
				uni.navigateTo({
					url: '../order/index'
				})
			},
			uploadsuccess(result) {
				if (result.code == '200') {
					console.log(result)
					this.user.headimg = result.result
				}
			}
		}
	}
</script>

<style lang="scss">
	.nobackcolor {
		background-color: #f4f5f7;
		margin-bottom: 40px;

		.myuserinfo {
			height: 13vh;
			display: flex;
			align-items: center;
			width: 94%;
			margin: auto;
			padding-top: 20px;

			.usernames {
				display: flex;
				flex-direction: column;

				.proname {
					font-size: 18px;
				}

				.info {
					color: #CCC;
					font-size: 14px;
				}
			}
		}
	}



	.mymy {
		height: 30vh;
		display: flex;
		flex-direction: column;
		margin-top: 20px;

		.myview {
			width: 90%;
			margin: auto;
			height: 15%;
			line-height: calc(5vh + 0px);
			border-bottom: 1px solid #f3f4f4;
			border-radius: 15px;
			background-color: #fff;
			box-shadow:
				0px 2.8px 10px rgba(0, 0, 0, 0.04),
				0px 22px 80px rgba(0, 0, 0, 0.08);

		}
	}

	.myorder {
		display: flex;
		justify-content: space-between;
		width: 94%;
	}

	.userimg {
		width: 60px;
		height: 60px !important;
		margin-right: 6px;
		border-radius: 50%;
	}

	.paymentlist {
		display: flex;
		justify-content: space-around;
		margin-top: 10px;
		height: 9vh;
		align-items: center;

		.parlist {
			height: 60px;
			width: 60px;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-radius: 5px;
			box-shadow:
				5.5px 0.6px 5.3px rgba(0, 0, 0, 0.073),
				18.5px 2px 17.9px rgba(0, 0, 0, 0.107),
				83px 9px 80px rgba(0, 0, 0, 0.18)
		}

		// .parlist:{
		// 	transform:scale(0.9,0.9);
		// 	transition:all .3s ;
		// }
		view {
			image {
				width: 30px;
				height: 30px;
			}
		}
	}

	.address {
		display: flex;
		justify-content: space-between;
		height: 4vh;
		align-items: center;
	}

	.padleft {
		padding-left: 10px;
	}

	.userupload {
		width: 60px;
		height: 60px;
		overflow: hidden;
		position: absolute;
		opacity: 0;
	}

	.uptataltext {
		color: #ccc;
		position: absolute;
		font-size: 12px;
		opacity: .3;
		top: 13vh;
	}
</style>
