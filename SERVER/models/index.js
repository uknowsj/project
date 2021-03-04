var Sequelize = require('sequelize'); //Promise 패턴 기반의 Node.js ORM
var path = require('path'); //경로 구분하기 위한 모듈
var fs = require('fs'); //파일 처리 모듈. ex) 파일 읽기, 쓰기
var dotenv = require('dotenv');

dotenv.config(); //.env file을 읽고 콘텐츠 분리해서 process.env에 할당

//sequelize 인스턴스 생성
const sequelize = new Sequelize(
    process.env.DATABASE,process.env.DB_USER,process.env.DB_PASSWORD,
    {
        host : process.env.DB_HOST,
        dialect : 'mysql',//'mysql' | 'mariadb' | 'postgres' | 'mssql' 중에 하나 선택
        timezone : '+09:00', //한국시간 게시글 DATE 쓰려고
        operatorsAliases : Sequelize.Op, //query operators DB 조회위해?
        pool : { //DBCP. 다수의 http 요청에 대한 Thread 효율적 처리
            max : 5,
            min : 0,
            idle : 10000
        }
    });

let db = [];

fs.readdirSync(__dirname)
    .filter(file=>{//index.js를 제외한 파일을 읽고
        return file.indexOf('.js')&&file!=='index.js'
    })
    .forEach(file=>{
        var model = sequelize.import(path.join(__dirname,
            file));
            db[model.name] = model;
    });

Object.keys(db).forEach(modelName=>{
    if("associate" in db[modelName]){
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize; //sequelize 인스턴스 설정들을 넣어줌?
db.Sequelize = Sequelize;

module.exports =  db;