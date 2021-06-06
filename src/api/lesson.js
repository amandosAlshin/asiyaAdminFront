import request from '@/utils/request'

export function getLessons(data) {
  console.log({ data });
  return request({
    url: '/cabinet/sections/topiclist',
    method: 'post',
    data
  })
}

export function deleteLesson(data) {
  return request({
    url: '/cabinet/sections/topicdelete',
    method: 'post',
    data
  })
}


export function addLesson(data) {
  return request({
    url: '/cabinet/sections/topicadd',
    method: 'post',
    data
  })
}