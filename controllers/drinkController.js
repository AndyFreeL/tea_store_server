const ApiError = require('../error/ApiError')
const db = require('../db')
const uuid = require('uuid')
const path = require('path')

class DrinkController {
    async create(req, res, next) {
        try {
            console.log('cre')
            let {name, price, subtypeId,img, typeId, info} = req.body
            // const {img} = req.files
            // let fileName = uuid.v4() + '.jpg'
            // img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const newDrink = await db.query(`INSERT INTO drink (name, price,img, subtype_id, type_id) values ($1, $2, $3, $4, $5) RETURNING *`, [name, price, img, subtypeId, typeId])

            if (info) {
                info = JSON.parse(info)
                console.log(info)
                info.forEach(i =>
                    db.query(`INSERT INTO drink_info (drink_id, title,description) values ($1, $2, $3) RETURNING *`, [newDrink.rows[0].id, i.title, i.description])
                )
            }

            return res.json(newDrink)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            let {typeId, subtypeId, limit, page} = req.query

            page = page || 1
            limit = limit || 9

            let offset = page * limit - limit

            let drinks;
            let drinksCount;
            if (!subtypeId && !typeId) {
                drinksCount = await db.query(`SELECT count(*) FROM drink`)
                drinks = await db.query(`SELECT * FROM drink LIMIT $1 OFFSET $2`, [limit, offset])
            }
            if (subtypeId && !typeId) {
                drinksCount = await db.query(`SELECT count(*) FROM drink where subtype_id = $1`, [subtypeId])
                drinks = await db.query(`SELECT * FROM drink where subtype_id = $1 LIMIT $2 OFFSET $3`, [subtypeId, limit, offset])
            }
            if (!subtypeId && typeId) {
                drinksCount = await db.query(`SELECT count(*) FROM drink where type_id = $1`, [typeId])
                drinks = await db.query(`SELECT * FROM drink where type_id = $1 LIMIT $2 OFFSET $3`, [typeId, limit, offset])
            }
            if (subtypeId && typeId) {
                drinksCount = await db.query(`SELECT count(*) FROM drink where type_id = $1 and subtype_id=$2`, [typeId, subtypeId])
                drinks = await db.query(`SELECT * FROM drink where type_id = $1 and subtype_id=$2 LIMIT $3 OFFSET $4`, [typeId, subtypeId, limit, offset])
            }

            drinks['count'] = drinksCount.rows[0].count
            return res.json(drinks)

        } catch (e) {
            console.log(e)
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const drink = await db.query(`SELECT * FROM drink where id=$1`, [id])
            const info = await db.query(`SELECT * FROM drink_info where drink_id=$1`, [id])
            drink.rows[0]['info'] = info.rows
            return res.json(drink.rows[0])
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteDrink(req, res, next) {
        try {
            const id = req.query.id
            const type = await db.query(`DELETE FROM drink where id = $1`, [id])
            res.json(type.rows)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new DrinkController()