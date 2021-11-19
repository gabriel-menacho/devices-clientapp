import React, { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Container, Row, Col } from 'reactstrap';
import './DeviceDropdown.css';

export const DeviceDropdown = ({
  label,
  placeholder,
  items,
  onSelect = () => {},
  ...otherProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(otherProps.defaultValue);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const onClick = (ev) => {
    setValue(ev.target.innerHTML);
    onSelect(ev.target.innerHTML);
  };

  return (
    <Container fluid>
      <Row>
        {label && (
          <Col className="dropdown-label m-1">
            {label}:
          </Col>
        )}
        <Col className="device-dropdown">
          <Dropdown
            isOpen={isOpen}
            toggle={toggle}
            {...otherProps}
          >
            <DropdownToggle caret>
              {value || placeholder}
            </DropdownToggle>
            <DropdownMenu>
              {items.map(item => <DropdownItem onClick={onClick}>{item}</DropdownItem>)}
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
};

export default DeviceDropdown;
