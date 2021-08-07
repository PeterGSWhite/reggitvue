import Vue from 'vue'
import Vuex from 'vuex'
import { getAPI } from './axios-api'
import jwt_decode from 'jwt-decode'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    userId: localStorage.getItem('userId') || null,
    APIData: '',
    voteData: '',
    pattern: '',
    testText: '',
    matches: '',
    flags: 'g',
  },
  mutations: {
    updateTokenUserId (state, { access, refresh }) {
      state.accessToken = access;
      state.refreshToken = refresh;
      state.userId = jwt_decode(access).user_id;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('userId', jwt_decode(access).user_id);
    },
    destroyToken (state) {
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    resetUserId (state) {
      state.userId = null;
      localStorage.removeItem('userId');
    },
    updatePattern(state, payload) {
      state.pattern = payload;
    },
    updateTestText(state, payload) {
      state.testText = payload;
    },
    updateFlags(state, payload) {
      state.flags = payload;
    },
  },
  getters: {
    loggedIn (state) {
      return state.accessToken != null
    },
    flags({ flags }) {
      return flags;
    },
    pattern({ pattern }) {
      return pattern;
    },
    testText({ testText }) {
      return testText;
    },
    matches({ testText, pattern, flags }) {
      return pattern ? getMatches(testText, pattern, flags) : testText;
    },
  },
  actions: {
    userLogout (context) {
      if (context.getters.loggedIn) {
          context.commit('destroyToken')
          context.commit('resetUserId')
      }
    },
    refreshToken (context) {
      return new Promise((resolve, reject) => {
        getAPI.post('/api/token/refresh/', {
          refresh: context.state.refreshToken
        })
        .then(response => {
          context.commit('updateTokenUserId', { access: response.data.access, refresh: context.state.refreshToken }) 
          resolve()
        })
        .catch(err => {
          reject(err)
        })
        })
    },
    userLogin (context, usercredentials) {
      return new Promise((resolve, reject) => {
        getAPI.post('/api/token/', {
          username: usercredentials.username,
          password: usercredentials.password
        })
          .then(response => {
            context.commit('updateTokenUserId', { access: response.data.access, refresh: response.data.refresh }) 
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    userRegister (context, usercredentials) {
      console.log(usercredentials)
      return new Promise((resolve, reject) => {
        getAPI.post('/users/', {
          username: usercredentials.username,
          email: usercredentials.email,
          password: usercredentials.password
        })
          .then(() => resolve())
          .catch(err => {
            reject(err)
          })
      })
    },
  }
})

const getMatches = (testText, pattern, flags) =>
  testText
    //.replace(/</g, '\\<')
    .replace(new RegExp(pattern, flags), '<mark>$&</mark>');

