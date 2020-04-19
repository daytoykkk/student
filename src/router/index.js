import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Schedule from '../components/Schedule'
import Course from '../components/Course'
import Homework from '../components/Homework'
import Selfmsg from '../components/Selfmsg'
import Hktable from '../components/Hktable'
import Hkmsg from '../components/Hkmsg'
import Submit from '../components/Submit'
import Coursemsg from '../components/Coursemsg'
import Video from '../components/Video'
import QandA from '../components/QandA'
import Res from '../components/Res'
import Test from '../components/Test'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/sche',
    children: [
      {
        path: '/sche',
        component: Schedule
      },
      {
        path: '/course',
        component: Course
      },
      {
        path: '/homework',
        component: Homework,
        redirect: '/hktable',
        children: [
          {
            path: '/hktable',
            component: Hktable
          }
        ]
      },
      {
        path: '/selfmsg',
        component: Selfmsg
      }
    ]
  },
  {
    path: '/hkmsg',
    component: Hkmsg
  },
  {
    path: '/submit',
    component: Submit
  },
  {
    path: '/coursemsg',
    component: Coursemsg,
    redirect:'res',
    children:[
      {
        path: '/res',
        component: Res
      },
      {
        path: '/qanda',
        component: QandA
      },
      {
        path: '/test',
        component: Test
      }
    ]
  },
  {
    path: '/video',
    component: Video
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
