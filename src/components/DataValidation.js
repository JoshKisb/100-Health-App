import React, { useEffect, useState } from "react";
import "./DataValidation.css";
import { Link, useHistory   } from "react-router-dom";
import Loader from "./Loader/Loader";

const periods = ["202401", "202402", "202403"];

const DataUi = () => {

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [uploading, setUploading] = useState(false);

	const [file, setFile] = useState(null);
	const [programAreas, setProgramAreas] = useState([]);
	const [period, setPeriod] = useState("");
	// const [validationData, setValidationData] = useState([]);

	const history = useHistory();

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
		script.src = `${process.env.PUBLIC_URL}/script.js`;
		script.async = true;
		document.body.appendChild(script);

		// return () => {
		// 	document.body.removeChild(script);
		// };




		// setLoading(false);


		// for (const programArea in data) {
        //     let total = 0,
        //         totalPass = 0,
        //         totalFail = 0;
		// 	console.log(`Program Area: ${programArea}`);
		// 	const orgUnits = data[programArea];
        //     setProgramAreas((pa) => [...pa, programArea]);
		//
		// 	for (const orgUnit in orgUnits) {
		// 		console.log(`  Org Unit: ${orgUnit}`);
		// 		console.log(
		// 			`    Validations: ${JSON.stringify(
		// 				orgUnits[orgUnit].validation
		// 			)}`
		// 		);
		// 		console.log(`    Data Values: ${orgUnits[orgUnit].dataValues}`);
        //         datavalues = [...datavalues, ...orgUnits[orgUnit].dataValues]
		// 		total += orgUnits[orgUnit].validation?.length;
		//
		// 		totalPass += orgUnits[orgUnit].validation?.filter(
		// 			(record) => toLower(record[1]) === "pass"
		// 		).length;

		// }


		setTimeout(() => {
			setLoading(false);
		}, 3000); // 3 seconds

		return () => clearTimeout(setTimeout); // Cleanup timeout on unmount

	}, []);

	const handleUpload = async () => {
		if (file) {
			setLoading(true);

			const formData = new FormData();
			formData.append("file", file);

			try {
				const response = await fetch(`http://localhost:8001/get_program_areas`, {
					method: 'POST',
					body: formData
				});

					if (!response.ok) {
						throw new Error("Network response was not ok");
					}

				const data = await response.json();
				setProgramAreas(data);
				setLoading(false);
				// console.log("program areas", data);


			} catch (error) {
				setError(error);
				setLoading(false);
				console.error('Error Uploading file:', error);
			}finally {
				setUploading(false);
			}

		} else {
			// If no file is uploaded, show a message
			alert("Please select an Excel file before clicking Upload.");
		}
	}

	const handlePeriodChange = (e) => {
		setPeriod(e.target.value);

	};

	const handleValidate =  (prog_area) => async (e) => {
		e.preventDefault();
		const serverUrl = "http://localhost:8001";
		setLoading(true);
		try {
			const response = await fetch(`${serverUrl}/validate?period=${period}&program_area=${prog_area}`);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			// setValidationData(data);
			setLoading(false);
			// console.log("validation", data);
			// console.log("validation", validationData);

			// Redirect to the validation details page with state
			history.push({
				pathname: `/${prog_area}`,
				state: { validationData: data }
			});

		} catch (error) {
			console.error('Error validating:', error);
		} finally {
		setLoading(false);
	}
	};


	if(loading){
	    return <Loader/>
	}

	if(error){
	    return <div>Error: {error.message}</div>;
	}

	return (
		<div className="app">
			<header className="app-header">
				<h1>Data Validation Suite</h1>
				{/*<div className="">*/}
					<input type="file" accept=".xls,.xlsx" onChange={e => setFile(e.target.files[0])}/>
				<div className="header-buttons">
					<button onClick={handleUpload}
							disabled={uploading}>{uploading ? 'Uploading...' : 'Upload'}</button>

					<select value={period} onChange={handlePeriodChange}>
						<option value="">Select period</option>
						{periods.map((period) => (
							<option key={period} value={period}>
								{period}
							</option>
						))}
					</select>

				</div>
				{/*</div>*/}
			</header>


			{/*<div className="form-container">*/}
			{/*	<input type="file" accept=".xls,.xlsx" onChange={e => setFile(e.target.files[0])}/>*/}
			{/*	<div className="header-buttons">*/}
			{/*		<button onClick={handleUpload}*/}
			{/*				disabled={uploading}>{uploading ? 'Uploading...' : 'Upload'}</button>*/}
			{/*		<br/><br/>*/}
			{/*		<input type="text" placeholder="Add period" value={period} onChange={handlePeriodChange}/>*/}

			{/*	</div>*/}
			{/*</div>*/}


			<main>
				{/*<section className="program-selection">*/}
				{/*	<h2>Select Program Areas to Run Validation On</h2>*/}
				{/*	<ul>*/}
				{/*		{programAreas.map((area) => (*/}
				{/*			<li key={area.title}>{area.title}</li>*/}
				{/*		))}*/}
				{/*	</ul>*/}
				{/*</section>*/}
				{/*<section className="progress-bar">*/}
				{/*	<h2>Progress</h2>*/}
				{/*	<div className="progress">*/}
				{/*		<div className="progress-completed"></div>*/}
				{/*	</div>*/}
				{/*</section>*/}
				<section className="results">
					<h2>List of Program Areas Processed</h2>
					<table>
						<thead>
						<tr>
							<th>Program Area</th>
							<th>Total Validations</th>
							{/*<th>Total Passed</th>*/}
							{/*<th>Failed</th>*/}
							{/*<th>Null</th>*/}
						</tr>
						</thead>
						<tbody>
						{programAreas.map((area) => (
							<tr key={area.title}>
								<td>
									<Link to={`/${area.title}`}  onClick={handleValidate(area.title)}>
										{area.title}
									</Link>
								</td>
								{/*<td>{area.name}</td>*/}
								<td>{area.number_of_validations}</td>

							</tr>
						))}
						</tbody>
					</table>
				</section>

				{/*<section className="results">*/}
				{/*	<h2>List of Data Values</h2>*/}
				{/*	<table>*/}
				{/*		<thead>*/}
				{/*		<tr>*/}
				{/*			<th>dataElement</th>*/}
				{/*			<th>categoryOptionCombo</th>*/}
				{/*			<th>attributeOptionCombo</th>*/}
				{/*			<th>value</th>*/}
				{/*			<th>period</th>*/}
				{/*			<th>orgUnit</th>*/}
				{/*		</tr>*/}
				{/*		</thead>*/}
				{/*		<tbody>*/}
				{/*		/!*{data.data_values.map((dataValue, index) => (*!/*/}
				{/*		/!*	<tr key={index}>*!/*/}
				{/*		/!*		<td>{dataValue.dataElement}</td>*!/*/}
				{/*		/!*		<td>{dataValue.categoryOptionCombo}</td>*!/*/}
				{/*		/!*		<td>{dataValue.attributeOptionCombo}</td>*!/*/}
				{/*		/!*		<td>{dataValue.value}</td>*!/*/}
				{/*		/!*		<td>{dataValue.period}</td>*!/*/}
				{/*		/!*		<td>{dataValue.orgUnit}</td>*!/*/}
				{/*		/!*	</tr>*!/*/}
				{/*		/!*))}*!/*/}
				{/*		</tbody>*/}
				{/*	</table>*/}
				{/*</section>*/}
				<div className="download-report-container">
					<button className="download-report">Download Report</button>
				</div>
			</main>
		</div>
	);
};

export default DataUi;
