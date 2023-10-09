const assert = require('assert')
const { StatusCodes } = require('http-status-codes')
const db = require('../db/database')
const fs = require('fs');
const xlsx = require('xlsx');
const { Employee, Address, Department } = require('./../model/EmployeeModel')


const authController = {
	studentRegWithExcl: async (req, res) => {
		try {

			if (!req.files || Object.keys(req.files).length === 0)
				return res.status(StatusCodes.BAD_REQUEST).json({ msg: "No files were attached" })

			const excelFile = req.files.students_data;

			// Load the Excel workbook
			const workbook = xlsx.readFile(excelFile.tempFilePath);
			// Specify the sheet name 
			const sheetName = 'Sheet1';

			// Parse the Excel sheet
			const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
			const query = 'INSERT INTO students_table SET ?';

			excelData.forEach((student) => {
				db.query(query, student, (err, result) => {
					if (err) {
						console.error('Error inserting data:', err);
					}
				})
			})

			res.status(StatusCodes.OK).json({ msg: 'students_data added successfully' })

		} catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message })
		}
	},
	getDepartments: async (req, res) => {
		try {
			const query = 'SELECT * FROM department';
			db.query(query, (err, result) => {
				if (err) assert.deepStrictEqual(err, null);
				// console.log(`data = `, result)

				res.status(StatusCodes.OK).json({ msg: "All Departments", data: result })
			})

		} catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message })
		}
	},
	registerEmployee: async (req, res) => {
		try {
			const mngrId = req.params.mngrId;
			const { employeeName, departmentId, city, street, doorNo } = req.body

			const addressQuery = `INSERT INTO address (city, street, doorNo) VALUES (?,?,?)`
			const employeeQuery = 'INSERT INTO employee (employeeName,departmentId, addressId,managerId) VALUES (?,?,?,?)'

			db.query(addressQuery, [city, street, doorNo], (err, addResult) => {
				if (err) assert.deepStrictEqual(err, null);
				let addressId = addResult.insertId;
				// res.json(addResult)

				db.query(employeeQuery, [employeeName, departmentId, addressId, mngrId], (err, empResult) => {
					if (err) assert.deepStrictEqual(err, null);

					const selectQuery = `SELECT e.employeeName,d.departmentName,ad.city,ad.street,ad.doorNo
					FROM employee e
					JOIN department d on d.departmentId = e.departmentId
					JOIN address ad on ad.addressId= e.addressId
					WHERE employeeId=${empResult.insertId}`
					db.query(selectQuery, (err, response) => {
						res.status(StatusCodes.OK).json({ msg: 'Employee data created successfully', data: response[0] })
					})
				})

			})

		} catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message })
		}
	},
	getEmployee: async (req, res) => {
		try {
			const empId = req.params.empId;

			const selectQuery = `SELECT e.employeeName,d.departmentName,ad.city,ad.street,ad.doorNo
					FROM employee e
					JOIN department d on d.departmentId = e.departmentId
					JOIN address ad on ad.addressId= e.addressId
					WHERE employeeId=${empId}`

			db.query(selectQuery, (err, response) => {
				const data = {
					employee: response[0].employeeName,
					departmentName: response[0].departmentName,
					address: {
						city: response[0].city,
						street: response[0].street,
						doorNo: response[0].doorNo
					}
				}
				res.status(StatusCodes.OK).json(data)
			})

		} catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message })
		}
	},
	getEmployeeMongo: async (req, res) => {
		try {
			const id = req.params.id;
			const employee1 = await Employee.aggregate([
				{
					$match: {}, // Match the specific order ID you want to find.
				},
				{
					$lookup: {
						from: "address",
						localField: "addressId",
						foreignField: "addressId",
						as: "address_details",
					}
				},
				{
					$lookup: {
						from: "department",
						localField: "departmentId",
						foreignField: "departmentId",
						as: "department_details"
					}
				},
				{
					$limit: 1 // Ensure only one result is returned
				}

			])
			res.status(StatusCodes.OK).json({ data: employee1[0] })

		} catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message })
		}
	}
}



module.exports = authController