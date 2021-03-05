const models = require('../../models'); //db 연결

//글 목록 조회
exports.get_issue_posts = async ( _ , res)=>{
    try{
        const lists = await models.Issue.findAll();
        res.render('posts/post.html',{lists});
    }catch(e){
        console.error(e);
    }
}

exports.get_issue_posts_write = (_,res)=>{
    res.render('posts/write.html');
}

exports.post_issue_posts_write = (req,res)=>{
    //전달 받은 내용을 DB에 저장하고
    models.Issue.create({
        title : req.body.title,
        brackets : req.body.brackets,
        description : req.body.description
    })
    .then(()=>{
        res.redirect('/posts/issue');
    })//다시 목록 페이지로
}

exports.get_issue_posts_detail = async (req,res)=>{
    try{
        const data = await models.Issue.findByPk(req.params.id); //id값으로 DB에서 데이터를 찾아서
        res.render('posts/detail.html',{data}); //detail page에 value 값으로 뿌려줌
    }catch(e){
        console.error(e);
    }
}

// //글 수정. write.html form 재사용. 클릭했을 때 작성했던 내용이 input 값 안에 들어있어야함
exports.get_issue_posts_edit = async (req,res)=>{
    try{
        const data = await models.Issue.findByPk(req.params.id);
        res.render('posts/write.html',{data}); //write.html 재활용. input 값 수정후 수정하기 버튼 누르면 같은 주소로 post방식으로 전달
    }catch(e){
        console.error(e);
    }
}
exports.post_issue_posts_edit = async (req,res)=>{
    try{
        //전달받은 값을 DB에 업데이트
        const {title,brackets,description} = req.body;
        models.Issue.update({
            //첫번 째 인자 : 수정할 내용을 키:value 형식으로 전달
            title,
            brackets,
            description
        },
            {
                where : {id : req.params.id}
            }
        )
        
        //수정 후 redirect
        res.redirect('/posts/issue/detail/'+req.params.id);
    }catch(e){
        console.error(e);
    }
}

//삭제
exports.get_issue_posts_delte = async (req,res)=>{
    try{
        models.Issue.destroy({
            where : {id : req.params.id}
        })
        res.redirect('/posts/issue/'); //주소 마지막에 /를 붙여줘야 refresh되는듯? 
    }catch(e){
        console.error(e);
    }
}
