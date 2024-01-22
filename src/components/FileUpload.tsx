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

            const response = await axios.post('YOUR_ENDPOINT_URL', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Upload successful:', response.data);

            // Set the Excel data received from the server if needed
            setExcelData(response.data);
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
