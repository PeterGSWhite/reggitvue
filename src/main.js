import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
//import IdleVue from 'idle-vue'
import jwt_decode from 'jwt-decode'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

import store from './store'
import router from './routes.js'

// Vee Validate setup
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Logs user out after certain amount of time idle
//const eventsHub = new Vue()
// Vue.use(IdleVue, {
//   eventEmitter: eventsHub,
//   startAtIdle: true,
//   idleTime: 300000
// })


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Reggit';
  // Inspect token before each navigation
  if(store.state.accessToken) {
    const accesExp = jwt_decode(store.state.accessToken).exp;
    const refreshExp = jwt_decode(store.state.refreshToken).exp;
    if(refreshExp - (Date.now()/1000) <= 30) {
      // Log user out if refresh token expired or near expiry
      store.dispatch('userLogout')
        .then(() => {
        this.$router.push({ name: 'login' })
      })
    }
    else if(accesExp - (Date.now()/1000) < 30) {
      console.log('sooorpriseeee')
      // Refresh token if access token expired or near expiry
      store.dispatch('refreshToken')
    }
  }

  // Redirect to login page when unauthed user attempts to access protected resource
  if (to.matched.some(record => record.meta.requiresLogin)) {
    if (!store.state.accessToken) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
