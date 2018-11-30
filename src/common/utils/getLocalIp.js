/**
 * @description
 * @Date : 2018/11/30
 * @author : YangBin
 * @Last Modified time : 2018/11/30
 */
function getIPAdress(){
  let interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        console.log(alias.address);
        return alias.address;
      }
    }
  }
};
console.log(getIPAdress());
