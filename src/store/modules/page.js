export default {
    state:{
         // 可以在多页 tab 模式下显示的页面
        pool: [],
        // 当前显示的多页面列表
        opened: [],
        // 当前页面
        current: '',
        // 需要缓存的页面 name
        keepAlive: []
    },
    actions:{
        open({state,commit,dispatch},{name, params, query}){
            console.log(state+commit+dispatch);
            console.log(name+params+query);
        }
    },
    mutations:{

    }
    
}