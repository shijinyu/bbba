import 'amfe-flexible';
import '../../components/admin-lte/bootstrap3.scss';
import 'weui';
// import weui from 'weui.js';
import $ from 'jquery';
import './index.scss';
import '../../components/user-style/base';
import ajax from '../../components/ajax/ajax';

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
  },
  {
    'name': 'cs_vcode',
    'rules': 'required',
    'display': '请输入验证码'
  }
];

const address = {
  'contry': ['蚌山区', '龙子湖区', '禹会区', '怀远县', '固镇县', '五河县', '凤阳县'],
  'street': [
    {
      'belong': '蚌山区',
      'datas': ['天桥街道', '青年街道', '纬二路街道', '黄庄街道', '雪华乡', '宏业村街道', '燕山乡', '蚌埠经济开发区', '胜利街道', '龙湖新村街道', '湖滨社区', '淮河社区']
    },
    {
      'belong': '龙子湖区',
      'datas': ['东风街道', '延安街道', '治淮街道', '东升街道', '解放街道', '曹山街道', '长淮卫镇', '李楼乡']
    },
    {
      'belong': '禹会区',
      'datas': ['朝阳街道', '纬四街道', '大庆街道', '张公山街道', '钓鱼台街道', '秦集镇', '长青乡', '蚌埠高新技术开发区']
    },
    {
      'belong': '怀远县',
      'datas': ['朝阳街道', '纬四街道', '大庆街道', '张公山街道', '钓鱼台街道', '秦集镇', '长青乡', '蚌埠高新技术开发区']
    },
    {
      'belong': '固镇县',
      'datas': ['朝阳街道', '纬四街道', '大庆街道', '张公山街道', '钓鱼台街道', '秦集镇', '长青乡', '蚌埠高新技术开发区']
    },
    {
      'belong': '五河县',
      'datas': ['朝阳街道', '纬四街道', '大庆街道', '张公山街道', '钓鱼台街道', '秦集镇', '长青乡', '蚌埠高新技术开发区']
    },
    {
      'belong': '凤阳县',
      'datas': []
    }
  ]
};

class UserCooker {
  constructor() {
    this.$form = $('#J_form');
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
    // console.log(this.validator);
    const $addr2 = $('#J_cs_address_2');
    $('#J_cs_address_1').on('change', function() {
      const $this = $(this);
      const val = $this.val();
      const index = address.contry.indexOf(val);
      console.log(index);
      $addr2.html((function() {
        let opts = ['<option value="" selected>---请选择---</option>'];
        if (address.street[index].datas) {
          opts = address.street[index].datas.map(function(item) {
            return `<option value="${item}">${item}</option>`;
          });
          return opts.join('');
        }
        return '';
      }()));
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
      url: window.__API_URL__ + '/update/cooker/new',
      type: 'POST',
      data: JSON.stringify(f)
    }).then(function(res) {
      console.log(res);
      $('#loadingToast').fadeOut(500);
    }).catch(function(err) {
      $('#J_submit').removeClass('weui-btn_loading weui-btn_disabled').prop('disabled', false);
      console.log(err);
    });
  }
}

const page = new UserCooker();

$('#J_submit').on('click', function() {
  const $this = $(this);
  page.submit();
  $this.addClass('weui-btn_loading weui-btn_disabled').prop('disabled', true);
});
