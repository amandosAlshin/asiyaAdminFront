import request from '@/utils/request'

export function getQuestions(data) {
  return request({
    url: '/cabinet/exam/question-list',
    method: 'post',
    data
  })
}

export function deleteQuestion(data) {
  return request({
    url: '/cabinet/exam/question-delete',
    method: 'post',
    data
  })
}


export function addQuestion(data) {
  return request({
    url: '/cabinet/exam/question-add',
    method: 'post',
    data
  })
}