<template>
  <div class="slidenav">
      <ul>
          <li>
             <i class="icon iconfont icondirection-left"></i>
          </li>
          <li>
              <i class="icon iconfont iconfullscreen-expand" @click="fullbox"></i>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
        fullbox(){
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen()
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen()
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        }
      }
        }
    }
}
</script>

<style lang='scss'>
.slidenav{
    position:fixed;
    right: 0;
    top: 5px;
    background: rgba(216, 191, 216, 0.2);
    width: 100px;
    height: 50px;
    margin-right: -50px;
    transition: margin-right 0.9s;  
    &:hover{
    margin-right:0;
    }
    ul{
      width: 100%;
      height: 100%;
      display: flex;
      li{
      width: 50px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover{
       background:#3498da;
      }
      .icon{
        font-size: 25px;
        color: #fff;
        font-weight: 600;
      }
      }
    }
}



</style>