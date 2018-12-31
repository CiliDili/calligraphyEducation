import request from "@common/request/axios";
export function bindInviteCode(params) {
  return request({
    url: "/Users/bind_invite_code",
    method: "post",
   data: params
  });
}
