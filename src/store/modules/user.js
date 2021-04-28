import {loginByUserName} from '@/network/api/user'
import { getToken } from '@/common/utils'

//, setToken, setUserName, isLogin, removeSessionStorage
const user={
    state:{
        token:getToken(),
        userName:'',
        loginUserInfo: ''
    },
    mutations:{
        SET_TOKEN: (state, token) => {
            state.token = token
          },
    },
    actions:{
        loginByUserNameAction(userInfo){
            return new Promise((resolve, reject)=>{
                loginByUserName(userInfo)
                .then(response => {
                    console.log(response)
                    resolve()
                })
                .catch(error => {
                    reject(error)
                  })
                
            })
        }
    }
}
export default user