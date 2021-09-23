import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { DataEntryForm } from "./components/Form";
import { HeaderBar } from "@dhis2/ui-widgets";
import { useDataEngine } from "@dhis2/app-runtime";

import { store } from "./Store";
import { OrgUnitTree } from "./components/OrgUnitTree";
import { StoreContext } from "./Context";
import { EventList } from "./components/EventList";
import LanguageConfigPage from "./components/LanguageConfigPage";

export const App = observer(() => {
  const engine = useDataEngine();
  store.setEngine(engine);

  useEffect(() => {
    if (store?.organisationUnits?.length) return;
    async function test() {
      console.log("Fetching...");
      await store.loadUserOrgUnits();
    }
    test();
  });

  useEffect(() => {
    console.log(
      "store.currentPage is ",
      store.currentPage,
      store.organisationUnits
    );
  }, [store.organisationUnits]);

  return (
    <StoreContext.Provider value={store}>
      <HeaderBar
        appName={"HMIS 100 - Medical Certificate of Cause of Death"}
        style={{
          left: 0,
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
        }}
      />
      {store.currentPage === "1" ? (
        <div className="p-2">
          <LanguageConfigPage />
        </div>
      ) : (
        <div className="p-2">
          <OrgUnitTree />
          {store.currentPage === "2" ? <DataEntryForm /> : <EventList />}
        </div>
      )}
    </StoreContext.Provider>
  );
});
