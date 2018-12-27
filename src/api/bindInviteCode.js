import request from "@common/request/axios";
export function bindInviteCode(data) {
  return request({
    url: "/Users/bind_invite_code",
    method: "get",
    params: data
  });
}
