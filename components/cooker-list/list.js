import $ from 'jquery';
import ajax from '../ajax/ajax';

require('./list.scss');
const tpl = require('./list.tpl.nj');

import loading from '../loading/loading';
import tplError from '../callout-error/callout-error';
import { auditCooker } from '../requests/requests';

const htmlAuditSuccTd = '<span class="text-success"><i class="fa fa-check"></i> 已通过</span>';
const htmlAuditFailTd = csid => `<button type="button" data-csid="${csid}" class="js-show-reason btn btn-xs btn-warning">查看原因</button>`;
export default class CookerList {
  constructor(id) {
    this.param = {
      i: 0,
      type: 0
    };
    this.listData = {};
    this._tpl = loading();
    this.id = id;
    this.$root = $('#' + id);
    this._bind();
  }
  async render(params = {}) {
    try {
      await this.fetch(params);
      this._tpl = tpl.render({ data: this.listData });
    } catch (err) {
      this._tpl = tplError('请求错误', `错误号：${err.code},${err.message}`);
    }
    return this._tpl;
  }
  fetch(params) {
    this.param = $.extend({}, this.param, params);
    return ajax({
      'type': 'GET',
      'url': window.__API_URL__ + '/api/cooker/list',
      'data': this.param
    }).then(res => {
      this.listData = res.data;
    }).catch(error => {
      this.listData = {};
      this.error = error;
    });
  }
  auditSucc(csid) {
    return auditCooker(csid, 1);
  }
  auditError(csid) {
    return auditCooker(csid, 0);
  }
  _bind() {
    const _this = this;
    const { $root } = this;
    $root.on('click', '.js-btn-type', async function() {
      const $this = $(this);
      const type = parseInt($this.attr('data-type'), 10);
      $root.html(loading());
      await _this.render({
        i: 0,
        type
      });
      _this.html();
    });
    $root.on('click', '.js-audit-succ', async function() {
      const $this = $(this);
      const csid = $this.attr('data-csid');
      const $td = $('#J_item_' + csid);
      let result;
      _this._loading(true);
      try {
        result = await _this.auditSucc(csid);
        if (!result.status.code) {
          _this._loading(false);
          $td.html(htmlAuditSuccTd);
        }
      } catch (e) {
        _this._loading(false);
      }
    });
    $root.on('click', '.js-audit-fail', async function() {
      const $this = $(this);
      const csid = $this.attr('data-csid');
      const $td = $('#J_item_' + csid);
      let result;
      _this._loading(true);
      try {
        result = await _this.auditError(csid);
        if (!result.status.code) {
          _this._loading(false);
          $td.html(htmlAuditFailTd(csid));
        }
      } catch (e) {
        _this._loading(false);
      }
    });
  }
  _loading(isLoading = true) {
    if (isLoading) {
      this.$root.find('.js-loading').show();
    } else {
      this.$root.find('.js-loading').hide();
    }
  }
  html() {
    this.$root.html(this._tpl);
    return this._tpl;
  }
}