import React, {useEffect, useState} from 'react';
import * as XLSX from 'xlsx';
import './FileUpload.css';

function ExcelToJsonConverter() {
    const [file, setFile] = useState(null);
    const [jsonData, setJsonData] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [createdEventsCount, setCreatedEventsCount] = useState(0);
    const [updatedEventsCount, setUpdatedEventsCount] = useState(0);

    useEffect(() => {
        // Reset events count when file changes
        setCreatedEventsCount(0);
        setUpdatedEventsCount(0);
    }, [file]);

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

                // Get column names from the first row (excluding first 13 columns)
                const columnNames = Object.keys(json[0]).slice(12,26);
                const eventTwoColumnNames = Object.keys(json[0]).slice(27,31);
                let createdCount = 0;
                let updatedCount = 0;
                // console.log("event one", columnNames)
                // console.log("event two", eventTwoColumnNames)

                for (const row of json) {
                    const id = row.TrackedEntityInstances; //  'ID'  column name
                    const exists = await checkIdExistence(id);
                    // console.log(exists.eventId)
                    if (exists.found) {

                        const eventTwo = eventTwoColumnNames.map(columnName => ({
                            dataElement: columnName,
                            value: row[columnName]
                        })).filter(row => row.value === true);
                        console.log("true values ", eventTwo)

                        // update data
                        for (const event of eventTwo) {
                            const updatedData = {
                                dataValues: [{
                                    dataElement: event.dataElement,
                                    value: event.value
                                }]
                            };

                            setJsonData(JSON.stringify(updatedData, null, 2));
                            console.log("update data", updatedData);
                            await updateRecord(exists.eventId, event.dataElement, updatedData, updatedCount++);
                            // updatedCount++;
                        }


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
                                        events: [
                                            {
                                                program: "h0iSBI3xoS6",
                                                orgUnit: row.OrgUIDs,
                                                eventDate: formatDateFromExcelSerial(row.uxHOAUsyDKz),
                                                programStage: "nknoeOj6dLq",
                                                dataValues: Object.keys(row).slice(12, 24).map((key) => ({
                                                    dataElement: key,
                                                    // value: row[key]
                                                    value: key === 'uxHOAUsyDKz' || key === 'sKrn2rY6l0w' || key === 'ArUaftNaqGt' || key === 'WnHQ3OUmUal' ? formatDateFromExcelSerial(row[key]) : row[key]
                                                }))
                                            },
                                            {
                                                program: "h0iSBI3xoS6",
                                                orgUnit: row.OrgUIDs,
                                                eventDate: formatDateFromExcelSerial(row.eventTwoDate),
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

                        // await createRecord(convertedJsonData,createdCount);
                        // createdCount++;

                    }
                }

                // setCreatedEventsCount(createdCount);
                // setUpdatedEventsCount(updatedCount);
                await resetTable();

                setUploading(false);
                setLoading(false);
            };
            reader.readAsBinaryString(file);
        } else {
            // If no file is uploaded, show a message
            alert("Please select an Excel file before clicking Upload.");
        }

    };

    // Function to check if ID exists at a particular endpoint
    const checkIdExistence = async (id) => {
        let result = {
            found: false,
            eventId: null
        };
        try {
            const response = await fetch(`https://uthabitiactivity.org/uthabiti/api/trackedEntityInstances/${id}?fields=enrollments[events[event,programStage,eventDate,orgUnit]]`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('Myco:Caf3t3ria!'),
                },
            });


            if (response.status === 200){
                console.log(`id ${id} found`, response.status)

                // Extract JSON data from the response
                const data = await response.json();
                const enrollments = data.enrollments


                // Looping through enrollments to find the event ID with the specified program stage
                let eventId = null;
                for (const enrollment of enrollments) {
                    const events = enrollment.events;
                    const filteredEvents = events.filter(event => event.programStage === "s1kg8duJ8U1");

                    if (filteredEvents.length > 1) {
                        console.log("There are more than one event");
                        result.found = true;
                        break; // Exit loop if more than one event is found
                    } else if (filteredEvents.length === 1) {
                        eventId = filteredEvents[0].event;
                        // Proceed to update
                        console.log("Event ID:", eventId);
                        result.found = true;
                        result.eventId = filteredEvents[0].event;
                        break; // Exit loop if one event is found
                    }
                }

                return result
            } else {
                console.log(`id ${id} not found`, response.status)
                return false
            }
        } catch (error) {

            console.error('Error checking ID existence:', error);

        }
    };

    // Function to update record at
    const updateRecord = async (eventId, id, data, updatedCount) => {

        //  POST jsonData to an API endpoint
        try {
            const response = await fetch(`https://uthabitiactivity.org/uthabiti/api/events/${eventId}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('Sci_test:Save1234!'),
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });

            if (response.ok) {
                console.log(`Record with ID ${id} updated successfully.`);
            } else {
                console.error(`Failed to update record with ID ${id}.`);
            }
            updatedCount++;

        } catch (error) {
            console.error(`Error updating record with ID ${id}:`, error);
        }
        setUpdatedEventsCount(updatedCount);
    };

    // Function to create payload
    const createRecord = async (data, createdCount) => {
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
            createdCount++;

        } catch (error) {
            console.error('Error posting payload:', error);
        }
        setCreatedEventsCount(createdCount);
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

    // Render the summary table only if uploading is complete
    const renderSummaryTable = () => {
        // if (!uploading) {
        if (jsonData) { //set this to show table after uploading
            return (
                <div className="summary-table">
                    <h2>Summary</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Events Created</th>
                            <th>Events Updated</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{createdEventsCount}</td>
                            <td>{updatedEventsCount}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="form-container">
            <h1> Upload Excel File </h1>
            <div className="file-upload">
            <input type="file" accept=".xls,.xlsx" onChange={e => setFile(e.target.files[0])} />
            <button className="upload-btn" onClick={handleConvert} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
            {loading && <div className="progress-bar">uploading data please wait...</div>}
            {/*{!file && <div className="no-file-message">Please upload a file.</div>}*/}
            {/*<pre>{jsonData}</pre>*/}
            {renderSummaryTable()}
        </div>
    );
}
export default ExcelToJsonConverter;