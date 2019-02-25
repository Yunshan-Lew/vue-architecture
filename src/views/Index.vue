<template>
  <div class="font-15">
		{{ msg }}
		<p v-for="(value, key) in loginInfo" v-if="key !== 'perm'" :key="key">
			{{ `${ key }: ${value}` }}
		</p>
		<ft-cells  style="margin-bottom: .4rem;">
			<ft-field label="手机号码" placeholder="请输入手机号码" class="field-cell" v-model="phone"></ft-field>
		</ft-cells>
		<router-link to="/helloworld">Hello World</router-link>
  </div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import { Cells, Field } from '@/components'
	import md5 from 'md5'

	export default {
		name: 'Index',
		data () {
			return {
				msg: 'First page',
				phone: '110'
			}
		},
		methods: {
			...mapActions([
				'fetchCommon'
			])
		},
		computed: {
			...mapState({
        loginInfo (state) {
          return state.common['loginInfo']
        }
      })
		},
		created () {
			let phone = '13688342807'
			let password = 'lzp123456'
			
			this.fetchCommon({
				url: '/admin/login/',
				sign: 'loginInfo',
				data: { 
					phone, 
					password, 
					"token": md5("XJL_CRM_API"),
					"authType": "pub" 
				},
				onSuccess: (res) => {
					console.log(res)
				},
				onFail: (error) => {
					console.log(error)
				},
				router: this.$router
			})
		},
		components: {
      [Field.name]: Field,
      [Cells.name]: Cells
    }
	}
</script>

<style scoped>
	h1,h2{font-weight:400;}
	ul{list-style-type:none;padding:0;}
	li{display:inline-block;margin:0 10px;}
	a{color:#42b983;}
</style>
