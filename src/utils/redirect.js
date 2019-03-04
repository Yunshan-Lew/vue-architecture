import config from '@/config'
import cookies from 'js-cookie'

function redirect(fullpath) {
  const errorNum = cookies.get('error_redirect') || 0
  if (errorNum && Number(errorNum) > 5) {
    alert('系统检测到您的自动登录或刷新过于频繁，可能出现异常状态，请联系客服')
    return false
  } else {
    cookies.set('error_redirect', Number(errorNum) + 1)
    const origin = window.location.origin
    const callbackUrl = encodeURIComponent(origin + '/#' + fullpath)
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appid}&redirect_uri=${callbackUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  }
}

export { redirect }
