import React, { useEffect, useState } from "react";
import "./DataValidation.css";
import { Link } from "react-router-dom";
import jsonData from "./assets/mnhData.json"; //for  json file
import jsonData2 from "./assets/sample.json"; //for  json file
import { toLower } from "lodash";
import Loader from "./Loader/Loader";

const DataUi = () => {
	// const [data, setData]= useState(null);
	const [data, setData] = useState({data_values: []}); // json file
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [totalMnhRecords, setTotalMnhRecords] = useState(0);
	const [passCount, setPassCount] = useState(0);
	const [failCount, setFailCount] = useState(0);
	const [nullCount, setNullCount] = useState(0);

	const [programAreas, setProgramAreas] = useState([]);

	const [processedAreas, setProcessedAreas] = useState([
		// { name: "MNH", total: 2345, passed: 2200, failed: 1000 },
		// { name: "CHILD HEALTH", total: 334, passed: 200, failed: 100 },
	]);

	// useEffect(() => {
	// 	// fetch('http://localhost:8001/validate?period=202401')
	// 	const serverUrl = "http://localhost:8001";
	// 	fetch(`${serverUrl}/validate?period=202401`)
	// 		.then((response) => {
	// 			if (!response.ok) {
	// 				throw new Error("Network response was not ok");
	// 			}
	// 			return response.json();
	// 		})
	// 		.then((data) => {
	// 			// setData(data);  //use for actual endpoint
	// 			setLoading(false);
	// 			console.log("data", data);

	// 			setTotalMnhRecords(data?.records?.length);

	// 			// Count the records with "Pass" status
	// 			const pass = data.records.filter(
	// 				(record) => record[1] === "Pass"
	// 			).length;
	// 			setPassCount(pass);

	// 			// Count the records with "Fail" status
	// 			const fail = data.records.filter(
	// 				(record) => record[1] === "Fail"
	// 			).length;
	// 			setFailCount(fail);

	// 			// Count the records with "Pass" status
	// 			const count = data.records.filter(
	// 				(record) => record[1] === null
	// 			).length;
	// 			setNullCount(count);
	// 		})
	// 		.catch((error) => {
	// 			setError(error);
	// 			setLoading(false);
	// 		});
	// }, []);

	useEffect(() => {
		const script = document.createElement('script');
		script.src = `${process.env.PUBLIC_URL}/script.js`; ;
		script.async = true;
		document.body.appendChild(script);

		// return () => {
		// 	document.body.removeChild(script);
		// };

		const data = jsonData2["Program Area"];
        let datavalues = [];

		// setLoading(false);
		console.log("data", data);

        
		for (const programArea in data) {
            let total = 0,
                totalPass = 0,
                totalFail = 0;
			console.log(`Program Area: ${programArea}`);
			const orgUnits = data[programArea];
            setProgramAreas((pa) => [...pa, programArea]);

			for (const orgUnit in orgUnits) {
				console.log(`  Org Unit: ${orgUnit}`);
				console.log(
					`    Validations: ${JSON.stringify(
						orgUnits[orgUnit].validation
					)}`
				);
				console.log(`    Data Values: ${orgUnits[orgUnit].dataValues}`);
                datavalues = [...datavalues, ...orgUnits[orgUnit].dataValues]
				total += orgUnits[orgUnit].validation?.length;

				totalPass += orgUnits[orgUnit].validation?.filter(
					(record) => toLower(record[1]) === "pass"
				).length;
				totalFail += orgUnits[orgUnit].validation?.filter(
					(record) => toLower(record[1]) === "fail"
				).length;


			}

            setProcessedAreas((pa) => [...pa, {
                name: programArea,
                total: total,
                passed: totalPass,
                failed: totalFail,
            }])
		}
        setData((data) => ({...data, data_values: datavalues}))
		// setTotalMnhRecords(total);
		// setPassCount(totalPass);
		// setFailCount(totalFail);
		// setNullCount(0);

		setTimeout(() => {
			setLoading(false);
		}, 5000); // 5 seconds

		return () => clearTimeout(setTimeout); // Cleanup timeout on unmount

	}, []);

	if(loading){
	    return <Loader/>
	}

	if(error){
	    return <div>Error: {error.message}</div>;
	}

	return (
		<div className="app">
			<div id="particles-background" className="vertical-centered-box"></div>
			<div id="particles-foreground" className="vertical-centered-box"></div>
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
						{programAreas.map((area) => (
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
						{processedAreas.map((area) => (
							<tr key={area.name}>
								<td>
									<Link to={`/${area.name}`} key={area}>
										{area.name}
									</Link>
								</td>
								{/*<td>{area.name}</td>*/}
								<td>{area.total}</td>
								<td>{area.passed}</td>
								<td>{area.failed}</td>
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
