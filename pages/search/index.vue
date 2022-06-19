<template>
	<view>
		<view class="searchbody">
			<u-navbar title="搜索"></u-navbar>
			<view class="searchproduct">
				<u-search :height="50" @change="searchproduct()" placeholder="嗖一下" @search="getproduct()"
					v-model="productname" :clearabled="true"></u-search>
			</view>
			<view v-if="serachlist.length>1" class="searchlist">
				<view class="searchlistview" v-for="(item,index) in serachlist">
					<view @click="gotu(item.product_id)">{{item.product_name}}</view>
				</view>
			</view>

			<view style="width: 100%;" v-else>
				<view class="tagbody">
					<view class="taglist" v-for="(item,index) in shistory">
						<u-tag :text="item.val" shape="circle" mode="light" size="mini" closeable @click="clicktag(item)"
							@close="tagClick(index)" />
					</view>
				</view>
				<u-empty style="margin-top: 45%;" text="啥都没有搜搜看吧" mode="list"></u-empty>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		setlocastroe,
		getlocastroe
	} from '@/uitls/locastore.js'
	export default {
		data() {
			return {
				productname: '',
				datasetTimeout: null,
				serachlist: [],
				shistory:[],
				res:-1
			}
		},
		onShow() {
			console.log(this.shistory)
		},
		onLoad() {
			this.getserachhistore()
		},
		methods: {
			searchproduct() {
				if (this.productname != '') {
					this.serachlist = []
					clearTimeout(this.datasetTimeout)
					console.log()
					this.datasetTimeout = setTimeout(() => {
						this.getproduct()
					}, 1500)
				} else {
					console.log(1)
				}

			},
			// tagClick(index) {
			// 	this.shistory.splice(index, 1)
			// 	localStorage.setItem("shistory", this.shistory)
			// },
			// clicktag(item) {
			// 	this.productname = item;
			// 	this.getproduct()
			// },
			gotu(id) {
				console.log(id)
				uni.navigateTo({
					url: '/pages/product/index?id=' + id
				});
			},
			async getproduct() {
				// this.setserachhistore()
				const result = await this.http.post('/product/websearchproduct', {
					productname: this.productname
				})
				this.serachlist = result.data
				console.log(result)
			},

			setserachhistore() {
				
				//  this.res=this.shistory.findIndex(item => { return item==this.productname})
				 
				// if (this.res == -1) {
				// 	this.shistory.push(this.productname)
				// 	localStorage.setItem("shistory", {val:this.shistory})
				// }
				// return 
			},
			getserachhistore() {
					// this.shistory=localStorage.getItem("shistory")
			}
		}
	}
</script>

<style lang="scss">
	.searchbody {
		display: flex;
		flex-direction: column;
		align-items: center;

		margin: auto;
	}

	.searchproduct {
		width: 94%;
		margin-top: 5px;
	}

	.searchlist {
		width: 94%;
	}

	.searchlistview {
		width: 100%;
		margin: 15px 0 10px 0;
		border-bottom: 1px solid #ccc;
	}

	.tagbody {
		display: flex;
		width: 90%;
		flex-wrap: wrap;
		margin: auto;

		.taglist {
			margin: 10px 10px 10px 0;
		}
	}
</style>
