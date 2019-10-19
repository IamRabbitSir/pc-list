var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');
var moment = require('moment');

/* GET users listing. */
router.get('/computer', function(req, res, next) {
    res.render('computer');
});
router.get('/getComputer', function(req, res, next) {
    userDao.queryAll(req,res,next);
});
router.get('/addComputer', function(req, res, next) {
    res.render('pc-add');
});
router.get('/editComputer', function(req, res, next) {
    res.render('pc-edit');
});

router.post('/getByid', function(req, res, next) {
    userDao.queryById(req,res,next);
});
router.post('/addPc', function(req, res, next) {
    userDao.add(req,res,next);
});
router.post('/editPc', function(req, res, next) {
    userDao.update(req,res,next);
});
router.post('/delPc', function(req, res, next) {
    userDao.delete(req,res,next);
});


router.get('/exportExcel', function(req, res, next) {

    var conf = {};
    //conf = userDao.query(callback);
    console.log(conf);
    var current_time =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    console.log(current_time);
    conf.stylesXmlFile = "设备盘点("+current_time+").xml";
    conf.name = "设备盘点清单";
    conf.cols = [{
        caption:'string',
        type:'string',
        beforeCellWrite:function(row, cellData){
            return cellData.toUpperCase();
        },
        width:28.7109375
    },{
        caption:'date',
        type:'date',
        beforeCellWrite:function(){
            var originDate = new Date(Date.UTC(1899,11,30));
            return function(row, cellData, eOpt){
                if (eOpt.rowNum%2){
                    eOpt.styleIndex = 1;
                }
                else{
                    eOpt.styleIndex = 2;
                }
                if (cellData === null){
                    eOpt.cellType = 'string';
                    return 'N/A';
                } else
                    return (cellData - originDate) / (24 * 60 * 60 * 1000);
            }
        }()
    },{
        caption:'bool',
        type:'bool'
    },{
        caption:'number',
        type:'number'
    }];
    conf.rows = [
        ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
        ["e", new Date(2012, 4, 1), false, 2.7182],
        ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
        ["null date", null, true, 1.414]
    ];
    var result = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    res.end(result, 'binary');

});



module.exports = router;
