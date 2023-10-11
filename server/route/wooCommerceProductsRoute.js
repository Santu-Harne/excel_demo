const route = require('express').Router()
const wooCommerceProductsController = require('../controller/wooCommerceProductsController')


route.get('/get-products', wooCommerceProductsController.getProducts)
route.get('/get-single-product/:prodId', wooCommerceProductsController.getSingleProduct)
route.post('/add-products', wooCommerceProductsController.addProducts)
route.put('/update-product/:prodId', wooCommerceProductsController.updateProduct)
route.delete('/delete-product/:prodId', wooCommerceProductsController.deleteProduct)

module.exports = route