import { TreeSelect, Select, Button } from "antd";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useStore } from "../Context";
const { Option } = Select;

const categoryOptionCombos = [
  {
    name: "1. National",
    id: "l4UMmqvSBe5",
  },
  {
    name: "2. Foreigner",
    id: "VJU0bY182ND",
  },
  {
    name: "3. Refugee",
    id: "wUteK0Om3qP",
  },
];

export const OrgUnitTree = observer(() => {
  const [units, setUnits] = useState([]);
  const store = useStore();

  const onLoadData = async (treeNode: any) => {
    await store.loadOrganisationUnitsChildren(treeNode.id);
    setUnits(store.organisationUnits);
  };

  useEffect(() => {
    store.loadUserOrgUnits().then(() => {
      setUnits(store.organisationUnits);
    });
  }, [store]);

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
      <div className="w-2/12 p-2 text-right">
        <Button
          size="large"
          onClick={store.viewMode ? store.editEvent : store.showForm}
          disabled={!store.canInsert || store.forceDisable}
        >
          {store.viewMode ? "Edit Event" : "Add Event"}
        </Button>
      </div>
    </div>
  );
});
