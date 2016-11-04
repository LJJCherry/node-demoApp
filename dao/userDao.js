/**
 * Created by ljj on 16/11/1.
 */
var mysql = require('mysql');
var conf = require('../conf/dbConf');
var sql = require('./userSqlMapping');

var pool = mysql.createPool(conf.mysql);

var jsonWrite = function (res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret);
  }
};

module.exports = {
  add: function (req, res, next) {
    pool.getConnection(function(err, connection) {
      var param = req.query || req.params ;

      connection.query(sql.insert, [param.name, param.age], function(err, result){
        if(result) {
          result = {
            code: 200,
            msg: '增加成功'
          }
        }

        jsonWrite(res, result);

        connection.release();
      })
    })
  },
  delete: function (req, res, next) {
    pool.getConnection(function(err, connection) {
       var id = Number(req.query.id);
       connection.query(sql.delete, id, function(err, result){
         if(result.affectedRows > 0){
           result = {
             code: 200,
             msg: '删除成功'
           }
         } else {
           result = void 0;
         }
         jsonWrite(res, result);
         connection.release();
       })
    })
  },
  update: function (req, res, next) {
    var param = req.body;
    if(param.name == null || param.age == null || param.id == null) {
      jsonWrite(res, undefined);
      return;
    }
    pool.getConnection(function(err, connection) {
      connection.query(sql.update, [param,name, param.age, number(param.id)],function(err, result) {
        if(result.affectedRows > 0) {
          res.render('suc', {
            result: result
          });
        } else {
          res.render('fail', {
            result: result
          })
        }
        connection.release();
      })
    })
  },
  queryAll: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      connection.query(sql.queryAll, function(err, result){
        jsonWrite(res, result);
        connection.release();
      })
    })
  }
};
