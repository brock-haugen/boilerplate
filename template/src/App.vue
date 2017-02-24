<template>
  <div id='app'>
    <!-- header -->
    <div class='header'>
      <router-link to='/' class='home-link'>
        <img src='./assets/logo.png'>
        <h4>{{ name }}</h4>
      </router-link>{{#if auth0}}
      <!-- user dropdown -->
      <el-dropdown v-if='isAuthenticated && authUser' trigger='click'>
        <span class='el-dropdown-link'>
          <img :src='authUser.picture'>&nbsp;
          <h4 v-text='authUser.nickname'></h4>
          <i class='el-icon-caret-bottom el-icon--right'></i>
        </span>
        <el-dropdown-menu slot='dropdown'>
          <el-dropdown-item><span @click='logout()'>Logout</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- else show login button -->
      <el-button v-else @click='login()'>Login</el-button>{{/if}}
    </div>
    <!-- router view (content) -->
    {{#unless auth0}}<router-view></router-view>
    {{/unless}}{{#if auth0}}<div v-if='isAuthenticated && authUser'>
      <router-view></router-view>
    </div>
    <div v-else-if='isCheckingAuth'>
      Loading...
    </div>
    <div v-else>
      <h3 style='text-align: center;'>Welcome! Please <el-button type='text' @click='login()'><h3>login</h3></el-button></h3>
    </div>{{/if}}
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

#app {
  margin-top: 60px;
  padding: 1em;
  position: relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header {
  background-color: white;
  border-bottom: solid 1px #ddd;
  height: 60px;
  left: 0;
  line-height: 60px;
  padding: 0 1em;
  position: fixed;
  right: 0;
  text-align: right;
  top: 0;
}
.header .home-link {
  color: inherit;
  float: left;
  text-decoration: none;
}
.header img {
  border-radius: 50%;
  height: 30px;
  width: 30px;
  vertical-align: middle;
}
.header h4 {
  display: inline-block;
  margin: 0;
}
{{#if auth0}}.header .el-dropdown-link {
  cursor: pointer;
}
{{/if}}</style>
