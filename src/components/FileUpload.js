import React, {useState} from 'react';
import './FileUpload.css';

function ExcelToJsonConverter() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [fileType, setFileType] = useState('');
    const [orgUnitId, setOrgUnitId] = useState('');
    const [period, setPeriod] = useState('');
    const [buttonStatus, setButtonStatus] = useState('Start Service');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [showDownloadButton, setShowDownloadButton] = useState(false);

    const [query, setQuery] = useState(''); //state holds the current value of the input field
    const [orgUnits, setOrgUnits] = useState([]); //state holds the list of organization units fetched from the API

    const handleFileTypeChange = (event) => {
        setFileType(event.target.value);
    };

    const handleOrgUnitChange = (event) => {
        setOrgUnitId(event.target.value);
    };

    const handlePeriodChange = (event) => {
        setPeriod(event.target.value);
    };

    // function handles fetching data from the API based on the input query
    const searchOrgUnits = async (query) => {
        const url = `https://ug.sk-engine.cloud/int2/api/37/organisationUnits?fields=id,displayName,code,path,publicAccess,access,lastUpdated,children[id,displayName,code,publicAccess,access,path,children::isNotEmpty]&paging=true&withinUserHierarchy=true&query=${query}&pageSize=15`;

        const username = 'admin';
        const password = 'district';
        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

        try {
            const response = await fetch(url,{headers});
            const data = await response.json();
            console.log("search", data)
            setOrgUnits(data?.organisationUnits);
            console.log("set org units", orgUnits)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setQuery(inputValue);
        searchOrgUnits(inputValue);
    };

    const handleOrgUnitSelect = (unit) => {
        setQuery(unit.displayName);
        // You can use unit.id for whatever further processing you need
        setOrgUnitId(unit.id)
    };

    const handleUpload = () => {
        // Check if file, fileType, orgUnit, and period are not empty
        // if (!file || !fileType || !orgUnit || !period) {
        //     alert('Please fill in all the fields');
        //     return;
        // }
        console.log("File Type:", fileType);
        console.log("Organization Unit:", orgUnitId);
        console.log("Period:", period);

        // Set uploading state to true to show "Uploading..." text
        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('file_type', fileType);
        formData.append('orgunit', orgUnitId);
        formData.append('period', period);

        fetch('https://simon-file-generator.onrender.com/process', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Reset input fields and uploading state after successful upload
                setFile(null);
                // setFileType('');
                setOrgUnitId('');
                setPeriod('');
                setUploading(false);
                setShowDownloadButton(true);
                return response.json();
            })
            .then(data => {
                // Handle response data as needed
                console.log(data);
            })
            .catch(error => {
                // Handle error
                console.error('There was a problem with the request:', error);
                setUploading(false); // Reset uploading state on error
            });

    };


    // start service
    const startService = () => {
        // Change button text to "Starting..." while loading
        setButtonStatus('Starting...');
        setButtonDisabled(true)

        fetch('https://simon-file-generator.onrender.com')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Change button text to "Service Started" and disable button after successful response
                setButtonStatus('Service Started');
                setButtonDisabled(true);
                return response.json();
            })
            .then(data => {
                // Handle response data as needed
                console.log(data);
            })
            .catch(error => {
                // Handle error
                console.error('There was a problem with the request:', error);
                // Reset button text and enable it in case of error
                setButtonStatus('Start Service');
                setButtonDisabled(false);
            });
    };


    const handleDownload = () => {
        // if (!fileType) {
        //     alert('Please select a file type');
        //     return;
        // }
        // Construct the download URL based on the selected file type
        // Perform download action
        window.location.href = `https://simon-file-generator.onrender.com/download/${fileType}`;
    };

    return (
        <div className="form-container">
            <h1> Upload Excel File </h1>
            <div className="file-upload">
                {/* File Type */}
                <div className="input-container">
                    <label htmlFor="file-type-dropdown">File Type:</label>
                    <select id="file-type-dropdown" className="file-type-dropdown" value={fileType}
                            onChange={handleFileTypeChange}>
                        <option value="">select type</option>
                        <option value="ptme">ptme</option>
                        <option value="cd">cd</option>
                        <option value="arv">arv</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                {/* Organization Unit */}
                {/*<div className="input-container">*/}
                {/*    <label htmlFor="org-unit">Organization Unit:</label>*/}
                {/*    <input type="text" id="org-unit" placeholder="Organization Unit" value={orgUnit}*/}
                {/*           onChange={handleOrgUnitChange}/>*/}
                {/*</div>*/}

                <div className="input-container">
                    <label htmlFor="org-unit">Organization Unit:</label>
                    <input
                        type="text"
                        id="org-unit"
                        placeholder="Organization Unit"
                        value={query}
                        onChange={handleInputChange}
                    />
                    <ul>
                        {orgUnits?.map((unit) => (
                            <li key={unit.id} onClick={() => handleOrgUnitSelect(unit)}>
                                {unit.displayName}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Period */}
                <div className="input-container">
                    <label htmlFor="period">Period:</label>
                    <input type="number" id="period" placeholder="Period" value={period}
                           onChange={handlePeriodChange}/>
                </div>
                {/* File Upload */}
                <input type="file" className="file" accept=".xls,.xlsx" onChange={e => setFile(e.target.files[0])} />
            </div>
            <div className="buttons-container">
                {/* Button to start service */}
                <button className="start-service-btn" onClick={startService} disabled={buttonDisabled}>
                    {buttonStatus}
                </button>
                <button className="upload-btn" onClick={handleUpload} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
                {showDownloadButton && (
                    <button className="download-btn" onClick={handleDownload}>
                        Download File
                    </button>
                )}
            </div>
        </div>

    );
}
export default ExcelToJsonConverter;