export default {
	recordToken({ commit, state }, value) {
		commit('recordToken', value);
	},
	toggleMenuFixed({ commit, state }, value) {
		commit('toggleMenuFixed', value);
	}
}