import 'amfe-flexible';
import 'weui';
import $ from 'jquery';

import getParamsString from '../../components/params/params';

const errorInfo = getParamsString('msg') || '提交遇到了网络错误';

$('#J_error').text(errorInfo);
