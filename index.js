require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const fileUpload = require('express-fileupload')
const path = require('path')
const errorHandler = require('./middleware/ErrorHandlerMiddleware')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json()) // для парсинга json
app.use(express.static(path.resolve(__dirname, 'static'))) // вызов статики
app.use(fileUpload({})) // для выгрузки файлов
app.use('/api', router)

// Обработка ошибок, last Middleware
app.use(errorHandler)

app.listen(PORT, ()=>console.log(`server started on port: ${PORT}`))