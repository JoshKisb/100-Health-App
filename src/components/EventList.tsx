import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStore } from "../Context";
import { Table, Card, Drawer, List, Checkbox } from "antd";
import { SettingOutlined } from "@ant-design/icons";
export const EventList = observer(() => {
  const store = useStore();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    store.queryEvents();
  }, [store]);
  return (
    <div>
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
          <Table
            rowKey={(record: any) => record[0]}
            dataSource={store.data.rows}
            columns={store.columns}
            rowClassName={() => "l"}
            onRow={(record, rowIndex) => {
              // Fix for age that doesn't show if its zero
              console.log("Record is ", record);
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
