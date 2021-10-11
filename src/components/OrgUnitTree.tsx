import { TreeSelect, Select, Button, Popover } from "antd";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useStore } from "../Context";
const { Option } = Select;

// const categoryOptionCombos = [
//   {
//     name: "1. National",
//     id: "l4UMmqvSBe5",
//   },
//   {
//     name: "2. Foreigner",
//     id: "VJU0bY182ND",
//   },
//   {
//     name: "3. Refugee",
//     id: "wUteK0Om3qP",
//   },
// ];

const popoverWarnText =
  "Please contact your administrator to assign the form to this selected organisation unit.";

export const OrgUnitTree = observer(() => {
  const [categoryOptionCombos, setCategoryOptionCombos] = useState([]);
  const [units, setUnits] = useState([]);
  const store = useStore();
  const [showWarn, setShowWarn] = useState(false);

  const onLoadData = async (treeNode: any) => {
    await store.loadOrganisationUnitsChildren(treeNode.id);
    setUnits(store.organisationUnits);
  };

  useEffect(() => {
    store.loadUserOrgUnits().then(() => {
      setUnits(store.organisationUnits);
    });
    if (store.nationalitySelect?.length) {
      setCategoryOptionCombos(store.nationalitySelect);
    }
  }, [store]);

  const checkIfWarnApplies = () => {
    if (
      store.selectedOrgUnit &&
      store.selectedNationality &&
      !store.currentOrganisation
    ) {
      setShowWarn(true);
    }
  };
  const handleWarnClose = () => {
    setShowWarn(false);
  };

  console.log("store.canInsert is ", store.canInsert);
  console.log("store.forceDisable is ", store.forceDisable);
  return (
    <div className="flex">
      <div className="w-5/12 pr-1">
        <TreeSelect
          allowClear={true}
          treeDataSimpleMode
          size="large"
          style={{ width: "100%" }}
          value={store.selectedOrgUnit}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Please select health centre"
          onChange={store.setSelectedOrgUnit}
          loadData={onLoadData}
          treeData={units}
        />
      </div>
      <div className="w-5/12 pl-1">
        <Select
          style={{ width: "100%" }}
          allowClear={true}
          placeholder="Nationality"
          onChange={store.setSelectedNationality}
          size="large"
          value={store.selectedNationality}
        >
          {categoryOptionCombos.map((p: any) => (
            <Option value={p.id} key={p.id}>
              {p.name}
            </Option>
          ))}
        </Select>
      </div>
      <Popover
        placement="bottomRight"
        title="Organisation Units Missing"
        content="Please contact your administrator to assign the form to the organisation unit you selected."
        visible={showWarn}
      >
        <div
          className="w-2/12 p-2 text-right"
          onMouseEnter={checkIfWarnApplies}
          onMouseLeave={handleWarnClose}
        >
          <Button
            size="large"
            onClick={store.viewMode ? store.editEvent : store.showForm}
            disabled={!store.canInsert || store.forceDisable}
          >
            {store.viewMode ? "Edit Event" : "Add Event"}
          </Button>
        </div>
      </Popover>
    </div>
  );
});
