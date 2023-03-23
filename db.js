const Pool = require('pg').Pool
const pool = new Pool({
    user:'teaman',
    password:'LffxTMx6sI7LELp2rAcI5m7qLJwriqDb',
    host:'dpg-cf4feqo2i3mtifl0ap60-a.frankfurt-postgres.render.com',
    port:5432,
    database:'tea_store',
    ssl: true
})

module.exports = pool