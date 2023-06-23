const Pool = require('pg').Pool
const pool = new Pool({
    user:'teaman',
    password:'nXoHa1zceaH9WBRzXsvZLktY9oIuFVVs',
    host:'dpg-cialfgp5rnupq1orrif0-a.frankfurt-postgres.render.com',
    port:5432,
    database:'teastore',
    ssl: true
})

module.exports = pool