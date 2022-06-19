<template>
	<view class="pay">
		<u-navbar :is-back="true" back-text="" title="确认订单"></u-navbar>
		<view>
			<view>
				<view class="addresslistbody">

					<view class="addresslist">
						<u-icon size="40" name="map"></u-icon>
						<view class="addressbody">
							<view class="addressintro">
								<view>
									{{address.receivername}}
								</view>
								<view>
									{{address.telephone}}
								</view>
							</view>
							<view>
								<view>
									{{address.province}}{{address.city}}{{address.district}}{{address.detial}}
								</view>
							</view>
						</view>
						<u-icon size="40" name="arrow-right"></u-icon>
					</view>

				</view>

				<view>
					<view class="orderdata">
						<view class="orderdatabody">
							<view class="orderdatabodylist1" v-for="item in orderdetaildata">
								<view>
									<image class="orderdatabodyimg"
										:src="'http://localhost:3000/imgs/'+item.product_image" mode="">
									</image>
								</view>
								<view class="orderpricebody">
									<view class="orderprice">
										<view>{{item.product_name}}</view>
										<view>￥{{item.product_price}}</view>
									</view>
									<view class="ordernum">
										<view>*{{item.num}}</view>
									</view>
								</view>

							</view>
							<view class="orderdis">
								<view class="leftlist">购买数量</view>
								<view class="rightlist">

								</view>
							</view>
							<view class="orderdis">
								<view class="leftlist">配送方式</view>
								<view class="rightlist">免邮</view>
							</view>
							<view class="orderdis">
								<view class="leftlist">运费险</view>
								<view class="rightlist">￥0.55</view>
							</view>
							<view class="orderdis">
								<view class="leftlist">订单备注</view>
							</view>
							<view class="ordercount">
								<view>共计{{orderdata.order_num}}件</view>
								<view class="minicount">小计<view style="color: red;">￥{{orderdata.pay_money}}</veiw>
									</view>

									</vewi>
								</view>
							</view>

						</view>
						<view class="userremarks">
							<samp>备注信息：</samp>
							<view class="rightlist">
								<u-input v-model="remarksinfo" height="20" placeholder-style="font-size: 12px;"
									placeholder="选填,请和卖家协商一致" />
							</view>
						</view>
					</view>
				</view>
				<u-keyboard ref="uKeyboard" @cancel="escpay" @backspace="backspace" mode="number" @change="valChange"
					@confirm="submitpwd" v-model="pwdkey"></u-keyboard>
			</view>

		</view>

		<view class="gotopay">
			<view class="gotopaybody">
				<view style="font-size: 12px;color: #ccc;">共{{orderdata.order_num}}件</view>
				<view style="font-size: 13px;margin-left: 10px;">合计:<view style="color: red;">{{orderdata.pay_money}}
					</view>
				</view>

				<view>
					<u-button style="width: 20vw;margin-left: 10px; color: #fff; background-color: #2B85E4;" size="mini"
						shape="circle" @click="paygo">确认订单 </u-button>
				</view>
			</view>
		</view>

		<u-toast ref="uToast" />
	</view>

</template>

<script>
	export default {
		data() {
			return {
				orderdata: {},
				address: {},
				orderid: '',
				orderdetaildata: {},
				remarksinfo: '',
				value: "",
				pwdkey: false,
			}
		},
		onLoad(options) {
			this.orderid = options.orderid;
			this.getaddress()
			this.findorder()
		},
		methods: {
			async getaddress() {
				const result = await this.http.post('/order/getdefaultaddress', {
					userid: 1
					// this.store.state.user.id
				})
				this.address = result.data

			},
			async findorder() {
				const result = await this.http.post('/order/findorder', {
					orderid: this.orderid
				})
				console.log(result)
				this.orderdetaildata = result.data2
				this.orderdata = result.data

			},
			backspace() {
				// 删除value的最后一个字符
				if (this.value.length) this.value = this.value.substr(0, this.value.length - 1);
			},
			valChange(val) {
				// 将每次按键的值拼接到value变量中，注意+=写法
				this.value += val;

			},
			paygo() {
				this.pwdkey = true;

			},
			escpay() {
				this.$refs.uToast.show({
					title: '取消支付',
					type: 'primary',

				})
			},
			async submitpwd() {
				if (this.value == 123456 || this.value == "123456") {
					this.value = ""
					this.$refs.uToast.show({
						title: '支付成功',
						type: 'success',
					})
					//this.store.state.user_id
					const result = await this.http.post("/order/okpay", {
						orderid: this.orderid,
						userid: 1,
						remarksinfo: this.remarksinfo
					})

					if (result.code !== "200") {
						return this.$refs.uToast.show({
							title: '服务器错误，请联系客服',
							type: 'info',
						})
					}
					console.log(123)
					uni.switchTab({
						url: 'pages/user/index'
					})
					// uni.navigateTo({
					// 	url:'/pages/product/index?id='+9
					// })
				} else {
					this.value = ""
					this.$refs.uToast.show({
						title: '密码错误',
						type: 'warning',
					})
				}
			},

		}
	}
</script>

<style lang="scss">
	.pay {
		height: 100vh;
		background-color: #f3f4f4;
	}

	.addressbottom {

		width: 94%;
		margin-top: 5vh;
	}

	.gotopay {
		background-color: #fff;
		bottom: 0;
		width: 100vw;
		height: 5.5vh;
		position: fixed;
		display: flex;
		align-items: center;

		.gotopaybody {
			display: flex;
			justify-content: flex-end;
			width: 96%;

			view {
				display: flex;
				align-items: center;
			}
		}
	}

	.ordercount {
		display: flex;
		justify-content: flex-end;
		margin: 20px 0 0 0;
		padding-bottom: 10px;
		font-size: 12px;

		.minicount {
			display: flex;
			margin: 0 15px 0;
		}
	}

	.leftlist {
		width: 30%;
	}

	.rightlist {
		width: 58%;

		display: flex;
		justify-content: flex-end;
	}

	.orderdata {
		margin-top: 20px;
		font-size: 14px;

		.orderdis {
			margin: 10px 0 10px 0;
			justify-content: space-around;
			display: flex;
		}

		.orderdatabody {

			margin: auto;
			border-radius: 10px;
			background-color: #fff;
			width: 94%;
		}

		.orderdatabodylist1 {
			padding-top: 20px;
			display: flex;
			width: 94%;
			margin: auto;
			justify-content: space-between;
			align-items: center;

			.orderpricebody {
				width: 90%;

				.ordernum {
					margin: 3vw 0 0 3vw;
					display: flex;
					justify-content: flex-end;
					width: 91%;
				}

				.orderprice {
					display: flex;
					width: 93%;
					justify-content: space-between;
					margin: auto;
				}
			}

			.orderdatabodyimg {
				width: 15vw;
				height: 15vw;
			}
		}

	}

	.addresslistbody {
		margin-top: 5px;

		.addresslist {
			border-radius: 10px;
			background-color: #fff;
			width: 94%;
			margin: auto;
			height: 86px;
			display: flex;
			// flex-direction: column;
			justify-content: space-evenly;

			.addressbody {
				width: 80%;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
			}

			view {
				font-size: 14px;
			}
		}
	}

	.addressintro {
		display: flex;
		justify-content: space-between;
		width: 50%;
	}

	.userremarks {
		border-radius: 10px;
		background-color: #fff;
		width: 94%;
		margin: auto;
		height: 70px;
		display: flex;
		margin-top: 20px;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		view {
			width: 95%;
		}

		samp {
			width: 95%;
			font-size: 14px;
		}
	}
</style>
