const route = require('express').Router()
const productController = require('./../controller/productController')

route.post('/register-product', productController.registerProduct)
route.post('/register-multiple-products', productController.registerMultipleProducts)

module.exports = route