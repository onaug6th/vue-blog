import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';

import appScss from "./App.scss";

//	http请求库
import httpClient from './providers/httpClient';
//	项目配置
import projectConfig from './providers/common';

//	第三方依赖——进度条
import NProgress from 'nprogress';
//	第三方依赖——进度条样式
import 'nprogress/nprogress.css';
//	第三方依赖——甜叫
import swal from "sweetalert";
//  第三方依赖——bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
//	第三方依赖——代码美化
import "./assets/dependence/prism/prism.css";
import "./assets/dependence/prism/prism.js";

//	关闭生产提示
Vue.config.productionTip = false;

//	配置进度条
NProgress.configure(
	{ 
		showSpinner: false 
	}
);

//	挂载请求库
Vue.prototype.$http = httpClient;

//	配置甜叫
swal.setDefaults({

});

//	挂载甜叫
Vue.prototype.$swal = swal;

//	监听路由改变事件
router.beforeEach((to, from, next) => {
	
	//	进度条开始
	NProgress.start();

	//	你想要去哪？
	if (to.meta.showNav){
		store.commit("toggleNavShow", true);
		store.commit("toggleNavFixed", true);
	}else{
		store.commit("toggleNavShow", false);
		store.commit("toggleNavFixed", false);
	}

	//  如果该路由设置了校验，检查token的存在。
	if (to.meta.requireAuth) {

		if (store.state.token) {
			next();
		}
		else {
			next({
				path: '/'
			});
		}
	}
	//	管理员登陆？ 等等
	else if (to.name == "adminLogin") {

		//	放你过去吧
		if (store.state.token) {
			next({
				path: '/newWorld'
			});
		} else {
			next();
		}

	}
	else {
		next();
	}

});

router.afterEach((to, from) => {
	//	回到顶部
	document.documentElement.scrollTop = 0;
	//	是时候结束了吧
	NProgress.done();
});


new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

