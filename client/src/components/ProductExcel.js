import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from 'axios';

function generateAndDownloadExcel() {
  const data = {
    name: "",
    type: "simple",
    regular_price: "",
    sale_price: "",
    description:
      "",
    short_description:
      "",
    images: [
      {
        src: "",
      }
    ],
  };

  // Flatten the nested object
  const flattenData = {
    name: data.name,
    type: data.type,
    regular_price: data.regular_price,
    description: data.description,
    short_description: data.short_description,
    image_src: data.images.map((image) => image.src).join(", "),
  };

  // Convert the flattened data to an array of objects
  const dataArray = [flattenData];

  // Create a worksheet
  const ws = XLSX.utils.json_to_sheet(dataArray);

  // Create a workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "ProductData");

  // Generate the Excel file
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, "productData.xlsx");
}

function ProductExcel() {
  const [data, setData] = useState([]);

  function importExcelFile(event) {
    const file = event.target.files[0];

    if (!file) {
      alert("Please select an Excel file.");
      return;
    }
    let formData = new FormData()
    formData.append('products_data', file)

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Assuming that the first sheet contains the data
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert the Excel sheet back into an array of objects
      const dataArray = XLSX.utils.sheet_to_json(sheet);

      // Process the data to recreate the original nested object structure
      const reconstructedData = dataArray.map((row) => {
        const images = row.image_src.split(",").map((src, index) => ({
          src,
          alt: row.image_alt.split(",")[index], // Include alt from img_alt
        }));
        return {
          name: row.name,
          type: row.type,
          regular_price: row.regular_price,
          description: row.description,
          short_description: row.short_description,
          images,
        };
      });
      setData(reconstructedData);
      // console.log(reconstructedData); // You can set this data in your state or use it as needed
      axios.post(`/woocommerce/products/add-products`, reconstructedData)
        .then(res => {
          console.log(res.data);
        }).catch(err => console.log(err))
    };


    reader.readAsArrayBuffer(file);

  }

  return (
    <div>
      <button onClick={generateAndDownloadExcel}>Download Excel</button>
      <br />
      <br />
      <div>
        <input type="file" accept=".xlsx" onChange={importExcelFile} />
      </div>
    </div>
  );
}

export default ProductExcel;
