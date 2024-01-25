import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './FileUpload.css';

function ExcelToJsonConverter() {
    const [file, setFile] = useState(null);
    const [jsonData, setJsonData] = useState('');

    // Function to format the Excel date serial number
    const formatDateFromExcelSerial = (excelSerial) => {
        // Convert the Excel serial number to milliseconds
        const milliseconds = (excelSerial - 25569) * 24 * 60 * 60 * 1000;

        // Check if milliseconds is a valid number
        if (isNaN(milliseconds) || !isFinite(milliseconds)) {
            console.error('Invalid milliseconds:', milliseconds);
            return 'Invalid Date';
        }

        // Calculate the date from the base date (January 1, 1970)
        const date = new Date(milliseconds);


        // Check if the Date object is valid
        if (isNaN(date.getTime())) {
            console.error('Invalid Date object:', date);
            return 'Invalid Date';
        }

        return date.toISOString();
    };

    const handleConvert = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, {type: "binary"});
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
                // console.log(json)
                // setJsonData(JSON.stringify(json, null, 2));

                const convertedJsonData = {
                    trackedEntityInstances: json.map(row => ({
                        trackedEntityInstance: row.TrackedEntityInstances,
                        orgUnit: row.OrgUIDs,
                        trackedEntityType: "T5DWDr5Swce",
                        attributes: Object.keys(row).slice(4, 12).map((key) => ({
                            attribute: key,
                            value: row[key]
                        })),
                        enrollments: [
                            {
                                orgUnit: row.OrgUIDs,
                                program: "h0iSBI3xoS6",
                                enrollmentDate: formatDateFromExcelSerial(row.EnrollmentDate),
                                incidentDate: formatDateFromExcelSerial(row.IncidentDate),
                                status: "ACTIVE",
                                attributes: Object.keys(row).slice(4, 12).map((key) => ({
                                    attribute: key,
                                    value: row[key]
                                })),
                                events: [
                                    {
                                        program: "h0iSBI3xoS6",
                                        orgUnit: row.OrgUIDs,
                                        eventDate: formatDateFromExcelSerial(row.uxHOAUsyDKz),
                                        status: "COMPLETED",
                                        programStage: "nknoeOj6dLq",
                                        dataValues: Object.keys(row).slice(12, 24).map((key) => ({
                                            dataElement: key,
                                            // value: row[key]
                                            value: key === 'uxHOAUsyDKz' || key === 'sKrn2rY6l0w' ? formatDateFromExcelSerial(row[key]) : row[key]
                                        }))
                                    },
                                    {
                                        program: "h0iSBI3xoS6",
                                        orgUnit: row.OrgUIDs,
                                        eventDate: formatDateFromExcelSerial(row.eventTwoDate),
                                        status: "COMPLETED",
                                        programStage: "s1kg8duJ8U1",
                                        dataValues: Object.keys(row).slice(25, 29).map((key) => ({
                                            dataElement: key,
                                            value: row[key]
                                        }))
                                    },
                                    // Add more events if needed
                                ]
                            }
                        ]
                    }))
                };

                setJsonData(JSON.stringify(convertedJsonData, null, 2));


                //  POST jsonData to an API endpoint
                try {
                    const response = await fetch('https://uthabitiactivity.org/uthabiti/api/trackedEntityInstances', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic ' + btoa('Myco:Caf3t3ria!'),
                        },
                        body: JSON.stringify(convertedJsonData),
                        credentials: 'include',
                    });

                    if (response.ok) {
                        console.log('Data successfully posted to the API');
                    } else {
                        console.error('Failed to post data to the API');
                    }
                } catch (error) {
                    console.error('Error posting data to the API:', error);
                }

            };
            reader.readAsBinaryString(file);
        }
    };

    return (
        <div className="form-container">
            <h1> Upload Excel File </h1>
            <input type="file" accept=".xls,.xlsx" onChange={e => setFile(e.target.files[0])} />
            <button className="upload-btn" onClick={handleConvert}>Upload</button>
            <pre>{jsonData}</pre>
        </div>
    );
}
export default ExcelToJsonConverter;