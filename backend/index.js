const { prisma } = require('./config.js')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/authRoutes.js')
const profileRoutes = require('./routes/profileRoutes.js')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080
const url = process.env.FRONTEND_URL

app.use(cors({
  origin:[`${url}`],
}))
app.use(bodyParser.json())

app.use('/auth', userRoutes)
app.use("/profile", profileRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app 