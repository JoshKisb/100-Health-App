import React, {useState} from 'react';
import './FileUpload.css';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [buttonStatus, setButtonStatus] = useState('Start Service');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [showDownloadButton, setShowDownloadButton] = useState(false);


    const handleUpload = () => {

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
            setUploading(false);
            setShowDownloadButton(true)
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
        window.location.href = `https://ssss-wizard.onrender.com/download`;
    };

    return (
        <div className="form-container">
            <h1> Upload Excel File </h1>
            <div className="file-upload">
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