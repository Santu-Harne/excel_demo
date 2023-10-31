const assert = require('assert')
const { StatusCodes } = require('http-status-codes')
const db = require('../db/database')

const schoolController = {
  registerSchool: async (req, res) => {
    try {
      const inputData = req.body
      const query = `INSERT INTO school_table SET?`

      db.query(query, [inputData], (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
        }
        res.status(StatusCodes.OK).json({ msg: 'School data added successfully' })
      })

    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message })
    }
  }
}
module.exports = schoolController