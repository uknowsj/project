const moment = require('moment');

module.exports = function(sequelize, DataTypes){
    const Issue = sequelize.define('Issue',
        {
            id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            title : { type: DataTypes.STRING },
            brackets : { type: DataTypes.STRING },
            description : { type: DataTypes.TEXT }
            
        }    
    );
    //프로토타입에 date format을 바꿔주는 메소드 생성
    Issue.prototype.dateFormat = (date)=>moment(date).format('YYYY-MM-DD');
    return Issue;
};