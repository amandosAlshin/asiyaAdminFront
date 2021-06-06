import request from '@/utils/request'

export function getExams() {
  return request({
    url: '/exam/list',
    method: 'get'
  })
}

export function deleteExam(data) {
  return request({
    url: '/exam/delete',
    method: 'post',
    data
  })
}


export function addExam(data) {
  return request({
    url: '/exam/add',
    method: 'post',
    data
  })
}