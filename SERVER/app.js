//2.express 관련 처리
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const db = require('./models');


class App{
    constructor(){
        this.app = express();
        // db 접속
        this.dbConnection();

        // 뷰엔진 셋팅
        this.setViewEngine();

        // 미들웨어 셋팅
        this.setMiddleWare();

        // 정적 디렉토리 추가
        this.setStatic();

        // 로컬 변수
        // this.setLocals();

        // 라우팅
        this.getRouting();

        // 404 페이지를 찾을수가 없음
        this.status404();

        // 에러처리
        this.errorHandler();

    }

    dbConnection(){
        //DB authentication : Testing the connection
        db.sequelize.authenticate() //authenticate는 promise 객체를 반환해줌
        .then(()=>{
            console.log('Connection has been established successfully.')
        })
        .catch(err=>{
            console.error('Unable to connect to the database:', err);
        })
    }

    setMiddleWare(){
        //미들웨어 셋팅
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false}));
    }

    setViewEngine(){
        nunjucks.configure('template', {
            autoescape: true,
            express: this.app
        });
    }
    
    setStatic(){
        this.app.use('/uploads',express.static('uploads'));
    }
    
    // setLocals(){
    //     //템플릿 변수
    //     this.app.use((req,res,next)=>{
    //     this.app.locals.isLogin = true;
    //         this.app.locals.req_path=req.path;
    //         next();
    //     })
    // }

    getRouting(){
        this.app.use(require('./controllers'));
    }

    status404(){
        this.app.use((err,req,res,_)=>{
            res.status(404).render('common/404.html');
        });
    }

    errorHandler(){
        this.app.use((err,req,res, _ )=>{
            console.log(err);
            res.status(500).render('common/500.html');
        });
    }
}


//인스턴스 생성하면서 내보내기
module.exports = new App().app; 