const utils = require('../../utils')

const httpStatus = 200
const response = {
    json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn().mockReturnThis(),
}

it('Call method returnResponse: Should send a status of code of 200', () => {
    utils.response.returnResponse(response, httpStatus)
    expect(response.status).toHaveBeenCalledWith(httpStatus)
    expect(response.send).toHaveBeenCalledTimes(1)
})