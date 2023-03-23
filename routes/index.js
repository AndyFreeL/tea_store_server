const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const subtypeRouter = require('./subtypeRouter')
const drinkRouter = require('./drinkRouter')
const basketRouter = require('./basketRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/subtype', subtypeRouter)
router.use('/drink', drinkRouter)
router.use('/basket', basketRouter)

module.exports = router