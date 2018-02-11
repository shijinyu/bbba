import $ from 'jquery';
import ajax from '../ajax/ajax';

require('./list.scss');
const tpl = require('./list.tpl.nj');

import loading from '../loading/loading';
import { calloutError } from '../tip/tip';
import Modal from '../modals/modal';
import { auditCooker, cookerDetail } from '../requests/requests';

const htmlAuditSuccTd = '<span class="text-success"><i class="fa fa-check"></i> 已通过</span>';
const htmlAuditFailTd = csid => `<button type="button" data-csid="${csid}" class="js-show-reason btn btn-xs btn-warning">查看原因</button>`;
const modalDetail = (csid, name, text) => `<p>编号：${csid}</p>
<p>姓名：${csid}</p>
<p>未通过原因：${text}</p>`;
const modalWriteDetail = {
  'body': `<section class="box collapsed-box">
  <div id="J_reaon_loading" class="overlay" style="display: none"><i class="fa fa-refresh fa-spin"></i></div>
  <textarea class="write-detail form-control" id="J_ta_write_reason" placeholder="请输入不通过理由..."></textarea></section>`,
  'footer': csid => `
  <button type="button" class="js-modal-close btn btn-default pull-left">关闭</button>
  <button type="button" data-csid="${csid}" class="js-submit-reason btn btn-primary">提交</button>
  `
};
const modalLoading = loading('', '正在载入...', 'loading-modal');

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
    this.modalReason = new Modal('reason', {
      'type': 'default',
      'title': '不通过原因',
      'body': modalLoading,
      'footer': '<button type="button" class="js-modal-close btn btn-outline pull-left">关闭</button>'
    });
    this.writeReason = new Modal('write_reason', {
      'extraClass': 'write_reason',
      'type': 'default',
      'title': '填写不通过原因',
      'body': modalWriteDetail.body,
      'footer': modalWriteDetail.footer('')
    });
    this._bind();
  }
  async render(params = {}) {
    try {
      await this.fetch(params);
      this._tpl = tpl.render({ data: this.listData });
    } catch (err) {
      this._tpl = calloutError('请求错误', `错误号：${err.code},${err.message}`);
    }
    return this._tpl;
  }
  fetch(params) {
    this.param = $.extend({}, this.param, params);
    return ajax({
      'type': 'GET',
      'url': window.__API_URL__ + '/index.php?m=admin&c=cs&a=index',
      'data': this.param
    }).then(res => {
      this.listData = res.data;
    }).catch(error => {
      this.listData = {};
      this.error = error;
      if (error) {
        console.log(error, error.code);
      }
    });
  }
  auditSucc(csid) {
    return auditCooker(csid, 1);
  }
  auditError(csid, reason) {
    return auditCooker(csid, 0, reason);
  }
  _bind() {
    const _this = this;
    const { $root } = this;
    const $modalWr = $('#J_modal_write_reason');
    $root.on('click', '.js-btn-type', async function() {
      const $this = $(this);
      const type = parseInt($this.attr('data-type'), 10);
      $root.html(loading());
      await _this.render({
        i: 0,
        type
      });
      _this.html();
    }).on('click', '.js-audit-succ', async function() {
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
    }).on('click', '.js-audit-fail', async function() {
      const $this = $(this);
      const csid = $this.attr('data-csid');
      _this.writeReason.update({
        'body': modalWriteDetail.body,
        'footer': modalWriteDetail.footer(csid)
      });
      _this.writeReason.show();
    }).on('click', '.js-show-reason', async function() {
      const $this = $(this);
      const csid = $this.attr('data-csid');
      _this.modalReason.update({
        'body': modalLoading
      });
      _this.modalReason.show();
      let result, data;
      try {
        result = await cookerDetail(csid);
        data = result.data;
        _this.modalReason.update({
          'body': modalDetail(data.csid, data.cs_name, data.cs_reason)
        });
      } catch (e) {
        _this.modalReason.update({
          'body': `<p>获取原因失败：${e.status}, ${e.message}</p>`
        });
      }
    });
    $modalWr.on('click', '.js-submit-reason', async function() {
      const $this = $(this);
      const csid = $this.attr('data-csid');
      const $taReason = $('#J_ta_write_reason');
      const $loadingReason = $('#J_reaon_loading');
      const $td = $('#J_item_' + csid);
      let result;
      $loadingReason.show();
      $modalWr.find('button').prop('disabled', true);
      try {
        result = await _this.auditError(csid, $taReason.val());
        if (!result.status.code) {
          $loadingReason.hide();
          $td.html(htmlAuditFailTd(csid));
          _this.writeReason.hide();
        }
      } catch (err) {
        console.log(err);
        _this.writeReason.update({
          'body': calloutError('请求错误', `错误号：${err.code},${err.message}`),
          'footer': ''
        });
      } finally {
        $loadingReason.hide();
        $modalWr.find('button').prop('disabled', false);
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
