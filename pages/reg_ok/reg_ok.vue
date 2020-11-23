<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view class="YmContent">
			<view class="main">
				<view class="tip">
					<image v-on:click="icon_19_click()"  src="/static/reg_ok/images/reg_ok_icon_19.jpg" mode="scaleToFill" border="0"    class="icon"></image>
					<text decode="true" class="reg_ok_20">预约成功</text>
					<text decode="true" class="reg_ok_21">请您到达后在订单页面点击我已到达</text>
				</view>
				<button v-on:click="goOrder()" class="btOk">跳转到订单页
				</button>
			</view>
		

		<view class="loading">加载中</view>
		<view class="ymBbottom"></view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			
		}
	},
	methods:{
		goOrder:function(){
			uni.reLaunch({
				url:"/pages/tabbar/tabbar-4/tabbar-4"
			})
		}
	}
}
</script>

<style lang="scss" scoped>
   @import './reg_ok.scss'
</style>