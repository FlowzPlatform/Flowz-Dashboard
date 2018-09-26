<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'

import VueSession from 'vue-session'

Vue.use(VueSession)
export default {
	name: 'app',
	created () {
		// if(this.$session.get('auth_token')){
		//   this.$router.push('/');
		// }

		if (this.$cookie.get('auth_token')) {
			// this.$router.push('/');
		}
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;

}
</style>
