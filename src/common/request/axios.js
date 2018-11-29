import axios from "axios";
import Cookies from 'js-cookie';
import router from '@/router/index';
import qs from 'qs';

const BASE_URL = $_$.BASE_URL;
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
    // const whiteList = ['/Users/login'] // 白名单
    // if (whiteList.indexOf(config.url) != -1) {
    //   return config;
    // }
    // 判断请求的类型
    if (config.method === 'get') {
      typeData = 'params';
    }
    if (config.method === 'post') {
      typeData = 'data';
    }
    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);
// respone interceptor
_axios.interceptors.response.use(
  response => {
    if (response.data.code == -100001 || response.data.code == -100002 || response.data.code == -100003) {
       Cookies.remove('user_id');
       Message({
          message: '您的账号长时间未使用或已在其它设备登录，请重新登录',
          type: "error",
          duration: 5 * 1000
       });
       router.push({ path: "/login" });
       return;
    }
    else{
       return response;
    }
  },
  error => {
    console.log("err" + error);
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);
export default _axios;
