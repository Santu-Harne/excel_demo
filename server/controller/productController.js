const assert = require('assert')
const { StatusCodes } = require('http-status-codes')
const db = require('../db/database')
const api = require('../api/wooCommerceApi')

const productController = {
  registerProduct: async (req, res) => {
    try {
      const inputData = req.body
      // res.json(inputData)
      const { data } = await api.post("products", inputData)
      const sqlData = { product_id: data.id, name: inputData.name, regular_price: inputData.regular_price, sale_price: inputData.sale_price, school_id: inputData.school_id, bundle_id: inputData.bundle_id };

      const query = `INSERT INTO products_table SET?`

      db.query(query, [sqlData], (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
        }
        res.status(StatusCodes.OK).json({ msg: 'Product data added successfully', data: { ...data, ...sqlData } });
      })

    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message })
    }
  },
  registerMultipleProducts: async (req, res) => {
    try {
      const inputData = req.body
      const products = {
        create: inputData
      }
      // res.json(inputData)
      const { data } = await api.post("products/batch", products)
      const wpResponse = data.create.map((res, index) => {
        return {
          product_id: res.id, name: res.name, regular_price: res.regular_price, sale_price: res.sale_price, school_id: inputData[index].school_id, bundle_id: inputData[index].bundle_id
        }
      })
      const query = `INSERT INTO products_table SET?`
      wpResponse.forEach((product) => {
        db.query(query, [product], (err, result) => {
          if (err) {
            console.error('Error inserting data:', err);
          }
        })
      })

      res.status(StatusCodes.OK).json({ msg: 'All Products data added successfully', data: wpResponse })

    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message })
    }
  }
}
module.exports = productController