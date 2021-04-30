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
            :default-active=active
            active-text-color="#fff"
            :router=router
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
                v-model="editableTabsValue" 
                type="card" 
                :closable="true" 
                @edit="handleTabsEdit">
              <el-tab-pane
                :key="item.name"
                v-for="(item) in editableTabs"
                :label="item.title"
                :name="item.name"
              >
                {{item.content}}
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="theme-container-main-body">
            <router-view></router-view>
          </div>
          
        </div>
      </div>

  </div>
</template>

<script>
//import BScroll from 'better-scroll'
export default {
    data(){
      return{
        unique:true,
        router:true,
        active:'/commercial/home',
        editableTabsValue: '2',//选中选项卡的 name
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      }
    },
    created() {
     
    },
    mounted(){
    
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
       
     },
    methods:{
      handleMenuSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleTabsEdit(targetName, action) {
         console.log(targetName, action);
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