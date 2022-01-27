import React from "react";
import {
	Button,
	Card,
	Checkbox,
	DatePicker,
	Typography,
	Form,
	Input,
	InputNumber,
	Popconfirm,
	Select,
	Tooltip,
	Modal,
	Alert,
} from "antd";
import moment from "moment";
import { observer } from "mobx-react";
import { useStore } from "../Context";

const { Title } = Typography;

const styles: { [name: string]: React.CSSProperties } = {
	tableCell: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		height: "100%",
		paddingTop: "12px",
	},
	answerLine: {
		borderBottom: "1px solid",
		height: "100%",
		flex: 1,
		marginBottom: "8px",
		paddingBottom: "4px",
		display: "flex",
		alignItems: "flex-end",
		fontWeight: 600,
	},
	tableAnswer: {
		marginTop: "15px",
		fontSize: "20px",
		fontWeight: 700,
		color: "#3b3b3b",
	},
};

const PrintableFormData = observer((props: any) => {
	console.log("props", props);
	const form = props.form;
	const date = form.getFieldValue("eventDate");
	const eventDate = !!date ? moment(date).format("DD-MMM-YYYY") : "";
	const store = useStore();
	const facility = store.currentOrganisation;

	const name = props.formVals["ZYKmQ9GPOaF"];
	const nin = props.formVals["MOstDqSY0gO"];
	const sex = props.formVals["e96GB4CXyd3"];
	const district = props.formVals["t5nTEmlScSt"];
	const subcounty = props.formVals["u44XP9fZweA"];
	const village = props.formVals["dsiwvNQLe5n"];
	const dod = props.formVals["i8rrl8YWxLF"];
	const dateOfDeath = !!dod ? moment(dod).format("DD-MMM-YYYY") : "";

	const parish = "";

	const certified = props.certified;
	const causeOfDeath = props.formVals["QTKk2Xt8KDu"];

	return (
		<>
			<table className="my-2 w-full border-collapse">
				<tbody>
					<tr>
						<td
							className="border p-1 text-center"
							style={{ height: "120px" }}
							colSpan={12}
						>
							<div style={styles.tableCell}>
								<b>FULL NAME</b>
								<p style={styles.tableAnswer}>{name}</p>
							</div>
						</td>
					</tr>
					<tr>
						<td className="border p-1 text-center" colSpan={3}>
							<div style={styles.tableCell}>
								<b>
									NIN/AIN
									<br />
									Of
									<br />
									Deceased
								</b>
							</div>
						</td>
						<td className="border p-1 text-center" colSpan={2}>
							<div style={styles.tableCell}>
								<b>SEX</b>
							</div>
						</td>
						<td className="border p-1 text-center" colSpan={3}>
							<div style={styles.tableCell}>
								<b>DISTRICT</b>
							</div>
						</td>
						<td className="border p-1 text-center" colSpan={2}>
							<div style={styles.tableCell}>
								<b>SUB COUNTY</b>
							</div>
						</td>

						<td className="border p-1 text-center" colSpan={2}>
							<div style={styles.tableCell}>
								<b>VILLAGE</b>
							</div>
						</td>
					</tr>
					<tr>
						<td
							className="border p-1 text-center"
							colSpan={3}
							style={{ height: "120px" }}
						>
							<p style={styles.tableAnswer}>{nin}</p>
						</td>

						<td
							className="border p-1 text-center"
							colSpan={2}
							style={{ height: "120px" }}
						>
							<p style={styles.tableAnswer}>{sex}</p>
						</td>
						<td
							className="border p-1 text-center"
							colSpan={3}
							style={{ height: "120px" }}
						>
							<p style={styles.tableAnswer}>{district}</p>
						</td>
						<td
							className="border p-1 text-center"
							colSpan={2}
							style={{ height: "120px" }}
						>
							<p style={styles.tableAnswer}>{subcounty}</p>
						</td>

						<td
							className="border p-1 text-center"
							colSpan={2}
							style={{ height: "120px" }}
						>
							<p style={styles.tableAnswer}>{village}</p>
						</td>
					</tr>
					<tr>
						<td className="border" colSpan={12}>
							<div style={{ height: "20px" }}></div>
						</td>
					</tr>
					<tr>
						<td className="border p-1 text-center" colSpan={4}>
							<div style={styles.tableCell}>
								<b>
									DATE OF
									<br />
									DEATH OF
									<br />
									THE DECEASED
								</b>
							</div>
						</td>

						<td className="border p-1 text-center" colSpan={4}>
							<div style={styles.tableCell}>
								<b>CAUSE OF DEATH</b>
							</div>
						</td>
						<td className="border p-1 text-center" colSpan={4}>
							<div style={styles.tableCell}>
								<b>
									WHETHER CAUSE OF
									<br />
									DEATH WAS
									<br />
									MEDICALLY
									<br />
									CERTIFIED
								</b>
							</div>
						</td>
					</tr>
					<tr>
						<td
							className="border p-1 text-center"
							colSpan={4}
							style={{ height: "120px" }}
						>
							<p style={styles.tableAnswer}>{dateOfDeath}</p>
						</td>
						<td
							className="border p-1 text-center"
							colSpan={4}
							style={{ height: "120px" }}
						>
							<p style={styles.tableAnswer}>{causeOfDeath}</p>
						</td>
						<td
							className="border p-1 text-center"
							colSpan={4}
							style={{ height: "120px" }}
						>
							{certified ? "Yes" : "No"}
						</td>
					</tr>
				</tbody>
			</table>

			<div style={{ display: "flex", flexDirection: "column" }}>
				<div
					style={{
						marginTop: "30px",
						height: "50px",
						width: "50%",
						display: "flex",
						alignItems: "flex-end",
					}}
				>
					<b style={{ marginBottom: "10px" }}>Reported on:</b>
					<div style={{ ...styles.answerLine, marginLeft: "8px" }}>
						{eventDate}
					</div>
				</div>
				<div style={{ display: "flex", justifyContent: "flex-end" }}>
					<div
						style={{
							marginTop: "40px",
							width: "40%",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<div style={styles.answerLine}></div>
						<b>Notifier Of Births and Deaths</b>
						<div style={{ ...styles.answerLine, marginTop: "50px" }}>
							{facility}
						</div>
						<b>Registration Area</b>
					</div>
				</div>
			</div>
		</>
	);
});

export const FormPrint = React.forwardRef<any, any>((props, ref) => {
	return (
		<Card
			ref={ref}
			title={
				<>
					<Title className="text-center" level={2}>
						DEATH NOTIFICATION RECORD
					</Title>
					<p style={{ fontStyle: "italic", textAlign: "center" }}>
						Registration of Persons Act 2015
					</p>
				</>
			}
		>
			<PrintableFormData {...props} />
		</Card>
	);
});
