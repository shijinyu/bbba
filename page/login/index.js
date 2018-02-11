import './index.scss';
import '../../components/font-awesome/scss/font-awesome.scss';
import '../../components/admin-lte/admin-lte.scss';
import '../../components/admin-lte/skin-blue.scss';
import '../../components/login/blue.scss';
import ajax from '../../components/ajax/ajax';

import 'weui';
import weui from 'weui.js';

const $ = require('jquery');
const $user = $('#J_user');
const $pwd = $('#J_pwd');
const $loading = $('#loadingToast');

$('#J_submit').on('click', function() {
  const u = $user.val();
  const p = $pwd.val();
  $loading.fadeIn();
  ajax({
    'type': 'POST',
    'url': window.__API_URL__ + '/index.php?c=login&a=login',
    'dataType': 'json',
    'data': {
      'user': u,
      'passowrd': p
    }
  }).then(result => {
    const code = parseInt(result.code, 10);
    console.log(result, code);
    $loading.fadeOut();
    switch (code) {
    case 201:
      weui.dialog({
        title: '登录失败',
        content: '用户名或密码错误'
      });
      break;
    default:
      weui.dialog({
        title: '登录失败',
        content: `错误信息：${result.msg} 错误号：${result.code}`
      });
    }
  }).catch(err => {
    // console.log(err);
    $loading.fadeOut();
    weui.toast(`错误信息：${err.msg} 错误号：${err.code}`, 3000);
  });
});

