export default {
	/**
	 * 记录token
	 * @param {*} state 
	 * @param {string} value 
	 */
	recodeToken(state, value) {
		state.token = value;
	},
	/**
	 * 切换菜单固定状态
	 * @param {*} state 
	 * @param {boolean} value 
	 */
	toggleMenuFixed(state, value){
		state.isMenuFixed = value;
	},
	/**
	 * 记录归档页面的查询条件
	 * @param {*} state 
	 * @param {string} value 
	 */
	recordArchiveParams(state, value) {
		state.archiveParams = value;
	},
	/**
	 * 更新文章类型列表
	 * @param {*} state 
	 * @param {array} value 
	 */
	updateAllArticleList(state, value){
		state.allArticleList = value;
	},
	/**
	 * 更新文章类型列表
	 * @param {*} state 
	 * @param {array} value 
	 */
	updateArticleTypeList(state, value){
		state.articleTypeList = value;
	},
	/**
	 * 更新标签列表
	 * @param {*} state 
	 * @param {array} value 
	 */
	updateTagList(state, value){
		state.tagList = value;
	},
	/**
	 * 更新Y轴滚动距离
	 * @param {*} state 
	 * @param {number | string} value 
	 */
	updateScrollY(state, value){
		state.scrollY = value;
	},
	/**
	 * 更新上一页Y轴滚动距离
	 * @param {*} state 
	 * @param {number | string} value 
	 */
	updateLastPageScrollY(state, value){
		state.lastPageScrollY = value;
	}
}
