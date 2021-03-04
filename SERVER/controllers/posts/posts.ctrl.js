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
        const { id, edit } = req.params;
        const data = await models.Issue.findByPk(req.params.id);
        console.log("id edit",id,edit);

        if(edit){//글 수정. write.html form 재사용. 클릭했을 때 작성했던 내용이 input 값 안에 들어있어야함
            console.log("edit버전");
            res.render('posts/write.html',{data});
        }//edit===false면 그냥 글 상세정보 보여줌
        else{
            res.render('posts/detail.html',{data});
        }
    }catch(e){
        console.error(e);
    }
}

// //글 수정. write.html form 재사용. 클릭했을 때 작성했던 내용이 input 값 안에 들어있어야함
// exports.get_issue_posts_edit = async (req,res)=>{
//     try{
//         const data = await models.Issue.find
//     }catch(e){

//     }
// }
