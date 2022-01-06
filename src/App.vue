<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<style>
@import "assets/css/base.css";
@import "assets/css/font.css";
@import "assets/css/normalize.css";
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: Tencent, serif;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
