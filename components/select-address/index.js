import $ from 'jquery';

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

const setAddress = function($addr1, $addr2) {
  $addr1.on('change', function() {
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
};

export default setAddress;
