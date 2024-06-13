import React, {useEffect, useState} from 'react';
import './DataValidation.css';
import { Link } from 'react-router-dom'

const DataUi = () => {
    const [data, setData]= useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalMnhRecords, setTotalMnhRecords] = useState(0);
    const [passCount, setPassCount] = useState(0);
    const [failCount, setFailCount] = useState(0);
    const [nullCount, setNullCount] = useState(0);


    const [programAreas] = useState([
        'MNH',
        'CHILD HEALTH',
        'MALARIA',
    ]);

    const [processedAreas] = useState([
        { name: 'MNH', total: 2345, passed: 2200, failed: 1000 },
        { name: 'CHILD HEALTH', total: 334, passed: 200, failed: 100 },
    ]);

    useEffect(() => {
        // fetch('http://localhost:8001/validate?period=202401')
        fetch('/validate?period=202401')
            .then((response) =>{
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
                console.log("data", data)

                setTotalMnhRecords(data?.records?.length);

                // Count the records with "Pass" status
                const pass = data.records.filter(record => record[1] === 'Pass').length;
                setPassCount(pass);

                // Count the records with "Fail" status
                const fail = data.records.filter(record => record[1] === 'Fail').length;
                setFailCount(fail);

                // Count the records with "Pass" status
                const count = data.records.filter(record => record[1] === null).length;
                setNullCount(count);

            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="app">
            <header className="app-header">
                <h1>Data Validation Suite</h1>
                <div className="header-buttons">
                    <button>Upload File</button>
                    <button>Select Period</button>
                </div>
            </header>
            <main>
                <section className="program-selection">
                    <h2>Select Program Areas to Run Validation On</h2>
                    <ul>
                        {programAreas.map(area => (
                            <li key={area}>{area}</li>
                        ))}
                    </ul>
                </section>
                <section className="progress-bar">
                    <h2>Progress</h2>
                    <div className="progress">
                        <div className="progress-completed"></div>
                    </div>
                </section>
                <section className="results">
                    <h2>List of Program Areas Processed</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Program Area</th>
                            <th>Total Validations</th>
                            <th>Total Passed</th>
                            <th>Failed</th>
                            <th>Null</th>
                        </tr>
                        </thead>
                        <tbody>
                        {processedAreas.map(area => (
                            <tr key={area.name}>
                                <td><Link to="/mnh" key={area}>{area.name}</Link></td>
                                {/*<td>{area.name}</td>*/}
                                <td>{totalMnhRecords}</td>
                                <td>{passCount}</td>
                                <td>{failCount}</td>
                                <td>{nullCount}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>

                <section className="results">
                    <h2>List of Data Values</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>dataElement</th>
                            <th>categoryOptionCombo</th>
                            <th>attributeOptionCombo</th>
                            <th>value</th>
                            <th>period</th>
                            <th>orgUnit</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.data_values.map((dataValue, index) => (
                            <tr key={index}>
                                <td>{dataValue.dataElement}</td>
                                <td>{dataValue.categoryOptionCombo}</td>
                                <td>{dataValue.attributeOptionCombo}</td>
                                <td>{dataValue.value}</td>
                                <td>{dataValue.period}</td>
                                <td>{dataValue.orgUnit}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
                <div className="download-report-container">
                    <button className="download-report">Download Report</button>
                </div>
            </main>
        </div>
    );
};

export default DataUi;
