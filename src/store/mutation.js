export default {
	/**
	 * 记录token
	 * @param {*} state 
	 * @param {*} value 
	 */
	recodeToken(state, value) {
		state.token = value;
	},
	/**
	 * 切换固定菜单
	 * @param {*} state 
	 * @param {*} value 
	 */
	toggleMenuFixed(state, value){
		state.isMenuFixed = value;
	},
	/**
	 * 更新文章类型列表
	 * @param {*} state 
	 * @param {*} value 
	 */
	updateArticleTypeList(state, value){
		state.articleTypeList = value;
	},
	/**
	 * 更新Y轴滚动距离
	 * @param {*} state 
	 * @param {*} value 
	 */
	updateScrollY(state, value){
		state.scrollY = value;
	},
	/**
	 * 更新上一页Y轴滚动距离
	 * @param {*} state 
	 * @param {*} value 
	 */
	updateLastPageScrollY(state, value){
		state.lastPageScrollY = value;
	}
}
