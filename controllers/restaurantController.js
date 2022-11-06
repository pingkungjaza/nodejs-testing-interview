const crypto = require("crypto")
const data = require('../database')
const response = require('../utils')

const getRemainingTables = () => data.table.filter((value) => value.bookingId === null).length

const restaurantController = {
    initialize: (req, res) => {
        if (data.isInitialize) {
            response.returnResponse(res, 400, { status: 'error', message: 'Tables are initialized!', httpStatus: 400 })
            return
        } else if (isNaN(req.query.table)) {
            response.returnResponse(res, 400, { status: 'error', message: 'Please input number to initialize tables!', httpStatus: 400 })
            return
        }

        data.table = new Array(parseInt(req.query.table)).fill(null).map((value, index) => ({ tableNo: index + 1, bookingId: null }))
        data.isInitialize = true
        response.returnResponse(res, 201, { status: 'success', message: 'Tables are initialized successfully', httpStatus: 201 })
        console.log("Current tables after initialized:", table)
    },
    reserve: (req, res) => {
        if (!data.isInitialize) {
            response.returnResponse(res, 400, { status: 'error', message: 'Tables are not initialized!', httpStatus: 400 })
            return
        } else if (isNaN(req.query.customer)) {
            response.returnResponse(res, 400, { status: 'error', message: 'Please input customer number to reserve tables!', httpStatus: 400 })
            return
        }

        const countRemainingTables = getRemainingTables()
        const countTableNeeds = parseInt(req.query.customer) / 4

        if (!(countRemainingTables >= countTableNeeds)) {
            response.returnResponse(res, 400, { status: 'error', message: 'Not enough tables for all customers in the reservation!', httpStatus: 400 })
            return
        }

        const bookingId = crypto.randomUUID()
        let countingReserving = 0
        data.table = data.table.map((value) => {
            if (countingReserving < countTableNeeds && value.bookingId === null) {
                countingReserving++
                return ({ ...value, bookingId: bookingId })
            }
            return ({ ...value })
        })

        response.returnResponse(res, 200, { status: 'success', message: `Your Booking ID is ${bookingId}, number of book tables is ${countTableNeeds} and remaining ${getRemainingTables()} tables`, httpStatus: 200 })
        console.log("Current tables after reserved:", data.table)
    },
    cancel: (req, res) => {
        if (!data.isInitialize) {
            response.returnResponse(res, 400, { status: 'error', message: 'Tables are not initialized!', httpStatus: 400 })
            return
        } else if (!req.query.bookingId) {
            response.returnResponse(res, 400, { status: 'error', message: 'Please input Booking ID!', httpStatus: 400 })
            return
        }

        const bookingId = req.query.bookingId
        const countCancellingTables = data.table.filter((value) => value.bookingId === bookingId).length
        if (countCancellingTables > 0) {
            response.returnResponse(res, 400, { status: 'error', message: 'Booking ID not found!', httpStatus: 400 })
            return
        }

        data.table = data.table.map((value) => value.bookingId === bookingId ? { ...value, bookingId: null } : { ...value })
        response.returnResponse(res, 200, { status: 'success', message: `Number of freed tables is ${countCancellingTables} and remaining ${getRemainingTables()} tables`, httpStatus: 200 })
        console.log("Current tables after calceled:", data.table)
    },
    getTables: (req, res) => {
        if (!data.isInitialize) {
            response.returnResponse(res, 400, { status: 'error', message: 'Tables are not initialized!', httpStatus: 400 })
            return
        }

        response.returnResponse(res, 200, { status: 'success', message: `Our restaurant has ${data.table.length} tables`, httpStatus: 200 })
        console.log("Current tables:", data.table)
    }
}

module.exports = restaurantController