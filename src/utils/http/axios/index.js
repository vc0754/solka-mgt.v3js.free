import axios from 'axios'

axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
axios.defaults.baseURL = 'api'

axios.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token')
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(res => {
  const token = res.headers['authorization']
  if (token) sessionStorage.setItem('token', token)
  
  if (res.status !== 200 && res.status !== 201 && res.status !== 204) return Promise.reject(res)
  return res.data
}, async error => {
  const { response } = error
  return Promise.reject(response.data ? response.data : error)
})

export const Axios = axios.create({
  paramsSerializer: params => querystring.stringify(params)
})

export default axios