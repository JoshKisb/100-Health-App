import React, { Fragment, useState, useEffect, SFC } from "react";
import { Input, Button, Form } from "antd";
import { observer } from "mobx-react";
import { useStore } from "./../../Context";
import { Checkbox } from "antd";

import {
  CloseSquareOutlined,
  LoadingOutlined,
  RollbackOutlined,
} from "@ant-design/icons";

interface SearchType {
  disabled?: boolean;
  receiveOldData?: {
    u9tYUv6AM51: boolean;
    ZXZZfzBpu8a: boolean;
    cp5xzqVU2Vw: boolean;
    lu9BiHPxNqH: string;
  };
  limitedArray?: any;
  setLimitedArray?: any;
  dictatedContent?: string;
  setDictatedContent?: any;
  limitedArrayParent?: string;
  setLimitedArrayParent?: any;
  receiveOutput?: any;
  titleBackgroundColor?: any;
}
let anyArrayType: any[] = [];
export const DistrictSearchPopup: SFC<SearchType> = observer(
  ({
    disabled = false,
    receiveOutput = () => {},
    titleBackgroundColor = "",
    receiveOldData = {
      u9tYUv6AM51: false,
      ZXZZfzBpu8a: false,
      cp5xzqVU2Vw: false,
      lu9BiHPxNqH: "",
    },
  }) => {
    const [attendedBeforeDeath, setAttendedBeforeDeath] = useState(false);
    const [examinedBeforeDeath, setExaminedBeforeDeath] = useState(false);
    const [conductedPostMortem, setConductedPostMortem] = useState(false);
    const [other, setOther] = useState("");
    const store = useStore();

    const saveContent = () => {
      const result = {
        u9tYUv6AM51: attendedBeforeDeath ? "Yes" : "",
        ZXZZfzBpu8a: examinedBeforeDeath ? "Yes" : "",
        cp5xzqVU2Vw: conductedPostMortem ? "Yes" : "",
        lu9BiHPxNqH: other,
      };
      receiveOutput(result);
    };

    useEffect(() => {
      saveContent();
    }, [attendedBeforeDeath, examinedBeforeDeath, conductedPostMortem, other]);

    useEffect(() => {
      setAttendedBeforeDeath(receiveOldData.u9tYUv6AM51 ? true : false);
      setExaminedBeforeDeath(receiveOldData.ZXZZfzBpu8a ? true : false);
      setConductedPostMortem(receiveOldData.cp5xzqVU2Vw ? true : false);
      setOther(receiveOldData.lu9BiHPxNqH);
    }, [receiveOldData]);
    /**
      100-DD0A. I attended the deceased before death		u9tYUv6AM51
      100-DD0B.I examined the body after death	        ZXZZfzBpu8a
      100-DD0C. I conducted the post mortem of the body	cp5xzqVU2Vw
      100-DD0X. Declaration Other Specify	                lu9BiHPxNqH
     */
    // const [attendedBeforeDeath, setAttendedBeforeDeath] = useState("")

    return (
      <Fragment>
        <tr>
          <td
            className="border p-1 text-lg"
            style={{ background: titleBackgroundColor }}
          >
            <h3
              style={{
                fontWeight: "bolder",
                color: "#000085",
              }}
            >
              <b>
                {
                  store?.activeLanguage?.[
                    "I hereby certify that (tick as appropriate) :"
                  ]
                }
              </b>
            </h3>
          </td>
          <td
            className="border p-1 text-lg"
            style={{ background: titleBackgroundColor }}
          ></td>
        </tr>

        <tr>
          {/* b) I examined the body after death c) I conducted the post mortem of
          the body d) Other (specify) ………………………………… */}
          <td className="border p-1">
            <Form.Item name="Z41di0TRjIu" className="m-0">
              <p>
                {" "}
                {
                  store?.activeLanguage?.[
                    "I attended the deceased before death"
                  ]
                }
              </p>
            </Form.Item>
          </td>
          <td className="border p-1">
            <p>
              {store?.activeLanguage?.["Yes"]}{" "}
              <Checkbox
                checked={attendedBeforeDeath}
                onClick={() => setAttendedBeforeDeath(!attendedBeforeDeath)}
              />
            </p>
          </td>
        </tr>

        <tr>
          {/* b)  d) Other (specify) ………………………………… */}
          <td className="border p-1">
            <Form.Item name="Z41di0TRjIu" className="m-0">
              <p>
                {" "}
                {
                  store?.activeLanguage?.["I examined the body after death"]
                }{" "}
              </p>
            </Form.Item>
          </td>
          <td className="border p-1">
            <p>
              {store?.activeLanguage?.["Yes"]}{" "}
              <Checkbox
                checked={examinedBeforeDeath}
                onClick={() => setExaminedBeforeDeath(!examinedBeforeDeath)}
              />
            </p>
          </td>
        </tr>

        <tr>
          {/* b)  d) Other (specify) ………………………………… */}
          <td className="border p-1">
            <Form.Item name="Z41di0TRjIu" className="m-0">
              <p>
                {" "}
                {
                  store?.activeLanguage?.[
                    "I conducted the post mortem of the body"
                  ]
                }{" "}
              </p>
            </Form.Item>
          </td>
          <td className="border p-1">
            <p>
              {store?.activeLanguage?.["Yes"]}{" "}
              <Checkbox
                checked={conductedPostMortem}
                onClick={() => setConductedPostMortem(!conductedPostMortem)}
              />
            </p>
          </td>
        </tr>

        <tr>
          {/* b)  d)  ………………………………… */}
          <td className="border p-1">
            <Form.Item name="Z41di0TRjIu" className="m-0">
              <p> {store?.activeLanguage?.["Other (specify)"]}</p>
            </Form.Item>
          </td>
          <td className="border p-1">
            <p>
              <Input
                size="large"
                value={other}
                onChange={(e) => {
                  if (e?.target?.value || e?.target?.value === "") {
                    setOther(`${e.target.value}`);
                  }
                }}
                placeholder={store?.activeLanguage?.["Specify"]}
              />
            </p>
          </td>
        </tr>
      </Fragment>
    );
  }
);

export default DistrictSearchPopup;
