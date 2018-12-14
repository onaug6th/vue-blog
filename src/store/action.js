export default {

	recordToken({ commit, state }, value) {
		commit('RECORDMENULEVELONE', value);
	},
	toggleMenuFixed({ commit, state }, value) {
		commit('TOGGLEMENUFIXED', value);
	}
}