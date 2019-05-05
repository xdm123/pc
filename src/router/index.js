import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let squareRouter = (res) => {require(['../components/square/square.vue'],res)}
let hotRouter = (res) => {require(['../components/hot/hot.vue'],res)}
let starRouter = (res) => {require(['../components/star/star.vue'],res)}
let mineRouter = (res) => {require(['../components/mine/mine.vue'],res)}
let loginRouter = (res) => {require(['../components/login/login.vue'],res)}
import store from '../store'
export default new Router({
  routes: [
    {
      path:'/square',
      component:squareRouter,
      name:'square'
    },
    {
      path:'*',
      redirect:'/square',
      component:squareRouter
    },
    {
      path:'/hot',
      component:hotRouter,
      name:'hot'
    },
    {
      path:'/star',
      component:starRouter,
      name:'star',
    },
    {
      path:'/mine',
      component:mineRouter,
      name:'mine',
      beforeEnter:function(to,from,next){
        console.log(store.getters.islogin);
        if(!store.getters.islogin){
          next({path:'/login'});
        }else{
          next();
        }
      }
    },
    {
      path:'/login',
      component:loginRouter,
      name:"login"
    }
  ]
})
