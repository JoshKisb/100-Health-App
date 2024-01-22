import React, { useState } from 'react';
import axios from 'axios';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

function FileUpload() {
    const [excelFile, setExcelFile] = useState(null);
    const [excelData, setExcelData] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setExcelFile(file);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', excelFile);

            const response = await axios.post('http://localhost:3000/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Upload successful:', response.data);

            // Parse the Excel data into a JSON payload
            ExcelRenderer(excelFile, (err, resp) => {
                if (err) {
                    console.error('Error parsing Excel data:', err);
                } else {
                    const jsonData = [];

                    // Assuming the first row in Excel is the header
                    const headers = resp.rows[0];

                    // Iterate through rows starting from the second row (index 1)
                    for (let i = 1; i < resp.rows.length; i++) {
                        const row = resp.rows[i];
                        const rowData = {};

                        // Iterate through columns
                        for (let j = 0; j < headers.length; j++) {
                            const header = headers[j];
                            const cellValue = row[j];

                            // Use header as key and cellValue as value in JSON
                            rowData[header] = cellValue;
                        }

                        jsonData.push(rowData);
                    }

                    // jsonData now contains the Excel data in JSON format
                    console.log('Excel data as JSON:', jsonData);
                }
            });
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {excelData && <OutTable data={excelData} />}
        </div>
    );
}

export default FileUpload;
