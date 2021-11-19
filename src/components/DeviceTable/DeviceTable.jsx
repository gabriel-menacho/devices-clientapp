import React from "react";
import './DeviceTable.css';
import Device from "../Device";
import cn from 'classnames';

function DeviceTable({ updateTable, devices }) {

  return (
    <div className="p-5">
      {devices.map(({ hddCapacity, id, systemName, type }, idx) => {
        return (
          <Device
            className={cn({
              ['last-child']: idx === devices.length - 1
            })}
            hddCapacity={hddCapacity}
            id={id}
            systemName={systemName}
            type={type}
            updateTable={updateTable}
          />
        );
      })}
    </div>
  );
}

export default DeviceTable;
