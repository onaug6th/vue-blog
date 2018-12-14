import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';

//	项目的全局默认样式
import appScss from "./App.scss";

//	superHttp请求库
import superHttp from './providers/superHttp';

//	项目配置
import projectConfig from './providers/common';

//	第三方依赖——进度条
import NProgress from 'nprogress';
//	第三方依赖——进度条样式
import 'nprogress/nprogress.css';
//	第三方依赖——甜叫
import swal from "sweetalert";

//	关闭生产提示
Vue.config.productionTip = false;

//	配置进度条
NProgress.configure(
	{ 
		showSpinner: false 
	}
);

//	配置甜叫
swal.setDefaults({});

//	挂载请求库
Vue.prototype.$http = superHttp;

//	挂载甜叫
Vue.prototype.$swal = swal;

//	监听路由跳转前事件
router.beforeEach((to, from, next) => {
	
	//	进度条开始
	NProgress.start();

	next();
});

//	监听路由跳转后事件
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
