const response = {
    returnResponse: (res, status, response) => {
        res.status(status)
        res.send(response)
        console.log("return response", response)
    }
}

module.exports = response