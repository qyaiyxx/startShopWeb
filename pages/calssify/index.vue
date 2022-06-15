<template>
	<view>
		<!-- //nav斑斓 -->
		<u-navbar :is-back="false" back-text="" title="随缘商店"></u-navbar>
		<!-- //nav斑斓---------- -->
		<!-- //搜索框 -->
		<view class="homesearch" @click="tosearch">
			<view class="homesearchbod">
				<u-icon name="search" size="28"></u-icon><span style="margin-left: 8px;">发现更多好物</span>
			</view>
		</view>
		<!-- //搜索框------- -->

		<!-- //scroll整体 -->
		<view class="classifybody">

			<!-- //scroll左半部分 -->
			<scroll-view class="scroll-view leftlist" scroll-y="true" :scroll-top="0">
				<view @click="clicktatbl(item,index)" class="top" v-for="(item,index) in productclass" :key="index">
					<text :class="selectid==index?'yesselect':''">{{item.category_name}}</text>
				</view>
			</scroll-view>

			<!-- //scroll半部分------------ -->

			<!-- //scroll右半部分 -->
			<view class="rightblock">
				<scroll-view class="scroll-view" scroll-y="true" :scroll-top="0">

					<view v-if="productlist.length>0">
						<u-row gutter="16">
							<u-col span="6" v-for="(item,index) in productlist" @click="gotu(item.product_id)"
								class="productlist">
								<view>
									<u-image width="100%" :src="'http://localhost:3000/imgs/'+item.product_image"
										mode="widthFix"></u-image>
								</view>
								<view class="productname">{{item.product_name}}</view>
								<view class="productintro">{{item.product_intro}}</view>
								<view class="productprice">￥{{item.product_price}}</view>
							</u-col>
						</u-row>

					</view>
					<view v-else>
						<u-empty text="啥都没有呢" mode="data"></u-empty>
					</view>


				</scroll-view>
			</view>
			<!-- //scroll右半部分 -->
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				productclass: [],
				selectid: 0,
				currentPage: 1,
				productlist: [],
				indexselectid: null
			}
		},
		async onLoad(options) {

			this.getproductclass()
			this.getAllProduct()


		},
		methods: {
			tosearch() {
				uni.navigateTo({
					url: '/pages/search/index'
				});
			},
			clicktatbl(item, index) {
				this.selectid = index;
				if (item.category_id == 0) {
					this.getAllProduct()
				} else {
					this.getclassifyProduct(item.category_id)
				}

			},
			//获取左边商品分类
			async getproductclass() {
				const result = await this.http.get('/product/getProductClass')
				this.productclass = result.category
				this.productclass.unshift({
					'category_id': 0,
					'category_name': "全部",
					'isselect': true
				})
			},
			//获取所有商品
			async getAllProduct() {
				const result = await this.http.post('/product/getAllProduct', {
					'currentPage': this.currentPage,
					'liststate': null
				})
				//console.log(result)
				this.productlist = result.data.Product
			},
			//获取分类商品
			async getclassifyProduct(classtypeid) {
				const result = await this.http.post('/product/classifyproduct', {
					'currentPage': this.currentPage,
					'classtype': classtypeid
				})
				this.productlist = result.data.Product
			},
			gotu(id) {
				console.log(id)
				uni.navigateTo({
					url: '/pages/product/index?id=' + id
				});
			},
		},


	}
</script>

<style lang="scss">
	.scroll-view {
		white-space: nowrap;
		height: 600px;
	}

	.homesearch {
		background: #f4f4f5;
		margin: 5px 0 10px 0;

		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.homesearchbod {
		justify-content: center;
		background: #fff;
		width: 90%;
		display: flex;
		align-items: center;
		height: 90%;
		color: #909399;
		font-size: 12px;
	}

	.classifybody {
		display: flex;
		width: 94%;
		margin: auto;
	}

	.leftlist {
		width: 24%;

		view {
			height: 40px;

		}
	}


	.rightblock {
		width: 76%;
	}

	.productlist {
		width: 45%;
		height: 200px;

		.productprice {
			color: red;
		}

		.productname {
			font-size: 15px;
		}

		.productintro {
			font-size: 12px;
			color: #ccc;
		}
	}

	.yesselect {
		color: red;
	}

	.noselect {
		color: #2B85E4;
	}
</style>
