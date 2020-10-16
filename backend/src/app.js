const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const middlewares = require('./middlewares')
const gabsip = require('./routes/logs')

const app = express()
app.use(express.json())
app.use(morgan('common'))
app.use(helmet())
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Testing' })
})

app.use('/gabsip/logs', gabsip)

app.use(middlewares.notFound)
app.use(middlewares.errHandler)

const port = process.env.PORT || 2112

mongoose.connect(
    process.env.DB_CONNECTION,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    () => console.log('connected to database')
);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})