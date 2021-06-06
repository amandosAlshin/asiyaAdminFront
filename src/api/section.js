import request from '@/utils/request'

export function getSections() {
  return request({
    url: '/section/list',
    method: 'get'
  })
}

export function deleteSection(data) {
  return request({
    url: '/section/delete',
    method: 'post',
    data
  })
}


export function addSection(data) {
  return request({
    url: '/section/add',
    method: 'post',
    data
  })
}