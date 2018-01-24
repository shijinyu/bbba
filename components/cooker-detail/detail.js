import $ from 'jquery';

require('./detail.scss');
const tpl = require('./detail.tpl.nj');

import { cookerDetail } from '../requests/requests';
import { calloutError } from '../tip/tip';

export default class CookerDetail {
  constructor(csid) {
    this.csid = csid;
    this.$root = $('#J_content_wrapper');
    this._tpl = '';
  }
  async init() {
    let result, data;
    try {
      result = await cookerDetail(this.csid);
      data = result.data;
      this._tpl = tpl.render({
        'cooker': data
      });
      console.log(data, this._tpl);
    } catch (err) {
      this._tpl = calloutError('请求错误', `错误号：${err.code},${err.message}`);
    } finally {
      this.render();
    }
  }
  render() {
    console.log(this.$root);
    this.$root.html(this._tpl);
  }
}
