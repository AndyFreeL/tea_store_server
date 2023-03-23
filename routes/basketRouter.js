const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, basketController.addToBasket)
router.get('/', authMiddleware, basketController.getBasketUser)
router.delete('/:id', authMiddleware, basketController.deleteBasket)

module.exports = router