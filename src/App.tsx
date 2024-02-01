import { observer } from "mobx-react";
import React from "react";
import { HeaderBar } from "@dhis2/ui-widgets";
import ExcelToJsonConverter from "./components/FileUpload";



export const App = observer(() => {

  return (
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
          <ExcelToJsonConverter/>
      </>

  );
});
