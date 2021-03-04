//3.라우팅은 controllers부분에서 폴더별로 분류해서 정리
//각 폴더는 index.js와 name.ctrl.js 파일을 가짐
const { Router } = require('express');
const router = Router()

//posts 하위의 url은 posts 폴더 내 파일 참고
router.use('/posts',require('./posts'));
// router.use('/main',require('./main'));

module.exports = router;
