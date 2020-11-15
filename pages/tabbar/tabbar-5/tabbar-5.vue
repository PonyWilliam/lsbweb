<template>
	<view class="center">
		<view class="center_top">
			<view class="mask"></view>
		</view>
		<view class="center_box_bg">
			<view class="profily">
				<view class="base">
					<view class="profily_header">

					</view>
					<text>test账号</text>
					<image src="../../../static/fumou-center-template/setting.png" mode=""></image>
				</view>
				<view class="order_status">
					<view class="status" @click="toggle(item.key)" v-for="item in status" :key="item.key">
						<image class="icon" :src="item.url" mode="aspectFill"></image>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="baiban">

			</view>
			<view class="center_menu">
				<view class="menu_item" @click="toggle2(item.key)" v-for="item in menus">
					<image :src="item.icon" mode="aspectFill"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<u-popup class="popup modal1" v-model="contents.content1" mode="center" border-radius="14">
			<view>
				<view class="title">
					预约充电桩使用说明
				</view>
				<view class="content" v-for="item in introduce">
					{{item}}
				</view>
			</view>
		</u-popup>
		<u-popup class="popup modal1" v-model="contents.content2" mode="center" border-radius="14">
			<view>
				<view class="title">
					关于我们
				</view>
				<view class="content" v-for="item in aboutus">
					{{item}}
				</view>
			</view>
			
		</u-popup>
		
	</view>
	
	
</template>

<script>
	
	export default {
		data() {
			return {
				number1:0,
				introduce:[
					'1.本系统只可搭配自研充电桩进行使用，\
					对于某些低版本的安卓或iOS系统可能出现一定bug\
					不过我们会及时修复',
					'2.您预约后请于预约时间起15分钟内到达制定充电桩，\
					否则系统有权拒绝为您提供充电服务',
					'3.鉴于本系统处于测试阶段，故采用0.01元/半小时进行计费'
				],
				aboutus:[
					'我们是来自林科大涉外的一群探索创新爱好者，我们致力于做出\
					能够为社会带来便利性的作品。\
					',
					'我们希望可以用实实在在的方便去普惠社会上每一个人，因为热爱\
					所以我们走在了一起\
					'
				],
				status: [{
						key: 1,
						name: '使用说明',
						url: '../../../static/fumou-center-template/one.png'
					},
					{
						key: 2,
						name: '附近充电',
						url: '../../../static/fumou-center-template/2.png'
					},
					{
						key: 3,
						name: '体验评分',
						url: '../../../static/fumou-center-template/3.png'
					},
					{
						key: 4,
						name: '全部订单',
						url: '../../../static/fumou-center-template/4.png'
					}
				],
				contents:{
					content1:false,
					content2:false,
					content3:false
				},
				menus: [/*{
						name: '1',
						icon: '../../../static/fumou-center-template/5.png',
						key: 1,
					},
					{
						name: '2',
						icon: '../../../static/fumou-center-template/6.png',
						key: 2,
					},
					{
						name: '3',
						icon: '../../../static/fumou-center-template/7.png',
						key: 3,
					},*/
					{
						name: '帮助中心',
						icon: '../../../static/fumou-center-template/8.png',
						key: 4,
					},
					{
						name: '意见反馈',
						icon: '../../../static/fumou-center-template/9.png',
						key: 5,
					},
					{
						name: '关于我们',
						icon: '../../../static/fumou-center-template/10.png',
						key: 6,
					}

				]
			};
		},
		methods: {
			toggle:function(e){
				console.log(e)
				switch(e){
					case 1:
						this.contents.content1 = true
						break
					case 2:
						//跳转界面
						uni.reLaunch({
							url:'../tabbar-1/tabbar-1',
						})
						this.contents.content1 = true
						break
					case 3:
						//随便写一个评分就行了
						uni.navigateTo({
							url:'../../question/question'
						})
						break
					case 4:
						uni.reLaunch({
							url:'../tabbar-4/tabbar-4'
						})
						break
				}
			},
			toggle2:function(e){
				switch(e){
					case 4:
						this.contents.content1 = true
						break
					case 5:
						uni.navigateTo({
							url:'../../question/question'
						})
						break
					case 6:
						this.contents.content2 = true
						break
				}
			}
		},
		computed: {

		},
		onLoad(){
			let temp = setInterval(()=>{
				if(this.number1<100){
					this.number1+=(100 - this.number1 + 15)/100 * 3
				}else{
					clearInterval(temp)
				}
				
			},200)
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
	.popup{
		.title{
			font-size:18px;
			line-height:36px;
			text-align: center;
			font-weight: 900;
			padding:20px 0;
		}
		.content{
			padding:5px 15px;
			font-size:14px;
			text-indent: 28px;
		}
	}
	.profily,
	.profily_header {
		border-radius: 15px;
	}

	.center {
		height: 100%;

		.center_top {
			height: 18%;
			background: url('../../../static/fumou-center-template/header.jpg') no-repeat 0% 50%;
			background-size: cover;

			// background: #E6E6E6;
			.mask {
				background: rgba(0, 0, 0, .3);
				height: 100%;
			}
		}

		&_box_bg {
			background: #F9F9F9;
			position: relative;

			.profily {
				position: absolute;
				width: 90%;
				// border:1px solid #F7F7F7;
				margin: 0 auto;
				top: -100upx;
				left: 5%;
				background: #FEFEFE;
				padding: 35upx;
				box-sizing: border-box;
				box-shadow: 0px 2px 5px #EDEDED;
			}
		}
	}

	.base {
		display: flex;
		align-items: center;
		border-bottom: 2px solid #F6F6F6;
		padding-bottom: 35upx;
		position: relative;
		.profily_header {
			height: 120upx;
			width: 120upx;
			background-image: url('../../../static/fumou-center-template/header.jpg');
			background-size: 100%;
		}

		text {
			margin-left: 20px;
			font-size: 30upx;
		}
		
		image{
			position: absolute;
			height: 40upx;
			width: 40upx;
			right: 0px;
			top:0px;
		}
	}

	.order_status {
		display: flex;
		justify-content: space-between;
		margin-top: 35upx;

		.status {
			width: 140upx;
			font-size: 24upx;
			text-align: center;
			letter-spacing: .5px;
			display: flex;
			flex-direction: column;
			.icon {
				width: 50upx;
				height: 50upx;
				margin: 0 auto;
				margin-bottom: 5px;
				
			}
		}
	}

	.baiban {
		background: #FEFEFE;
		height: 300upx;
	}

	.center_menu {
		width: 100%;
		display: inline-block;

		.menu_item {
			font-size: 28upx;
			letter-spacing: 1px;
			padding: 14px 5%;
			background: #FEFEFE;
			overflow: hidden;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: relative;
			border-bottom: 1px solid #EFEFEF;

			&:active {
				background: #F6F6F6 !important;
			}

			&::after {
				content: '';
				width: 30upx;
				height: 30upx;
				position: absolute;
				right: 5%;
				background: url('../../../static/fumou-center-template/right.png') no-repeat;
				background-size: 100%;
			}

			text:nth-of-type(1) {
				margin-left: 10px;
			}

			image {
				width: 40upx;
				height: 40upx;
			}

			&:nth-of-type(4) {
				margin-top: 10px;
			}
		}
	}
</style>
