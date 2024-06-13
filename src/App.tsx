import { observer } from "mobx-react";
import React from "react";
import { HeaderBar } from "@dhis2/ui-widgets";
import ExcelToJsonConverter from "./components/FileUpload";
import DataUi from "./components/DataValidation";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MnhData from "./components/MnhData";



export const App = observer(() => {

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
          {/*<ExcelToJsonConverter/>*/}
              <Switch>
                  <Route exact path="/"><DataUi/></Route>
                  <Route path="/mnh"><MnhData/></Route>
              </Switch>

      </>
      </Router>


  );
});
