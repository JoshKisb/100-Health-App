import { observer } from "mobx-react";
import React from "react";

import FileUpload from "./components/FileUpload";


export const App = observer(() => {

  return (
      <>
      <FileUpload/>
      </>

  );
});
