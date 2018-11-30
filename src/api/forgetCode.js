import request from "@common/request/axios";
export function forgetCode(params) {
  return request({
    url: "/Users/retrieve_pwd",
    method: "post",
    data: params
  });
}
