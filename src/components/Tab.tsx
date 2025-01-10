import cx from "classnames";
import React from 'react';
import { Tabs } from 'antd';

export default function Tab() {

  return (
    <div style={{
      background:"#151517",
      flex: '0 0 19%',
      borderRadius: "8px",
        color:"white",
    }}>
        <Tabs
            defaultActiveKey="1"
            tabBarGutter={20}
            tabBarStyle={{padding: '0 12px',marginBottom:"30px"}}
            items={[
                {
                    label: 'Positions(0)',
                    key: '1',
                    children: <div className="tabs-content">No Data</div>,
                },
                {
                    label: 'Open orders(0)',
                    key: '2',
                    disabled: true,
                },
                {
                    label: 'Order history',
                    key: '3',
                    disabled: true,
                },
                {
                    label: 'Position history',
                    key: '4',
                    disabled: true,
                },
                {
                    label: 'Order details',
                    key: '5',
                    disabled: true,
                }
            ]}
        />
    </div>
  );
}
