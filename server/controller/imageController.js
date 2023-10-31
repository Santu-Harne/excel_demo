const assert = require('assert')
const { StatusCodes } = require('http-status-codes')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const imageController = {
  uploadImage: async (req, res) => {
    try {
      // const image = req.file;
      res.json({ msg: 'hai' })
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
    }
  }
}

module.exports = imageController