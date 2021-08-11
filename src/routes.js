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
            meta: {
                title: 'Reggit - View Posts'
            }
        },
        {
            path: '/posts/create',
            name: 'postCreate',
            component: PostCreate,
            meta: {
                title: 'Reggit - Create Post',
                requiresLogin: true
            }
        },
        {
            path: '/posts/:id',
            name: 'postDetail',
            component: PostDetail,
            meta: {
                title: 'Reggit - Post Detail',
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                title: 'Reggit - Login',
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                title: 'Reggit - Register',
            }
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout,
        },
    ]
})