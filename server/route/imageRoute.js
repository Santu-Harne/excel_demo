const route = require('express').Router()
const imageController = require('./../controller/imageController')

route.post('/upload-image', imageController.uploadImage)

module.exports = route