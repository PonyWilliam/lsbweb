(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabbar/tabbar-4/tabbar-4"],{9985:function(e,t,r){"use strict";var i=r("d4f8"),n=r.n(i);n.a},"9b60":function(e,t,r){"use strict";var i;r.d(t,"b",(function(){return n})),r.d(t,"c",(function(){return a})),r.d(t,"a",(function(){return i}));try{i={uModal:function(){return r.e("node-modules/uview-ui/components/u-modal/u-modal").then(r.bind(null,"bdbf"))},uCard:function(){return r.e("node-modules/uview-ui/components/u-card/u-card").then(r.bind(null,"233a"))},uButton:function(){return r.e("node-modules/uview-ui/components/u-button/u-button").then(r.bind(null,"7247"))},uLineProgress:function(){return r.e("node-modules/uview-ui/components/u-line-progress/u-line-progress").then(r.bind(null,"ca35"))}}}catch(o){if(-1===o.message.indexOf("Cannot find module")||-1===o.message.indexOf(".vue"))throw o;console.error(o.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var n=function(){var e=this,t=e.$createElement,r=(e._self._c,e.__map(e.orders,(function(t,r){var i=e.__get_orig(t),n=e.convertTimeStamp(1e3*t.now_time),a=e.convertTimeStamp(1e3*t.time_start),o=Math.ceil((t.time_end-t.time_start)/60),s=0==t.arrive&&e.nowtime>t.time_end||0==t.arrive||t.is_payed?null:Date.parse(new Date),d=!(0==t.arrive&&e.nowtime>t.time_end)&&0!=t.arrive&&!t.is_payed&&s/1e3>=t.time_start&&t.arrive_time<t.start_time?Math.floor(t.better+(Date.parse(new Date)/1e3-t.time_start)/(t.time_end-t.time_start)*(100-t.better)*((t.time_end-t.time_start)/4800)):null,u=!(0==t.arrive&&e.nowtime>t.time_end)&&0!=t.arrive&&!t.is_payed&&s/1e3>=t.time_start&&t.arrive_time<t.start_time?Math.floor(t.better+(Date.parse(new Date)/1e3-t.item.time_start)/(t.time_end-t.time_start)*(100-t.better)*((t.time_end-t.time_start)/4800)):null,m=0==t.arrive&&e.nowtime>t.time_end||0==t.arrive||t.is_payed||!(s/1e3>=t.time_start)||t.arrive_time<t.start_time?null:Date.parse(new Date),c=0==t.arrive&&e.nowtime>t.time_end||0==t.arrive||t.is_payed||!(s/1e3>=t.time_start)||t.arrive_time<t.start_time||!(m/1e3<t.time_end)?null:Math.floor(t.better+(Date.parse(new Date)/1e3-t.arrive_time)/(t.time_end-t.time_start)*(100-t.better)*((t.time_end-t.time_start)/4800)),l=0==t.arrive&&e.nowtime>t.time_end||0==t.arrive||t.is_payed||!(s/1e3>=t.time_start)||t.arrive_time<t.start_time||!(m/1e3<t.time_end)?null:Math.floor(t.better+(Date.parse(new Date)/1e3-t.arrive_time)/(t.time_end-t.time_start)*(100-t.better)*((t.time_end-t.time_start)/4800)),_=0==t.arrive&&e.nowtime>t.time_end||0==t.arrive||t.is_payed||!(s/1e3>=t.time_start)||t.arrive_time<t.start_time||m/1e3<t.time_end?null:Math.floor(t.better+(t.time_end-t.arrive_time)/(t.time_end-t.time_start)*(100-t.better)*((t.time_end-t.time_start)/4800)),f=0==t.arrive&&e.nowtime>t.time_end||0==t.arrive||t.is_payed||!(s/1e3>=t.time_start)||t.arrive_time<t.start_time||m/1e3<t.time_end?null:Math.floor(t.better+(t.time_end-t.arrive_time)/(t.time_end-t.time_start)*(100-t.better)*((t.time_end-t.time_start)/4800));return{$orig:i,m0:n,m1:a,g0:o,g1:s,g2:d,g3:u,g4:m,g5:c,g6:l,g7:_,g8:f}})));e.$mp.data=Object.assign({},{$root:{l0:r}})},a=[]},af97:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={data:function(){return{orders:[],modalShow:!1,modalShow2:!1,id:1,number1:0,nowtime:0}},onLoad:function(){this.getOrder(),this.init()},methods:{init:function(){this.nowtime=Date.parse(new Date)/1e3},getOrder:function(){var t=this;e.showLoading({title:"加载中"}),e.request({method:"GET",url:"https://lsbserver.dadiqq.cn/order",success:function(r){t.orders=r.data,e.hideLoading()}})},gopay:function(e){this.id=e,this.modalShow=!0},dopay:function(){var t=this;e.showLoading({title:"加载中"}),e.request({url:"https://lsbserver.dadiqq.cn/change",method:"POST",data:{id:this.id},success:function(e){console.log(e),t.getOrder()}})},goarrive:function(t,r){Date.parse(new Date)/1e3<r-14400?e.showModal({showCancel:!1,title:"失败",content:"最多提前4小时到达"}):(this.id=t,this.modalShow2=!0)},doarrive:function(){var t=this;e.showLoading({title:"请求中..."}),e.request({url:"https://lsbserver.dadiqq.cn/arrive",method:"POST",data:{id:this.id},success:function(e){console.log(e),t.getOrder()}})},convertTimeStamp:function(e){var t=new Date(e),r="年",i="月",n=t.getFullYear(),a=t.getMonth()+1,o=t.getDate();a>=1&&a<=9&&(a="0"+a),o>=0&&o<=9&&(o="0"+o);var s=n+r+a+i+o+"日";return s}}};t.default=r}).call(this,r("543d")["default"])},c518:function(e,t,r){"use strict";r.r(t);var i=r("af97"),n=r.n(i);for(var a in i)"default"!==a&&function(e){r.d(t,e,(function(){return i[e]}))}(a);t["default"]=n.a},c8f9:function(e,t,r){"use strict";(function(e){r("dbc9");i(r("66fd"));var t=i(r("d702"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,r("543d")["createPage"])},d4f8:function(e,t,r){},d702:function(e,t,r){"use strict";r.r(t);var i=r("9b60"),n=r("c518");for(var a in n)"default"!==a&&function(e){r.d(t,e,(function(){return n[e]}))}(a);r("9985");var o,s=r("f0c5"),d=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);t["default"]=d.exports}},[["c8f9","common/runtime","common/vendor"]]]);