<template>
	<view class="orderlistbody">
		<view class="orderlist" v-for="(item,index) in orderlist" :key="index">
			
			<view class="ordertype">
				<view>订单号{{item.order_id}}</view>
				<view class="texttype" v-if="item.order_state==1">
					
					交易失败
				</view>
				<view v-else-if="item.order_state==2">
					交易成功
				</view>
			</view>
			<view class="orderprbody">
				<view class="orderbodyleft">
					<view class="orderimgebody">
						<image class="itemprimge" :src="'http://localhost:3000/imgs/'+item.product_image"
							mode="widthFix"></image>
					</view>
					<view>
						<view class="orderprname">{{item.product_name}}</view>
						<view class="orderprintro">{{item.product_intro}}</view>
					</view>
				</view>
				<view class="orderbodyright">
					<view>￥{{item.product_price}}</view>
					<view>*{{item.num}}</view>
				</view>

			</view>
			<view style="width: 98%; text-align: right;">
				共计{{item.order_num||9}}件商品 合计￥{{item.pay_money}}
			</view>
			<view class="orderinputbody">
				<view class="orderinput">
					<u-tag text="删除订单" shape="circle" type="warning" mode="plain"/>
					<u-tag text="查看物流" shape="circle" type="warning" mode="plain"/>
					<u-tag text="评价" shape="circle" type="warning" mode="plain"/>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: "OrderListItem",
		props: {
			orderlist: Array
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.orderlistbody {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.ordertype {
		color: #f5b6a6;
		display: flex;
		justify-content: space-between;
		margin: 10px 0;
	}

	.orderlist {
		width: 94vw;
		padding: 10px 0;
		border-radius: 10px;
		margin: 10px 0;
		background-color: #fff;

		.ordertype,
		.orderprbody {
			width: 98%;
		}

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.orderprintro {
		margin-top: 10px;
		color: #ccc;
	}

	.orderprname {
		font-size: 16px;
		font-weight: 700;

	}
.orderinputbody{
	margin-top: 10px;
	display: flex;
	    justify-content: end;
		    width: 98%;
			.orderinput{
				    width: 70%;
				    display: flex;
				    justify-content: space-evenly;
			}
}
	.orderprbody {
		display: flex;
		justify-content: space-between;

		.orderbodyleft {
			display: flex;

			.orderimgebody {
				margin-right: 10px;

				.itemprimge {
					width: 100px;
					height: 100px;
				}
			}
		}
	}
</style>
