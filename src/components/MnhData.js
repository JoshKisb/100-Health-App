import React, { useState } from "react";
import "./DataValidation.css";
import jsonData from "./assets/mnhData.json";
import jsonData2 from "./assets/sample.json";
import { useParams } from "react-router-dom";

const MnhData = ({}) => {
	const name = "MNH";
	let { area } = useParams();
	const programArea = jsonData2["Program Area"][area];
	const vcount = Object.values(programArea)[0]?.validation?.length;
	const array = Array.from({ length: vcount }, (_, index) => index);
	// console.log(facilities)

	return (
		<div className="app">
			<main>
				<section className="program-selection">
					<h2> Program Area</h2>
					<ul>
						<li>{area}</li>
					</ul>
				</section>
				<section className="results">
					<table>
						<thead>
							<tr>
								<th>Facility</th>
								{array.map((val) => (
									<th>Val{val + 1}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{Object.keys(programArea).map((facility) => (
								<tr key={facility}>
									<td>{facility}</td>
									{array.map((v) => (
										<td>
											{programArea[facility].validation?.[v]?.[1]}
										</td>
									))}
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
