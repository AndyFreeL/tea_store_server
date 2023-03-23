const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db')
require("dotenv").config();

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role} = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Email или пароль некорректны'))
            }
            const candidate = await db.query(`SELECT * FROM person WHERE email IN ($1)`, [email])
            if (candidate.rows.length > 0) {
                return next(ApiError.badRequest('пользователь с таким Email уже зарегестрирован'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await db.query(`INSERT INTO person (email, password, role) values ($1, $2, $3) RETURNING *`, [email, hashPassword, role])

            const basket = await db.query(`INSERT INTO basket (person_id) values ($1) RETURNING *`, [user.rows[0].id])
            const token = generateJwt(user.rows[0].id, user.rows[0].email, user.rows[0].role)
            return res.json({token})

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await db.query(`SELECT * FROM person WHERE email IN ($1)`, [email])
            if (user.rows[0].email !== email) {
                return next(ApiError.internal('Пользователь с таким email не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.rows[0].password)
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }
            const token = generateJwt(user.rows[0].id, user.rows[0].email, user.rows[0].role)
            return res.json({token})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async auth(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role)
            return res.json({token})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()