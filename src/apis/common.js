/* eslint-disable no-unused-vars */
import request from './httpRequest'
import simpleRequest from './simple.httpRequest'
import { environment } from '@/environments'

const news = environment.news
export let baseURL = environment.api

export default {
  request: request,
  simpleRequest: simpleRequest,
  baseURL: baseURL,
  news: news
}
