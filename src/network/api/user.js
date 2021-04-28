import request from './axiosConfig'
import {loginUrl} from './api'

export function loginByUserName (params) {
    let data = { ...params }
    return request({
      url: loginUrl,
      method: 'post',
      data
    })
  }