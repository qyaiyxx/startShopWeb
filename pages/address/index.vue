<template>
	<view>
		<u-navbar :is-back="true" back-text="" title="收货地址"></u-navbar>
		<view>
			<view v-if="this.userid">
				<view class="addresslistbody" v-for="(item,index) in addresslist" :key="index">
					<view class="addresslist">
						<view class="addressintro">
							<view>
								{{item.receivername}}
							</view>
							<view>
								{{item.telephone}}
							</view>
						</view>
						<view>
							<view>
								{{item.province}}{{item.city}}{{item.district}}{{item.detial}}
							</view>
						</view>
						<view class="addoperation">
							<view>
								<u-checkbox v-model="item.ischoose" @change="setupdefault(item)"></u-checkbox>设为默认
								
							</view>
							<view class="addoperationch">
								<view>
									复制
								</view>
								<view @click="deleteadd(item.id)">
									删除
								</view>
								<view @click="setaddress(item)">
									修改
								</view>
							</view>
						</view>
					</view>
					<!-- <u-gap height="10" bg-color="#bbb"></u-gap> -->
				</view>
				<u-button  class="addressbottom"  @click="popupshow = true">新增地址</u-button>
			</view>
			<view v-else>
				<u-button class="addressbottom" @click="gotologin()">去登录</u-button>
			</view>
		</view>
		<u-popup width="85%" @close="closepopup" border-radius="10" v-model="popupshow" mode="center"
			close-icon-pos='top-right' :closeable='true'>
			<view class="addressbody">
				<u-field :focus='true' required :error-message="errmsg.name" class="additem"
					v-model="addressdata.receivername" label="收货人" placeholder="收货人性命">
				</u-field>

				<u-field maxlength="11" required :error-message="errmsg.phone" v-model="addressdata.telephone"
					class="additem" label="手机号" placeholder="请填写手机号">
				</u-field>
				<u-field v-model="showaddress" required :error-message="errmsg.adderss" class="additem" disabled
					label="地区" placeholder="点击选择" @click="pickershow=true">
				</u-field>
				<u-field v-model="addressdata.detial" :error-message="errmsg.detial" required class="additem"
					label="详细地址" placeholder="如街道,小区,乡镇,村等">
				</u-field>
				<u-button v-if="isselect==1" @click="submitaddress()" class="addresssubmit" size="medium">月落</u-button>
				<u-button v-else class="addressbottom"  @click="updateaddresssubmit">更新地址</u-button>
			</view>
		</u-popup>
		<u-picker v-model="pickershow" mode="region" @confirm="addressvalue"></u-picker>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import checkuser from '@/uitls/userlogin.js'
	export default {
		data() {
			return {
				pickershow: false,
				popupshow: false,
				aaa: null,
				addressdata: {},
				showaddress: '',
				errmsg: {
					name: ''
				},
				userid: null,
				addresslist: [],
				isselect:1,
				addressback:{}
			}
		},
		onShow() {
				
			if (checkuser.islogin()=='yes') {
				this.userid = this.store.state.user_id;
				this.userid = 1;
				this.getaddress();
			}
		},
		
		methods: {
			async getaddress() {
				const result = await this.http.post('/users/getaddress', {
					userid: this.userid
				})
				console.log(result)
				if(result.code==="200"){
					result.data.map(item=>{
						if(item.isdefault==2){
							item.ischoose=true
							return
						}
						item.ischoose=false
					})
					this.addresslist = result.data
				}else{
					this.$refs.uToast.show({
						title: 'token不合法,请重新登录',
						type: 'error',
					
					})
				}
			},
			addressvalue(value) {
				console.log(value)
				this.showaddress = value.province.label + '-' + value.city.label + '-' + value.area.label
				this.addressdata.province = value.province.label
				this.addressdata.city = value.city.label
				this.addressdata.district = value.area.label

			},
			async submitaddress() {
				const istelephone = /^1[1|2|3|4|5|6|7|8|9][0-9]\d{4,8}$/;
				if (!this.addressdata.receivername) {

					this.errmsg.name = "名字不能为空"
					return false
				}

				if (!istelephone.test(this.addressdata.telephone)) {
					this.$refs.uToast.show({
						title: '号码不对吧',
						type: 'error',

					})
					return false
				}
				this.addressdata.userid = this.userid
				const result = await this.http.post('/users/setaddress', {
					addressdata: this.addressdata
				})
				if (result.code == "200") {
					this.$refs.uToast.show({
						title: '添加成功',
						type: 'success',

					})
					this.getaddress();
					this.closepopup();
					this.popupshow = false;
				} else {
					this.$refs.uToast.show({
						title: '添加失败',
						type: 'error',

					})
				}
			},
			closepopup() {
				this.isselect=1;
				this.addressdata = {}
				this.addressback={}
				this.showaddress=''
			},
			gotologin() {
				uni.navigateTo({
					url: "../login/index"
				})
			},
			setupdefault(item){
				this.updateadd(item)
				
			},
			updateaddresssubmit(){
				this.addressback.receivername=this.addressdata.receivername;
				this.addressback.telephone=this.addressdata.telephone;
				this.addressback.detial=this.addressdata.detial;
				this.addressback.receivername=this.addressdata.receivername;
				this.addressback.province=this.addressdata.province==undefined?this.addressback.province:this.addressdata.province
				this.addressback.city=this.addressdata.city==undefined?this.addressback.city:this.addressdata.city
				this.addressback.district=this.addressdata.district==undefined?this.addressback.district:this.addressdata.district
				this.addressback.uptype=1;
				this.updateadd(this.addressback);
				
			},
			setaddress(item){
				this.addressback=item;
				this.isselect=2;
				this.addressdata.receivername=item.receivername;
				this.addressdata.telephone=item.telephone;
				this.addressdata.detial=item.detial;
				this.addressdata.receivername=item.receivername;
				this.showaddress = item.province + '-' + item.city + '-' + item.district;
				this.addressback.province=item.province
				this.addressback.city=item.city
				this.addressback.district=item.district
				this.popupshow=true;
			},
			async updateadd(item){
				const result=await this.http.post('/users/updateaddress',{item})
				if (result.code == "200") {
					this.$refs.uToast.show({
						title: '设置成功',
						type: 'success',
				
					})
					this.popupshow=false
					this.getaddress()
				} else {
					this.$refs.uToast.show({
						title: '设置失败',
						type: 'error',
				
					})
				}
			},
			async deleteadd(id){
				
				const result=await this.http.post('/users/deleteaddress',{id})
				if (result.code == "200") {
					this.$refs.uToast.show({
						title: '删除成功',
						type: 'success',
				
					})
					this.getaddress()
				} else {
					this.$refs.uToast.show({
						title: '删除失败',
						type: 'error',
				
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.addressbottom{
		width: 94%;
		margin-top: 5vh;
	}
	.addresslistbody{
		margin-top: 10px;
		.addresslist{
		box-shadow:
		  6.9px 2.5px 7.5px rgba(0, 0, 0, 0.03),
		  55px 20px 60px rgba(0, 0, 0, 0.015)
		;
			width: 94%;
			margin: auto;
			height: 86px;
			display: flex;
			    flex-direction: column;
			    justify-content: space-evenly;
			view{
				font-size: 14px;
			}
		}
	}
	.addoperation{
		display: flex;
		justify-content: space-between;
	}
	.addoperationch{
		display: flex;
		width: 30%;
		    justify-content: space-around;
			view{
				color: #82848a;
			}
	}
	.addressintro{
		display: flex;	
		justify-content: space-between;
		    width: 50%;
	}
	.addressbody {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		flex-direction: column;
		padding-top: 35px;
		height: 48vh;
	}

	.addressform {
		margin-top: 35px;
		width: 80%;
	}

	.additem {

		font-size: 14px;
	}

	.addresssubmit {
		width: 60%;
		background: #2979ff;
		color: #fff;
	}
</style>
