import Vue from 'vue'
import Router from 'vue-router'

const _import = require("./import.js");

Vue.use(Router);

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/404',
      name: 'error404',
      component: _import("error404/index")
    },
    {
      path: "/login",
      name: "login",
      component: _import("login/index")
    },
    {
      path: "/register",
      name: "register",
      component: _import("register/index")
    },
    {
      path: "/register001/index",
      name: "register001",
      component: _import("register001/index")
    },
    {
      path: "/exchange",
      name: "exchange",
      component: _import("exchange/index")
    },
    {
      path: "/forgetCode",
      name: "forgetCode",
      component: _import("forgetCode/index")
    },
    {
      path: "/success",
      name: "success",
      component: _import("success/index")
    },
  ]
})
