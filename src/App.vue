<template>
  <div id="app">
    <img src="./assets/logo.png" width="128" height="128" />
		<div class="container">
			<transition name="fade">
				<router-view/>
			</transition>
		</div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
