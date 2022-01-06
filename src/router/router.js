import Vue from 'vue'
import Router from 'vue-router'
const indexView = ()=> import("@/views/index/index")
const student = ()=> import("@/views/allStudent/student")
const analysis = ()=> import("@/views/analysis/data-analysis")
const _class = ()=> import("@/views/_class/_classManagement")
const Coursera = ()=> import("@/views/coursera/Coursera")
const login = ()=> import("@/views/User/login")
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:"/",
      redirect:"/index/student"
    },
    {
      path:"/index",
      redirect:"/index/student"
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path:"/index",
      name:"index",
      component:indexView,
      children:[
        {
          path:"student",
          name:"student",
          component:student
        },
        {
          path:"analysis",
          name:"analysis",
          component:analysis
        },
        {
          path: "_class",
          name: "_class",
          component: _class
        },
        {
          path: "coursera",
          name: "Coursera",
          component: Coursera
        },
        {
          path: "score",
          name: "score",
          component: () => import("@/views/score/scorecomp")
        }
      ]
    }
  ]
})
