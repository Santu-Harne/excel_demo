const route = require('express').Router()
const authController = require('../controller/authController')

route.post('/students_register', authController.studentRegWithExcl)
route.get('/getdept', authController.getDepartments)
route.post('/register-employee/:mngrId', authController.registerEmployee)
route.get('/get-employee/:empId', authController.getEmployee)
route.get('/get_employee/:id', authController.getEmployeeMongo)

module.exports = route
