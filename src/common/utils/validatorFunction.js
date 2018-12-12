/**
 * @description
 * @Date : 2018/12/12
 * @author : YangBin
 * @Last Modified time : 2018/12/12
 */
/*验证必备*/
export const validate = (callback, data) {
  this.validator.validate((errors, fields) => {
    resetField();
    if (errors) {
      fields.forEach(item => {
        this.errorMsg[item.field] = item.message
      })
    }
    callback && callback(errors, fields)
  }, data);
};
/**
 * 清除验证提示
 * @param attrs
 */
/*export const resetField = (attrs) {
  attrs = !attrs ? Object.keys(this.errorMsg) : (Array.isArray(attrs) ? attrs : [attrs]);
  attrs.forEach(attr => {
    this.errorMsg[attr] = ''
  })
},*/
