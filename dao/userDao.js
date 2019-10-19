//dao/userDao.js
//实现与mysql交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./sql');

//使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

//
var jsonWrite = function (res, result) {
    if(typeof result === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(result);
    }
};

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.body;
            // 建立连接，向表中插入值
            connection.query($sql.insert,[param.name, param.type, param.SNID, param.CPU, param.RAM, param.ROM,
                param.dept, param.username,param.belong,param.bz], function(err, result) {
                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);
                // 释放连接
                connection.release();
            });
        });
    },
    delete: function (req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            var id = req.body.id;
            //console.log("输出一个id"&id)
            connection.query($sql.delete, id, function(err, result) {
                if(result.affectedRows > 0 ) {
                    result = {
                        code: '200',
                        msg:'已删除'
                    };
                } else {
                    result = {
                        code: '???',
                        msg: '异常'
                    };
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    update: function (req, res, next) {
        // update by id
        var param = req.body;
        //console.log(param);
        //param.name, param.type, param.SNID, param.CPU, param.RAM, param.ROM, param.dept, param.username,param.belong,param.bz
        //console.log('param.name:   '+param.name);
        //console.log('param.type:   '+param.type);
        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.name, param.type, param.SNID,
                param.CPU, param.RAM, param.ROM,
                param.dept, param.username,param.belong,param.bz,param.id], function(err, result) {
                // 使用页面进行跳转提示
                //console.log(result.affectedRows);
                jsonWrite(res, result);
                connection.release();
            });
        });

    },
    queryById: function (req, res, next) {
        var id = req.param('id');
        //console.log(id);
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, id, function(err, result) {
                //var _result = JSON.stringify(result);
                //var data = JSON.parse(_result)
                //console.log(result);
                //res.render('pc-edit',result);
                jsonWrite(res, result);

                connection.release();
            });
        });
    },
    queryAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                var data = {
                    data:result,
                }
                jsonWrite(res, data);
                connection.release();
            });
        });
    },
    query: function (callback) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                callback(result);
            });
        });
    },

};
