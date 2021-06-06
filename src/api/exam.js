import request from '@/utils/request'

export function getExams() {
  return request({
    url: '/cabinet/exam/exam-list',
    method: 'post'
  })
}

export function deleteExam(data) {
  return request({
    url: '/cabinet/exam/exam-delete',
    method: 'post',
    data
  })
}


export function addExam(data) {
  return request({
    url: '/cabinet/exam/exam-add',
    method: 'post',
    data
  })
}