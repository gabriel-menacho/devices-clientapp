import React, { useState } from "react";
import { Button, Container, Row, Col } from 'reactstrap';
import DeviceEditor from '../DeviceEditor';
import './Device.css';
import { deleteDevice } from '../../services/devices';
import cn from "classnames";

function Device({ hddCapacity, id, systemName, type, updateTable, className }) {
  const [visible, setVisible] = useState(true);
  const [showDeviceEditor, setShowDeviceEditor] = useState(false);

  const toggleEditor = () => {
    setShowDeviceEditor(!showDeviceEditor);
  };

  const onDelete = () => {
    deleteDevice(id);
    setVisible(false);
  };
  
  return (
    <Container fluid className={cn('device border-warning', className, {
      'd-block': visible,
      'd-none': !visible
    })}>
      {id && (
        <Row>
          <Col xs={8} className="device-info">
            <div>{systemName}</div>
            <div className="text-primary">{type}</div>
            <div>{hddCapacity}</div>
          </Col>
          <Col xs={4}>
            <Button
              size="sm"
              color="primary"
              className="m-2"
              onClick={toggleEditor}
            >
              Edit
            </Button>
            <Button
              size="sm"
              color="secondary"
              className="m-2"
              onClick={onDelete}
            >
              Delete
            </Button>
          </Col>
        </Row>
      )}
      {!id && (
        <>No device found!</>
      )}
      {showDeviceEditor && (
        <DeviceEditor
          id={id}
          hddCapacity={hddCapacity}
          systemName={systemName}
          type={type}
          onClose={toggleEditor}
          onSave={updateTable}
        />
      )}
    </Container> 
  );
}

export default Device;
