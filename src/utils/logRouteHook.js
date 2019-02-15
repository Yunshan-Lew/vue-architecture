import cookies from 'js-cookie'

const logRouteHook = (to, from, next) => {
	let logState =  cookies.get('logState') == 'true' ? true : false
	logState ? next() : next('/login')
}

export default logRouteHook