import setting from '@/setting.js'

export default {
    namespaced: true,
    state:{
    // 可以在多页 tab 模式下显示的页面
    pool: [],
    // 当前显示的多页面列表
    opened: setting.page.opened,
    // 当前页面
    current: '',
    // 需要缓存的页面 name
    keepAlive: []
    },
    actions:{
          /**
         * @class opened
         * @description 从持久化数据载入分页列表
         * @param {Object} state vuex state
         */
        openedLoad({state,conmit,dispatch}){
           return new Promise(async resolve => {
                console.log(state+conmit+dispatch);
                resolve();
           })

           
       },
    /**
     * @class current
     * @description 打开一个新的页面
     * @param {Object} state vuex state
     * @param {Object} param { name, params, query } 路由信息
     */
    open ({ state, commit, dispatch }, { name, params, query }) {
      console.log(state.pool+'-'+name);
        return new Promise(async resolve => {
          // 已经打开的页面
          let opened = state.opened
          // 判断此页面是否已经打开 并且记录位置
          let pageOpendIndex = 0
          const pageOpend = opened.find((page, index) => {
            const same = page.name === name
            pageOpendIndex = same ? index : pageOpendIndex
            return same
          })
          
          if (pageOpend) {
            // 页面以前打开过 但是新的页面可能 name 一样，参数不一样
            await dispatch('openedUpdate', {
              index: pageOpendIndex,
              params,
              query
            })
          } else {
            // 页面以前没有打开过
            let page = state.pool.find(t => t.name === name)
            console.log(page);
            if (page) {
              await dispatch('add', {
                tag: page,
                params,
                query
              })
            }
          }
         
          commit('currentSet', name)
          // end
          resolve()
        })
      },
    /**
     * 将 opened 属性赋值并持久化 在这之前请先确保已经更新了 state.opened
     * @param {Object} state vuex state
     */
    opend2db ({ state, dispatch }) {
      return new Promise(async resolve => {
        // 设置数据
        dispatch('db/set', {
          dbName: 'sys',
          path: 'page.opened',
          value: state.opened,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @class opened
     * @description 更新页面列表上的某一项
     * @param {Object} state vuex state
     * @param {Object} param { index, params, query } 路由信息
     */
    openedUpdate ({ state, commit, dispatch }, { index, params, query }) {
      console.log("Update");
      return new Promise(async resolve => {
        // 更新页面列表某一项
        let page = state.opened[index]
        page.params = params || page.params
        page.query = query || page.query
        state.opened.splice(index, 1, page)
        // 增加缓存设置
        commit('keepAlivePush', page.name)
        // 持久化
        await dispatch('opend2db')
        // end
        resolve()
      })
    },
       /**
       * @class opened
       * @description 新增一个 tag (打开一个页面)
       * @param {Object} state vuex state
       * @param {Object} param new tag info
       */
      add ({ state, commit, dispatch }, { tag, params, query }) {
        return new Promise(async resolve => {
          // 设置新的 tag 在新打开一个以前没打开过的页面时使用
          let newTag = tag
          newTag.params = params || newTag.params
          newTag.query = query || newTag.query
          // 添加进当前显示的页面数组
          state.opened.push(newTag)
          // 如果这个页面需要缓存 将其添加到缓存设置
          // if (get(newTag, 'meta.requiresAuth', false)) {
             commit('keepAlivePush', tag.name)
          // }
          // 持久化
          await dispatch('opend2db')
          // end
          resolve()
        })
      },

      close({state,commit,dispatch},{tagName,vm}){
        return new Promise(async resolve => {
          let newPage = state.opened[0]
          const isCurrent = state.current === tagName
          // 如果关闭的页面就是当前显示的页面
          if(isCurrent){
            let len = state.opened.length
            for (let i = 1; i < len; i++) {
              
              
            }
          }
        })
      }
    },
    mutations:{
      /**
     * @description 增加一个页面的缓存设置
     * @param {Object} state vuex state
     * @param {String} name name
     */
    keepAlivePush (state, name) {
      const keep = [ ...state.keepAlive ]
      keep.push(name)
      state.keepAlive = Array.from(new Set(keep))
    },
        /**
       * @class current
       * @description 设置当前激活的页面 name
       * @param {Object} state vuex state
       * @param {String} name new name
       */
         currentSet (state, name) {
          state.current = name
        },
    /**
     * @class pool
     * @description 保存 pool (候选池)
     * @param {Object} state vuex state
     * @param {Array} routes routes
     */
     init (state, routes) {
      const pool = []
      const push = function (routes) {
        routes.forEach(route => {
          if (route.children) {
            push(route.children)
          } else {
            if (!route.hidden) {
              const { meta, name, path } = route
              pool.push({ meta, name, path })
            }
          }
        })
      }
      push(routes)
      state.pool = pool
    }

    }
    
}