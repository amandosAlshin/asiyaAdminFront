import request from '@/utils/request'

export function getClasses() {
  return request({
    url: '/classes/list',
    method: 'get'
  })
}

export function deleteClass(data) {
  return request({
    url: '/class/delete',
    method: 'post',
    data
  })
}


export function addClass(data) {
  return request({
    url: '/class/add',
    method: 'post',
    data
  })
}