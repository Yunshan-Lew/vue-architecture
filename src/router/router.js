import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      component: function (resolve) { require(['@/views/Index'], resolve) }
    },
		{
      path: '/helloworld',
      component: function (resolve) { require(['@/views/HelloWorld'], resolve) }
    },
		{
      path: '*',
      component: function (resolve) { require(['@/views/Index'], resolve) }
    }
  ]
})
