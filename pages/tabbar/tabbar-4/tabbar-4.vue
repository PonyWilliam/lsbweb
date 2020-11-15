<template>
	<view class="content">
		<u-modal
		 v-model="modalShow"
		 content="不计费阶段,点击确认即可支付"
		 :show-cancel-button="true"
		 @confirm="dopay()"
		 ></u-modal>
		 <u-modal
		  v-model="modalShow2"
		  content="是否确认到达"
		  :show-cancel-button="true"
		  @confirm="doarrive()"
		  ></u-modal>
		<u-card title="ifs充电桩" v-for="item in orders" :sub-title="'订单日期:  ' + convertTimeStamp(item.now_time * 1000)" class="card">
			<view class="body" slot="body">
				<view class="body_content">
					<view class="start_time">使用日期:{{convertTimeStamp(item.time_start * 1000)}}</view>
					<view class="during">使用时长:{{Math.ceil((item.time_end - item.time_start)/60)}}分钟</view>
					<view class="price">订单金额:{{item.price}}元</view>
				</view>
			</view>
			<view class="footer" slot="foot" v-if="item.arrive==0 && nowtime>item.time_end">
				已销毁
			</view>
			<view v-else-if="item.arrive==0" class="footer" slot="foot">
				<view class="text">未到达</view>
				<view class="button"><u-button @click="goarrive(item.id,item.time_start)" class="primary">我已到达</u-button></view>
			</view>
			<view v-else-if="item.is_payed" class="footer" slot="foot">
				已完成
			</view>
			<view v-else class="footer" style="flex-wrap: wrap;align-items: center;" slot="foot" >
				<view class="text">未支付</view>
				<view class="button"><u-button v-if="nowtime>item.time_end" @click="gopay(item.id)" class="primary">去支付</u-button></view>
				<view class="chargebar" style="width:100%; margin-top:10px">
					充电进度:
					<u-line-progress v-if="Date.parse(new Date())/1000<item.time_end" style="" :striped="true" :percent="(Math.floor(item.better + ((Date.parse(new Date())/1000 - item.arrive_time)/(item.time_end - item.time_start))*(100-item.better)*((item.time_end - item.time_start)/4800)))" :striped-active="true">
						{{Math.floor(item.better + ((Date.parse(new Date())/1000 - item.arrive_time)/(item.time_end - item.time_start))*(100-item.better)*((item.time_end - item.time_start)/4800))}}%
					</u-line-progress>
					<u-line-progress v-else style="" :striped="true" :percent="(Math.floor(item.better + ((item.time_end - item.arrive_time)/(item.time_end - item.time_start))*(100-item.better)*((item.time_end - item.time_start)/4800)))" :striped-active="true">
						{{Math.floor(item.better + ((item.time_end - item.arrive_time)/(item.time_end - item.time_start))*(100-item.better)*((item.time_end - item.time_start)/4800))}}%
					</u-line-progress>
				</view>
			</view>
		</u-card>
		<view v-if="!orders[0]" style="display: flex;align-items: center;box-align:center;"><h3 style="text-align:center;:32px;line-height:46px;">啊哦，暂时没有订单哦</h3></view>
		<!--
		<u-card :title="title" :sub-title="subTitle" class="card">
			<view class="body" slot="body">
				<view class="body_content">
					<view class="during">使用时长:{{time}}分钟</view>
					<view class="price">订单金额:{{price}}元</view>
				</view>
			</view>
			<view class="footer" slot="foot" >
				<view class="text">未支付</view>
				<view class="button" v-show="ispayed"><u-button @click="gopay()" class="primary">去支付</u-button></view>
			</view>
		</u-card>
		-->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orders:[],
				modalShow:false,
				modalShow2:false,
				id:1,
				number1:0,
				nowtime:0
			}
		},
		onLoad() {
			//请求订单
			this.getOrder()
			this.init()
		},
		methods: {
			init:function(){
				this.nowtime = Date.parse(new Date())/1000
			},
			getOrder:function(){
				uni.showLoading({
					title:'加载中'
				})
				uni.request({
					method:'GET',
					url:'https://lsbserver.dadiqq.cn/order',
					success: (res) => {
						this.orders = res.data
						uni.hideLoading()
					}
				})
			},
			gopay:function(id){
				this.id = id
				this.modalShow = true;
				
			},dopay:function(){
				//发送请求告诉服务器确认已支付
				//写出接口即可
				uni.showLoading({
					title:'加载中'
				})
				uni.request({
					url:'https://lsbserver.dadiqq.cn/change',
					method:'POST',
					data:{'id':this.id},
					success: (res) => {
						console.log(res)
						this.getOrder()
						
					}
				})
			},
			goarrive:function(id,time){
				if(Date.parse(new Date())/1000 < time){
					uni.showModal({
						title:'失败',
						content:'未到预约时间',
						showCancel:false
					})
					return
				}
				this.id = id
				this.modalShow2 = true;
			},
			doarrive:function(){
				uni.showLoading({
					title:'请求中...'
				})
				uni.request({
					url:'https://lsbserver.dadiqq.cn/arrive',
					method:'POST',
					data:{
						'id':this.id,
					},
					success:(res)=>{
						console.log(res)
						this.getOrder()
					}
				})
			},
			convertTimeStamp:function(timeStamp){
				    var date = new Date(timeStamp);
				    //console.log(date); 结果为：Tue Apr 02 2019 07:49:23 GMT+0800 (中国标准时间)
				    var seperator1 = "年";
					var seperator2 = "月";
				    var year = date.getFullYear();
				    var month = date.getMonth() + 1;
				    var strDate = date.getDate();
				    if (month >= 1 && month <= 9) {
				        month = "0" + month;
				    }
				    if (strDate >= 0 && strDate <= 9) {
				        strDate = "0" + strDate;
				    }
				    var currentdate = year + seperator1 + month + seperator2 + strDate + "日";
				    return currentdate;
			}
		}
	}
</script>

<style>
	.card{
		font-size:14px;
	}
	.card .body{
		font-size:18px;
	}
	.card .footer{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.card .footer .button{
		justify-items: right;
	}
</style>
