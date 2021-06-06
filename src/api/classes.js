import request from '@/utils/request'

export function getClasses() {
  return request({
    url: '/cabinet/subjects/listsub',
    method: 'post'
  })
}

export function getClassesAll() {
  return request({
    url: '/cabinet/subjects/listclasses',
    method: 'post',
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
    url: '/cabinet/subjects/addclass',
    method: 'post',
    data
  })
}