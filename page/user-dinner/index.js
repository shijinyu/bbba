import 'amfe-flexible';
import '../../components/admin-lte/bootstrap3.scss';
import 'weui';
import weui from 'weui.js';
import $ from 'jquery';
import Validator from 'validate-js';

import './index.scss';
import '../../components/user-style/base';
import ajax from '../../components/ajax/ajax';
import setAddress from '../../components/select-address/index';

const Router = require('routerjs');

const WARN_STY = 'weui-cell_warn';
const tplCookers = index => `<section id="J_cooker_detail_${index}" class="weui-cells weui-cells_form js-cooker-detail-wrap">
<input type="hidden" name="cs_list" id="J_cooker_csid_${index}" value>
<div class="weui-cell weui-cell_vcode">
  <div class="weui-cell__hd"><label class="weui-label">身份证号</label></div>
  <div class="weui-cell__bd">
    <input class="weui-input" type="number" name="yh_cooker_idnum" id="J_yh_cooker_idnum_${index}">
  </div>
  <div class="weui-cell__ft">
    <button type="button"  data-index="${index}" class="js-get-cooker weui-vcode-btn">验证</button>
  </div>
</div>  
<div class="weui-cell">
    <div class="weui-cell__hd"><label class="weui-label">厨师姓名</label></div>
    <div class="weui-cell__bd">
      <input class="weui-input" type="text" name="yh_cooker_info" id="J_yh_cooker_name_${index}" readonly>
    </div>
  </div>
  <div class="weui-cell">
    <div class="weui-cell__hd"><label class="weui-label">食培与健康</label></div>
    <div class="weui-cell__bd">
      <textarea class="weui-textarea" placeholder="食培与健康" rows="3" name="yh_cooker_detail" id="J_yh_cooker_detail_${index}"></textarea>
    </div>
  </div>
  <div class="weui-cell">
    <div class="weui-cell__bd">
      <a href="javascript:;" data-index="${index}" data-id="J_cooker_detail_${index}" class="js-remove-cooker weui-btn weui-btn_mini weui-btn_warn">删除</a>
    </div>
  </div>
</section>`;

const tplFoods = index => `<section id="J_food_detail_${index}" class="weui-cells weui-cells_form js-food-detail-wrap">
<div class="weui-cell">
  <div class="weui-cell">
  <div class="weui-cell__hd"><label class="weui-label">名称</label></div>
  <div class="weui-cell__bd">
    <input class="weui-input js-yh-food-name" type="text" name="yh_food" id="J_yh_food_${index}">
  </div>
  </div>
</div><div class="weui-cell"><div class="weui-cell__bd">
<a href="javascript:;" data-index="${index}" data-id="J_food_detail_${index}" class="js-remove-dinner weui-btn weui-btn_mini weui-btn_warn">删除</a>
</div></div></section>`;

const valiRules = [
  {
    'name': 'yh_applier',
    'rules': 'required',
    'display': '请填写申请人或申请单位'
  },
  {
    'name': 'yh_master_name',
    'rules': 'required',
    'display': '请输入宴会举办人'
  },
  {
    'name': 'yh_tel',
    'rules': 'required',
    'display': '请填写联系电话'
  },
  {
    'name': 'yh_num',
    'rules': 'required|is_natural_no_zero',
    'display': '请正确填写人数'
  },
  {
    'name': 'yh_date',
    'rules': 'required',
    'display': '办宴时间'
  },
  {
    'name': 'yh_address_home_country',
    'rules': 'required',
    'display': '请选择区县'
  },
  {
    'name': 'yh_address_home_street',
    'rules': 'required',
    'display': '请选择地址'
  },
  {
    'name': 'yh_address_home_detail',
    'rules': 'required',
    'display': '请输入街道'
  },
  {
    'name': 'yh_address_country',
    'rules': 'required',
    'display': '请选择区县'
  },
  {
    'name': 'yh_address_street',
    'rules': 'required',
    'display': '请选择地址'
  },
  {
    'name': 'yh_address_detail',
    'rules': 'required',
    'display': '请输入街道'
  },
  {
    'name': 'yh_act_range',
    'rules': 'required',
    'display': '请填写从业地区'
  },
  {
    'name': 'yh_reason',
    'rules': 'required',
    'display': '请填写事由'
  },
  {
    'name': 'yh_vcode',
    'rules': 'required',
    'display': '请输入验证码'
  }
];

