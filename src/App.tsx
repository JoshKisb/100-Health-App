import { observer } from "mobx-react";
import React from "react";
import ExcelToJsonConverter from "./components/FileUpload";



export const App = observer(() => {

  return (
      <>
          <ExcelToJsonConverter/>
      </>

  );
});
