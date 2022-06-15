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

		<!-- //轮播图 -->
		<view>
			<u-swiper :list="homeinfo.list" mode="rect" :effect3d="true"></u-swiper>
		</view>
		<!-- //轮播图---------- -->

		<!-- //公告 -->
		<view>
			<u-notice-bar class="homenotice" font-size="20px" padding="5px" mode="horizontal" :list="homeinfo.noticedata">
			</u-notice-bar>
		</view>
		<!-- //公告--------- -->

		<!-- //商品块 -->
		<view>
			<ShopBlock :list="recommendedblock"></ShopBlock>
		</view>
		<!-- //商品块------------------ -->
	</view>

</template>

<script>
	import ShopBlock from "../../components/ShopBlock.vue"
	export default {

		data() {
			return {
				homeinfo: {
					list: [],
					noticedata: []
				},
				recommendedblock: null
			}
		},
		onLoad() {
			this.getloadlist();
		},
		methods: {
			async getloadlist() {
				const result = await this.http.post('/index/getindexproduct')
				this.recommendedblock = result.data;
				const {
					data
				} = await this.http.post('/index/getshoposinfo')
				this.homeinfo.list=data.home_swiper.split(',')
				this.homeinfo.list=this.homeinfo.list.map(item=>{
					return {image:'http://localhost:3000/imgs/'+item}
				})
				console.log(data.list)
				this.homeinfo.noticedata.push(data.home_welcome)

			},
			tosearch() {
				console.log(1)
				uni.navigateTo({
					url: '/pages/search/index'
				});
			}
		},
		components: {
			ShopBlock
		}
	}
</script>

<style lang="scss" scoped>
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

	.homenotice {
		padding: 5px 0 5px 0;

		margin-bottom: 10px;

	}
</style>
