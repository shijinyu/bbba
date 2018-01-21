import '../../components/admin-lte/bootstrap3.scss';
import '../../components/font-awesome/scss/font-awesome.scss';
import '../../components/admin-lte/admin-lte.scss';
import '../../components/admin-lte/skin-blue.scss';
import './index.scss';

import $ from 'jquery';
import CookerList from '../../components/cooker-list/list';

class CookerPage {
  constructor() {
    this.rootId = 'J_table_wrapper';
    this.$root = $('#J_table_wrapper');
  }
  async init() {
    try {
      this.list = new CookerList(this.rootId);
      await this.list.render({ i: 0, type: 0 });
      this.list.html();
    } catch (err) {
      console.log(err);
      this.$root.html('FAILED GET DATA!');
    }
  }
}

const c = new CookerPage();
c.init();
