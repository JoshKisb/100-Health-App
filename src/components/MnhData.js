import React, { useEffect } from "react";
import "./DataValidation.css";
import { useLocation, useParams, useHistory } from "react-router-dom";

const MnhData = () => {
	let { area } = useParams();
	const history = useHistory();
	const location = useLocation();
	const { validationData } = location.state || {};

	useEffect(() => {
		console.log("Received data:", validationData);
	}, [validationData]);

	const calculateSummary = (records) => {
		const totalValidations = records.length;
		const totalPassed = records.filter(record => record[1] === "Pass").length;
		const totalFailed = records.filter(record => record[1] === "Fail").length;
		const totalNull = records.filter(record => record[1] === null).length;
		return { totalValidations, totalPassed, totalFailed, totalNull };
	};

	const renderTableRows = () => {
		// Check if validationData is not defined or if area is not defined
		if (!validationData || !validationData[area]) {
			console.log(`No data for area ${area}`);
			return (
				<tr>
					<td colSpan="6">No data available for the selected area.</td>
				</tr>
			);
		}

		const facilities = Object.keys(validationData[area]);
		// console.log("Facilities:", facilities);

		return facilities.map((id) => {
			const facilityData = validationData[area][id];
			if (!facilityData) {
				console.log(`No data for facility ${id}`);
				return null;
			}

			const { records = [] } = facilityData;
			// console.log(`Records for facility ${id}:`, records);

			const { totalValidations, totalPassed, totalFailed, totalNull } = calculateSummary(records);
			// console.log(`Summary for facility ${id}:`, { totalValidations, totalPassed, totalFailed, totalNull });

			return (
				<tr key={id}>
					<td>{id}</td>
					<td>{totalValidations}</td>
					<td>{totalPassed}</td>
					<td>{totalFailed}</td>
					<td>{totalNull}</td>
					<td>
						<button onClick={() => alert(`Downloading report for ${id}`)}>
							Download
						</button>
					</td>
				</tr>
			);
		});
	};


	return (
		<div className="app">
			<div className="header-buttons">
				<button onClick={() => history.push('/')}>Back to Home</button>
			</div>
			<main>
				<section className="program-selection">
					<h2>Program Area</h2>
					<ul>
						<li>{area}</li>
					</ul>
				</section>
				<section className="results">
					<table>
						<thead>
						<tr>
							<th>Facility</th>
							<th>Total Validations</th>
							<th>Total Passed</th>
							<th>Total Failed</th>
							<th>Total Null</th>
							<th>Download Report</th>
						</tr>
						</thead>
						<tbody>
						{renderTableRows()}
						</tbody>
					</table>
				</section>
				<div className="header-buttons">
					<button onClick={() => history.push('/')}>Submit Validated Data</button>
				</div>
			</main>
		</div>
	);
};

export default MnhData;
