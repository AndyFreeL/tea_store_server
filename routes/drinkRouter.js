const Router = require('express')
const router = new Router()
const drinkController = require('../controllers/drinkController')

router.post('/', drinkController.create)
router.get('/', drinkController.getAll)
router.get('/:id', drinkController.getOne)

module.exports = router