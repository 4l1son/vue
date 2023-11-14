import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import FormView from '../views/FormView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/menu',
    name:'menu',
    component:MenuView
  },
  {
    path:'/form',
    name:'form',
    component:FormView
  }

  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
