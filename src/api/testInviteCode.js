import request from "@common/request/axios";
export function testInviteCode(params) {
  return request({
    url: "/Users/auth_invite_code",
    method: "post",
    data: params
  });
}