<template>
	<view class="iconbody">
		<view @click="iconclick">
			<image class="homeiconitem" src="http://localhost:3000/icons/honbao.png" mode="scaleToFill">

			</image>
			<view class="">
				有优惠
			</view>
		</view>
		<view @click="iconclick">
			<image class="homeiconitem" src="http://localhost:3000/icons/jine.png" mode="scaleToFill">

			</image>
			<view class="">
				有礼品
			</view>
		</view>
		<view @click="iconclick">
			<image class="homeiconitem" src="http://localhost:3000/icons/paihang.png" mode="scaleToFill">

			</image>
			<view class="">
				有排行
			</view>
		</view>
		<view @click="iconclick">
			<image class="homeiconitem" src="http://localhost:3000/icons/renzheng.png" mode="scaleToFill">
			</image>
			<view class="">
				有认证
			</view>
		</view>
		<view @click="iconclick">
			<image class="homeiconitem" src="http://localhost:3000/icons/youhui.png" mode="scaleToFill">

			</image>
			<view class="">
				有优惠
			</view>
		</view>
		<u-top-tips ref="uTips"></u-top-tips> 
	</view>
	
</template>

<script>
	export default {
		name: "newsicon",
		data() {
			return {

			};
		},
		methods:{
			iconclick(){
				this.$refs.uTips.show({
					title:"莫贪小便宜，不然必被骗",
					type: 'success ',
					duration: '1000'
				})
			}
		}
	}
</script>

<style lang="scss">
	.iconbody {
		display: flex;
		justify-content: space-around;
		margin: 15px 0 15px 0;
		view{
			text-align: center;
		}
	}

	.homeiconitem {
		width: 50px;
		height: 50px;
	}
</style>
