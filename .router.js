function setRouter(app){ 
 var router = app; 

//假设域名是localhost, 端口是8080


/**
 * 当 http://localhost:8080/api/cooker/list 的GET请求到来时被下面匹配到进行处理
 * 通过req.query获取请求的参数对象
 * 通过 req.send发送响应
 */

 router.use(function(req, res, next){
  const { origin, host } = req.headers;
  let allowOrigin = origin ? origin : `http://${host}`;
  res.setHeader('Access-Control-Allow-Origin',allowOrigin);
  res.setHeader('Access-Control-Allow-Methods','OPTIONS,GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Credentials','true');
  next();
 });

const cookerlist = [
  {
    "csid": "0001",
    "cs_name": "李大厨",
    "cs_sex": "男",
    "cs_birth": "1987-08-28",
    "cs_tel": "187928362873",
    "cs_idnum": "341217198708280916",
    "cs_edu": "大专",
    "cs_other_job": "工人",
    "cs_work_time": "3",
    "cs_adress": "蚌埠市蚌山区胜利路71号凤阳小区7幢402",
    "cs_is_halal": "0",
    "cs_act_range": "蚌埠市蚌山区宏业村",
    "cs_health_id": "201709091987083012",
    "cs_health_valiable": "1",
    "cs_train": "培训完成"
  },
  {
    "csid": "0002",
    "cs_name": "食在天",
    "cs_sex": "男",
    "cs_birth": "1989-01-78",
    "cs_tel": "187928362873",
    "cs_idnum": "341512198901270934",
    "cs_edu": "中专",
    "cs_other_job": "",
    "cs_work_time": "1",
    "cs_adress": "蚌埠市龙子湖区北京路1号高铁小区1幢311",
    "cs_is_halal": "0",
    "cs_act_range": "蚌埠市蚌山区宏业村",
    "cs_health_id": "201549091987083012",
    "cs_health_valiable": "1",
    "cs_train": "培训完成"
  },
  {
    "csid": "0001",
    "cs_name": "李大厨",
    "cs_sex": "男",
    "cs_birth": "1987-08-28",
    "cs_tel": "187928362873",
    "cs_idnum": "341217198708280916",
    "cs_edu": "大专",
    "cs_other_job": "工人",
    "cs_work_time": "3",
    "cs_adress": "蚌埠市蚌山区胜利路71号凤阳小区7幢402",
    "cs_is_halal": "0",
    "cs_act_range": "蚌埠市蚌山区宏业村",
    "cs_health_id": "201549091987083012",
    "cs_health_valiable": "1",
    "cs_train": "培训完成"
  },
  {
    "csid": "0002",
    "cs_name": "食在天",
    "cs_sex": "男",
    "cs_birth": "1989-01-78",
    "cs_tel": "187928362873",
    "cs_idnum": "341512198901270934",
    "cs_edu": "中专",
    "cs_other_job": "",
    "cs_work_time": "1",
    "cs_adress": "蚌埠市龙子湖区北京路1号高铁小区1幢311",
    "cs_is_halal": "0",
    "cs_act_range": "蚌埠市蚌山区宏业村",
    "cs_health_id": "201549091987083012",
    "cs_health_valiable": "1",
    "cs_train": "培训完成"
  },
  {
    "csid": "0001",
    "cs_name": "李大厨",
    "cs_sex": "男",
    "cs_birth": "1987-08-28",
    "cs_tel": "187928362873",
    "cs_idnum": "341217198708280916",
    "cs_edu": "大专",
    "cs_other_job": "工人",
    "cs_work_time": "3",
    "cs_adress": "蚌埠市蚌山区胜利路71号凤阳小区7幢402",
    "cs_is_halal": "0",
    "cs_act_range": "蚌埠市蚌山区宏业村",
    "cs_health_id": "201549091987083012",
    "cs_health_valiable": "1",
    "cs_train": "培训完成"
  },
  {
    "csid": "0002",
    "cs_name": "食在天",
    "cs_sex": "男",
    "cs_birth": "1989-01-78",
    "cs_tel": "187928362873",
    "cs_idnum": "341512198901270934",
    "cs_edu": "中专",
    "cs_other_job": "",
    "cs_work_time": "1",
    "cs_adress": "蚌埠市龙子湖区北京路1号高铁小区1幢311",
    "cs_is_halal": "0",
    "cs_act_range": "蚌埠市蚌山区宏业村",
    "cs_health_id": "201549091987083012",
    "cs_health_valiable": "1",
    "cs_train": "培训完成"
  },
  {
    "csid": "0001",
    "cs_name": "李大厨",
    "cs_sex": "男",
    "cs_birth": "1987-08-28",
    "cs_tel": "187928362873",
    "cs_idnum": "341217198708280916",
    "cs_edu": "大专",
    "cs_other_job": "工人",
    "cs_work_time": "3",
    "cs_adress": "蚌埠市蚌山区胜利路71号凤阳小区7幢402",
    "cs_is_halal": "0",
    "cs_act_range": "蚌埠市蚌山区宏业村",
    "cs_health_id": "201549091987083012",
    "cs_health_valiable": "1",
    "cs_train": "培训完成"
  },
  {
    "csid": "0002",
    "cs_name": "食在天",
    "cs_sex": "男",
    "cs_birth": "1989-01-78",
    "cs_tel": "187928362873",
    "cs_idnum": "341512198901270934",
    "cs_edu": "中专",
    "cs_other_job": "",
    "cs_work_time": "1",
    "cs_adress": "蚌埠市龙子湖区北京路1号高铁小区1幢311",
    "cs_is_halal": "0",
    "cs_act_range": "蚌埠市蚌山区宏业村",
    "cs_health_id": "201549091987083012",
    "cs_health_valiable": "1",
    "cs_train": "培训完成"
  },
  {
    "csid": "0001",
    "cs_name": "李大厨",
    "cs_sex": "男",
    "cs_birth": "1987-08-28",
    "cs_tel": "187928362873",
    "cs_idnum": "341217198708280916",
    "cs_edu": "大专",
    "cs_other_job": "工人",
    "cs_work_time": "3",
    "cs_adress": "蚌埠市蚌山区胜利路71号凤阳小区7幢402",
    "cs_is_halal": "0",
    "cs_act_range": "蚌埠市蚌山区宏业村",
    "cs_health_id": "201549091987083012",
    "cs_health_valiable": "1",
    "cs_train": "培训完成"
  },
  {
    "csid": "0002",
    "cs_name": "食在天",
    "cs_sex": "男",
    "cs_birth": "1989-01-78",
    "cs_tel": "187928362873",
    "cs_idnum": "341512198901270934",
    "cs_edu": "中专",
    "cs_other_job": "",
    "cs_work_time": "1",
    "cs_adress": "蚌埠市龙子湖区北京路1号高铁小区1幢311",
    "cs_is_halal": "0",
    "cs_act_range": "蚌埠市蚌山区宏业村",
    "cs_health_id": "201549091987083012",
    "cs_health_valiable": "1",
    "cs_train": "培训完成"
  }
].map((item,index) => {
  return Object.assign({},item,{
    'csid': `c${parseInt(Math.random()*9000 + 1000,10)}${index}`
  })
});

let _list = [...cookerlist];

const makeList = (type) => {
  let _list;
  switch(type){
    case '1':
      _list = cookerlist.map((item) => {
        return {
          cs_status: 1,
          ...item
        };
      });
      break;
    case '2':
      _list = cookerlist.map((item) => {
        return {
          cs_status: 2,
          cs_reason: '健康体检存在问题',
          ...item
        };
      });
      break;
    case '3':
      _list = cookerlist.map((item) => {
        return {
          cs_status: 3,
          ...item
        };
      });
      break;
    default:
      _list = cookerlist.map((item) => {
        const s = parseInt(Math.random()*3 + 1,10);
        const r =  {
          cs_status: s,
          ...item
        };
        s === 2 && (r.cs_reason = '未提交相关材料');
        return r;
      });
  }
  return _list;
}

/**
 * @desc 厨师审核列表
 * @constant pageCount 10 每页固定返回十条数据
 * @param i 页码，从0开始
 * @param type 类型，0 全部类型 1 已通过 2 未通过 3 待审核
 */
router.get('/api/cooker/list', function(req, res) {
	const {
    i,
    type,
  } = req.query; // 通过 req.query获取请求参数
  _list = makeList(type);
	const data = {
    status: {
      code: '0',
      msg: 'OK'
    },
    data: {
      index: parseInt(i),
      total: 3,
      type,
      list: (i < 3 ? _list : [])
    }
  };
  res.send(data);
})

/**
 * @desc 厨师审核详情
 * @param csid 厨师 csid 号
 */
router.get('/api/cooker/detail', function(req, res){
  const { csid } = req.query;
  if(!csid){
    res.send(400,{
      status: {
        code: '-1',
        msg: 'param csid was required.'
      },
      data: null
    });
  } else {
    const data = {
      status: {
        code: '0',
        msg: 'OK'
      },
      data: _list.find(item => {
        return item.csid == csid;
      })
    };
    res.send(data);
  }

})

router.post('/api/cooker/detail', function(req, res){
  const { csid, audit } = req.body;
  console.log(csid, audit);
  if(!csid || !audit){
    res.send(400,{
      status: {
        code: '-1',
        msg: 'param csid was required.'
      },
      data: null
    });
  } else {
    const _list = makeList();
    const data = {
      status: {
        code: 0,
        msg: 'OK'
      }
    };
    if (audit == 0) {
      if (!req.body.reason) {
        data.status = {
          code: -1,
          msg: 'Require a reason.'
        };
        res.send(401,data);
        return ;
      }
    }
    data.data = audit == 1 ? 'AUDIT SUCCESS' : 'AUDIT ERROR';
    res.send(data);
  }

});

router.post('/update/cooker/new', function(req, res){
  console.log(req.body);
  res.send({
    code: 0,
    msg: 'SUCCESS'
  })
});

/**
 * 当 http://localhost:8080/comment 的GET请求到来时被下面匹配到进行处理
 * 通过req.body获取post请求的参数对象
 * 通过 req.send发送响应
 */
router.post('/comment', function(req, res) {
  console.log(req.body.comment) // 可通过req.body获取 post 提交的参数
  res.send({status: 'ok'})
})

/**
 * 使用 router.use可处理所有类型的请求
*/
router.use('/hello', (req, res)=>{
  res.send('world')
})


/**
 * 设置 header 可以处理跨域请求
*/
router.use('/hi', (req, res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.send('world')
})

}
 module.exports.setRouter = setRouter