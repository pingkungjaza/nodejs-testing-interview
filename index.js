const express = require('express')
const router = require('./routes/restaurant')
const app = express()

app.use(router)
app.listen(8080, () => console.log("run server at port 8080"))