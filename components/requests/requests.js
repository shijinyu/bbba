import ajax from '../ajax/ajax';

export const auditCooker = function(csid, audit) {
  return ajax({
    'type': 'POST',
    'url': window.__API_URL__ + '/api/cooker/detail',
    'data': {
      csid,
      audit
    }
  });
};
