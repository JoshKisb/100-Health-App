import React, { SFC, useState } from "react";
import * as ECT from "@whoicd/icd11ect";
import { Button, Form, Input, Popconfirm } from "antd";
import { CloseOutlined, ConsoleSqlOutlined } from "@ant-design/icons";

import "@whoicd/icd11ect/style.css";
import "../App.css";
import { observer } from "mobx-react";
import { useStore } from "../Context";
import { any } from "prop-types";

const mySettings = {
    apiServerUrl: "https://icd11restapi-developer-test.azurewebsites.net",
    autoBind: false,
};

const state = {
    field1: "",
};

interface ICD {
    field: string;
    form: any;
    codeField?: string;
    uriField?: string;
    disabled?: boolean;
    next?: string;
    searchQueryField?: string;
    bestMatchTextField?: string;
    enableAltText?: any;
    addUnderlyingCause?: any;
    id?: string;
}

export const ICDField: SFC<ICD> = observer(
    ({
        field,
        form,
        codeField,
        uriField,
        searchQueryField,
        bestMatchTextField,
        next,
        enableAltText,
        disabled = false,
        addUnderlyingCause,
        id,
    }) => {
        // Testing
        const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
        const [inputIsDisabled, setInputIsDisabled] = useState(false);

        //
        const [value, setValue] = useState("");
        const [visible, setVisible] = useState(!form.getFieldValue(field));
        const store = useStore();

        const myCallbacks = {
            // Testing
            searchEndedFunction: (e: any) => {
                //this callback is called when search ends.
                setButtonIsDisabled(false);
                setTimeout(() => {
                    if (id) {
                        let resultsExist = document
                            .getElementById(id)
                            ?.getElementsByClassName("entityDetailsContent")
                            ?.length;

                        if (resultsExist) {
                            alert("There are results");
                        } else {
                            alert("There are no results");
                        }
                    }
                }, 2000);
            },
            // End of Testing
            selectedEntityFunction: (selectedEntity: any) => {
                form.setFieldsValue({
                    [field]: selectedEntity.title,
                });
                if (next) {
                    store.enableValue(next);
                }
                if (codeField) {
                    form.setFieldsValue({
                        [codeField]: selectedEntity.code,
                    });

                    // Testing
                    if (addUnderlyingCause) {
                        addUnderlyingCause(
                            selectedEntity.code,
                            selectedEntity.title
                        ); // Calls a function from the props that sets the underlying cause as the code
                    }
                } else {
                    if (addUnderlyingCause) {
                        addUnderlyingCause(
                            selectedEntity.title,
                            selectedEntity.title
                        );
                    }
                    // End of Testing
                }

                if (uriField) {
                    form.setFieldsValue({
                        [uriField]: selectedEntity.uri,
                    });
                }

                if (searchQueryField) {
                    //console.log(selectedEntity.searchQuery);
                    console.log(
                        "Setting searchQuery field to ",
                        selectedEntity.searchQuery
                    );

                    form.setFieldsValue({
                        [searchQueryField]: selectedEntity.searchQuery,
                    });
                }

                if (bestMatchTextField) {
                    //console.log(selectedEntity.searchQuery);
                    console.log(selectedEntity.bestMatchText);

                    console.log("best match field is", bestMatchTextField);
                    console.log("Selected entity is", selectedEntity);

                    form.setFieldsValue({
                        //[uriField]: selectedEntity.uri
                    });
                } else {
                    console.log("There was no best match");
                }
                ECT.Handler.clear(field);
                setVisible(false);
                setValue("");
            },
        };

        ECT.Handler.configure(mySettings, myCallbacks);
        ECT.Handler.bind(field);

        var altSearchText;
        const clear = () => {
            // Testing
            if (addUnderlyingCause) {
                addUnderlyingCause("", ""); // Calls a function from the props that resets the underlying cause
            }
            // End of Testing

            ECT.Handler.clear(field);
            setVisible(false);
        };

        const switchToAltText = () => {
            // Testing
            clear(); // Clears the search results
            setButtonIsDisabled(true); // Disables the cancel button
            setInputIsDisabled(true); // Disables the search input field
            setValue(""); // Clears the search field
            if (enableAltText) {
                enableAltText(false); // Calls a function from props that enables the alt text field
            }
        };

        return (
            <div id={id}>
                {visible ? (
                    <div className="flex">
                        <Input
                            size="large"
                            disabled={
                                disabled
                                    ? disabled
                                    : inputIsDisabled
                                    ? inputIsDisabled
                                    : false
                            }
                            className="ctw-input"
                            data-ctw-ino={field}
                            value={value}
                            onChange={(e: any) => {
                                setValue(e.target.value);
                                var CODA = e.target.value;
                                store.causeOfDeathAltSearch(e.target.value);
                                form.setFieldsValue({ cSDJ9kSJkFP: null });
                            }}
                            onClick={(e: any) => {
                                console.log(codeField);
                                if (codeField === "zD0E77W4rFs") {
                                    store.enableValue("zD0E77W4rFs");
                                    store.enableValue("sfpqAeqKeyQ");
                                    store.disableValue("QHY3iYRLvMp");
                                }

                                console.log("input working");
                                setValue("");
                                // if (form.getFieldValue('sfpqAeqKeyQ') === ''){

                                //     form.setFieldsValue({ zD0E77W4rFs: null });
                                //     console.log('clear working')
                                // }
                            }}
                        />
                        <Popconfirm
                            disabled={buttonIsDisabled}
                            title="ICD Code not found, use as Free  search Text Field?"
                            onConfirm={(e: any) => {
                                console.log(store.ICDAltSearchtextA);
                                console.log(store.currentEvent);
                                console.log(codeField);
                                console.log(searchQueryField);
                                console.log(bestMatchTextField);

                                // var cod = JSON.stringify(codeField);

                                if (codeField === "zD0E77W4rFs") {
                                    store.disableValue("zD0E77W4rFs");
                                    store.disableValue("sfpqAeqKeyQ");
                                    store.enableValue("QHY3iYRLvMp");
                                    store.enableValue("Ylht9kCLSRW");
                                    form.setFieldsValue({ zD0E77W4rFs: null });
                                    form.setFieldsValue({ sfpqAeqKeyQ: null });
                                }

                                if (codeField === "tuMMQsGtE69") {
                                    store.disableValue("tuMMQsGtE69");
                                    store.disableValue("zb7uTuBCPrN");
                                    store.enableValue("NkiH8GTX6HC");
                                    store.enableValue("myydnkmLfhp");
                                    form.setFieldsValue({ tuMMQsGtE69: null });
                                    form.setFieldsValue({ zb7uTuBCPrN: null });
                                }

                                if (codeField === "C8n6hBilwsX") {
                                    store.disableValue("C8n6hBilwsX");
                                    store.disableValue("QGFYJK00ES7");
                                    store.enableValue("SDPq8UURlWc");
                                    store.enableValue("aC64sB86ThG");
                                    form.setFieldsValue({ C8n6hBilwsX: null });
                                    form.setFieldsValue({ QGFYJK00ES7: null });
                                }

                                if (codeField === "IeS8V8Yf40N") {
                                    store.disableValue("IeS8V8Yf40N");
                                    store.disableValue("CnPGhOcERFF");
                                    store.enableValue("zqW9xWyqOur");
                                    store.enableValue("cmZrrHfTxW3");
                                    form.setFieldsValue({ IeS8V8Yf40N: null });
                                    form.setFieldsValue({ CnPGhOcERFF: null });
                                }

                                // store.disableValue(cod);

                                // console.log(e.target.value);

                                // Testing
                                switchToAltText();
                            }}
                        >
                            <Button
                                disabled={buttonIsDisabled}
                                size="large"
                                icon={
                                    <CloseOutlined
                                        style={{
                                            fontSize: "16px",
                                            color: "red",
                                        }}
                                    />
                                }
                            />
                        </Popconfirm>
                    </div>
                ) : (
                    <Form.Item name={field} className="m-0">
                        <Input
                            size="large"
                            disabled={store.viewMode}
                            onClick={() => {
                                if (!store.viewMode) {
                                    setVisible(true);
                                }
                            }}
                        />
                    </Form.Item>
                )}
                <div className="ctw-window" data-ctw-ino={field}></div>
            </div>
        );
    }
);
