<template>
	<view>
		<u-navbar :is-back="true" back-text="" title="购物车"></u-navbar>
		<view v-if="userid">
			<view v-if="cartlist.length>0">
				<u-checkbox-group @change="checkboxGroupChange">

					<view class="listbody" v-for="(item,index) in cartlist" :key="item.product_id">
						<view class="cartproductlist">
							<view>
								{{item.ischoose}}
								<u-checkbox color="#fc3d42" v-model="item.checked"></u-checkbox>
							</view>
							<view>
								<image class="cartimg" :src="'http://localhost:3000/imgs/'+item.product_image"
									mode="widthFix">
							</view>
							<view class="cartbodyright">

								<view class="pronames">{{item.product_name}}</view>
								<view class="cartintro">{{item.product_intro}}</view>


								<view class="cartaddnumber">
									<view class="cartprice">￥{{item.product_price}}</view>
									<view style="width: 70px;">
										<u-number-box :min='1' :disable-minus="item.num<2" @change="updatenum"
											:index="index" v-model="item.num" input-width="20px" input-height="20px"
											size="20px">
										</u-number-box>
									</view>
								</view>
							</view>
						</view>
					</view>

				</u-checkbox-group>
			</view>
			<view v-else class="emptybody">
				<image class="emptyimg" :src="'http://localhost:3000/imgs/emptycart.png'" mode="widthFix">
					<view class="">
						购物车空空如也
					</view>
					<u-button class="custom-style" size="default">去添加</u-button>
			</view>
			<view>

			</view>
		</view>
		<view class="emptybody" v-else>
			<image class="emptyimg" :class="this.userid!=null?'none':''"
				:src="'http://localhost:3000/imgs/emptyuser.png'" mode="widthFix">
				<view class="">
					还没登录呢
				</view>
				<u-button class="custom-style" @click="tologin()" size="default">去登录</u-button>
		</view>
		<view v-if="userid" class="cartbottombody">
			<view class="cartbottom">
				<view>
					<view>
						<u-checkbox v-model="allchoose" @change="checkedAll" size="14px"></u-checkbox>
					</view>

				</view>
				<view class="cartbuttom">
					<view style="display: flex;" class="pircestotal">
						合计:<view class="pircestotal" style="color: red;size: 10px;margin-right: 5px;">￥{{allpirce}}
						</view>
					</view>
					<view>
						<u-button @click="paymoney" type="error" size="mini" style="height: 30px; width: 80px;"
							shape="circle">结算
						</u-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import userislogin from "../../uitls/userlogin.js"
	export default {
		data() {
			return {
				cartlist: [],
				userid: null,
				allpirce: 0,
				allchoose: false,
				options: ['删除'],
				cartid:[],
			}
		},
		onLoad() {


		},
		onShow() {
			console.log(userislogin.islogin())
			if (userislogin.islogin() == "yes") {
				this.userid = this.store.state.user_id;
				this.loadcartlist()
			}
			console.log(this.cartlist)
		},
		onHide(){
			this.cartid=[]
		},
		methods: {
			async paymoney() {
				this.cartlist.map(item=>{
					if(item.checked==true){
						this.cartid.push(item.id)
					}
				})
				const result=await this.http.post('/order/cartorder',{cartid:this.cartid,userid:this.userid})
			},
			async updatenum(val) {
				console.log(this.userid)
				const result = await this.http.post('/usercart/updatecartnum', {
					userid: this.userid,
					productid: this.cartlist[val.index].product_id,
					num: val.value
				})
			},
			checkboxGroupChange() {
				this.allchoose = this.cartlist.every(item => {
					return item.checked
				})
				this.price();
			},

			aa() {
				console.log(this.cartlist)
			},
			async loadcartlist() {

				const result = await this.http.post('/usercart/selectcart', {
					userid: this.userid
				})
				console.log(result)
				this.cartlist = result.data
				this.cartlist.forEach(item => {
					item.checked = false
				})


			},
			async tologin() {
				uni.navigateTo({
					url: "../login/index"
				})
			},
			checkedAll(val) {
				console.log(val.value)
				this.cartlist.map(val => {
					val.checked = !this.allchoose;
				})
				this.price();
			},
			price() {
				let price = 0;
				this.cartlist.map(val => {
					if (val.checked) {
						price += val.product_price * val.num
					}
				})
				this.allpirce = price

			}
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.listbody {
		width: 100vw;
		background-color: #fff;
		//border-bottom: 1px solid #ccc;
		margin-bottom: 6px;
		box-shadow:
		  2.8px 2.4px 2.2px rgba(0, 0, 0, 0.02),
		  6.7px 5.7px 5.3px rgba(0, 0, 0, 0.028),
		  12.5px 10.8px 10px rgba(0, 0, 0, 0.035),
		  22.3px 19.2px 17.9px rgba(0, 0, 0, 0.042),
		  41.8px 35.9px 33.4px rgba(0, 0, 0, 0.05),
		  100px 86px 80px rgba(0, 0, 0, 0.07)
		;
	}

	.cartbuttom {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.cartbottombody {
		position: fixed;
		bottom: 7%;
		width: 100%;
		background: #F3F4F6;
	}

	.cartbottom {
		margin: auto;
		height: 45px;
		display: flex;
		justify-content: space-between;
		width: 94%;
		align-items: center;
	}

	.cartprice {
		color: #fc3d42;
		font-size: 18px;
		font-weight: 700;
		font-family: courier, "courier new", monospace;
	}

	.cartbodyright {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-left: 10px;
	}

	.cartintro {
		font-size: 10px;
		color: #909399;
		margin: 5px 0;
	}

	.cartaddnumber {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.cartproductlist {
		padding: 10px 0 5px 0;
		display: flex;
		width: 94vw;
		margin: auto;
		align-items: center;
	}

	.cartimg {
		width: 80px;
		height: 80px;
	}

	.custom-style {
		background: #FF8C69;
		width: 40vw;
	}

	.emptybody {
		display: flex;
		flex-direction: column;
		height: 60vh;
		justify-content: space-around;
		align-items: center;
	}

	.emptyimg {
		width: 57vw;
	}

	.none {
		display: none;
	}

	.pircestotal {
		font-family: courier, "courier new", monospace;
		font-size: 18px;
		font-weight: bold;
		text-transform: uppercase;
		word-spacing: -4.4pt;
		line-height: 1.3;
		color: #fc3d42;
	}

	.pronames {
		font-size: 16px;
		font-weight: 700;
	}
</style>
