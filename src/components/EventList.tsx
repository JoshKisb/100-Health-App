import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { useStore } from "../Context";
import { Table, Card, Drawer, List, Checkbox, Select } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import Highcharts, { Options } from "highcharts";
import moment, { Moment } from "moment";
import { DatePicker, Input, Menu, Dropdown, Button, Form, Popover } from "antd";
import {
  AudioOutlined,
  DownOutlined,
  LoadingOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { GenderFilter, MortalityFilter } from "../filters";

import englishString from "./../assets/english.json";
import frenchString from "./../assets/french.json";

const allLanguages = [
  {
    langName: "English",
    lang: englishString,
  },
  {
    langName: "French",
    lang: frenchString,
  },
];

require("highcharts/modules/exporting")(Highcharts);

// const extraHeaders =
//   process.env.NODE_ENV === "development"
//     ? { Authorization: `${process.env.REACT_APP_DHIS2_AUTHORIZATION}` }
//     : {};

// console.log(extraHeaders)

Highcharts.AST.allowedTags.push("svg");
Highcharts.AST.allowedAttributes.push("viewBox");

const { RangePicker } = DatePicker;
const { Search } = Input;

const defaultRange: any = [
  moment().subtract(1, "years"),
  moment(),
  moment().subtract(2, "years"),
];

const FilterMenu = observer(({ field }) => {
  const store = useStore();
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(store.filters[field]?.value ?? "");

  const onFinish = () => {
    store.filters[field].value = value;
    store.queryEvents();
    setVisible(false);
  };

  const onChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  return (
    <Popover
      placement="bottom"
      visible={visible}
      onVisibleChange={setVisible}
      content={
        <div style={{ padding: "8px 12px" }}>
          <div style={{ margin: "8px 0px" }}>
            <Input
              placeholder="Contains text"
              onChange={onChange}
              value={value}
            />
          </div>

          <Button type="primary" htmlType="button" onClick={onFinish}>
            Update
          </Button>
        </div>
      }
      trigger="click"
    >
      <Button>
        {store.filters[field]?.title}{" "}
        {!!store.filters[field]?.value && `: ${store.filters[field]?.value}`}{" "}
        <DownOutlined />
      </Button>
    </Popover>
  );
});

const arrowDown =
  '<svg class="ptarrow" fill="green" viewBox="0 0 1024 1024"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"/>';
const arrowUp =
  '<svg class="ptarrow" fill="red" viewBox="0 0 256 256"><path d="M215.39111,163.06152A8.00015,8.00015,0,0,1,208,168H48a7.99981,7.99981,0,0,1-5.65674-13.65674l80-80a8,8,0,0,1,11.31348,0l80,80A7.99982,7.99982,0,0,1,215.39111,163.06152Z"/></svg>';
const dash =
  '<svg class="ptarrow" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M2 8a1 1 0 011-1h10a1 1 0 110 2H3a1 1 0 01-1-1z" fill="#2f7ed8"/></svg>';

export const EventList = observer(() => {
  const store = useStore();
  const [visible, setVisible] = useState(false);
  const [searching, setSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const [chartTitle, setChartTitle] = useState("Top 20 causes of death");
  const [filtersInitialized, setFiltersInitialized] = useState(false);
  const [visibleStates, setVisibleStates] = useState({});
  const dropdowns = useRef([]);
  const [downloadData, setDownloadData] = useState([]);
  const [downloadng, setDownloadng] = useState(false);
  const [currChartType, setCurrChartType] = useState("column");
  const csvBtn = useRef(null);
  // const myPicker = useRef<HTMLInputElement|null>(null);

  const [activeLanguage, setActiveLanguage] = useState(
    store.activeLanguage || allLanguages[0]
  );

  useEffect(() => {
    setActiveLanguage(store?.activeLanguage || allLanguages[0])
  }, [store?.activeLanguage])

  let chart: any = useRef(null);
  const colOptions: any = {
    chart: {
      type: "column",
    },
    title: {
      text: chartTitle,
    },
    xAxis: [
      {
        categories: [],
        crosshair: true,
      } as any,
    ],
    yAxis: {
      min: 0,
      title: {
        text: "Death count",
      },
    },
    series: [{ name: "Deaths" } as any],
    tooltip: {
      useHTML: true,
      pointFormatter: function () {
        let point: any = this;
        let arrow = "";

        const disease = store?.topDiseases[point.x];

        arrow =
          disease.count > disease.prev
            ? arrowUp
            : disease.count == disease.prev
            ? dash
            : arrowDown;

        return `<div class="ptlabel">${point.series?.name}: <b>${point.y}</b>${arrow}</div>`;
      },
    },
    credits: {
      enabled: false,
    },
  };

  let pieOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    } as any,
    title: {
      text: chartTitle,
    },
    tooltip: {
      useHTML: true,
      pointFormatter: function () {
        let point: any = this;
        let arrow = "";

        console.log(point);

        const disease = store?.topDiseases[point.x];
        console.log(disease);
        arrow =
          disease.count > disease.prev
            ? arrowUp
            : disease.count == disease.prev
            ? dash
            : arrowDown;
        return `<div class="ptlabel">${point.series.name}: <b>${parseFloat(
          point.percentage
        ).toFixed(1)}%</b>${arrow}</div>`;
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          useHTML: true,
          formatter: function () {
            const pointd: any = this;
            const point = pointd.point;

            let arrow = "";

            const disease = store?.topDiseases[point.x];
            if (!!disease)
              arrow =
                disease.count > disease.prev
                  ? arrowUp
                  : disease.count == disease.prev
                  ? dash
                  : arrowDown;

            return `<div class="ptlabel"><b>${point.name}</b>: ${parseFloat(
              point.percentage
            ).toFixed(1)}:% ${arrow}</div>`;
          },
        },
      },
    },
    series: [
      {
        name: "Deaths",
        colorByPoint: true,
        data: [{}],
      } as any,
    ],
    credits: {
      enabled: false,
    },
  };

  const changeChartType = (chartType: string) => {
    let opts = null;
    setCurrChartType(chartType);
    if (chartType == "pie") {
      opts = pieOptions;
      if (!!store.topDiseases)
        opts.series[0].data = store.topDiseases.map((d: any) => {
          console.log(d);
          return {
            name: d.name,
            y: d.count,
          };
        });
    } else if (chartType == "column") {
      opts = colOptions ?? {};
      if (!!store.topDiseases && opts !== undefined) {
        opts.xAxis[0].categories = store.topDiseases?.map((d: any) => d?.name);
        opts.series[0].data = store.topDiseases?.map((d: any) => {
          return {
            y: d.count,
            color:
              d.count > d.prev
                ? "red"
                : d.count == d.prev
                ? "#2f7ed8"
                : "green",
          };
        });
      }
    }

    if (!!chart.current && !!opts) {
      chart.current.destroy();
      chart.current = Highcharts.chart("topdiseases", opts);
    }
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const [causeOfDeath, setCauseOfDeath] = React.useState<string>(undefined);
  const [mortalityFilter, setMortalityFilter] =
    React.useState<string>(undefined);
  const [genderFilter, setGenderFilter] = React.useState<string>(undefined);

  useEffect(() => {
    if (chart.current == null) return;

    if (store.loadingTopDiseases) chart.current.showLoading("Loading data ...");
    else {
      if (!!store.topDiseases) {
        let sortedDiseases = store.topDiseases;
        let totalMortalityFilteredDeathCount = 0;
        let totalGenderFilteredDeathCount = 0;
        if (mortalityFilter || genderFilter) {
          console.log(mortalityFilter);
          let diseases = new MortalityFilter().apply(
            { ...JSON.parse(JSON.stringify(store.allDiseases)) },
            mortalityFilter
          );
          totalMortalityFilteredDeathCount = 0;
          Object.keys(diseases).forEach((k) => {
            // console.log(diseases[k].count);
            totalMortalityFilteredDeathCount += diseases[k].count;
          });
          diseases = new GenderFilter().apply({ ...diseases }, genderFilter);

          sortedDiseases = Object.values(diseases)
            ?.sort((a: any, b: any) => a.count - b.count)
            ?.slice(-20);
          totalGenderFilteredDeathCount = 0
          Object.keys(diseases).forEach((k) => {
            // console.log(diseases[k].count);
            totalGenderFilteredDeathCount += diseases[k].count;
          });
          sortedDiseases = sortedDiseases.filter(d=>d.count > 0)
          // console.log(diseases)
        }
        // console.log(
        //   store.totalDeathCount,
        //   totalFilteredDeathCount,
        //   ((store.totalDeathCount - totalFilteredDeathCount) /
        //     store.totalDeathCount) *
        //     100
        // );
        let title = causeOfDeath
          ? `${causeOfDeath} contributed ${(
              (store.totalCauseDeathCount / store.totalDeathCount) *
              100
            ).toFixed(2)}%  of total reported deaths`
          : "Top 20 causes of death";
        if (mortalityFilter) {
          title = `${title} [${mortalityFilter} ${(
            (totalMortalityFilteredDeathCount / store.totalDeathCount) *
            100
          ).toFixed(2)}% of total]`;
        }
        if (genderFilter) {
          let mortalityStr = '';
          if(mortalityFilter) {
            mortalityStr = `that are ${mortalityFilter}`
          }
          title = `${title} [${genderFilter} ${(
            (totalGenderFilteredDeathCount / store.totalDeathCount) *
            100
          ).toFixed(2)}% ${mortalityStr}]`;
          
        }
        if (!!store.selectedOrgUnitName)
          title = `${title} in ${store.selectedOrgUnitName}`;
        setChartTitle(title);
        chart.current.setTitle({ text: title });
        chart.current.xAxis[0].setCategories(
          sortedDiseases.map((d: any) => d.name)
        ); //setting category

        chart.current.series[0].setData(
          sortedDiseases.map((d: any) => {
            if (currChartType == "column")
              return {
                y: d.count,
                color:
                  d.count > d.prev
                    ? "red"
                    : d.count == d.prev
                    ? "#2f7ed8"
                    : "green",
              };
            else return d.count;
          }),
          true
        ); //setting data
      }
      chart.current.hideLoading();
    }
  }, [
    store.loadingTopDiseases,
    causeOfDeath,
    mortalityFilter,
    genderFilter,
    store.totalDeathCount,
    store.totalCauseDeathCount,
    store.topDiseases,
    store.selectedOrgUnitName,
    store.allDiseases,
    currChartType,
  ]);

  useEffect(() => {
    console.log("EventList:hook nationalitySelect", store.nationalitySelect);
    if (!store.nationalitySelect) return;

    chart.current = Highcharts.chart("topdiseases", colOptions);

    store.selectedDateRange = [
      defaultRange[0].format("YYYY-MM-DD"),
      defaultRange[1].format("YYYY-MM-DD"),
      defaultRange[2].format("YYYY-MM-DD"),
    ];
    store.queryTopEvents(causeOfDeath).then(() => {
      if (!!store.topDiseases) {
        const sortedDiseases = store.topDiseases;
        chart.current.xAxis[0].setCategories(
          sortedDiseases.map((d: any) => d.name)
        ); //setting category
        chart.current.series[0].setData(
          sortedDiseases.map((d: any) => {
            if (currChartType == "column")
              return {
                y: d.count,
                color:
                  d.count > d.prev
                    ? "red"
                    : d.count == d.prev
                    ? "#2f7ed8"
                    : "green",
              };
            else return d.count;
          }),
          true
        ); //setting data
      }
      chart.current.hideLoading();
    });

    store.queryEvents().then(() => {});
  }, [store?.nationalitySelect, causeOfDeath]);

  useEffect(() => {
    if (filtersInitialized || !store?.data?.headers) return;
    console.log("Setting inital filters");
    store.setInitialFilters();

    setFiltersInitialized(true);
  }, [store?.data?.headers]);

  const handleSelect = (ranges) => {
    if (!ranges) {
      store.clearSelectedDateRange();
    } else {
      const startDate = ranges[0].format("YYYY-MM-DD");
      const endDate = ranges[1].format("YYYY-MM-DD");
      const duration = ranges[1].diff(ranges[0], "days");

      const prevDate = ranges[0]
        .subtract(duration, "days")
        .format("YYYY-MM-DD");

      store.changeSelectedDateRange(startDate, endDate, prevDate);
    }
  };

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );

  const onSearch = (value) => {
    store.search = value;
    console.log(value);
    setSearching(true);
    store.queryEvents().then(() => {
      setSearching(false);
    });
  };

  const handleDownload = () => {
    setDownloadng(true);
    store
      .downloadData()
      .then((dd) => {
        setDownloadData(dd);
        let btn = csvBtn.current;
        if (!!btn) btn.link.click();
        setDownloadng(false);
      })
      .catch((e) => {
        setDownloadng(false);
      });
  };

  // console.log(store.data ? JSON.parse(JSON.stringify(store.data)) : "");

  return (
    <div>
      <div id="topdiseaseswrapper">
        <div
          id="topdiseases"
          style={{ width: "100%", height: "400px", marginBottom: "20px" }}
        ></div>

        <div
          className="chartOpts"
          style={{
            left: 0,
          }}
        >
          <div
            style={{
              marginRight: "auto",
              paddingLeft: "1rem",
            }}
          >
            <Select
              placeholder={activeLanguage.lang["Filter Deaths"]}
              onChange={(e) => {
                if (e) {
                  setCauseOfDeath(e);
                } else {
                  setCauseOfDeath(undefined);
                }
              }}
              size="middle"
              value={causeOfDeath}
              style={{
                minWidth: "160px",
              }}
            >
              <Select.Option value="">{activeLanguage.lang["All Diseases"]}</Select.Option>
              <Select.Option value="Malaria Deaths">{activeLanguage.lang["Malaria Deaths"]}</Select.Option>
              <Select.Option value="TB Deaths">{activeLanguage.lang["TB Deaths"]}</Select.Option>
              <Select.Option value="HIV Related Deaths">{activeLanguage.lang["HIV Related Deaths"]}</Select.Option>
              <Select.Option value="Deaths from cardiovascular diseases">{activeLanguage.lang["Cardiovascular Disease"]}</Select.Option>
              <Select.Option value="Cancer Deaths">{activeLanguage.lang["Cancer"]}</Select.Option>
              <Select.Option value="Obstructive Pulmonary Disease">{activeLanguage.lang["Chronic Obstructive Pulmonary Disease"]}</Select.Option>
              <Select.Option value="Diabetes Mellitus">{activeLanguage.lang["Diabetes Mellitus"]}</Select.Option>
              <Select.Option value="Premature noncommunicable disease (NCD)">{activeLanguage.lang["Premature noncommunicable disease (NCD)"]}</Select.Option>
              <Select.Option value="covid19">{activeLanguage.lang["covid-19"]}</Select.Option>
              <Select.Option value="pneumonia">{activeLanguage.lang["pneumonia"]}</Select.Option>
              <Select.Option value="Road traffic accidents">{activeLanguage.lang["Road traffic accidents"]}</Select.Option>
              <Select.Option value="Suicide">{activeLanguage.lang["Suicide"]}</Select.Option>
              <Select.Option value="Maternal deaths">{activeLanguage.lang["Maternal deaths"]}</Select.Option>
              <Select.Option value="injuries">{activeLanguage.lang["Traffic Injuries"]}</Select.Option>
              <Select.Option value="Total NCD Deaths">{activeLanguage.lang["Total Deaths from NCDs"]}</Select.Option>
              <Select.Option value="Total Communicable Deaths">{activeLanguage.lang["Total Deaths from communicable Diseases"]}</Select.Option>
              
              

              // 41 and 77
            </Select>
            <Select
              placeholder={activeLanguage.lang["Gender"]}
              onChange={(e) => {
                if (e) {
                  setGenderFilter(e);
                } else {
                  setGenderFilter(undefined);
                }
              }}
              size="middle"
              value={genderFilter}
              style={{
                minWidth: "100px",
              }}
            >
              <Select.Option value="">{activeLanguage.lang["None"]}</Select.Option>
              <Select.Option value="Female">{activeLanguage.lang["Female"]}</Select.Option>
              <Select.Option value="Male">{activeLanguage.lang["Male"]}</Select.Option>
            </Select>
            <Select
              placeholder={
                !causeOfDeath
                  ? activeLanguage.lang["All Deaths Mortality Filter"]
                  : `${causeOfDeath} Mortalility FIlter`
              }
              onChange={(e) => {
                if (e) {
                  setMortalityFilter(e);
                } else {
                  setMortalityFilter(undefined);
                }
              }}
              size="middle"
              style={{
                minWidth: "200px",
              }}
              value={mortalityFilter}
            >
              <Select.Option value="">{activeLanguage.lang["All Deaths"]}</Select.Option>
              <Select.Option value="Stillbirth">{activeLanguage.lang["Stillbirth"]}</Select.Option>
              <Select.Option value="Neonatal">{activeLanguage.lang["Neonatal"]}</Select.Option>
              <Select.Option value="Early Neonatal">
                {activeLanguage.lang["Early Neonatal"]}
              </Select.Option>
              {/* <Select.Option value="Perinatal">Perinatal</Select.Option> */}
              <Select.Option value="Infant">{activeLanguage.lang["Infant"]}</Select.Option>
              <Select.Option value="Under-five">{activeLanguage.lang["Under-five"]}</Select.Option>
              <Select.Option value="Adolescent">{activeLanguage.lang["Adolescent"]}</Select.Option>
              <Select.Option value="Adult">{activeLanguage.lang["Adult"]}</Select.Option>
              // 41 and 77
            </Select>
          </div>

          <div className="chartPicker">
            <button
              type="button"
              className="chart-pick-item"
              onClick={() => {
                changeChartType("column");
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <g fill="none" fillRule="evenodd">
                  <polygon points="0 0 48 0 48 48 0 48"></polygon>
                  <polygon
                    fill="#147CD7"
                    points="12 12 18 12 18 36 12 36"
                  ></polygon>
                  <polygon
                    fill="#147CD7"
                    points="22 22 28 22 28 36 22 36"
                  ></polygon>
                  <polygon
                    fill="#147CD7"
                    points="32 7 38 7 38 36 32 36"
                  ></polygon>
                  <polygon fill="#4A5768" points="6 6 8 6 8 42 6 42"></polygon>
                  <polygon
                    fill="#4A5768"
                    points="6 40 42 40 42 42 6 42"
                  ></polygon>
                </g>
              </svg>
            </button>
            <button
              type="button"
              className="chart-pick-item"
              onClick={() => {
                changeChartType("pie");
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,48,48">
                <g fill="none" fillRule="evenodd" transform="rotate(90 24 24)">
                  <polygon points="0 0 48 0 48 48 0 48"></polygon>
                  <circle
                    cx="24"
                    cy="24"
                    r="16"
                    stroke="#4A5768"
                    strokeWidth="2"
                  ></circle>
                  <path
                    fill="#FFC324"
                    d="M11,24 C11,31.1797017 16.8202983,37 24,37 C31.1797017,37 37,31.1797017 37,24 C37,16.8202983 31.1797017,11 24,11 L24,24 L11,24 Z"
                    transform="rotate(165 24 24)"
                  ></path>
                  <path
                    fill="#147CD7"
                    d="M11,24 C11,31.1797017 16.8202983,37 24,37 C31.1797017,37 37,31.1797017 37,24 C37,16.8202983 31.1797017,11 24,11 L24,24 L11,24 Z"
                    transform="rotate(-15 24 24)"
                  ></path>
                </g>
              </svg>
            </button>
          </div>

          <div className="chart-date-range">
            <RangePicker defaultValue={defaultRange} onChange={handleSelect} />
          </div>
        </div>
      </div>
      {store.data ? (
        <Card
          title="Cases"
          bodyStyle={{ maxWidth: "100vw", padding: 0, margin: 0 }}
          extra={
            <div style={{ display: "flex", gap: "10px" }}>
              <SettingOutlined
                style={{ fontSize: "24px" }}
                onClick={showDrawer}
              />
              <CSVLink
                ref={csvBtn}
                data={downloadData}
                filename={"cod-cases.csv"}
                style={{ display: "none" }}
              />

              {!downloadng ? (
                <DownloadOutlined
                  style={{ fontSize: "24px" }}
                  onClick={handleDownload}
                />
              ) : (
                <LoadingOutlined style={{ fontSize: "24px" }} />
              )}
            </div>
          }
        >
          <div style={{ padding: "15px", display: "flex", gap: "10px" }}>
            {Object.keys(store.filters).map((field: any) => (
              <FilterMenu key={field} field={field} />
            ))}
          </div>

          <Table
            rowKey={(record: any) => record[0]}
            dataSource={store.data.rows}
            columns={store.columns}
            rowClassName={() => "l"}
            onRow={(record, rowIndex) => {
              // Fix for age that doesn't show if its zero
              // console.log("Record is ", record);
              if (record && record["34"] === "") {
                record["34"] = "0";
              }
              return {
                onClick: (event: any) => {
                  store.setCurrentEvent(record);
                  store.view();
                  store.showForm();
                },
              };
            }}
            pagination={{
              showSizeChanger: true,
              total: store.total,
              pageSize: store.pageSize,
              pageSizeOptions: ["5", "10", "15", "20", "25", "50", "100"],
            }}
            onChange={store.handleChange}
          />
        </Card>
      ) : null}

      <Drawer
        title="Columns"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={512}
      >
        <List
          itemLayout="horizontal"
          dataSource={store.availableDataElements}
          renderItem={(item: any) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Checkbox
                    checked={item.selected}
                    onChange={store.includeColumns(item.id)}
                  />
                }
                title={item.name}
              />
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  );
});
