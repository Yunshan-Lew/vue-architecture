// 测试 http://xjlpcapi.ftmore.com
// 正式 http://pcapi.51xjl.com

const config = {
	debug: true,
  serviceHost: the_host,
  defaultParam: {
		"roleType": "plat",
		"terminalType": "pc",
		"parseType": "api",
		"authType": "acl"
  },
	status: {
		success: [ '0' ],
		fail: [ '0', '001006' ],
		expires: [ '001006' ]
	}
}

export default config
