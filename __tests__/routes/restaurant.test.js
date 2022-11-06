const app = require('../../app')
const request = require('supertest')

describe('initialize', () => {
    it('return status 400 when tables are initialized', async () => {
        const res = await request(app).post('/initialize').send({ query: { table: 10 } })
        expect(res.status).toEqual(400)
    })
})

describe('reserve', () => {
    it('return status 400 when tables are fully reserved', async () => {
        const res = await request(app).put('/reserve').send({ query: { customer: 10 } })
        expect(res.status).toEqual(400)
    })
})

describe('cancel', () => {
    it('return status 400 when BookingID is not found', async () => {
        const res = await request(app).put('/cancel').send({ query: { bookingId: 'xxx' } })
        expect(res.status).toEqual(400)
    })
})