const mongoose = require('mongoose')

const connect = mongoose.connect(process.env.EMPLOYEES_MONGO_URL)
  .then(response => console.log('Employees database connected successfully'))
  .catch(err => console.log('Error connecting to database'))


const EmployeeSchema = new mongoose.Schema({
  employeeName: String,
  departmentId: String,
  managerId: String,
  addressId: String
},
  {
    collection: "employee",
    timestamps: true
  })
const AddressSchema = new mongoose.Schema({
  city: String,
  street: String,
  doorNo: String
},
  {
    collection: "address",
    timestamps: true
  })
const DepartmentSchema = new mongoose.Schema({
  departmentName: String
},
  {
    collection: "department",
    timestamps: true
  })

const Employee = mongoose.model('Employee', EmployeeSchema)
const Address = mongoose.model('Address', AddressSchema)
const Department = mongoose.model('Department', DepartmentSchema)

module.exports = { Employee, Address, Department }