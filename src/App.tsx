import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { DataEntryForm } from "./components/Form";
import { HeaderBar } from "@dhis2/ui-widgets";
import { useDataEngine } from "@dhis2/app-runtime";
import englishDefault from "./assets/english.json";
import englishMeta from "./components/LanguageConfigPage/fullMetaData.json";
import { store } from "./Store";
import { OrgUnitTree } from "./components/OrgUnitTree";
import { StoreContext } from "./Context";
import { EventList } from "./components/EventList";
import LanguageConfigPage from "./components/LanguageConfigPage";

export const App = observer(() => {
  const engine = useDataEngine();
  store.setEngine(engine);
  const [loading, setLoading] = useState(false);

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

  const goToEvents = () => {
    store.showEvents();
  };

  const getActiveLanguage = async () => {
    setLoading(true);
    const activeLanguage = await store.getActiveLanguage();
    console.log("activeLanguage found is ", activeLanguage);
    if (activeLanguage?.language) {
      // Set the UI values
      console.log("Setting active language now");
      store.setActiveLanguage({ lang: activeLanguage.language });
    } else {
      // Post a new default language as English and set it as the active language.
      store.setActiveLanguage(englishDefault);
      await store.saveActiveLanguage(
        englishDefault?.LanguageName,
        englishDefault
      );
      await store.postLanguageMeta(englishMeta);
      await store.saveNewLang(
        englishDefault?.LanguageName,
        englishDefault,
        englishMeta
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    getActiveLanguage();
  }, []);

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
      {store.currentPage === "2" ? (
        <div className="p-2">
          <LanguageConfigPage next={goToEvents} />
        </div>
      ) : (
        <div className="p-2">
          <OrgUnitTree loading={loading} />
          {/* <DataEntryForm /> */}
          {store.currentPage === "3" ? <DataEntryForm /> : <EventList />}
        </div>
      )}
    </StoreContext.Provider>
  );
});
