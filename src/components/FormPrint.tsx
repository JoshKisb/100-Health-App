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
import { useTranslation } from "../utils/useTranslation";

const { Title } = Typography;

const styles: { [name: string]: React.CSSProperties } = {
	tableCell: {
		// display: "flex",
		// alignItems: "center",
		height: "100%",
		padding: "8px",
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
		width: "65%",
		fontSize: "20px",
		fontWeight: 700,
		color: "#3b3b3b",
		padding: "8px",
	},
};



const PrintableFormData = observer((props: any) => {
	console.log("props", props);
	const form = props.form;
	const date = form.getFieldValue("eventDate");
	const eventDate = !!date ? moment(date).format("DD-MMM-YYYY") : "";
	const store = useStore();
	const facility = store.currentOrganisationTree;
	const tr = useTranslation();

	const name = props.formVals["ZYKmQ9GPOaF"];
	const nin = props.formVals["MOstDqSY0gO"];
	const sex = props.formVals["e96GB4CXyd3"];
	const dob = props.formVals["RbrUuKFSqkZ"];
	const age = props.formVals["q7e7FOXKnOf"];
	const profession = props.formVals["b70okb06FWa"];
	const district = props.formVals["t5nTEmlScSt"];
	const subcounty = props.formVals["u44XP9fZweA"];
	const village = props.formVals["dsiwvNQLe5n"];
	const inpatientNo = props.formVals["FGagV1Utrdh"];
	const dod = props.formVals["i8rrl8YWxLF"];
	const dateOfDeath = !!dod ? moment(dod).format("DD-MMM-YYYY") : "";
	const timeOfDeath = !!dod ? moment(dod).format('HH:mm:ss') : "";
	const placeOfBirth = props.formVals["xNCSFrgdUgi"];
	console.log(dod)

	const parish = "";

	const certified = props.certified;
	const causeOfDeath = props.formVals["QTKk2Xt8KDu"];

	const getDEValue = (dataElementId) => {
		const value = props.formVals[dataElementId];
		if (!value) return "";
		if (typeof value === "string") return value;
		if (value instanceof moment) return moment(value).format("DD-MMM-YYYY");
		return value.toString();
	};

	return (
		<>
			<div style={{ backgroundColor: "lightgray", width: "100%", padding: "5px 0", textAlign: "center" }}>
				<p style={{ margin: 0, color: "black", fontWeight: "bold",fontSize: "20px"}}>
					{tr('I-INFORMATIONS ADMINISTRATIVES')}
				</p>
			</div>

				<div style={{ textAlign: "left" }}>
					<p style={{ fontStyle: "italic" }}>
						{ tr('Je soussigné (e) M/Mme1 : ...............................................................................................................................................................................................') }<br/>
						{ tr(' Qualification:............................................................................................................................................................ N°...................................................') }<br/>
						{ tr('en service ________________________________________________________________________________________certifie que le deces de') }<br/>
						{ tr('la personne désignée ci-dessous, est réel et constant.') }<br/>
						{ tr(`Date et heure du décés _________________${dateOfDeath || ""}____________ / _______${timeOfDeath || ""}_____________________________`) }<br/>
						{ tr(`Lieu de décés 2__________________________${placeOfBirth || ""}________________________________________________________`) }

					</p>
				</div>



			{/*<table className="my-2 w-full print-table">*/}

			{/*	<tbody>*/}
			{/*		{store.printColumns.map((dataElement) => (*/}
			{/*			<tr key={dataElement.id}>*/}
			{/*				<td style={styles.tableCell}>{dataElement.name}</td>*/}
			{/*				<td style={styles.tableAnswer}>*/}
			{/*					{getDEValue(dataElement.id)}*/}
			{/*				</td>*/}
			{/*			</tr>*/}
			{/*		))}*/}
			{/*	</tbody>*/}
			{/*</table>*/}

			<div style={{ backgroundColor: "lightgray", width: "100%", padding: "5px 0", textAlign: "center" }}>
				<p style={{ margin: 0, color: "black", fontWeight: "bold", fontSize: "20px"}}>
					{tr('II-RENSEIGNEMENTS GENERAUX SUR LE DEFUNT ')}
				</p>
			</div>

			<div style={{ textAlign: "left" }}>
				<p style={{ fontStyle: "italic" }}>
					{ tr(`Nom: _____________${name || ""}________________________________ Prénom(s): _________________________________`) }<br/>
					{ tr(`Sexe: _________${sex||""}____________________Néle:___________${dob|| ""}______________________________`) }<br/>
					{ tr(`ou Age: _______________${age|| ""}_________________Domicile:________________________________________profession______${profession||""}_________`) }<br/>
					{ tr(`Nationalité:............................................................................... N° Identifiant du patient:_________${inpatientNo || ""}_____________________`) }<br/>
					{ tr(`Adresse: _____________________${village || ""}______________________________________________________`) }<br/>
					{ tr('Personne référente: Norm: _______________________________________Prénom(s) : _______________________________________________-') }<br/>
					{ tr('Adresse/Tel: ___________________________________________________________________________' )}<br/>
				</p>
			</div>

			<div style={{ display: "flex", flexDirection: "column" }}>
				<div
					style={{
						// marginTop: "30px",
						height: "50px",
						// width: "50%",
						display: "flex",
						alignItems: "start",
					}}
				>
					<b style={{ fontWeight: "bold", marginBottom: "10px" }}>{ tr("NB : Obstacle mèdico-lègal à I'inhumation (en raison du caractère violent, indèterminè ou suspect de la mort ou corps non identifiè) : Oui /_/Non/_/ ") }:</b>
					{/*<div style={{ ...styles.answerLine, marginLeft: "8px" }}>*/}
					{/*	{eventDate}*/}
					{/*</div>*/}
				</div>

				<div
					style={{
						marginTop: "10px",
						// height: "50px",
						width: "50%",
						display: "flex",
						alignItems: "center",
					}}
				>
					<b  className="text-center" style={{ marginBottom: "10px" }}>{ tr('Signature et cachet ') }:</b>
					{/*<div style={{ ...styles.answerLine, marginLeft: "8px" }}>*/}
					{/*	{eventDate}*/}
					{/*</div>*/}
				</div>

				<div style={{ display: "flex", justifyContent: "start" }}>
					<div
						style={{
							marginTop: "20px",
							width: "40%",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<div style={styles.answerLine}></div>
						{/*<b>{ tr('Signature') }</b>*/}
						{/*<div*/}
						{/*	style={{ ...styles.answerLine, marginTop: "50px" }}*/}
						{/*>*/}
						{/*	{facility}*/}
						{/*</div>*/}
						<b>{ tr('1 Barrer les mentions inutiles') }</b>
						<b>{ tr('2 Hopital, Unitè de soins, domicile') }</b>
						<b>{ tr('3 Intervalles entre le dèbut du processus et le dècès') }</b>
						<b>{ tr("4 Dans l'affirmative., veuillez prèciser le motif de la chirurgie (Maladie ou ètat)") }</b>
					</div>
				</div>
			</div>

			{/*<div style={{ display: "flex", flexDirection: "column" }}>*/}
			{/*	<div*/}
			{/*		style={{*/}
			{/*			marginTop: "30px",*/}
			{/*			height: "50px",*/}
			{/*			width: "50%",*/}
			{/*			display: "flex",*/}
			{/*			alignItems: "flex-end",*/}
			{/*		}}*/}
			{/*	>*/}
			{/*		<b style={{ marginBottom: "10px" }}>{ tr('Reported on') }:</b>*/}
			{/*		<div style={{ ...styles.answerLine, marginLeft: "8px" }}>*/}
			{/*			{eventDate}*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*	<div style={{ display: "flex", justifyContent: "flex-end" }}>*/}
			{/*		<div*/}
			{/*			style={{*/}
			{/*				marginTop: "40px",*/}
			{/*				width: "40%",*/}
			{/*				display: "flex",*/}
			{/*				flexDirection: "column",*/}
			{/*			}}*/}
			{/*		>*/}
			{/*			<div style={styles.answerLine}></div>*/}
			{/*			<b>{ tr('Notifier Of Births and Deaths') }</b>*/}
			{/*			<div*/}
			{/*				style={{ ...styles.answerLine, marginTop: "50px" }}*/}
			{/*			>*/}
			{/*				{facility}*/}
			{/*			</div>*/}
			{/*			<b>{ tr('Registration Area') }</b>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</div>*/}
		</>
	);
});

const CardTitle = observer((props: any) => {
	const tr = useTranslation();
	return (
		<>
			{/*<Title className="text-center" level={2}>*/}
			{/*	{ tr('DEATH NOTIFICATION RECORD') }*/}
			{/*</Title>*/}
			{/*<p style={{ fontStyle: "italic", textAlign: "center" }}>*/}
			{/*	{ tr('Registration of Persons Act 2015') }*/}
			{/*</p>*/}
			<p style={{ fontStyle: "italic", textAlign: "center" }}>
				{ tr("A transmettre à l’officier de l’état civil ") }
			</p>

			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<div style={{ textAlign: "left" }}>
					<p style={{ fontStyle: "italic", textAlign: "justify" }}>
						{ tr('MINISTERE DE LA SANTE ') }<br/>
						{ tr(' ET DE L’HYGIENE PUBLIQUE') }
						<p style={{textAlign:"center", padding: 0}}>
							{ tr(' .............................') }
						</p>
					</p>
					<p style={{ fontStyle: "italic" }}>
						{ tr('SECRETARIAT GENERAL') }
						<p style={{textAlign:"center"}}>
							{ tr(' .............................') }
						</p>
					</p>

					<p style={{ fontStyle: "italic" }}>
						{ tr('CENTRE HOSPITALIER') }<br/>
						{ tr(' REGIONAL DE ZINIARE') }
					</p>
				</div>

				{/*<div style={{ textAlign: "center" }}> /!* Modified style to center align *!/*/}
				{/*	<p>*/}
				{/*		<img src="../img/image.jpg" alt="Logo" /></p>*/}
				{/*</div>*/}

				{/*<img src="img/image.jpg" alt="Ministère de la Santé" style={{ maxWidth: "100px" }} /> /!* Add your image here *!/*/}

				<div style={{ textAlign: "right" }}>
					<Title className="text-right" level={2}>
						{ tr('BURKINA FASO') }
					</Title>
					<p style={{ fontStyle: "italic" }}>
						{ tr('unite- Progres-Justice') }
					</p>
					<p style={{ fontStyle: "italic" }}>
						{ tr('N°:......................') }
					</p>
				</div>
			</div>

			<Title className="text-center" level={2} style={{ textDecoration: "underline",fontSize: "20px" }}>
				{ tr('CERTIFICAT MEDICAL DE DECES ') }
			</Title>
		</>
	);
});

export const FormPrint = React.forwardRef<any, any>((props, ref) => {
	return (
		<Card ref={ref} title={<CardTitle />}>
			<PrintableFormData {...props} />
		</Card>
	);
});

