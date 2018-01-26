import $ from 'jquery';

const address = {
  'contry': ['蚌山区', '龙子湖区', '禹会区', '淮上区', '经开区', '怀远县', '固镇县', '五河县', '凤阳县'],
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
      'datas': ['朝阳社区', '秀水社区', '迎淮社区', '张公山社区', '金域社区', '大庆社区', '锦绣社区', '钓鱼台社区', '喜迎门社区', '长青乡', '马城镇']
    },
    {
      'belong': '淮上区',
      'datas': ['小蚌埠镇', '吴小街镇', '曹老集镇', '梅桥镇', '沫河口镇']
    },
    {
      'belong': '经开区',
      'datas': ['淮河社区中心', '湖滨社区中心', '胜利街道', '龙湖新村街道', '长淮卫镇']
    },
    {
      'belong': '怀远县',
      'datas': ['荆山镇', '榴城镇', '包集镇', '龙亢镇', '河溜镇', '双桥集镇', '魏庄镇', '万福镇', '唐集镇', '白莲坡镇', '古城镇', '褚集镇', '陈集镇', '淝南镇', '淝河乡', '徐圩乡', '兰桥乡']
    },
    {
      'belong': '固镇县',
      'datas': ['城关镇', '王庄镇', '新马桥镇', '连城镇', '刘集镇', '任桥镇', '湖沟镇', '濠城镇', '石湖乡', '杨庙乡', '仲兴乡', '固镇经济开发区']
    },
    {
      'belong': '五河县',
      'datas': ['城关镇', '新集镇', '小溪镇', '双忠庙镇', '小圩镇', '东刘集镇', '头铺镇', '大新镇', '武桥镇', '朱顶镇', '浍南镇', '申集镇', '沱湖乡', '临北乡']
    },
    {
      'belong': '凤阳县',
      'datas': []
    }
  ]
};

const setAddress = function($addr1, $addr2, $hidden) {
  $addr1.html((function() {
    const opts = ['<option value="" selected>---请选择---</option>'];
    address.contry.forEach(function(item) {
      opts.push(`<option value="${item}">${item}</option>`);
    });
    return opts;
  }()));
  $addr1.on('change', function() {
    const $this = $(this);
    const val = $this.val();
    const index = address.contry.indexOf(val);
    console.log(index);
    if ($hidden) {
      $hidden.val(index);
    }
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
