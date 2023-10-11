const { StatusCodes } = require('http-status-codes')
const api = require('../api/wooCommerceApi')

const wooCommerceOrdersController = {
  getAllOrders: async (req, res) => {
    try {

    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
    }
  },
  placeOrder: async (req, res) => {
    try {
      const order = req.body;
      const { data } = await api.post("orders", order)

      res.status(StatusCodes.OK).json({ msg: 'Order placed successfully', data: data })
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
    }
  },
  getSingleOrder: async (req, res) => {
    try {
      const { ordrId } = req.params;
      const { data } = await api.get(`orders/${ordrId}`)

      res.status(StatusCodes.OK).json({ msg: 'Order details', data: data })
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
    }
  }
}

module.exports = wooCommerceOrdersController