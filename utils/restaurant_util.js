const restaurantUtil = {
    getRemainingTables: (table) => table.filter((value) => value.bookingId === null).length
}

module.exports = restaurantUtil