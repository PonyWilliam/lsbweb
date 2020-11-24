<template>
	<view class="all">
		<map name="lbsmap" :hidden="mapIshidden"
		class="map"
		:style="{height:mapHeight + 'px'}"
		:scale="11"
		:enable-3D="true"
		:show-location="true"
		:latitude="maps.latitude"
		:longitude="maps.longitude"
		:enable-traffic="true"
		:show-compass="true"
		:markers="markers"
		
		/>
		<view class="map" @tap="showmap"></view>
		
		<u-no-network></u-no-network>
		
		<u-modal v-model="show" :content="buttonContent"
		:show-cancel-button="true"
		@cancel="showmap"
		@confirm="goNav" />
		
		<!--<cover-view class="beidou">
			<cover-image :src="beidou" :hidden="mapIshidden" />
		</cover-view>-->
		
		<touch-slide
		:titleHeight="20"
		:showBox="false"
		:top="mapHeight - 520"
		:bottom="mapHeight - 160"
		style="z-index: 2;"
		class="touchview"
		>
		<text slot="title" style="background-color: #fff;
							border-top-left-radius: 6px;
							border-top-right-radius: 4px;
							margin-left:4px;
							text-shadow: 1px 2px 1px rgb(223,12,18);
							
							color: #ef1812;">附近的充电桩</text>
				<view class="content">
					<button class="button findnearly" @click="findnearly()">一键导航</button>
					<u-card :border="false" title="附近的充电桩">
						<view class="" slot="body">
							<view @click="goApoint" class="u-body-item u-flex u-row-between u-p-b-0" v-for="item in card" >
								<view class="u-body-item-title u-line-2">{{item.names}} ---- {{item.content}}km</view>
								<image :src="item.conver" mode="aspectFill"></image>
							</view>
						</view>
						<view class="" slot="foot">没有更多了哦</view>
					</u-card>
				</view>
		</touch-slide>
			
		<!--
			写一个列表，直接遍历服务端找到附近的充电桩
			数据要求：
			1.id 保存唯一ID标识
			2.name 保存充电桩所在位置大致名字
			3.devices 通过查询这个id得知，一共有多少个充电桩此区域
			4.对devices 要求 有device_id,充电开始时间,充电结束时间,计费标准（进行个性化计费，可通过后端管理）
			5.longitude、latitude 保存经纬度
		-->
</view>
</template>

<script>
	import Map from '@/js_sdk/fx-openMap/openMap.js'
	import touchSlide from '@/components/touch-slide/touch-slide.vue'
	import {calc} from '../../../static/js/Distance.js'
	import {config} from '../../../static/js/config.js'
	import car from '../../../static/img/car.jpg'
	import beidou from '../../../static/img/beidou.png'
	
export default {
	comments:{touchSlide},
	data() {
		return {
			mapIshidden:false,
			title: '充电桩',
			show:false,
			beidou:beidou,
			car:car,
			maps:{
				longitude:112.8179,
				latitude:28.36121,
				controls:{
					id:10002,
					position:{
						
					},
					clickable:true
				}
			},
			mapHeight:650,
			buttonContent:'是否确认进入导航',
			card:[{
				names:'加载中...',
				content:'加载中...',
				conver:'http://lsb.dadiqq.cn/1.jpeg'
			},
			{
				names:'加载中...',
				content:'加载中...',
				conver:'http://lsb.dadiqq.cn/1.jpeg'
			}],
			markers:[]
		};
	},
	onLoad() {
		uni.showLoading({
			title:"正在加载"
		})
		uni.getLocation({
			type:config.maptype,
			success: (res) => {
				//获取当前所在位置，并将maps内部的值更新，让地图中心点定位到这个地方
				const latitude = res.latitude
				const longitude = res.longitude
				this.maps.longitude = res.longitude
				this.maps.latitude = res.latitude
				uni.request({
					url:config.url + 'find',
					method:'GET',
					success: (res) => {
						let i = 0;
						let marker = []
						for(let x of res.data){
							this.card[i].names = x.names
							this.card[i].cover = x.cover
							let temp_lat = x.lat
							let temp_lng = x.lng
							let distance = calc.Distance(temp_lat,temp_lng,
							this.maps.latitude,this.maps.longitude)
							//调用封装的distance去计算距离
							this.card[i].content = distance
							var templocation = {}
							templocation["id"] = Number(i)
							templocation["latitude"] = Number(temp_lat)
							templocation["longitude"] = Number(temp_lng)
							templocation["title"] = x.names
							templocation["cover"] = car
							templocation["width"] = 40
							templocation["height"] = 40
							marker.push(templocation)
							i+=1
						}
						this.markers = marker
						uni.hideLoading()//全部数据加载完成，关闭loading层
					}
				})
			}
		})
	},
	mounted(){
		const _this = this;
		uni.getSystemInfo({
			success: (res) => {
				_this.mapHeight = res.windowHeight - res.statusBarHeight
				// #ifdef APP-NVUE || MP-WEIXIN
				_this.mapHeight = _this.mapHeight - 45
				// #endif
			}
		})
	},
	methods: {
		showmap:function(){
			this.mapIshidden = false
		},
		findnearly:function(){
			this.mapIshidden = true
			this.show = true
			
		},
		goNav:function(){
			//进入导航
			//把地图继续调用成可见
			this.mapIshidden = false;
			console.log(this.markers)
			var options = {
				destination:{
					latitude:Number(this.markers[0].latitude),
					longitude:Number(this.markers[0].longitude)
				}
			}
			Map.openMap(options,config.maptype)
			//打开预约界面
			/*uni.navigateTo({
				url:'../../details/details'
			})*/
			this.goApoint()
			
		},
		goApoint:function(){
			uni.navigateTo({
				url:'../../details/details',
				
			})
		}
	}
};
</script>

<style scoped lang="scss">
.beidou{
	position:fixed;
	top:60px;
	left:20px;
	height:60px;
	width:60px;
	z-index: 9999;
	border-radius:30px;
	image{
		height:60px;
		width:60px;
		border-radius: 30px;
	}
}
.map{
	width:100%;
	z-index: 2;
}
.content {
	text-align: center;
	margin-top: 5px;
	margin-bottom: 30px;
	background:#fafafa;
	min-height: 100%;
	padding-bottom:30px;
}
.touchview{
	border-radius: 30px;
}
.content .findnearly{
	margin-top:10px;
	width:calc(50% + 60px);
	margin-left:calc(25% - 30px);
	border:0px;
	border-radius: 15px;
	display: block;
	padding:5px 10px;
	justify-content: center;
	background:$u-type-primary-light;
	color:$u-main-color;
	border-radius: 15px;
	opacity: 0.89;
	
}
	.u-card-wrap { 
		background-color: $u-bg-color;
		padding: 1px;
	}
	
	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}
		
	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
	.list{
		margin-top:25px;
		
	}
</style>
