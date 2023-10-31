const route = require('express').Router()
const wooCommerceProductsController = require('../controller/wooCommerceProductsController')

//! Products routes
route.get('/get-products', wooCommerceProductsController.getProducts)
route.get('/get-single-product/:prodId', wooCommerceProductsController.getSingleProduct)
route.post('/add-products', wooCommerceProductsController.addProductsBatch)
route.post('/add-single-product', wooCommerceProductsController.addProduct)
route.put('/update-product/:prodId', wooCommerceProductsController.updateProduct)
route.delete('/delete-product/:prodId', wooCommerceProductsController.deleteProduct)

//! Products Attributes routes
route.get('/get-attributes', wooCommerceProductsController.getProductAttributes)
route.get('/get-single-attribute/:atbtId', wooCommerceProductsController.getSingleProductAttributes)
route.post('/add-single-attribute', wooCommerceProductsController.addProductAttribute)
route.post('/add-attributes', wooCommerceProductsController.addProductAttributesBatch)

//! Products attributes terms routes
route.get('/get-attribute-terms/:attrId', wooCommerceProductsController.getAttributeTerms)
route.post('/add-attribute-terms/:attrId', wooCommerceProductsController.addAttributeTermsBatch)

module.exports = route