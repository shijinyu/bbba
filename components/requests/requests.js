import ajax from '../ajax/ajax';

export const auditCooker = function(csid, audit, reason = '') {
  return ajax({
    'type': 'POST',
    'url': window.__API_URL__ + '/index.php?m=admin&c=cs&a=audit',
    'data': {
      csid,
      audit,
      reason
    }
  });
};

export const cookerDetail = function(csid) {
  return ajax({
    'type': 'POST',
    'url': window.__API_URL__ + '/index.php?m=admin&c=cs&a=detail',
    'data': {
      csid
    }
  });
};
