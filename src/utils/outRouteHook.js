import cookies from 'js-cookie'

const outRouteHook = (to, from, next) => {
	let logState = cookies.get('logState') == 'true' ? true : false
	logState ? next('/user') : next()
}

export default outRouteHook