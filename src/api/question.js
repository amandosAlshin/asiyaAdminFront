import request from '@/utils/request'

export function getQuestions() {
  return request({
    url: '/question/list',
    method: 'get'
  })
}

export function deleteQuestion(data) {
  return request({
    url: '/question/delete',
    method: 'post',
    data
  })
}


export function addQuestion(data) {
  return request({
    url: '/question/add',
    method: 'post',
    data
  })
}