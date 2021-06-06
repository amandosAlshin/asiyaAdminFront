import request from '@/utils/request'

export function reqLogin(data) {
  return request({
    url: '/api/users/signin',
    method: 'post',
    data
  })
}

export function signUp(data) {
  return request({
    url: '/api/users/signup',
    method: 'post',
    data
  })
}

export function reqLogout(data) {
  return request({
    url: '/logout',
    method: 'post',
    data
  })
}