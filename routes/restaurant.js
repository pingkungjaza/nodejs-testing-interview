const express = require('express')
const router = express.Router()
const crypto = require("crypto")
const restaurantController = require('../controllers')

router.get("/allTables", (req, res) => {
    res.status(200)
    res.send({ status: 'success', message: `Our restaurant has ${table.length} tables`, httpStatus: 200 })
})

router.post("/initialize-all-tables", (req, res) => restaurantController.initializeAllTables(req, res))
router.put("/reserve-tables", (req, res) => restaurantController.reserveTables(req, res))
router.put("/cancel-tables", (req, res) => restaurantController.cancelTables(req, res))

module.exports = router