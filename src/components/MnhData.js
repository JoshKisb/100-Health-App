import React, { useState} from 'react';
import './DataValidation.css';
import jsonData from "./assets/mnhData.json";

const MnhData = () => {
    const [facilities, setFacilities]= useState(jsonData.facilities);

    const [programAreas] = useState([
        'MNH',
        // 'CHILD HEALTH',
        // 'MALARIA',
    ]);

    console.log(facilities)

    return (
        <div className="app">
            <main>
                <section className="program-selection">
                    <h2> Program Area</h2>
                    <ul>
                        {programAreas.map(area => (
                            <li key={area}>{area}</li>
                        ))}
                    </ul>
                </section>
                <section className="results">
                    <table>
                        <thead>
                        <tr>
                            <th>Facility</th>
                            <th>Val1</th>
                            <th>Val2</th>
                        </tr>
                        </thead>
                        <tbody>
                        {facilities.map(facility => (
                            <tr key={facility.name}>
                                <td>{facility.name}</td>
                                <td>{facility.val1}</td>
                                <td>{facility.val2}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default MnhData;
