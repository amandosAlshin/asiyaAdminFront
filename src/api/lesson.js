import request from '@/utils/request'

export function getLessons() {
  return request({
    url: '/lesson/list',
    method: 'get'
  })
}

export function deleteLesson(data) {
  return request({
    url: '/lesson/delete',
    method: 'post',
    data
  })
}


export function addLesson(data) {
  return request({
    url: '/lesson/add',
    method: 'post',
    data
  })
}