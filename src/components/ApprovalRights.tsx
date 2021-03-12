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

    const toggleApproved = () => {
      const newApproved = !approved;
      const text = newApproved ? "Approved" : "Not Approved";

      console.log("TExt is ", text);
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
        setApproved(statusReceived);
      }
    }, [statusReceived]);

    const checkApproval = async () => {
      const userIsApproved = await store.isUserApproved();
      console.log("The user is approved", userIsApproved);
      setUserIsAuthorized(userIsApproved);
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
          {!approved ? "Approve ?" : "Approved"}
          {approved && <CheckCircleTwoTone twoToneColor={"#28a745"} />}
        </Button>
      </div>
    ) : null;
  }
);

export default DistrictSearchPopup;
