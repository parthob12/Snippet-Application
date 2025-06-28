import {
    createRouter,
    createWebHistory
} from 'vue-router'

import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import Profile from '../components/Profile.vue'

const routes = [{
        path: '/',
        component: Register
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/profile/:id',
        component: Profile
    }

]


const router = createRouter({
    routes,
    history: createWebHistory()
})


export default router;