export default {

	recordToken({ commit, state }, value) {
		commit('RECORDMENULEVELONE', value);
	},
	toggleNavShow({ commit, state }, value) {
		commit('TOGGLENAVSHOW', value);
	}
}