const route = require('express').Router()
const wooCommerceOrdersController = require('./../controller/wooCommerceOrdersController')

route.get('/get-single-order/:ordrId', wooCommerceOrdersController.getSingleOrder)
route.post('/place-order', wooCommerceOrdersController.placeOrder)

module.exports = route