
import './modal.scss';
import $ from 'jquery';
const tpl = require('./modal.tpl.nj');

const defaultOpt = {
  'modal': {
    'type': 'default',
    'showClose': true,
    'title': '提示信息',
    'safe': true
  }
};

export default class Modal {
  constructor(id, opt) {
    this.id = `J_modal_${id}`;
    this.opt = $.extend(true, defaultOpt, {
      modal: opt
    });
    this.$body = $(document.body);
    this.render();
    this._bind();
  }
  _bind() {
    if (!this.$modal || !this.$modal.length) {
      return ;
    }
    const _this = this;
    this.$modal.on('click', '.js-modal-close', () => {
      _this.hide();
    });
  }
  render() {
    this.$body.append(`<div id="${this.id}" class="js-modal modal modal-${this.opt.modal.type} fade"></div>`);
    this.$modal = $('#' + this.id);
    this.$modal.html(tpl.render(this.opt));
  }
  update(newOpt) {
    this.opt = $.extend(true, {}, this.opt, { modal: newOpt });
    this.$modal.html(tpl.render(this.opt));
  }
  show() {
    this.$body.addClass('modal-open');
    this.$modal.show().addClass('in');
  }
  hide() {
    this.$body.removeClass('modal-open');
    this.$modal.removeClass('in').hide();
  }
}
