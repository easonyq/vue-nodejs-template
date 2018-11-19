<template>
  <div id="app">
    <img class="app-image" src="http://boscdn.bpc.baidu.com/assets/mip/codelab/shell/mashroom.jpg">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  .app-image {
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }
}
</style>
