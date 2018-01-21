export default function tplError(title = '请求错误', text = '获取数据失败') {
  return `<div class="callout callout-danger">
    <h4>${title}</h4>
    <p>${text}</p>
  </div>
  `;
}
