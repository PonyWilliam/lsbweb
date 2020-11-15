<template>
	<view>
		<textarea id="question" v-model="text" placeholder="请在这里输入你要提交的问题(最大800字符)" maxlength="800" class="question"/>
		请输入您的手机号:<input v-model="phone" type="number" placeholder="只支持中国大陆手机号" maxlength="11" class="phone"/>
		<button type="primary" class="submit" @click="postData()">提交</button>
		<u-modal v-model="showmodel" :content="success"></u-modal>
		<u-modal v-model="showmodel2" :content="error"></u-modal>
		<u-modal v-model="showit" :content="msg"></u-modal>
	</view>
</template>

<script>
	import {config} from '../../static/js/config.js'//全局变量
	export default {
		data() {
			return {
				text:'',
				phone:'',
				success:'提交成功',
				error:'提交失败',
				msg:'请输入手机号和内容',
				showit:false,
				showmodel:false,
				showmodel2:false
			};
		},
		methods:{
			postData:function(){
				//构造request请求,从现在开始，所有request请求引入全局变量，方便修改
				if(this.$data.text==''||this.$data.phone==''){
					this.showit = true
					return;
				}
				uni.request({
					method:'POST',
					url:config.url + "question",
					data:{
						'content':this.$data.text,
						'user_name':'test',
						'user_id':1,
						'phone':this.$data.phone
					},
					success: (res) => {
						if(res.data.messgae="已成功提交"){
							//提交成功
							this.showmodel = true
							this.text = ''
							this.phone = ''
							
						}else if(res.data.message){
							//提交失败
							this.showmodel2 = true
						}else{
							//未知错误
							this.showmodel2 = true
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.question{
		padding:5px;
		text-indent: 32px;
		font-size:16px;
		width:95%;
		margin-left:calc(2.5% - 2.5px);
	}
	.phone{
		margin-top:15px;
		font-size:14px;
		text-indent: 28px;
		background:#eee;
		padding:10px 0;
	}
	.submit{
		margin-top:20px;
	}
</style>
