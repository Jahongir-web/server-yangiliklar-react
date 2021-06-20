const router = require('express').Router()

const newsCtrl = require('../controllers/news')

router.get('/', newsCtrl.all)

router.get('/news', newsCtrl.views)

router.post('/news/like', newsCtrl.addLike)

router.post('/news/like1', newsCtrl.changeLike)

router.post('/news/like2', newsCtrl.delLike)

router.post('/news/dislike', newsCtrl.addDislike)

router.post('/news/dislike1', newsCtrl.changeDislike)

router.post('/news/dislike2', newsCtrl.delDislike)

router.get('/search', newsCtrl.search)

router.get('/category', newsCtrl.category)
  


module.exports = router