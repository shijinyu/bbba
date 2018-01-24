import ajax from '../ajax/ajax';

export const auditCooker = function(csid, audit, reason = '') {
  return ajax({
    'type': 'POST',
    'url': window.__API_URL__ + '/api/cooker/detail',
    'data': {
      csid,
      audit,
      reason
    }
  });
};

export const cookerDetail = function(csid) {
  return ajax({
    'type': 'GET',
    'url': window.__API_URL__ + '/api/cooker/detail',
    'data': {
      csid
    }
  });
};
