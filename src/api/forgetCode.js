import request from "@common/request/axios";
export function forgetCode(params) {
  return request({
    url: "/Users/retrieve_pwd",
    method: "post",
    data: params
  });
}
export function sendMsg(params) {
  return request({
    url: "/Users/send_msg",
    method: "post",
    data: params
  });
}
export function phoneReg(params) {
  return request({
    url: "/Users/is_phone_reg",
    method: "post",
    data: params
  });
}