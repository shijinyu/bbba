import 'amfe-flexible';
import '../../components/admin-lte/bootstrap3.scss';
import 'weui';
// import weui from 'weui.js';
import $ from 'jquery';
import './index.scss';
import '../../components/user-style/base';
import ajax from '../../components/ajax/ajax';
import setAddress from '../../components/select-address/index';

import Validator from 'validate-js';

const WARN_STY = 'weui-cell_warn';
const valiRules = [
  {
    'name': 'cs_name',
    'rules': 'required',
    'display': '请填写姓名'
  },
  {
    'name': 'cs_sex',
    'rules': 'required',
    'display': '请选择性别'
  },
  {
    'name': 'cs_tel',
    'rules': 'required',
    'display': '请输入电话号码'
  },
  {
    'name': 'cs_mz',
    'rules': 'required',
    'display': '请选择民族'
  },
  {
    'name': 'cs_address',
    'rules': 'required',
    'display': '请填写地址'
  },
  {
    'name': 'cs_edu',
    'rules': 'required',
    'display': '请选择文化程度'
  },
  {
    'name': 'cs_birth',
    'rules': 'required',
    'display': '请选择生日'
  },
  {
    'name': 'cs_work_time',
    'rules': 'required|is_natural_no_zero',
    'display': '请填写从业年限'
  },
  {
    'name': 'cs_act_range',
    'rules': 'required',
    'display': '请填写从业地区'
  },
  {
    'name': 'cs_idnum',
    'rules': 'required',
    'display': '请填写身份证号'
  },
  {
    'name': 'cs_is_halal',
    'rules': 'required',
    'display': '选择是否是清真厨师'
  },
  {
    'name': 'cs_health_id',
    'rules': 'required',
    'display': '请输入健康证号'
  },
  {
    'name': 'cs_health_valiable',
    'rules': 'required',
    'display': '请选择健康证是否有效'
  },
  {
    'name': 'cs_train',
    'rules': 'required',
    'display': '请选择规培情况'
  }
  /* ,
  {
    'name': 'cs_vcode',
    'rules': 'required',
    'display': '请输入验证码'
  }*/
];

class UserCooker {
  constructor() {
    this.$form = $('#J_form');
    this.validator = new Validator('cooker_vaildate', valiRules, function(errors) {
      // console.log(errors, event);
      if (errors.length > 0) {
        errors.forEach(function(error) {
          const $wrap = $(error.element).parents('.weui-cell');
          // console.log(error);
          if (error.element.tagName === 'INPUT') {
            $wrap.append(`<div class="weui-cell__ft js-error-info">
          <i class="weui-icon-warn"></i>
      </div>`);
          }
          $wrap.addClass(WARN_STY);
          $('.js_tooltips').text('请检查输入').show();
        });
      }
    });
    this.$form.on('keydown change', 'input,select', function() {
      const $wrap = $(this).parents('.weui-cell');
      $wrap.find('.js-error-info').remove();
      $wrap.removeClass(WARN_STY);
      $('.js_tooltips').hide();
    });
    setAddress($('#J_cs_address_1'), $('#J_cs_address_2'), $('#J_cs_areaid'));
  }
  submit() {
    this.validator._validateForm();
    console.log(this.validator);
    if (this.validator.errors.length) {
      return ;
    }
    $('#J_submit').addClass('weui-btn_loading weui-btn_disabled').prop('disabled', true);
    const _this = this;
    const f = (function() {
      const a = _this.$form.serializeArray();
      let b = {};
      a.forEach(function(item) {
        console.log(item);
        b = $.extend(true, {}, b, {
          [item.name]: item.value
        });
      });
      return b;
    }());
    const csAddress = [
      '蚌埠市',
      f.cs_address_country,
      f.cs_address_street,
      f.cs_address_detail
    ].join(' ');
    f.cs_address = csAddress;
    console.log(f);
    $('#loadingToast').fadeIn(500);
    ajax({
      url: window.__API_URL__ + '/index.php?c=cs&a=add',
      // url: 'http://sa.iwezan.com/fda/index.php?c=cs&a=add',
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: JSON.stringify(f)
    }).then(function(res) {
      console.log(res);
      $('#J_submit').removeClass('weui-btn_loading weui-btn_disabled').prop('disabled', false);
      $('#loadingToast').fadeOut(500);
      if (parseInt(res.status.code, 10) === 0) {
        window.location.href = '/public/user-done/index-success.html';
      } else {
        window.location.href = '/public/user-done/index-fail.html?msg=' + res.status.msg;
      }
    }).catch(function(err) {
      $('#J_submit').removeClass('weui-btn_loading weui-btn_disabled').prop('disabled', false);
      console.log(err);
    });
  }
}

const page = new UserCooker();

$('#J_submit').on('click', function() {
  // const $this = $(this);
  page.submit();
});
