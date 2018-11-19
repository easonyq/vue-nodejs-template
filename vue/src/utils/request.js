/**
 * @file 统一发送请求的地方
 * @author wangyisheng@baidu.com (wangyisheng)
 */

import axios from 'axios'

export async function get (url, options) {
  let response = await axios.get(url, options)
  return response.data
}
