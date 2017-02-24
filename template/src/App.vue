<template>
  <div id='app'>
    <!-- navigation -->
    <Navigation />
    <!-- router view (content) -->
    <div v-if='isAuthenticated && authUser'>
      <router-view></router-view>
    </div>
    <div v-else-if='isCheckingAuth'>
      Loading...
    </div>
    <div v-else>
      <h3 style='text-align: center;'>Welcome! Please <el-button type='text' @click='login()'><h3>login</h3></el-button></h3>
    </div>
  </div>
</template>

<script>
import Navigation from 'components/Navigation'

export default {
  name: 'app',
  components: { Navigation }
}
</script>

<style>
body {
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 0;
}

#app {
  padding: calc(4em + 4%) 4%;
  position: relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
