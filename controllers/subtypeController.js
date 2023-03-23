const ApiError = require('../error/ApiError')
const db = require('../db')

class SubtypeController{
    async create(req, res, next){
        try {
            const {name, type_id} = req.body
            const type = await db.query(`INSERT INTO subtype (name, type_id) values ($1, $2) RETURNING *`, [name, type_id])
            return res.json(type.rows[0])
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res, next) {
        try {
            const types = await db.query(`SELECT * FROM subtype`)
            res.json(types.rows)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async deleteSubtype(req, res, next) {
        try {
            const id = req.query.id
            const type = await db.query(`DELETE FROM subtype where id = $1`, [id])
            res.json(type.rows)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new SubtypeController()