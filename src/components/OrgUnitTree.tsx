import React, { useState, useEffect, FunctionComponent } from "react";
import { TreeSelect, Select, Button, Popover, Spin } from "antd";
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

interface OrgUnitTreeTypes {
  loading?: boolean;
  fetching?: boolean;
}

export const OrgUnitTree: FunctionComponent<OrgUnitTreeTypes> = observer(
  ({ loading, fetching }) => {
    const [categoryOptionCombos, setCategoryOptionCombos] = useState([]);
    const [userIsAuthorized, setUserIsAuthorized] = useState(false);
    const [units, setUnits] = useState([]);
    const store = useStore();
    const [showWarn, setShowWarn] = useState(false);
    const [showLangWarn, setShowLangWarn] = useState(false);
    const activeLanguage = store.activeLanguage;

    const onLoadData = async (treeNode: any) => {
      await store.loadOrganisationUnitsChildren(treeNode.id);
      setUnits(store.organisationUnits);
    };

    useEffect(() => {
      if (store.nationalitySelect?.length) {
        console.log("categoryOptionCombos", store.nationalitySelect)
        setCategoryOptionCombos(store.nationalitySelect);
      }
    }, [store.nationalitySelect]);

    useEffect(() => {
      if (store.userOrgUnits?.length) {
          setUnits(store.organisationUnits);
      }
    }, [store, fetching]);

    const checkIfLangWarnApplies = async () => {
      if (!userIsAuthorized) {
        setShowLangWarn(true);
      }
    };

    const handleLangWarnClose = () => setShowLangWarn(false);

    const checkIfWarnApplies = () => {
      if (
        store.selectedOrgUnit &&
        store.selectedNationality &&
        !store.currentOrganisation
      ) {
        setShowWarn(true);
      }
    };

    const handleWarnClose = () => setShowWarn(false);

    const showLangConfig = () => store.showLang();

    const checkApproval = async () => {
      const isAuthorized = await store.checkIfAdmin();
      setUserIsAuthorized(isAuthorized);
    };

    useEffect(() => {
      checkApproval();
    }, []);

    return (
      <Spin spinning={loading}>
        <div className="flex" style={{ alignItems: "center" }}>
          <div className="w-5/12 pr-1">
            <TreeSelect
              allowClear={true}
              treeDataSimpleMode
              size="large"
              style={{ width: "100%" }}
              value={store.selectedOrgUnit}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              placeholder={ activeLanguage?.lang["Please select health centre"] }
              onChange={store.setSelectedOrgUnit}
              loadData={onLoadData}
              treeData={units}
            />
          </div>
          <div className="w-5/12 pl-1">
            <Select
              style={{ width: "100%" }}
              allowClear={true}
              placeholder={ activeLanguage?.lang["Nationality"] }
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
                {store.viewMode ? activeLanguage?.lang["Edit Event"] : activeLanguage?.lang["Add Event"] }
              </Button>
            </div>
          </Popover>

          <Popover
            placement="bottomRight"
            title="Insufficient Permissions"
            content="Please contact your administrator to change the active language for you."
            visible={showLangWarn}
          >
            <div
              className="w-2/12 p-2 text-right"
              onMouseEnter={checkIfLangWarnApplies}
              onMouseLeave={handleLangWarnClose}
            >
              <Button
                size="large"
                onClick={showLangConfig}
                disabled={!userIsAuthorized}
              >
                { activeLanguage?.lang["Change Language"] }
              </Button>
            </div>
          </Popover>
        </div>
      </Spin>
    );
  }
);
