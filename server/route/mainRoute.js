// all route files
const authRoute = require('./authRoute')
const wooCommerceProductsRoute = require('./wooCommerceProductsRoute')
const wooCommerceOrdersRoute = require('./wooCommerceOrdersRoute')
const imageRoute = require('./imageRoute')
const schoolRoute = require('./schoolRoute')
const productRoute = require('./productRoute')

const allRoutes = {
  authRoute,
  wooCommerceOrdersRoute,
  wooCommerceProductsRoute,
  imageRoute,
  schoolRoute,
  productRoute
}

module.exports = allRoutes



