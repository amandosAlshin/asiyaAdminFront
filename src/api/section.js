import request from '@/utils/request'

export function getSections(data) {
  return request({
    url: '/cabinet/sections/sectionlist',
    method: 'post',
    data
  })
}

export function deleteSection(data) {
  return request({
    url: '/cabinet/sections/sectiondelete',
    method: 'post',
    data
  })
}


export function addSection(data) {
  return request({
    url: '/cabinet/sections/sectionadd',
    method: 'post',
    data
  })
}