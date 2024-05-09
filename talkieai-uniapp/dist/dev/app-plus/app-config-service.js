
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"backgroundColor":"#F8F8F8","navigationBar":{"backgroundColor":"#F8F8F8","type":"default","titleColor":"#000000"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"talkie","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":true},"compilerVersion":"3.7.4","entryPagePath":"pages/login/index","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"tabBar":{"position":"bottom","color":"#000000","selectedColor":"#5456EB","borderStyle":"white","blurEffect":"none","fontSize":"10px","iconWidth":"24px","spacing":"3px","height":"50px","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","text":"首页","selectedIconPath":"/static/home_select.png","iconPath":"/static/home.png"},{"pagePath":"pages/practice/index","text":"练习","selectedIconPath":"/static/edit_select.png","iconPath":"/static/edit.png"},{"pagePath":"pages/my/index","text":"我的","selectedIconPath":"/static/mine_select.png","iconPath":"/static/mine.png"}],"selectedIndex":0,"shown":true},"locales":{},"darkmode":false,"themeConfig":{}};
  const __uniRoutes = [{"path":"pages/login/index","meta":{"isQuit":true,"isEntry":true,"navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/index/index","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":0,"navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/index/switchRole","meta":{"navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/chat/index","meta":{"navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/chat/settings","meta":{"navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/practice/index","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":1,"navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/my/index","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":2,"navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/my/learnLanguage","meta":{"navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/contact/index","meta":{"navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/feedback/index","meta":{"navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/topic/index","meta":{"navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/topic/history","meta":{"navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/topic/phrase","meta":{"navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/topic/completion","meta":{"navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/topic/topicCreate","meta":{"navigationBar":{"style":"custom","type":"default"},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  