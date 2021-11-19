import React, { useState, useEffect } from "react";
import './DeviceList.css';
import DeviceTable from "../DeviceTable";
import DeviceDropdown from "../DeviceDropdown";
import { Container, Row, Col, Button } from "reactstrap";
import { deviceSortMap } from '../../constants/constants';
import DeviceEditor from "../DeviceEditor";
import { getDevices } from '../../services/devices';
import { deviceTypeMap } from '../../constants/constants';

function DeviceList() {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSort, setSelectedSort] = useState();
  const [editorOpen, setEditorOpen] = useState(false);
  const [devices, setDevices] = useState([]);

  const updateTable = async () => {
    let devicesArr = await getDevices();
    devicesArr = devicesArr.map(d => {
      return {
        systemName: d.system_name,
        id: d.id,
        hddCapacity: d.hdd_capacity,
        type: deviceTypeMap[d.type]
      };
    })
    if (selectedType && selectedType !== 'All') {
      devicesArr = devicesArr.filter(({ type }) => type === selectedType);
    }
    if (selectedSort) {
      devicesArr = devicesArr.sort((a, b) => {
        if (selectedSort === 'systemName') {
          if(a[selectedSort] < b[selectedSort]) { return -1; }
          if(a[selectedSort] > b[selectedSort]) { return 1; }
        } else {
          if(+a[selectedSort] < +b[selectedSort]) { return -1; }
          if(+a[selectedSort] > +b[selectedSort]) { return 1; }
        }
        return 0;
      });
    }
    setDevices(devicesArr);
  };

  useEffect(() => {
    updateTable();
  }, [selectedType, selectedSort]);

  const toggleEditor = () => {
    setEditorOpen(!editorOpen);
  };

  return (
    <Container fluid>
      <Row className="p-2">
        <Col>
          <DeviceDropdown
            label="Device Type"
            placeholder="Select type"
            defaultValue="All"
            onSelect={setSelectedType}
            items={[
              'All',
              'Windows Workstation',
              'Windows Server',
              'Mac'
            ]}
          />
        </Col>
        <Col>
          <DeviceDropdown
            label="Sort by"
            placeholder="Select value"
            onSelect={(v) => setSelectedSort(deviceSortMap[v])}
            items={[
              'System Name',
              'HDD Capacity'
            ]}
          />
        </Col>
        <Col sm="2">
          <Button
            size="sm"
            color="primary"
            className="m-2"
            onClick={toggleEditor}
          >
            + Add Device
          </Button>
        </Col>
      </Row>
      <Row>
        <DeviceTable
          devices={devices}
          updateTable={updateTable}
        />
      </Row>
      {editorOpen && (
        <DeviceEditor
          onClose={toggleEditor}
          onSave={updateTable}
        />
      )}
    </Container>
  );
}

export default DeviceList;
