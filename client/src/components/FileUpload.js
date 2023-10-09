import React, { useState } from 'react'
import axios from 'axios'
import DownloadExcel from './DownloadExcel'

const FileUpload = () => {
  const [xl_file, setXl_file] = useState(null)

  const changeHandler = (e) => {
    setXl_file(e.target.files[0])
    // console.log(e.target.files[0]);
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (window.confirm('Are you sure to store data of students from selected file??')) {
      // append in form constructor
      let formData = new FormData()
      formData.append('students_data', xl_file)

      // post the xlsx file to server
      const res = await axios.post('/api/students_register', formData, {
        headers: {
          'Content-Type': "multipart/form-data"
        }
      })
    }
    setXl_file(null)
    // window.location.reload()
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="file" accept='.xlsx' name="students_data" id="students_data" onChange={changeHandler} />
        <button type='submit' className='mb-5'>Send</button>
      </form>
      <DownloadExcel />
    </div>
  )
}

export default FileUpload