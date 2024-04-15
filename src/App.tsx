import { observer } from "mobx-react";
import React from "react";
import { HeaderBar } from "@dhis2/ui-widgets";
import HealthForm from "./components/Form";



export const App = observer(() => {

  return (
      <>
          <HeaderBar
              appName={"Health Form"}
              style={{
                  left: 0,
                  position: "fixed",
                  top: 0,
                  width: "100%",
                  zIndex: 1000,
              }}
          />
          <HealthForm/>
      </>

  );
});
