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
    return Issue;
};