import React, { SFC, useState, useEffect } from "react";
import "../../styles/langConfig.css";
import { observer } from "mobx-react";
import englishDefault from "../../assets/english.json";
import frenchDefault from "../../assets/french.json";
import { useStore } from "../../Context";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button, notification, Select } from "antd";
import ConfigurationPage from "./ConfigurationPage";
import MetaDataConfig from "./MetaDataConfig";
import Metadata2 from "./../../language_integration/metadata2.json";
const { Option } = Select;

const LanguageConfigPage = () => {
  const store = useStore();
  const [languagesList, setLanguagesList] = useState([
    englishDefault,
    frenchDefault,
  ]);
  const langDefault = "Select a Language";
  const currentLanguage = store.activeLanguage;
  const [currentLanguageID, setCurrentLanguageID] = useState("");
  const [currentLanguageName, setCurrentLanguageName] = useState(langDefault);
  const [showConfiguration, setShowConfiguration] = useState(false);
  const [configStep, setConfigStep] = useState(1);
  const [newLanguage, setNewLanguage] = useState(englishDefault);

  const setLanguage = (lang: any) => store.setActiveLanguage(lang);
  const getLanguages = async () => {};

  const chooseLanguage = (lang: any) => {
    const actualLang = languagesList.find((it) => it.LanguageName === lang);
    setLanguage(actualLang);
    if (actualLang?.LanguageName) {
      setCurrentLanguageID(lang?.LanguageID);
      setCurrentLanguageName(lang?.LanguageName);
    }
  };

  const saveAllNewData = async () => {
    store.saveNewLang(newLanguage?.LanguageName, newLanguage);
    notification.success({
      message: "Update",
      description: "Language saved successfully",
      onClick: () => {},
      duration: 2,
    });
    // store.getAllLanguages();

    store.getSingleLanguage("English");
  };

  const handleAddLangConfig = (result: any) => {
    setNewLanguage(result);
    if (!result?.LanguageName) {
      notification.error({
        message: "Validation Error!",
        description:
          "Please name your language first. This is the first field on the form",
        onClick: () => {},
        duration: 2,
      });
      return;
    }
    setConfigStep(2);
  };

  const handleAddMetaDataConfig = (result: any) => {
    saveAllNewData();
  };

  useEffect(() => {
    console.log("Metadata keys are ", Object.keys(Metadata2));
    console.log("Metadata is ", Metadata2);
  }, []);

  return (
    <div className="lang-config-form-container">
      {showConfiguration ? (
        <>
          {configStep === 1 ? (
            <ConfigurationPage
              receiveOutput={handleAddLangConfig}
              listLength={languagesList.length}
            />
          ) : null}
          {configStep === 2 ? (
            <MetaDataConfig receiveOutput={handleAddMetaDataConfig} />
          ) : null}
        </>
      ) : (
        <form className="lang-config-form">
          <h2 className="lang-config-title">
            Please choose a language or configure a new one
          </h2>

          <Select
            style={{ width: "100%" }}
            size="large"
            key={`${Math.random()}`}
            value={currentLanguageName}
            onChange={(e: any) => {
              chooseLanguage(e);
            }}
          >
            {languagesList.map((option: any) => (
              <Option key={option.LanguageName} value={option.LanguageName}>
                {option.LanguageName}
              </Option>
            ))}
          </Select>
          <div className="button-container">
            <Button type="primary">Confirm Selection</Button>
            <Button
              type="primary"
              ghost
              onClick={() => setShowConfiguration(true)}
            >
              Configure Language
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LanguageConfigPage;
