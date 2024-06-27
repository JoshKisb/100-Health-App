import React from "react";
import { HeaderBar } from "@dhis2/ui-widgets";

import DataUi from "./components/DataValidation";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import MnhData from "./components/MnhData";
import Loader from "./components/Loader/Loader";


export const App = () => {
	return (
		<Router>
			<>
				<HeaderBar
					appName={" File uploader"}
					style={{
						left: 0,
						position: "fixed",
						top: 0,
						width: "100%",
						zIndex: 1000,
					}}
				/>
				{/*<Loader/>*/}
				<Switch>
					<Route exact path="/">
						<DataUi />
					</Route>
					<Route path="/:area">
						<MnhData />
					</Route>
				</Switch>
			</>
		</Router>
	);
};
