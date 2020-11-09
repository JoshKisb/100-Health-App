import React, { SFC, useState, useEffect } from "react";
import { Input, Button } from "antd";
import { observer } from "mobx-react";

import { CheckCircleTwoTone } from "@ant-design/icons";

interface SearchType {
  style?: any;
}
let anyArrayType: any[] = [];
export const DistrictSearchPopup: SFC<SearchType> = observer(({ style }) => {
  const [approved, setApproved] = useState(false);

  const toggleApproved = () => {
    setApproved(!approved);
  };

  return (
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
  );
});

export default DistrictSearchPopup;
