const data = require('../database')

const getRemainingTables = () => data.table.filter((value) => value.bookingId === null).length

const restaurantController = {
    initializeAllTables: (req, res) => {
        if (!data.isInitialize) {
            if (!isNaN(req.query.table)) {
                data.table = new Array(parseInt(req.query.table)).fill(null).map((value, index) => ({ tableNo: index + 1, bookingId: null }))
                data.isInitialize = true
                res.status(201)
                res.send({ status: 'success', message: 'Tables are initialized successfully', httpStatus: 201 })
            } else {
                res.status(400)
                res.send({ status: 'error', message: 'Please input number to initialize tables!', httpStatus: 400 })
            }
        } else {
            res.status(400)
            res.send({ status: 'error', message: 'Tables are initialized!', httpStatus: 400 })
        }
        console.log("Current tables after initialized:", data.table)
    },
    reserveTables: (req, res) => {
        if (data.isInitialize) {
            if (!isNaN(req.query.customer)) {
                const countRemainingTables = getRemainingTables()
                const countTableNeeds = parseInt(req.query.customer) / 4
                if (countRemainingTables >= countTableNeeds) {
                    const bookingId = crypto.randomUUID()
                    let countingReserving = 0
                    data.table = data.table.map((value) => {
                        if (countingReserving < countTableNeeds && value.bookingId === null) {
                            countingReserving++
                            return ({ ...value, bookingId: bookingId })
                        }
                        else
                            return ({ ...value })
                    })
                    res.status(200)
                    res.send({ status: 'success', message: `Your Booking ID is ${bookingId}, number of book tables is ${countTableNeeds} and remaining ${getRemainingTables()} tables`, httpStatus: 200 })
                } else {
                    res.status(400)
                    res.send({ status: 'error', message: 'Not enough tables for all customers in the reservation!', httpStatus: 400 })
                }
            } else {
                res.status(400)
                res.send({ status: 'error', message: 'Wrong format, Please input number to reserve tables!', httpStatus: 400 })
            }
        } else {
            res.status(400)
            res.send({ status: 'error', message: 'Tables are not initialized!', httpStatus: 400 })
        }
        console.log("Current tables after reserved:", data.table)
    },
    cancelTables: (req, res) => {
        if (data.isInitialize) {
            if (req.query.bookingId) {
                const bookingId = req.query.bookingId
                const countCancellingTables = table.filter((value) => value.bookingId === bookingId).length
                if (countCancellingTables > 0) {
                    data.table = data.table.map((value) => {
                        if (value.bookingId === bookingId)
                            return ({ ...value, bookingId: null })
                        else
                            return ({ ...value })
                    })
                    res.status(200)
                    res.send({ status: 'success', message: `Number of freed tables is ${countCancellingTables} and remaining ${getRemainingTables()} tables`, httpStatus: 200 })
                } else {
                    res.status(400)
                    res.send({ status: 'error', message: 'Booking ID not found!', httpStatus: 400 })
                }
            } else {
                res.status(400)
                res.send({ status: 'error', message: 'Please input Booking ID!', httpStatus: 400 })
            }
        } else {
            res.status(400)
            res.send({ status: 'error', message: 'Tables are not initialized!', httpStatus: 400 })
        }
        console.log("Current tables after calceled:", data.table)
    }
}

module.exports = restaurantController