import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function ExcelToJsonConverter() {
    const [file, setFile] = useState(null);
    const [jsonData, setJsonData] = useState('');

    const formatToYYYYMMDD = (dateString) => {
        console.log(dateString)
        const date = new Date(dateString);

        // Check if the date is valid
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }

        // Use toISOString to get the date in YYYY-MM-DD format
        return date.toISOString().split('T')[0];
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
                console.log(json)
                // setJsonData(JSON.stringify(json, null, 2));

                const convertedJsonData = {
                    trackedEntityInstances: json.map(row => ({
                        trackedEntityInstance: row.trackedEntityInstance,
                        orgUnit: row.OrgUIDs,
                        trackedEntityType: "T5DWDr5Swce",
                        attributes: Object.keys(row).map(key => ({
                            attribute: key,
                            value: row[key]
                        })),
                        enrollments: [
                            {
                                orgUnit: row.orgUnitId,
                                program: row.programId,
                                enrollmentDate: formatToYYYYMMDD(row.EnrollmentDate),
                                incidentDate: formatToYYYYMMDD(row.IncidentDate),
                                status: "ACTIVE",
                                attributes: Object.keys(row).map(key => ({
                                    attribute: key,
                                    value: row[key]
                                })),
                                events: [
                                    {
                                        program: row.programId,
                                        orgUnit: row.orgUnitId,
                                        eventDate: "YYYY-MM-DD",
                                        status: "COMPLETED",
                                        programStage: row.programStageId,
                                        dataValues: Object.keys(row).map(key => ({
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
        <div>
            <input type="file" accept=".xls,.xlsx" onChange={e => setFile(e.target.files[0])} />
            <button onClick={handleConvert}>Upload</button>
            <pre>{jsonData}</pre>
        </div>
    );
}
export default ExcelToJsonConverter;