import request from '@/utils/request'

export function getAnswers(data) {
  return request({
    url: '/answer/list',
    method: 'post',
    data
  })
}

export function deleteAnswer(data) {
  return request({
    url: '/answer/delete',
    method: 'post',
    data
  })
}


export function addAnswer(data) {
  return request({
    url: '/answer/add',
    method: 'post',
    data
  })
}