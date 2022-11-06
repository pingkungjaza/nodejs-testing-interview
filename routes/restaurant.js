const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers')

router.get("/tables", (req, res) => restaurantController.getTables(req, res))
router.post("/initialize", (req, res) => restaurantController.initialize(req, res))
router.put("/reserve", (req, res) => restaurantController.reserve(req, res))
router.put("/cancel", (req, res) => restaurantController.cancel(req, res))

module.exports = router