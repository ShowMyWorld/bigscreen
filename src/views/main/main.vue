<template>
  <div class="main">
    <slidenav></slidenav>
    <div class="header">
        <ul class="header-ul">
          <li class="header-left header-nav">
            <ul>
              <li>
                <router-link to="/commercial" tag='a'>
                  <i class="icon iconfont icondirection-left"></i>
                  <span class="nav_name">首页</span>
                </router-link>
              </li>
              <li>
                <router-link to="/stationmon" tag='a'>
                <i class="icon iconfont icondirection-left"></i>
                  <span class="nav_name">电站监控</span>
               
                </router-link>
              </li>
              <li>
                <router-link to="/useranalysis" tag='a'>
                <i class="icon iconfont icondirection-left"></i>
                  <span class="nav_name">用户分析</span>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
    </div>
    <keep-alive>
      <div class="content">
      <router-view></router-view>
      </div>
    </keep-alive>
  </div>
</template>

<script>
import slidenav from '@/components/common/slidenav.vue'
export default {
  components: { slidenav },
  data(){
        return{
          
        }
    }
}
</script>

<style lang='scss'>
$header-height: 80px;
.content{
  height: calc(100% - #{$header-height});
  position: relative;
}
.main{
  height: 100%;
  min-width: 1920px;
}
@keyframes navmove
{
from {left:-36%;}
to {left:0;}
}
.header{
  width: 100%;
  background: rgb(0, 0, 0);
  height: $header-height;
  position: relative;
  &-left{
    width:  35%;
    height: $header-height;
    position:absolute;
    background: url('../../assets/img/hl.png') no-repeat;
    background-size: 100% 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    animation: navmove .5s;
    .router-link-active {
    .nav_name::after{
          content: '';
        display: block;
        width: 66px;
        height: 4px;
        border-radius: 50% 50% 0 0;
        background: radial-gradient( rgba(255, 255, 255, 0.7) 10%, rgba(204, 204, 204, 0.22), rgba(255, 255, 255, 0));
        }
    }
    a{
      cursor: pointer;
      text-decoration : none;
      color: #fff;
      width: 100px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    .icon{
      font-size: 25px;
    }
    .nav_name{
      text-align: center;
    }
   
    }
  }
   &-nav{
  >ul{
    display: flex;
    align-items: center;
    height: 100%;
    >li{
    }
  }
  
 

  }
}

</style>