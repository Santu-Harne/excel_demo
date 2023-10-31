const { StatusCodes } = require('http-status-codes')
const api = require('../api/wooCommerceApi')

const wooCommerceProductsController = {
  //! Products controllers
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
  addProduct: async (req, res) => {
    try {
      const product = req.body
      res.json(product)
      // const { data } = await api.post("products", product)
      // res.status(StatusCodes.OK).json({ msg: 'Product added successfully', data: data })

    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
    }
  },
  addProductsBatch: async (req, res) => {
    try {
      const inputData = req.body
      const products = {
        create: inputData
      }
      res.json(products)
      const { data } = await api.post("products/batch", products)
      res.status(StatusCodes.OK).json({ msg: 'All Products added successfully', data: data })
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
  },

  //! Product attributes controllers
  addProductAttribute: async (req, res) => {
    try {
      const inputData = req.body
      const { data } = await api.post("products/attributes", inputData)
      res.status(StatusCodes.OK).json({ msg: 'Product attribute added successfully', data: data })
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
    }
  },
  addProductAttributesBatch: async (req, res) => {
    try {
      const inputData = req.body;
      const AttributesData = {
        create: inputData
      }
      const { data } = await api.post("products/attributes/batch", AttributesData)
      res.status(StatusCodes.OK).json({ msg: 'All Product attributes added successfully!', data: data })
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
    }
  },
  getProductAttributes: async (req, res) => {
    try {
      const { data } = await api.get('products/attributes')
      res.status(StatusCodes.OK).json({ msg: 'All Product attributes data!', data: data })
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
    }
  },
  getSingleProductAttributes: async (req, res) => {
    try {
      const { atbtId } = req.params
      const { data } = await api.get(`products/attributes/${atbtId}`)
      res.status(StatusCodes.OK).json({ msg: 'Product attribute data!', data: data })
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
    }
  },

  //! Product attributes terms controller
  getAttributeTerms: async (req, res) => {
    try {
      const { attrId } = req.params;
      const { data } = await api.get(`products/attributes/${attrId}/terms`)
      const terms = data.map((term) => term.name)

      res.status(StatusCodes.OK).json({ msg: 'Product attribute terms data!', data: data })
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
    }
  },
  addAttributeTermsBatch: async (req, res) => {
    try {
      const { attrId } = req.params;
      const inputData = req.body;
      const termsData = {
        create: inputData
      }
      const { data } = await api.post(`products/attributes/${attrId}/terms/batch`, termsData)
      res.status(StatusCodes.OK).json({ msg: 'Product attribute terms added successfully!', data: data })

    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
    }
  }
}

module.exports = wooCommerceProductsController