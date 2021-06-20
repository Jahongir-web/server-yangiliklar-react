const router = require('express').Router()

const adminCtrl = require('../controllers/admin')

router.put('/news', adminCtrl.changeTitle)

router.put('/news/content', adminCtrl.changeContent)

router.put('/news/images', adminCtrl.changeImg)

router.delete('/news/delete', adminCtrl.deleteNews)

router.post('/admin', adminCtrl.addNews)


module.exports = router