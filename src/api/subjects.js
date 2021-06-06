import request from '@/utils/request'

export function getSubjects() {
  return request({
    url: '/api/subjects-list/listsub',
    method: 'post'
  })
}
