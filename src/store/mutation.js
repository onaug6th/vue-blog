export default {
	
	recodeToken(state, value) {
		state.token = value;
	},
	toggleMenuFixed(state, value){
		state.isMenuFixed = value;
	},
	updateArticleTypeList(state, value){
		state.articleTypeList = value;
	}
}
