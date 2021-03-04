//4.url과 미들웨어만 눈에띄게 실제 라우팅은 ctrl 부분에서
const { Router } = require('express');
const router = Router();
const ctrl = require('./posts.ctrl');

//이슈 게시판
router.get('/issue',ctrl.get_issue_posts); //전체 글 목록 조회

router.get('/issue/write',ctrl.get_issue_posts_write); //글 작성
router.post('/issue/write',ctrl.post_issue_posts_write); //작성한 내용 post로 보내기

router.get('/issue/detail/:id',ctrl.get_issue_posts_detail); //상세 글 보기

//write.html 재활용
router.get('/issue/edit/:id',ctrl_get_issue_posts_edit); //작성 글 수정창
router.post('/issue/edit/:id',ctrl_get_issue_posts_edit); //수정한 내용을 받아서 DB에 저장
// router.post('/issue/:id') 작성글 삭제
module.exports = router;