class UserDinner {
  constructor() {
    const _this = this;
    this.$form = $('#J_form');
    this.$pgMain = $('#J_page_main');
    this.$pgCooker = $('#J_cooker_detail');
    this.$pgDinner = $('#J_dinner_detail');
    this.$cookerList = $('#J_cooker_list');
    this.$dinnerList = $('#J_dinner_list');
    this.$loading = $('#loadingToast');
    this.fields = {
      'yh_cookers_list': [],
      'yh_dinners_list': []
    };
    this.validator = new Validator('cooker_vaildate', valiRules, function(errors) {
      // console.log(errors, event);
      if (errors.length > 0) {
        errors.forEach(function(error) {
          const $wrap = $(error.element).parents('.weui-cell');
          console.log(error.element.tagName);
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
    setAddress($('#J_yh_address_1'), $('#J_yh_address_2'), $('#J_yh_areaid'));
    setAddress($('#J_yh_address_home_1'), $('#J_yh_address_home_2'));
    this.router = new Router();
    this.router.addRoute('#/', function(req, next) {
      console.log(req, next);
      _this.$pgCooker.hide();
      _this.$pgDinner.hide();
      _this.$pgMain.show();
    }).addRoute('#/cooker', function() {
      _this.$pgMain.hide();
      _this.$pgDinner.hide();
      _this.$pgCooker.show();
    }).addRoute('#/dinner', function() {
      _this.$pgMain.hide();
      _this.$pgCooker.hide();
      _this.$pgDinner.show();
    }).run('#/');
    $(document).on('click', '.js-to-cooker-detail', function() {
      console.log(_this.router);
      _this.router.run('#/cooker');
    }).on('click', '.js-to-dinner-detail', function() {
      _this.router.run('#/dinner');
    }).on('click', '.js-cooker-add', function() {
      _this.$cookerList.append(tplCookers($('.js-cooker-detail-wrap').length));
    }).on('click', '.js-remove-cooker', function() {
      const $this = $(this);
      const domId = $this.attr('data-id');
      // const index = parseInt($this.attr('data-index'), 10);
      $('#J_cooker_detail_' + domId).remove();
    }).on('click', '.js-get-cooker', function() {
      const $this = $(this);
      const index = parseInt($this.attr('data-index'), 10);
      const val = $('#J_yh_cooker_idnum_' + index).val();
      _this.$loading.fadeIn(200);
      ajax({
        url: window.__API_URL__ + '/api/cooker/id',
        type: 'GET',
        data: {
          'cs_idnum': val
        }
      }).then(res => {
        const data = res.data;
        if (data && String(data.cs_status) === '1') {
          $this.prop('disabled', true);
          $('#J_yh_cooker_idnum_' + index).prop('readonly', true);
          $('#J_yh_cooker_name_' + index).val(data.cs_name);
          $('#J_yh_cooker_detail' + index).val(`健康证号：${data.cs_health_id}，是否有效：${data.cs_health_valiable}，食培情况：${data.cs_train}`);
          $('#J_cooker_csid_' + index).val(data.csid);
        } else {
          weui.toast('该厨师未通过备案，请先通过厨师备案', 3000);
        }
        _this.$loading.fadeOut(200);
        console.log(res);
      }).catch(err => {
        _this.$loading.fadeOut(200);
        console.log(err);
        weui.toast('网络错误，请重试！', 3000);
      });
    }).on('click', '.js-cooker-complete', function() {
      // 执行厨师校验
      _this.fields.yh_cookers_list = [];
      let isFinished = true;
      $('[name="cs_list"]').each(function() {
        const val = $(this).val();
        if (val) {
          _this.fields.yh_cookers_list.push($(this).val());
        } else {
          weui.toast('有未完成的厨师校验，请检查');
          isFinished = false;
          return false;
        }
      });
      if (isFinished) {
        _this.router.run('#/');
      }
    }).on('click', '.js-remove-dinner', function() {
      const $this = $(this);
      const domId = $this.attr('data-id');
      $('#' + domId).remove();
    }).on('click', '.js-dinner-add', function() {
      _this.$dinnerList.append(tplFoods($('.js-food-detail-wrap').length));
    }).on('click', '.js-dinner-complete', function() {
      let isFinished = true;
      _this.fields.yh_dinners_list = [];
      $('.js-yh-food-name').each(function() {
        const val = $(this).val();
        if (val) {
          _this.field.yh_dinners_list.push(val);
        } else {
          weui.toast('请输入菜品信息', 3000);
          isFinished = false;
          return false;
        }
      });
      if (isFinished) {
        _this.router.run('#/');
      }
    });
  }
  submit() {
    const errors = this.validator._validateForm();
    if (errors.length) {
      return ;
    }
    const _this = this;
    const f = (function() {
      const a = _this.$form.serializeArray();
      let b = {};
      a.forEach(function(item) {
        b = $.extend(true, {}, b, item);
      });
      return b;
    }());
    const yhAddressHome = [
      '蚌埠市',
      f.yh_address_home_country,
      f.yh_address_home_street,
      f.yh_address_home_detail
    ].join(' ');
    f.yh_address_home = yhAddressHome;
    const yhAddress = [
      '蚌埠市',
      f.yh_address_country,
      f.yh_address_street,
      f.yh_address_detail
    ].join(' ');
    f.yh_address = yhAddress;
    f.cookers = this.fields.yh_cookers_list;
    f.foods = this.fields.yh_dinners_list;
    $('#loadingToast').fadeIn(500);
    ajax({
      url: window.__API_URL__ + '/update/cooker/new',
      type: 'POST',
      data: JSON.stringify(f)
    }).then(function(res) {
      console.log(res);
      $('#loadingToast').fadeOut(500);
      window.location.href = '/public/user-done/index-success.html';
    }).catch(function(err) {
      $('#J_submit').removeClass('weui-btn_loading weui-btn_disabled').prop('disabled', false);
      console.log(err);
    });
  }
}

const page = new UserDinner();

$('#J_submit').on('click', function() {
  const $this = $(this);
  page.submit();
  $this.addClass('weui-btn_loading weui-btn_disabled').prop('disabled', true);
});
