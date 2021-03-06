import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotLogin from '../views/NotLogin.vue'
import TeacherMain from '../components/Teacher/TeacherMain.vue'
import TeacherCourse from '../components/Teacher/TeacherCourse.vue'
import Courseware from '../components/Teacher/Courseware.vue'
import Groupchat from '../components/Teacher/Groupchat.vue'
import AllCourse from '../components/Teacher/AllCourse.vue'
import TeacherMsg from '../components/Teacher/TeacherMsg.vue'
import HkMsgT from '../components/Teacher/HkMsgT.vue'
import NewHomeWork from '../components/Teacher/NewHomeWork.vue'
import StudentMsg from '../components/Teacher/StudentMsg.vue'
import TeacherHomework from '../components/Teacher/TeacherHomework.vue'
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
    component: NotLogin
  },
  {
    path: '/home',
    component: Home,
    redirect: '/homework',
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
    redirect:'/test',
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
  },
  {
    path: '/teacher',
    component: TeacherMain,
    redirect: '/allcourse',
    children:[
      {
        path:'/teachermsg',
        component:TeacherMsg
      },
      {
        path:'/allcourse',
        component:AllCourse
      }
    ]
  },
  {
    path: '/teachercourse',
    component: TeacherCourse, 
    redirect: '/teacherhk',
    children:[
      {
        path: '/courseware',
        component: Courseware
      },
      {
        path: '/groupchat',
        component: Groupchat
      },
      {
        path: '/studentmsg',
        component: StudentMsg
      },
      {
        path: '/teacherhk',
        component: TeacherHomework
      }
    ]
  },
  {
    path: '/newhomework',
    component: NewHomeWork
  },
  {
    path: '/teacherhkmsg',
    component: HkMsgT
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
