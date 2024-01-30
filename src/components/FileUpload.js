import React, {useState} from 'react';
import * as XLSX from 'xlsx';
import './FileUpload.css';

function ExcelToJsonConverter() {
    const [file, setFile] = useState(null);
    const [jsonData, setJsonData] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

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
            setUploading(true);
            setLoading(true);
            const reader = new FileReader();
            reader.onload = async (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, {type: "binary"});
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
                // console.log(json)
                // setJsonData(JSON.stringify(json, null, 2));

                //  check IDs and update/create records
                // json.forEach(async (row) => {
                //     const id = row.TrackedEntityInstances; //  'ID'  column name
                //     const exists = await checkIdExistence(id);
                //     if (exists) {
                //         // If ID exists, update record
                //         updateRecord(id, yourUpdatedData);
                //     } else {
                //         // If ID doesn't exist, create payload and post
                //         createAndPostPayload(yourPayloadData);
                //     }
                // });

                for (const row of json) {
                    const id = row.TrackedEntityInstances; //  'ID'  column name
                    const exists = await checkIdExistence(id);
                    if (exists) {
                        // If ID exists, update record
                        const updatedData =
                            {
                            dataValues: [
                                {
                                dataElement: "fYXMas63RqZ",
                                value: row.fYXMas63RqZ
                                 },
                                {
                                dataElement: "oGFnDgZdYIA",
                                value: row.oGFnDgZdYIA
                                },
                                {
                                    dataElement: "kQFrmVd1l4C",
                                    value: row.kQFrmVd1l4C
                                },
                                {
                                    dataElement: "JIF7nUXfOE5",
                                    value: row.JIF7nUXfOE5
                                },
                                {
                                    dataElement: "Aav31h4Hw9j",
                                    value: row.Aav31h4Hw9j
                                },
                                {
                                    dataElement: "oclRmA0Ddw5",
                                    value: row.oclRmA0Ddw5
                                },
                                {
                                    dataElement: "KONsaMibMDN",
                                    value: row.KONsaMibMDN
                                },
                                {
                                    dataElement: "oAq0Td1SkV7",
                                    value: row.oAq0Td1SkV7
                                },
                                {
                                    dataElement: "uxHOAUsyDKz",
                                    value: formatDateFromExcelSerial(row.uxHOAUsyDKz)
                                },
                                {
                                    dataElement: "sKrn2rY6l0w",
                                    value: formatDateFromExcelSerial(row.sKrn2rY6l0w)
                                },
                                {
                                    dataElement: "ArUaftNaqGt",
                                    value: formatDateFromExcelSerial(row.ArUaftNaqGt)
                                },

                            ],
                                event: "unVgHirSaRI",
                                program: "h0iSBI3xoS6",
                                programStage: "nknoeOj6dLq",
                                orgUnit: row.OrgUIDs,
                                trackedEntityInstance: row.TrackedEntityInstances,
                                trackedEntityType: "T5DWDr5Swce",
                                status: "COMPLETED",
                                eventDate: formatDateFromExcelSerial(row.uxHOAUsyDKz),
                                completedDate: "2024-01-27"
                        }
                        setJsonData(JSON.stringify(updatedData, null, 2));

                        await updateRecord(id, updatedData);

                    } else {
                        // If ID doesn't exist, create payload and post

                        const convertedJsonData = {
                            trackedEntityInstances: [{
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
                                                    value: key === 'uxHOAUsyDKz' || key === 'sKrn2rY6l0w' || key === 'ArUaftNaqGt' ? formatDateFromExcelSerial(row[key]) : row[key]
                                                }))
                                            },
                                            {
                                                program: "h0iSBI3xoS6",
                                                orgUnit: row.OrgUIDs,
                                                eventDate: formatDateFromExcelSerial(row.eventTwoDate),
                                                status: "COMPLETED",
                                                programStage: "s1kg8duJ8U1",
                                                dataValues: Object.keys(row).slice(25, 30).map((key) => ({
                                                    dataElement: key,
                                                    value: row[key]
                                                }))
                                            },
                                            // Add more events if needed
                                        ]
                                    }
                                ]
                            }]
                        };

                        setJsonData(JSON.stringify(convertedJsonData, null, 2));

                        await createRecord(convertedJsonData);

                    }
                }
                await resetTable();

                // const convertedJsonData = {
                //     trackedEntityInstances: json.map(row => ({
                //         trackedEntityInstance: row.TrackedEntityInstances,
                //         orgUnit: row.OrgUIDs,
                //         trackedEntityType: "T5DWDr5Swce",
                //         attributes: Object.keys(row).slice(4, 12).map((key) => ({
                //             attribute: key,
                //             value: row[key]
                //         })),
                //         enrollments: [
                //             {
                //                 orgUnit: row.OrgUIDs,
                //                 program: "h0iSBI3xoS6",
                //                 enrollmentDate: formatDateFromExcelSerial(row.EnrollmentDate),
                //                 incidentDate: formatDateFromExcelSerial(row.IncidentDate),
                //                 status: "ACTIVE",
                //                 events: [
                //                     {
                //                         program: "h0iSBI3xoS6",
                //                         orgUnit: row.OrgUIDs,
                //                         eventDate: formatDateFromExcelSerial(row.uxHOAUsyDKz),
                //                         status: "COMPLETED",
                //                         programStage: "nknoeOj6dLq",
                //                         dataValues: Object.keys(row).slice(12, 23).map((key) => ({
                //                             dataElement: key,
                //                             // value: row[key]
                //                             value: key === 'uxHOAUsyDKz' || key === 'sKrn2rY6l0w' || key === 'ArUaftNaqGt' ? formatDateFromExcelSerial(row[key]) : row[key]
                //                         }))
                //                     },
                //                     {
                //                         program: "h0iSBI3xoS6",
                //                         orgUnit: row.OrgUIDs,
                //                         eventDate: formatDateFromExcelSerial(row.eventTwoDate),
                //                         status: "COMPLETED",
                //                         programStage: "s1kg8duJ8U1",
                //                         dataValues: Object.keys(row).slice(24, 29).map((key) => ({
                //                             dataElement: key,
                //                             value: row[key]
                //                         }))
                //                     },
                //                     // Add more events if needed
                //                 ]
                //             }
                //         ]
                //     }))
                // };

                // setJsonData(JSON.stringify(convertedJsonData, null, 2));


                //  POST jsonData to an API endpoint
                // try {
                //     const response = await fetch('https://uthabitiactivity.org/uthabiti/api/trackedEntityInstances', {
                //         method: 'POST',
                //         headers: {
                //             'Content-Type': 'application/json',
                //             'Authorization': 'Basic ' + btoa('Myco:Caf3t3ria!'),
                //         },
                //         body: JSON.stringify(convertedJsonData),
                //         credentials: 'include',
                //     });
                //
                //     if (response.ok) {
                //         console.log('Data successfully posted to the API');
                //     } else {
                //         console.error('Failed to post data to the API');
                //     }
                // } catch (error) {
                //     console.error('Error posting data to the API:', error);
                // }
                setUploading(false);
                setLoading(false);
            };
            reader.readAsBinaryString(file);
        }

    };

    // Function to check if ID exists at a particular endpoint
    const checkIdExistence = async (id) => {
        try {
            const response = await fetch(`https://uthabitiactivity.org/uthabiti/api/trackedEntityInstances/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('Myco:Caf3t3ria!'),
                },
            });

            if (response.status === 200){
                console.log(`id ${id} found`, response.status)
                return true
            } else {
                console.log(`id ${id} not found`, response.status)
                return false
            }
        } catch (error) {

            console.error('Error checking ID existence:', error);

        }
    };

    // Function to update record at
    const updateRecord = async (id, data) => {

        //  POST jsonData to an API endpoint
        try {
            const response = await fetch('https://uthabitiactivity.org/uthabiti/api/trackedEntityInstances', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('Myco:Caf3t3ria!'),
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });

            if (response.ok) {
                console.log(`Record with ID ${id} updated successfully.`);
            } else {
                console.error(`Failed to update record with ID ${id}.`);
            }
        } catch (error) {
            console.error(`Error updating record with ID ${id}:`, error);
        }
    };

    // Function to create payload
    const createRecord = async (data) => {
        try {
            const response = await fetch('https://uthabitiactivity.org/uthabiti/api/trackedEntityInstances', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('Myco:Caf3t3ria!'),
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });
            if (response.ok) {
                console.log('Payload posted successfully.');
            } else {
                console.error('Failed to post payload.');
            }
        } catch (error) {
            console.error('Error posting payload:', error);
        }
    };

    const resetTable = async () => {
        try {
            // console.log("response is", response)
            return await fetch('https://uthabitiactivity.org/uthabiti/api/trackedEntityInstances/query.json?ou=O2I1C1KOAgg&ouMode=SELECTED&program=h0iSBI3xoS6', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('Myco:Caf3t3ria!'),
                },
            });
        } catch (error){
            console.error('Error getting data', error)
        }
    }

    return (
        <div className="form-container">
            <h1> Upload Excel File </h1>
            <input type="file" accept=".xls,.xlsx" onChange={e => setFile(e.target.files[0])} />
            <button className="upload-btn" onClick={handleConvert} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {loading && <div className="progress-bar">uploading data please wait...</div>}
            <pre>{jsonData}</pre>
        </div>
    );
}
export default ExcelToJsonConverter;