import React, {useState} from 'react';
import './Form.css';

const HealthForm = () => {
    const [formData, setFormData] = useState({
        caseNumber: '',
        inpatientNumber: '',
        identificationNumber: '',
        name: '',
        region: '',
        occupation: '',
        district:'',
        knownDate:'',
        county:'',
        dob:'',
        subCounty:'',
        years:'',
        months:'',
        days:'',
        hours:'',
        minutes:'',
        village:'',
        sex:'',
        pob:'',
        dod:'',
        cod_a:'',
        code_a:'',
        cod_free_a:'',
        time_int_type_a:'',
        time_int_a:'',
        cod_b:'',
        cod_c:'',
        cod_d:'',
        code_b:'',
        code_c:'',
        code_d:'',
        cod_free_b:'',
        cod_free_c:'',
        cod_free_d:'',
        time_int_type_b:'',
        time_int_type_c:'',
        time_int_type_d:'',
        time_int_b:'',
        time_int_c:'',
        time_int_d:'',
        other1:'',
        other2:'',
        other3:'',
        other4:'',
        other5:'',
        other1_time:'',
        other2_time:'',
        other3_time:'',
        other4_time:'',
        other5_time:'',
        underlying2:'',
        underlying3:'',
        surgery:'',
        surgeryDate:'',
        surgeryReason:'',
        autopsy:'',
        findings:'',
        disease: false,
        assault: false,
        notKnown: false,
        accident: false,
        legal: false,
        investigation: false,
        external: false,
        selfHarm: false,
        war: false,
        unknown: false,
        dateOfInjury:'',
        externalCause:'',
        externalCausePlace:'',
        pregnancy:'',
        Stillborn:'',
        hoursSurvived:'',
        weight:'',
        pregnacyWeeks:'',
        mothersAge:'',
        mothersCondition:'',
        point:'',
        pregnancyDeathContribution:'',
        Parity:'',
        deliveryMode:'',
        placeOfDelivery:'',
        attendant:'',
        attendedBeforeDeath: false,
        examinedAfterDeath: false,
        postMortem: false,
        otherExam: false,
        examinedBy:'',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log(formData);
        // Reset form data after submission
        setFormData({
            caseNumber: '',
            inpatientNumber: '',
            identificationNumber: '',
            name: '',
            region: '',
            Occupation: '',
            district:'',
            knownDate:'',
            county:'',
            dob:'',
            subCounty:'',
            years:'',
            months:'',
            days:'',
            hours:'',
            minutes:'',
            village:'',
            sex:'',
            pob:'',
            dod:'',
            cod_a:'',
            code_a:'',
            cod_free_a:'',
            time_int_type_a:'',
            time_int_a:'',
            cod_b:'',
            cod_c:'',
            cod_d:'',
            code_b:'',
            code_c:'',
            code_d:'',
            cod_free_b:'',
            cod_free_c:'',
            cod_free_d:'',
            time_int_type_b:'',
            time_int_type_c:'',
            time_int_type_d:'',
            time_int_b:'',
            time_int_c:'',
            time_int_d:'',
            other1:'',
            other2:'',
            other3:'',
            other4:'',
            other5:'',
            other1_time:'',
            other2_time:'',
            other3_time:'',
            other4_time:'',
            other5_time:'',
            underlying2:'',
            underlying3:'',
            surgery:'',
            surgeryDate:'',
            surgeryReason:'',
            autopsy:'',
            findings:'',
            disease: false,
            assault: false,
            notKnown: false,
            accident: false,
            legal: false,
            investigation: false,
            external: false,
            selfHarm: false,
            war: false,
            unknown: false,
            dateOfInjury:'',
            externalCause:'',
            externalCausePlace:'',
            pregnancy:'',
            Stillborn:'',
            hoursSurvived:'',
            weight:'',
            pregnacyWeeks:'',
            mothersAge:'',
            mothersCondition:'',
            point:'',
            pregnancyDeathContribution:'',
            Parity:'',
            deliveryMode:'',
            placeOfDelivery:'',
            attendant:'',
            attendedBeforeDeath: false,
            examinedAfterDeath: false,
            postMortem: false,
            otherExam: false,
            examinedBy:'',
        });
    };

    const handleFormSubmit = () => {
        // Access the form element by its ID
        document.getElementById('myForm').submit();
    };
    return (
        <div>
            <h2>Medical Certificate of Cause of Death</h2>
            <div className="table-container">
                <form id="myForm" onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <label className="label" htmlFor="case">Ministry of Health National Case Number</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="case"
                                    name="caseNumber"
                                    // placeholder="Your Name"
                                    value={formData.caseNumber}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <label className="label" htmlFor="inpatientNumber">Inpatient Number</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="inpatientNumber"
                                    name="inpatientNumber"
                                    value={formData.inpatientNumber}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label" htmlFor="idNo">Identification Number</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="idNo"
                                    name="identificationNumber"
                                    value={formData.identificationNumber}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <label className="label" htmlFor="name">Name (Full name)</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                <label className="label" htmlFor="">Place of residence of the deceased</label>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label" htmlFor="region">Region</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="region"
                                    name="region"
                                    value={formData.region}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <label className="label" htmlFor="occupation">Occupation</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="occupation"
                                    name="occupation"
                                    value={formData.occupation}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label" htmlFor="district">District</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="district"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <label className="label" htmlFor="knownDate">Date of Birth Known?</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="knownDate"
                                    name="knownDate"
                                    value={formData.knownDate}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label" htmlFor="county">County</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="county"
                                    name="county"
                                    value={formData.county}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <label className="label" htmlFor="dob">Date of Birth</label>
                            </td>
                            <td>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label" htmlFor="sub-county">Sub-County</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="sub-county"
                                    name="subCounty"
                                    value={formData.subCounty}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <label className="label" htmlFor="age">Age</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    // id="age"
                                    name="years"
                                    value={formData.years}
                                    placeholder="Years"
                                    onChange={handleChange}
                                    className="input"
                                />
                                <input
                                    type="text"
                                    // id="age"
                                    name="months"
                                    value={formData.months}
                                    placeholder="Months"
                                    onChange={handleChange}
                                    className="input"
                                />

                                <input
                                    type="text"
                                    // id="age"
                                    name="days"
                                    value={formData.days}
                                    placeholder="Days"
                                    onChange={handleChange}
                                    className="input"
                                />
                                <input
                                    type="text"
                                    // id="age"
                                    name="hours"
                                    value={formData.hours}
                                    placeholder="Hours"
                                    onChange={handleChange}
                                    className="input"
                                />
                                <input
                                    type="text"
                                    id="age"
                                    name="minutes"
                                    value={formData.minutes}
                                    placeholder="Minutes"
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label" htmlFor="village">Village</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="village"
                                    name="village"
                                    value={formData.village}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <label className="label" htmlFor="sex">Sex</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="sex"
                                    name="sex"
                                    value={formData.sex}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label" htmlFor="pob">Place of Birth</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="pob"
                                    name="pob"
                                    value={formData.pob}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <label className="label" htmlFor="dod">Date and time of death</label>
                            </td>
                            <td>
                                <input
                                    type="datetime-local"
                                    id="dod"
                                    name="dod"
                                    value={formData.dod}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
<br/><br/>
                    <table>
                        <th colSpan={7} style={{textAlign: "start", background:"lightblue"}}>
                            Frame A: Medical Data. Part 1 and 2</th>
                        <tbody>
                        <tr>
                            <td>

                            </td>
                            <td>

                            </td>
                            <td>
                                <label className="label">Cause of death</label>
                            </td>
                            <td>
                                <label className="label">Code</label>
                            </td>
                            <td>
                                <label className="label">Cause of Death Free Text</label>
                            </td>
                            <td>
                                <label className="label">Time interval type from onset to death</label>
                            </td>
                            <td>
                                <label className="label">Time interval from onset to death</label>
                            </td>
                        </tr>
                            <tr>
                                <td>
                                <label className="label">Report disease or condition directly leading to death on line</label>
                                </td>
                                <td>
                                    <label className="label">a</label>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="cod_a"
                                        value={formData.cod_a}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="code_a"
                                        value={formData.code_a}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="cod_free_a"
                                        value={formData.cod_free_a}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="time_int_type_a"
                                        value={formData.time_int_type_a}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="time_int_a"
                                        value={formData.time_int_a}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </td>
                            </tr>
                        <tr>
                            <td rowSpan={3}>
                                <label className="label">Report chain of events 'due to' (b to d) in order (if applicable)</label>
                            </td>
                            <td>
                                    <label className="label">b</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="cod_b"
                                    value={formData.cod_b}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="code_b"
                                    value={formData.code_b}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="cod_free_b"
                                    value={formData.cod_free_b}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="time_int_type_b"
                                    value={formData.time_int_type_b}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="time_int_b"
                                    value={formData.time_int_b}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label">c</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="cod_c"
                                    value={formData.cod_c}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="code_c"
                                    value={formData.code_c}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="cod_free_c"
                                    value={formData.cod_free_c}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="time_int_type_c"
                                    value={formData.time_int_type_c}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="time_int_c"
                                    value={formData.time_int_c}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label">d</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="cod_d"
                                    value={formData.cod_d}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="code_d"
                                    value={formData.code_d}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="cod_free_d"
                                    value={formData.cod_free_d}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="time_int_type_d"
                                    value={formData.time_int_type_d}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="time_int_d"
                                    value={formData.time_int_d}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} rowSpan={5}>
                                <label className="label">Other significant conditions contributing to death (time intervals can be included in brackets after the condition)</label>
                            </td>
                            <td>
                                <label className="label"> Other 1</label>
                            </td>
                            <td colSpan={2}>
                                <input
                                    type="text"
                                    name="other1"
                                    value={formData.other1}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td colSpan={2}>
                                <input
                                    type="text"
                                    name="other1_time"
                                    value={formData.other1_time}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label"> Other 2</label>
                            </td>
                            <td colSpan={2}>
                                <input
                                    type="text"
                                    name="other2"
                                    value={formData.other2}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td colSpan={2}>
                                <input
                                    type="text"
                                    name="other2_time"
                                    value={formData.other2_time}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label"> Other 3</label>
                            </td>
                            <td colSpan={2}>
                                <input
                                    type="text"
                                    name="other3"
                                    value={formData.other3}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td colSpan={2}>
                                <input
                                    type="text"
                                    name="other3_time"
                                    value={formData.other3_time}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label"> Other 4</label>
                            </td>
                            <td colSpan={2}>
                                <input
                                    type="text"
                                    name="other4"
                                    value={formData.other4}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td colSpan={2}>
                                <input
                                    type="text"
                                    name="other4_time"
                                    value={formData.other4_time}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label"> Other 5</label>
                            </td>
                            <td colSpan={2}>
                                <input
                                    type="text"
                                    name="other5"
                                    value={formData.other5}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td colSpan={2}>
                                <input
                                    type="text"
                                    name="other5_time"
                                    value={formData.other5_time}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <label className="label">State the underlying cause</label>
                            </td>
                            <td colSpan={2}>
                                {/*dropdown  menu*/}



                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="underlying2"
                                    value={formData.underlying2}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td colSpan={2}>
                                <input
                                    type="text"
                                    name="underlying3"
                                    value={formData.underlying3}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>


                        </tbody>
                    </table>

                    <br/><br/>

                    <table>
                        <th colSpan={7} style={{textAlign: "start", background:"lightblue"}}>

                            Frame B: Other medical data</th>
                        <tbody>
                        <tr>
                            <td>
                                <label className="label" htmlFor="surgery">Was surgery performed within the last 4 weeks?</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="surgery"
                                    name="surgery"
                                    value={formData.surgery}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label" htmlFor="surgeryDate">If yes please specify date of surgery</label>
                            </td>
                            <td>
                                <input
                                    type="date"
                                    id="surgeryDate"
                                    name="surgeryDate"
                                    value={formData.surgeryDate}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label" htmlFor="surgeryReason">If yes please specify reason for surgery (disease or condition)</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="surgeryReason"
                                    name="surgeryReason"
                                    value={formData.surgeryReason}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label" htmlFor="autopsy">Was an autopsy requested?</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="autopsy"
                                    name="autopsy"
                                    value={formData.autopsy}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label" htmlFor="findings">If yes were the findings used in the certification?</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="findings"
                                    name="findings"
                                    value={formData.findings}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>

                        </tbody>
                    </table>
                    <br/>
                    <table>
                        <th colSpan={7} style={{textAlign: "start", background:"lightblue"}}>

                            Manner of death</th>
                        <tbody>
                        <tr>
                            <td>
                                <label className="label">Disease</label>
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    name="disease"
                                    checked={formData.disease}
                                    onChange={handleChange}
                                    className="input"
                                />
                                Yes
                            </td>
                            <td>
                                <label className="label">Assault</label>
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    name="assault"
                                    checked={formData.assault}
                                    onChange={handleChange}
                                    className="input"
                                />
                               Yes
                            </td>
                            <td>
                                <label className="label">Could not be determined</label>
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    name="notKnown"
                                    checked={formData.notKnown}
                                    onChange={handleChange}
                                    className="input"
                                />
                                Yes
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label">Accident</label>
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    name="accident"
                                    checked={formData.accident}
                                    onChange={handleChange}
                                    className="input"
                                />
                              Yes
                            </td>
                            <td>
                                <label className="label">Legal intervention</label>
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    name="legal"
                                    checked={formData.legal}
                                    onChange={handleChange}
                                    className="input"
                                />
                                Yes
                            </td>
                            <td>
                                <label className="label">Pending investigation</label>
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    name="investigation"
                                    checked={formData.investigation}
                                    onChange={handleChange}
                                    className="input"
                                />
                                Yes
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label">Intentional self-harm</label>
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    name="selfHarm"
                                    checked={formData.selfHarm}
                                    onChange={handleChange}
                                    className="input"
                                />
                                Yes

                            </td>
                            <td>
                                <label className="label">War</label>
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    name="war"
                                    checked={formData.war}
                                    onChange={handleChange}
                                    className="input"
                                />
                               Yes
                            </td>
                            <td>
                                <label className="label">Unknown</label>
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    name="unknown"
                                    checked={formData.unknown}
                                    onChange={handleChange}
                                    className="input"
                                />
                                Yes
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <label className="label">If external cause or poisoning</label>
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    name="external"
                                    checked={formData.external}
                                    onChange={handleChange}
                                    className="input"
                                />
                                Yes
                            </td>
                            <td>
                                <label className="label" htmlFor="dateOfInjury">Date of injury</label>
                            </td>
                            <td colSpan={2}>
                                <input
                                    type="date"
                                    id="dateOfInjury"
                                    name="dateOfInjury"
                                    value={formData.dateOfInjury}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <label className="label" htmlFor="externalCause">Please describe how external cause occurred (If poisoning please specify poisoning agent)</label>
                            </td>
                            <td colSpan={3}>
                                <input
                                    type="text"
                                    id="externalCause"
                                    name="externalCause"
                                    value={formData.externalCause}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <label className="label" htmlFor="externalCausePlace">Place of occurrence of the external cause</label>
                            </td>
                            <td colSpan={3}>
                                <input
                                    type="text"
                                    id="externalCausePlace"
                                    name="externalCausePlace"
                                    value={formData.externalCausePlace}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <br/>
                    <table>
                        <th colSpan={4} style={{textAlign: "start", background:"lightblue"}}>

                            Fetal or infant death</th>
                        <tbody>
                        <tr>
                            <td colSpan={2}>
                                <label className="label">Multiple pregnancy</label>
                            </td>
                            <td colSpan={2}>
                                <input
                                    type="text"
                                    name="pregnancy"
                                    checked={formData.pregnancy}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <label className="label">Stillborn?</label>
                            </td>
                            <td colSpan={2}>
                                <input
                                    type="text"
                                    name="Stillborn"
                                    checked={formData.Stillborn}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label">If death within 24 hrs specify the number of hours survived</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="hoursSurvived"
                                    checked={formData.hoursSurvived}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                            <td>
                                <label className="label">Birth weight (in grams)</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="weight"
                                    checked={formData.weight}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label">Number of completed weeks of pregnancy</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="pregnacyWeeks"
                                    checked={formData.pregnacyWeeks}
                                    onChange={handleChange}
                                    className="input"
                                />

                            </td>
                            <td>
                                <label className="label">Age of mother (years)</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="mothersAge"
                                    checked={formData.mothersAge}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <label className="label">If the death was perinatal, please state conditions of mother that affected the fetus and newborn</label>
                            </td>
                            <td colSpan={2}>
                                <input
                                    type="text"
                                    name="mothersCondition"
                                    checked={formData.mothersCondition}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <br/>
                    <table>
                        <th colSpan={2} style={{textAlign: "start", background:"lightblue"}}>

                            For women, was the deceased pregnant or within 6 weeks of delivery?</th>
                        <tbody>
                        <tr>
                            <td>
                                <label className="label">At what point?</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="point"
                                    checked={formData.point}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label">Did the pregnancy contribute to death?</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="pregnancyDeathContribution"
                                    checked={formData.pregnancyDeathContribution}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label">Parity</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="Parity"
                                    checked={formData.Parity}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label">Mode of delivery</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="deliveryMode"
                                    checked={formData.deliveryMode}
                                    onChange={handleChange}
                                    className="input"
                                />

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label">Place of delivery</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="placeOfDelivery"
                                    checked={formData.placeOfDelivery}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label">Mode of delivery</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="deliveryMode"
                                    checked={formData.deliveryMode}
                                    onChange={handleChange}
                                    className="input"
                                />

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label">Delivered by skilled attendant</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="attendant"
                                    checked={formData.attendant}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <br/>
                    <table>
                        <th colSpan={2} style={{textAlign: "start", background:"lightblue"}}>

                            I hereby certify that (tick as appropriate):</th>
                        <tbody>
                        <tr>
                            <td>
                                <label className="label">I attended the deceased before death</label>
                            </td>
                            <td>
                                Yes
                                <input
                                    type="checkbox"
                                    name="attendedBeforeDeath"
                                    checked={formData.attendedBeforeDeath}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label">I examined the body after death</label>
                            </td>
                            <td>
                                Yes
                                <input
                                    type="checkbox"
                                    name="examinedAfterDeath"
                                    checked={formData.examinedAfterDeath}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label">I conducted the post mortem of the body</label>
                            </td>
                            <td>
                                Yes
                                <input
                                    type="checkbox"
                                    name="postMortem"
                                    checked={formData.postMortem}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="label">Other (specify)</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="otherExam"
                                    checked={formData.otherExam}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                        <tr>
                            <td> <label className="label">Examined By</label></td>
                            <td>
                                <input
                                    type="text"
                                    name="examinedBy"
                                    checked={formData.examinedBy}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type="submit" className="button">Cancel</button>
                                <button type="button" className="button">Save</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default HealthForm;





