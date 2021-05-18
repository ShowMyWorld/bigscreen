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
            default-active='/commercial/home'
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
                v-model="activeTab" 
                type="card" 
                :closable="true" 
                @edit="handleTabsEdit"
                @tab-click="tabClick">
              <el-tab-pane
                 v-for="(item) in tabsItem"
                :key="item.name"
                :label="item.title"
                :name="item.name"
                :closable="item.closable"
                :ref="item.ref"
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
export default {
    data(){
      return{
        unique:true,
        router:true,
        activeTab: '1',
        tabIndex:1, 
        tabsItem: [{
            title: '首页',
            name: '1',
            closable: false,
            ref: 'tabs',
            
          }
        ],
        tabsPath: [{
          name: "1",
          path: '/commercial/home'
        }],
   
      }
    },
    computed: {
      setHeight() {
        return document.documentElement.clientHeight - 65
      },
      activeNav() { //当前激活的导航
        return this.$route.path
      }

    },
    created() {
     const sessionTabs = JSON.parse(sessionStorage.getItem("tabsItem"))
      if(sessionTabs.currTabsItem.length != 0 && sessionTabs.currTabsPath.length != 0) {
        for(let i=0; i<sessionTabs.currTabsItem.length; i++) {
          this.tabsItem.push({
            title: sessionTabs.currTabsItem[i].title,
            name: sessionTabs.currTabsItem[i].name,
            closable: true,
            ref: sessionTabs.currTabsItem[i].ref,
            content: sessionTabs.currTabsItem[i].content
          })
        }
        for(let j=0; j<sessionTabs.currTabsPath.length; j++) {
          this.tabsPath.push({
            name: sessionTabs.currTabsPath[j].name,
            path: sessionTabs.currTabsPath[j].path
          })
        }
        this.activeTab = sessionTabs.currActiveTabs
        this.tabIndex = sessionTabs.currIndex
        //避免强制修改url 出现浏览器的url输入框的路径和当前tabs选中的路由路径不匹配
        const activePath = this.tabsPath.filter(item => item.name == this.activeTab)
        this.$router.push({
          path: activePath[0].path
        })
      }

    },
    mounted(){
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem("tabsItem", JSON.stringify({
          currTabsItem: this.tabsItem.filter(item => item.name !== "1"),
          currTabsPath: this.tabsPath.filter(item => item.name !== "1"),
          currActiveTabs: this.activeTab,
          currIndex: this.tabIndex
        }))
      });
      
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
       $route: function (to) {  //监听路由的变化，动态生成tabs
        let flag = true //判断是否需要新增页面
        const path = to.path
        if (Object.keys(to.meta).length != 0) {
          for (let i = 0; i < this.$refs.tabs.length; i++) {
              console.log(this.$refs.tabs);
            if (i != 0) { //首页不判断 如果页面已存在，则直接定位当页面，否则新增tab页面
              if (this.$refs.tabs[i].label == to.meta.name) {
                this.activeTab = this.$refs.tabs[i].name  //定位到已打开页面
                flag = false
                break
              }
              this.activeTab ='1'
              flag = false
            }
          }
          //新增页面
          if (flag) {
            //获得路由元数据的name和组件名
            const thisName = to.meta.name
            
            //对tabs的当前激活下标和tabs数量进行自加
            let newActiveIndex = ++this.tabIndex + ''
            //动态双向追加tabs
            this.tabsItem.push({
              title: thisName,
              name: String(newActiveIndex),
              closable: true,
              ref: 'tabs',
            })
            this.activeTab = newActiveIndex
            /*
            * 当添加tabs的时候，把当前tabs的name作为key，path作为value存入tabsPath数组中
            * key:tabs的name
            * value:tabs的path
            * {
            *   key: name,
            *   value: path
            * }
            * ///后面需要得到当前tabs的时候可以通过当前tabs的name获得path
            * */
            if (this.tabsPath.indexOf(path) == -1) {
              this.tabsPath.push({
                name: newActiveIndex,
                path: path
              })
            }
          }
        }
      }
     },
    methods:{
      handleMenuSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleTabsEdit(targetName, action) {
         console.log(targetName, action);
      },
      tabClick(thisTab) {
        /*
        * thisTab:当前选中的tabs的实例
        * 通过当前选中tabs的实例获得当前实例的path 重新定位路由
        * */
        let val = this.tabsPath.filter(item => thisTab.name == item.name)
        this.$router.push({
          path: val[0].path
        })
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