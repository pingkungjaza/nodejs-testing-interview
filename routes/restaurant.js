const express = require('express')
const router = express.Router()
const crypto = require("crypto")

var table = new Array(99999)
var isInitialize = false

const get_remaining_tables = () => {
    return table.filter((value) => value.booking_id === null).length
}

router.get("/all_tables", (req, res) => {
    res.status(200)
    res.send({ status: 'success', message: `Our restaurant has ${table.length} tables`, http_status: 200 })
})

router.post("/initialize_all_tables", (req, res) => {
    if (!isInitialize) {
        if (!isNaN(req.query.table)) {
            table = new Array(parseInt(req.query.table)).fill(null).map((value, index) => ({ table_no: index + 1, booking_id: null }))
            isInitialize = true
            res.status(201)
            res.send({ status: 'success', message: 'Tables are initialized successfully', http_status: 201 })
        } else {
            res.status(400)
            res.send({ status: 'error', message: 'Please input number to initialize tables!', http_status: 400 })
        }
    } else {
        res.status(400)
        res.send({ status: 'error', message: 'Tables are initialized!', http_status: 400 })
    }
    console.log("Current tables after initialized:", table)
})

router.put("/reserve_tables", (req, res) => {
    if (isInitialize) {
        if (!isNaN(req.query.customer)) {
            const count_remaining_tables = get_remaining_tables()
            const count_table_needs = parseInt(req.query.customer) / 4
            if (count_remaining_tables >= count_table_needs) {
                const booking_id = crypto.randomUUID()
                let counting_reserving = 0
                table = table.map((value) => {
                    if (counting_reserving < count_table_needs && value.booking_id === null) {
                        counting_reserving++
                        return ({ ...value, booking_id: booking_id })
                    }
                    else
                        return ({ ...value })
                })
                res.status(200)
                res.send({ status: 'success', message: `Your Booking ID is ${booking_id}, number of book tables is ${count_table_needs} and remaining ${get_remaining_tables()} tables`, http_status: 200 })
            } else {
                res.status(400)
                res.send({ status: 'error', message: 'Not enough tables for all customers in the reservation!', http_status: 400 })
            }
        } else {
            res.status(400)
            res.send({ status: 'error', message: 'Wrong format, Please input number to reserve tables!', http_status: 400 })
        }
    } else {
        res.status(400)
        res.send({ status: 'error', message: 'Tables are not initialized!', http_status: 400 })

    }
    console.log("Current tables after reserved:", table)
})


router.put("/cancel_tables", (req, res) => {
    if (isInitialize) {
        if (req.query.booking_id) {
            const booking_id = req.query.booking_id
            const count_cancelling_tables = table.filter((value) => value.booking_id === booking_id).length
            if (count_cancelling_tables > 0) {
                table = table.map((value) => {
                    if (value.booking_id === booking_id)
                        return ({ ...value, booking_id: null })
                    else
                        return ({ ...value })
                })
                res.status(200)
                res.send({ status: 'success', message: `Number of freed tables is ${count_cancelling_tables} and remaining ${get_remaining_tables()} tables`, http_status: 200 })
            } else {
                res.status(400)
                res.send({ status: 'error', message: 'Booking ID not found!', http_status: 400 })
            }
        } else {
            res.status(400)
            res.send({ status: 'error', message: 'Please input Booking ID!', http_status: 400 })
        }
    } else {
        res.status(400)
        res.send({ status: 'error', message: 'Tables are not initialized!', http_status: 400 })
    }
    console.log("Current tables after calceled:", table)
})

module.exports = router