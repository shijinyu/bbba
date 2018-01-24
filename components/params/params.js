// 获取 params string
// url地址，未传值取 `window.location.href`。
const getParamsString = function(name) {
  const result = location.search.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'));
  if (result === null || result.length < 1) {
    return '';
  }
  return result[1];
};
export default getParamsString;
