import request from "@common/request/axios";
export function register(params) {
  return request({
    url: "/Users/phone_reg",
    method: "post",
    data: params
  });
}