import React, {useState} from 'react';
import './FileUpload.css';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [fileType, setFileType] = useState('');
    const [orgUnitId, setOrgUnitId] = useState('');
    const [period, setPeriod] = useState('');
    const [sheetName, setSheetName] = useState('');
    const [buttonStatus, setButtonStatus] = useState('Start Service');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [showDownloadButton, setShowDownloadButton] = useState(false);

    const [query, setQuery] = useState(''); //state holds the current value of the input field
    const [orgUnits, setOrgUnits] = useState([]); //state holds the list of organization units fetched from the API
    const [isListOpen, setIsListOpen] = useState(false);

    const handleFileTypeChange = (event) => {
        setFileType(event.target.value);
    };

    const handleOrgUnitChange = (event) => {
        setOrgUnitId(event.target.value);

        // Reset sheetName when changing file type
        setSheetName('');
    };

    const handlePeriodChange = (event) => {
        setPeriod(event.target.value);
    };

    // function handles fetching data from the API based on the input query
    const searchOrgUnits = async (query) => {
        const baseUrl = process.env.REACT_APP_BASE_URL
        const url = `${baseUrl}api/organisationUnits?fields=id,displayName,code,path,publicAccess,access,lastUpdated,children[id,displayName,code,publicAccess,access,path,children::isNotEmpty]&paging=true&withinUserHierarchy=true&query=${query}&pageSize=7`;

        const username = process.env.REACT_APP_USERNAME;
        const password = process.env.REACT_APP_PASSWORD;
        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

        try {
            const response = await fetch(url, {headers});
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
        setIsListOpen(true);
    };

    const handleOrgUnitSelect = (unit) => {
        setQuery(unit.displayName);
        // You can use unit.id for whatever further processing you need
        setOrgUnitId(unit.id)
        setIsListOpen(false);
    };

    const handleUpload = () => {

        // console.log("File Type:", fileType);
        // console.log("Organization Unit:", orgUnitId);
        // console.log("Period:", period);

        // Set uploading state to true to show "Uploading..." text
        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        fetch('https://ssss-wizard.onrender.com/upload',{
            method: 'POST',
            body: formData
        }).then(response =>{
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            setFile(null);
            return response.json();
        }).catch(error =>{
            // Handle error
            console.error('There was a problem with the request:', error);
            setUploading(false); // Reset uploading state on error
        })

    }


    // start service
    const startService = () => {
        // Change button text to "Starting..." while loading
        setButtonStatus('Starting...');
        setButtonDisabled(true)

        fetch('https://ssss-wizard.onrender.com')
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
                {/*<div className="input-container">*/}
                {/*    <label htmlFor="file-type-dropdown">File Type:</label>*/}
                {/*    <select id="file-type-dropdown" className="file-type-dropdown" value={fileType}*/}
                {/*            onChange={handleFileTypeChange}>*/}
                {/*        <option value="">select type</option>*/}
                {/*        <option value="ptme">ptme</option>*/}
                {/*        <option value="cd">cd</option>*/}
                {/*        <option value="arv">arv</option>*/}
                {/*        <option value="non-hiv">non-hiv</option>*/}
                {/*        /!* Add more options as needed *!/*/}
                {/*    </select>*/}
                {/*</div>*/}

                {/* Sheet Name Input (conditionally rendered) */}
                {/*{fileType === 'non-hiv' && (*/}
                {/*    <div className="input-container">*/}
                {/*        <label htmlFor="sheet-name">Sheet Name:</label>*/}
                {/*        <select id="sheet-name"  value={sheetName}*/}
                {/*                onChange={(e) => setSheetName(e.target.value)}>*/}
                {/*            <option value="">select Sheet</option>*/}
                {/*            <option value="Octobre_FY1">Octobre_FY1</option>*/}
                {/*            <option value="Novembre_FY1">Novembre_FY1</option>*/}
                {/*            <option value="Decembre_FY1">Decembre_FY1</option>*/}
                {/*            <option value="Janvier_FY1">Janvier_FY1</option>*/}
                {/*            <option value="Fevrier_FY1">Fevrier_FY1</option>*/}
                {/*            <option value="Mars_FY1">Mars_FY1</option>*/}
                {/*            <option value="Avril_FY1">Avril_FY1</option>*/}
                {/*            <option value="Mai_FY1">Mai_FY1</option>*/}
                {/*            <option value="Septembre_FY1">Septembre_FY1</option>*/}
                {/*            <option value="Aout_FY1">Aout_FY1</option>*/}
                {/*            <option value="Juillet_FY1">Juillet_FY1</option>*/}
                {/*            <option value="Juin_FY1">Juin_FY1</option>*/}

                {/*            /!* Add more options as needed *!/*/}
                {/*        </select>*/}
                {/*    </div>*/}
                {/*)}*/}
                {/*{fileType !== 'non-hiv' && (*/}
                {/*    <div className="input-container">*/}
                {/*        <label htmlFor="org-unit">Organization Unit:</label>*/}
                {/*        <div className="org-unit-dropdown">*/}
                {/*            <input*/}
                {/*                type="text"*/}
                {/*                id="org-unit"*/}
                {/*                placeholder="Organization Unit"*/}
                {/*                value={query}*/}
                {/*                onChange={handleInputChange}*/}
                {/*            />*/}
                {/*            {isListOpen && (*/}
                {/*                <ul className="org-unit-list">*/}
                {/*                    {orgUnits.map((unit) => (*/}
                {/*                        <li key={unit.id} onClick={() => handleOrgUnitSelect(unit)}>*/}
                {/*                            {unit.displayName}*/}
                {/*                        </li>*/}
                {/*                    ))}*/}
                {/*                </ul>*/}
                {/*            )}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}


                {/* Period */}
                {/*<div className="input-container">*/}
                {/*    <label htmlFor="period">Period:</label>*/}
                {/*    <input type="number" id="period" placeholder="Period" value={period}*/}
                {/*           onChange={handlePeriodChange}/>*/}
                {/*</div>*/}
                {/* File Upload */}
                <input type="file" className="file" accept=".xls,.xlsx" onChange={e => setFile(e.target.files[0])}/>
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

export default FileUpload;