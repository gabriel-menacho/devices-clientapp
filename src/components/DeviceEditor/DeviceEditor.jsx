import React, { useState } from "react";
import { Button, Container, Row, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './DeviceEditor.css';
import { updateDevice, addDevice } from '../../services/devices';
import DeviceDropdown from "../DeviceDropdown";
import { typeToSaveMap } from '../../constants/constants';

function DeviceEditor({
  id,
  onSave = () => {},
  onClose = () => {},
  ...props
}) {
  const [hddCapacity, setHddCapacity] = useState(props.hddCapacity || '');
  const [systemName, setSystemName] = useState(props.systemName);
  const [type, setType] = useState(props.type);

  const onDeviceSave = async () => {
    if (id) {
      await updateDevice(id, {
        type: typeToSaveMap[type],
        'hdd_capacity': hddCapacity,
        'system_name': systemName
      });
    } else {
      await addDevice({
        type: typeToSaveMap[type],
        'hdd_capacity': hddCapacity,
        'system_name': systemName
      });
    }
    onSave();
    onClose();
  };

  return (
    <Modal size="lg" isOpen={true} className="border border-warning">
      {id && <ModalHeader className="border-warning">Edit Device</ModalHeader>}
      {!id && <ModalHeader className="border-warning">Add Device</ModalHeader>}
      <ModalBody>
        <Container fluid>
          <Row>
            <Col xs="3">System Name:</Col>
            <Col xs="9">
              <Input value={systemName} onChange={(ev) => setSystemName(ev.target.value)} />
            </Col>
          </Row>
          <Row>
            <Col xs="3">Device Type:</Col>
            <Col xs="9">
              <DeviceDropdown
                placeholder="Select type"
                onSelect={setType}
                defaultValue={type}
                items={[
                  'Windows Workstation',
                  'Windows Server',
                  'Mac'
                ]}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="3">HDD Capacity:</Col>
            <Col xs="9">
              <Input
                pattern="^[0-9]*$"
                value={+hddCapacity}
                onChange={(ev) => {
                  const val = ev.target.value + '';
                  if (val.match(/^[0-9]*$/)) {
                    setHddCapacity(val);
                  }
                }}
              />
            </Col>
          </Row>
        </Container>
      </ModalBody>
      <ModalFooter className="border-0">
        <Button
          size="sm"
          color="primary"
          className="m-2"
          onClick={onDeviceSave}
          disabled={!systemName || !hddCapacity || !type}
        >
          Save
        </Button>
        <Button
          size="sm"
          color="secondary"
          className="m-2"
          onClick={onClose}
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default DeviceEditor;
