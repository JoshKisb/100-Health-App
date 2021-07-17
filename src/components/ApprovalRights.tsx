import React, { SFC, useState, useEffect } from "react";
import { Input, Button, Form } from "antd";
import { observer } from "mobx-react";
import { useStore } from "../Context";

import { CheckCircleTwoTone } from "@ant-design/icons";

interface SearchType {
  style?: any;
  updateApprovalStatus?: any;
  statusReceived?: any;
}
let anyArrayType: any[] = [];
export const DistrictSearchPopup: SFC<SearchType> = observer(
  ({ style, updateApprovalStatus, statusReceived }) => {
    const store = useStore();
    const [userIsAuthorized, setUserIsAuthorized] = useState(false);
    const [approved, setApproved] = useState(false);
    const [approvalText, setApprovalText] = useState("Not Approved");
    const [inputKey, setinputKey] = useState(Math.random());
    const [userName, setUserName] = useState("");

    const toggleApproved = () => {
      const newApproved = !approved;
      const text = newApproved ? `Approved by ${userName}` : "Not Approved";

      console.log("Text is ", text);
      setApprovalText(text);
      setApproved(newApproved);
      if (updateApprovalStatus) {
        updateApprovalStatus(text);
      }
    };

    useEffect(() => {
      setinputKey(Math.random());
    }, [approvalText]);

    useEffect(() => {
      if (statusReceived) {
        console.log("Status received is ", statusReceived);
        const booleanApproved =
          statusReceived && !statusReceived.includes("Not");
        console.log("Has the form been approved?", booleanApproved);
        setApproved(booleanApproved);

        if (booleanApproved) {
          // setApproved(true);
          setApprovalText(statusReceived);
          store.disableForm();
        }
      }
    }, [statusReceived]);

    const checkApproval = async () => {
      const userIsApproved = await store.isUserApproved();
      // console.log("The user can approve? ", userIsApproved);
      if (userIsApproved?.canApprove) {
        setUserIsAuthorized(userIsApproved?.canApprove);
        setUserName(userIsApproved?.userName);

        // Check if a form has been approved
        return;
      }
      setUserIsAuthorized(userIsApproved?.canApprove);
      setUserName(userIsApproved?.userName);
      // return userIsApproved;
      // console.log("document.cookie", document.cookie);
      // console.log("Starting");
      // const result = await fetch("https://hmis-dev.health.go.ug/api/me?");
      // console.log("Result is ", result);
      // const result
    };

    useEffect(() => {
      checkApproval();
    }, []);

    return userIsAuthorized ? (
      <div>
        <Button
          size="large"
          htmlType="button"
          onClick={toggleApproved}
          disabled={approved}
          style={
            approved
              ? {
                  color: "#28a745",
                  border: "1px solid #28a745",
                }
              : {
                  color: "#6c757d",
                }
          }
        >
          {!approved
            ? store?.activeLanguage?.lang?.["Approve ?"]
            : approvalText}
          {approved && <CheckCircleTwoTone twoToneColor={"#28a745"} />}
        </Button>
      </div>
    ) : null;
  }
);

export default DistrictSearchPopup;
