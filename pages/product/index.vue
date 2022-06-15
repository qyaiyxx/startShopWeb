<template>
	<view>

		<u-navbar :is-back="true" back-text="" title="商品详情"></u-navbar>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="imgbody">
			<view class="imgbodych">
				<image style="width: 100%;border-radius: 15px;"
					:src="'http://localhost:3000/imgs/'+product.product_image" mode="widthFix">
				</image>
			</view>
		</view>
		<view class="productbody">

			<view class="pronaandinto">
				<view class="proname">{{product.product_name}}</view>
				<view class="prointo">{{product.product_intro}}</view>
			</view>
			<view class="pronumbody">
				<view style="color: red;font-size: 22px;">￥{{product.product_price}}</view>
				<view style="display: flex;">
					<view>库存{{product.product_num}}</view>
					<view style="margin-left: 18px;">销量{{product.product_sales}}</view>
				</view>
			</view>
		</view>
		<view>
			<view class="imglistbody" v-for="item in product.infoimglist">
				<image style="width: 100%;" :src="'http://localhost:3000/imgs/'+item" mode="widthFix">
				</image>
			</view>
		</view>
		<view class="procart">
			<view class="procartleft">
				<view>
					<view @click="gotohome()" class="proleftlist">
						<u-icon name="home" size="28"></u-icon>
						<view>主页</view>
					</view>
				</view>
				<view>
					<view class="proleftlist">
						<u-icon name="chat" size="30"></u-icon>
						<view>消息</view>
					</view>
				</view>
				<view>
					<view class="proleftlist" @click="tocart()">
						<view style="position: relative;">
							<u-icon name="shopping-cart" size="30">
							</u-icon>
							<u-badge type="error" :is-center="true" :count="cartnum"></u-badge>
						</view>
						<view>购物车</view>
					</view>
				</view>
			</view>
			<view class="procartright">
				<view @click="buynow()">加入购物车</view>
				<view @click="atoncebuy()" class="rightbottom">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	import checkuser from '@/uitls/userlogin.js'
	export default {
		data() {
			return {
				product: {},
				cartnum: 0,
			}
		},
		onLoad(options) {
			this.loadproduct(options.id);
			if (this.store.state.user.id != undefined) {
				this.loadproductnum()
			}
		},
		methods: {
			async loadproduct(pid) {
				const result = await this.http.post('/product/webgetDetails', {
					productID: pid
				})
				this.product = result.Product[0]
				this.product.infoimglist = result.Product[0].product_image_infolist.split(',')
				console.log(this.product)
			},
			async buynow() {
				if (checkuser.islogin()=='yes') {
					const result = await this.http.post('/usercart/addcart', {
						'productid': this.product.product_id,
						//this.store.state.user.id
						'userid': 1
					})
					if (result.code == "200") {
						this.$refs.uTips.show({
							title: result.msg,
							type: 'success',
							duration: '2300'
						})
						this.loadproductnum()
					} else {
						this.$refs.uTips.show({
							title: result.msg,
							type: 'info ',
							duration: '2300'
						})
					}
				} else {
					uni.navigateTo({
						url: '../login/index'
					})
				}
			},
			tocart() {
				uni.switchTab({
					url: '../cart/index'
				})
			},
			gotohome() {
				uni.switchTab({
					url: '../home/index'
				})
			},
			async loadproductnum() {
				const result = await this.http.post('/usercart/findcartnum', {
					//this.store.state.user.id
					userid: 1
				})
				this.cartnum = result.datatotal
			},
			async atoncebuy() {
				if (checkuser.islogin()=='yes') {
					const result = await this.http.post('/order/createorder', {
						productid: this.product.product_id,
						//this.store.state.user.id
						userid: 1
					})
					if (result.code == '200') {
						uni.navigateTo({
							url: '/pages/pay/index?orderid=' + result.date
						})
					} else {
						this.$refs.uTips.show({
							title: result.msg,
							type: 'info ',
							duration: '2300'
						})
					}

				} else {
					uni.navigateTo({
						url: '../login/index'
					})
				}
			},
			isuserlogin() {

			}
		}
	}
</script>

<style lang="scss">
	.productbody {
		width: 92%;
		border-radius: 8px;
		background-color: #fff;
		margin: auto;
		margin-bottom:20px;
		box-shadow:
		  2.8px 2.4px 2.2px rgba(0, 0, 0, 0.02),
		  6.7px 5.7px 5.3px rgba(0, 0, 0, 0.028),
		  12.5px 10.8px 10px rgba(0, 0, 0, 0.035),
		  22.3px 19.2px 17.9px rgba(0, 0, 0, 0.042),
		  41.8px 35.9px 33.4px rgba(0, 0, 0, 0.05),
		  100px 86px 80px rgba(0, 0, 0, 0.07)
		;

		.pronaandinto {
			height: 60px;
			display: flex;
			justify-content: center;
			flex-direction: column;

			.prointo {
				font-size: 14px;
				color: #393e46;
				padding-left: 2vw;
			}

			.proname {
				font-size: 18px;
				font-weight: 700;
				padding-left: 2vw;
			}
		}

		.pronumbody {
			display: flex;
			justify-content: space-between;
			    margin: auto;
			    width: 96%;
		}


	}

	.proleftlist {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 12px;
	}

	.procart {
		height: 50px;
		bottom: 0;
		position: fixed;
		width: 100%;
		display: flex;

		.procartleft {
			width: 50%;
			display: flex;
			align-items: center;
			background: #FFF;
			justify-content: space-around;
		}

		.procartright {
			display: flex;
			width: 50%;
			
			view {
				width: 50%;
				display: flex;
				align-items: center;
				background: #ff9b19;
				justify-content: center;
				height: 100%;
				font-size: 16px;
				font-weight: 600;
				color: #FFF;
			}
			.rightbottom{
				    background: #dd1213;
			}
		}
	}

	.imgbody {
		display: flex;
		justify-content: center;

		.imgbodych {
			width: 92%;
			height: fit-content;
			margin: 20px 0;
			border-radius: 5px;
			//box-shadow: 15.4px 33.4px 10px rgb(0 0 0 / 4%), 123px 267px 80px rgb(0 0 0 / 7%);
		}
	}

	page {
		height: 100%;
		background-color: #dbe2ef;
	}
</style>
