import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutation';
import actions from './action';

Vue.use(Vuex);

const state = {
	//	fucken
	token: "",
	//	全部文章
	allArticleList: [],
	//	归档页面查询条件
	archiveParams: {
		fuzzyText: "",
		articleType: "",
		tag: []
	},
	//	文章类型列表
	articleTypeList: [],
	//	标签类型列表
	tagList: [],
	//	菜单栏是否固定
	isMenuFixed: false,
	//	Y轴滚动距离
	scrollY: 0,
	//	上个页面Y轴滚动距离
	lastPageScrollY: 0
}

export default new Vuex.Store({
	state,
	actions,
	mutations
});
