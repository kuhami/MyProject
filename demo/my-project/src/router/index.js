import Vue from 'vue'
import Router from 'vue-router'
import MuseUI from 'muse-ui'
import elementUI from 'element-ui'
import 'muse-ui/dist/muse-ui.css'

import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/index.js'

import 'muse-ui/dist/theme-light.css' // 使用 carbon 主题

import Login from '@/components/Login' //登录界面
import Hellow from '@/components/Hellow'
import Content from '@/components/Content'
import Favorite from '@/components/Favorite'
import Nearby from '@/components/Nearby'

Vue.use(Router)
Vue.use(elementUI)
Vue.use(MuseUI)

export default new Router({
    routes: [
        {
            path: '',
            name: 'Hellow',
            component: Hellow
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            name: 'Content',
            component: Content
        },
        {
            path: '/Content',
            name: 'Content',
            component: Content
        },
        {
            path: '/Favorite',
            name: 'Favorite',
            component: Favorite
        },
        {
            path: '/Nearby',
            name: 'Nearby',
            component: Nearby
        }
    ]
})
