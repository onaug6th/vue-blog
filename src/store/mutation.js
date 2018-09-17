export default {
	
	recodeToken(state, value) {
		state.token = value;
	},
	toggleNavShow(state, value){
		state.navShow = value;
	},
	toggleNavFixed(state, value){
		state.navFixed = value;
	},
	updateArticleTypeList(state, value){
		state.articleTypeList = value;
	}
}
