<template>
	<view>
		
		<u-notice-bar mode="horizontal" :volumn-icon="true" :autoplay="true" :close-icon="true" :list="msg"></u-notice-bar>
		<view class="swiper">
			<u-swiper :list="Image" :effect3d="true"></u-swiper>
		</view>
		<view class="content">
			<view class="block select">停车地点:<input disabled="true" @click="openSelect" type="text" v-model="select" /></view>	
			<view class="block time">到达时间:
			<input disabled v-model="result.result" @tap="dateVisible1=true" />
			</view>
			<view class="block time">充电时间:
			<input disabled v-model="select3" @click="openDuring()" type="text" />
			</view>
			<view class="block time">车位选择:
				<input disabled v-model="select4" type="text" disabled="" @click="openSelectPark"/>
			</view>
			<view class="example">
				<!--
					绘制示意图
				-->
			</view>
			
			<view class="display">
				<view class="display_title">
					
				</view>
			</view>
			
			<view class="submit"><u-button class="appointment" @click="submitgo">确认预约</u-button></view>
			<u-select @confirm="confirm" v-model="showlist" :list="list"></u-select>
			<u-select @confirm="confirm2" v-model="showlist2" :list="timelist2"></u-select>
			<u-select @confirm="confirm3" v-model="showlist3" :list="parkid"></u-select>
			<u-modal content="预约成功" v-model="gogogo" @confirm="goOrder"></u-modal>
			<w-picker
				:visible.sync="dateVisible1"
				mode="date" 
				startYear="2020" 
				endYear="2020"
				:current="true"
				fields="second"
				@confirm="onConfirm($event,'date1')"
				@cancel="onCancel"
				:disabled-after="false"
				ref="date1"
			></w-picker>
			
		</view>
	</view>
</template>

