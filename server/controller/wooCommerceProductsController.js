const { StatusCodes } = require('http-status-codes')
const api = require('../api/wooCommerceApi')

const wooCommerceProductsController = {
  getProducts: async (req, res) => {
    try {
      const { data } = await api.get("products")

      res.status(StatusCodes.OK).json({ msg: 'All products data', data: data })
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
    }
  },
  getSingleProduct: async (req, res) => {
    try {
      const { prodId } = req.params;
      const { data } = await api.get(`products/${prodId}`)

      res.status(StatusCodes.OK).json({ msg: 'Product data', data: data })
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
    }
  },
  addProducts: async (req, res) => {
    try {
      const product = req.body
      const { data } = await api.post("products", product)
      res.status(StatusCodes.OK).json({ msg: 'Product added successfully', data: data })

    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { prodId } = req.params;
      const product = req.body;
      const { data } = await api.put(`products/${prodId}`, product)
      res.status(StatusCodes.OK).json({ msg: 'Product updated successfully', data: data })
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
    }
  },
  updateProductBatch: async (req, res) => {
    try {


    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { prodId } = req.params;

      const { data } = await api.delete(`products/${prodId}`, {
        force: true, // Forces to delete instead of move to the Trash
      })
      res.status(StatusCodes.OK).json({ msg: 'Product deleted successfully', data: data })
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
    }
  }
}

module.exports = wooCommerceProductsController