import $ from 'jquery';

export default function(opts) {
  return Promise.resolve($.ajax(
    $.extend(true, {}, {
      'crossDomain': true,
      'xhrFields': {
        'withCredentials': true
      }
    }, opts)
  ));
}
