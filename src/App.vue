<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
 
  }
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
}
html,body{
  width: 100%;
  height: 100%;
}
#app{
  height:100%;
  width:100%;
}
  li {
    list-style: none;
  }
</style>
