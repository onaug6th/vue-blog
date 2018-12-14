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
	//	菜单栏是否固定
	isMenuFixed : false
}

export default new Vuex.Store({
	state,
	actions,
	mutations
});
