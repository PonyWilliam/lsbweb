
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/tabbar/tabbar-1/tabbar-1","pages/tabbar/tabbar-2/tabbar-2","pages/tabbar/tabbar-3/tabbar-3","pages/tabbar/tabbar-4/tabbar-4","pages/tabbar/tabbar-5/tabbar-5","pages/charge/charge/charge","pages/question/question","pages/details/details"],"window":{"navigationBarTextStyle":"black","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","navigationBarTitleText":"基于北斗精准定位的可预约智能无人充电桩系统"},"tabBar":{"borderStyle":"black","backgroundColor":"#333","color":"#8F8F94","selectedColor":"#fff","list":[{"pagePath":"pages/tabbar/tabbar-1/tabbar-1","iconPath":"static/img/tabbar/home.png","selectedIconPath":"static/img/tabbar/homeactive.png","text":"首页"},{"pagePath":"pages/tabbar/tabbar-2/tabbar-2","iconPath":"static/img/tabbar/guanzhu.png","selectedIconPath":"static/img/tabbar/guanzhuactive.png","text":"资讯"},{"pagePath":"pages/tabbar/tabbar-3/tabbar-3","iconPath":"static/img/tabbar/add.png","selectedIconPath":"static/img/tabbar/addactive.png"},{"pagePath":"pages/tabbar/tabbar-4/tabbar-4","iconPath":"static/img/tabbar/news.png","selectedIconPath":"static/img/tabbar/newsactive.png","text":"订单"},{"pagePath":"pages/tabbar/tabbar-5/tabbar-5","iconPath":"static/img/tabbar/me.png","selectedIconPath":"static/img/tabbar/meactive.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"惠充电智能充电桩","compilerVersion":"2.9.3","entryPagePath":"pages/tabbar/tabbar-1/tabbar-1","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/tabbar/tabbar-1/tabbar-1","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/tabbar/tabbar-2/tabbar-2","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/tabbar/tabbar-3/tabbar-3","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/tabbar/tabbar-4/tabbar-4","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/tabbar/tabbar-5/tabbar-5","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/charge/charge/charge","meta":{},"window":{}},{"path":"/pages/question/question","meta":{},"window":{}},{"path":"/pages/details/details","meta":{},"window":{"navigationBarTitleText":"预约充电"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
