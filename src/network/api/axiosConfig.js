import axios from 'axios'
// TODO
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 60000,
  headers: { 'content-type': 'application/json' }
})
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  res => {
    // 对响应数据做点什么
      return Promise.reject(res.data.data.msg)
  },
  error => {
    console.log('response: error', error)
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default service
