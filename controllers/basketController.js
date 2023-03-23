const ApiError = require('../error/ApiError')
const db = require('../db')

class BasketController {
    async addToBasket(req, res, next) {
        try {
            const user = req.user
            const {drinkId} = req.body
            const basketId = await db.query(`SELECT * FROM basket where person_id = $1`,[user.id])
            const basket = await db.query(`INSERT INTO basket_drink (drink_id, basket_id) values ($1, $2) RETURNING *`, [drinkId, basketId.rows[0].id])
            return res.json(basket.rows[0])
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getBasketUser(req, res, next) {
        try {
            const {id} = req.user
            const basketId = await db.query(`SELECT id FROM basket where person_id = $1`,[id])

            const basket = await db.query(`SELECT * FROM drink WHERE id IN(Select drink_id from basket_drink Where basket_id = $1)`, [basketId.rows[0].id])

            const basket_item = await db.query(`SELECT id as item_id FROM basket_drink WHERE basket_id = $1`, [basketId.rows[0].id])

            for(let i=0; i < basket.rows.length; i++) {
                basket.rows[i].item_id = basket_item.rows[i].item_id
            }


            console.log(basket.rows)
            return res.json(basket)

        } catch (e) {
            console.log(e)
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteBasket(req, res, next) {
        try {

            const {id} = req.params
            const basket = await db.query(`DELETE FROM basket_drink where id=$1`, [id])
            console.log('!!!', basket.rows)
            return res.json(basket.rows)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BasketController()