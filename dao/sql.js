var pc_info = {
    insert:'insert into info(name,type,SNID,CPU,RAM,ROM,dept,username,belong,bz) values(?,?,?,?,?,?,?,?,?,?)',
    update:'update info set name=?,type=?,SNID=?,CPU=?,RAM=?,ROM=?,dept=?,username=?,belong=?,bz=? where id=?',
    delete:'delete from info where id=?',
    queryById:'select * from info where id=?',
    queryAll:'select * from info',
    queryByUser:'select * from info where username like ?'
};

module.exports = pc_info;