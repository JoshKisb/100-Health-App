import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { useStore } from "../Context";
import { Table, Card, Drawer, List, Checkbox } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import Highcharts, {Options} from 'highcharts';  
import moment, { Moment } from 'moment';
import { DatePicker, Input, Menu, Dropdown, Button, Form, Popover } from 'antd';
import { AudioOutlined, DownOutlined } from '@ant-design/icons';

require('highcharts/modules/exporting')(Highcharts);

const { RangePicker } = DatePicker;
const { Search } = Input;


const defaultRange: any = [
  moment().subtract(1, 'years'),
  moment()
]

const FilterMenu = observer(({ field }) => {
  const store = useStore();
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(store.filters[field]?.value ?? "");

  const onFinish = () => {
    store.filters[field].value = value;
    store.queryEvents();
    setVisible(false);
  }

  const onChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  }

  return (<Popover placement="bottom" visible={visible} onVisibleChange={setVisible} content={(
      <div style={{ padding: '8px 12px' }}>
            <div style={{ margin: '8px 0px' }}>
              <Input placeholder="Contains text" onChange={onChange} value={value}  />
            </div>

            <Button type="primary" htmlType="button" onClick={onFinish}>
              Update
            </Button>
        
      </div>
    )} trigger="click">
        <Button>{store.filters[field]?.title} {!!store.filters[field]?.value && `: ${store.filters[field]?.value}`} <DownOutlined /></Button>
      </Popover>
    
      
    
  );

});

