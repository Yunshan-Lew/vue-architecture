import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
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

router.afterEach((to, from) => {
  Vue.$vux.toast.hide()
  Vue.$vux.confirm.hide()
	Vue.$vux.loading.hide()
})

export default router