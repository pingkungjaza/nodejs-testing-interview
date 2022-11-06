const restaurantController = require('../../controllers')

const initializeRequest = { query: { table: 10 } }
const badInitializeRequest = { query: { table: 'table' } }

const reserveRequest = { query: { customer: 30 } }
const badReserveRequest = { query: { customer: 'customer' } }

const cancelRequest = { query: { bookingId: 'xxx' } }
const badCancelRequest = { query: {} }

const response = {
    json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn().mockReturnThis(),
}

it('Call method getTables (before initialize): Should send a status of code of 400 when tables are not initialized', () => {
    restaurantController.getTables(null, response)
    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.send).toHaveBeenCalledTimes(1)
})
it('Call method reserve (before initialize): Should send a status of code of 400 when tables are not initialized', () => {
    restaurantController.reserve(reserveRequest, response)
    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.send).toHaveBeenCalledTimes(1)
})
it('Call method cancel (before initialize): Should send a status of code of 400 when tables are not initialized', () => {
    restaurantController.cancel(cancelRequest, response)
    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.send).toHaveBeenCalledTimes(1)
})
it('Call method initialize: Should send a status of code of 201 when tables are initialize', () => {
    restaurantController.initialize(initializeRequest, response)
    expect(response.status).toHaveBeenCalledWith(201)
    expect(response.send).toHaveBeenCalledTimes(1)
})
it('Call method initialize (second time): Should send a status of code of 400 when tables are initialized', () => {
    restaurantController.initialize(initializeRequest, response)
    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.send).toHaveBeenCalledTimes(1)
})
it('Call method initialize (wrong input): Should send a status of code of 400 when wrong input', () => {
    restaurantController.initialize(badInitializeRequest, response)
    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.send).toHaveBeenCalledTimes(1)
})
it('Call method getTables (after initialize): Should send a status of code of 400 when tables are not initialized', () => {
    restaurantController.getTables(null, response)
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.send).toHaveBeenCalledTimes(1)
})
it('Call method cancel (before reserve): Should send a status of code of 400 when called before reserve', () => {
    restaurantController.cancel(cancelRequest, response)
    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.send).toHaveBeenCalledTimes(1)
})
it('Call method reserve (after initialized): Should send a status of code of 200 when tables can reserve', () => {
    restaurantController.reserve(reserveRequest, response)
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.send).toHaveBeenCalledTimes(1)
})
it('Call method reserve (wrong input): Should send a status of code of 400 when wrong input', () => {
    restaurantController.reserve(badReserveRequest, response)
    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.send).toHaveBeenCalledTimes(1)
})
it('Call method reserve (exceed the number of tables): Should send a status of code of 400 when exceed the number of tables', () => {
    restaurantController.reserve(reserveRequest, response)
    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.send).toHaveBeenCalledTimes(1)
})
it('Call method cancel (after initialized and reserved): Should send a status of code of 400 when tables are not initialized', () => {
    restaurantController.cancel(cancelRequest, response)
    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.send).toHaveBeenCalledTimes(1)
})
it('Call method cancel (wrong input): Should send a status of code of 400 when wrong input', () => {
    restaurantController.cancel(badCancelRequest, response)
    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.send).toHaveBeenCalledTimes(1)
})