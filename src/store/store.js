import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutation';
import actions from './action';

Vue.use(Vuex);

const state = {
	//	fucken
	token: "",
	//	文章类型列表
	articleTypeList : [],
	//	导航栏是否固定
	navFixed : false,
	//	导航栏是否显示
	navShow : true
}

export default new Vuex.Store({
	state,
	actions,
	mutations
});
