<template>
	<!--
	 本页面模板教程：https://ext.dcloud.net.cn/plugin?id=2584
	 uni-list 文档：https://ext.dcloud.net.cn/plugin?id=24
	 uniCloud 文档：https://uniapp.dcloud.io/uniCloud/README
	 uni-clientDB 文档：https://uniapp.dcloud.io/uniCloud/uni-clientDB
	 openDB 规范：https://gitee.com/dcloud/opendb/tree/master
	 -->
	<view>
		<!-- 刷新页面后的顶部提示框 -->
		<view class="tips" :class="{ 'tips-ani': tipShow }">为您更新了10条最新新闻动态</view>
		<!-- 基于 uni-list 的页面布局 -->
		<uni-list>
			<uni-list-item direction="column" v-for="item in lists" :key="item.id">
				<!-- 通过header插槽定义列表的标题 -->
				<template v-slot:header>
					<view class="uni-title">{{item.title}}</view>
				</template>
				<!-- 通过body插槽定义列表内容显示 -->
				<template v-slot:body>
					<view class="uni-list-box">
						<view class="uni-thumb">
							<image :src="item.avatar[0]=='h'?item.avatar:item.avatar[0]" mode="aspectFill"></image>
						</view>
						<view class="uni-content">
							<view class="uni-title-sub uni-ellipsis-2">{{item.excerpt}}</view>
							<view class="uni-note">{{ item.user_name }} {{ item.last_modify_date }}</view>
						</view>
					</view>
				</template>
				<!-- 同步footer插槽定义列表底部的显示效果 -->
				<template v-slot:footer>
					<view class="uni-footer">
						<text class="uni-footer-text">评论</text>
						<text class="uni-footer-text">点赞</text>
						<text class="uni-footer-text">分享</text>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<!-- 通过 loadMore 组件实现上拉加载效果，如需自定义显示内容，可参考：https://ext.dcloud.net.cn/plugin?id=29 -->
		<uni-load-more v-if="lists.length > 0" :status="status" />
	</view>
</template>

<script>
	// 引入 clientDB 相关文件
	import db from '@/js_sdk/uni-clientDB/index.js';
	const dbCmd = db.command;
	export default {
		data() {
			return {
				lists: [], // 列表数据
				status: 'more', // 加载状态
				tipShow: false, // 是否显示顶部提示框
				pageSize: 20, // 每页显示的数据条数
				current: 1 // 当前页数			
			};
		},
		onLoad() {
			// 初始化页面数据
			uni.showLoading({
				title:'加载中...'
			})
			this.getNewsList(true);
		},
		methods: {
			/**
			 * 下拉刷新回调函数
			 */
			onPullDownRefresh() {
				this.current = 1
				this.getNewsList(true);
			},
			/**
			 * 上拉加载回调函数
			 */
			onReachBottom() {
				this.getNewsList();
			},
			/**
			 * 获取页面数据
			 * @param {Object} reload 参数reload值为true时执行列表初始化逻辑，值为false时执行追加下一页数据的逻辑。默认为false
			 */
			getNewsList(reload) {
				this.status = 'loading'
				// 通过 clientDB 请求后台数据
				db.collection('opendb-news-articles')
					.where({
						// 查询字段是否存在
						_id: dbCmd.exists(true)
					})
					// 跳过对应数量的文档，输出剩下的文档
					.skip(this.pageSize * (this.current - 1))
					// 限制输出到下一阶段的记录数
					.limit(this.pageSize)
					// 获取集合中的记录
					.get()
					.then((res) => {
						const tempList = res.result.data
						uni.hideLoading()
						// 判断是否可翻页
						if (tempList.length === this.pageSize) {
							this.status = 'more'
						} else {
							this.status = 'noMore'
						}
			
						if (reload) {
							// 处理下拉加载提示框
							this.tipShow = true;
							clearTimeout(this.timer);
							this.timer = setTimeout(() => {
								this.tipShow = false;
							}, 2000);
							this.lists = tempList
							// 停止刷新
							uni.stopPullDownRefresh()
						} else {
							// 上拉加载后合并数据
							this.lists = this.lists.concat(tempList)
						}
						if (tempList.length) {
							this.current++
						}
					}).catch((err) => {
						uni.hideLoading()
						uni.showModal({
							content: '请求失败，请稍后再试：' + err,
							showCancel: false
						})
					})
			}
		}
	};
</script>

<style lang="scss">
	@import '@/common/uni-ui.scss';

	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	.tips {
		color: #67c23a;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		background-color: #f0f9eb;
		height: 0;
		opacity: 0;
		transform: translateY(-100%);
		transition: all 0.3s;
	}

	.tips-ani {
		transform: translateY(0);
		height: 40px;
		opacity: 1;
	}

	.content {
		width: 100%;
		display: flex;
	}

	.list-picture {
		width: 100%;
		height: 145px;
	}

	.thumb-image {
		width: 100%;
		height: 100%;
	}

	.ellipsis {
		display: flex;
		overflow: hidden;
	}

	.uni-ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.uni-ellipsis-2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
