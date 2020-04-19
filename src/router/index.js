import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Schedule from '../components/Schedule'
import Course from '../components/Course'
import Homework from '../components/Homework'
import SelfMsg from '../components/SelfMsg'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: Home,
    redirect:'/sche',
    children:[
      {
        path:'/sche',
        component:Schedule
      },
      {
        path:'course',
        component:Course
      },
      {
        path:'homework',
        component:Homework
      },
      {
        path:'selfmsg',
        component:SelfMsg
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
