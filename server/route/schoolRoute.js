const route = require('express').Router();
const schoolController = require('./../controller/schoolController')

route.post('/register-school', schoolController.registerSchool)

module.exports = route
