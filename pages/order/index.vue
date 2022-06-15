<template>
	<view class="orderbody">
		<u-navbar :is-back="true" back-text="" title="确认订单"></u-navbar>
		<view>
			<u-tabs-swiper ref="tabs" :list="list" active-color="#ff9b19" @change="tabsChange" bar-width="80"
				inactive-color="#606266" font-size="30" :current="current" :is-scroll="false"></u-tabs-swiper>
		</view>
		<swiper class="orderswiper" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
				<scroll-view scroll-y="true" style="height: 600px;width: 100%;" @scrolltolower="onreachBottom"
				>
					<OrderListItem :orderlist="orderslist"></OrderListItem>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	import OrderListItem from '@/components/OrderList.vue'
	export default {
		data() {
			return {
				list: [{
						name: '全部'
					},
					{
						name: '已付款'
					}, {
						name: '待发货',
						count: 4
					}, {
						name: '待收货'
					}
				],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				tabs: [1,2,3,4],
				indexpage:0,
				orderslist:[],
			};
		},
		components: {
			OrderListItem
		 },
		onLoad() {
			this.getOrderslist();
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.current = index
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				this.indexpage++;
				this.getOrderslist()
			},
			async getOrderslist(){
				const result=await this.http.post("/order/allorder",{userid:1,indexpgage:this.indexpage})
				this.orderslist.push(...result.data);
				console.log(this.orderslist)
			}
		}
	};
</script>
<style>
	.orderswiper{
		height: calc(100vh - 168rpx);
	}
	page{
		background-color: #f2f2f2;
	}
</style>
