import React, { SFC, useState, useEffect } from "react";
import { Input } from "antd";
import { observer } from "mobx-react";
import searchArray from "./searchArray";
import { organisationUnits as districts } from "./districts.json";
import { organisationUnits as subCounties } from "./subCounties.json";

import {
  CloseSquareOutlined,
  LoadingOutlined,
  RollbackOutlined,
} from "@ant-design/icons";

interface SearchType {
  disabled?: boolean;
  searchType: string;
  limitedArray?: any;
  setLimitedArray?: any;
  dictatedContent?: string;
  setDictatedContent?: any;
  limitedArrayParent?: string;
  setLimitedArrayParent?: any;
}
let anyArrayType: any[] = [];
export const DistrictSearchPopup: SFC<SearchType> = observer(
  ({
    disabled = false,
    searchType,
    dictatedContent,
    limitedArray = [],
    setLimitedArray,
    setDictatedContent,
    limitedArrayParent,
    setLimitedArrayParent,
  }) => {
    //       // Searches (District and sub county)
    const [contentString, setContentString] = useState("");
    const [searchString, setSearchString] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(setTimeout(() => {}, 0));
    const [disableSearch, setDisableSearch] = useState(false);

    const [showResultOverride, setShowResultOverride] = useState(true);
    const [subCountySearchTimeout, setSubCountySearchTimeout] = useState(
      setTimeout(() => {}, 0)
    );

    const [searchResults, setSearchResults] = useState(anyArrayType);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const searchEntity = (text: string) => {
      let itemToSearch = limitedArray?.length
        ? limitedArray
        : searchType === "subCounty"
        ? subCounties
        : districts;
      let potentialResults = searchArray(text, itemToSearch, ["name"], "id");
      if (!showResultOverride) {
        setShowResultOverride(true);
      }
      if (Array.isArray(potentialResults)) {
        setSearchResults(potentialResults);
        setLoading(false);
      }
      //  If its a district, set the limited array
    };

    useEffect(() => {
      if (searchString?.length >= 2 && !disableSearch) {
        setDropdownVisible(true);
        setLoading(true);
        if (searchTimeout) {
          clearTimeout(searchTimeout);
        }
        setSearchTimeout(
          setTimeout(() => {
            searchEntity(searchString);
          }, 600)
        );
      }
    }, [searchString]);

    useEffect(() => {
      if (dictatedContent?.length) {
        setDisableSearch(true);
        setSearchString(dictatedContent);
      }
    }, [dictatedContent]);

    const captureItem = (item: any) => {
      setDisableSearch(true);
      setDropdownVisible(false);
      if (typeof item?.name === "string") {
        setSearchString(item.name);
      }

      // If this is a sub County that has been chosen, set the district
      if (searchType === "subCounty") {
        if (setDictatedContent) {
          let district = item.parent?.name;
          setDictatedContent(district);
        }
      }

      // If it's a district that has been chosen, set the subcounties under it such that they are the only results that can be returned
      if (searchType === "district") {
        if (setLimitedArray) {
          setLimitedArray(item.children);
        }
        if (setLimitedArrayParent) {
          setLimitedArrayParent(item.name);
        }
      }
    };

    useEffect(() => {
      if (limitedArray.length && searchString) {
        setSearchString("");
        if (!showResultOverride) {
          setShowResultOverride(true);
        }
      }
    }, [limitedArray]);

    const styles = {
      searchContainer: {
        position: "relative" as "relative",
      },
      results: {
        position: "absolute" as "absolute",
        maxHeight: "300px",
        zIndex: 1000,
        backgroundColor: "#fff",
        overflowY: "scroll" as "scroll",
        right: "0px",
        left: "0px",
        boxShadow: "5px 5px 3px rgba(0, 0, 0, 0.1)",

        // transform:
        //   !buttonIsDisabled && reposition
        //     ? "translateY(-115%)"
        //     : !buttonIsDisabled && !reposition
        //     ? "translateY(3%)"
        //     : "translateY(20%)",
      },
      singleResult: {
        borderBottom: "0.5px solid gray",
        marginBottom: "0.5rem",
        padding: "0.5rem",
        cursor: "pointer" as "pointer",
      },
      iconStyle: {
        fontSize: "18px",
        cursor: "pointer" as "pointer",
        color: "#dc3545",
      },
      topIconContainer: {
        display: "flex" as "flex",
        justifyContent: "flex-end",
        background: "white",
        padding: "0.3rem",
      },
      loader: {
        fontSize: "22px",
        color: "#007bff",
      },
      loaderContainer: {
        display: "flex" as "flex",
        justifyContent: "center",
        marginBottom: "0.6rem",
      },
      topDistrict: {
        position: "sticky" as "sticky",
        top: "0px",
        left: "0px",
        right: "0px",
        fontSize: "0.8em",
        color: "#007bff",
        fontWeight: "bold" as "bold",
        marginBottom: "0.5rem",
        cursor: "pointer",
        background: "white",
        padding: "0.3rem",
      },
    };

    useEffect(() => {
      setTimeout(() => {
        setDisableSearch(false);
      }, 500);
    }, [disableSearch]);

    const resetSubCountySearch = () => {
      if (limitedArray?.length) {
        setShowResultOverride(false);
        setSearchResults(limitedArray);
      }
    };

    return (
      <React.Fragment>
        <Input
          size="large"
          disabled={disabled || false}
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
          placeholder={
            searchType === "subCounty"
              ? "Search for a Sub County..."
              : "Search for a District..."
          }
        />

        {dropdownVisible ? (
          <div style={styles.searchContainer}>
            <div style={styles.results}>
              <div style={styles.topIconContainer}>
                <CloseSquareOutlined
                  style={styles.iconStyle}
                  onClick={() => {
                    setDropdownVisible(false);
                    setSearchResults([]);
                  }}
                />
              </div>

              {!loading ? (
                <React.Fragment>
                  {limitedArrayParent && showResultOverride ? (
                    <div
                      style={styles.topDistrict}
                      onClick={resetSubCountySearch}
                    >
                      Show all subcounties in {limitedArrayParent}
                    </div>
                  ) : (
                    ""
                  )}

                  {searchResults?.length
                    ? searchResults.map((item) => (
                        <div
                          key={Math.random()}
                          style={styles.singleResult}
                          onClick={() => {
                            captureItem(item);
                          }}
                        >
                          {item.name}
                        </div>
                      ))
                    : ""}
                </React.Fragment>
              ) : (
                <div style={styles.loaderContainer}>
                  <LoadingOutlined spin style={styles.loader} />
                </div>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
);

export default DistrictSearchPopup;
