<template>
	<view style="background: #f3f4f4;height: 100vh;width: 100%;">
		<view class="nobackcolor">
			<view class="myportrait" v-if="this.user.user_id==null&&this.user.user_id==undefined" @click="login()">
				<image class="userimg" mode="widthFix" src="../../static/imgs/13456.jpg"></image>
				<view>点击登录</view>

			</view>
			<view v-else>
				<image class="userimg" mode="widthFix" src="../../static/imgs/13456.jpg"></image>
				<view>你好{{user.user_name}}</view>
			</view>
		</view>
		<u-gap height="20" bg-color=" #f3f4f4"></u-gap>
		<view class="nobackcolor">
			<view class="myorder">
				<view>我的订单</view>
				<view>查看全部订单<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
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
		<u-gap height="20" bg-color=" #f3f4f4"></u-gap>
		<view class="nobackcolor">
			<view class="address" @click="gotoaddress">
				<view>
					<u-icon name="map"></u-icon>地址管理
				</view>
				<u-icon name="arrow-right"></u-icon>
				
			</view>
		</view>
		<u-gap height="20" bg-color=" #f3f4f4"></u-gap>
		<view class="mymy">
			<view class="myview" >
				<u-icon name="eye"></u-icon>我的足迹
			</view>
			<view class="myview">
				<u-icon name="kefu-ermai"></u-icon>联系客服
			</view>
			<view class="myview">
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
				user: {}
			}

		},
		onShow() {
			this.getuser()
		},
		methods: {
			login() {
				uni.navigateTo({
					url: '../login/index'
				})
			},
			async getuser() {
				if (isuserlogin.islogin()==='yes') {
					const result = await this.http.post('/users/getuser', {
						'id': this.store.state.user_id
					})
					this.user = result.result[0]
					console.log(this.user)
				}
			},
			gotoaddress(){
				console.log(1)
				uni.navigateTo({
					url:'../address/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.nobackcolor {
		background: #fff;
	}

	.myportrait {
		height: 13vh;
		display: flex;
		align-items: center;
		width: 94%;
		margin: auto;
	}

	.mymy {
		background: #fff;

		.myview {
			width: 94%;
			margin: auto;
			height: 4vh;
			line-height: 4vh;
			border-bottom: 1px solid #f3f4f4;

			view {
				margin-right: 10px;
			}
		}
	}

	.myorder {
		display: flex;
		justify-content: space-between;
		padding-top: 10px;
		padding-bottom: 10px;
		width: 94%;
		margin: auto;
		border-bottom: 1px solid #ccc;
	}

	.userimg {
		width: 60px;
		height: 60px;
		margin-right: 6px;
		border-radius: 50%;
	}

	.paymentlist {
		display: flex;
		justify-content: space-around;
		margin-top: 10px;
	    height: 9vh;
	    align-items: center;
		.parlist{
			    display: flex;
			    flex-direction: column;
			    align-items: center;
		}
		view {
			image {
				width: 30px;
				height: 30px;
			}
		}
	}

	.address {
		width: 94%;
		    margin: auto;
		display: flex;
		justify-content: space-between;
		height: 4vh;
		align-items: center;
	}
</style>
