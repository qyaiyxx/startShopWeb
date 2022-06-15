<template>
	<view class="shopbody">

		<view class="shoplist" v-for="item in list">

			<view class="shoptitle">
				<view>{{item.name}}</view>
			</view>
			<view class="shopblock">
				<u-row gutter="16">
						<u-col @click="gotoporduct(iaa.product_id)" class="shopblockch" span="4" v-for="iaa in item.list">
							<view class="">
								<u-image width="100%" height="100px"
									:src="'http://localhost:3000/imgs/'+iaa.product_image">
								</u-image>
							</view>
							<view class="">
								<view class="indexblockname">
									{{iaa.product_name}}
								</view>
								<view class="indexblockprice">
									￥{{iaa.product_price}}
								</view>
							</view>
						</u-col>
			
				</u-row>
			</view>
			<view @click="goclass(item.classid)" class="indexblockgetmore">
				点击查看更多

			</view>


		</view>
	</view>
</template>

<script>
	export default {
		name: "ShopBlock",
		props: {
			list: Array
		},
		data() {
			return {

			};
		},
		methods: {
			goclass(id) {
				uni.switchTab({
					url: '/pages/calssify/index?id=' + id
				})
			},
			gotoporduct(id){
				uni.navigateTo({
					url:'/pages/product/index?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.shopbody {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 94%;
		margin: auto;

	}

	.shopch {}

	.shoplist {
		width: 100%;
		padding: 10px 0 10px 0;
	}

	.shoptitle {

		margin: auto;
		height: 30px;
		background: #f3f4f6;
		display: flex;
		justify-content: center;
		align-items: center;

		view {
			font-size: 14px;
			border-bottom: 2px solid #D98266;
		}
	}

	.shopblock {
		margin-top: 5px;
	}

	.shopblockch {
		margin-top: 10px;
		//padding: 0 !important;
		//margin: 0px 4px;
	}

	.indexblockname {
		font-size: 12px;
	}

	.indexblockprice {
		font-size: 12px;
		color: red;
	}

	.indexblockgetmore {
		text-align: center;
		font-size: 13px;
		color: #606266;
		height: 40px;
		line-height: 40px;
	}
</style>
