import request from '@/utils/request'

export function getSubjects() {
  return request({
    url: '/api/subjects-list/listsub',
    method: 'get',
    // headers: { 'Content-Type': 'application/json', '' }
  })
}

export function addSubject(data) {
  return request({
    url: '/cabinet/subjects/addsubject',
    method: 'post',
    data
  })
}