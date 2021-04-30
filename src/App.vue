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

html,body,#app{
  height:100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
  li {
    list-style: none;
  }
</style>
