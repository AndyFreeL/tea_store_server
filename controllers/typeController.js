const ApiError = require('../error/ApiError')
const db = require('../db')

class TypeController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            console.log(req.body)
            const type = await db.query(`INSERT INTO type (name) values ($1) RETURNING *`, [name])
            return res.json(type.rows[0])
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res, next) {
        try {
            const types = await db.query(`SELECT * FROM type`)
            res.json(types.rows)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async deleteType(req, res, next) {
        try {
            const id = req.query.id
            const type = await db.query(`DELETE FROM type where id = $1`, [id])
            res.json(type.rows)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new TypeController()