export const EventList = observer(() => {
  const store = useStore();
  const [visible, setVisible] = useState(false);
  const [searching, setSearching] = useState(false);
   const [open, setOpen] = useState(false);
   const [chartTitle, setChartTitle] = useState("Top 10 causes of death")
   const [filtersInitialized, setFiltersInitialized] = useState(false);
   const [visibleStates, setVisibleStates] = useState({});
   const dropdowns = useRef([]);
   // const myPicker = useRef<HTMLInputElement|null>(null);


  let chart: any = useRef(null);
  const colOptions: any = {
        chart: {
            type: 'column'
        },
        title: {
            text: chartTitle
        },
        xAxis: [{
            categories: [ ],
            crosshair: true
        }as any],
        yAxis: {
            min: 0,
            title: {
                text: 'Death count'
            }
        },
        series: [{ name: "Deaths"} as any],
        credits: {
            enabled: false
        }
    };

    let pieOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        } as any,
        title: {
            text: chartTitle
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Deaths',
            colorByPoint: true,
            data: [{}]
        } as any],
        credits: {
            enabled: false
        }
    }

  const changeChartType = (chartType: string) => {
    console.log(chart.current);
    let opts = null;
    if (chartType == 'pie') {
      opts = pieOptions;
      if (!!store.topDiseases)
        opts.series[0].data = store.topDiseases.map((d: any) => ({ name: d.name, y: d.count }))
    } else if (chartType == 'column') {
      opts = colOptions ?? {};
      if (!!store.topDiseases && opts !== undefined) {
        opts.xAxis[0].categories = store.topDiseases?.map((d: any) => d?.name);
        opts.series[0].data = store.topDiseases?.map((d: any) => d.count)
      }
    }

    if (!!chart.current && !!opts) {
      chart.current.destroy()
      chart.current = Highcharts.chart('topdiseases', opts);
    }
  }

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (chart.current == null) return;
    
    if (store.loadingTopDiseases)
      chart.current.showLoading('Loading data ...');
    else {
      if (!!store.topDiseases) {
        const sortedDiseases = store.topDiseases;
        let title = "Top 10 causes of death";
        if (!!store.selectedOrgUnitName)
          title = `${title} in ${store.selectedOrgUnitName}`;
        setChartTitle(title);
        chart.current.setTitle({text: title});
        chart.current.xAxis[0].setCategories(sortedDiseases.map((d: any) => d.name)); //setting category
        chart.current.series[0].setData(sortedDiseases.map((d: any) => d.count), true); //setting data
      }
      chart.current.hideLoading();
    }
  }, [store.loadingTopDiseases])

  useEffect(() => {
    console.log("EventList:hook nationalitySelect", store.nationalitySelect);
    if (!store.nationalitySelect) return;
    
    chart.current = Highcharts.chart('topdiseases', colOptions);

    store.selectedDateRange = [
      defaultRange[0].format("YYYY-MM-DD"),
      defaultRange[1].format("YYYY-MM-DD"),
    ];
    store.queryTopEvents().then(() => {
      if (!!store.topDiseases) {
        const sortedDiseases = store.topDiseases;
        chart.current.xAxis[0].setCategories(sortedDiseases.map((d: any) => d.name)); //setting category
        chart.current.series[0].setData(sortedDiseases.map((d: any) => d.count), true); //setting data
      }
      chart.current.hideLoading();
    })
    
    store.queryEvents().then(() => {
      
    });
  }, [store?.nationalitySelect]);

  useEffect(() => {
    if (filtersInitialized || !store?.data?.headers) return;
    console.log("Setting inital filters")
    store.setInitialFilters()
    
    setFiltersInitialized(true);
  }, [store?.data?.headers])


  const handleSelect = (ranges) => {
    if (!ranges) {
      store.clearSelectedDateRange();
    } else {
      const startDate = ranges[0].format("YYYY-MM-DD")
      const endDate = ranges[1].format("YYYY-MM-DD")

      store.changeSelectedDateRange(startDate, endDate);
    }
  }

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

  const onSearch = value => {
    store.search = value;
    console.log(value);
    setSearching(true);
    store.queryEvents().then(() => {
      setSearching(false);
    });
  }
  

  return (
    <div>
      <div id="topdiseaseswrapper">
      
        <div id="topdiseases" style={{ width: "100%", height: "400px", marginBottom: "20px" }}></div>
        <div className="chartOpts">
          <div className="chartPicker">
            <button type="button" className="chart-pick-item" onClick={() => {changeChartType("column")}}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><g fill="none" fill-rule="evenodd"><polygon points="0 0 48 0 48 48 0 48"></polygon><polygon fill="#147CD7" points="12 12 18 12 18 36 12 36"></polygon><polygon fill="#147CD7" points="22 22 28 22 28 36 22 36"></polygon><polygon fill="#147CD7" points="32 7 38 7 38 36 32 36"></polygon><polygon fill="#4A5768" points="6 6 8 6 8 42 6 42"></polygon><polygon fill="#4A5768" points="6 40 42 40 42 42 6 42"></polygon></g></svg>
            </button>
            <button type="button" className="chart-pick-item" onClick={() => {changeChartType("pie")}}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,48,48"><g fill="none" fill-rule="evenodd" transform="rotate(90 24 24)"><polygon points="0 0 48 0 48 48 0 48"></polygon><circle cx="24" cy="24" r="16" stroke="#4A5768" stroke-width="2"></circle><path fill="#FFC324" d="M11,24 C11,31.1797017 16.8202983,37 24,37 C31.1797017,37 37,31.1797017 37,24 C37,16.8202983 31.1797017,11 24,11 L24,24 L11,24 Z" transform="rotate(165 24 24)"></path><path fill="#147CD7" d="M11,24 C11,31.1797017 16.8202983,37 24,37 C31.1797017,37 37,31.1797017 37,24 C37,16.8202983 31.1797017,11 24,11 L24,24 L11,24 Z" transform="rotate(-15 24 24)"></path></g></svg>
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
            <SettingOutlined
              style={{ fontSize: "24px" }}
              onClick={showDrawer}
            />
          }
        >
        
          <div style={{ padding: '15px', display: "flex", gap: "10px" }}>
            {Object.keys(store.filters).map((field: any) => (
              <FilterMenu key={field} field={field}  />
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
