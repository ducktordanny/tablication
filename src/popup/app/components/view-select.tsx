import React, {useState} from 'react';

import {Button, Menu, MenuItem} from '@mui/material';

export interface ViewSelectOption {
  value: string;
  title: string;
}

export type ViewSelectOptions = Array<ViewSelectOption>;

export interface ViewSelectProps {
  options: ViewSelectOptions;
  onSelect: (value: string) => void;
}

export default function ViewSelect({options, onSelect}: ViewSelectProps) {
  const [anchorElement, setAnchorElement] = useState<Element | null>(null);
  const open = Boolean(anchorElement);

  const onMenuOpenerButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const closeMenu = () => setAnchorElement(null);

  const onOptionSelect = (value: string) => {
    onSelect(value);
    closeMenu();
  };

  return (
    <>
      <Button
        id="basic-button"
        variant="outlined"
        color="secondary"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={onMenuOpenerButton}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorElement}
        open={open}
        onClose={closeMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {options.map(({value, title}, index) => (
          <MenuItem key={value + index} onClick={() => onOptionSelect(value)}>
            {title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
