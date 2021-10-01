import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import "../../styles/langConfig.css";
import { observer } from "mobx-react";
import englishDefault from "../../assets/english.json";
import englishMeta from "./fullMetaData.json";
import { useStore } from "../../Context";
import { Button, notification, Select, Spin } from "antd";
import MetaDataConfig from "./MetaDataConfig";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import {
  generateMetadataNames,
  generateNewMetaObject,
} from "./metaTranslation";

let templateT: any = {};
templateT["LanguageID"] = `any`;

let UITranslationTemplateData: { eng: string; other: string }[] = Object.keys(
  englishDefault
).map((key: string) => ({
  eng: key,
  other: "",
}));

let MetaTranslationTemplateData: { eng: string; other: string }[] =
  generateMetadataNames();

const templateHeaders = [
  { label: "English Version", key: "eng" },
  { label: "Your Language", key: "other" },
];

const { Option } = Select;

interface LanguageConfigPageTypes {
  next?: any;
}

// console.log("MetaTranslationTemplateData is ", MetaTranslationTemplateData);
const LanguageConfigPage: FunctionComponent<LanguageConfigPageTypes> = observer(
  ({ next }) => {
    const store = useStore();
    const [languagesList, setLanguagesList] = useState([
      {
        language: englishDefault,
        meta: englishMeta,
      },
    ]);
    const uiTranslationUploader = useRef<HTMLInputElement>(null);
    const metadataTranslationUploader = useRef<HTMLInputElement>(null);
    const langDefault = "Select a Language";
    const currentLanguage = store.activeLanguage;
    const [currentLanguageID, setCurrentLanguageID] = useState("");
    const [currentLanguageName, setCurrentLanguageName] = useState(langDefault);
    const [showConfiguration, setShowConfiguration] = useState(false);
    const [configStep, setConfigStep] = useState(1);
    const [newLanguage, setNewLanguage] = useState(englishDefault);
    const [newLanguageObj, setNewLanguageObj] = useState(englishDefault);
    const [newMetadataObj, setNewMetadataObj] = useState(englishDefault);
    const [newLangValid, setNewLangValid] = useState(false);
    const [newMetadataValid, setNewMetadataValid] = useState(false);
    const [uploadingMetadata, setUploadingMetadata] = useState(false);
    const [newMetaFields, setNewMetaFields] = useState([""]);
    const [newMetaVals, setNewMetaVals] = useState([""]);
    const [chosenLang, setChosenLang] = useState({
      language: englishDefault,
      meta: englishMeta,
    });
    const [loading, setLoading] = useState(false);

    const setLanguage = async (lang: any) => {
      console.log("Lang is ", lang);
      await store.setActiveLanguage(lang);
    };
    const setLanguageMeta = async (meta: any) => {
      await store.postLanguageMeta(meta);
    };
    const getLanguages = async () => {
      const allLanguages = await store
        .getAllLanguages()
        .then((res) => {
          setLoading(false);
          return res;
        })
        .catch((err) => setLoading(false));

      setLanguagesList(allLanguages);
      console.log("Languages are", allLanguages);
    };

    const chooseLanguage = async (lang: any) => {
      console.log("Choosing ", lang);
      const actualLang = languagesList.find(
        (it) => it.language.LanguageName === lang
      );
      console.log("Language is ", actualLang);
      // return;

      if (actualLang?.language && actualLang.meta) {
        setChosenLang(actualLang);
      }
    };

    const confirmLangChoice = async () => {
      setLoading(true);
      await setLanguage(chosenLang.language);
      if (chosenLang?.language.LanguageName) {
        setCurrentLanguageID(chosenLang.language?.LanguageID);
        setCurrentLanguageName(chosenLang.language?.LanguageName);
        await setLanguageMeta(chosenLang?.meta)
          .then((res) => setLoading(false))
          .catch((err) => setLoading(false));
      } else {
        setLoading(false);
      }
      next();
    };

    const saveAllNewData = () => {
      store.saveNewLang(
        newLanguageObj?.LanguageName,
        newLanguageObj,
        newMetadataObj
      );

      notification.success({
        message: "Update",
        description: "Language saved successfully",
        onClick: () => {
          setLoading(true);
          getLanguages();
        },
        onClose: () => {
          setLoading(true);
          notification.info({
            message: "Update",
            description: "Getting new languages list from store",
            duration: 2,
          });
          getLanguages();
        },
        duration: 2,
      });

      store.getSingleLanguage("English");
    };

    const uploadUICSV = (e: any) => {
      const fileReceived = e.target.files[0];

      Papa.parse(fileReceived, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
          let finalRes: typeof templateT = {};

          if (results?.data && typeof results?.data === typeof []) {
            results.data.forEach((it: typeof templateT) => {
              if (it["English Version"] && `${it["Your Language"]}`) {
                finalRes[it["English Version"]] = `${it["Your Language"]}`;
              }
            });
          }

          setNewLanguageObj(finalRes);
        },
      });
    };

    const uploadMetaCSV = (e: any) => {
      setUploadingMetadata(true);
      const fileReceived = e.target.files[0];

      Papa.parse(fileReceived, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
          let fields = [""];
          let vals = [""];
          if (results?.data && typeof results?.data === typeof []) {
            results.data.forEach((it: typeof templateT, index) => {
              if (index === 0) {
                fields = [it["English Version"]];
                vals = [it["Your Language"]];
              } else {
                fields.push(it["English Version"]);
                vals.push(it["Your Language"]);
              }
            });
          }

          setNewMetaFields(fields);
          setNewMetaVals(vals);
        },
      });
    };

    const handleInitiateUIUpload = () => {
      if (null !== uiTranslationUploader.current) {
        uiTranslationUploader.current.click();
      }
    };

    const handleInitiateMetaUpload = () => {
      if (null !== metadataTranslationUploader.current) {
        metadataTranslationUploader.current.click();
      }
    };

    useEffect(() => {
      if (englishDefault === newLanguageObj) return;

      // Validating the new language
      const allFields = Object.keys(englishDefault);
      const newLangFields = Object.keys(newLanguageObj);

      // Validation checks
      const someFieldsEmpty = !Object.values(newLanguageObj).some(
        (x) => x !== null && x !== ""
      );
      const noNewFields = newLangFields.every((x) => allFields.includes(x));
      const allFieldsPresent = allFields.every((x) =>
        newLangFields.includes(x)
      );

      // Validation error messages
      if (!noNewFields || !allFieldsPresent || someFieldsEmpty) {
        if (!noNewFields) {
          notification.error({
            message: "Validation Error!",
            description:
              "Did you add any new fields not present in the template to your UI CONFIG csv?",
            onClick: () => {},
            duration: 3,
          });
        }

        if (!allFieldsPresent) {
          notification.error({
            message: "Validation Error!",
            description:
              "Some of the fields provided in the template UI CONFIG csv are missing in your UI CONFIG csv !",
            onClick: () => {},
            duration: 3,
          });
        }

        if (someFieldsEmpty) {
          notification.error({
            message: "Validation Error!",
            description: "Some of the values in your UI CONFIG csv are empty!",
            onClick: () => {},
            duration: 3,
          });
        }
        setNewLangValid(false);
      } else {
        notification.success({
          message: "Validation Passed!",
          description: "Your translation passed all validation checks!",
          onClick: () => {},
          duration: 2,
        });
        setNewLangValid(true);
        // Configure the metadata into a new object here.
      }
    }, [newLanguageObj]);

    useEffect(() => {
      if (!uploadingMetadata) return;
      if (!(newMetaFields.length > 1) || !(newMetaVals.length > 1)) return;

      // Validating the new metadata
      const allFields = MetaTranslationTemplateData.map((it) => it.eng);

      // Validation checks
      const someFieldsEmpty = !newMetaVals.some((x) => x !== null && x !== "");
      const noNewFields = newMetaFields.every((x) => allFields.includes(x));
      const allFieldsPresent =
        allFields.every((x) => newMetaFields.includes(x)) &&
        allFields.length === newMetaFields.length;

      // Validation error messages
      if (!noNewFields || !allFieldsPresent || someFieldsEmpty) {
        if (!noNewFields) {
          notification.error({
            message: "Validation Error!",
            description:
              "Did you add any new fields not present in the template to your METADATA CONFIG csv?",
            onClick: () => {},
            duration: 3,
          });
          setUploadingMetadata(false);
          return setNewMetadataValid(false);
        }

        if (someFieldsEmpty) {
          notification.error({
            message: "Validation Error!",
            description: "Some of the values in your METADATA csv are empty!",
            onClick: () => {},
            duration: 3,
          });
          setUploadingMetadata(false);
          return setNewMetadataValid(false);
        }

        if (!allFieldsPresent) {
          notification.error({
            message: "Validation Error!",
            description:
              "Some of the fields provided in the template METADATA CONFIG csv are missing in your METADATA CONFIG csv!",
            onClick: () => {},
            duration: 3,
          });
          setUploadingMetadata(false);
          return setNewMetadataValid(false);
        }
      } else {
        notification.success({
          message: "Validation Passed!",
          description:
            "Your METADATA translation passed all validation checks!",
          onClick: () => {},
          duration: 2,
        });

        // console.log("\n\nnewMetadataObj is ", newMetadataObj);
        // console.log("\n\nnewMetaVals is ", newMetaVals);

        setNewMetadataObj(generateNewMetaObject(newMetaVals));
        // const newMetadataToSend = generateNewMetaObject(newMetaVals);
        setNewMetadataValid(true);
      }
      setUploadingMetadata(false);
    }, [newMetaFields, newMetaVals]);

    useEffect(() => {
      setLoading(true);
      getLanguages();
    }, []);

    return (
      <div className="lang-config-form-container">
        <form className="lang-config-form">
          <h2 className="lang-config-title">
            Please choose a language or configure a new one
          </h2>

          <Spin spinning={loading}>
            <Select
              style={{ width: "100%" }}
              size="large"
              key={`${Math.random()}`}
              value={currentLanguageName}
              onChange={(e: any) => {
                console.log("Sending e as ", e);
                chooseLanguage(e);
              }}
            >
              {languagesList?.length &&
                languagesList.map((option: any) => (
                  <Option
                    key={option.language.LanguageName}
                    value={option.language.LanguageName}
                  >
                    {option.language.LanguageName}
                  </Option>
                ))}
            </Select>
          </Spin>
          <div className="button-container">
            <Button
              type="primary"
              onClick={confirmLangChoice}
              disabled={loading}
            >
              Confirm Selection
            </Button>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <h2>Configure a new language below</h2>
            <small>
              Download <b style={{ color: "red" }}>both</b> the Metadata and the
              UI configuration files, translate them by yourself, then upload
              them here.
              <br />
              <b style={{ color: "red" }}>Please note:</b> It may take up to 5
              minutes for your language to reflect in the store. If you do not
              see it immediately after uploading, be patient and refresh.
            </small>
          </div>

          <div className="button-container">
            <CSVLink
              data={UITranslationTemplateData}
              headers={templateHeaders}
              filename={"UI_TRANSLATION_TEMPLATE.csv"}
              target="_blank"
            >
              <Button type="primary" ghost>
                Download UI Configuration CSV
              </Button>
            </CSVLink>

            <Button type="primary" onClick={handleInitiateUIUpload}>
              Upload UI Configuration CSV
            </Button>
            <input
              style={{ display: "none" }}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={uploadUICSV}
              ref={uiTranslationUploader}
            />
          </div>

          <div className="button-container">
            <CSVLink
              data={MetaTranslationTemplateData}
              headers={templateHeaders}
              filename={"METADATA_TRANSLATION_TEMPLATE.csv"}
              target="_blank"
            >
              <Button type="primary" ghost>
                Download Metadata Configuration CSV
              </Button>
            </CSVLink>

            <Button type="primary" onClick={handleInitiateMetaUpload}>
              Upload Metadata Configuration CSV
            </Button>
            <input
              style={{ display: "none" }}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={uploadMetaCSV}
              ref={metadataTranslationUploader}
            />
          </div>

          <div className="button-container">
            <Button
              type="primary"
              onClick={saveAllNewData}
              size="large"
              disabled={!newLangValid || !newMetadataValid}
            >
              Finish Configuration
            </Button>
          </div>
        </form>
      </div>
    );
  }
);

export default LanguageConfigPage;
