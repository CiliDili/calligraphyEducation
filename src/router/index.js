import Vue from 'vue'
import Router from 'vue-router'
const _import = require("./import.js");

Vue.use(Router);

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/404'
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
