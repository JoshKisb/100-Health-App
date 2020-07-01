// Check the following lines for changes: 15, 16, 33-41, 444-459 892-894, 1008-1010,
// 1118-1120, 1229-1231, 1327-1334, 1336, 1340-1386, 1422-1438, 1441
import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Checkbox,
    DatePicker,
    Typography,
    Form,
    Input,
    InputNumber,
    Popconfirm,
    Select,
    Tooltip,
    Modal,
} from "antd";
import { observer } from "mobx-react";
import { ICDField } from "./ICDField";
import { useStore } from "../Context";
import { isEmpty } from "lodash";

import moment from "moment";
const { Option } = Select;
const { Title } = Typography;

export const DataEntryForm = observer(() => {
    const [form] = Form.useForm();
    const [optionSets, setOptionSets] = useState<any>();

    //blacklist
    const blacklistedValues = ["N"];
    const [showBlackListWarning, setShowBlackListWarning] = useState(false);
    const [blackListedFound, setBlackListedFound] = useState(false);
    const [underlyingCauseKey, setUnderlyingCauseKey] = useState(Math.random());
    const [showPregnancyReminder, setShowPregnancyReminder] = useState(false);
    const [timeoutToClosePopup, setTimeoutToClosePopup] = useState(
        setTimeout(() => {
            return;
        }, 1000)
    );

    // Testing
    type altSearchBooleansOptions = {
        [key: string]: boolean;
    };
    let altSearchBooleans: altSearchBooleansOptions = {
        a: true,
        b: true,
        c: true,
        d: true,
    };
    const [altSearchIsDisabled, setAltSearchIsDisabled] = useState(
        altSearchBooleans
    );

    const [underlyingCauseCode, setUnderlyingCauseCode] = useState("");

    type underlyingCauseObjectOptions = {
        [key: string]: string;
    };
    let underlyingCauseObject: underlyingCauseObjectOptions = {
        a: "",
        b: "",
        c: "",
        d: "",
        diseaseTitleA: "",
        diseaseTitleB: "",
        diseaseTitleC: "",
        diseaseTitleD: "",
    };
    const [underlyingCauses, setUnderlyingCauses] = useState(
        underlyingCauseObject
    );

    const [underlyingCauseAlt, setUnderlyingCauseAlt] = useState("");
    // End of Testing

    const store = useStore();

    const onFinish = async (values: any) => {
        await store.addEvent(values);
    };

    const notTomorrow = (date: moment.Moment) => {
        return date.isAfter(moment());
    };

    useEffect(() => {
        store.loadUserOrgUnits().then(() => {
            setOptionSets(store.optionSets);
        });
    }, [store]);

    const [testVal, setTestVal] = useState("");
    const buttonA = () => {
        // console.log("button pressed");
        // form.setFieldsValue({ QHY3iYRLvMp: "" });
        // button()
        setTestVal("");
    };
    const [testVal2, setTestVal2] = useState("");
    const buttonB = () => {
        // console.log("button pressed");
        // form.setFieldsValue({ QHY3iYRLvMp: "" });
        // button()
        setTestVal2("");
    };
    const [testVal3, setTestVal3] = useState("");
    const buttonC = () => {
        // console.log("button pressed");
        // form.setFieldsValue({ QHY3iYRLvMp: "" });
        // button()
        setTestVal3("");
    };

    const [testVal4, setTestVal4] = useState("");
    const buttonD = () => {
        // console.log("button pressed");
        // form.setFieldsValue({ QHY3iYRLvMp: "" });
        // button()
        setTestVal4("");
    };

    // const [testValUnderlying, setTestValUnderlying] = useState("");
    // const buttonUnderlying = () => {
    //     console.log("button pressed");
    //     // form.setFieldsValue({ QHY3iYRLvMp: "" });
    //     // button()
    //     setTestValUnderlying("");
    // };

    const valuesChange = (changedValues: any, allValues: any) => {
        if (
            changedValues.FhHPxY16vet &&
            form.getFieldValue("FhHPxY16vet") == true
        ) {
            //Desease
            //store.disableValue("FhHPxY16vet");//Disease
            store.disableValue("gNM2Yhypydx"); //accident
            store.disableValue("wX3i3gkTG4m"); //Intentional self-harm
            store.disableValue("KsGOxFyzIs1"); //Assault
            store.disableValue("tYH7drlbNya"); //Legal intervention
            store.disableValue("xDMX2CJ4Xw3"); //War
            store.disableValue("b4yPk98om7e"); //Could not be determined
            store.disableValue("fQWuywOaoN2"); //Pending investigation
            store.disableValue("o1hG9vr0peF"); //Unknown
        }

        if (
            changedValues.gNM2Yhypydx &&
            form.getFieldValue("gNM2Yhypydx") == true
        ) {
            //Accident
            store.disableValue("FhHPxY16vet"); //Disease
            // store.disableValue("gNM2Yhypydx");//accident
            store.disableValue("wX3i3gkTG4m"); //Intentional self-harm
            store.disableValue("KsGOxFyzIs1"); //Assault
            store.disableValue("tYH7drlbNya"); //Legal intervention
            store.disableValue("xDMX2CJ4Xw3"); //War
            store.disableValue("b4yPk98om7e"); //Could not be determined
            store.disableValue("fQWuywOaoN2"); //Pending investigation
            store.disableValue("o1hG9vr0peF"); //Unknown
        }

        if (
            changedValues.wX3i3gkTG4m &&
            form.getFieldValue("wX3i3gkTG4m") == true
        ) {
            //Intentional self-harm
            store.disableValue("FhHPxY16vet"); //Disease
            store.disableValue("gNM2Yhypydx"); //accident
            // store.disableValue("wX3i3gkTG4m");//Intentional self-harm
            store.disableValue("KsGOxFyzIs1"); //Assault
            store.disableValue("tYH7drlbNya"); //Legal intervention
            store.disableValue("xDMX2CJ4Xw3"); //War
            store.disableValue("b4yPk98om7e"); //Could not be determined
            store.disableValue("fQWuywOaoN2"); //Pending investigation
            store.disableValue("o1hG9vr0peF"); //Unknown
        }

        if (
            changedValues.KsGOxFyzIs1 &&
            form.getFieldValue("KsGOxFyzIs1") == true
        ) {
            //Assault
            store.disableValue("FhHPxY16vet"); //Disease
            store.disableValue("gNM2Yhypydx"); //accident
            store.disableValue("wX3i3gkTG4m"); //Intentional self-harm
            // store.disableValue("KsGOxFyzIs1");//Assault
            store.disableValue("tYH7drlbNya"); //Legal intervention
            store.disableValue("xDMX2CJ4Xw3"); //War
            store.disableValue("b4yPk98om7e"); //Could not be determined
            store.disableValue("fQWuywOaoN2"); //Pending investigation
            store.disableValue("o1hG9vr0peF"); //Unknown
        }

        if (
            changedValues.tYH7drlbNya &&
            form.getFieldValue("tYH7drlbNya") == true
        ) {
            //Legal intervention
            store.disableValue("FhHPxY16vet"); //Disease
            store.disableValue("gNM2Yhypydx"); //accident
            store.disableValue("wX3i3gkTG4m"); //Intentional self-harm
            store.disableValue("KsGOxFyzIs1"); //Assault
            //store.disableValue("tYH7drlbNya");//Legal intervention
            store.disableValue("xDMX2CJ4Xw3"); //War
            store.disableValue("b4yPk98om7e"); //Could not be determined
            store.disableValue("fQWuywOaoN2"); //Pending investigation
            store.disableValue("o1hG9vr0peF"); //Unknown
        }

        if (
            changedValues.xDMX2CJ4Xw3 &&
            form.getFieldValue("xDMX2CJ4Xw3") == true
        ) {
            //War
            store.disableValue("FhHPxY16vet"); //Disease
            store.disableValue("gNM2Yhypydx"); //accident
            store.disableValue("wX3i3gkTG4m"); //Intentional self-harm
            store.disableValue("KsGOxFyzIs1"); //Assault
            store.disableValue("tYH7drlbNya"); //Legal intervention
            //store.disableValue("xDMX2CJ4Xw3");//War
            store.disableValue("b4yPk98om7e"); //Could not be determined
            store.disableValue("fQWuywOaoN2"); //Pending investigation
            store.disableValue("o1hG9vr0peF"); //Unknown
        }

        if (
            changedValues.b4yPk98om7e &&
            form.getFieldValue("b4yPk98om7e") == true
        ) {
            //Could not be determined
            store.disableValue("FhHPxY16vet"); //Disease
            store.disableValue("gNM2Yhypydx"); //accident
            store.disableValue("wX3i3gkTG4m"); //Intentional self-harm
            store.disableValue("KsGOxFyzIs1"); //Assault
            store.disableValue("tYH7drlbNya"); //Legal intervention
            store.disableValue("xDMX2CJ4Xw3"); //War
            //store.disableValue("b4yPk98om7e");//Could not be determined
            store.disableValue("fQWuywOaoN2"); //Pending investigation
            store.disableValue("o1hG9vr0peF"); //Unknown
        }

        if (
            changedValues.fQWuywOaoN2 &&
            form.getFieldValue("fQWuywOaoN2") == true
        ) {
            //Pending investigation
            store.disableValue("FhHPxY16vet"); //Disease
            store.disableValue("gNM2Yhypydx"); //accident
            store.disableValue("wX3i3gkTG4m"); //Intentional self-harm
            store.disableValue("KsGOxFyzIs1"); //Assault
            store.disableValue("tYH7drlbNya"); //Legal intervention
            store.disableValue("xDMX2CJ4Xw3"); //War
            store.disableValue("b4yPk98om7e"); //Could not be determined
            //store.disableValue("fQWuywOaoN2");//Pending investigation
            store.disableValue("o1hG9vr0peF"); //Unknown
        }

        if (
            changedValues.o1hG9vr0peF &&
            form.getFieldValue("o1hG9vr0peF") == true
        ) {
            //Unknown
            store.disableValue("FhHPxY16vet"); //Disease
            store.disableValue("gNM2Yhypydx"); //accident
            store.disableValue("wX3i3gkTG4m"); //Intentional self-harm
            store.disableValue("KsGOxFyzIs1"); //Assault
            store.disableValue("tYH7drlbNya"); //Legal intervention
            store.disableValue("xDMX2CJ4Xw3"); //War
            store.disableValue("b4yPk98om7e"); //Could not be determined
            store.disableValue("fQWuywOaoN2"); //Pending investigation
            //store.disableValue("o1hG9vr0peF");//Unknown
        }

        if (
            !allValues.FhHPxY16vet &&
            !allValues.gNM2Yhypydx &&
            !allValues.wX3i3gkTG4m &&
            !allValues.KsGOxFyzIs1 &&
            !allValues.tYH7drlbNya &&
            !allValues.xDMX2CJ4Xw3 &&
            !allValues.b4yPk98om7e &&
            !allValues.fQWuywOaoN2 &&
            !allValues.o1hG9vr0peF
        ) {
            store.enableValue("FhHPxY16vet"); //Disease
            store.enableValue("gNM2Yhypydx"); //accident
            store.enableValue("wX3i3gkTG4m"); //Intentional self-harm
            store.enableValue("KsGOxFyzIs1"); //Assault
            store.enableValue("tYH7drlbNya"); //Legal intervention
            store.enableValue("xDMX2CJ4Xw3"); //War
            store.enableValue("b4yPk98om7e"); //Could not be determined
            store.enableValue("fQWuywOaoN2"); //Pending investigation
            store.enableValue("o1hG9vr0peF"); //Unknown
        }

        if (
            changedValues.e96GB4CXyd3 &&
            changedValues.e96GB4CXyd3 === "SX01-02" &&
            form.getFieldValue("q7e7FOXKnOf") > 10 &&
            form.getFieldValue("q7e7FOXKnOf") < 50
        ) {
            // console.log(form.getFieldValue("q7e7FOXKnOf"));

            // console.log("sex changed");

            setShowPregnancyReminder(true);
            // window.alert(
            //     "Please Remember to fill in the section: For women, was the deceased pregnant or within 6 weeks of delivery?"
            // );
        }

        if (changedValues.RbrUuKFSqkZ) {
            let years = moment().diff(changedValues.RbrUuKFSqkZ, "years");
            let hours = moment().diff(changedValues.RbrUuKFSqkZ, "hours");

            const dod = new Date("i8rrl8YWxLF");
            const dob = new Date("RbrUuKFSqkZ");

            form.setFieldsValue({ q7e7FOXKnOf: years });
            store.disableValue("q7e7FOXKnOf");

            if (years > 1) {
                store.disableValue("V4rE1tsj5Rb");
                store.disableValue("ivnHp4M4hFF");
                store.disableValue("jf9TogeSZpk");
                store.disableValue("xAWYJtQsg8M");
                store.disableValue("lQ1Byr04JTx");
                store.disableValue("DdfDMFW4EJ9");
                store.disableValue("GFVhltTCG8b");
            } else {
                store.enableValue("V4rE1tsj5Rb");
                store.enableValue("ivnHp4M4hFF");
                store.enableValue("jf9TogeSZpk");
                store.enableValue("xAWYJtQsg8M");
                store.enableValue("lQ1Byr04JTx");
                store.enableValue("DdfDMFW4EJ9");
                store.enableValue("GFVhltTCG8b");
            }

            if (hours < 24) {
                store.disableValue("jf9TogeSZpk");
            } else if (hours >= 24 && years <= 1) {
                store.enableValue("jf9TogeSZpk");
            }
        }

        console.log("clear working");
        if (changedValues.sfpqAeqKeyQ) {
            form.setFieldsValue({ zD0E77W4rFs: null });
            console.log("clear working");
        }

        if (changedValues.i8rrl8YWxLF) {
            if (
                changedValues.i8rrl8YWxLF.isBefore(
                    form.getFieldValue("RbrUuKFSqkZ")
                )
            ) {
                form.setFieldsValue({ i8rrl8YWxLF: null });
            }
        }

        if (
            changedValues.jY3K6Bv4o9Q &&
            changedValues.jY3K6Bv4o9Q !== "YN01-01"
        ) {
            store.disableValue("UfG52s4YcUt");
        } else if (
            changedValues.jY3K6Bv4o9Q &&
            changedValues.jY3K6Bv4o9Q === "YN01-01"
        ) {
            store.enableValue("UfG52s4YcUt");
        }

        if (changedValues.Ylht9kCLSRW) {
            store.enableValue("WkXxkKEJLsg");
        }

        if (changedValues.WkXxkKEJLsg) {
            store.enableValue("zb7uTuBCPrN");
            store.enableValue("QTKk2Xt8KDu");
        }

        if (changedValues.myydnkmLfhp) {
            store.enableValue("fleGy9CvHYh");
        }

        if (changedValues.fleGy9CvHYh) {
            store.enableValue("QGFYJK00ES7");
        }

        if (changedValues.aC64sB86ThG) {
            store.enableValue("hO8No9fHVd2");
        }

        if (changedValues.hO8No9fHVd2) {
            store.enableValue("CnPGhOcERFF");
        }

        if (changedValues.cmZrrHfTxW3) {
            store.enableValue("eCVDO6lt4go");
        }

        if (changedValues.eCVDO6lt4go) {
            store.enableValue("QTKk2Xt8KDu");
        }

        if (changedValues.AZSlwlRAFig) {
            store.enableValue("DKlOhZJOCrX");
            store.enableValue("kGIDD5xIeLC");
        } else if (!allValues.AZSlwlRAFig) {
            store.disableValue("DKlOhZJOCrX");
            store.disableValue("kGIDD5xIeLC");
        }

        if (changedValues.FhHPxY16vet) {
            store.disableValue("DKlOhZJOCrX");
            store.disableValue("kGIDD5xIeLC");
            store.disableValue("AZSlwlRAFig");
        } else if (!allValues.FhHPxY16vet) {
            store.enableValue("AZSlwlRAFig");
        }

        if (changedValues.U18Tnfz9EKd) {
            if (
                changedValues.U18Tnfz9EKd.isBefore(
                    form.getFieldValue("RbrUuKFSqkZ")
                ) ||
                changedValues.U18Tnfz9EKd.after(
                    form.getFieldValue("i8rrl8YWxLF")
                )
            ) {
                form.setFieldsValue({ U18Tnfz9EKd: null });
            }
        }

        if (
            changedValues.ivnHp4M4hFF &&
            (changedValues.ivnHp4M4hFF === "YN01-01" ||
                changedValues.ivnHp4M4hFF === "YN01-03")
        ) {
            store.enableValue("jf9TogeSZpk");
        } else {
            store.disableValue("jf9TogeSZpk");
        }

        if (
            changedValues.zcn7acUB6x1 &&
            changedValues.zcn7acUB6x1 !== "YN01-01"
        ) {
            store.disableValue("KpfvNQSsWIw");
            store.disableValue("AJAraEcfH63");
            store.disableValue("RJhbkjYrODG");
            store.disableValue("ymyLrfEcYkD");
            store.disableValue("K5BDPJQk1BP");
            store.disableValue("Z41di0TRjIu");
            store.disableValue("uaxjt0inPNF");
        } else if (changedValues.zcn7acUB6x1 === "YN01-01") {
            store.enableValue("KpfvNQSsWIw");
            store.enableValue("AJAraEcfH63");
            store.enableValue("RJhbkjYrODG");
            store.enableValue("ymyLrfEcYkD");
            store.enableValue("K5BDPJQk1BP");
            store.enableValue("Z41di0TRjIu");
            store.enableValue("uaxjt0inPNF");
        }

        if (
            changedValues.e96GB4CXyd3 &&
            changedValues.e96GB4CXyd3 !== "SX01-02"
        ) {
            store.disableValue("zcn7acUB6x1");
            store.disableValue("KpfvNQSsWIw");
            store.disableValue("AJAraEcfH63");
            store.disableValue("RJhbkjYrODG");
            store.disableValue("ymyLrfEcYkD");
            store.disableValue("K5BDPJQk1BP");
            store.disableValue("Z41di0TRjIu");
            store.disableValue("uaxjt0inPNF");
            console.log("not female");
        } else if (
            changedValues.e96GB4CXyd3 &&
            changedValues.e96GB4CXyd3 === "SX01-02"
        ) {
            store.enableValue("zcn7acUB6x1");
            console.log("sex female");
            var x = form.getFieldValue("q7e7FOXKnOf");
            console.log(x);
        }

        if (
            changedValues.Kk0hmrJPR90 &&
            changedValues.Kk0hmrJPR90 !== "YN01-01"
        ) {
            store.disableValue("j5TIQx3gHyF");
            store.disableValue("JhHwdQ337nn");
            // store.disableValue("jY3K6Bv4o9Q");
            // store.disableValue("UfG52s4YcUt");
        } else {
            store.enableValue("j5TIQx3gHyF");
            store.enableValue("JhHwdQ337nn");
            // store.enableValue("jY3K6Bv4o9Q");
            // store.enableValue("UfG52s4YcUt");
        }

        if (
            changedValues.jY3K6Bv4o9Q &&
            changedValues.jY3K6Bv4o9Q !== "YN01-01"
        ) {
            store.disableValue("UfG52s4YcUt");
        } else {
            store.enableValue("UfG52s4YcUt");
        }

        if (changedValues.j5TIQx3gHyF) {
            let weeks = moment(form.getFieldValue("i8rrl8YWxLF")).diff(
                changedValues.RbrUuKFSqkZ,
                "weeks"
            );
            if (weeks > 4) {
                form.setFieldsValue({ j5TIQx3gHyF: null });
            }
        }

        // console.log("working");
    };

    const optionSet = (os: string, field: string) => {
        const options = optionSets ? optionSets[os] : [];
        if (options) {
            return (
                <Select
                    style={{ width: "100%" }}
                    size="large"
                    disabled={store.viewMode || store.allDisabled[field]}
                >
                    {options.map((option: any) => (
                        <Option key={option.code} value={option.code}>
                            {option.name}
                        </Option>
                    ))}
                </Select>
            );
        }
        return null;
    };

    // Testing
    const toggleEnableAltSearch = (id: any, value: boolean) => {
        let inputID = id;
        let inputValue = value;

        let newValues = altSearchIsDisabled;
        newValues[inputID] = inputValue;
        setAltSearchIsDisabled(newValues);
    };

    const editUnderlyingCauses = (
        id: string,
        value: string,
        diseaseTitle?: string
    ) => {
        let inputID = id;
        let inputValue = value;

        let newValues = underlyingCauses;
        newValues[inputID] = inputValue;
        if (diseaseTitle) {
            newValues["diseaseTitle" + id.toUpperCase()] = diseaseTitle;
        }
        setUnderlyingCauses(newValues);
    };

    const addDiseaseTitle = (val: string) => {
        let keys = Object.keys(underlyingCauses);
        let titleToAdd = "";
        keys.forEach((item) => {
            if (
                underlyingCauses[item] === val &&
                item.includes("disease") === false
            ) {
                titleToAdd =
                    underlyingCauses["diseaseTitle" + item.toUpperCase()];
            }
        });
        console.log("Adding disease title of ", titleToAdd);

        // This Updates the problematic field Next to State underlying cause
        setUnderlyingCauseCode(titleToAdd);
        form.setFieldsValue({
            dTd7txVzhgY: titleToAdd,
        });
        // End of update
    };
    // End of Testing

    return (
        <Form
            form={form}
            name="death-certificate"
            onFinish={onFinish}
            scrollToFirstError={true}
            initialValues={store.defaultValues}
            onValuesChange={valuesChange}
        >
            <Modal
                title="Reminder"
                visible={showPregnancyReminder}
                onOk={() => {
                    setShowPregnancyReminder(false);
                }}
                onCancel={() => {
                    setShowPregnancyReminder(false);
                }}
            >
                <p>
                    Please Remember to fill in the section: For women, was the
                    deceased pregnant or within 6 weeks of delivery?
                </p>
            </Modal>

            <Card
                title={<Title level={2}>Death Certificate</Title>}
                actions={[
                    <p>Inserting for {store.currentOrganisation} </p>,
                    !isEmpty(store.defaultValues) ? (
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => store.deleteEvent()}
                        >
                            <Button size="large">Delete</Button>{" "}
                        </Popconfirm>
                    ) : null,
                    <Button size="large" onClick={store.showEvents}>
                        Cancel
                    </Button>,
                    <Button
                        htmlType="submit"
                        size="large"
                        disabled={store.viewMode}
                    >
                        Save
                    </Button>,
                ]}
                type="inner"
                bodyStyle={{ maxHeight: "70vh", overflow: "auto" }}
            >
                <Form.Item
                    label="Date of Entry"
                    rules={[
                        {
                            type: "object",
                            required: true,
                            message: "Please select date!",
                        },
                    ]}
                    name="eventDate"
                    className="m-0"
                >
                    <DatePicker
                        disabledDate={notTomorrow}
                        size="large"
                        disabled={store.viewMode}
                    />
                </Form.Item>
                <table className="my-2 w-full border-collapse">
                    <tbody>
                        <tr>
                            <td className="border p-1" colSpan={2}>
                                <b>Ministry of Health National Case Number</b>
                            </td>
                            <td className="border p-1" colSpan={2}>
                                <Form.Item name="ZKBE8Xm9DJG" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.ZKBE8Xm9DJG
                                        }
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>Name (Full name):</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: "Enter full name",
                                        },
                                    ]}
                                    name="ZYKmQ9GPOaF"
                                    className="m-0"
                                >
                                    <Input
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.ZYKmQ9GPOaF
                                        }
                                    />
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                <b>NIN</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item name="MOstDqSY0gO" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.MOstDqSY0gO
                                        }
                                    />
                                </Form.Item>
                            </td>
                        </tr>

                        <tr>
                            <td className="border p-1">
                                <b>Usual Residence (village)</b>
                            </td>
                            <td className="border p-1" colSpan={3}>
                                <Form.Item name="zwKo51BEayZ" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.zwKo51BEayZ
                                        }
                                    />
                                </Form.Item>
                            </td>
                        </tr>

                        <tr>
                            <td className="border p-1">
                                <b>Usual Residence (Parish)</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item name="bNpMzyShDCX" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.bNpMzyShDCX
                                        }
                                    />
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                <b>Usual Residence (Sub-county)</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item name="u44XP9fZweA" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.u44XP9fZweA
                                        }
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>Usual Residence (County)</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item name="b70okb06FWa" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.b70okb06FWa
                                        }
                                    />
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                <b>Usual Residence (District)</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item name="t5nTEmlScSt" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.t5nTEmlScSt
                                        }
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>Occupation</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item name="dsiwvNQLe5n" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.dsiwvNQLe5n
                                        }
                                    />
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                <b>Date of Birth</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item
                                    rules={[
                                        {
                                            type: "object",
                                            required: true,
                                            message: "Please select date!",
                                        },
                                    ]}
                                    name="RbrUuKFSqkZ"
                                    className="m-0"
                                >
                                    <DatePicker
                                        disabledDate={notTomorrow}
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.RbrUuKFSqkZ
                                        }
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>Age</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item
                                    rules={[
                                        {
                                            type: "integer",
                                            required: false,
                                            message:
                                                "Enter a valid age below 120",
                                            max: 120,
                                        },
                                    ]}
                                    name="q7e7FOXKnOf"
                                    className="m-0"
                                >
                                    <InputNumber
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.q7e7FOXKnOf
                                        }
                                    />
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                <b>Sex</b>
                            </td>
                            <td className="border p-1">
                                {optionSets ? (
                                    <Form.Item
                                        rules={[
                                            {
                                                required: true,
                                                message: "Sex is required",
                                            },
                                        ]}
                                        name="e96GB4CXyd3"
                                        className="m-0"
                                    >
                                        {optionSet("SX01", "e96GB4CXyd3")}
                                    </Form.Item>
                                ) : null}
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>Place of Birth</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item name="xNCSFrgdUgi" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.xNCSFrgdUgi
                                        }
                                    />
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                <b>Date and time of death</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item
                                    rules={[
                                        {
                                            type: "object",
                                            required: true,
                                            message:
                                                "Please select date and time of death!",
                                        },
                                    ]}
                                    name="i8rrl8YWxLF"
                                    className="m-0"
                                >
                                    <DatePicker
                                        disabledDate={notTomorrow}
                                        size="large"
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="Select date and time of death"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.i8rrl8YWxLF
                                        }
                                        onChange={(e: any) => {
                                            var minutes = 1000 * 60;
                                            var hours = minutes * 60;
                                            var days = hours * 24;

                                            var foo_date1 = form.getFieldValue(
                                                "RbrUuKFSqkZ"
                                            );
                                            var foo_date2 = form.getFieldValue(
                                                "i8rrl8YWxLF"
                                            );
                                            var diff_date = Math.round(
                                                (foo_date2 - foo_date1) / days
                                            );

                                            console.log(diff_date);
                                            console.log(
                                                "function diffdate has been run "
                                            );

                                            if (diff_date < 25) {
                                                window.alert(
                                                    " Please remember that you should also complete the section 'Fetal or infant Death'"
                                                );
                                            }
                                        }}
                                    />
                                </Form.Item>
                                {form.getFieldValue("i8rrl8YWxLF") -
                                    form.getFieldValue("RbrUuKFSqkZ") <
                                    0 &&
                                form.getFieldValue("i8rrl8YWxLF") != 0 ? (
                                    <span style={{ color: "Red" }}>
                                        Date of Death cannot be before DOB
                                    </span>
                                ) : null}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table className="my-2 w-full border-collapse px-2">
                    <tbody>
                        <tr>
                            <td colSpan={7} className="border p-1 text-lg">
                                <h3
                                    style={{
                                        fontWeight: "bolder",
                                        color: "#000085",
                                    }}
                                >
                                    Frame A: Medical Data. Part 1 and 2
                                </h3>
                            </td>
                        </tr>
                        <tr>
                            <th style={{ width: "15%" }}></th>
                            <th style={{ width: "5%" }}></th>
                            <th style={{ width: "25%" }}></th>
                            <th style={{ width: "15%" }}></th>
                            <th style={{ width: "20%" }}></th>
                            <th style={{ width: "10%" }}></th>
                            <th style={{ width: "7%" }}></th>
                        </tr>
                        <tr>
                            <td className="border p-1 w-1/4"></td>
                            <td className="border p-1" />
                            <td className="border p-1">
                                {" "}
                                <b>Cause of death</b>{" "}
                            </td>
                            <td className="border p-1">
                                {" "}
                                <b>Code</b>{" "}
                            </td>
                            <td className="border p-1">
                                {" "}
                                <b>Cause of Death Free Text</b>{" "}
                            </td>
                            <td className="border p-1">
                                {" "}
                                <b>Time interval type from onset to death</b>
                            </td>
                            <td className="border p-1">
                                {" "}
                                <b>Time interval from onset to death</b>
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                {" "}
                                <b>
                                    Report disease or condition directly leading
                                    to death on line a
                                </b>
                            </td>
                            <td className="border p-1">
                                {" "}
                                <b>a</b>{" "}
                            </td>
                            <td className="border p-1">
                                <ICDField
                                    id="icdField1"
                                    enableAltText={(value: boolean) => {
                                        toggleEnableAltSearch("a", value);
                                    }}
                                    disabled={store.allDisabled.sfpqAeqKeyQ}
                                    next="Ylht9kCLSRW"
                                    form={form}
                                    field="sfpqAeqKeyQ"
                                    codeField="zD0E77W4rFs"
                                    uriField="k9xdBQzYMXo"
                                    searchQueryField="cSDJ9kSJkFP"
                                    bestMatchTextField="ZwBcxhUGzMb"
                                    addUnderlyingCause={(
                                        value: any,
                                        title?: any
                                    ) => {
                                        editUnderlyingCauses(
                                            "a",
                                            title ? title : null,
                                            value
                                        );
                                    }}
                                    resetUnderlyingCauseDropdown={
                                        setUnderlyingCauseKey
                                    }
                                />
                            </td>
                            <td className="border p-1">
                                <Form.Item name="zD0E77W4rFs" className="m-0">
                                    <Input
                                        readOnly={true}
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.zD0E77W4rFs
                                        }
                                    />
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                <Form.Item name="QHY3iYRLvMp" className="m-0">
                                    <table>
                                        <tr>
                                            <td>
                                                <Input
                                                    size="large"
                                                    disabled={
                                                        store.viewMode ||
                                                        store.allDisabled
                                                            .QHY3iYRLvMp ||
                                                        altSearchIsDisabled.a
                                                    }
                                                    value={testVal}
                                                    onChange={(e: any) => {
                                                        setTestVal(
                                                            e.target.value
                                                        );
                                                        editUnderlyingCauses(
                                                            "a",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Popconfirm
                                                    title="Sure to add coded COD"
                                                    onConfirm={() => buttonA()}
                                                >
                                                    <Button
                                                        size="large"
                                                        name="btnFreeTextA"
                                                    >
                                                        X
                                                    </Button>
                                                </Popconfirm>
                                            </td>
                                        </tr>
                                    </table>
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                {optionSets ? (
                                    <Form.Item
                                        name="Ylht9kCLSRW"
                                        className="m-0"
                                    >
                                        {optionSet("TI01", "Ylht9kCLSRW")}
                                    </Form.Item>
                                ) : null}
                            </td>
                            <td className="border p-1">
                                <Form.Item name="WkXxkKEJLsg" className="m-0">
                                    <InputNumber
                                        min={1}
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.WkXxkKEJLsg
                                        }
                                    />
                                </Form.Item>
                            </td>
                        </tr>

                        <tr>
                            <td className="border p-1" rowSpan={3}>
                                <b>
                                    Report chain of events 'due to' (b to d) in
                                    order (if applicable)
                                </b>{" "}
                            </td>
                            <td className="border p-1">
                                <b>b</b>
                            </td>
                            <td className="border p-1">
                                <ICDField
                                    id="icdField2"
                                    next="myydnkmLfhp"
                                    enableAltText={(value: boolean) => {
                                        toggleEnableAltSearch("b", value);
                                    }}
                                    disabled={store.allDisabled.zb7uTuBCPrN}
                                    form={form}
                                    field="zb7uTuBCPrN"
                                    searchQueryField="uckvenVFnwf"
                                    codeField="tuMMQsGtE69"
                                    uriField="yftBZ5bSEOb"
                                    addUnderlyingCause={(
                                        value: any,
                                        title?: any
                                    ) => {
                                        editUnderlyingCauses(
                                            "b",
                                            title ? title : null,
                                            value
                                        );
                                    }}
                                    resetUnderlyingCauseDropdown={
                                        setUnderlyingCauseKey
                                    }
                                />
                            </td>
                            <td className="border p-1">
                                <Form.Item name="tuMMQsGtE69" className="m-0">
                                    <Input
                                        readOnly={true}
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.tuMMQsGtE69
                                        }
                                    />
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                <Form.Item name="NkiH8GTX6HC" className="m-0">
                                    <table>
                                        <tr>
                                            <td>
                                                <Input
                                                    size="large"
                                                    disabled={
                                                        store.viewMode ||
                                                        store.allDisabled
                                                            .NkiH8GTX6HC ||
                                                        altSearchIsDisabled.b
                                                    }
                                                    value={testVal2}
                                                    onChange={(e: any) => {
                                                        setTestVal2(
                                                            e.target.value
                                                        );
                                                        editUnderlyingCauses(
                                                            "b",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Popconfirm
                                                    title="Sure to add coded COD"
                                                    onConfirm={() => buttonB()}
                                                >
                                                    <Button
                                                        size="large"
                                                        name="btnFreeTextB"
                                                    >
                                                        X
                                                    </Button>
                                                </Popconfirm>
                                            </td>
                                        </tr>
                                    </table>
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                {optionSets ? (
                                    <Form.Item
                                        name="myydnkmLfhp"
                                        className="m-0"
                                    >
                                        {optionSet("TI01", "myydnkmLfhp")}
                                    </Form.Item>
                                ) : null}
                            </td>
                            <td className="border p-1">
                                <Form.Item name="fleGy9CvHYh" className="m-0">
                                    <InputNumber
                                        min={1}
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.fleGy9CvHYh
                                        }
                                    />
                                </Form.Item>
                            </td>
                        </tr>

                        <tr>
                            <td className="border p-1">
                                <b>c</b>
                            </td>
                            <td className="border p-1">
                                <ICDField
                                    id="icdField3"
                                    enableAltText={(value: boolean) => {
                                        toggleEnableAltSearch("c", value);
                                    }}
                                    next="aC64sB86ThG"
                                    disabled={store.allDisabled.QGFYJK00ES7}
                                    form={form}
                                    field="QGFYJK00ES7"
                                    searchQueryField="ZFdJRT3PaUd"
                                    codeField="C8n6hBilwsX"
                                    uriField="fJUy96o8akn"
                                    addUnderlyingCause={(
                                        value: any,
                                        title?: any
                                    ) => {
                                        editUnderlyingCauses(
                                            "c",
                                            title ? title : null,
                                            value
                                        );
                                    }}
                                    resetUnderlyingCauseDropdown={
                                        setUnderlyingCauseKey
                                    }
                                />
                            </td>

                            <td className="border p-1">
                                <Form.Item name="C8n6hBilwsX" className="m-0">
                                    <Input
                                        readOnly={true}
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.C8n6hBilwsX
                                        }
                                    />
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                <Form.Item name="SDPq8UURlWc" className="m-0">
                                    <table>
                                        <tr>
                                            <td>
                                                <Input
                                                    size="large"
                                                    disabled={
                                                        store.viewMode ||
                                                        store.allDisabled
                                                            .SDPq8UURlWc ||
                                                        altSearchIsDisabled.c
                                                    }
                                                    value={testVal3}
                                                    onChange={(e: any) => {
                                                        setTestVal3(
                                                            e.target.value
                                                        );
                                                        editUnderlyingCauses(
                                                            "c",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Popconfirm
                                                    title="Sure to add coded COD"
                                                    onConfirm={() => buttonC()}
                                                >
                                                    <Button
                                                        size="large"
                                                        name="btnFreeTextC"
                                                    >
                                                        X
                                                    </Button>
                                                </Popconfirm>
                                            </td>
                                        </tr>
                                    </table>
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                {optionSets ? (
                                    <Form.Item
                                        name="aC64sB86ThG"
                                        className="m-0"
                                    >
                                        {optionSet("TI01", "aC64sB86ThG")}
                                    </Form.Item>
                                ) : null}
                            </td>
                            <td className="border p-1">
                                <Form.Item name="hO8No9fHVd2" className="m-0">
                                    <InputNumber
                                        min={1}
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.hO8No9fHVd2
                                        }
                                    />
                                </Form.Item>
                            </td>
                        </tr>

                        <tr>
                            <td className="border p-1">
                                <b>d</b>
                            </td>
                            <td className="border p-1">
                                <ICDField
                                    id="icdField4"
                                    enableAltText={(value: boolean) => {
                                        toggleEnableAltSearch("d", value);
                                    }}
                                    next="cmZrrHfTxW3"
                                    disabled={store.allDisabled.CnPGhOcERFF}
                                    form={form}
                                    field="CnPGhOcERFF"
                                    searchQueryField="Op5pSvgHo1M"
                                    codeField="IeS8V8Yf40N"
                                    uriField="S53kx50gjQn"
                                    addUnderlyingCause={(
                                        value: any,
                                        title?: any
                                    ) => {
                                        editUnderlyingCauses(
                                            "d",
                                            title ? title : null,
                                            value
                                        );
                                    }}
                                    resetUnderlyingCauseDropdown={
                                        setUnderlyingCauseKey
                                    }
                                />
                            </td>
                            <td className="border p-1">
                                <Form.Item name="IeS8V8Yf40N" className="m-0">
                                    <Input
                                        readOnly={true}
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.IeS8V8Yf40N
                                        }
                                    />
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                <Form.Item name="zqW9xWyqOur" className="m-0">
                                    <table>
                                        <tr>
                                            <td>
                                                <Input
                                                    size="large"
                                                    disabled={
                                                        store.viewMode ||
                                                        store.allDisabled
                                                            .zqW9xWyqOur ||
                                                        altSearchIsDisabled.d
                                                    }
                                                    value={testVal4}
                                                    onChange={(e: any) => {
                                                        setTestVal4(
                                                            e.target.value
                                                        );
                                                        editUnderlyingCauses(
                                                            "d",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Popconfirm
                                                    title="Sure to add coded COD"
                                                    onConfirm={() => buttonD()}
                                                >
                                                    <Button
                                                        name="btnFreeTextD"
                                                        size="large"
                                                    >
                                                        X
                                                    </Button>
                                                </Popconfirm>
                                            </td>
                                        </tr>
                                    </table>
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                {optionSets ? (
                                    <Form.Item
                                        name="cmZrrHfTxW3"
                                        className="m-0"
                                    >
                                        {optionSet("TI01", "cmZrrHfTxW3")}
                                    </Form.Item>
                                ) : null}
                            </td>
                            <td className="border p-1">
                                <Form.Item name="eCVDO6lt4go" className="m-0">
                                    <InputNumber
                                        min={1}
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.eCVDO6lt4go
                                        }
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1" colSpan={2}>
                                <b>State the underlying cause</b>
                            </td>
                            <td className="border p-1" colSpan={2}>
                                {/* Testing */}
                                {/* {optionSets ? <Form.Item
                                  rules={[{ required: true, message: 'Select the underlying cause'}]}
                                    name="QTKk2Xt8KDu"
                                    className="m-0"
                                  >
                                    
                                    {optionSet('100U', 'QTKk2Xt8KDu')}
                                  </Form.Item> : null} */}

                                {
                                    <Tooltip
                                        title={`NOTE: any values whose code begins with N are injuries and as such cannot be selected as an underlying cause of death.`}
                                        visible={showBlackListWarning}
                                        style={{
                                            background: "#fff",
                                            color: "#000",
                                        }}
                                    >
                                        <Select
                                            key={underlyingCauseKey}
                                            style={{ width: "100%" }}
                                            size="large"
                                            disabled={store.viewMode}
                                            onDropdownVisibleChange={(
                                                change
                                            ) => {
                                                // Inform user if any blacklisted values were found

                                                if (
                                                    change === true &&
                                                    blackListedFound &&
                                                    !showBlackListWarning
                                                ) {
                                                    setShowBlackListWarning(
                                                        true
                                                    );

                                                    // Hide the popup after 8 seconds
                                                    let timeout = setTimeout(
                                                        () => {
                                                            setShowBlackListWarning(
                                                                false
                                                            );
                                                        },
                                                        8000
                                                    );

                                                    setTimeoutToClosePopup(
                                                        timeout
                                                    );
                                                }
                                                if (
                                                    !change &&
                                                    showBlackListWarning
                                                ) {
                                                    setShowBlackListWarning(
                                                        false
                                                    );

                                                    if (timeoutToClosePopup) {
                                                        console.log(
                                                            "\n\n\nTIMEOUT is ",
                                                            timeoutToClosePopup
                                                        );
                                                        clearTimeout(
                                                            timeoutToClosePopup
                                                        );
                                                    }
                                                }
                                            }}
                                            onChange={(e: any) => {
                                                addDiseaseTitle(e);
                                            }}
                                        >
                                            {Object.keys(underlyingCauses).map(
                                                (option: any) => {
                                                    if (
                                                        option.includes(
                                                            "disease"
                                                        ) === false &&
                                                        blacklistedValues.includes(
                                                            underlyingCauses[
                                                                `diseaseTitle${option.toUpperCase()}`
                                                            ][0]
                                                        ) === false
                                                    ) {
                                                        return (
                                                            <Option
                                                                key={Math.random()}
                                                                value={
                                                                    underlyingCauses[
                                                                        option
                                                                    ]
                                                                }
                                                            >
                                                                {`(${option}) ${
                                                                    underlyingCauses[
                                                                        option
                                                                    ]
                                                                        ? underlyingCauses[
                                                                              option
                                                                          ]
                                                                        : ""
                                                                }`}
                                                            </Option>
                                                        );
                                                    } else if (
                                                        option.includes(
                                                            "disease"
                                                        ) === false &&
                                                        blacklistedValues.includes(
                                                            underlyingCauses[
                                                                `diseaseTitle${option.toUpperCase()}`
                                                            ][0]
                                                        ) === true &&
                                                        !blackListedFound
                                                    ) {
                                                        setBlackListedFound(
                                                            true
                                                        );
                                                    }
                                                }
                                            )}
                                        </Select>
                                    </Tooltip>
                                }
                                {/* End of Testing */}
                            </td>
                            <td className="border p-1" colSpan={1}>
                                <Form.Item name="dTd7txVzhgY" className="m-0">
                                    <table>
                                        <tr>
                                            <td></td>
                                            <td>
                                                <Input
                                                    readOnly
                                                    size="large"
                                                    disabled={
                                                        store.viewMode ||
                                                        store.allDisabled
                                                            .dTd7txVzhgY
                                                    }
                                                    onChange={(e: any) => {
                                                        console.log(
                                                            "Something changed and value is",
                                                            underlyingCauseAlt
                                                        );
                                                        return;
                                                    }}
                                                    value={underlyingCauseCode}
                                                />
                                            </td>
                                        </tr>
                                    </table>
                                </Form.Item>
                            </td>
                            <td className="border p-1" colSpan={2}>
                                <Form.Item name="L97MrANAav9" className="m-0">
                                    <Input
                                        type="hidden"
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.L97MrANAav9
                                        }
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1" colSpan={2}>
                                <b>
                                    Other significant conditions contributing to
                                    death (time intervals can be included in
                                    brackets after the condition)
                                </b>
                            </td>
                            <td className="border p-1" colSpan={2}>
                                <ICDField
                                    id="icdField5"
                                    form={form}
                                    field="xeE5TQLvucB"
                                    codeField="ctbKSNV2cg7"
                                    uriField="T4uxg60Lalw"
                                />
                            </td>
                            <td className="border p-1" colSpan={1}>
                                <Form.Item name="ctbKSNV2cg7" className="m-0">
                                    <Input
                                        readOnly={true}
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.TRu1GOUwtq5
                                        }
                                    />
                                </Form.Item>
                            </td>
                            <td className="border p-1" colSpan={2}>
                                <Form.Item name="T4uxg60Lalw" className="m-0">
                                    <Input
                                        type="hidden"
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.T4uxg60Lalw ||
                                            altSearchIsDisabled.e
                                        }
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Item name="k9xdBQzYMXo" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={store.viewMode}
                                        type="hidden"
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item name="yftBZ5bSEOb" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={store.viewMode}
                                        type="hidden"
                                    />
                                </Form.Item>
                            </td>

                            <td>
                                <Form.Item name="fJUy96o8akn" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={store.viewMode}
                                        type="hidden"
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item name="S53kx50gjQn" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={store.viewMode}
                                        type="hidden"
                                    />
                                </Form.Item>
                            </td>

                            <td>
                                <Form.Item name="cSDJ9kSJkFP" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={store.viewMode}
                                        type="hidden"
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item name="uckvenVFnwf" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={store.viewMode}
                                        type="hidden"
                                    />
                                </Form.Item>
                            </td>

                            <td>
                                <Form.Item name="ZFdJRT3PaUd" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={store.viewMode}
                                        type="hidden"
                                    />
                                </Form.Item>
                            </td>

                            <td>
                                <Form.Item name="Op5pSvgHo1M" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={store.viewMode}
                                        type="hidden"
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table className="my-2 w-full border-collapse px-2">
                    <tbody>
                        <tr>
                            <td colSpan={2} className="border p-1 text-lg">
                                <h3
                                    style={{
                                        fontWeight: "bolder",
                                        color: "#000085",
                                    }}
                                >
                                    {" "}
                                    Frame B: Other medical data
                                </h3>
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>
                                    Was surgery performed within the last 4
                                    weeks?
                                </b>
                            </td>
                            <td className="border p-1">
                                {optionSets ? (
                                    <Form.Item
                                        name="Kk0hmrJPR90"
                                        className="m-0"
                                    >
                                        {optionSet("YN01", "Kk0hmrJPR90")}
                                    </Form.Item>
                                ) : null}
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>If yes please specify date of surgery</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item
                                    name="j5TIQx3gHyF"
                                    className="m-0"
                                    rules={[
                                        {
                                            type: "object",
                                            required: false,
                                            message: "Please select date!",
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        disabledDate={notTomorrow}
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.j5TIQx3gHyF
                                        }
                                    />
                                </Form.Item>
                            </td>
                        </tr>

                        <tr>
                            <td className="border p-1">
                                <b>
                                    If yes please specify reason for surgery
                                    (disease or condition)
                                </b>
                            </td>
                            <td className="border p-1">
                                <Form.Item name="JhHwdQ337nn" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.JhHwdQ337nn
                                        }
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>Was an autopsy requested?</b>
                            </td>
                            <td className="border p-1">
                                {optionSets ? (
                                    <Form.Item
                                        name="jY3K6Bv4o9Q"
                                        className="m-0"
                                    >
                                        {optionSet("YN01", "jY3K6Bv4o9Q")}
                                    </Form.Item>
                                ) : null}
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>
                                    If yes were the findings used in the
                                    certification?
                                </b>
                            </td>
                            <td className="border p-1">
                                {optionSets ? (
                                    <Form.Item
                                        name="UfG52s4YcUt"
                                        className="m-0"
                                    >
                                        {optionSet("YN01", "UfG52s4YcUt")}
                                    </Form.Item>
                                ) : null}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table className="my-2 w-full border-collapse px-2">
                    <tbody>
                        <tr>
                            <td colSpan={6} className="border p-1 text-lg">
                                <h3
                                    style={{
                                        fontWeight: "bolder",
                                        color: "#000085",
                                    }}
                                >
                                    <b>Manner of death</b>
                                </h3>
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>Disease</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item
                                    name="FhHPxY16vet"
                                    className="m-0"
                                    valuePropName="checked"
                                >
                                    <Checkbox
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.FhHPxY16vet
                                        }
                                    >
                                        Yes
                                    </Checkbox>
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                <b>Assault</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item
                                    name="KsGOxFyzIs1"
                                    className="m-0"
                                    valuePropName="checked"
                                >
                                    <Checkbox
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.KsGOxFyzIs1
                                        }
                                    >
                                        Yes
                                    </Checkbox>
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                <b>Could not be determined</b>{" "}
                            </td>
                            <td className="border p-1">
                                <Form.Item
                                    name="b4yPk98om7e"
                                    className="m-0"
                                    valuePropName="checked"
                                >
                                    <Checkbox
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.b4yPk98om7e
                                        }
                                    >
                                        Yes
                                    </Checkbox>
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>Accident</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item
                                    name="gNM2Yhypydx"
                                    className="m-0"
                                    valuePropName="checked"
                                >
                                    <Checkbox
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.gNM2Yhypydx
                                        }
                                    >
                                        Yes
                                    </Checkbox>
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                <b>Legal intervention</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item
                                    name="tYH7drlbNya"
                                    className="m-0"
                                    valuePropName="checked"
                                >
                                    <Checkbox
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.tYH7drlbNya
                                        }
                                    >
                                        Yes
                                    </Checkbox>
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                <b>Pending investigation</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item
                                    name="fQWuywOaoN2"
                                    className="m-0"
                                    valuePropName="checked"
                                >
                                    <Checkbox
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.fQWuywOaoN2
                                        }
                                    >
                                        Yes
                                    </Checkbox>
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>Intentional self-harm</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item
                                    name="wX3i3gkTG4m"
                                    className="m-0"
                                    valuePropName="checked"
                                >
                                    <Checkbox
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.wX3i3gkTG4m
                                        }
                                    >
                                        Yes
                                    </Checkbox>
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                <b>War</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item
                                    name="xDMX2CJ4Xw3"
                                    className="m-0"
                                    valuePropName="checked"
                                >
                                    <Checkbox
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.xDMX2CJ4Xw3
                                        }
                                    >
                                        Yes
                                    </Checkbox>
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                <b>Unknown</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item
                                    name="o1hG9vr0peF"
                                    className="m-0"
                                    valuePropName="checked"
                                >
                                    <Checkbox
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.o1hG9vr0peF
                                        }
                                    >
                                        Yes
                                    </Checkbox>
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1" colSpan={2}>
                                <b>If external cause or poisoning</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item
                                    name="AZSlwlRAFig"
                                    className="m-0"
                                    valuePropName="checked"
                                >
                                    <Checkbox
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.AZSlwlRAFig
                                        }
                                    >
                                        Yes
                                    </Checkbox>
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                <b>Date of injury</b>
                            </td>
                            <td className="border p-1" colSpan={2}>
                                <Form.Item
                                    name="U18Tnfz9EKd"
                                    className="m-0"
                                    rules={[
                                        {
                                            type: "object",
                                            required: false,
                                            message:
                                                "Please select date of injury",
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        disabledDate={notTomorrow}
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.U18Tnfz9EKd
                                        }
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1" colSpan={3}>
                                <b>
                                    Please describe how external cause occurred
                                    (If poisoning please specify poisoning
                                    agent)
                                </b>
                            </td>
                            <td className="border p-1" colSpan={3}>
                                <Form.Item name="DKlOhZJOCrX" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.DKlOhZJOCrX
                                        }
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1" colSpan={3}>
                                <b>Place of occurrence of the external cause</b>
                            </td>
                            <td className="border p-1" colSpan={3}>
                                <Form.Item name="kGIDD5xIeLC" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.kGIDD5xIeLC
                                        }
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table className="my-2 w-full border-collapse px-2">
                    <tbody>
                        <tr>
                            <td colSpan={4} className="border p-1 text-lg">
                                <h3
                                    style={{
                                        fontWeight: "bolder",
                                        color: "#000085",
                                    }}
                                >
                                    Fetal or infant death
                                </h3>
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1" colSpan={2}>
                                <b>Multiple pregnancy</b>
                            </td>
                            <td className="border p-1" colSpan={2}>
                                {optionSets ? (
                                    <Form.Item
                                        name="V4rE1tsj5Rb"
                                        className="m-0"
                                    >
                                        {optionSet("YN01", "V4rE1tsj5Rb")}
                                    </Form.Item>
                                ) : null}
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1" colSpan={2}>
                                <b>Stillborn?</b>
                            </td>
                            <td className="border p-1" colSpan={2}>
                                {optionSets ? (
                                    <Form.Item
                                        name="ivnHp4M4hFF"
                                        className="m-0"
                                    >
                                        {optionSet("YN01", "ivnHp4M4hFF")}
                                    </Form.Item>
                                ) : null}
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>
                                    If death within 24 hrs specify the number of
                                    hours survived
                                </b>
                            </td>
                            <td className="border p-1">
                                <Form.Item
                                    name="jf9TogeSZpk"
                                    className="m-0"
                                    rules={[
                                        {
                                            type: "number",
                                            required: false,
                                            message:
                                                "Can not be more than 24 hours",
                                            max: 24,
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.jf9TogeSZpk
                                        }
                                    />
                                </Form.Item>
                            </td>
                            <td className="border p-1">
                                <b>Birth weight (in grams)</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item name="xAWYJtQsg8M" className="m-0">
                                    <InputNumber
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.xAWYJtQsg8M
                                        }
                                    />
                                </Form.Item>
                                {form.getFieldValue("xAWYJtQsg8M") < 100 ||
                                form.getFieldValue("xAWYJtQsg8M") > 10000 ? (
                                    <span style={{ color: "red" }}>
                                        Weight should be between 100 and 1000
                                        grams
                                    </span>
                                ) : null}
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>Number of completed weeks of pregnancy</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item name="lQ1Byr04JTx" className="m-0">
                                    <InputNumber
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.lQ1Byr04JTx
                                        }
                                    />
                                </Form.Item>
                                {form.getFieldValue("lQ1Byr04JTx") < 10 ||
                                form.getFieldValue("lQ1Byr04JTx") > 55 ? (
                                    <span style={{ color: "red" }}>
                                        Completed weeks of death should be
                                        between 10 and 54 weeks
                                    </span>
                                ) : null}
                            </td>
                            <td className="border p-1">
                                <b>Age of mother (years)</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item name="DdfDMFW4EJ9" className="m-0">
                                    <InputNumber
                                        min={1}
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.DdfDMFW4EJ9
                                        }
                                    />
                                </Form.Item>
                                {form.getFieldValue("DdfDMFW4EJ9") < 10 ||
                                form.getFieldValue("DdfDMFW4EJ9") > 60 ? (
                                    <span style={{ color: "orange" }}>
                                        Mothers age is not between 10 and 60
                                        years
                                    </span>
                                ) : null}
                            </td>
                        </tr>

                        <tr>
                            <td className="border p-1" colSpan={2}>
                                <b>
                                    If the death was perinatal, please state
                                    conditions of mother that affected the fetus
                                    and newborn
                                </b>{" "}
                            </td>
                            <td className="border p-1" colSpan={2}>
                                <Form.Item name="GFVhltTCG8b" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.GFVhltTCG8b
                                        }
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table className="my-2 w-full border-collapse px-2">
                    <tbody>
                        <tr>
                            <td className="border p-1 text-lg">
                                <h3
                                    style={{
                                        fontWeight: "bolder",
                                        color: "#000085",
                                    }}
                                >
                                    <b>
                                        For women, was the deceased pregnant or
                                        within 6 weeks of delivery?
                                    </b>
                                </h3>
                            </td>
                            <td className="border p-1">
                                {optionSets ? (
                                    <Form.Item
                                        name="zcn7acUB6x1"
                                        className="m-0"
                                    >
                                        {optionSet("YN01", "zcn7acUB6x1")}
                                    </Form.Item>
                                ) : null}
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>At what point?</b>
                            </td>
                            <td className="border p-1">
                                {optionSets ? (
                                    <Form.Item
                                        name="KpfvNQSsWIw"
                                        className="m-0"
                                    >
                                        {optionSet("100ATPOINT", "KpfvNQSsWIw")}
                                    </Form.Item>
                                ) : null}
                            </td>
                        </tr>

                        <tr>
                            <td className="border p-1">
                                <b>Did the pregnancy contribute to death?</b>
                            </td>
                            <td className="border p-1">
                                {optionSets ? (
                                    <Form.Item
                                        name="AJAraEcfH63"
                                        className="m-0"
                                    >
                                        {optionSet("YN01", "AJAraEcfH63")}
                                    </Form.Item>
                                ) : null}
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>Referred from (level of care)</b>
                            </td>
                            <td className="border p-1">
                                {optionSets ? (
                                    <Form.Item
                                        name="RJhbkjYrODG"
                                        className="m-0"
                                    >
                                        {optionSet(
                                            "100RefLevels",
                                            "RJhbkjYrODG"
                                        )}
                                    </Form.Item>
                                ) : null}
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>Parity</b>
                            </td>
                            <td className="border p-1">
                                <Form.Item name="ymyLrfEcYkD" className="m-0">
                                    <Input
                                        size="large"
                                        disabled={
                                            store.viewMode ||
                                            store.allDisabled.ymyLrfEcYkD
                                        }
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>Mode of delivery</b>
                            </td>
                            <td className="border p-1">
                                {optionSets ? (
                                    <Form.Item
                                        name="K5BDPJQk1BP"
                                        className="m-0"
                                    >
                                        {optionSet("MD01", "K5BDPJQk1BP")}
                                    </Form.Item>
                                ) : null}
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>Place of delivery</b>
                            </td>
                            <td className="border p-1">
                                {optionSets ? (
                                    <Form.Item
                                        name="Z41di0TRjIu"
                                        className="m-0"
                                    >
                                        {optionSet("PD01", "Z41di0TRjIu")}
                                    </Form.Item>
                                ) : null}
                            </td>
                        </tr>
                        <tr>
                            <td className="border p-1">
                                <b>Delivered by skilled attendant</b>
                            </td>
                            <td className="border p-1">
                                {optionSets ? (
                                    <Form.Item
                                        name="uaxjt0inPNF"
                                        className="m-0"
                                    >
                                        {optionSet("YN01", "uaxjt0inPNF")}
                                    </Form.Item>
                                ) : null}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </Form>
    );
});
