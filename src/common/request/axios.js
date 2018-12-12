import axios from "axios";
import qs from 'qs';
const BASE_URL = $_$.BASE_URL;
let typeData = '';
const _axios = axios.create({
 baseURL: BASE_URL, // api的base_url
  transformRequest: [function(data) {
    data = qs.stringify(data);
    return data;
  }],
  timeout: 5000, // request timeout
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
});
// request interceptor
_axios.interceptors.request.use(
  config => {
    // const whiteList = ['/Users/login']; // 白名单
    // if (whiteList.indexOf(config.url) != -1) {
    //   return config;
    // }
    // 判断请求的类型
    if (config.method === 'get') {
      typeData = 'params';
    }
    if (config.method === 'post') {
      // config.data = qs.stringify(config.data);
      typeData = 'data';
    }
    // config[typeData].user_id = Cookies.get('user_id') ? Cookies.get('user_id') : '';

    config[typeData].client_sys = config[typeData].client_sys ? config[typeData].client_sys : $_$.client_sys;
    config[typeData].reg_from = config[typeData].reg_from ? config[typeData].reg_from : $_$.reg_from;
    config[typeData].version = config[typeData].version ? config[typeData].version : $_$.version;
    config[typeData].device_id = config[typeData].device_id ? config[typeData].device_id : $_$.device_id;
    config[typeData].user_type = config[typeData].user_type ? config[typeData].user_type : $_$.user_type;
    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);
// respone interceptor

export default _axios;
