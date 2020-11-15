<!-- lss 自定义组件 -->
<template>
	<!-- #ifndef APP-NVUE -->
	<view ref="clear-pop-content">
		<view v-if="showBox"
			 class="shadow-box" 
			 :style="{display:display, transition: transitionModel, opacity: opacity}"  />
	<!-- #endif -->
		 <view ref="clear-pop-app-content" 
				class="content-box"
			   :style="{ top: boxTop + 'px', left: left + 'px', 
						transition: transition,
						width: (winW - left * 2) + 'px'}"
			   @touchstart="touchstart"
			   @touchmove="touchmove"
			   @touchend="touchend">
			<view class="content-title" :style="{height: titleHeight + 'px', width: (winW - left * 2) + 'px',}">
				<slot name="title"></slot>
			</view>
			<!-- #ifndef APP-NVUE -->
			<scroll-view 
				ref="contentBox"
				:scroll-y="scrollY"
				:scroll-top="scrollTop"
				@scroll="scroll"
				style="height: 100%;"
				:style="{paddingTop: titleHeight + 'px'}">
				<slot />
			</scroll-view>
			<!-- #endif -->
			
			<!-- #ifdef APP-NVUE -->
			<scroller offset-accuracy="1"
					show-scrollbar="false"
					:style="{height: (winH - top) + 'px', width: (winW - left * 2) + 'px', paddingTop: titleHeight + 'px'}"
					:scrollable="scrollY" 
					@scroll="scroll">
				<slot/>
			</scroller>
			<!-- #endif -->
		
		<!-- #ifndef APP-NVUE -->
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	import Binding from 'weex-bindingx';
	const domModule = weex.requireModule('dom')
	// #endif
	
	export default {
		props: {
			top: { // 距离顶部的位置 （px）
				type: Number,
				default: 240
			},
			bottom: {  // 距离顶部的位置（px）
				type: Number,
				default: 500
			},
			left: { // 左右2测的空白距离
				type: Number,
				default: 10
			},
			titleHeight: { // 头的高度
				type: Number,
				default: 0
			},
			opacityMax: {  // 透明度 h5端使用
				type: Number,
				default: .45
			},
			duration: { // 动画时长 h5端使用
				type: Number,
				default: .3
			},
			showBox: { // 是不是需要使用蒙层 h5端使用
				type: Boolean,
				default: false
			},
		},
		
		watch:{
			bottom(val) {
				this.boxTop = this.bottom;
				this.topHeight = this.bottom - this.top 
			},
			
			top(val) {
				this.topHeight = this.bottom - this.top 
			}
		},
		
		data() {
			return {
				scrollY: false, // 是不是可以滚动
				startClientY: 0,
				startClientX: 0,
				lastClientY: 0,
				scrollTop: 0,
				
				winH: 740, // 屏幕高度
				winW: 350, // 屏幕宽度
				boxTop: 500, // 距离顶部高度定位
				// h5 s
				direction: 'toTop', // 向上或者向下
				state: 'unscroll', // 是滚动还是 执行展开/隐藏动画
				transition: '', // 动画
				transitionModel: '',
				display: 'none',
				opacity: 0,
				// h5 end
				topHeight: 200, // APP向上滑动距离
			}
		},
		
		mounted() {
			const _this = this;
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight;
					let width = res.windowWidth;
					
					// #ifdef H5
				    let clearPop = _this.$refs['clear-pop-content'].$el;
				    clearPop.ontouchmove = function(e){
				        e.preventDefault();
				    }
					// #endif
					
					_this.winH = height
					_this.winW = width
					_this.boxTop = _this.bottom;
					_this.topHeight = _this.bottom - _this.top 
				}	
			})
		},
		methods: {
			scroll(e) {
				// #ifndef APP-NVUE
				this.scrollTop =  e.detail.scrollTop;
				this.state = this.scrollTop == 0 ? "unscroll" : "scroll";
				// #endif
				
				// #ifdef APP-NVUE
				this.scrollTop =  e.contentOffset.y
				// #endif
			},
			touchstart(e) {
				// #ifndef APP-NVUE
				e.preventDefault();
				this.startClientY = e.touches[0].clientY;
				this.lastClientY = this.startClientY;
				this.setDom('start');
				// #endif
				
				// #ifdef APP-NVUE
				this.startClientX = e.changedTouches[0].pageX;
				this.startClientY = e.changedTouches[0].pageY;
				// #endif
			},
			touchmove(e) {
				// #ifndef APP-NVUE
				const clientY = e.touches[0].clientY;
				const touchDistance = clientY - this.startClientY
				
				this.direction = touchDistance > 0 ? "toBottom" : "toTop";
				this.scrollTop = this.scrollTop < 100 && touchDistance > 10 ? 0 : this.scrollTop
				this.state = this.scrollTop == 0 ? "unscroll" : "scroll";
				
				/*两种情况执行方法：
				1. 当前元素不在顶部
				2. 运动方向向下&&contBox元素的滚动值为0&&当前状态不是滚动*/
				if(this.boxTop != this.top || (this.direction == "toBottom" && this.scrollTop == 0 && this.state != "scroll")){
					this.boxTop += clientY - this.lastClientY;
					this.boxTop = this.boxTop > this.bottom ? this.bottom : this.boxTop;
					this.boxTop = this.boxTop < this.top ? this.top : this.boxTop;
					
					this.opacity = this.opacityMax * (this.bottom - this.boxTop)/(this.bottom - this.top);
					this.setDom("move");
				}
				
				this.lastClientY=clientY;
				// #endif
			},
			touchend(e) {
				// #ifndef APP-NVUE
				if(this.state=="scroll")return
				// 触摸大于 10 往下执行
				const touchDistance = this.startClientY - this.lastClientY
				// 触摸不够再弹回去
				if (Math.abs(touchDistance) < 10) {
					this.direction = this.opacity > 0.1 ?  'toTop' : 'toBottom';
					// return
				}
				this.boxTop = this.direction == "toBottom" ?  this.bottom : this.top;
				this.opacity = this.direction=="toBottom" ? 0 : this.opacityMax;
				this.setDom("end");
				// #endif
				
				// #ifdef APP-NVUE
				var endx, endy;
				endx = e.changedTouches[0].pageX;
				endy = e.changedTouches[0].pageY;
				var direction = this.getDirection(this.startClientX, this.startClientY, endx, endy);
				this.caseDirection(direction)
				// #endif
			},
			/*
			* @param direction
			* @des toBottom/ toTop
			*/ 
			btnClick(direction) {
				// #ifndef APP-NVUE
				this.boxTop = direction == 'toBottom' ? this.bottom : this.top;
				this.direction = direction;
				this.setDom("end");
				// #endif
				// #ifdef APP-NVUE
				const num = direction == 'toBottom' ? 2 : 1
				this.caseDirection(num)
				// #endif
			},
			
			// h5 的方法 start --------------
			setDom(state) {
				var _this=this;
				switch (state){
					case "start":
						this.transition="none";
						this.transitionModel="none";
						break;
					case "move":
						break;
					case "end":
						this.transition = "top "+this.duration+"s, height "+this.duration+"s";
						this.display= this.direction == "toBottom" ? "none" : "block";
						this.opacity = this.direction =="toBottom" ? 0 : this.opacityMax;
						this.transitionModel = "opacity "+this.duration+"s";
						this.scrollY = this.direction === "toBottom" ? false : true;
						setTimeout(function(){
							_this.display = _this.direction === "toBottom" ? "none" : "block";
						},300)
						
						this.$emit('callback', this);
						break;
					default:
						break;
				}
			},
			// APP的方法 start ============
			getEl: function(el) {
				if (typeof el === 'string' || typeof el === 'number') return el;
				if (WXEnvironment) {
					return el.ref;
				} else {
					return el instanceof HTMLElement ? el : el.$el;
				}
			},
			
			// 获取角度
			getAngle(angx, angy) {
				return Math.atan2(angy, angx) * 180 / Math.PI;
			},
					
			// 根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
			getDirection(startx, starty, endx, endy) {
				var angx = endx - startx;
				var angy = endy - starty;
				var result = 0;
				//如果滑动距离太短
				if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
					return result;
				}
				var angle = this.getAngle(angx, angy);
				if (angle >= -135 && angle <= -45) {
					result = 1;
				} else if (angle > 45 && angle < 135) {
					result = 2;
				} else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
					result = 3;
				} else if (angle >= -45 && angle <= 45) {
					result = 4;
				}
				return result;
			},
			// 根据direction执行不同方法
			caseDirection(direction) {
				switch (direction) {
					// 未滑动！
					case 0:
						break;
						// 向上滑动	
					case 1:
						if (this.direction == 'toTop') {
							this.goTop();
							this.direction = 'toBottom'
							this.scrollY = true
						}
						break;
						// 向下滑动	
					case 2:
						if (this.direction == 'toBottom' && this.scrollTop == 0) {
							this.goBottom();
							this.direction = 'toTop'
							this.scrollY = false
						}
						break;
						// 向左
					case 3:
						break;
						// 向右
					case 4:
						break;
					default:
				}
			},
			// 上滑操作
			goTop() {
				let box = this.getEl(this.$refs['clear-pop-app-content']);
				let topHeight = this.topHeight;

				Binding.bind({
					eventType: 'timing',
					exitExpression: {
						origin: 't>800'
					},
					props: [{
						element: box,
						property: 'transform.translateY',
						expression: {
							origin: "easeOutQuint(t, 0, - " + topHeight + ", 800)"
						}
					}]
				});
				const _this = this;
				_this.direction = 'toTop'
				_this.$emit('callback', _this);
			},
					
			// 下滑操作
			goBottom() {
				let box = this.getEl(this.$refs['clear-pop-app-content']);
				let topHeight = this.topHeight
				
				Binding.bind({
					eventType: 'timing',
					exitExpression: {
						origin: 't>800'
					},
					props: [{
						element: box,
						property: 'transform.translateY',
						expression: {
							origin: "easeOutQuint(t, - " + topHeight + ", " + topHeight + ", 800)"
						}
					}, ]
				});
				const _this = this;
				_this.direction = 'toBottom'
				_this.$emit('callback', _this);
			}
		}
	}
</script>

<style>
/* #ifndef APP-NVUE */
.shadow-box{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	background-color: black;
	opacity: 0;
	display: none;
}
/* #endif */
.content-box{
	/* #ifndef APP-NVUE */
	width: 100%;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 2;
	box-sizing: border-box;
	/* #endif */
	position: fixed;
	background-color: #FFFFFF;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	overflow: hidden;
}
.content-title {
	position: absolute;
	width: 100%;
	left: 0;
	top: 0;
}
</style>
