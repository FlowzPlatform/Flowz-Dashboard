export default {
	GOOGLE_SIGN_IN (state, object) {
		state.isGooleLogin = object
	},
	FB_SIGN_IN (state, object) {
		state.isFacebookLogin = object
	},
	SET_LOGIN_USER (state, object) {
		state.loginUser = object
	}
}
