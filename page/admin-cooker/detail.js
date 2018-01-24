import '../../components/admin-lte/bootstrap3.scss';
import '../../components/font-awesome/scss/font-awesome.scss';
import '../../components/admin-lte/admin-lte.scss';
import '../../components/admin-lte/skin-blue.scss';
import './detail.scss';

import $ from 'jquery';
import getParamsString from '../../components/params/params';
import CookerDetail from '../../components/cooker-detail/detail';
import { AlertError } from '../../components/tip/tip';

class CookerDetailPage {
  constructor() {
    this.csid = getParamsString('csid');
    this.$root = $('#J_content_wrapper');
    this.errorTip = new AlertError('content', this.$root);
    this.cooker = new CookerDetail(this.csid);
  }
  init() {
    this.csid = getParamsString('csid');
    if (!this.csid) {
      this.$root.html('');
      this.errorTip.render('数据错误', '缺少参数：csid');
      return ;
    }
    this.cooker.init();
  }
}

const page = new CookerDetailPage();
page.init();
