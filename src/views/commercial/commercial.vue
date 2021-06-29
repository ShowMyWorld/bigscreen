<template>
  <div class="commercial-content">
      <div class="layout-theme-header">
        <div class="logo-group">
            <img src="@/assets/img/logo.png" alt="">
        </div>
        <div class="toggle-aside-btn">
          <i class="icon iconfont iconmenu"></i>
        </div>
      </div>
      <div class="layout-theme-container">
        <div class="layout-theme-container-aside">
          <div class="layout-theme-container-aside-menu">
            <el-menu
            @select="handleMenuSelect"
            :unique-opened=unique
            :default-active='active'
            active-text-color="#fff"
            :router=router
            ref='menu'
            >
              <el-menu-item index="/commercial/home">
                <i class="el-icon-location"></i>
                <span>首页</span>
              </el-menu-item>

              <el-submenu index="./bill">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>账单管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/commercial/bill">充电账单</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据报表</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="./chargereport">
                <i class="el-icon-location"></i>
                <span>充电报表</span>
                </el-menu-item>
                <el-menu-item index="./tjreport">
                <i class="el-icon-location"></i>
                <span>统计报表</span>
                </el-menu-item>
              </el-menu-item-group>
             
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
          </div>
        </div>

        <div class="layout-theme-container-main">
          <div class="theme-container-main-header" >
              <el-tabs 
               
                :value="current"
                type="card" 
                :closable="true" 
                @edit="handleTabsEdit"
                @tab-click="handleClick">
              <el-tab-pane
                 v-for="(item,index) in opened"
                :key="index"
                :label="item.meta.name || '未命名'"
                :name="item.name"
              >
              
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="theme-container-main-body">
            <keep-alive>
            <router-view></router-view>
            </keep-alive>
          </div>
          
        </div>
      </div>

  </div>
</template>

<script>
//import BScroll from 'better-scroll'
import { mapState } from 'vuex'
export default {
    data(){
      return{
        unique:true,
        router:true,
        active: '',
      }
    },
    computed: {
      ...mapState({
        opened:state=>state.page.opened,
        current:state=>state.page.current
      })

    },
    mounted(){
      console.log(this. opened);
      //  this.BS = new BScroll(this.$refs.aside, {
      //   mouseWheel: true
      //   // 如果你愿意可以打开显示滚动条
      //   // scrollbar: {
      //   //   fade: true,
      //   //   interactive: false
      //   // }
      // })
    },
    
     watch: {
        // 监听路由 控制侧边栏激活状态
    '$route.matched': {
      handler (val) {
        this.active = val[val.length - 1].path
        this.$nextTick(() => {
            this.$refs.menu.activeIndex = this.active
        })
      },
      immediate: true
    }
      //  $route: function (to) { 
     
        
      // }
     },
    methods:{
      handleMenuSelect(key, keyPath) {
        console.log(key, keyPath);
      },

       /**
       * @description 接收点击 tab 标签的事件
       */
      handleClick (tab) {
        // 找到点击的页面在 tag 列表里是哪个
        const page = this.opened.find(page => page.name === tab.name)
        const { name, params, query } = page
        if (page) {
          this.$router.push({ name, params, query })
        }
      },
      /**
       * @description 点击 tab 上的删除按钮触发这里 首页的删除按钮已经隐藏 因此这里不用判断是 index
       */
      handleTabsEdit (tagName, action) {
        if (action === 'remove') {
          this.close({
            tagName,
            vm: this
          })
        }
      }
   
    }
    
}
</script>

<style lang="scss">
  $theme_H:80px;
  $menu-side:250px;
  @import "@/assets/css/layout_theme.scss";
  .commercial-content{
     background-color: $main_color;
     display: flex;
     flex-direction: column;
     position: absolute;
     top: 0;
     bottom: 0;
     left: 0;
     right: 0;
     .layout-theme-header{
       height: $theme_H;
       display: flex;
       .logo-group{
         width: $menu-side;
         display: flex;
         justify-content: center;
         align-items: center;
        img{
          height: $theme_H - 10px;
        }
       }
       .toggle-aside-btn{
         color: #fff;
         display: flex;
         align-items: center;
         padding: 0 15px;
         cursor: pointer;
         .iconmenu{
           font-size: 35px;
         }
       }
     }
  }
  .layout-theme-container{
    background: #fff;
    display: flex;
    flex-grow: 1;
  }

  .layout-theme-container-main{
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-direction: column;
    .theme-container-main-header{
      flex-grow: 0;
    }
    .theme-container-main-body{
      flex-grow: 1;
    }
  }
</style>