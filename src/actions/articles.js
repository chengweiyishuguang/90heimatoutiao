// 专门放置文章请求
// 获取文章
import request from '../utils/request'
import { API_ARTICLES, API_CHANNELS } from '../constant/API'
export function getArticles (params) {
  return request({
    url: API_ARTICLES,
    params
  })
}
// 获取频道
export function getChannels () {
  return request({
    url: API_CHANNELS
  })
}
