import $ from 'jquery';
const tplCallout = (type, title, text) => `<div class="callout callout-${type}">
<h4>${title}</h4>
<p>${text}</p>
</div>
`;

const tplAlert = (id, type, title, text, isClosable) => {
  const tpl = [`<div class="alert alert-${type}" id="${id}">`,
    (isClosable ? '<button type="button" class="js-alert-close close">×</button>' : ''),
    '<h4><i class="icon fa fa-',
    (function() {
      switch (type) {
      case 'danger':
        return 'ban';
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      case 'succ':
      case 'success':
        return 'check';
      default:
        return '';
      }
    }()),
    `"></i>${title}</h4><p>${text}</p>
  </div>`].join('');
  return tpl;
};

class Alert {
  constructor(type, id, $wrapper) {
    this.type = type;
    this.$wrapper = $wrapper;
    this.id = id || ('J_alert' + (new Date()).getTime() + parseInt(Math.random() * 100, 10));
  }
  render(title, text, isClosable = false) {
    if (!this.$wrapper) {
      return ;
    }
    const $old = $('#' + this.id);
    if ($old.length) {
      $old.remove();
    }
    this.$wrapper.append(tplAlert(this.id, this.type, title, text, isClosable));
    this.$root = $('#' + this.id);
    if (isClosable) {
      this.$root.on('click', '.js-alert-close', function() {
        this.$root.remove();
      });
    }
  }
}

export const calloutError = function(title = '请求错误', text = '获取数据失败') {
  return tplCallout('danger', title, text);
};

export const calloutSucc = function(title = '提交成功', text = '您的操作已成功') {
  return tplCallout('success', title, text);
};

export const calloutWarning = function(title = '警告', text = '此操作可能会导致一个错误') {
  return tplCallout('warning', title, text);
};

export const calloutInfo = function(title = '信息', text = '') {
  return tplCallout('warning', title, text);
};

export class AlertError extends Alert {
  constructor(id, $wrapper) {
    super('danger', id, $wrapper);
  }
}

export class AlertWarning extends Alert {
  constructor(id, $wrapper) {
    super('warning', id, $wrapper);
  }
}

export class AlertSuccess extends Alert {
  constructor(id, $wrapper) {
    super('success', id, $wrapper);
  }
}

export class AlertInfo extends Alert {
  constructor(id, $wrapper) {
    super('info', id, $wrapper);
  }
}
