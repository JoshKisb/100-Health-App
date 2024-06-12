import React, { useState } from 'react';
import './DataValidation.css';

const DataUi = () => {
    const [programAreas] = useState([
        'MNH',
        'CHILD HEALTH',
        'MALARIA',
    ]);

    const [processedAreas] = useState([
        { name: 'MNH', total: 2345, passed: 2200, failed: 1000 },
        { name: 'CHILD HEALTH', total: 334, passed: 200, failed: 100 },
    ]);

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
                        </tr>
                        </thead>
                        <tbody>
                        {processedAreas.map(area => (
                            <tr key={area.name}>
                                <td>{area.name}</td>
                                <td>{area.total}</td>
                                <td>{area.passed}</td>
                                <td>{area.failed}</td>
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
