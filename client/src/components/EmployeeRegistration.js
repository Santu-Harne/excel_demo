import React, { useState, useEffect } from 'react'
import axios from 'axios'

const initialState = { employeeName: '', departmentId: '', city: '', street: '', doorNo: '' }
const EmployeeRegistration = () => {
  const [departments, setDepartments] = useState(null)
  const [employee, setEmployee] = useState(initialState)
  const mngrId = 1;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(employee);
    await axios.post(`/api/register-employee/${mngrId}`, employee)
      .then(res => {
        // console.log(res.data.data);
        alert(res.data.msg)
        setEmployee(initialState)
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get('/api/getdept')
      .then(res => {
        // console.log(res.data);
        setDepartments(res.data.data)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 ">
            <div className="card mt-5">
              <div className="card-header"><h1 className='text-info'>EmployeeRegistration</h1></div>
              <div className="card-body">
                <form onSubmit={submitHandler}>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="employeeName" >Employee Name</label>
                      <input type="text" name="employeeName" id="employeeName" className='form-control' value={employee.employeeName} onChange={changeHandler} />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="department" >Department</label>
                      <select name="departmentId" id="departmentId" className='form-select' value={employee.departmentId} onChange={changeHandler}>
                        <option value="" hidden>Select</option>
                        {departments && departments.map((dept, index) => {
                          return (
                            <option key={dept.departmentId} value={dept.departmentId}>{dept.departmentName}</option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="city" >City</label>
                      <input type="text" name="city" id="city" className='form-control' value={employee.city} onChange={changeHandler} />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="street" >Street</label>
                      <input type="text" name="street" id="street" className='form-control' value={employee.street} onChange={changeHandler} />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="doorNo" >Door No</label>
                      <input type="text" name="doorNo" id="doorNo" className='form-control' value={employee.doorNo} onChange={changeHandler} />
                    </div>
                  </div>
                  <div className="input-group d-flex justify-content-center mt-5">
                    <button type='submit' className='btn btn-success'>Register</button>
                    <button className='btn btn-secondary'>Clear</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default EmployeeRegistration