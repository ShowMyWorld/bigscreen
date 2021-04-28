import {USERTOKENKEY} from '@/common/globalConstants'

// Token 工具类 -- start
export function getToken () {
    return localStorage.getItem(USERTOKENKEY)
  }
export function setToken (token) {
   localStorage.setItem(USERTOKENKEY, token)
}
export function setUserName () {
 
}
export function isLogin () {
 
}
export function removeSessionStorage (key) {
    return localStorage.removeItem(key)
  }