import Vue from 'vue'
import VueRouter from 'vue-router'
import Posts from './views/Posts'
import PostCreate from './views/PostCreate'
import PostDetail from './views/PostDetail'
import Register from './views/Register'
import Login from './views/Login'
import Logout from './views/Logout'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/posts'
        },
        {
            path: '/posts',
            name: 'posts',
            component: Posts,
            // meta: {
            //     requiresLogin: true
            // }
        },
        {
            path: '/posts/create',
            name: 'postCreate',
            component: PostCreate,
            meta: {
                requiresLogin: true
            }
        },
        {
            path: '/posts/:id',
            name: 'postDetail',
            component: PostDetail,
            // meta: {
            //     requiresLogin: true
            // }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout,
        },
    ]
})