<script>
	import {config} from '../../static/js/config.js'
	import park1 from '../../static/img/park1.jpg'
	import park2 from '../../static/img/park2.jpg'
	export default {
		components: {
		            
		        },
		
		data() {
			return {
				dateVisible1:false,
				result:{
					result:""
				},
				Image:[
					{
						title:'park1',
						image:park1
					},
					{
						title:'park2',
						image:park2
					}
				],
				msg:[
					'目前只能预约当日24时前的充电任务，给您带来的不便敬请谅解',
				],
				select:'ifs充电桩',
				area_id:1,
				select2:'',
				time:'',
				select3:'',
				duringtime:'',
				select4:'',
				parkid:'',
				list:[],
				list2:[],
				showlist:false,
				timestamp:0,
				timelist2:[{
					label:'30分钟',value:1
				},
				{
					label:'60分钟',value:2
				},
				{
					label:'90分钟',value:3
				},
				{
					label:'120分钟',value:4
				}],
				parkid:[{
					label:'1号车位',value:1
				},
				{
					label:'2号车位',value:2
				},
				{
					label:'3号车位',value:3
				},
				{
					label:'4号车位',value:4
				}],
				showlist2:false,
				showlist3:false,
				time:'',
				time2:'',
				datestring:'',
				type:'datetime',
				index:0,
				gogogo:false,
				result1:1,
				result2:1,
				result3:1,
				result4:1
			}
		},
        computed: {
            indicatorStyle() {
                return {
                    background: 'rgba(190,226,250,0.5)',
                    height: '40px',
                };
            }
        },
		methods: {
			onConfirm(time,type){
				uni.showLoading({
					title:'正在查询是否可预约'
				})
				let timestamp = new Date(time.result).getTime()/1000
				if(timestamp<new Date().getTime()/1000){
					uni.showModal({
						content:'预约时间不能早于当前时间'
					})
					uni.hideLoading()
				}else{
					//对数据库进行查询，如果预约时间戳或结束时间在这之间则不能进行预约
					let flag = 1;
					uni.request({
						url:'https://lsbserver.dadiqq.cn/order',
						method:'GET',
						success: (res) => {
							let temp = res.data
							temp.forEach((val)=>{
								if(timestamp>=val.time_start-1800 && timestamp <=val.time_end ){
									flag = 0;
								}
							})
							uni.hideLoading()
							if(flag){
								this.result = time;
								this.timestamp = timestamp
							}else{
								uni.showModal({
									title:'无法预约',
									content:'当前时间段内已有其它车辆预约，请重新选择'
								})
							}
						},
						
					})
				}
			},
			onCancel(){
				
			},
			selectTimeEvent:function(){
				//选择时间事件
				
			},
			goOrder:function(){
				//去看订单
				uni.reLaunch({
					url:'../tabbar/tabbar-4/tabbar-4'
				})
			},
			openDuring:function(){
				this.showlist2 = true
			},
			openSelectPark:function(){
				this.showlist3 = true
			},
			submitgo:function(){
				if(this.timestamp!=0){
					uni.showLoading({
						title:'提交中...'
					})
					uni.request({
						url:'https://lsbserver.dadiqq.cn/order',
						method:'POST',
						data:{
							method:'start',
							user_id:'1',
							device_id:this.result3,
							area_id:this.area_id,
							start:this.timestamp,//参数不小心写错了，方便后端的谭俊伟辛苦前端的小伟王吧
							during:this.result2,
							//垃圾项目，逻辑难想的一批
							
						},
						success: (res) => {
							console.log(res.data)
							this.gogogo = true
							uni.hideLoading()
						}
					})
				}else{
					uni.showModal({
						title:'error',
						content:'请填写完数据再提交'
					})
				}
			},
			selectDatePicker:function() {
                this.type = 'hour-minute';
                this.index = 0;
                this.$refs['date-time'].show();
            },
			dateTimeChange(value) {
                this.select2 = value
				console.log(this.datestring)
            },
			confirm:function(e){
				this.select = e[0].label
				this.area_id = this.list[e[0].value].id
				console.log(this.area_id = this.list[e[0].value].id)
			},
			confirm2:function(e){
				if(this.timestamp==0){
					uni.showModal({
						title:'错误',
						content:'你需要先选择到达时间'
					})
					return
				}
				uni.showLoading({
					title:'正在查询...'
				})
				let flag = 1;
				uni.request({
					url:'https://lsbserver.dadiqq.cn/order',
					method:'GET',
					success: (res) => {
						let temp = res.data
						temp.forEach((val)=>{
							if(this.timestamp + (e[0].value+1) * 1800>=val.time_start && this.timestamp <=val.time_end ){
								flag = 0;
							}
						})
						uni.hideLoading()
						if(flag){
							this.select3 = e[0].label
							this.result2 = e[0].value
						}else{
							uni.showModal({
								title:'无法预约',
								content:'当前时间段内已有其它车辆预约，请重新选择'
							})
						}
					},
					
				})
			},
			confirm3:function(e){
				this.select4 = e[0].label
				this.result3 = e[0].value
			},
			openSelect:function(){
				//箭头函数会导致this失效，应该是双箭头作用域导致的，有机会研究下底层源码
				this.getList()
				//开始渲染列表
			},openSelectTime:function(){
				this.showlist2 = true
				//先写静态，因为逻辑比较难写
				//考虑转换为时间戳存入数据库
				
			},
			CheckAble:function(){
				//检测是否可用
				//如果可用生成订单。然后反馈到用户层
				//到达约定时间，超过5分钟，车没到库，取消订单。
				//1.把appoint的时间表取消掉
				//2.把payment的支付改为已取消
				//3.把订单表反馈回去
				
			},
			getList:function(){
				let lists = [];
				uni.showLoading({
					title:'加载中...'
				})
				uni.request({
					url:config.url + 'find',
					method:'GET',
					success: (res) => {
						for(let i in res.data){
							let list = {};
							list["value"] = i;
							list["label"] = res.data[i].names
							list["id"] = res.data[i].area_id
							list["nums"] = res.data[i].devices_num
							lists.push(list)
						}
						this.list = lists
						uni.hideLoading();
						this.showlist = true
						console.log(this.list)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.swiper{
	margin-top:15px;
}
.content{
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top:20px;
	background:#fafafa;
	padding:20px 0;
	border-radius: 35px;
}
.title{
	
	font-size:18px;
	line-height:32px;
	margin-top:18px;
}
.block{
	display: flex;
	justify-content: space-between;
	margin-top:15px;
	color:#333;
	align-items: center;
	line-height:32px;
	font-size:16px;
	margin-bottom: 10px;
}
.block input{
	padding:5px 10px;
	border:1px solid #ccc;
	border-radius: 15px;
	height:18px;
	margin-left:10px;
	font-size:15px;
	color:#666;
}
.appointment{
	margin-top:25px;
	color:#70f3ff;
	background:#392f41;
	border-radius: 25px;
	font-size:18px;
	box-shadow:1px -2px 3px #392f41,
	-2px 1px 4px #392f41;
}
</style>
