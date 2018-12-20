import request from "@common/request/axios";
export function login(params) {
  return request({
    url: "/Users/login",
    method: "post",
    data: params
  });
}

export function loginQQ(params) {
  return request({
    url: "/Users/oauth_login?type=weixin",
    method: "post",
    data: params
  });
}

export function loginWX(params) {
  return request({
    url: "/Users/oauth_login?type=qq",
    method: "post",
    data: params
  });
}


export function loginSina(params) {
  return request({
    url: "/Users/oauth_login?type=sina",
    method: "post",
    data: params
  });
}

